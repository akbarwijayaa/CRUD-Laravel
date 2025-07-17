import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface EditTaskProps {
  taskId: string;
  name?: string;
  workspaceId?: string;
  status?: string;
  projectId?: string;
  assigneeId?: string;
  description?: string | null;
  dueDate?: Date;
}

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ taskId, ...data }: EditTaskProps) => {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to update task');
      }

      return response.json();
    },
    onSuccess: () => {
      toast.success('Task updated successfully');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to update task');
    },
  });
};
