# MediCare EMR — Frontend (React + Vite + JS)

Healthcare Record System frontend built with **React 18**, **Vite**, **React Router DOM**, **Axios**, **Tailwind CSS**, and **React Context API**.

Connects to an Express.js + MongoDB backend running on `http://localhost:5001/api`.

## Stack
- React 18 + Vite (JavaScript, no TypeScript)
- React Router DOM v6
- Axios with JWT interceptor
- Tailwind CSS
- Recharts (charts)
- lucide-react (icons)

## Folder structure
```
src/
  components/   # Reusable UI (StatCard, StatusBadge, Field, ...)
  context/      # AuthContext (Context API)
  layouts/      # AppLayout (sidebar + topbar)
  pages/        # Login, Register, Unauthorized + role pages
    doctor/  nurse/  pharmacist/  admin/
  routes/       # ProtectedRoute (role-based guard)
  services/     # api.js (Axios instance + endpoint helpers)
  utils/        # mockData.js (works without backend)
```

## Setup
```bash
npm install
cp .env.example .env       # set VITE_API_URL if backend differs
npm run dev
```
App runs on http://localhost:5173

## Auth & JWT
- Token is stored in `localStorage` under `token`.
- Axios attaches `Authorization: Bearer <token>` automatically.
- `AuthContext` exposes `login`, `register`, `logout`, `user`, `isAuthenticated`.
- If the backend is offline, login falls back to demo accounts:
  - `doctor@demo.com`, `nurse@demo.com`, `pharmacist@demo.com`, `admin@demo.com`
  - any password works for the demo fallback

## Backend endpoints expected
The Axios helpers in `src/services/api.js` call:
- `POST /auth/login`, `POST /auth/register`, `GET /auth/me`
- `GET/POST/PUT/DELETE /patients`
- `GET/POST /prescriptions`, `PATCH /prescriptions/:id/dispense`
- `GET/POST /labs`, `PATCH /labs/:id/result`
- `GET/POST /vitals`
- `GET /audit`

Adjust paths in `services/api.js` to match your friend's backend.

## Roles & routes
- **Doctor**: `/doctor`, `/doctor/patients`, `/doctor/patients/new`, `/doctor/patients/:id`, `/doctor/patients/:id/edit`, `/doctor/prescriptions`, `/doctor/prescriptions/new`, `/doctor/labs`
- **Nurse**: `/nurse`, `/nurse/vitals`
- **Pharmacist**: `/pharmacist`, `/pharmacist/queue`
- **Admin**: `/admin`, `/admin/audit`, `/admin/labs`

`ProtectedRoute` enforces both authentication and role allow-lists, redirecting to `/login` or `/unauthorized`.
