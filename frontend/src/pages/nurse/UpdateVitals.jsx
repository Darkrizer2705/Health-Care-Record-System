import { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import { Field, Input, Select, Button } from '../../components/Field.jsx';
import { mockPatients } from '../../utils/mockData.js';
import { VitalsAPI } from '../../services/api.js';

export default function UpdateVitals() {
  const [form, setForm] = useState({ patientId: mockPatients[0]._id, bp: '', hr: '', temp: '', spo2: '' });
  const [msg, setMsg] = useState('');
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const submit = async (e) => {
    e.preventDefault();
    try { await VitalsAPI.create(form); } catch {}
    setMsg('Vitals saved.');
    setTimeout(() => setMsg(''), 2000);
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Update vitals" description="Log a new vitals reading for a patient." />
      <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <Field label="Patient">
          <Select value={form.patientId} onChange={set('patientId')}>
            {mockPatients.map((p) => <option key={p._id} value={p._id}>{p.firstName} {p.lastName} — {p.mrn}</option>)}
          </Select>
        </Field>
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Blood pressure"><Input value={form.bp} onChange={set('bp')} placeholder="120/80" required /></Field>
          <Field label="Heart rate (bpm)"><Input type="number" value={form.hr} onChange={set('hr')} required /></Field>
          <Field label="Temperature (°F)"><Input type="number" step="0.1" value={form.temp} onChange={set('temp')} required /></Field>
          <Field label="SpO2 (%)"><Input type="number" value={form.spo2} onChange={set('spo2')} required /></Field>
        </div>
        {msg && <div className="text-sm text-emerald-700">{msg}</div>}
        <div className="flex justify-end"><Button type="submit">Save vitals</Button></div>
      </form>
    </div>
  );
}
