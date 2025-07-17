import { UserButton } from "@/feature/auth/components/user-button";
import Logo from "@/feature/workspaces/components/logo/logo";

interface LayoutProps {
  children: React.ReactNode;
}
export default function layout({ children }: LayoutProps) {
  return (
    <main className="bg-neutral-900 min-h-screen">
      <div className="mx-auto max-w-screen-2xl gap-2 px-4 py-2.5">
        <nav className="flex items-center justify-between h-[74px]">
          <a href={"/"}>
            <Logo />
          </a>

          <UserButton />
        </nav>

        <div className="flex flex-col justify-center align-center py-4">
          {children}
        </div>
      </div>
    </main>
  );
}
