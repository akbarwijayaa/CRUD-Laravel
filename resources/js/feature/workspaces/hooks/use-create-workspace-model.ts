import { useState } from "react";

export const useCreateWorkspaceModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return {
    open,
    isOpen,
    close,
    setIsOpen,
  };
};
