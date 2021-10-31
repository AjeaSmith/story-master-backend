const express = require('express');
const router = express.Router();
const StoryService = require('./StoryService');
const isAuthenticated = require('../middleware/isAuthenticated');

router.get('/', async (req, res) => {
	try {
		const { data } = await StoryService.getAllStories();
		res.status(200).json({ stories: data });
	} catch (error) {
		res.status(error.status).json({ error: error.message });
	}
});

router.post('/add', isAuthenticated, async (req, res) => {
	StoryService.addStory(req.body.title, req.body.text, req.user.id)
		.then(() => {
			res.status(201).json({
				message: 'Story added successfully',
			});
		})
		.catch((err) => {
			return res.status(err.code).json({ errors: err.message });
		});
});
router.get('/:storyId', async (req, res) => {
	StoryService.getStoryById(req.params.storyId)
		.then((data) => {
			res.status(200).json({
				story: data,
			});
		})
		.catch((err) => {
			console.log(err);
		});
});
router.delete('/:storyId', isAuthenticated, async (req, res) => {
	Promise.all([
		StoryService.deleteStory(req.params.storyId),
		StoryService.deleteUserStory(req.userId, req.params.storyId),
	])
		.then(() => {
			res.status(200).json({
				message: 'Story successfully deleted',
			});
		})
		.catch((err) => {
			res.status(400).json({ error: 'Could not delete story' });
		});
});
router.delete('/mine/:storyId', isAuthenticated, async (req, res) => {
	StoryService.deleteStory(req.params.storyId)
		.then(() => {
			res.status(200).json({
				message: 'Story successfully deleted',
			});
		})
		.catch((err) => {
			res.status(400).json({ error: 'Could not delete story' });
		});
});
module.exports = router;
