import { AppShell } from "@/components/app-shell";
import { DashboardPlaceholder } from "@/components/dashboard-placeholder";

export default function AnalystPage() {
  return (
    <AppShell currentPath="/analyst">
      <DashboardPlaceholder
        audience="Research Analyst Dashboard"
        description="Tenant-facing workspace for research analysts. Research calls, customer management, and plan workflows are deliberately out of scope for this foundation."
      />
    </AppShell>
  );
}
