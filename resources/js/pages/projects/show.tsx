import { Head } from '@inertiajs/react';
import { type Task } from '@/feature/tasks/type';
import { type Workspace } from '@/feature/workspaces/type';
import AuthenticatedLayout from '@/feature/workspaces/layout/workspace-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PlusIcon, FolderIcon, CalendarIcon, UserIcon, ClockIcon } from 'lucide-react';
import { useModalContext } from '@/contexts/modal-context';
import TaskViewSwitcher from '@/feature/tasks/components/task-view-switcher';

interface Project {
  id: number;
  name: string;
  imageUrl?: string;
  image_url_full?: string;
  owner_id: number;
  workspace_id: number;
  created_at: string;
  updated_at: string;
  owner?: {
    id: number;
    name: string;
    email: string;
  };
}

interface ProjectPageProps {
  project: Project;
  workspace: Workspace;
  workspaces: {
    all: Workspace[];
    current: Workspace;
  };
  projects: {
    documents: Project[];
    total: number;
  };
  tasks: {
    documents: Task[];
    total: number;
  };
}

// Component that uses the modal context
function ProjectContent({ project, workspace, tasks }: Omit<ProjectPageProps, 'workspaces' | 'projects'>) {
  const { openTaskModal } = useModalContext();

  return (
    <>
      <Head title={`${project.name} - ${workspace.name}`} />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="h-full flex flex-col gap-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  {project.image_url_full ? (
                    <img 
                      src={project.image_url_full} 
                      alt={project.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FolderIcon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                      {project.name}
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                      Project in {workspace.name}
                    </p>
                  </div>
                </div>
              </div>
              <Button onClick={openTaskModal} className="flex items-center gap-2">
                <PlusIcon className="h-4 w-4" />
                Add Task
              </Button>
            </div>

            {/* Project Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Project Details */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Project Details</CardTitle>
                  <CardDescription>
                    Information about this project
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <UserIcon className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-500">Owner</span>
                      <div className="font-medium">
                        {project.owner?.name || 'Unknown'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <CalendarIcon className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-500">Created</span>
                      <div className="font-medium">
                        {new Date(project.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <ClockIcon className="h-4 w-4 text-gray-500" />
                    <div>
                      <span className="text-sm text-gray-500">Last Updated</span>
                      <div className="font-medium">
                        {new Date(project.updated_at).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Project Stats */}
              <Card>
                <CardHeader>
                  <CardTitle>Statistics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Total Tasks</span>
                      <Badge variant="secondary">{tasks.total}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Completed</span>
                      <Badge variant="secondary">
                        {tasks.documents.filter(task => task.status === 'done').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">In Progress</span>
                      <Badge variant="secondary">
                        {tasks.documents.filter(task => task.status === 'in_progress').length}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">To Do</span>
                      <Badge variant="secondary">
                        {tasks.documents.filter(task => task.status === 'todo').length}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tasks */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Tasks ({tasks.total})</CardTitle>
                    <CardDescription>
                      Tasks assigned to this project
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <TaskViewSwitcher 
                  hideProjectFilter={true} 
                  tasks={{
                    data: {
                      documents: tasks.documents
                    }
                  }}
                  isLoading={false}
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}

export default function ProjectShow({ project, workspace, tasks }: Omit<ProjectPageProps, 'workspaces' | 'projects'>) {
  return (
    <AuthenticatedLayout>
      <ProjectContent project={project} workspace={workspace} tasks={tasks} />
    </AuthenticatedLayout>
  );
}
