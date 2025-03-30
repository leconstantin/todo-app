"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Task = {
  id: string;
  title: String;
  dod: Date;
  description: String;
  label: String;
  status: String;
  priority: String;
};

export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "dod",
    header: "Date of Delivery",
  },
//   {
//     accessorKey: "description",
//     header: "Description",
//   },
  {
    accessorKey: "label",
    header: "Label",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "priority",
    header: "Priority",
  },
];
