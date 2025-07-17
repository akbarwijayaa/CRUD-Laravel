import { UserButton } from "@/feature/auth/components/user-button";
import MobileSidebar from "@/feature/workspaces/components/mobile-sidebar";
import { usePage } from "@inertiajs/react"; // Ganti usePathname dengan usePage

const pathnameMap = {
  tasks: {
    title: "My Tasks",
    description: "View all of your tasks",
  },
  projects: {
    title: "My Projects",
    description: "View all of your projects",
  },
  // Anda bisa tambahkan key lain jika perlu
  // settings: {
  //   title: "Settings",
  //   description: "Manage your workspace settings",
  // }
};

const defaultMap = {
  title: "Dashboard", // Ganti "Home" menjadi "Dashboard" agar lebih umum
  description: "Monitor all your projects and tasks",
};

export default function Navbar() {
  // Ambil `url` dari hook usePage(). Ini berisi path relatif seperti "/workspaces/1/tasks"
  const { url } = usePage();
  const pathnameParts = url.split("/"); // -> ["", "workspaces", "1", "tasks"]

  // Logika selanjutnya tidak perlu diubah sama sekali
  const pathnameKey = pathnameParts[3] as keyof typeof pathnameMap;
  const { title, description } = pathnameMap[pathnameKey] || defaultMap;

  return (
    <nav className="pt-4 px-6 flex items-center justify-between gap-3">
      <div className="hidden flex-col lg:flex">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <div className="text-muted-foreground">{description}</div>
      </div>

      {/* Komponen-komponen ini bisa langsung digunakan */}
      <MobileSidebar />
      <div className="ml-auto">
        <UserButton />
      </div>
    </nav>
  );
}
