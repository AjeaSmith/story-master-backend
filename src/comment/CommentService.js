const CommentDataAccess = require('./CommentDAL');

const postComment = async (message, authorId, storyId) => {
	await CommentDataAccess.postComment(message, authorId, storyId);
};
const deleteComment = async (commentId) => {
	await CommentDataAccess.deleteComment(commentId);
};
const deleteStoryComment = async (storyId, commentId) => {
	await CommentDataAccess.deleteStoryComment(commentId, storyId);
};
module.exports = {
	postComment,
	deleteComment,
	deleteStoryComment,
};
