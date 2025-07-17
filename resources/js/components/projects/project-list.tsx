import { Link } from "@inertiajs/react";
import { PlusIcon } from "lucide-react";
import { Project } from "@/feature/projects/type";
import { Button } from "../ui/button";
import DottedSeparatoo from "../dotted-separator";
import { Card, CardContent } from "../ui/card";
import { ProjectAvatar } from "./project-avatar";

interface ProjectListProps {
  data: Project[];
  total: number;
  workspaceId: number | string;
  onCreateProject: () => void;
}

export function ProjectList({ data, total, workspaceId, onCreateProject }: ProjectListProps) {

  const projects = data || [];
  const projectTotal = total || 0;

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-neutral-900 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Proyek ({projectTotal})</p>
          <Button variant={"secondary"} size={"icon"} onClick={onCreateProject}>
            <PlusIcon className="size-4 text-neutral-400 hover:text-neutral-600" />
          </Button>
        </div>
        <DottedSeparatoo className="my-4" />
        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {projects.map((project) => (
            <li key={project.id}>
              <Link href={route('projects.show', { workspace: workspaceId, project: project.id })}>
                <Card className="shadow-none border rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      name={project.name}
                      image={project.image_url_full}
                      className="size-12"
                      fallbackClassName="text-lg"
                    />
                    <p className="text-lg font-medium truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
          {projects.length === 0 && (
            <li className="text-sm text-muted-foreground text-center col-span-full">
              Belum Ada Proyek
            </li>
          )}
        </ul>
        <Button variant={"ghost"} className="mt-4 w-full" asChild>
          <Link href={route('projects.index', { workspace: workspaceId })}>Tampilkan Semua</Link>
        </Button>
      </div>
    </div>
  );
}
