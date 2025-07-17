import Navbar from "@/feature/workspaces/components/navbar";
import Sidebar from "@/feature/workspaces/components/sidebar";
import { CreateProjectModel } from "@/feature/projects/components/create-project-model";
import { CreateTaskModel } from "@/feature/tasks/components/create-task-model";
import { EditTaskModel } from "@/feature/tasks/components/edit-task-model";
import { CreateWorkspaceModel } from "@/feature/workspaces/components/create-workspace-model";
import { ModalProvider } from "@/contexts/modal-context";

interface ChildrenProps {
  children: React.ReactNode;
}
export default function layout({ children }: ChildrenProps) {
  return (
    <ModalProvider>
      <div className="min-h-screen">
        <CreateWorkspaceModel />
        <CreateProjectModel />
        <CreateTaskModel />
        <EditTaskModel />
        <div className="flex w-full h-full">
          <div className="fixed left-0 top-0 hidden lg:block h-full lg:w-[264px] overflow-y-auto">
            <Sidebar />
          </div>
          <div className="lg:pl-[264px] w-full">
            <Navbar />
            <div className="mx-auto max-w-screen-2xl h-full">
              <main className="h-full lg:py-8 lg:px-6 py-6 px-3.5 flex flex-col">
                {children}
              </main>
            </div>
          </div>
        </div>
      </div>
    </ModalProvider>
  );
}
