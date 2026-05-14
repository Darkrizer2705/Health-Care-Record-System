import { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Field, Input, Select, Button } from '../../components/Field.jsx';
import { mockLabs, mockPatients, findPatient } from '../../utils/mockData.js';
import { LabsAPI } from '../../services/api.js';

export default function Labs() {
  const [form, setForm] = useState({ patientId: mockPatients[0]._id, test: '' });
  const submit = async (e) => {
    e.preventDefault();
    try { await LabsAPI.request(form); } catch {}
    setForm({ ...form, test: '' });
  };
  return (
    <div>
      <PageHeader title="Lab orders" description="Request and review laboratory tests." />
      <div className="grid lg:grid-cols-3 gap-4">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="font-semibold">Request a lab test</div>
          <Field label="Patient">
            <Select value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
              {mockPatients.map((p) => <option key={p._id} value={p._id}>{p.firstName} {p.lastName}</option>)}
            </Select>
          </Field>
          <Field label="Test"><Input value={form.test} onChange={(e) => setForm({ ...form, test: e.target.value })} required placeholder="e.g. CBC, Lipid Panel" /></Field>
          <Button type="submit" className="w-full justify-center">Request test</Button>
        </form>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 bg-slate-50">
              <tr><th className="p-3">Patient</th><th className="p-3">Test</th><th className="p-3">Status</th><th className="p-3">Result</th><th className="p-3">Date</th></tr>
            </thead>
            <tbody>
              {mockLabs.map((l) => {
                const p = findPatient(l.patientId);
                return (
                  <tr key={l._id} className="border-t border-slate-100">
                    <td className="p-3">{p ? `${p.firstName} ${p.lastName}` : '—'}</td>
                    <td className="p-3 font-medium">{l.test}</td>
                    <td className="p-3"><StatusBadge status={l.status} /></td>
                    <td className="p-3 text-slate-600">{l.result || '—'}</td>
                    <td className="p-3 text-slate-500">{new Date(l.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
