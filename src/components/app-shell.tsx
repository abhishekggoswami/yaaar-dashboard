import Link from "next/link";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

const destinations = [
  { href: "/admin", label: "Platform Admin" },
  { href: "/analyst", label: "Research Analyst" },
  { href: "/customer", label: "Customer" },
] as const;

type AppShellProps = {
  children: ReactNode;
  currentPath: (typeof destinations)[number]["href"];
};

export function AppShell({ children, currentPath }: AppShellProps) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <Link className="font-semibold tracking-tight" href="/">
            FinTech SaaS
          </Link>
          <nav aria-label="Role dashboards" className="flex flex-wrap gap-1">
            {destinations.map((destination) => (
              <Link
                className={cn(
                  "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  destination.href === currentPath
                    ? "bg-slate-900 text-white"
                    : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                )}
                href={destination.href}
                key={destination.href}
              >
                {destination.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
    </div>
  );
}
