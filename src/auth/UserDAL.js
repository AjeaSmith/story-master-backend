const User = require('./User');

const register = async (email, username, password) => {
	const newUser = new User({
		email: email,
		username: username,
		password: password,
	});
	return { user: newUser };
};
const findByEmail = async (email) => {
	let user = await User.findOne({ email: email });
	return user;
};
const findByUsername = async (username) => {
	let userName = await User.findOne({ username: username });
	return userName;
};
const me = async (profileId) => {
	const profile = await Profile.findById({ _id: profileId });
	return profile;
};
const editProfile = async (profileId, body) => {
	const updatedProfile = Profile.findByIdAndUpdate(profileId, body);
	return { profile: updatedProfile };
};
const disableAccount = async (profileId) => {
	await User.findByIdAndDelete(profileId);
};
module.exports = {
	register,
	findByEmail,
	findByUsername,
	me,
	editProfile,
	disableAccount,
};
