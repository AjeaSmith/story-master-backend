const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const commentSchema = new Schema({
	message: { type: String, required: true },
	author: { type: String },
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
