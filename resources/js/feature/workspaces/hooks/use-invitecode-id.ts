import { usePage } from "@inertiajs/react";

interface PageProps {
  inviteCode?: string;
}

export const useInviteCode = () => {
  const { props } = usePage();
  return (props as PageProps).inviteCode || '';
};
