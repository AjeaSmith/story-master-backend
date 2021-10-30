const UserDataAccess = require('./UserDAL');
const {
	ProfileNotFoundException,
	AccountRemoveException,
} = require('../errorHandlers/userExceptions');
const bcrypt = require('bcryptjs');

const register = async (email, username, password) => {
	let hashPassword = await bcrypt.hash(password, 12);
	await UserDataAccess.register(email, username, hashPassword);
};
const getProfile = async (id) => {
	const profile = await UserDataAccess.me(id);
	if (!profile) {
		throw new ProfileNotFoundException('Profile does not exist');
	}
	return profile;
};
const editProfile = async (profileId, data) => {
	await UserDataAccess.editProfile(profileId, data);
};
const disableAccount = async (userId) => {
	const user = await UserDataAccess.disableAccount(userId);
	const story = await UserDataAccess.deleteAssociatedStories(userId);
	if (user && story) {
		throw new AccountRemoveException('Could not remove account');
	}
	return;
};
module.exports = {
	register,
	getProfile,
	editProfile,
	disableAccount,
};
