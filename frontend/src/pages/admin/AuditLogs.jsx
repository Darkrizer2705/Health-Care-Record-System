import { useMemo, useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import { Field, Input, Select } from '../../components/Field.jsx';
import { mockAudit } from '../../utils/mockData.js';

export default function AuditLogs() {
  const [role, setRole] = useState('');
  const [q, setQ] = useState('');
  const rows = useMemo(() => mockAudit.filter((a) =>
    (!role || a.role === role) &&
    (!q || `${a.user} ${a.action} ${a.resource}`.toLowerCase().includes(q.toLowerCase()))
  ), [role, q]);

  return (
    <div>
      <PageHeader title="Audit logs" description="Immutable record of every clinical and administrative action." />
      <div className="bg-white border border-slate-200 rounded-xl">
        <div className="grid sm:grid-cols-3 gap-3 p-4 border-b">
          <Field label="Search"><Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="user, action, resource…" /></Field>
          <Field label="Role">
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="">All roles</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
              <option value="pharmacist">Pharmacist</option>
              <option value="admin">Admin</option>
            </Select>
          </Field>
        </div>
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-3">When</th><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Action</th><th className="p-3">Resource</th></tr>
          </thead>
          <tbody>
            {rows.map((a) => (
              <tr key={a._id} className="border-t border-slate-100">
                <td className="p-3 text-slate-500">{new Date(a.at).toLocaleString()}</td>
                <td className="p-3">{a.user}</td>
                <td className="p-3 capitalize">{a.role}</td>
                <td className="p-3 font-mono text-xs">{a.action}</td>
                <td className="p-3">{a.resource}</td>
              </tr>
            ))}
            {!rows.length && <tr><td colSpan={5} className="p-6 text-center text-slate-500">No audit events match.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
