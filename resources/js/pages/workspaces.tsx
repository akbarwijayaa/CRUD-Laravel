import { Head } from '@inertiajs/react';

import { type Member } from "@/feature/members/types/type";
import { type Project } from "@/feature/projects/type";
import { type Workspace } from "@/feature/workspaces/type";
import { type Task } from "@/feature/tasks/type";

import AuthenticatedLayout from '@/feature/workspaces/layout/workspace-layout';
import Analytics from "@/components/analytics/analytics";
import { MembersList } from "@/components/member/member-list";
import { ProjectList } from "@/components/projects/project-list";
import { TasksList } from "@/components/tasks/tasks-list";
import { useModalContext } from '@/contexts/modal-context';

interface AnalyticsData {
  total_tasks: number;
  total_projects: number;
  total_members: number;
  taskCount?: number;
  taskDifference?: number;
  assigneeTaskCount?: number;
  assigneeTaskDifference?: number;
  completedTask?: number;
  completedTaskDifference?: number;
  inCompletedTask?: number;
  inCompletedTaskDifference?: number;
  overDueTask?: number;
  overDueTaskDifference?: number;
}

interface PageProps {
  workspace: Workspace;
  analytics: AnalyticsData;
  tasks?: { documents: Task[], total: number };
  projects?: { documents: Project[], total: number };
  members?: { documents: Member[], total: number };
}

function WorkspaceContent({ workspace, analytics, tasks, projects, members }: PageProps) {
  const { openTaskModal, openProjectModal } = useModalContext();
  return (
    <>
      <Head title={workspace.name} />
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="h-full flex flex-col gap-y-4">
              <Analytics data={{
                taskCount: analytics.total_tasks,
                taskDifference: 0,
                assigneeTaskCount: analytics.total_tasks,
                assigneeTaskDifference: 0,
                completedTask: 0,
                completedTaskDifference: 0,
                inCompletedTask: analytics.total_tasks,
                inCompletedTaskDifference: 0,
                overDueTask: 0,
                overDueTaskDifference: 0,
              }} />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                  <TasksList
                      data={tasks?.documents?.map(task => ({
                          ...task,
                          id: task.id || 0, 
                          project: (task.project || { id: 0, name: 'No Project' }) as { id: number; name: string },
                          dueDate: task.due_date || ''
                      })) || []}
                      total={tasks?.total || 0}
                      workspaceId={workspace.id}
                      onCreateTask={openTaskModal}
                  />
                  <ProjectList
                      data={projects?.documents || []}
                      total={projects?.total || 0}
                      workspaceId={workspace.id} 
                      onCreateProject={openProjectModal}
                  />
                  <MembersList
                      data={members?.documents || []}
                      total={members?.total || 0}
                      workspaceId={workspace.id}
                  />
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

export default function Show({ workspace, analytics, tasks, projects, members }: PageProps) {

  if (!workspace) {
    return (
      <AuthenticatedLayout>
        <Head title="Loading..." />
        <div className="py-12">
          <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
            <div className="text-center">Loading workspace...</div>
          </div>
        </div>
      </AuthenticatedLayout>
    );
  }
  
  return (
    <AuthenticatedLayout>
      <WorkspaceContent 
        workspace={workspace} 
        analytics={analytics} 
        tasks={tasks} 
        projects={projects} 
        members={members} 
      />
    </AuthenticatedLayout>
  );
}
