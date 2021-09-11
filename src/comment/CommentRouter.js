const express = require('express');
const { validate } = require('../../middleware/validations');
const router = express.Router();
const CommentService = require('./CommentService');
const passport = require('passport');

router.post(
	'/:storyId/comment/add',
	passport.authenticate('jwt'),
	validate,
	async (req, res) => {
		const { error } = await CommentService.postComment(
			req.body.message,
			req.user._id,
			req.params.storyId
		);
		if (error) {
			res.status(500).json({ error: 'unable to post comment' });
		}
		res.status(201).json({ msg: 'Comment successfully posted' });
	}
);
router.delete('/:storyId', passport.authenticate('jwt'), async (req, res) => {
	const { error } = await CommentService.deleteComment(
		req.body.commentId,
		req.params.storyId
	);
	if (error) {
		res.status(500).json({ error: 'unable to delete comment' });
	}
	res.status(200).json({ msg: 'Comment successfully deleted' });
});

module.exports = router;
