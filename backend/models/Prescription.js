const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema({

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

	medications: [
		{
			name: String,
			dosage: String,
			frequency: String
		}
	],

	notes: {
		type: String
	},

	status: {
		type: String,
		enum: ["pending", "dispensed"],
		default: "pending"
	}

}, { timestamps: true });

module.exports = mongoose.model(
	"Prescription",
	prescriptionSchema
);
