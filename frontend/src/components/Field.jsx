export function Field({ label, children, hint }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-slate-700">{label}</span>
      <div className="mt-1">{children}</div>
      {hint && <span className="text-xs text-slate-500 mt-1 block">{hint}</span>}
    </label>
  );
}
export function Input(props) {
  return <input {...props} className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${props.className || ''}`} />;
}
export function Textarea(props) {
  return <textarea {...props} className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${props.className || ''}`} />;
}
export function Select({ children, ...props }) {
  return <select {...props} className={`w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 ${props.className || ''}`}>{children}</select>;
}
export function Button({ variant = 'primary', className = '', ...props }) {
  const v = {
    primary: 'bg-brand-600 hover:bg-brand-700 text-white',
    ghost: 'bg-transparent hover:bg-slate-100 text-slate-700',
    outline: 'border border-slate-300 bg-white hover:bg-slate-50 text-slate-700',
    danger: 'bg-rose-600 hover:bg-rose-700 text-white',
  }[variant];
  return <button {...props} className={`inline-flex items-center gap-1.5 rounded-md px-3 py-2 text-sm font-medium transition ${v} ${className}`} />;
}
