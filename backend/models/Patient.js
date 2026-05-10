const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			trim: true,
		},
		age: {
			type: Number,
			required: true,
		},
		gender: {
			type: String,
			required: true,
			trim: true,
		},
		diagnosis: {
			type: String,
			required: true,
			trim: true,
		},
		medications: {
			type: [String],
			default: [],
		},
		vitals: {
			bloodPressure: {
				type: String,
				default: "",
			},
			temperature: {
				type: String,
				default: "",
			},
			heartRate: {
				type: String,
				default: "",
			},
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Patient", patientSchema);
