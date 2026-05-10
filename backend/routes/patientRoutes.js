const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");

// CREATE PATIENT
router.post("/", async (req, res) => {
	try {
		const patient = new Patient(req.body);

		await patient.save();

		res.status(201).json({
			success: true,
			message: "Patient created successfully",
			patient,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// GET ALL PATIENTS
router.get("/", async (req, res) => {
	try {
		const patients = await Patient.find();

		res.status(200).json({
			success: true,
			patients,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

module.exports = router;
