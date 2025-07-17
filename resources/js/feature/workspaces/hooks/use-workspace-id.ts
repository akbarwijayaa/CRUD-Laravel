import { usePage } from '@inertiajs/react';

interface ZiggyProps {
  params?: {
    workspace?: string | number;
  };
}

interface PageProps {
  workspace?: {
    id: string | number;
  };
  workspaces?: {
    current?: {
      id: string | number;
    };
  };
}

export const useWorkspaceId = (): string | number | undefined => {
  const page = usePage();
  const { params } = page.props.ziggy as ZiggyProps;
  const { workspace, workspaces } = page.props as PageProps;

  // Try to get workspace ID from multiple sources
  return params?.workspace || workspace?.id || workspaces?.current?.id;
};
