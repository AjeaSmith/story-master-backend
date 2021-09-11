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
		const { error, msg } = await CommentService.postComment(
			req.body.message,
			req.user._id,
			req.params.storyId
		);
		if (error) {
			res.status(500).json({ error: 'unable to post comment' });
		}
		res.status(201).json({ message: msg });
	}
);
router.delete(
	'/:commentId',
	passport.authenticate('jwt'),
	async (req, res) => {}
);

module.exports = router;
