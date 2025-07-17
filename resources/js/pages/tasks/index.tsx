import { Head } from '@inertiajs/react';
import { type Task } from '@/feature/tasks/type';
import { type Workspace } from '@/feature/workspaces/type';
import AuthenticatedLayout from '@/feature/workspaces/layout/workspace-layout';
import { Button } from '@/components/ui/button';
import { PlusIcon } from 'lucide-react';
import { useModalContext } from '@/contexts/modal-context';

interface TasksPageProps {
  tasks: {
    data: Task[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
  filters: {
    search?: string;
    status?: string;
    projectId?: string;
  };
  workspace: Workspace;
}

// Component that uses the modal context
function TasksContent({ tasks, workspace }: Omit<TasksPageProps, 'filters'>) {
  const { openTaskModal } = useModalContext();

  return (
    <>
      <Head title={`Tasks - ${workspace.name}`} />

      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="h-full flex flex-col gap-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Tasks
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage tasks for {workspace.name}
                </p>
              </div>
              <Button onClick={openTaskModal} className="flex items-center gap-2">
                <PlusIcon className="h-4 w-4" />
                Create Task
              </Button>
            </div>

            {/* Tasks Content */}
            <div className="bg-white dark:bg-neutral-900 rounded-lg shadow-sm border border-gray-200 dark:border-neutral-600">
              <div className="p-6">
                {tasks.data.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="mx-auto h-12 w-12 text-gray-400">
                      <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                      </svg>
                    </div>
                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                      No tasks found
                    </h3>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      Get started by creating a new task.
                    </p>
                    <div className="mt-6">
                      <Button onClick={openTaskModal} className="flex items-center gap-2">
                        <PlusIcon className="h-4 w-4" />
                        Create Task
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {tasks.data.map((task) => (
                      <div
                        key={task.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                              {task.name}
                            </h3>
                            {task.description && (
                              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                {task.description}
                              </p>
                            )}
                            <div className="mt-2 flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                              <span className="capitalize">Status: {task.status}</span>
                              {task.priority && (
                                <span className="capitalize">Priority: {task.priority}</span>
                              )}
                              {task.due_date && (
                                <span>Due: {new Date(task.due_date).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                              task.status === 'done'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                                : task.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                            }`}>
                              {task.status.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pagination */}
            {tasks.last_page > 1 && (
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700 dark:text-gray-300">
                  Showing {((tasks.current_page - 1) * tasks.per_page) + 1} to {Math.min(tasks.current_page * tasks.per_page, tasks.total)} of {tasks.total} tasks
                </div>
                <div className="flex items-center gap-2">
                  {/* Add pagination controls here if needed */}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default function TasksIndex({ tasks, workspace }: Omit<TasksPageProps, 'filters'>) {
  return (
    <AuthenticatedLayout>
      <TasksContent tasks={tasks} workspace={workspace} />
    </AuthenticatedLayout>
  );
}
