import { Link } from "@inertiajs/react";
import { Button } from "../ui/button";
import { CalendarIcon, PlusIcon } from "lucide-react";
import DottedSeparatoo from "../dotted-separator";
import { Card, CardContent } from "../ui/card";
import { formatDistanceToNow } from "date-fns";

interface Project {
  id: number;
  name: string;
}

interface Task {
  id: number;
  name: string;
  dueDate: string;
  project: Project | { id: number; name: string };
}

interface TasksListProps {
  data: Task[];
  total: number;
  workspaceId: number | string;
  onCreateTask: () => void;
}

export function TasksList({ data, total, workspaceId, onCreateTask }: TasksListProps) {
  const tasks = data || [];
  const taskTotal = total || 0;

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-muted rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Tugas ({taskTotal})</p>
          <Button variant={"ghost"} size={"icon"} onClick={onCreateTask}>
            <PlusIcon className="size-4 text-neutral-400 hover:text-neutral-600" />
          </Button>
        </div>
        <DottedSeparatoo className="my-4" />
        <ul className="flex flex-col gap-y-4">
          {tasks.map((task) => (
            <li key={task.id}>
              <Link href={route('tasks.show', { workspace: workspaceId, task: task.id })}>
                <Card className="shadow-none border-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4">
                    <p className="text-lg font-medium truncate capitalize">
                      {task.name}
                    </p>
                    <div className="flex items-center gap-x-2 text-xs text-muted-foreground">
                      
                      <p className="text-sky-600">{task.project?.name || 'No Project'}</p>
                      <div className="size-1 rounded-full bg-neutral-300" />
                      <div className="flex items-center">
                        <CalendarIcon className="size-3 mr-1" />
                        <span className="truncate">
                          {task.dueDate ? formatDistanceToNow(new Date(task.dueDate)) : 'No due date'}
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          {tasks.length === 0 && (
             <li className="text-sm text-muted-foreground text-center">
               Belum Ada Tugas
             </li>
          )}
        </ul>
        <Button variant={"ghost"} className="mt-4 w-full" asChild>
          <Link href={route('tasks.index', { workspace: workspaceId })}>Tampilkan Semua</Link>
        </Button>
      </div>
    </div>
  );
}
