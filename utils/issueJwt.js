const jwt = require('jsonwebtoken');
require('dotenv/config');
const issueJWT = (user) => {
	const _id = user._id;

	const expiresIn = '14d';

	const payload = {
		sub: _id,
		iat: Date.now(),
	};

	const signedToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
		expiresIn: expiresIn,
	});

	return {
		token: 'Bearer ' + signedToken,
		expiresIn: expiresIn,
	};
};

module.exports = {
	issueJWT,
};
