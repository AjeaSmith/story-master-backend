const User = require('../models/auth-model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const register = async (email, username, password) => {
	try {
		// check if user exist
		let userExist = await User.findOne({ email: email });

		if (userExist) {
			return { message: 'User already exist' };
		}
		// hash password
		let pass = await bcrypt.hash(password, 10);

		const newUser = {
			email: email,
			username: username,
			password: pass,
		};

		await new User(newUser).save();

		// sign token
		const payload = {
			userId: newUser.id,
		};

		const token = jwt.sign(payload, process.env.secret, {
			expiresIn: 10000,
		});
		return token;
	} catch (error) {
		return error;
	}
};
const login = async (email, password) => {
	try {
		const existUser = await User.findOne({ email: email });
		const comparePassword = await bcrypt.compare(
			password,
			existUser.password
		);

		if (!existUser) {
			return { message: 'User does not exist' };
		}
		if (password !== comparePassword) {
			return { message: 'Incorrect credentials' };
		}

		// sign token
		const payload = {
			userId: newUser.id,
		};

		const token = jwt.sign(payload, process.env.secret, {
			expiresIn: 3600,
		});

		return token;
	} catch (error) {
		return error;
	}
};

module.exports = {
	register,
	login,
};
