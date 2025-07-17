export enum Member_Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

// Laravel User model
export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at?: string;
  created_at: string;
  updated_at: string;
};

// For workspace members (pivot table data)
export type Member = User & {
  pivot?: {
    workspace_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
  };
  role?: Member_Role;
};
