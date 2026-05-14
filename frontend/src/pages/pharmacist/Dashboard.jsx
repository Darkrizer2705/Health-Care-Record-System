import { Pill, ClipboardList, CheckCircle } from 'lucide-react';
import StatCard from '../../components/StatCard.jsx';
import PageHeader from '../../components/PageHeader.jsx';
import { mockPrescriptions } from '../../utils/mockData.js';

export default function PharmacistDashboard() {
  const pending = mockPrescriptions.filter((r) => r.status === 'pending').length;
  const dispensed = mockPrescriptions.filter((r) => r.status === 'dispensed').length;
  return (
    <div>
      <PageHeader title="Pharmacist Dashboard" description="Workload overview and dispensing activity." />
      <div className="grid sm:grid-cols-3 gap-4">
        <StatCard icon={ClipboardList} label="Total prescriptions" value={mockPrescriptions.length} />
        <StatCard icon={Pill} label="Pending" value={pending} hint="Awaiting dispense" />
        <StatCard icon={CheckCircle} label="Dispensed" value={dispensed} />
      </div>
    </div>
  );
}
