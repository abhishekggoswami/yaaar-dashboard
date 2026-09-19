import { AppShell } from "@/components/app-shell";
import { DashboardPlaceholder } from "@/components/dashboard-placeholder";

export default function CustomerPage() {
  return (
    <AppShell currentPath="/customer">
      <DashboardPlaceholder
        audience="Customer Dashboard"
        description="Customer-facing workspace for clients of research analysts. Baskets, history, subscriptions, and account workflows will be introduced only when their requirements are defined."
      />
    </AppShell>
  );
}
