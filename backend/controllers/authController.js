const User = require("../models/User");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const logAction = require("../utils/logger");


// REGISTER USER
exports.registerUser = async (req, res) => {

	try {

		const { name, email, password, role } = req.body;

		// CHECK EXISTING USER
		const existingUser = await User.findOne({ email });

		if (existingUser) {
			return res.status(400).json({
				success: false,
				message: "User already exists"
			});
		}

		// HASH PASSWORD
		const hashedPassword = await bcrypt.hash(password, 10);

		// CREATE USER
		const user = await User.create({
			name,
			email,
			password: hashedPassword,
			role
		});

		// CREATE TOKEN
		const token = jwt.sign(
			{
				id: user._id,
				role: user.role
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d"
			}
		);

		res.status(201).json({
			success: true,
			message: "User registered successfully",
			user,
			token
		});

	} catch (error) {

		res.status(500).json({
			success: false,
			message: error.message
		});

	}
};



// LOGIN USER
exports.loginUser = async (req, res) => {

	try {

		const { email, password } = req.body;

		// FIND USER
		const user = await User.findOne({ email });

		if (!user) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials"
			});
		}

		// CHECK PASSWORD
		const isMatch = await bcrypt.compare(password, user.password);

		if (!isMatch) {
			return res.status(401).json({
				success: false,
				message: "Invalid credentials"
			});
		}

		// CREATE TOKEN
		const token = jwt.sign(
			{
				id: user._id,
				role: user.role
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "7d"
			}
		);

		res.status(200).json({
			success: true,
			message: "Login successful",
			user,
			token
		});

		await logAction(
			user._id,
			"LOGIN",
			`User ${user.email} logged in`
		);

	} catch (error) {

		res.status(500).json({
			success: false,
			message: error.message
		});

	}
};
