import { Users, Pill, FlaskConical, Activity } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import StatCard from '../../components/StatCard.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { mockPatients, mockPrescriptions, mockLabs } from '../../utils/mockData.js';

const COLORS = ['#0d7c75', '#2eb8ac', '#5fd3c8', '#99e7df'];

export default function DoctorDashboard() {
  const genderData = ['Female', 'Male'].map((g) => ({ name: g, value: mockPatients.filter((p) => p.gender === g).length }));
  const ageBuckets = [
    { name: '0–17', value: 0 }, { name: '18–34', value: 0 }, { name: '35–54', value: 0 },
    { name: '55–74', value: 0 }, { name: '75+', value: 0 },
  ];
  mockPatients.forEach((p) => {
    const age = new Date().getFullYear() - new Date(p.dob).getFullYear();
    const i = age < 18 ? 0 : age < 35 ? 1 : age < 55 ? 2 : age < 75 ? 3 : 4;
    ageBuckets[i].value++;
  });

  return (
    <div>
      <PageHeader title="Doctor Dashboard" description="Overview of your patients, prescriptions and lab activity." />
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Patients" value={mockPatients.length} hint="Total under care" />
        <StatCard icon={Pill} label="Prescriptions" value={mockPrescriptions.length} hint="Active + recent" />
        <StatCard icon={FlaskConical} label="Lab orders" value={mockLabs.length} hint="Across all patients" />
        <StatCard icon={Activity} label="Pending RX" value={mockPrescriptions.filter((r) => r.status === 'pending').length} hint="Awaiting dispense" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 mt-6">
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="font-semibold mb-3">Age distribution</div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={ageBuckets}>
              <XAxis dataKey="name" /><YAxis allowDecimals={false} /><Tooltip />
              <Bar dataKey="value" fill="#0d7c75" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="font-semibold mb-3">Gender</div>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={genderData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                {genderData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
