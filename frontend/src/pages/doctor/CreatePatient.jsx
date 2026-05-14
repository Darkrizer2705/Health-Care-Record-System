import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { Field, Input, Select, Button } from '../../components/Field.jsx';
import { PatientsAPI } from '../../services/api.js';

export default function CreatePatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ firstName: '', lastName: '', dob: '', gender: 'Female', phone: '', address: '' });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setSaving(true);
    try { await PatientsAPI.create(form); } catch {}
    setSaving(false);
    navigate('/doctor/patients');
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Create patient" description="Register a new patient record." />
      <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="First name"><Input value={form.firstName} onChange={set('firstName')} required /></Field>
          <Field label="Last name"><Input value={form.lastName} onChange={set('lastName')} required /></Field>
          <Field label="Date of birth"><Input type="date" value={form.dob} onChange={set('dob')} required /></Field>
          <Field label="Gender">
            <Select value={form.gender} onChange={set('gender')}>
              <option>Female</option><option>Male</option><option>Other</option>
            </Select>
          </Field>
          <Field label="Phone"><Input value={form.phone} onChange={set('phone')} /></Field>
          <Field label="Address"><Input value={form.address} onChange={set('address')} /></Field>
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save patient'}</Button>
        </div>
      </form>
    </div>
  );
}
