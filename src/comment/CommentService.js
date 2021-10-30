const CommentDataAccess = require('./CommentDAL');

const postComment = async (storyId, message, authorId) => {
	await CommentDataAccess.postComment(storyId, message, authorId);
};
const deleteComment = async (commentId) => {
	await CommentDataAccess.deleteComment(commentId);
};
const deleteStoryComment = async (commentId, storyId) => {
	await CommentDataAccess.deleteStoryComment(commentId, storyId);
};
module.exports = {
	postComment,
	deleteComment,
	deleteStoryComment,
};
