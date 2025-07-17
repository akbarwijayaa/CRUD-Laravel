import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceAnalytics = (workspaceId: string | number | undefined) => {
  return useQuery({
    queryKey: ["workspace-analytics", workspaceId],
    queryFn: async () => {
      // Placeholder implementation - replace with actual Laravel API call
      const response = await fetch(`/api/workspaces/${workspaceId}/analytics`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch workspace analytics');
      }
      
      return response.json();
    },
    enabled: !!workspaceId,
  });
};
