import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { router } from "@inertiajs/react";

interface CreateTaskProps {
  name: string;
  workspaceId: string;
  status: string;
  projectId: string;
  assigneeId: string;
  description?: string | null;
  dueDate: Date;
}

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskProps) => {
      const response = await fetch(`/workspaces/${data.workspaceId}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create task');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Task created successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['members'] });
      // Refresh the page to update the task list using Inertia
      router.reload();
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create task');
    },
  });
};
