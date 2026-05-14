import { HeartPulse, Users, Activity, Thermometer } from 'lucide-react';
import StatCard from '../../components/StatCard.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { mockPatients, mockVitals } from '../../utils/mockData.js';

export default function NurseDashboard() {
  return (
    <div>
      <PageHeader title="Nurse Dashboard" description="Patient vitals and care activity." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Patients on ward" value={mockPatients.length} />
        <StatCard icon={HeartPulse} label="Vitals logged today" value={mockVitals.length} />
        <StatCard icon={Activity} label="Avg HR" value={Math.round(mockVitals.reduce((a, v) => a + v.hr, 0) / Math.max(mockVitals.length, 1))} />
        <StatCard icon={Thermometer} label="Avg Temp" value={`${(mockVitals.reduce((a, v) => a + v.temp, 0) / Math.max(mockVitals.length, 1)).toFixed(1)}°F`} />
      </div>

      <div className="mt-6 bg-white border border-slate-200 rounded-xl overflow-hidden">
        <div className="p-4 font-semibold border-b">Recent vitals</div>
        <table className="w-full text-sm">
          <thead className="text-left text-slate-500 bg-slate-50">
            <tr><th className="p-3">Patient</th><th className="p-3">BP</th><th className="p-3">HR</th><th className="p-3">Temp</th><th className="p-3">SpO2</th><th className="p-3">When</th></tr>
          </thead>
          <tbody>
            {mockVitals.map((v) => {
              const p = mockPatients.find((x) => x._id === v.patientId);
              return (
                <tr key={v._id} className="border-t border-slate-100">
                  <td className="p-3">{p ? `${p.firstName} ${p.lastName}` : '—'}</td>
                  <td className="p-3">{v.bp}</td>
                  <td className="p-3">{v.hr}</td>
                  <td className="p-3">{v.temp}°F</td>
                  <td className="p-3">{v.spo2}%</td>
                  <td className="p-3 text-slate-500">{new Date(v.recordedAt).toLocaleString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
