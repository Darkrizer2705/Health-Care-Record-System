const express = require("express");

const router = express.Router();

const Prescription = require("../models/Prescription");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");

const validateObjectId = require("../middleware/validateObjectId");

const logAction = require("../utils/logger");
const {
	encrypt,
	decrypt
} = require("../utils/encryption");


// ===================================
// CREATE PRESCRIPTION
// POST /api/prescriptions
// Doctor Only
// ===================================
router.post(
	"/",
	authMiddleware,
	roleMiddleware("doctor"),

	async (req, res) => {

		try {

			if (!req.body.patientId || !req.body.medications) {
				return res.status(400).json({
					success: false,
					message: "Missing prescription data"
				});
			}

			const prescription = await Prescription.create({

				patientId: req.body.patientId,
				doctorId: req.user.id,
				medications: req.body.medications,
				notes: req.body.notes
					? encrypt(req.body.notes)
					: ""

			});

			res.status(201).json({
				success: true,
				message: "Prescription created",
				prescription: (() => {
					const prescriptionObj = prescription.toObject();

					if (prescriptionObj.notes) {
						prescriptionObj.notes = decrypt(prescriptionObj.notes);
					}

					return prescriptionObj;
				})()
			});

			await logAction(
				req.user.id,
				"CREATE_PRESCRIPTION",
				"Created prescription"
			);

		} catch (error) {

			res.status(500).json({
				success: false,
				message: error.message
			});

		}

});


// GET ALL PRESCRIPTIONS
router.get(
	"/",
	authMiddleware,
	roleMiddleware("pharmacist", "doctor"),

	async (req, res) => {

		try {

			const prescriptions = await Prescription.find()
				.populate("patientId", "name age")
				.populate("doctorId", "name");

			const decryptedPrescriptions = prescriptions.map((prescription) => {
				const obj = prescription.toObject();

				if (obj.notes) {
					obj.notes = decrypt(obj.notes);
				}

				return obj;
			});

			res.status(200).json({
				success: true,
				prescriptions: decryptedPrescriptions
			});

		} catch (error) {

			res.status(500).json({
				success: false,
				message: error.message
			});

		}

});


// ===================================
// DISPENSE PRESCRIPTION
// PUT /api/prescriptions/:id/dispense
// Pharmacist Only
// ===================================
router.put(
	"/:id/dispense",
	validateObjectId,
	authMiddleware,
	roleMiddleware("pharmacist"),

	async (req, res) => {

		try {

			const prescription = await Prescription.findByIdAndUpdate(

				req.params.id,

				{
					status: "dispensed"
				},

				{
					new: true
				}

			);

			if (!prescription) {
				return res.status(404).json({
					success: false,
					message: "Prescription not found"
				});
			}

			res.status(200).json({
				success: true,
				message: "Prescription dispensed",
				prescription: (() => {
					const prescriptionObj = prescription.toObject();

					if (prescriptionObj.notes) {
						prescriptionObj.notes = decrypt(prescriptionObj.notes);
					}

					return prescriptionObj;
				})()
			});

			await logAction(
				req.user.id,
				"DISPENSE_PRESCRIPTION",
				"Prescription dispensed"
			);

		} catch (error) {

			res.status(500).json({
				success: false,
				message: error.message
			});

		}

});

module.exports = router;
