export type Project = {
  id: number;
  name: string;
  description?: string;
  imageUrl?: string;
  image_url_full?: string;
  workspace_id: number;
  owner_id: number;
  status?: string;
  created_at: string;
  updated_at: string;
  // Relations (defined inline to avoid circular deps)
  owner?: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  workspace?: {
    id: number;
    name: string;
    imageUrl?: string;
    image_url_full?: string;
    created_at: string;
    updated_at: string;
  };
  // Backward compatibility properties
  $id?: string;
  workspaceId?: string;
};
