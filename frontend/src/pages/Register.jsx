import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Stethoscope } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';
import { Field, Input, Select, Button } from '../components/Field.jsx';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor');
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault(); setErr(''); setLoading(true);
    try { const u = await register(name, email, password, role); navigate(`/${u.role}`); }
    catch (e) { setErr(e.message); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-elegant p-8">
        <div className="flex items-center gap-2 mb-2">
          <div className="size-9 rounded-lg flex items-center justify-center text-white bg-gradient-primary"><Stethoscope className="size-5" /></div>
          <span className="font-semibold">MediCare EMR</span>
        </div>
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-sm text-slate-500 mt-1">Register a new clinical user.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <Field label="Full name"><Input value={name} onChange={(e) => setName(e.target.value)} required /></Field>
          <Field label="Email"><Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required /></Field>
          <Field label="Password"><Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required /></Field>
          <Field label="Role">
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="admin">Admin</option>
            </Select>
          </Field>
          {err && <div className="text-sm text-rose-600">{err}</div>}
          <Button type="submit" className="w-full justify-center" disabled={loading}>{loading ? 'Creating…' : 'Create account'}</Button>
          <div className="text-center text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-brand-700 font-medium hover:underline">Sign in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
