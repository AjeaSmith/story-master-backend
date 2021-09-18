const jwt = require('jsonwebtoken');
require('dotenv/config');
const issueJWT = (user) => {
	const _id = user._id;

	const expiresIn = '14 days';

	const payload = {
		sub: _id,
		iat: Date.now(),
	};

	const signedToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
		expiresIn: expiresIn,
	});

	return {
		token: signedToken,
		expiresIn: expiresIn,
	};
};

module.exports = {
	issueJWT,
};
