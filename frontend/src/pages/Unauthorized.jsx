import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

export default function Unauthorized() {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="text-center max-w-md">
        <div className="mx-auto size-12 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center"><ShieldAlert /></div>
        <h1 className="mt-4 text-2xl font-semibold">Access denied</h1>
        <p className="mt-2 text-slate-500">You don't have permission to view this page.</p>
        <Link to="/" className="inline-flex mt-6 px-4 py-2 rounded-md bg-brand-600 text-white text-sm font-medium hover:bg-brand-700">Go home</Link>
      </div>
    </div>
  );
}
