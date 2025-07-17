import { useMedia } from "react-use";
import { Dialog, DialogContent } from "../ui/dialog";
import { Drawer, DrawerContent } from "../ui/drawer";

interface ResponsiveModelProps {
  children: React.ReactNode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ResponsiveModel({
  children,
  open,
  onOpenChange,
}: ResponsiveModelProps) {
  const isDisktop = useMedia("(min-width:1024px)", true);

  if (isDisktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent 
          className="w-full border-none sm:max-w-lg p-0 overflow-y-auto hide-scrollbar max-h-[85vh]"
          onInteractOutside={(e) => {
            // Prevent closing when clicking on date picker or select dropdowns
            const target = e.target as HTMLElement;
            if (target.closest('[data-radix-popper-content-wrapper]') || 
                target.closest('[data-radix-select-content]') ||
                target.closest('[role="dialog"]')) {
              e.preventDefault();
            }
          }}
        >
          {children}
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="overflow-y-auto hide-scrollbar max-h-[85vh]">
          {children}
        </div>
      </DrawerContent>
    </Drawer>
  );
}
