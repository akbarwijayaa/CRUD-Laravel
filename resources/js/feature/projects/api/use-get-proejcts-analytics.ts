import { useQuery } from "@tanstack/react-query";

export const useGetProjectAnalytics = (projectId: string | number | undefined) => {
  return useQuery({
    queryKey: ["project-analytics", projectId],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${projectId}/analytics`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project analytics');
      }

      return response.json();
    },
    enabled: !!projectId,
  });
};
