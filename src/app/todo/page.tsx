import { Button } from "@/components/ui/button";
import React from "react";
import { getData } from "../payment/page";
import { DataTable } from "../payment/data-table";
import Link from "next/link";
import { columns } from "./_components/columns";
import prisma from "@/lib/prisma";

export default async function page() {
  const data = await prisma.task.findMany();

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
            <p className="text-muted-foreground">
              Here&apos;s a list of your tasks for this month!
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <Button asChild variant="default">
              <Link href="/todo/new">New Task</Link>
            </Button>
          </div>
        </div>
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
