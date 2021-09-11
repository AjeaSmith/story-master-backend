const Comment = require('./Comment');
const Story = require('../story/Story');

const postComment = async (message, authorId, storyId) => {
	const newComment = new Comment({
		message,
		author: authorId,
	});
	await newComment.save();

	const story = await Story.findById({ _id: storyId });
	story.comments.push(newComment._id);

	await story.save();
};
const deleteComment = async (commentId, storyId) => {
	await Comment.deleteOne({ _id: commentId });
	await Story.findById({ _id: storyId }).updateOne(
		{},
		{ $pull: { comments: storyId } }
	);
};

module.exports = {
	postComment,
	deleteComment,
};
