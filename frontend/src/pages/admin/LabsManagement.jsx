import { useState } from 'react';
import PageHeader from '../../components/PageHeader.jsx';
import StatusBadge from '../../components/StatusBadge.jsx';
import { Field, Input, Select, Button } from '../../components/Field.jsx';
import { mockLabs, findPatient } from '../../utils/mockData.js';
import { LabsAPI } from '../../services/api.js';

export default function LabsManagement() {
  const [items, setItems] = useState(mockLabs);
  const [edit, setEdit] = useState({});

  const save = async (id) => {
    const payload = edit[id]; if (!payload) return;
    try { await LabsAPI.updateResult(id, payload); } catch {}
    setItems((arr) => arr.map((l) => (l._id === id ? { ...l, ...payload } : l)));
    setEdit((e) => ({ ...e, [id]: undefined }));
  };

  return (
    <div>
      <PageHeader title="Labs management" description="Update statuses and post results for lab orders." />
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-3">Patient</th><th className="p-3">Test</th><th className="p-3">Status</th><th className="p-3">Result</th><th className="p-3"></th></tr>
          </thead>
          <tbody>
            {items.map((l) => {
              const p = findPatient(l.patientId);
              const e = edit[l._id] || { status: l.status, result: l.result };
              const setE = (k, v) => setEdit((s) => ({ ...s, [l._id]: { ...e, [k]: v } }));
              return (
                <tr key={l._id} className="border-t border-slate-100 align-top">
                  <td className="p-3">{p ? `${p.firstName} ${p.lastName}` : '—'}</td>
                  <td className="p-3 font-medium">{l.test}</td>
                  <td className="p-3 w-44">
                    <Select value={e.status} onChange={(ev) => setE('status', ev.target.value)}>
                      <option value="requested">requested</option>
                      <option value="in-progress">in-progress</option>
                      <option value="completed">completed</option>
                      <option value="cancelled">cancelled</option>
                    </Select>
                  </td>
                  <td className="p-3"><Input value={e.result || ''} onChange={(ev) => setE('result', ev.target.value)} placeholder="Result value" /></td>
                  <td className="p-3 text-right"><Button onClick={() => save(l._id)}>Save</Button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
