import CreateWorkSpacesForm from "@/feature/workspaces/components/create-workspaces-form";
import AuthenticatedLayout from "@/feature/workspaces/layout/create-workspace-layout"; // Gunakan layout Anda
import { Head, usePage } from "@inertiajs/react";
import { useEffect } from "react";
import { toast } from "sonner";

export default function CreateWorkspacePage() {
    const { success, error } = (usePage().props.flash as { success?: string; error?: string }) || {};

    useEffect(() => {
        if (success) {
            toast.success(success);
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error]);


    return (
        <AuthenticatedLayout>
            <Head title="Create Your First Workspace" />

            <div className="py-12">
                <div className="max-w-2xl mx-auto sm:px-6 lg:px-8">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold mb-4">
                            Welcome! Let's create your first workspace
                        </h1>
                        <p className="text-lg max-w-md mx-auto">
                            A workspace is where you'll manage your projects, tasks, and collaborate with your team.
                        </p>
                    </div>
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <CreateWorkSpacesForm />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
