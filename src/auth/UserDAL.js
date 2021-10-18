const User = require('./User');
const Story = require('../story/Story');
const { UserExistException } = require('../errorHandlers/userExceptions');
const register = async (email, username, password) => {
	// check if user exists
	const user = await User.findOne({ email: email });
	if (user) throw new UserExistException('User already exists');
	const newUser = new User({
		username: username,
		email: email,
		password: password,
	});
	newUser.save();
};
const me = async (email) => {
	const user = await User.findOne({ email: email }).populate({
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
	register,
	me,
	editProfile,
	disableAccount,
	deleteAssociatedStories,
	findByEmail,
};
