export default function StatCard({ icon: Icon, label, value, hint }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <div className="text-sm text-slate-500">{label}</div>
        {Icon && <div className="size-9 rounded-lg bg-brand-50 text-brand-700 flex items-center justify-center"><Icon className="size-4" /></div>}
      </div>
      <div className="mt-2 text-2xl font-semibold text-slate-900">{value}</div>
      {hint && <div className="mt-1 text-xs text-slate-500">{hint}</div>}
    </div>
  );
}
