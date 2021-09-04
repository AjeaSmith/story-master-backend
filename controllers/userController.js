const register = async (req, res, next) => {
	const { name, username, password } = req.body;
	try {
		// services to register user

		res.sendStatus(201);
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
