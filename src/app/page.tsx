import Link from "next/link";

const routes = [
  { href: "/admin", label: "Platform Admin Dashboard" },
  { href: "/analyst", label: "Research Analyst Dashboard" },
  { href: "/customer", label: "Customer Dashboard" },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-8 px-6 py-16">
      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-500">TASK-001</p>
        <h1 className="text-4xl font-semibold tracking-tight">
          FinTech SaaS foundation
        </h1>
        <p className="text-slate-600">
          Select a placeholder role experience to verify route wiring.
        </p>
      </div>
      <ul className="grid gap-3 sm:grid-cols-3">
        {routes.map((route) => (
          <li key={route.href}>
            <Link
              className="block rounded-lg border bg-white p-4 text-sm font-medium transition-colors hover:bg-slate-50"
              href={route.href}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
