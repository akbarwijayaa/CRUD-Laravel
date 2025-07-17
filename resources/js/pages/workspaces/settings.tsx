import { Head } from '@inertiajs/react';
import { type Workspace } from '@/feature/workspaces/type';
import AuthenticatedLayout from '@/feature/workspaces/layout/workspace-layout';
import EditWorkspaceForm from '@/feature/workspaces/components/edit-workspaces-form';

interface SettingsPageProps {
  workspace: Workspace;
  workspaces: {
    all: Workspace[];
    current: Workspace;
  };
  projects: {
    documents: unknown[];
    total: number;
  };
}

// Component that uses the modal context
function SettingsContent({ workspace }: Omit<SettingsPageProps, 'workspaces' | 'projects'>) {
  return (
    <>
      <Head title={`Settings - ${workspace.name}`} />
      
      <div className="py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <EditWorkspaceForm initialValue={workspace} />
        </div>
      </div>
    </>
  );
}

export default function WorkspaceSettings({ workspace }: Omit<SettingsPageProps, 'workspaces' | 'projects'>) {
  return (
    <AuthenticatedLayout>
      <SettingsContent workspace={workspace} />
    </AuthenticatedLayout>
  );
}
