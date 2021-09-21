const jwt = require('jsonwebtoken');
const User = require('../src/auth/User');
const authorization = async (req, res, next) => {
	let token;
	if (req.cookies) {
		token = req.cookies.access_token;
	}
	if (!token) {
		return res.status(401).json({ message: 'You are unauthorized' });
	}
	try {
		const data = jwt.verify(token, process.env.TOKEN_SECRET);
		const user = await User.findById(data.sub);
		if (!user) {
			return res.status(401).json({ message: 'You are unauthorized' });
		}
		req.userId = user._id;
		next();
	} catch (error) {
		console.log('auth err', error);
	}
};
module.exports = {
	authorization,
};
