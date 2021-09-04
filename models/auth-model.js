const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: { type: String, required: true },
	username: { type: String, required: true, index: { unique: true } },
	password: { type: String, required: true },
});
module.exports = User = mongoose.model('User', userSchema);
