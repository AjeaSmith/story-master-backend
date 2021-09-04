const auth = require('../services/auth-service');

const register = async (req, res, next) => {
	const { email, username, password } = req.body;
	try {
		// services to register user
		const { token } = auth.register(email, username, password);
		res.status(201).json({
			token: token,
		});
		next();
	} catch (e) {
		console.log(e.message);
		res.sendStatus(500) && next(error);
	}
};
const login = async (req, res, next) => {
	const { username, password } = req.body;
	try {
		// services to login user

		res.sendStatus(201);
		next();
	} catch (e) {
		console.log(e.message);
		res.sendStatus(500) && next(error);
	}
};
module.exports = {
	register,
	login,
};
