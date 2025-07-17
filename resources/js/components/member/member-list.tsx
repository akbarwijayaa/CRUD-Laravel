import { Link } from "@inertiajs/react"; // ✅ Gunakan Link dari Inertia
import { Button } from "../ui/button";
import DottedSeparatoo from "../dotted-separator";
import { Card, CardContent } from "../ui/card";
import { Member } from "@/feature/members/types/type";
import MemberAvatar from "@/feature/members/components/member-avatar";

// ✅ Definisikan interface props yang baru
interface MembersListProps {
  data: Member[];
  total: number;
  workspaceId: number | string;
}

export function MembersList({ data, total, workspaceId }: MembersListProps) {
  // ❌ Hapus hook useWorkspaceId

  // Handle empty or null data
  const members = data || [];
  const memberTotal = total || 0;

  return (
    <div className="flex flex-col gap-y-4 col-span-1">
      <div className="bg-neutral-900 border rounded-lg p-4">
        <div className="flex items-center justify-start">
          <p className="text-lg font-semibold">Anggota ({memberTotal})</p>
        </div>
        <DottedSeparatoo className="my-4" />
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {members.map((member) => (
            <li key={member.id}> {/* ✅ Gunakan id bukan $id */}
              <Card className="shadow-none border-none rounded-lg overflow-hidden">
                <CardContent className="p-4 flex flex-col items-center gap-y-2 text-center">
                  <MemberAvatar
                    name={member.name}
                    className="size-12"
                    fallbackClassName="text-lg"
                  />
                  <div className="flex flex-col items-center overflow-hidden">
                    <p className="text-base font-medium w-full truncate">
                      {member.name}
                    </p>
                    <p className="text-sm font-medium text-muted-foreground w-full truncate">
                      {member.email}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </li>
          ))}
          {members.length === 0 && (
             <li className="text-sm text-muted-foreground text-center col-span-full">
               Belum Ada Anggota
             </li>
          )}
        </ul>
        {/* ✅ Gunakan prop `asChild` agar Button bisa berfungsi sebagai Link */}
        <Button variant={"ghost"} className="mt-4 w-full" asChild>
          <Link href={route('members.index', { workspace: workspaceId })}>Tampilkan Semua</Link>
        </Button>
      </div>
    </div>
  );
}
