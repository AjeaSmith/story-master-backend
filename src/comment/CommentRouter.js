const express = require('express');
const { validate } = require('../../middleware/validations');
const router = express.Router();
const CommentService = require('./CommentService');
const { authorization } = require('../../middleware/authorize');

router.post('/:storyId/add', authorization, async (req, res) => {
	try {
		await CommentService.postComment(
			req.body.message,
			req.userId,
			req.params.storyId
		);
		res.status(201).json({ msg: 'Comment successfully posted' });
	} catch (error) {
		console.log('err',error);
		res.status(500).json({ error: error });
	}
});
router.delete('/:storyId', authorization, async (req, res) => {
	try {
		await CommentService.deleteComment(req.body.commentId);
		await CommentService.deleteStoryComment(
			req.params.storyId,
			req.body.commentId
		);
		res.status(200).json({ msg: 'Comment successfully deleted' });
	} catch (error) {
		res.status(500).json({ error });
	}
});

module.exports = router;
