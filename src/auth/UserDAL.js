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
const me = async (id) => {
	const user = await User.findOne({ _id: id }).populate({
		path: 'publishedStories',
		populate: { path: 'author', select: 'username' },
	});

	return user;
};
const editProfile = async (userId, data) => {
	await User.findByIdAndUpdate({ _id: userId }, data);
};
const disableAccount = async (userId) => {
	await User.findByIdAndDelete(userId);
};
const deleteAssociatedStories = async (userId) => {
	await Story.findOneAndDelete({ author: userId });
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
