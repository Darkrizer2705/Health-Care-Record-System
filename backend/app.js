const express = require("express");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");
const authRoutes = require("./routes/authRoutes");
const prescriptionRoutes = require("./routes/prescriptionRoutes");
const auditRoutes = require("./routes/auditRoutes");
const labRoutes = require("./routes/labRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/prescriptions", prescriptionRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/labs", labRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Healthcare API Running");
});

module.exports = app;