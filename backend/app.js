const express = require("express");
const cors = require("cors");
const patientRoutes = require("./routes/patientRoutes");

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

app.use("/api/patients", patientRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Healthcare API Running");
});

module.exports = app;