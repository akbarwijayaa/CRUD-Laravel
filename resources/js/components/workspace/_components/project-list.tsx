import { PlusIcon } from "lucide-react";
import { Button } from "../../ui/button";
import DottedSeparatoo from "../../ui/dotted-separator";
import { Card, CardContent } from "../../ui/card";
import { useWorkspaceId } from "@/feature/workspaces/hooks/use-workspace-id";
import { useCreateProjectModel } from "@/feature/projects/hooks/use-create-projects-model";
import { ProjectAvatar } from "./project-avatar";

import { Models } from "node-appwrite";

export type Project = Models.Document & {
  name: string;
  imageUrl: string;
  workspaceId: string;
};

interface ProjectListProps {
  data: Project[];
  total: number;
}

export function ProjectList({ data, total }: ProjectListProps) {
  const workspaceId = useWorkspaceId();
  const { open: createTask } = useCreateProjectModel();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-neutral-900 border rounded-lg p-4">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold">Projects ({total})</p>
          <Button variant={"secondary"} size={"icon"} onClick={createTask}>
            <PlusIcon className="size-4 text-neutral-400 hover:text-neutral-600" />
          </Button>
        </div>
        <DottedSeparatoo className="my-4" />
        <ul className="grid grid-col-1 lg:grid-col-2 gap-4">
          {data.map((project) => (
            <li key={project.$id}>
              <a href={`/workspaces/${workspaceId}/projects/${project.$id}`}>
                <Card className="shadow-none border-none rounded-lg hover:opacity-75 transition">
                  <CardContent className="p-4 flex items-center gap-x-2.5">
                    <ProjectAvatar
                      name={project.name}
                      image={project.imageUrl}
                      className="size-12"
                      fallbackClassName="text-lg"
                    />

                    <p className="text-lg font-medium truncate">
                      {project.name}
                    </p>
                  </CardContent>
                </Card>
              </a>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No Projects Found
          </li>
        </ul>
        {/* TODO: add button show all project  */}
        {/* <Button variant={"muted"} className="mt-4 w-full">
          <Link href={`/workspaces/${workspaceId}/projects`}>show All</Link>
        </Button> */}
      </div>
    </div>
  );
}
