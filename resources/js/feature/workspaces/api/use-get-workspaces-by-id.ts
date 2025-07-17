import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceById = (workspaceId: string | number | undefined) => {
  return useQuery({
    queryKey: ["workspace", workspaceId],
    queryFn: async () => {
      const response = await fetch(`/api/workspaces/${workspaceId}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch workspace');
      }

      return response.json();
    },
    enabled: !!workspaceId,
  });
};
