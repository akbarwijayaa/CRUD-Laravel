"use client";
import { ResponsiveModel } from "@/components/responsive/responsive-model";
import { useModalContext } from "@/contexts/modal-context";
import CreateProjectsForm from "./create-project-form";

export function CreateProjectModel() {
  const { isProjectModalOpen, closeProjectModal } = useModalContext();

  return (
    <ResponsiveModel open={isProjectModalOpen} onOpenChange={(open) => !open && closeProjectModal()}>
      <CreateProjectsForm onCancel={closeProjectModal} />
    </ResponsiveModel>
  );
}
