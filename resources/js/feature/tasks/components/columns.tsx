"use client";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreVertical } from "lucide-react";
import { Task, TasksStatus } from "../type";
import { Button } from "@/components/ui/button";
import { ProjectAvatar } from "@/components/projects/project-avatar";
import TaskDate from "./task-date";
import MemberAvatar from "@/feature/members/components/member-avatar";
import { Badge } from "@/components/ui/badge";
import { snakeCaseToTitleCase } from "@/lib/utils";
import TaskAction from "./task-action";
export const columns: ColumnDef<Task>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Task Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "project",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Project
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const project = row.original.project;
      if (!project) {
        return (
          <div className="flex items-center gap-x-2 text-sm font-medium">
            <div className="size-6 rounded bg-gray-200 dark:bg-gray-700"></div>
            <p className="line-clamp-1 text-gray-500">No project</p>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <ProjectAvatar
            className="size-6"
            name={(project as { name: string; image_url_full?: string })?.name || ''}
            image={(project as { name: string; image_url_full?: string })?.image_url_full}
          />
          <p className="line-clamp-1">{(project as { name: string; image_url_full?: string })?.name || 'No Project'}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "assignee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Assignee
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const assignee = row.original.assignee;
      if (!assignee) {
        return (
          <div className="flex items-center gap-x-2 text-sm font-medium">
            <div className="size-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <p className="line-clamp-1 text-gray-500">Unassigned</p>
          </div>
        );
      }
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <MemberAvatar
            className="size-6"
            fallbackClassName="text-xs"
            name={(assignee as { name: string })?.name || ''}
          />
          <p className="line-clamp-1">{(assignee as { name: string })?.name || 'Unassigned'}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "due_date",
    header: ({ column }) => {
      return (
        	<Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dueDate = row.original.due_date;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <TaskDate value={dueDate} />
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const status = row.original.status as TasksStatus;
      return (
        <div className="flex items-center gap-x-2 text-sm font-medium">
          <Badge variant={status as 'todo' | 'in-progress' | 'in-review' | 'done' | 'backlog'} className="capitalize">
            {snakeCaseToTitleCase(status)}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "Action",
    id: "action",
    cell: ({ row }) => {
      const id = row.original.id?.toString() || row.original.$id;
        const projectId = row.original.project_id?.toString() || (row.original.project as { id: number })?.id?.toString();

      return (
        <TaskAction id={id || ''} projectId={projectId} className="justify-start">
          <Button size={"sm"} variant={"ghost"}>
            <MoreVertical />
          </Button>
        </TaskAction>
      );
    },
  },
];
