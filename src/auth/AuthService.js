const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const AuthDataAccess = require('./AuthDAL');

const register = async ({ email, username, password }) => {
	try {
		let pass = await bcrypt.hash(password, 10);

		const { user, userExist } = await AuthDataAccess.register(
			email,
			username,
			pass
		);

		if (userExist) {
			throw new Error('User already exist');
		}

		// save user from model -> (AuthDataAccess.js)
		user.save();

		// sign token
		const payload = {
			userId: user._id,
		};

		const token = jwt.sign(payload, process.env.secret, {
			expiresIn: 10000,
		});
		return { token: token };
	} catch (error) {
		return { error: error.message };
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
