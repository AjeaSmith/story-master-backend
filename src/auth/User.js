const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const userSchema = new Schema({
	email: { type: String, required: true },
	username: { type: String },
	password: { type: String, required: true },
	bio: { type: String, default: 'Something about your self :)' },
	location: { type: String, default: 'e.g. Queens, New York' },
	publishedStories: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Story',
		},
	],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
const User = mongoose.model('User', userSchema);
module.exports = User;
