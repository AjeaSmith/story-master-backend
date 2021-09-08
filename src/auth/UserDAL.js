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
module.exports = {
	register,
	findByEmail,
	findByUsername,
};
