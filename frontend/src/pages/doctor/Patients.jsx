import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Search } from 'lucide-react';
import PageHeader from '../../components/PageHeader.jsx';
import { Input, Button } from '../../components/Field.jsx';
import { mockPatients } from '../../utils/mockData.js';

export default function Patients() {
  const [q, setQ] = useState('');
  const rows = useMemo(() => mockPatients.filter((p) =>
    `${p.firstName} ${p.lastName} ${p.mrn}`.toLowerCase().includes(q.toLowerCase())
  ), [q]);

  return (
    <div>
      <PageHeader title="Patients" description="Browse and manage patient records."
        actions={<Link to="/doctor/patients/new"><Button><Plus className="size-4" /> New patient</Button></Link>} />

      <div className="bg-white border border-slate-200 rounded-xl">
        <div className="p-4 flex items-center gap-2 border-b border-slate-200">
          <Search className="size-4 text-slate-400" />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name or MRN…" className="border-0 focus:ring-0" />
        </div>
        <div className="overflow-auto">
          <table className="w-full text-sm">
            <thead className="text-left text-slate-500 bg-slate-50">
              <tr><th className="p-3">MRN</th><th className="p-3">Name</th><th className="p-3">DOB</th><th className="p-3">Gender</th><th className="p-3">Conditions</th><th className="p-3"></th></tr>
            </thead>
            <tbody>
              {rows.map((p) => (
                <tr key={p._id} className="border-t border-slate-100 hover:bg-slate-50">
                  <td className="p-3 font-mono text-xs">{p.mrn}</td>
                  <td className="p-3 font-medium">{p.firstName} {p.lastName}</td>
                  <td className="p-3">{p.dob}</td>
                  <td className="p-3">{p.gender}</td>
                  <td className="p-3 text-slate-600">{p.conditions.join(', ') || '—'}</td>
                  <td className="p-3 text-right">
                    <Link to={`/doctor/patients/${p._id}`} className="text-brand-700 font-medium hover:underline">Open</Link>
                  </td>
                </tr>
              ))}
              {!rows.length && (
                <tr><td colSpan={6} className="p-8 text-center text-slate-500">No patients match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
