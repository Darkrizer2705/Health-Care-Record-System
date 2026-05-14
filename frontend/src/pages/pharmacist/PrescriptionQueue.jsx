import { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Button } from '../../components/Field.jsx';
import { mockPrescriptions, findPatient } from '../../utils/mockData.js';
import { PrescriptionsAPI } from '../../services/api.js';

export default function PrescriptionQueue() {
  const [tab, setTab] = useState('pending');
  const [items, setItems] = useState(mockPrescriptions);
  const filtered = items.filter((r) => r.status === tab);

  const dispense = async (id) => {
    try { await PrescriptionsAPI.dispense(id); } catch {}
    setItems((arr) => arr.map((r) => (r._id === id ? { ...r, status: 'dispensed' } : r)));
  };

  return (
    <div>
      <PageHeader title="Prescription queue" description="Process pending prescriptions and review dispensed orders." />
      <div className="flex gap-2 mb-4">
        {['pending', 'dispensed'].map((t) => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium capitalize ${tab === t ? 'bg-brand-600 text-white' : 'bg-white border border-slate-200 text-slate-700'}`}>
            {t}
          </button>
        ))}
      </div>
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-3">Patient</th><th className="p-3">Medication</th><th className="p-3">Dose</th><th className="p-3">Frequency</th><th className="p-3">Status</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {filtered.map((r) => {
              const p = findPatient(r.patientId);
              return (
                <tr key={r._id} className="border-t border-slate-100">
                  <td className="p-3">{p ? `${p.firstName} ${p.lastName}` : '—'}</td>
                  <td className="p-3 font-medium">{r.medication}</td>
                  <td className="p-3">{r.dose}</td>
                  <td className="p-3">{r.frequency}</td>
                  <td className="p-3"><StatusBadge status={r.status} /></td>
                  <td className="p-3 text-right">
                    {r.status === 'pending' && <Button onClick={() => dispense(r._id)}>Dispense</Button>}
                  </td>
                </tr>
              );
            })}
            {!filtered.length && <tr><td colSpan={6} className="p-6 text-center text-slate-500">Nothing here.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}
