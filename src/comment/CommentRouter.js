const express = require('express');
const { validate } = require('../../middleware/validations');
const router = express.Router();
const CommentService = require('./CommentService');
const passport = require('passport');

router.post(
	'/:storyId/add',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			await CommentService.postComment(
				req.body.message,
				req.user._id,
				req.params.storyId
			);
			res.status(201).json({ msg: 'Comment successfully posted' });
		} catch (error) {
			res.status(500).json({ error: error });
		}
	}
);
router.delete(
	'/:storyId',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		try {
			await CommentService.deleteComment(req.body.commentId);
			await CommentService.deleteStoryComment(
				req.params.storyId.anchor,
				req.body.commentId
			);
			res.status(200).json({ msg: 'Comment successfully deleted' });
		} catch (error) {
			res.status(500).json({ error });
		}
	}
);

module.exports = router;
