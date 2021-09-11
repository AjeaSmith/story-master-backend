const CommentDataAccess = require('./CommentDAL');

const postComment = async (message, authorId, storyId) => {
	try {
		await CommentDataAccess.postComment(message, authorId, storyId);
		return { success: true, msg: 'Comment successfully posted' };
	} catch (error) {
		return { success: false, error: error };
	}
};
module.exports = {
	postComment,
};
ß