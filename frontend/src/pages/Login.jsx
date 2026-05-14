import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Field, Input, Button } from '../components/Field.jsx';

const DEMO = [
  { role: 'doctor', email: 'doctor@demo.com' },
  { role: 'nurse', email: 'nurse@demo.com' },
  { role: 'pharmacist', email: 'pharmacist@demo.com' },
  { role: 'admin', email: 'admin@demo.com' },
];

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setErr(''); setLoading(true);
    try {
      const u = await login(email, password);
      navigate(`/${u.role}`);
    } catch (e) { setErr(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-50">
      <div className="hidden lg:flex flex-col justify-between p-10 bg-gradient-primary text-white">
        <div className="flex items-center gap-2">
          <div className="size-10 rounded-lg bg-white/20 flex items-center justify-center"><Stethoscope className="size-5" /></div>
          <span className="font-semibold text-lg">MediCare EMR</span>
        </div>
        <div>
          <h2 className="text-3xl font-bold leading-tight">Secure healthcare records, role-based by design.</h2>
          <p className="mt-3 text-white/85 max-w-md">Doctors, nurses, pharmacists and admins each get a tailored workspace with strict access control and full audit trails.</p>
        </div>
        <div className="text-xs text-white/70">© {new Date().getFullYear()} MediCare</div>
      </div>
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-elegant p-8">
          <h1 className="text-2xl font-semibold">Sign in</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back. Use your clinical credentials.</p>
          <form onSubmit={submit} className="mt-6 space-y-4">
            <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
            <Field label="Password"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></Field>
            {err && <div className="text-sm text-rose-600">{err}</div>}
            <Button type="submit" className="w-full justify-center" disabled={loading}>{loading ? 'Signing in…' : 'Sign in'}</Button>
            <div className="text-center text-sm text-slate-500">
              Don't have an account? <Link to="/register" className="text-brand-700 font-medium hover:underline">Register</Link>
            </div>
          </form>
          <div className="mt-6 border-t pt-4">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Quick demo accounts</div>
            <div className="grid grid-cols-2 gap-2">
              {DEMO.map((d) => (
                <button key={d.role} type="button" onClick={() => { setEmail(d.email); setPassword('demo1234'); }}
                  className="text-left text-xs rounded-md border border-slate-200 px-3 py-2 hover:bg-slate-50">
                  <div className="font-medium capitalize text-slate-800">{d.role}</div>
                  <div className="text-slate-500 truncate">{d.email}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
