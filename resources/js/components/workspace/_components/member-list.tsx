import { Button } from "@/components/ui/button";
import DottedSeparatoo from "@/components/ui/dotted-separator";
import { Card, CardContent } from "@/components/ui/card";
import { useWorkspaceId } from "@/feature/workspaces/hooks/use-workspace-id";
import MemberAvatar from "./member-avatar";

import { Models } from "node-appwrite";

export enum Member_Role {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER",
}

export type Member = Models.Document & {
  workspaceId: string;
  userId: string;
  role: Member_Role;
};

interface MembersListProps {
  data: Member[];
  total: number;
}

export function MembersList({ data, total }: MembersListProps) {
  const workspaceId = useWorkspaceId();

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-neutral-900 border rounded-lg p-4">
        <div className="flex items-center justify-start">
          <p className="text-lg font-semibold">Members ({total})</p>
        </div>
        <DottedSeparatoo className="my-4" />
        <ul className="grid grid-col-1 sm:grid-col-2 lg:grid-col-3 gap-4">
          {data.map((member) => (
            <li key={member.$id}>
              <Card className="shadow-none border-none rounded-lg overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center gap-x-2.5">
                  <MemberAvatar
                    name={member.name}
                    className="size-12"
                    fallbackClassName="text-lg"
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-lg font-medium line-clamp-1">
                      {member.name}
                    </p>

                    <p className="text-lg font-medium text-muted-foreground line-clamp-1">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          <li className="text-sm text-muted-foreground text-center hidden first-of-type:block">
            No Members Found
          </li>
        </ul>
        <Button variant={"default"} className="mt-4 w-full">
          <a href={`/workspaces/${workspaceId}/members`}>show All</a>
        </Button>
      </div>
    </div>
  );
}
