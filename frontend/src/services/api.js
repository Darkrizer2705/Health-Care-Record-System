import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (r) => r,
  (err) => {
    if (err?.response?.status === 401) {
      // optionally redirect to login
    }
    return Promise.reject(err);
  }
);

export default api;

// Convenience endpoint helpers (adjust to your backend routes)
export const AuthAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  me: () => api.get('/auth/me'),
};

export const PatientsAPI = {
  list: (params) => api.get('/patients', { params }),
  get: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  remove: (id) => api.delete(`/patients/${id}`),
};

export const PrescriptionsAPI = {
  list: (params) => api.get('/prescriptions', { params }),
  create: (data) => api.post('/prescriptions', data),
  dispense: (id) => api.patch(`/prescriptions/${id}/dispense`),
};

export const LabsAPI = {
  list: (params) => api.get('/labs', { params }),
  request: (data) => api.post('/labs', data),
  updateResult: (id, data) => api.patch(`/labs/${id}/result`, data),
};

export const VitalsAPI = {
  list: (patientId) => api.get(`/vitals`, { params: { patientId } }),
  create: (data) => api.post('/vitals', data),
};

export const AuditAPI = {
  list: (params) => api.get('/audit', { params }),
};
