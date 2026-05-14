import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../../components/PageHeader.jsx';
import { Field, Input, Select, Button } from '../../components/Field.jsx';
import { PatientsAPI } from '../../services/api.js';

export default function CreatePatient() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', age: '', gender: 'Female', diagnosis: '' });
  const [saving, setSaving] = useState(false);
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault(); setSaving(true);
    try { 
      await PatientsAPI.create({
        name: form.name,
        age: Number(form.age),
        gender: form.gender,
        diagnosis: form.diagnosis
      }); 
      navigate('/doctor/patients');
    } catch (err) {
      console.error(err);
    }
    setSaving(false);
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Create patient" description="Register a new patient record." />
      <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <Field label="Full name"><Input value={form.name} onChange={set('name')} required /></Field>
          <Field label="Age"><Input type="number" value={form.age} onChange={set('age')} required /></Field>
          <Field label="Gender">
            <Select value={form.gender} onChange={set('gender')}>
              <option>Female</option><option>Male</option><option>Other</option>
            </Select>
          </Field>
          <Field label="Diagnosis"><Input value={form.diagnosis} onChange={set('diagnosis')} required /></Field>
        </div>
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
          <Button type="submit" disabled={saving}>{saving ? 'Saving…' : 'Save patient'}</Button>
        </div>
      </form>
    </div>
  );
}
