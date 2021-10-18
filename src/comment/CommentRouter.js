const express = require('express');
const router = express.Router();
const CommentService = require('./CommentService');

router.post('/:storyId/add', (req, res) => {
	CommentService.postComment(req.body.message, req.userId, req.params.storyId)
		.then(() => {
			res.status(201).json({ msg: 'Comment successfully posted' });
		})
		.catch(() => {
			res.status(500).json({ error: error });
		});
});
router.delete('/:storyId', (req, res) => {
	Promise.all([
		CommentService.deleteComment(req.body.commentId),
		CommentService.deleteStoryComment(req.params.storyId, req.body.commentId),
	])
		.then(() => {
			res.status(200).send({ msg: 'Comment successfully deleted' });
		})
		.catch((err) => {
			console.log(err);
			res.status(400).send({ error: 'Could not delete comment' });
		});
});

module.exports = router;
