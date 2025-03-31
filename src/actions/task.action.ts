"use server";

import { ProfileFormValues } from "@/app/todo/new/profile-form";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createTask(data: ProfileFormValues) {
  try {
    const task = await prisma.task.create({
      data: {
        title: data.title,
        dod: data.dot,
        description: data.desc,
        label: data.label,
        status: data.status,
        priority: data.priority,
      },
    });

    revalidatePath("/todo"); // purge the cache for the home page
    return { success: true, task };
  } catch (error) {
    console.error("Failed to create task:", error);
    return { success: false, error: "Failed to create post" };
  }
}

export async function deleteTask(id: number) {
  try {
    const task = await prisma.task.findUnique({
      where: {
        id: id,
      },
    });
    if (!task) return;

    await prisma.task.delete({
      where: {
        id: id,
      },
    });

    revalidatePath("/todo"); // purge the cache for the home page
    return { success: true, task };
  } catch (error) {
    console.error("Failed to delete task:", error);
    return { success: false, error: "Failed to delete" };
  }
}
