import { useQuery } from "@tanstack/react-query";

export const useGetProjectById = (projectId: string | number | undefined) => {
  return useQuery({
    queryKey: ["project", projectId],
    queryFn: async () => {
      const response = await fetch(`/api/projects/${projectId}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch project');
      }

      return response.json();
    },
    enabled: !!projectId,
  });
};
