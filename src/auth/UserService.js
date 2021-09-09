const bcrypt = require('bcryptjs');
const UserDataAccess = require('./UserDAL');
const ProfileDataAccess = require('../profile/ProfileDAL');
const { issueJWT } = require('../../utils/issueJwt');

const register = async ({ email, username, password }) => {
	try {
		let pass = await bcrypt.hash(password, 10);
		const { user } = await UserDataAccess.register(email, username, pass);
		await ProfileDataAccess.addProfile(username, email);
		// save user thats returned from model -> (UserDataAccess.js)
		user.save();

		const jwt = issueJWT(user);
		return {
			user: user,
			token: jwt.token,
			expires: jwt.expires,
			success: true,
		};
	} catch (error) {
		return { error: error.message };
	}
};
const login = async ({ username, password }) => {
	try {
		const user = await UserDataAccess.findByUsername(username);
		if (!user) {
			return { success: false, error: 'Wrong credentials' };
		}
		const isValid = await bcrypt.compare(password, user.password);
		if (isValid) {
			const tokenObj = issueJWT(user);
			return {
				success: true,
				token: tokenObj.token,
				expires: tokenObj.expires,
			};
		} else {
			return { success: false, error: 'Wrong credentials' };
		}
	} catch (error) {
		return { error: error.message };
	}
};
const findByEmail = async (email) => {
	const user = await UserDataAccess.findByEmail(email);
	return user;
};

module.exports = {
	register,
	login,
	findByEmail,
};
