const User = require('./User');
const Story = require('../story/Story');
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
const me = async (userId) => {
	const user = await User.findById({ _id: userId }).populate({
		path: 'publishedStories',
	});
	return user;
};
const editProfile = async (userId, data) => {
	const updatedProfile = await User.findByIdAndUpdate({ _id: userId }, data);
	return updatedProfile;
};
const disableAccount = async (userId) => {
	const account = await User.findByIdAndDelete(userId);
	return account;
};
const deleteAssociatedStories = async (userId) => {
	const stories = await Story.findOneAndDelete({ author: userId });
	return stories;
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
	deleteAssociatedStories,
	findByEmail,
};
