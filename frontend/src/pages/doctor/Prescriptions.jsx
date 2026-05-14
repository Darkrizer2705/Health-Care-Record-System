import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Button } from '../../components/Field.jsx';
import { Plus } from 'lucide-react';
import { mockPrescriptions, findPatient } from '../../utils/mockData.js';

export default function Prescriptions() {
  return (
    <div>
      <PageHeader title="Prescriptions" description="All prescriptions you've issued."
        actions={<Link to="/doctor/prescriptions/new"><Button><Plus className="size-4" /> New prescription</Button></Link>} />
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-3">Patient</th><th className="p-3">Medication</th><th className="p-3">Dose</th><th className="p-3">Frequency</th><th className="p-3">Status</th><th className="p-3">Date</th></tr>
          </thead>
          <tbody>
            {mockPrescriptions.map((r) => {
              const p = findPatient(r.patientId);
              return (
                <tr key={r._id} className="border-t border-slate-100">
                  <td className="p-3">{p ? `${p.firstName} ${p.lastName}` : '—'}</td>
                  <td className="p-3 font-medium">{r.medication}</td>
                  <td className="p-3">{r.dose}</td>
                  <td className="p-3">{r.frequency}</td>
                  <td className="p-3"><StatusBadge status={r.status} /></td>
                  <td className="p-3 text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
