import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Button } from '../../components/Field.jsx';
import { Plus } from 'lucide-react';
import { PrescriptionsAPI } from '../../services/api.js';

export default function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    PrescriptionsAPI.list().then(res => {
      setPrescriptions(res.data.prescriptions || []);
    });
  }, []);

  return (
    <div>
      <PageHeader title="Prescriptions" description="All prescriptions you've issued."
        actions={<Link to="/doctor/prescriptions/new"><Button><Plus className="size-4" /> New prescription</Button></Link>} />
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-3">Patient</th><th className="p-3">Medications</th><th className="p-3">Status</th><th className="p-3">Date</th></tr>
          </thead>
          <tbody>
            {prescriptions.map((r) => {
              const p = r.patientId;
              const meds = r.medications.map(m => `${m.name} ${m.dosage}`).join(', ');
              return (
                <tr key={r._id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3">{p ? p.name : '—'}</td>
                  <td className="p-3 font-medium">{meds}</td>
                  <td className="p-3"><StatusBadge status={r.status} /></td>
                  <td className="p-3 text-slate-500">{new Date(r.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
            {!prescriptions.length && (
              <tr><td colSpan={4} className="p-8 text-center text-slate-500">No prescriptions found.</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
