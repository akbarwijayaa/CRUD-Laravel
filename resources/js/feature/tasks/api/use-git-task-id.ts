import { useQuery } from "@tanstack/react-query";

export const useGetTaskById = (taskId: string) => {
  return useQuery({
    queryKey: ["task", taskId],
    queryFn: async () => {
      // Placeholder implementation - replace with actual Laravel API call
      const response = await fetch(`/api/tasks/${taskId}`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch task');
      }
      
      const data = await response.json();
      return {
        ...data,
        assigneeId: data.assignee_id,
        projectId: data.project_id,
        dueDate: data.due_date
      };
    },
    enabled: !!taskId,
  });
};
