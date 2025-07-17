import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "../ui/avatar";

interface ProjectAvatarProps {
  name: string;
  image?: string;
  className?: string;
  fallbackClassName?: string;
}

export function ProjectAvatar({
  name,
  image,
  className,
  fallbackClassName,
}: ProjectAvatarProps) {
  if (image && image.trim() !== "") {
    return (
      <div
        className={cn("size-5 relative rounded-lg overflow-hidden", className)}
      >
        <img src={image} alt={name} className="object-cover" />
      </div>
    );
  }

  return (
    <Avatar className={cn("size-5", className)}>
      <AvatarFallback
        className={cn(
          "text-white bg-blue-600 font-semibold !rounded-lg text-sm uppercase",
          fallbackClassName
        )}
      >
        {name[0]}
      </AvatarFallback>
    </Avatar>
  );
}
