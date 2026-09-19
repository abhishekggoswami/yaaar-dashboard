import { AppShell } from "@/components/app-shell";
import { DashboardPlaceholder } from "@/components/dashboard-placeholder";

export default function AdminPage() {
  return (
    <AppShell currentPath="/admin">
      <DashboardPlaceholder
        audience="Platform Admin Dashboard"
        description="Internal operational workspace for the platform team. Tenant administration and platform controls will be designed in later tasks."
      />
    </AppShell>
  );
}
