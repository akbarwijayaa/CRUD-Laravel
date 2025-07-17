import { usePage } from "@inertiajs/react";

interface PageProps {
  taskId?: string;
}

export const useTaskId = () => {
  const { props } = usePage();
  return (props as PageProps).taskId || '';
};
