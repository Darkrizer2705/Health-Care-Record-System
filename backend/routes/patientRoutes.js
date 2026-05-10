const express = require("express");
const router = express.Router();

const Patient = require("../models/Patient");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const validateObjectId = require("../middleware/validateObjectId");
const logAction = require("../utils/logger");
const errorResponse = require("../utils/errorResponse");
const {
	encrypt,
	decrypt
} = require("../utils/encryption");

// ===================================
// CREATE PATIENT
// POST /api/patients
// Doctor Only
// ===================================
router.post("/", authMiddleware, roleMiddleware("doctor"), async (req, res) => {
	try {
		if (!req.body.name || !req.body.age) {
			return errorResponse(
				res,
				400,
				"Name and age are required"
			);
		}

		if (req.body.diagnosis) {
			req.body.diagnosis = encrypt(
				req.body.diagnosis
			);
		}

		const patient = new Patient(req.body);

		await patient.save();

		await logAction(
			req.user.id,
			"CREATE_PATIENT",
			`Created patient ${patient.name}`
		);

		const patientObj = patient.toObject();

		if (patientObj.diagnosis) {
			patientObj.diagnosis = decrypt(
				patientObj.diagnosis
			);
		}

		res.status(201).json({
			success: true,
			message: "Patient created successfully",
			patient: patientObj,
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

		const decryptedPatients = patients.map(
			(patient) => {

				const obj = patient.toObject();

				if (obj.diagnosis) {
					obj.diagnosis = decrypt(
						obj.diagnosis
					);
				}

				return obj;
			}
		);

		res.status(200).json({
			success: true,
			patients: decryptedPatients,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// ===================================
// GET PATIENT BY ID
// GET /api/patients/:id
// ===================================
router.get("/:id", validateObjectId, async (req, res) => {
	try {
		const patient = await Patient.findById(req.params.id);

		if (!patient) {
			return res.status(404).json({
				success: false,
				message: "Patient not found",
			});
		}

		const patientObj = patient.toObject();

		if (patientObj.diagnosis) {
			patientObj.diagnosis = decrypt(
				patientObj.diagnosis
			);
		}

		res.status(200).json({
			success: true,
			patient: patientObj,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// ===================================
// UPDATE PATIENT
// PUT /api/patients/:id
// ===================================
router.put("/:id", validateObjectId, async (req, res) => {
	try {
		if (req.body.diagnosis) {

			req.body.diagnosis = encrypt(
				req.body.diagnosis
			);

		}

		const updatedPatient = await Patient.findByIdAndUpdate(
			req.params.id,
			req.body,
			{
				new: true,
				runValidators: true,
			}
		);

		if (!updatedPatient) {
			return res.status(404).json({
				success: false,
				message: "Patient not found",
			});
		}

		await logAction(
			req.user && req.user.id,
			"UPDATE_PATIENT",
			`Updated patient ${updatedPatient.name}`
		);

		const updatedPatientObj = updatedPatient.toObject();

		if (updatedPatientObj.diagnosis) {
			updatedPatientObj.diagnosis = decrypt(
				updatedPatientObj.diagnosis
			);
		}

		res.status(200).json({
			success: true,
			message: "Patient updated successfully",
			updatedPatient: updatedPatientObj,
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// ===================================
// DELETE PATIENT
// DELETE /api/patients/:id
// ===================================
router.delete("/:id", validateObjectId, async (req, res) => {
	try {
		const deletedPatient = await Patient.findByIdAndDelete(req.params.id);

		if (!deletedPatient) {
			return res.status(404).json({
				success: false,
				message: "Patient not found",
			});
		}

		await logAction(
			req.user && req.user.id,
			"DELETE_PATIENT",
			`Deleted patient ${deletedPatient.name}`
		);

		res.status(200).json({
			success: true,
			message: "Patient deleted successfully",
		});
	} catch (error) {
		res.status(500).json({
			success: false,
			message: error.message,
		});
	}
});

// ===================================
// UPDATE VITALS
// PUT /api/patients/:id/vitals
// Nurse Only
// ===================================
router.put(
	"/:id/vitals",
	validateObjectId,
	authMiddleware,
	roleMiddleware("nurse"),
	async (req, res) => {
		try {
			const patient = await Patient.findById(
				req.params.id
			);

			if (!patient) {
				return res.status(404).json({
					success: false,
					message: "Patient not found"
				});
			}

			// UPDATE VITALS
			patient.vitals = {
				bloodPressure:
					req.body.bloodPressure,
				temperature:
					req.body.temperature,
				heartRate:
					req.body.heartRate
			};

			await patient.save();

			// AUDIT LOG
			await logAction(
				req.user.id,
				"UPDATE_VITALS",
				`Updated vitals for ${patient.name}`
			);

			res.status(200).json({
				success: true,
				message: "Vitals updated",
				vitals: patient.vitals
			});

		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message
			});
		}
	}
);

module.exports = router;
