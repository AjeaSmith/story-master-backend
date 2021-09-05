const User = require('./Auth');

const register = async (email, username, password) => {
	let userExist = await User.findOne({ email: email });

	const newUser = new User({
		email: email,
		username: username,
		password: password,
	});

	return { userExist, user: newUser };
};
module.exports = {
	register,
};
