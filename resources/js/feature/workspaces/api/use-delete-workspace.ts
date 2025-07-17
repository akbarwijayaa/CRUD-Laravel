import { useMutation, useQueryClient } from "@tanstack/react-query";
import { router } from "@inertiajs/react";
import { toast } from "sonner";

interface DeleteWorkspaceProps {
  param: { workspaceId: string };
}

export function useDeleteWorkspace() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ param }: DeleteWorkspaceProps) => {
      const response = await fetch(`/api/workspaces/${param.workspaceId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete workspace');
      }

      return response.json();
    },

    onSuccess: (data) => {
      toast.success('Workspace deleted successfully');
      
      // Use the redirect URL from the response if available, otherwise default to '/'
      const redirectUrl = data?.redirect || '/';
      router.visit(redirectUrl);
      
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      // Clear all workspace-related queries since the workspace is deleted
      queryClient.invalidateQueries({ queryKey: ['workspace'] });
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to delete workspace');
    },
  });
}
