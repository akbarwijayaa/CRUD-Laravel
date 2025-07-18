import { RiAddCircleFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { ProjectAvatar } from "@/feature/workspaces/components/projects/projects-avatar";

interface Project {
  id: number | string;
  name: string;
  imageUrl?: string | null;
  image_url_full?: string | null;
}

interface ProjectsProps {
  projects: Project[];
  workspaceId: number | string;
  onOpenCreateModal: () => void;
}

export default function Projects({ projects, workspaceId, onOpenCreateModal }: ProjectsProps) {
  const { url } = usePage();

  return (
    <div className="flex flex-col gap-y-2">
      <div className="flex items-center justify-between">
        <h1 className="text-xs text-neutral-500 uppercase">Projects</h1>
        <RiAddCircleFill
          className="size-4 text-neutral-500 cursor-pointer hover:opacity-75 transition"
          onClick={() => {
            console.log('Project + button clicked!');
            onOpenCreateModal();
          }}
        />
      </div>
      {projects.map((project) => {
        const href = route('projects.show', { workspace: workspaceId, project: project.id });
        const isActive = url === href.replace(window.location.origin, '');
        return (
          <Link href={href} key={project.id}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-1.5 border border-gray-200 rounded-md hover:opacity-75 transition cursor-pointer",
                isActive && "bg-neutral-900 shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <ProjectAvatar name={project.name} image={project.image_url_full || (project.imageUrl ?? undefined)} />
              <span className="truncate text-sm">{project.name}</span>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
