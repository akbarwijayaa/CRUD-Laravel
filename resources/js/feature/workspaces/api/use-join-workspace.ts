import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface JoinWorkspaceProps {
  json: { inviteCode: string };
  param: { workspaceId: string };
}

export function useJionWorkspace() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ json, param }: JoinWorkspaceProps) => {
      const response = await fetch(`/api/workspaces/${param.workspaceId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
        body: JSON.stringify(json),
      });

      if (!response.ok) {
        throw new Error('Failed to join workspace');
      }

      return response.json();
    },

    onSuccess: (data) => {
      toast.success('Workspace joined successfully');
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data?.$id] });
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to join workspace');
    },
  });
}
