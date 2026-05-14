const STYLES = {
  pending:     'bg-amber-100 text-amber-800',
  dispensed:   'bg-emerald-100 text-emerald-800',
  requested:   'bg-sky-100 text-sky-800',
  'in-progress':'bg-indigo-100 text-indigo-800',
  completed:   'bg-emerald-100 text-emerald-800',
  cancelled:   'bg-rose-100 text-rose-800',
};
export default function StatusBadge({ status }) {
  const cls = STYLES[status] || 'bg-slate-100 text-slate-700';
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{status}</span>;
}
