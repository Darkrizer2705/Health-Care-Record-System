import { Users, Pill, FlaskConical, ShieldCheck } from 'lucide-react';
import StatCard from '../../components/StatCard.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { mockPatients, mockPrescriptions, mockLabs, mockAudit } from '../../utils/mockData.js';

export default function AdminDashboard() {
  return (
    <div>
      <PageHeader title="Admin Dashboard" description="System-wide activity and security overview." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Patients" value={mockPatients.length} />
        <StatCard icon={Pill} label="Prescriptions" value={mockPrescriptions.length} />
        <StatCard icon={FlaskConical} label="Lab orders" value={mockLabs.length} />
        <StatCard icon={ShieldCheck} label="Audit events" value={mockAudit.length} />
      </div>

      <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 font-semibold border-b">Recent activity</div>
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-3">When</th><th className="p-3">User</th><th className="p-3">Role</th><th className="p-3">Action</th><th className="p-3">Resource</th></tr>
          </thead>
          <tbody>
            {mockAudit.map((a) => (
              <tr key={a._id} className="border-t border-slate-100">
                <td className="p-3 text-slate-500">{new Date(a.at).toLocaleString()}</td>
                <td className="p-3">{a.user}</td>
                <td className="p-3 capitalize">{a.role}</td>
                <td className="p-3 font-mono text-xs">{a.action}</td>
                <td className="p-3">{a.resource}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
