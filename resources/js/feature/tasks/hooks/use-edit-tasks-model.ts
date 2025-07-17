import { useState, useEffect } from "react";

// Global state store
class EditTaskModelStore {
  private taskId: string | null = null;
  private listeners: Set<() => void> = new Set();

  getTaskId() {
    return this.taskId;
  }

  open(id: string) {
    this.taskId = id;
    this.notifyListeners();
  }

  close() {
    this.taskId = null;
    this.notifyListeners();
  }

  setTaskId(id: string | null) {
    this.taskId = id;
    this.notifyListeners();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notifyListeners() {
    this.listeners.forEach(listener => listener());
  }
}

const editTaskModelStore = new EditTaskModelStore();

export const useEditTaskModel = () => {
  const [taskId, setTaskId] = useState<string | null>(editTaskModelStore.getTaskId());
  
  useEffect(() => {
    const unsubscribe = editTaskModelStore.subscribe(() => {
      setTaskId(editTaskModelStore.getTaskId());
    });
    
    return () => {
      unsubscribe();
    };
  }, []);
  
  return {
    taskId,
    open: (id: string) => editTaskModelStore.open(id),
    close: () => editTaskModelStore.close(),
    setTaskId: (id: string | null) => editTaskModelStore.setTaskId(id),
  };
};
