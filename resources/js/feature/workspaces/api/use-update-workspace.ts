import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface UpdateWorkspaceProps {
  form: Record<string, unknown>;
  param: { workspaceId: string };
}

export const useUpdateWorkspace = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ form, param }: UpdateWorkspaceProps) => {
      const formData = new FormData();
      
      // Handle form data properly
      Object.keys(form).forEach(key => {
        const value = form[key];
        if (value instanceof File) {
          formData.append(key, value);
        } else if (value !== undefined && value !== null && value !== '') {
          formData.append(key, String(value));
        }
      });
      
      // Add method override for Laravel
      formData.append('_method', 'PUT');
      
      const response = await fetch(`/api/workspaces/${param.workspaceId}`, {
        method: 'POST', // Use POST with _method override
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: formData,
      });
      
      if (!response.ok) {
        throw new Error('Failed to update workspace');
      }
      
      return response.json();
    },

    onSuccess: (data) => {
      toast.success('Workspace updated successfully');
      queryClient.invalidateQueries({ queryKey: ['workspaces'] });
      queryClient.invalidateQueries({ queryKey: ['workspace', data?.data?.id] });
    },
    
    onError: (error) => {
      toast.error(error.message || 'Failed to update workspace');
    },
  });
};
