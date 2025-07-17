import { User } from "../members/types/type";
import { Project } from "../projects/type";
import { Workspace } from "../workspaces/type";

export enum TasksStatus {
  BACKLOG = "backlog",
  TODO = "todo",
  IN_PROGRESS = "in_progress",
  IN_REVIEW = "in_review",
  DONE = "done",
}

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'in_review' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export type Task = {
  id: number;
  name: string;
  description?: string;
  project_id?: number;
  workspace_id: number;
  assignee_id?: number;
  status: TaskStatus;
  due_date?: string;
  priority: TaskPriority;
  position: number;
  created_at: string;
  updated_at: string;
  // Relations
  project?: Project;
  assignee?: User;
  workspace?: Workspace;
  // CamelCase versions for frontend compatibility
  assigneeId?: number;
  projectId?: number;
  dueDate?: string;
  $id?: string; // For backward compatibility
};
