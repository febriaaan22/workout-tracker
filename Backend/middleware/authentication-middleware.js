const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/config");

const authenticationMiddleware = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).json({ error: "Unauthorized" });
	} else {
		const token = authHeader.split(" ")[1];

		try {
			const decodedToken = jwt.verify(token, JWT_SIGN);
			console.log(decodedToken, "decodedToken");
			req.username = decodedToken.username;
			req.role = decodedToken.role;
			next();
		} catch (error) {
			res.status(400).json({ error: error.message });
		}
	}
};
module.exports = authenticationMiddleware;
