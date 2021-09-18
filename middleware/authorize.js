const jwt = require('jsonwebtoken');
const authorization = (req, res, next) => {
	const token = req.cookies.access_token;
	if (!token) {
		return res.sendStatus(403);
	}
	try {
		const data = jwt.verify(token, process.env.TOKEN_SECRET);
		req.userId = data.sub;
		return next();
	} catch (error) {
		return res.sendStatus(403);
	}
};
module.exports = {
	authorization,
};
