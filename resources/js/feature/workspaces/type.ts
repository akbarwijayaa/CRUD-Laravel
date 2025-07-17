export type Workspace = {
  id: number;
  name: string;
  imageUrl?: string;
  image_url_full?: string;
  description?: string;
  owner_id?: number;
  invite_code?: string;
  created_at: string;
  updated_at: string;
  // Relations (defined as separate interfaces to avoid circular deps)
  owner?: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  };
  members?: {
    id: number;
    name: string;
    email: string;
    created_at: string;
    updated_at: string;
  }[];
  // Backward compatibility properties
  $id?: string;
  inviteCode?: string;
};
