import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface DeleteProjectProps {
  param: { projectId: string };
}

export function useDeleteProject() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ param }: DeleteProjectProps) => {
      const response = await fetch(`/api/projects/${param.projectId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete project');
      }

      return response.json();
    },

    onSuccess: (data) => {
      toast.success('Project deleted successfully');
      router.visit('/');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data?.$id] });
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to delete project');
    },
  });
}
