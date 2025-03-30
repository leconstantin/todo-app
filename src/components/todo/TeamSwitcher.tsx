"use client";

import * as React from "react";
import { ListTodo } from "lucide-react";

export function TeamSwitcher() {
  return (
    <div className="flex gap-2">
      <div className=" flex aspect-square  items-center justify-center rounded-lg">
        <ListTodo className="size-4" />
      </div>
      <span className="truncate font-semibold text-sm leading-tight">
        Rathon
      </span>
    </div>
  );
}
