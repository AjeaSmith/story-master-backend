const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	email: { type: String, required: true },
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
module.exports = User = mongoose.model('User', userSchema);
