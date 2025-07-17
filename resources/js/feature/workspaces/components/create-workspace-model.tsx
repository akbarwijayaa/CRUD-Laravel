"use client";
import { ResponsiveModel } from "@/components/responsive/responsive-model";
import CreateWorkSpacesForm from "./create-workspaces-form";
import { useModalContext } from "@/contexts/modal-context";

export function CreateWorkspaceModel() {
  const { isWorkspaceModalOpen, closeWorkspaceModal } = useModalContext();
  
  console.log('CreateWorkspaceModel render:', { isWorkspaceModalOpen });
  
  return (
    <ResponsiveModel open={isWorkspaceModalOpen} onOpenChange={(open) => !open && closeWorkspaceModal()}>
      <CreateWorkSpacesForm />
    </ResponsiveModel>
  );
}
