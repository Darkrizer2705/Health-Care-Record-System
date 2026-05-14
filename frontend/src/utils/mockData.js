// In-memory mock data so the UI works before backend is up.
// Replace these with real API responses via services/api.js

const today = new Date();
const days = (n) => new Date(today.getTime() - n * 86400000).toISOString();

export const mockPatients = [
  { _id: 'p1', mrn: 'MRN-1001', firstName: 'Olivia',  lastName: 'Bennett',  dob: '1986-04-12', gender: 'Female', phone: '555-2034', address: '14 Maple St', allergies: ['Penicillin'], conditions: ['Hypertension'], createdAt: days(40) },
  { _id: 'p2', mrn: 'MRN-1002', firstName: 'Noah',    lastName: 'Carter',   dob: '1972-09-30', gender: 'Male',   phone: '555-3318', address: '88 Oak Ave',  allergies: [],            conditions: ['Type 2 Diabetes'], createdAt: days(30) },
  { _id: 'p3', mrn: 'MRN-1003', firstName: 'Ava',     lastName: 'Johnson',  dob: '1995-01-08', gender: 'Female', phone: '555-9920', address: '5 Pine Rd',   allergies: ['Sulfa'],     conditions: ['Asthma'], createdAt: days(20) },
  { _id: 'p4', mrn: 'MRN-1004', firstName: 'Liam',    lastName: 'Martinez', dob: '1960-06-21', gender: 'Male',   phone: '555-4477', address: '23 Elm Blvd', allergies: [],            conditions: ['CAD','Hyperlipidemia'], createdAt: days(10) },
  { _id: 'p5', mrn: 'MRN-1005', firstName: 'Sophia',  lastName: 'Nguyen',   dob: '2001-11-15', gender: 'Female', phone: '555-7781', address: '9 Cedar Ln',  allergies: ['Latex'],     conditions: [], createdAt: days(5) },
];

export const mockPrescriptions = [
  { _id: 'rx1', patientId: 'p1', medication: 'Lisinopril', dose: '10mg', frequency: 'Once daily', duration: '30 days', notes: 'Monitor BP weekly', status: 'pending',   createdAt: days(2) },
  { _id: 'rx2', patientId: 'p2', medication: 'Metformin',  dose: '500mg', frequency: 'Twice daily', duration: '90 days', notes: 'With meals', status: 'dispensed', createdAt: days(8) },
  { _id: 'rx3', patientId: 'p3', medication: 'Albuterol',  dose: '90mcg', frequency: 'PRN', duration: 'Ongoing', notes: 'Inhaler', status: 'pending', createdAt: days(1) },
];

export const mockLabs = [
  { _id: 'lab1', patientId: 'p1', test: 'Lipid Panel',     status: 'requested', result: '', createdAt: days(3) },
  { _id: 'lab2', patientId: 'p2', test: 'HbA1c',           status: 'completed', result: '7.2%', createdAt: days(12) },
  { _id: 'lab3', patientId: 'p4', test: 'Troponin',        status: 'in-progress', result: '', createdAt: days(1) },
];

export const mockVitals = [
  { _id: 'v1', patientId: 'p1', bp: '128/82', hr: 76, temp: 98.6, spo2: 98, recordedAt: days(1) },
  { _id: 'v2', patientId: 'p2', bp: '140/90', hr: 84, temp: 98.4, spo2: 97, recordedAt: days(2) },
];

export const mockAudit = [
  { _id: 'a1', user: 'Dr. Sarah Patel',   role: 'doctor',     action: 'CREATE_PATIENT',     resource: 'MRN-1005', at: days(5) },
  { _id: 'a2', user: 'Nurse Ava Thompson',role: 'nurse',      action: 'LOG_VITALS',         resource: 'MRN-1001', at: days(1) },
  { _id: 'a3', user: 'Liam Garcia',       role: 'pharmacist', action: 'DISPENSE_RX',        resource: 'rx2',      at: days(8) },
  { _id: 'a4', user: 'Admin Maya Singh',  role: 'admin',      action: 'VIEW_AUDIT_LOG',     resource: 'system',   at: days(0) },
];

export const findPatient = (id) => mockPatients.find((p) => p._id === id);
