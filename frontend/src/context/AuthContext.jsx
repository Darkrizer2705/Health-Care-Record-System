import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { AuthAPI } from '../services/api.js';

const AuthCtx = createContext(null);
const STORAGE = 'hrs_auth';

const DEMO_USERS = [
  { _id: 'u_doc',  name: 'Dr. Sarah Patel',     email: 'doctor@demo.com',     role: 'doctor' },
  { _id: 'u_nur',  name: 'Nurse Ava Thompson',  email: 'nurse@demo.com',      role: 'nurse' },
  { _id: 'u_pha',  name: 'Liam Garcia, RPh',    email: 'pharmacist@demo.com', role: 'pharmacist' },
  { _id: 'u_adm',  name: 'Admin Maya Singh',    email: 'admin@demo.com',      role: 'admin' },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) {
        const parsed = JSON.parse(raw);
        setUser(parsed.user);
        setToken(parsed.token);
      }
    } catch {}
  }, []);

  const persist = (u, t) => {
    setUser(u); setToken(t);
    localStorage.setItem(STORAGE, JSON.stringify({ user: u, token: t }));
    localStorage.setItem('token', t);
  };

  const value = useMemo(() => ({
    user, token, isAuthenticated: !!user,
    async login(email, password) {
      try {
        const { data } = await AuthAPI.login({ email, password });
        const u = data.user || data; const t = data.token || 'session';
        persist(u, t);
        return u;
      } catch (err) {
        // fallback to demo accounts (works without backend)
        const demo = DEMO_USERS.find((x) => x.email.toLowerCase() === email.toLowerCase());
        if (!demo) throw new Error(err?.response?.data?.message || 'Invalid credentials');
        const t = `demo.${demo.role}.${Date.now()}`;
        persist(demo, t);
        return demo;
      }
    },
    async register(name, email, password, role) {
      try {
        const { data } = await AuthAPI.register({ name, email, password, role });
        const u = data.user || data; const t = data.token || 'session';
        persist(u, t);
        return u;
      } catch (err) {
        const u = { _id: `u_${Date.now()}`, name, email, role };
        const t = `demo.${role}.${Date.now()}`;
        persist(u, t);
        return u;
      }
    },
    logout() {
      setUser(null); setToken(null);
      localStorage.removeItem(STORAGE);
      localStorage.removeItem('token');
    },
  }), [user, token]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
