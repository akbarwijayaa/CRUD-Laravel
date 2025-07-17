import { useState } from "react";
import { TasksStatus } from "../type";

export const useTasksFilter = () => {
  const [projectId, setProjectId] = useState<string | null>(null);
  const [status, setStatus] = useState<TasksStatus | null>(null);
  const [assigneeId, setAssigneeId] = useState<string | null>(null);
  const [search, setSearch] = useState<string | null>(null);
  const [dueDate, setDueDate] = useState<string | null>(null);

  return [
    {
      projectId,
      status,
      assigneeId,
      search,
      dueDate,
    },
    {
      setProjectId,
      setStatus,
      setAssigneeId,
      setSearch,
      setDueDate,
    }
  ] as const;
};
