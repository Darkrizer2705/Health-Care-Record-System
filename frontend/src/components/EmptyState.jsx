export default function EmptyState({ title = 'No data', description, action }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center">
      <div className="text-base font-semibold text-slate-800">{title}</div>
      {description && <div className="mt-1 text-sm text-slate-500">{description}</div>}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}
