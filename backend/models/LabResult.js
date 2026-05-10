const mongoose = require("mongoose");

const labResultSchema = new mongoose.Schema({

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
    required: true
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  testType: {
    type: String,
    required: true
  },

  result: {
    type: String,
    default: "Pending"
  },

  status: {
    type: String,
    enum: ["requested", "completed"],
    default: "requested"
  }

}, { timestamps: true });

module.exports = mongoose.model(
  "LabResult",
  labResultSchema
);
