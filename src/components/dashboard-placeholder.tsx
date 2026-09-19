type DashboardPlaceholderProps = {
  audience: string;
  description: string;
};

export function DashboardPlaceholder({
  audience,
  description,
}: DashboardPlaceholderProps) {
  return (
    <section className="max-w-2xl space-y-6">
      <p className="text-sm font-medium text-slate-500">Foundation route</p>
      <div className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">{audience}</h1>
        <p className="text-base leading-7 text-slate-600">{description}</p>
      </div>
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-sm text-slate-500">
        This intentionally contains no production data, authentication, or
        business workflows yet.
      </div>
    </section>
  );
}
