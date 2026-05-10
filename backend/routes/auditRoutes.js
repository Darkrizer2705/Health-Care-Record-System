const express = require("express");

const router = express.Router();

const AuditLog = require("../models/AuditLog");

const authMiddleware = require("../middleware/authMiddleware");

const roleMiddleware = require("../middleware/roleMiddleware");


// VIEW LOGS
router.get(
	"/",
	authMiddleware,
	roleMiddleware("admin"),

	async (req, res) => {

		try {

			const logs = await AuditLog.find()
				.populate("userId", "name role")
				.sort({ timestamp: -1 });

			res.status(200).json({
				success: true,
				logs
			});

		} catch (error) {

			res.status(500).json({
				success: false,
				message: error.message
			});

		}

});

module.exports = router;
