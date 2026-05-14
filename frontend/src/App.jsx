import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import AppLayout from './layouts/AppLayout.jsx';

import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import Unauthorized from './pages/Unauthorized.jsx';

import DoctorDashboard from './pages/doctor/Dashboard.jsx';
import Patients from './pages/doctor/Patients.jsx';
import CreatePatient from './pages/doctor/CreatePatient.jsx';
import EditPatient from './pages/doctor/EditPatient.jsx';
import PatientDetails from './pages/doctor/PatientDetails.jsx';
import Prescriptions from './pages/doctor/Prescriptions.jsx';
import CreatePrescription from './pages/doctor/CreatePrescription.jsx';
import Labs from './pages/doctor/Labs.jsx';

import NurseDashboard from './pages/nurse/Dashboard.jsx';
import UpdateVitals from './pages/nurse/UpdateVitals.jsx';

import PharmacistDashboard from './pages/pharmacist/Dashboard.jsx';
import PrescriptionQueue from './pages/pharmacist/PrescriptionQueue.jsx';

import AdminDashboard from './pages/admin/Dashboard.jsx';
import AuditLogs from './pages/admin/AuditLogs.jsx';
import LabsManagement from './pages/admin/LabsManagement.jsx';

function Home() {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={`/${user.role}`} replace />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/unauthorized" element={<Unauthorized />} />

      <Route element={<ProtectedRoute allow={['doctor']} />}>
        <Route element={<AppLayout />}>
          <Route path="/doctor" element={<DoctorDashboard />} />
          <Route path="/doctor/patients" element={<Patients />} />
          <Route path="/doctor/patients/new" element={<CreatePatient />} />
          <Route path="/doctor/patients/:id" element={<PatientDetails />} />
          <Route path="/doctor/patients/:id/edit" element={<EditPatient />} />
          <Route path="/doctor/prescriptions" element={<Prescriptions />} />
          <Route path="/doctor/prescriptions/new" element={<CreatePrescription />} />
          <Route path="/doctor/labs" element={<Labs />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['nurse']} />}>
        <Route element={<AppLayout />}>
          <Route path="/nurse" element={<NurseDashboard />} />
          <Route path="/nurse/vitals" element={<UpdateVitals />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['pharmacist']} />}>
        <Route element={<AppLayout />}>
          <Route path="/pharmacist" element={<PharmacistDashboard />} />
          <Route path="/pharmacist/queue" element={<PrescriptionQueue />} />
        </Route>
      </Route>

      <Route element={<ProtectedRoute allow={['admin']} />}>
        <Route element={<AppLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/audit" element={<AuditLogs />} />
          <Route path="/admin/labs" element={<LabsManagement />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
