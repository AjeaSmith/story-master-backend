const bcrypt = require('bcryptjs');
const UserDataAccess = require('./UserDAL');
const { issueJWT } = require('../../utils/issueJwt');

const register = async ({ email, username, password }) => {
	try {
		let pass = await bcrypt.hash(password, 10);

		const userExists = await UserDataAccess.findByEmail(email);
		// check if user exist already
		if (userExists) {
			throw new Error('User already exists');
		}
		const { user } = await UserDataAccess.register(email, username, pass);
		// save user thats returned from model -> (UserDataAccess.js)
		user.save();

		// const jwt = issueJWT(user);
	} catch (error) {
		return error;
	}
};
const login = async ({ email, password }) => {
	try {
		const user = await UserDataAccess.login(email);
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

const getProfile = async (profileId) => {
	try {
		const profile = await UserDataAccess.me(profileId);
		return {
			profile: profile,
		};
	} catch (error) {
		return { error: error.message };
	}
};
const editProfile = async (profileId, body) => {
	try {
		const { profile } = await UserDataAccess.editProfile(profileId, body);
		return {
			updated: profile,
		};
	} catch (error) {
		return { error: error.message };
	}
};
const disableAccount = async (profileId) => {
	try {
		await UserDataAccess.disableAccount(profileId);
		return { msg: 'Account deleted successfully' };
	} catch (error) {
		return { error: error.message };
	}
};
module.exports = {
	register,
	login,
	getProfile,
	editProfile,
	disableAccount,
};
