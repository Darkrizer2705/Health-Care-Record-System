import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { Field, Input, Select, Textarea, Button } from '../../components/Field.jsx';
import { PrescriptionsAPI } from '../../services/api.js';
import { mockPatients } from '../../utils/mockData.js';

export default function CreatePrescription() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [form, setForm] = useState({
    patientId: params.get('patientId') || mockPatients[0]._id,
    medication: '', dose: '', frequency: 'Once daily', duration: '30 days', notes: '',
  });
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    try { await PrescriptionsAPI.create(form); } catch {}
    navigate('/doctor/prescriptions');
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="New prescription" description="Issue a new medication order." />
      <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <Field label="Patient">
          <Select value={form.patientId} onChange={set('patientId')}>
            {mockPatients.map((p) => <option key={p._id} value={p._id}>{p.firstName} {p.lastName} — {p.mrn}</option>)}
          </Select>
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Medication"><Input value={form.medication} onChange={set('medication')} required /></Field>
          <Field label="Dose"><Input value={form.dose} onChange={set('dose')} required /></Field>
          <Field label="Frequency"><Input value={form.frequency} onChange={set('frequency')} /></Field>
          <Field label="Duration"><Input value={form.duration} onChange={set('duration')} /></Field>
        </div>
        <Field label="Notes"><Textarea rows={3} value={form.notes} onChange={set('notes')} /></Field>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit">Issue prescription</Button>
        </div>
      </form>
    </div>
  );
}
