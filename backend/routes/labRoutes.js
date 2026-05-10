const express = require("express");

const router = express.Router();

const LabResult = require("../models/LabResult");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const validateObjectId = require("../middleware/validateObjectId");

const logAction = require("../utils/logger");

// ===================================
// REQUEST LAB TEST
// POST /api/labs
// Doctor Only
// ===================================
router.post(
	"/",
	authMiddleware,
	roleMiddleware("doctor"),
	async (req, res) => {
		try {
			if (!req.body.patientId || !req.body.testType) {
				return res.status(400).json({
					success: false,
					message: "Patient ID and test type required"
				});
			}

			const labTest = await LabResult.create({
				patientId: req.body.patientId,
				doctorId: req.user.id,
				testType: req.body.testType
			});

			// AUDIT LOG
			await logAction(
				req.user.id,
				"REQUEST_LAB_TEST",
				`Requested ${req.body.testType}`
			);

			res.status(201).json({
				success: true,
				message: "Lab test requested",
				labTest
			});

		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message
			});
		}
	}
);

// GET ALL LAB TESTS
router.get(
	"/",
	authMiddleware,
	async (req, res) => {
		try {
			const labResults = await LabResult.find()
				.populate("patientId", "name age")
				.populate("doctorId", "name");

			res.status(200).json({
				success: true,
				labResults
			});

		} catch (error) {
			res.status(500).json({
				success: false,
				message: error.message
			});
		}
	}
);

// ===================================
// UPDATE LAB RESULT
// PUT /api/labs/:id
// Doctor/Admin Only
// ===================================
router.put(
	"/:id",
	validateObjectId,
	authMiddleware,
	roleMiddleware("doctor", "admin"),
	async (req, res) => {
		try {
			const updatedLab = await LabResult.findByIdAndUpdate(
				req.params.id,
				{
					result: req.body.result,
					status: "completed"
				},
				{
					new: true
				}
			);

			// AUDIT LOG
			await logAction(
				req.user.id,
				"UPDATE_LAB_RESULT",
				`Updated lab result`
			);

			res.status(200).json({
				success: true,
				message: "Lab result updated",
				updatedLab
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
