import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateInviteCodeProps {
  param: { workspaceId: string };
}

export const useUpdateInviteCodeWorkspace = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ param }: UpdateInviteCodeProps) => {
      const response = await fetch(`/api/workspaces/${param.workspaceId}/reset-invite-code`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to reset invite code');
      }

      return response.json();
    },

    onSuccess: (data) => {
      toast.success('Invite code reset successfully');
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data.$id] });
    },

    onError: (error) => {
      toast.error(error.message || 'Failed to reset invite code');
    },
  });
};
