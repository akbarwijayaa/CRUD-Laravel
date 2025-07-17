"use client";
import { LogOut } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DottedSeparatoo from "@/components/dotted-separator";
import { usePage, Link } from "@inertiajs/react";

interface User {
  name: string;
  email: string;
}

interface AuthProps {
  user?: User;
}

export const UserButton = () => {

  const { auth } = usePage().props;
  const user = (auth as AuthProps).user;

  if (!user) {
  
    return null;
  }

  const { name, email } = user;

  const avatarfallback = name
    ? name.charAt(0).toUpperCase()
    : email.charAt(0).toUpperCase();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-10 hover:opacity-75 transition border border-neutral-300 rounded-full">
          <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
            {avatarfallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] transition border border-neutral-300">
            <AvatarFallback className="bg-neutral-200 font-medium text-neutral-500 flex items-center justify-center">
              {avatarfallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </div>
        <DottedSeparatoo className="mb-1" />
        <DropdownMenuItem asChild>
          <Link
            href={route("logout")}
            method="post"
            as="button"
            className="w-full flex items-center justify-center text-base py-2 text-rose-600 hover:bg-rose-50 hover:text-rose-700 transition-colors duration-75 font-medium cursor-pointer"
          >
            <LogOut className="size-4 mr-2" />
            Logout
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};