import { useQuery } from "@tanstack/react-query";

interface UseGetTasksProps {
  workspaceId: string | number | undefined;
}

interface UseGetTasksOptions {
  enabled?: boolean;
}

export const useGetTasks = ({ workspaceId }: UseGetTasksProps, options?: UseGetTasksOptions) => {
  return useQuery({
    queryKey: ["tasks", workspaceId],
    queryFn: async () => {
      // Placeholder implementation - replace with actual Laravel API call
      const response = await fetch(`/api/tasks?workspaceId=${workspaceId}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }
      
      return response.json();
    },
    enabled: !!workspaceId && (options?.enabled !== false),
  });
};
