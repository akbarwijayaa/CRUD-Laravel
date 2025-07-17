import { Head } from '@inertiajs/react';
import { type Workspace } from '@/feature/workspaces/type';
import AuthenticatedLayout from '@/feature/workspaces/layout/workspace-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { UsersIcon, CheckCircle, XCircle } from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface JoinWorkspacePageProps {
  workspace: Workspace;
  inviteCode: string;
}

export default function JoinWorkspacePage({ workspace, inviteCode }: JoinWorkspacePageProps) {
  const [isJoining, setIsJoining] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJoin = async () => {
    setIsJoining(true);
    setError(null);

    try {
      const response = await fetch(`/workspaces/${workspace.id}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          inviteCode: inviteCode
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to join workspace');
      }

      // Redirect to workspace after successful join
      router.visit(`/workspaces/${workspace.id}`);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to join workspace');
    } finally {
      setIsJoining(false);
    }
  };

  const handleCancel = () => {
    router.visit('/workspaces');
  };

  return (
    <AuthenticatedLayout>
      <Head title={`Join ${workspace.name}`} />
      
      <div className="py-12">
        <div className="max-w-md mx-auto sm:px-6 lg:px-8">
          <Card className="border-none shadow-lg">
            <CardHeader className="text-center pb-2">
              <div className="mx-auto mb-4 w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <UsersIcon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-2xl font-bold">Join Workspace</CardTitle>
              <CardDescription>
                You've been invited to join <strong className="text-foreground">{workspace.name}</strong>
              </CardDescription>
            </CardHeader>
            
            <CardContent className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                  <XCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0" />
                  <div className="text-sm text-red-800 dark:text-red-200">
                    {error}
                  </div>
                </div>
              )}
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <h3 className="text-sm font-medium text-blue-900 dark:text-blue-100">
                    What you'll get access to:
                  </h3>
                </div>
                <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 ml-8">
                  <li>• View and create projects</li>
                  <li>• Manage tasks and collaborate</li>
                  <li>• Access workspace resources</li>
                  <li>• Communicate with team members</li>
                </ul>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={handleCancel}
                  disabled={isJoining}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleJoin}
                  disabled={isJoining}
                  className="flex-1"
                >
                  {isJoining ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Joining...
                    </>
                  ) : (
                    <>
                      <UsersIcon className="w-4 h-4 mr-2" />
                      Join Workspace
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
