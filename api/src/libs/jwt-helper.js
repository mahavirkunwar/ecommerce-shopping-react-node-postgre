import jwt from "jsonwebtoken";

export function generateToken(data) {
	return jwt.sign(data, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
}

export function verifyToken(token) {
	return jwt.verify(token, process.env.JWT_SECRET, {
		complete: true
	});
}