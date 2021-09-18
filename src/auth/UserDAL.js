const User = require('./User');

const register = async (email, username, password) => {
	const newUser = new User({
		email: email,
		username: username,
		password: password,
	});
	return { user: newUser };
};
const login = async (email) => {
	let userName = await User.findOne({ email: email });
	return userName;
};
const me = async (profileId) => {
	const user = await User.findById({ _id: profileId }).populate({
		path: 'publishedStories',
	});
	return user;
};
const editProfile = async (profileId, data) => {
	const updatedProfile = await User.findByIdAndUpdate(
		{ _id: profileId },
		data
	);
	return updatedProfile;
};
const disableAccount = async (profileId) => {
	await User.findByIdAndDelete(profileId);
};
const findByEmail = async (email) => {
	const user = await User.findOne({ email });
	return user;
};
module.exports = {
	login,
	register,
	me,
	editProfile,
	disableAccount,
	findByEmail,
};
