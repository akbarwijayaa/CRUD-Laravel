"use client";

import DottedSeparatoo from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useWorkspaceId } from "@/feature/workspaces/hooks/use-workspace-id";
import { cn } from "@/lib/utils";
import {
  createTaskSchema,
  CreateTasksSchemaType,
} from "@/validations/tasks/tasks-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";
import { SimpleDatePicker } from "@/components/ui/simple-date-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MemberAvatar from "@/feature/members/components/member-avatar";
import { Task, TasksStatus } from "../type";
import { ProjectAvatar } from "@/components/projects/project-avatar";
import { useEditTask } from "../api/use-edit-task";

interface UpdateTaskFormWrapperProps {
  onCancel: () => void;
  projectOptions: { id: string; name: string; imageUrl: string }[];
  memberOptions: { id: string; name: string }[];
  initialValues: Task;
}

const Status = [
  {
    title: "Backlog",
    value: TasksStatus.BACKLOG,
  },
  {
    title: "Todo",
    value: TasksStatus.TODO,
  },
  {
    title: "In Progress",
    value: TasksStatus.IN_PROGRESS,
  },
  {
    title: "In Review",
    value: TasksStatus.IN_REVIEW,
  },
  {
    title: "Done",
    value: TasksStatus.DONE,
  },
];

export function EditTaskForm({
  onCancel,
  projectOptions,
  memberOptions,
  initialValues,
}: UpdateTaskFormWrapperProps) {
  const workspaceId = useWorkspaceId();
  const { mutate, isPending } = useEditTask();
  const form = useForm<CreateTasksSchemaType>({
    resolver: zodResolver(createTaskSchema),
    defaultValues: {
      assigneeId: initialValues.assigneeId?.toString(),
      description: initialValues.description ?? "",
      dueDate: initialValues.dueDate
        ? new Date(initialValues.dueDate)
        : undefined,
      name: initialValues.name,
      projectId: initialValues.projectId?.toString(),
      status: initialValues.status as TasksStatus,
      workspaceId: workspaceId ? String(workspaceId) : '',
    },
  });

  const onSubmit = (data: CreateTasksSchemaType) => {
    mutate(
      { ...data, taskId: (initialValues.id || initialValues.$id) as string },
      {
        onSuccess: () => {
          onCancel();
        },
      }
    );
  };

  return (
    <Card className="w-full h-full border-none shadow-none">
      <CardHeader className="flex p-7">
        <CardTitle>Edit a new task</CardTitle>
      </CardHeader>

      <div className="px-7">
        <DottedSeparatoo />
      </div>

      <CardContent className="py-7">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Name</Label>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your Task"
                      disabled={isPending}
                      {...field}
                      className="text-sm"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="dueDate"
              control={form.control}
              render={({ field }) => (
                <FormItem className="flex flex-col mt-2">
                  <Label>Due Date</Label>
                  <FormControl>
                    <SimpleDatePicker {...field} className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="assigneeId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Assignee</Label>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {memberOptions.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          <div className="flex items-center gap-x-2">
                            <MemberAvatar
                              name={member.name}
                              className="size-6"
                            />
                            {member.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="status"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Status</Label>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {Status.map((status) => (
                        <SelectItem key={status.title} value={status.value}>
                          {status.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              name="projectId"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <Label>Project</Label>
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Project" />
                      </SelectTrigger>
                    </FormControl>
                    <FormMessage />
                    <SelectContent>
                      {projectOptions.map((project) => (
                        <SelectItem key={project.id} value={project.id}>
                          <div className="flex items-center gap-x-2">
                            <ProjectAvatar
                              name={project.name}
                              image={project.imageUrl}
                              className="size-6 "
                            />
                            {project.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <div className="flex items-center justify-between gap-3 my-4">
              <Button
                type="button"
                variant={"outline"}
                onClick={onCancel}
                disabled={isPending}
                className={cn(!onCancel && "invisible")}
              >
                Cancel
              </Button>

              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Update Task"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
