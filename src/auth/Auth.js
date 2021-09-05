const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
	email: { type: String, required: true },
	username: { type: String, required: true },
	password: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
const User = mongoose.model('Auth', authSchema);
module.exports = User;
