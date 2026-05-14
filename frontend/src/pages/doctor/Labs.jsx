import { useState, useEffect } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Field, Input, Select, Button } from '../../components/Field.jsx';
import { LabsAPI, PatientsAPI } from '../../services/api.js';

export default function Labs() {
  const [patients, setPatients] = useState([]);
  const [labs, setLabs] = useState([]);
  const [form, setForm] = useState({ patientId: '', testType: '' });

  const fetchLabs = () => LabsAPI.list().then(res => setLabs(res.data.labResults || []));

  useEffect(() => {
    PatientsAPI.list().then(res => {
      const pts = res.data.patients || [];
      setPatients(pts);
      if (pts.length > 0) {
        setForm(f => ({ ...f, patientId: pts[0]._id }));
      }
    });
    fetchLabs();
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    try { 
      await LabsAPI.request({ patientId: form.patientId, testType: form.testType }); 
      fetchLabs();
    } catch (err) {
      console.error(err);
    }
    setForm({ ...form, testType: '' });
  };
  return (
    <div>
      <PageHeader title="Lab orders" description="Request and review laboratory tests." />
      <div className="grid lg:grid-cols-3 gap-4">
        <form onSubmit={submit} className="bg-white border border-slate-200 rounded-xl p-5 space-y-3">
          <div className="font-semibold">Request a lab test</div>
          <Field label="Patient">
            <Select value={form.patientId} onChange={(e) => setForm({ ...form, patientId: e.target.value })}>
              {patients.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
            </Select>
          </Field>
          <Field label="Test"><Input value={form.testType} onChange={(e) => setForm({ ...form, testType: e.target.value })} required placeholder="e.g. CBC, Lipid Panel" /></Field>
          <Button type="submit" className="w-full justify-center" disabled={!form.patientId}>Request test</Button>
        </form>

        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 bg-slate-50">
              <tr><th className="p-3">Patient</th><th className="p-3">Test</th><th className="p-3">Status</th><th className="p-3">Result</th><th className="p-3">Date</th></tr>
            </thead>
            <tbody>
              {labs.map((l) => {
                const p = l.patientId;
                return (
                  <tr key={l._id} className="border-t border-slate-100 hover:bg-slate-50">
                    <td className="p-3">{p ? p.name : '—'}</td>
                    <td className="p-3 font-medium">{l.testType}</td>
                    <td className="p-3"><StatusBadge status={l.status} /></td>
                    <td className="p-3 text-slate-600">{l.result || '—'}</td>
                    <td className="p-3 text-slate-500">{new Date(l.createdAt).toLocaleDateString()}</td>
                  </tr>
                );
              })}
              {!labs.length && (
                <tr><td colSpan={5} className="p-8 text-center text-slate-500">No lab orders found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
