import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { Button } from '../../components/Field.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { mockPrescriptions, mockLabs } from '../../utils/mockData.js';
import { PatientsAPI } from '../../services/api.js';
import { Pencil, Pill, FlaskConical } from 'lucide-react';

export default function PatientDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    PatientsAPI.get(id).then(res => {
      setP(res.data.patient);
    }).catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="text-slate-500">Loading...</div>;
  if (!p) return <div className="text-slate-500">Patient not found.</div>;

  const rx = mockPrescriptions.filter((r) => r.patientId === id);
  const labs = mockLabs.filter((l) => l.patientId === id);

  return (
    <div>
      <PageHeader title={`${p.name}`} description={`ID: ${p._id.slice(-6)} · ${p.gender} · Age ${p.age}`}
        actions={<>
          <Link to={`/doctor/patients/${id}/edit`}><Button variant="outline"><Pencil className="size-4" /> Edit</Button></Link>
          <Link to={`/doctor/prescriptions/new?patientId=${id}`}><Button><Pill className="size-4" /> Prescribe</Button></Link>
        </>}
      />

      <div className="grid lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          <Section title="Demographics">
            <Row label="Diagnosis" value={p.diagnosis || 'None'} />
            <Row label="Medications" value={p.medications?.join(', ') || 'None'} />
          </Section>

          <Section title="Recent vitals">
            {p.vitals && (p.vitals.bloodPressure || p.vitals.heartRate || p.vitals.temperature) ? (
              <table className="w-full text-sm">
                <thead className="text-left text-slate-500"><tr><th>BP</th><th>HR</th><th>Temp</th></tr></thead>
                <tbody>
                  <tr className="border-t border-slate-100"><td className="py-2">{p.vitals.bloodPressure || '—'}</td><td>{p.vitals.heartRate || '—'}</td><td>{p.vitals.temperature ? `${p.vitals.temperature}°F` : '—'}</td></tr>
                </tbody>
              </table>
            ) : <div className="text-sm text-slate-500">No vitals logged.</div>}
          </Section>
        </div>
        <div className="space-y-4">
          <Section title="Prescriptions" icon={Pill}>
            {rx.length ? rx.map((r) => (
              <div key={r._id} className="text-sm border-b border-slate-100 last:border-0 py-2">
                <div className="font-medium">{r.medication} {r.dose}</div>
                <div className="text-slate-500 text-xs">{r.frequency} · {r.duration}</div>
                <div className="mt-1"><StatusBadge status={r.status} /></div>
              </div>
            )) : <div className="text-sm text-slate-500">No prescriptions.</div>}
          </Section>
          <Section title="Lab orders" icon={FlaskConical}>
            {labs.length ? labs.map((l) => (
              <div key={l._id} className="text-sm border-b border-slate-100 last:border-0 py-2">
                <div className="font-medium">{l.test}</div>
                <div className="text-slate-500 text-xs">{new Date(l.createdAt).toLocaleDateString()}</div>
                <div className="mt-1"><StatusBadge status={l.status} /></div>
                {l.result && <div className="text-xs text-slate-700 mt-1">Result: {l.result}</div>}
              </div>
            )) : <div className="text-sm text-slate-500">No lab orders.</div>}
          </Section>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon: Icon, children }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-5">
      <div className="font-semibold mb-3 flex items-center gap-2">{Icon && <Icon className="size-4 text-brand-700" />} {title}</div>
      {children}
    </div>
  );
}
function Row({ label, value }) {
  return (
    <div className="flex py-1.5 text-sm border-b border-slate-100 last:border-0">
      <div className="w-32 text-slate-500">{label}</div><div className="flex-1 text-slate-800">{value}</div>
    </div>
  );
}
