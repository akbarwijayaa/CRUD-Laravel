import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateProjectProps {
  form: Record<string, unknown>;
  param: { projectId: string };
}

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ form, param }: UpdateProjectProps) => {
      const response = await fetch(`/api/projects/${param.projectId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
        },
        body: JSON.stringify(form),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update project');
      }
      
      return response.json();
    },

    onSuccess: (data) => {
      toast.success('Project updated successfully');
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      queryClient.invalidateQueries({ queryKey: ['project', data?.$id] });
    },
    
    onError: (error) => {
      toast.error(error.message || 'Failed to update project');
    },
  });
};
