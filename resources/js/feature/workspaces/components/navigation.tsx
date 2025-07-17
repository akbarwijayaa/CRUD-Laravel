import { cn } from "@/lib/utils";
import { Link, usePage } from "@inertiajs/react";
import { SettingsIcon, UsersIcon } from "lucide-react";
import { GoCheckCircle, GoCheckCircleFill, GoHome, GoHomeFill } from "react-icons/go";

const routes = [
  {
    label: "Home",
    href: "workspaces.show",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    label: "My Tasks",
    href: "tasks.index",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    label: "Settings",
    href: "workspaces.settings",
    icon: SettingsIcon,
    activeIcon: SettingsIcon,
  },
  {
    label: "Members",
    href: "members.index",
    icon: UsersIcon,
    activeIcon: UsersIcon,
  },
];

export const Navigation = ({ workspaceId }: { workspaceId: number | string }) => {
  const { url } = usePage();

  return (
    <ul className="flex flex-col space-y-1">
      {routes.map((item) => {
        const fullHref = route(item.href, { workspace: workspaceId });
        const isActive = url === fullHref.replace(window.location.origin, '');

        const Icon = isActive ? item.activeIcon : item.icon;

        return (
          <li key={item.href}>
            <Link
              href={fullHref}
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500 text-sm",
                isActive && "bg-neutral-900 shadow-sm text-primary"
              )}
            >
              <Icon className={cn("size-5", isActive ? "text-primary" : "text-neutral-500")} />
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
