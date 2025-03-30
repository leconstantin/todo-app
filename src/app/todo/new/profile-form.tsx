"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { cn } from "@/lib/utils";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  ArrowRight,
  ArrowUp,
  CalendarIcon,
  Check,
  ChevronsUpDown,
  Circle,
  CircleCheck,
  CircleHelp,
  CircleOff,
  Timer,
} from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { createTask } from "@/actions/task.action";

const labels = [
  { label: "Bug", value: "bug" },
  { label: "Feature", value: "feature" },
  { label: "Documentation", value: "doc" },
] as const;

const status = [
  { label: "BackLog", value: "backlog", icon: CircleHelp },
  { label: "Todo", value: "todo", icon: Circle },
  { label: "In progress", value: "in progress", icon: Timer },
  { label: "Done", value: "done", icon: CircleCheck },
  { label: "Canceled", value: "canceled", icon: CircleOff },
] as const;

const priority = [
  { label: "High", value: "high", icon: ArrowUp },
  { label: "Medium", value: "medium", icon: ArrowRight },
] as const;

const profileFormSchema = z.object({
  title: z
    .string()
    .min(2, {
      message: "Title must be at least 2 characters.",
    })
    .max(30, {
      message: "Title must not be longer than 30 characters.",
    }),
  dot: z.date({
    required_error: "A date of doing task is required.",
  }),
  desc: z.string().max(160).min(4),
  label: z.string({
    required_error: "Please select a label.",
  }),
  status: z.string({
    required_error: "Please select a status.",
  }),
  priority: z.string({
    required_error: "Please select a priority.",
  }),
});

export type ProfileFormValues = z.infer<typeof profileFormSchema>;

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  desc: "I will make my project in two months ...",
};

export function ProfileForm() {
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: "onChange",
  });

  async function onSubmit(data: ProfileFormValues) {
    try {
      const result = await createTask(data);
      if (result?.success) {
        // toast.success("Post created successfully");
        toast({
          title: "You submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(result.task, null, 2)}
              </code>
            </pre>
          ),
        });
        form.reset()

      }
    } catch (error) {
      console.error("Failed to create post:", error);
      toast({
        title: "Failed to create task",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Making project" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display title It can be your task title or a
                pseudonym. You can change this anytime.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dot"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Date of Doing Task</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Your date on which you will complete your task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="desc"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us a little bit about your task"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                You can <span>@mention</span> how you are going to achieve your
                tasks here.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="label"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Label</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? labels.find((label) => label.value === field.value)
                            ?.label
                        : "Select label"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search label..." />
                    <CommandList>
                      <CommandEmpty>No label found.</CommandEmpty>
                      <CommandGroup>
                        {labels.map((label) => (
                          <CommandItem
                            value={label.label}
                            key={label.value}
                            onSelect={() => {
                              form.setValue("label", label.value);
                            }}
                          >
                            <Check
                              className={cn(
                                "mr-2",
                                label.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                            {label.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the label that will be used to distinguish tasks.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Status</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? status.find((stat) => stat.value === field.value)
                            ?.label
                        : "Select status"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search status..." />
                    <CommandList>
                      <CommandEmpty>No status found.</CommandEmpty>
                      <CommandGroup>
                        {status.map((stat) => (
                          <CommandItem
                            value={stat.label}
                            key={stat.value}
                            onSelect={() => {
                              form.setValue("status", stat.value);
                            }}
                          >
                            <stat.icon />
                            {stat.label}
                            <Check
                              className={cn(
                                "mr-2",
                                stat.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the status that show the progress of task.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Priority</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? priority.find((stat) => stat.value === field.value)
                            ?.label
                        : "Select priority"}
                      <ChevronsUpDown className="opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search priority..." />
                    <CommandList>
                      <CommandEmpty>No priority found.</CommandEmpty>
                      <CommandGroup>
                        {priority.map((pri) => (
                          <CommandItem
                            value={pri.label}
                            key={pri.value}
                            onSelect={() => {
                              form.setValue("priority", pri.value);
                            }}
                          >
                            <pri.icon />
                            {pri.label}
                            <Check
                              className={cn(
                                "mr-2",
                                pri.value === field.value
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>How priority is your task.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Add Task</Button>
      </form>
    </Form>
  );
}
