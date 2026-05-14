# 🏥 MediCare EMR (Health Care Record System)

MediCare EMR is a comprehensive Electronic Medical Record (EMR) system designed to digitize patient records, streamline clinical workflows, and ensure the security and privacy of medical data. Built with the modern MERN stack, it provides role-based access for healthcare professionals to manage patients, prescriptions, and lab results efficiently.

## 🚀 Features

- **Role-Based Access Control (RBAC):** Secure access tailored for Doctors, Nurses, Pharmacists, and Administrators.
- **Patient Management:** Register, update, and track detailed patient histories and demographics.
- **Digital Prescriptions:** Create and manage electronic prescriptions linked directly to patient profiles.
- **Laboratory Results Tracking:** Seamlessly record and monitor patient lab test outcomes.
- **Comprehensive Audit Trail:** Built-in logging system to track all critical actions for accountability and compliance.
- **Interactive Dashboards:** Real-time metrics and data visualization using Recharts.

## 🛠️ Technology Stack

**Frontend:**
- React.js (Vite)
- TailwindCSS
- React Router DOM
- Axios
- Recharts
- Lucide React (Icons)

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose
- JSON Web Tokens (JWT) for Authentication
- Bcrypt.js for Password Hashing

## 📋 Prerequisites

Before running the project locally, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- [MongoDB](https://www.mongodb.com/) (Running locally or via MongoDB Atlas)
- [Git](https://git-scm.com/)

## ⚙️ Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Darkrizer2705/Health-Care-Record-System.git
   cd Health-Care-Record-System
   ```

2. **Setup the Backend:**
   Navigate to the backend directory and install dependencies:
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory with the following variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   ```

3. **Setup the Frontend:**
   Open a new terminal, navigate to the frontend directory, and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

## 🚀 Running the Application

**Start the Backend Server:**
```bash
cd backend
npm run dev
```
The server will start on `http://localhost:5000`.

**Start the Frontend Development Server:**
```bash
cd frontend
npm run dev
```
The client will start on `http://localhost:5173`.

## 📁 Project Structure

```text
Health-Care-Record-System/
├── backend/               # Node.js/Express API
│   ├── config/            # Database and other configurations
│   ├── controllers/       # Route logic and handlers
│   ├── middleware/        # Authentication and authorization middleware
│   ├── models/            # Mongoose schemas (User, Patient, LabResult, etc.)
│   ├── routes/            # Express API routes
│   └── server.js          # Entry point for backend
├── frontend/              # React/Vite Client
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React Context for state management
│   │   ├── layouts/       # Dashboard layouts
│   │   ├── pages/         # Page components (Doctor, Patient, Login, etc.)
│   │   ├── services/      # API communication (Axios)
│   │   └── App.jsx        # Root component
└── docs/                  # Project documentation and presentation materials
```

## 🛡️ Security

- Passwords are encrypted using bcrypt.
- API endpoints are protected using JWT-based authentication.
- Unauthorized access is blocked by custom middleware.
- An internal audit log tracks data creation and modification.
