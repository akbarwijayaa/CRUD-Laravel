import { RiAddCircleFill } from "react-icons/ri";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkspaceAvatar from "@/feature/workspaces/components/workspace-avatar";
import { usePage, router } from "@inertiajs/react";
import { Workspace } from "@/feature/workspaces/type";

interface WorkspaceSwitcherProps {
  onOpenCreateModal: () => void;
}

export default function WorkspaceSwitcher({ onOpenCreateModal }: WorkspaceSwitcherProps) {
  const { workspaces } = usePage<{ workspaces?: { all?: Workspace[]; current?: Workspace } }>().props;
  const allWorkspaces = workspaces?.all || [];
  const currentWorkspace = workspaces?.current;

  const onSelected = (id: string) => {
    router.get(route('workspaces.show', { workspace: id }));
  };

  if (!allWorkspaces?.length) {
    return (
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-xs uppercase text-neutral-500">Workspaces</h1>
          <RiAddCircleFill
            className="size-4 text-neutral-500 cursor-pointer hover:opacity-75 transition"
            onClick={() => {
              console.log('Workspace + button clicked!');
              onOpenCreateModal();
            }}
          />
        </div>
        <div className="text-sm text-neutral-500 py-2">
          No workspaces available. Create one to get started.
        </div>
        <button 
          onClick={onOpenCreateModal}
          className="w-full mt-2 px-3 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Create Your First Workspace
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xs uppercase text-neutral-500">Workspaces</h1>
        <RiAddCircleFill
          className="size-4 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={onOpenCreateModal}
        />
      </div>
      <Select 
        onValueChange={onSelected} 
        value={currentWorkspace?.id?.toString()}
      >
        <SelectTrigger>
          <SelectValue placeholder="Pilih Workspace" />
        </SelectTrigger>
        <SelectContent>
          {allWorkspaces.map((workspace) => (
            <SelectItem key={workspace.id} value={workspace.id.toString()}>
              <div className="flex justify-start items-center gap-3 font-medium !rounded-lg">
                <WorkspaceAvatar
                  name={workspace.name}
                  image={workspace.image_url_full || workspace.imageUrl}
                />
                <span>{workspace.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}