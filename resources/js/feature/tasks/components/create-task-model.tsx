"use client";
import { ResponsiveModel } from "@/components/responsive/responsive-model";
import { useModalContext } from "@/contexts/modal-context";
import CreateTaskWrapper from "./create-task-wrapper";

export function CreateTaskModel() {
  const { isTaskModalOpen, closeTaskModal } = useModalContext();
  return (
    <ResponsiveModel open={isTaskModalOpen} onOpenChange={(open) => !open && closeTaskModal()}>
      <CreateTaskWrapper onCancel={closeTaskModal} />
    </ResponsiveModel>
  );
}
