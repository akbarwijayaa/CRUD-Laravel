import { useQuery } from "@tanstack/react-query";

interface UseGetMembersProps {
  workspaceId: string | number | undefined;
}

export const useGetMembers = ({ workspaceId }: UseGetMembersProps) => {
  return useQuery({
    queryKey: ["members", workspaceId],
    queryFn: async () => {
      // Use Laravel route structure
      const response = await fetch(`/workspaces/${workspaceId}/members`, {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'Accept': 'application/json',
          'X-CSRF-TOKEN': (document.querySelector('meta[name="csrf-token"]') as HTMLMetaElement)?.content || '',
        },
      });
      
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      
      return response.json();
    },
    enabled: !!workspaceId,
  });
};
