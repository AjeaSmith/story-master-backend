const bcrypt = require('bcryptjs');
const UserDataAccess = require('./UserDAL');
const { issueJWT } = require('../../utils/issueJwt');
const {
	UserExistException,
	UserNotFoundException,
	ProfileNotFoundException,
	ProfileUpdateException,
	AccountRemoveException,
} = require('../errorHandlers/userExceptions');

const register = async ({ email, username, password }) => {
	let pass = await bcrypt.hash(password, 10);

	const userExists = await UserDataAccess.findByEmail(email);
	// check if user exist already
	if (userExists) {
		throw new UserExistException();
	}
	const { user } = await UserDataAccess.register(email, username, pass);
	// save user thats returned from model -> (UserDataAccess.js)
	user.save();
	// const jwt = issueJWT(user);
};
const login = async ({ email, password }) => {
	const user = await UserDataAccess.login(email);
	if (!user) {
		throw new UserNotFoundException();
	}
	const isValid = await bcrypt.compare(password, user.password);
	if (!isValid) {
		throw new UserNotFoundException();
	}
	const { token, expires } = issueJWT(user);
	return { token, expires };
};

const getProfile = async (profileId) => {
	const profile = await UserDataAccess.me(profileId);
	if (!profile) {
		throw new ProfileNotFoundException();
	}
	return { profile: profile };
};
const editProfile = async (profileId, body) => {
	const { profile } = await UserDataAccess.editProfile(profileId, body);
	if (!profile) {
		throw new ProfileUpdateException();
	}
	return {
		updated: profile,
	};
};
const disableAccount = async (profileId) => {
	await UserDataAccess.disableAccount(profileId)
		.then(() => {
			return { message: 'Account deleted successfully' };
		})
		.catch((err) => {
			throw new AccountRemoveException();
		});
};
module.exports = {
	register,
	login,
	getProfile,
	editProfile,
	disableAccount,
};
