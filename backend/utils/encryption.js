const crypto = require("crypto");


// SECRET KEY
const ENCRYPTION_KEY = crypto
	.createHash("sha256")
	.update(process.env.JWT_SECRET)
	.digest();


// IV LENGTH
const IV_LENGTH = 16;



// ENCRYPT FUNCTION
const encrypt = (text) => {

	if (!text) return text;

	const iv = crypto.randomBytes(IV_LENGTH);

	const cipher = crypto.createCipheriv(
		"aes-256-cbc",
		ENCRYPTION_KEY,
		iv
	);

	let encrypted = cipher.update(
		text,
		"utf8",
		"hex"
	);

	encrypted += cipher.final("hex");

	return iv.toString("hex") + ":" + encrypted;
};



// DECRYPT FUNCTION
const decrypt = (text) => {

	if (!text) return text;

	const parts = text.split(":");

	if (parts.length < 2) {
		return text;
	}

	const iv = Buffer.from(parts.shift(), "hex");

	const encryptedText = parts.join(":");

	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		ENCRYPTION_KEY,
		iv
	);

	let decrypted = decipher.update(
		encryptedText,
		"hex",
		"utf8"
	);

	decrypted += decipher.final("utf8");

	return decrypted;


};

module.exports = {
	encrypt,
	decrypt
};
