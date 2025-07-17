import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/feature/workspaces/ui/avatar";

interface WorkspaceAvatarProps {
  name: string;
  image?: string;
  className?: string;
}

export default function WorkspaceAvatar({
  name,
  image,
  className,
}: WorkspaceAvatarProps) {
if (image && image.trim() !== "") {
    return (
      <Avatar className={cn("size-8", className)}>
        <AvatarImage src={image} alt={name} className="object-cover" />
        <AvatarFallback>{name[0]}</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Avatar className={cn("size-8", className)}>
      <AvatarFallback className="text-white bg-blue-600 font-semibold !rounded-lg text-lg uppercase">
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}