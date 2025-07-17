import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceInfo = (workspaceId: string | number | undefined) => {
  return useQuery({
    queryKey: ["workspace-info", workspaceId],
    queryFn: async () => {
      const response = await fetch(`/api/workspaces/${workspaceId}/info`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workspace info');
      }

      return response.json();
    },
    enabled: !!workspaceId,
  });
};
