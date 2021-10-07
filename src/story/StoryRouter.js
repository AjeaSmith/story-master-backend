const express = require('express');
const router = express.Router();
const StoryService = require('./StoryService');

router.get('/', async (req, res) => {
	try {
		const { data } = await StoryService.getAllStories();
		res.status(200).json({ stories: data });
	} catch (error) {
		res.status(error.status).json({ error: error.message });
	}
});

router.post('/add', async (req, res) => {
	await StoryService.addStory(req.body.title, req.body.text, req.userId)
		.then(() => {
			res.status(201).json({
				message: 'Story added successfully',
			});
		})
		.catch((err) => {
			res.status(422).json({ errors: [err.errors] });
		});
});

router.delete('/:storyId', async (req, res) => {
	await StoryService.deleteStory(req.params.storyId)
		.then(() => {
			res.status(200).json({
				message: 'Story successfully deleted',
			});
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
	await StoryService.deleteUserStory(req.userId, req.params.storyId)
		.then(() => {
			res.status(200).json({
				message: 'Story successfully deleted',
			});
		})
		.catch((err) => {
			res.status(400).json({ error: err });
		});
});
module.exports = router;
