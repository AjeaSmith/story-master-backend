const CommentDataAccess = require('./CommentDAL');

const postComment = async (message, authorId, storyId) => {
	try {
		await CommentDataAccess.postComment(message, authorId, storyId);
	} catch (error) {
		return { error: error };
	}
};
const deleteComment = async (commentId, storyId) => {
	try {
		await CommentDataAccess.deleteComment(commentId, storyId);
		return;
	} catch (error) {
		return { error: error };
	}
};
module.exports = {
	postComment,
	deleteComment,
};
ß;
