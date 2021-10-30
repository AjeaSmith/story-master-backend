const Comment = require('./Comment');
const Story = require('../story/Story');

const postComment = async (storyId, message, authorId) => {
	const newComment = new Comment({
		message,
		author: authorId,
	});
	await newComment.save();

	const story = await Story.findById({ _id: storyId });
	story.comments.push(newComment._id);
	await story.save();
};

const deleteComment = async (commentId) => {
	await Comment.deleteOne({ _id: commentId });
};
const deleteStoryComment = async (commentId, storyId) => {
	await Story.findById({ _id: storyId }).updateOne(
		{},
		{ $pull: { comments: commentId } }
	);
};

module.exports = {
	postComment,
	deleteComment,
	deleteStoryComment,
};
