const UserDataAccess = require('./UserDAL');
const {
	ProfileNotFoundException,
	ProfileUpdateException,
	UserExistException,
	AccountRemoveException,
} = require('../errorHandlers/userExceptions');
const bcrypt = require('bcryptjs');

const register = async (email, username, password) => {
	let hashPassword = await bcrypt.hash(password, 12);
	const { user } = await UserDataAccess.register(
		email,
		username,
		hashPassword
	);
	if (user) {
		throw new UserExistException('User already exists');
	}
};
const getProfile = async (email) => {
	const profile = await UserDataAccess.me(email);
	if (!profile) {
		throw new ProfileNotFoundException('Profile does not exist');
	}
	return profile;
};
const editProfile = async (profileId, data) => {
	const updatedProfile = await UserDataAccess.editProfile(profileId, data);
	if (!updatedProfile) {
		throw new ProfileUpdateException('Could not update profile');
	}
	return updatedProfile;
};
const disableAccount = async (userId) => {
	const user = await UserDataAccess.disableAccount(userId);
	const story = await UserDataAccess.deleteAssociatedStories(userId);
	if (!user || story) {
		throw new AccountRemoveException('Could not remove account');
	}
	return { message: 'Account successfully disabled' };
};
module.exports = {
	register,
	getProfile,
	editProfile,
	disableAccount,
};
