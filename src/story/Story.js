const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const storySchema = new Schema({
	title: { type: String, required: true },
	// authorId: { type: String, required: true },
	text: { type: String, required: true },
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
const Story = mongoose.model('Story', storySchema);
module.exports = Story;
