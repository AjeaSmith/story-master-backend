const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const profileSchema = new Schema({
	name: { type: String, required: true },
	email: { type: String, required: true },
	bio: { type: String, default: 'Something about your self :)' },
	location: { type: String, default: 'e.g. Queens, New York' },

	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
const Profile = mongoose.model('Profile', profileSchema);
module.exports = Profile;
