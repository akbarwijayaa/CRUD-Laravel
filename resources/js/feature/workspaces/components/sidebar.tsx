import React from "react";
import DottedSeparatoo from "@/feature/workspaces/components/dotted-separator";
import { Navigation } from "@/feature/workspaces/components/navigation";
import WorkspaceSwitcher from "@/feature/workspaces/components/workspace-switcher";
import Projects from "@/feature/workspaces/components/projects/projects";
import Logo from "@/feature/workspaces/components/logo/logo";
import { useModalContext } from "@/contexts/modal-context";
import { usePage } from "@inertiajs/react";

interface Project {
    id: number | string;
    name: string;
    imageUrl?: string | null;
    image_url_full?: string | null;
}

interface PageProps {
    workspace?: {
        id: number | string;
    };
    projects?: {
        documents: Project[];
    };
    [key: string]: unknown;
}

export default function Sidebar() {
    const { openWorkspaceModal, openProjectModal } = useModalContext();
    const { workspace, projects } = usePage<PageProps>().props;

    const currentWorkspaceId = workspace?.id || 1;
    const projectsList = projects?.documents || [];

    return (
        <aside className="h-full border-r p-4 w-full">
            <a
                href={"/"}
                className="flex items-center justify-start rounded-lg p-2  mb-4"
            >
                {/* <Image
          src={Logo}
          alt="logo"
          width={70}
          height={48}
          className=" object-cover"
        /> */}
                <Logo />
            </a>
            <WorkspaceSwitcher onOpenCreateModal={openWorkspaceModal} />
            <DottedSeparatoo className="my-4" />
            <Navigation workspaceId={currentWorkspaceId} />
            <DottedSeparatoo className="my-4" />
            <Projects
                projects={projectsList}
                workspaceId={currentWorkspaceId}
                onOpenCreateModal={openProjectModal}
            />
        </aside>
    );
}
