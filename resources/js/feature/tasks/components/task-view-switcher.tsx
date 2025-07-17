"use client";
import React from "react";
import DottedSeparatoo from "@/components/dotted-separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Loader, PlusIcon } from "lucide-react";
import { useCreateTasksModel } from "../hooks/use-create-tasks-model";
import { useWorkspaceId } from "@/feature/workspaces/hooks/use-workspace-id";
import { useGetTasks } from "../api/use-get-tasks";
import { useState } from "react";
import DataFilter from "./data-filter";
import { DataTable } from "./data-tabel";
import { columns } from "./columns";
import { DataKanban, TaskStatus } from "./kanban-board/data-kanban";
import { TasksStatus, Task } from "../type";
import { useBulkEditTask } from "../api/use-bulk-update-task";
import { DataCalendar } from "./calendar-board/data-calendar";
import { router } from "@inertiajs/react";

interface Tasks {
  $id: string;
  status: TaskStatus | TasksStatus;
  position: number;
}

interface TaskViewSwitcherProps {
  hideProjectFilter?: boolean;
  tasks?: {
    data?: {
      documents?: unknown[];
    };
  };
  isLoading?: boolean;
}

export default function TaskViewSwitcher({
  hideProjectFilter,
  tasks: propsTasks,
  isLoading: propsIsLoading,
}: TaskViewSwitcherProps) {
  const [view, setView] = useState("tabel");
  const workspaceId = useWorkspaceId();
  
  // Only fetch tasks if no props are provided
  const { data: fetchedTasks, isLoading: isLoadingFetchedTasks } = useGetTasks({
    workspaceId,
  }, {
    enabled: !propsTasks, // Disable API call when props are provided
  });
  
  const { open } = useCreateTasksModel();
  const { mutate: bulkUpdate } = useBulkEditTask();
  
  // Use props tasks if provided, otherwise use fetched tasks
  const tasks = propsTasks || fetchedTasks;
  const isLoadingTasks = propsIsLoading !== undefined ? propsIsLoading : isLoadingFetchedTasks;

  const onKanbanChange = React.useCallback(
    (tasks: Tasks[]) => {
      const newTasks = tasks.map((task) => {
        return {
          $id: task.$id,
          status: task.status as TasksStatus,
          position: task.position,
        };
      });

      bulkUpdate({ 
        tasks: newTasks 
      }, {
        onSuccess: () => {
          // Use Inertia router to refresh the page data
          router.reload({
            only: ['tasks'],
            // preserveState: true,
            // preserveScroll: true,
          });
        }
      });
    },
    [bulkUpdate]
  );

  return (
    <Tabs
      defaultValue={view}
      onValueChange={setView}
      className="flex-1 border rounded-lg w-full"
    >
      <div className="h-full flex flex-col overflow-auto p-4">
        <div className="flex flex-col gap-y-2 lg:flex-row justify-between items-center">
          <TabsList className="w-full lg:w-auto">
            <TabsTrigger value="tabel" className="h-8 w-full lg:w-auto">
              Tabel
            </TabsTrigger>
            <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
              Kanban
            </TabsTrigger>
            <TabsTrigger value="calendar" className="h-8 w-full lg:w-auto">
              Calendar
            </TabsTrigger>
          </TabsList>
        </div>
        <DottedSeparatoo className="my-3" />

        {isLoadingTasks ? (
          <div className="h-full w-full flex items-center justify-center flex-col">
            <Loader className="size-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
          <>
            <div className="w-full lg:w-fit px-2">
              <DataFilter hideProjectFilter={hideProjectFilter} />
            </div>

            <TabsContent value="tabel" className="mt-0">
              <DataTable
                columns={columns}
                data={tasks?.data?.documents ?? []}
              />
            </TabsContent>
            <TabsContent value="kanban" className="mt-0">
              <DataKanban
                data={(tasks?.data?.documents ?? []).map((task: Task) => ({
                  ...task,
                  $id: task.id?.toString() || task.$id,
                  position: task.position || 0
                }))}
                onChange={onKanbanChange}
              />
            </TabsContent>
            <TabsContent value="calendar" className="mt-0">
              <DataCalendar data={tasks?.data?.documents ?? []} />
            </TabsContent>
          </>
        )}
      </div>
    </Tabs>
  );
}
