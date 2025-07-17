import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModalContextType {
  // Workspace modal
  isWorkspaceModalOpen: boolean;
  openWorkspaceModal: () => void;
  closeWorkspaceModal: () => void;
  
  // Project modal
  isProjectModalOpen: boolean;
  openProjectModal: () => void;
  closeProjectModal: () => void;
  
  // Task modal
  isTaskModalOpen: boolean;
  openTaskModal: () => void;
  closeTaskModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModalContext = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModalContext must be used within a ModalProvider');
  }
  return context;
};

interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
  const [isWorkspaceModalOpen, setIsWorkspaceModalOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  const openWorkspaceModal = () => {
    setIsWorkspaceModalOpen(true);
  };
  
  const closeWorkspaceModal = () => {
    setIsWorkspaceModalOpen(false);
  };

  const openProjectModal = () => {
    setIsProjectModalOpen(true);
  };
  
  const closeProjectModal = () => {
    setIsProjectModalOpen(false);
  };

  const openTaskModal = () => {
    setIsTaskModalOpen(true);
  };
  
  const closeTaskModal = () => {
    setIsTaskModalOpen(false);
  };

  return (
    <ModalContext.Provider
      value={{
        isWorkspaceModalOpen,
        openWorkspaceModal,
        closeWorkspaceModal,
        isProjectModalOpen,
        openProjectModal,
        closeProjectModal,
        isTaskModalOpen,
        openTaskModal,
        closeTaskModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
