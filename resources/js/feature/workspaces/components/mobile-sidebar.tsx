"use client";

import { MenuIcon } from "lucide-react";
import { Button } from "@/feature/workspaces/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/feature/workspaces/ui/sheet";
import Sidebar from "@/feature/workspaces/components/sidebar";

export default function MobileSidebar() {
  return (
    <Sheet modal={false}>
      <SheetTrigger asChild>
        <Button size={"icon"} variant={"secondary"} className="lg:hidden">
          <MenuIcon className="size-4 text-neutral-500" />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
}