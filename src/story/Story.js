const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const storySchema = new Schema({
	text: { type: String, required: true },
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User',
	},
	createdAt: {
		type: Date,
		default: Date.now(),
	},
});
const Story = mongoose.model('Story', storySchema);
module.exports = Story;
