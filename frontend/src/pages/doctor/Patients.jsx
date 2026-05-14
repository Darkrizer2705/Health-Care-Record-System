import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import { Input, Button } from '../../components/Field.jsx';
import { PatientsAPI } from '../../services/api.js';

export default function Patients() {
  const [q, setQ] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    PatientsAPI.list().then(res => {
      setData(res.data.patients || []);
    }).catch(err => console.error(err));
  }, []);

  const rows = useMemo(() => data.filter((p) =>
    (p.name || '').toLowerCase().includes(q.toLowerCase())
  ), [q, data]);

  return (
    <div>
      <PageHeader title="Patients" description="Browse and manage patient records."
        actions={<Link to="/doctor/patients/new"><Button><Plus className="size-4" /> New patient</Button></Link>} />

      <div className="bg-white border border-slate-200 rounded-xl">
        <div className="p-4 flex items-center gap-2 border-b border-slate-200">
          <Search className="size-4 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name…" className="border-0 focus:ring-0" />
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 bg-slate-50">
              <tr><th className="p-3">ID</th><th className="p-3">Name</th><th className="p-3">Age</th><th className="p-3">Gender</th><th className="p-3">Diagnosis</th><th className="p-3"></th></tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p._id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-mono text-xs">{p._id.slice(-6)}</td>
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.age}</td>
                  <td className="p-3">{p.gender}</td>
                  <td className="p-3 text-slate-600">{p.diagnosis || '—'}</td>
                  <td className="p-3 text-right">
                    <Link to={`/doctor/patients/${p._id}`} className="text-brand-700 font-medium hover:underline">Open</Link>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No patients found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
