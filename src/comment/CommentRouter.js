const express = require('express');
const router = express.Router();
const CommentService = require('./CommentService');
const isAuthenticated = require('../middleware/isAuthenticated');

router.post('/:storyId/add', isAuthenticated, (req, res) => {
	CommentService.postComment(req.params.storyId, req.body.message, req.user.id)
		.then(() => {
			res.status(201).json({ message: 'Comment successfully posted' });
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({ error: error });
		});
});

router.delete('/:storyId/:commentId', isAuthenticated, (req, res) => {
	Promise.all([
		CommentService.deleteComment(req.params.commentId),
		CommentService.deleteStoryComment(
			req.params.commentId,
			req.params.storyId
		),
	])
		.then(() => {
			res.status(200).send({ message: 'Comment successfully deleted' });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send({ error: 'Could not delete comment' });
		});
});

module.exports = router;
