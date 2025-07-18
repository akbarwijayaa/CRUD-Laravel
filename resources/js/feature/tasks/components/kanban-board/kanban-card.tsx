import { MoreHorizontal } from "lucide-react";
import { Task } from "../../type";
import TaskAction from "../task-action";
import DottedSeparatoo from "@/components/dotted-separator";
import MemberAvatar from "@/feature/members/components/member-avatar";
import TaskDate from "../task-date";
import { ProjectAvatar } from "@/components/projects/project-avatar";

interface KanbanCardProps {
  task: Task;
}

export default function KanbanCard({ task }: KanbanCardProps) {
  return (
    <div className="bg-neutral-900 p-2.5 mb-1.5 rounded shadow-sm space-y-3">
      <div className="flex items-center justify-between gap-x-2">
        <p className="text-sm line-clamp-2">{task.name}</p>
        <TaskAction id={task.$id || ''} projectId={task.projectId?.toString()}>
          <MoreHorizontal className="size-5 storke-2 shrink-0 text-neutral-700 hover:bg-opacity-75 transition-all" />
        </TaskAction>
      </div>

      <DottedSeparatoo />
      <div className="flex items-center gap-x-1 5">
        <MemberAvatar
          name={(task.assignee as { name: string })?.name || "Unassigned"}
          fallbackClassName="text-xs"
          className="size-6"
        />
        <div className="size-1 rounded-full bg-neutral-300" />
        <TaskDate value={task.due_date} className="text-sm" />
      </div>

      <div className="flex items-center gap-x-1 5">
        <ProjectAvatar
          name={(task.project as { name: string; image_url_full?: string })?.name || "No Project"}
          image={(task.project as { name: string; image_url_full?: string })?.image_url_full}
          fallbackClassName="text-sm"
          className="size-6 rounded-full"
        />
        <span className="text-xs font-medium capitalize">
          {(task.project as { name: string })?.name || "No Project"}
        </span>
      </div>
    </div>
  );
}
