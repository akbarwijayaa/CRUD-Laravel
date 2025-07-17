import { Head } from '@inertiajs/react';
import { type Workspace } from '@/feature/workspaces/type';
import AuthenticatedLayout from '@/feature/workspaces/layout/workspace-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { UsersIcon, UserPlusIcon, MailIcon } from 'lucide-react';
import { InviteMemberModal } from '@/components/workspace/invite-member-modal';
import { useState } from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}

interface MembersPageProps {
  workspace: Workspace;
  workspaces: {
    all: Workspace[];
    current: Workspace;
  };
  members: {
    documents: User[];
    total: number;
  };
  projects: {
    documents: unknown[];
    total: number;
  };
}

// Component that uses the modal context
function MembersContent({ workspace, members }: Omit<MembersPageProps, 'workspaces' | 'projects'>) {
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  
  return (
    <>
      <Head title={`Members - ${workspace.name}`} />
      
      <InviteMemberModal 
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        workspaceId={workspace.id}
        workspaceName={workspace.name}
        inviteCode={workspace.invite_code}
        inviteLink={workspace.invite_code ? `${window.location.origin}/workspaces/${workspace.id}/join/${workspace.invite_code}` : undefined}
      />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="h-full flex flex-col gap-y-4">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
                  <UsersIcon className="h-6 w-6" />
                  Workspace Members
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage members for {workspace.name}
                </p>
              </div>
              <Button 
                className="flex items-center gap-2" 
                onClick={() => setIsInviteModalOpen(true)}
              >
                <UserPlusIcon className="h-4 w-4" />
                Invite Members
              </Button>
            </div>

            {/* Members Content */}
            <div className="grid gap-6">
              {/* Members List */}
              <Card>
                <CardHeader>
                  <CardTitle>Members ({members.total})</CardTitle>
                  <CardDescription>
                    People who have access to this workspace
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {members.documents.length === 0 ? (
                    <div className="text-center py-12">
                      <UsersIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                        No members yet
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Invite people to collaborate on this workspace.
                      </p>
                      <div className="mt-6">
                        <Button 
                          className="flex items-center gap-2" 
                          onClick={() => setIsInviteModalOpen(true)}
                        >
                          <UserPlusIcon className="h-4 w-4" />
                          Invite Members
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {members.documents.map((member) => (
                        <div
                          key={member.id}
                          className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${member.name}`} />
                              <AvatarFallback>
                                {member.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">
                                {member.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                                <MailIcon className="h-3 w-3" />
                                {member.email}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">Owner</Badge>
                            <Button variant="outline" size="sm" disabled>
                              Remove
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Member Roles */}
              <Card>
                <CardHeader>
                  <CardTitle>Member Roles</CardTitle>
                  <CardDescription>
                    Different roles have different permissions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Owner</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Full access to workspace settings and members
                        </div>
                      </div>
                      <Badge variant="default">You</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Admin</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Can manage projects and invite members
                        </div>
                      </div>
                      <Badge variant="secondary">Coming Soon</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg opacity-50">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">Member</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Can create and manage their own tasks
                        </div>
                      </div>
                      <Badge variant="secondary">Coming Soon</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function WorkspaceMembers({ workspace, members }: Omit<MembersPageProps, 'workspaces' | 'projects'>) {
  return (
    <AuthenticatedLayout>
      <MembersContent workspace={workspace} members={members} />
    </AuthenticatedLayout>
  );
}
