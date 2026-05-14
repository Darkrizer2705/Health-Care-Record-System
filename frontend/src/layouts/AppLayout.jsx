import { useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, Pill, FlaskConical, ClipboardList, ShieldCheck,
  HeartPulse, LogOut, Menu, X, Stethoscope, Activity,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

const NAV = {
  doctor: [
    { to: '/doctor', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/doctor/patients', label: 'Patients', icon: Users },
    { to: '/doctor/prescriptions', label: 'Prescriptions', icon: Pill },
    { to: '/doctor/labs', label: 'Labs', icon: FlaskConical },
  ],
  nurse: [
    { to: '/nurse', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/nurse/vitals', label: 'Update Vitals', icon: HeartPulse },
  ],
  pharmacist: [
    { to: '/pharmacist', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/pharmacist/queue', label: 'Prescription Queue', icon: ClipboardList },
  ],
  admin: [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/audit', label: 'Audit Logs', icon: ShieldCheck },
    { to: '/admin/labs', label: 'Labs Management', icon: FlaskConical },
  ],
};

const ROLE_LABEL = { doctor: 'Doctor', nurse: 'Nurse', pharmacist: 'Pharmacist', admin: 'Admin' };

function titleFromPath(path) {
  const seg = path.split('/').filter(Boolean);
  if (seg.length <= 1) return 'Dashboard';
  const last = seg[seg.length - 1];
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AppLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const items = NAV[user.role] || [];
  const initials = user.name.split(' ').map((p) => p[0]).slice(0, 2).join('');

  const onLogout = () => { logout(); navigate('/login'); };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <aside className={`fixed lg:sticky inset-y-0 left-0 z-40 w-64 bg-white border-r border-slate-200 flex flex-col top-0 h-screen transition-transform ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-16 px-5 flex items-center gap-2 border-b border-slate-200">
          <div className="size-9 rounded-lg flex items-center justify-center text-white bg-gradient-primary">
            <Stethoscope className="size-5" />
          </div>
          <div>
            <div className="font-semibold text-slate-900 leading-tight">MediCare EMR</div>
            <div className="text-[11px] text-slate-500">Healthcare Records</div>
          </div>
        </div>
        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          <div className="px-2 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
            {ROLE_LABEL[user.role]} workspace
          </div>
          {items.map((it) => (
            <NavLink
              key={it.to}
              to={it.to}
              end={it.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
                }`
              }
            >
              <it.icon className="size-4" /> {it.label}
            </NavLink>
          ))}
        </nav>
        <div className="p-3 border-t border-slate-200">
          <div className="flex items-center gap-3 px-2 py-2">
            <div className="size-9 rounded-full bg-brand-600 text-white flex items-center justify-center text-xs font-semibold">{initials}</div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate">{user.name}</div>
              <div className="text-xs text-slate-500 truncate">{user.email}</div>
            </div>
          </div>
          <button onClick={onLogout} className="w-full mt-1 flex items-center gap-2 px-3 py-2 text-sm rounded-md text-slate-700 hover:bg-slate-100">
            <LogOut className="size-4" /> Sign out
          </button>
        </div>
      </aside>

      {open && <div className="fixed inset-0 bg-slate-900/30 z-30 lg:hidden" onClick={() => setOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur sticky top-0 z-20 flex items-center px-4 lg:px-8 gap-3">
          <button className="lg:hidden p-2 -ml-2 rounded-md hover:bg-slate-100" onClick={() => setOpen((o) => !o)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <h1 className="text-base font-semibold flex-1">{titleFromPath(pathname)}</h1>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs px-2 py-1 rounded-full bg-brand-50 text-brand-700">
            <Activity className="size-3" /> {ROLE_LABEL[user.role]}
          </span>
        </header>
        <main className="flex-1 p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
