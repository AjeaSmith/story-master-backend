const express = require('express');
const router = express.Router();
const StoryService = require('./StoryService');
const { validationResult } = require('express-validator');
const { authorization } = require('../../middleware/authorize');
const { addStoryRules, validate } = require('../../middleware/validations');

router.get('/', async (req, res) => {
	try {
		const { data } = await StoryService.getAllStories();
		res.status(200).json({ stories: data });
	} catch (error) {
		res.status(error.status).json({ error: error.message });
	}
});

router.post('/add', authorization, addStoryRules(), async (req, res) => {
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
	try {
		await StoryService.deleteStory(req.params.storyId);
		await StoryService.deleteUserStory(req.user._id, req.params.storyId);
		res.status(200).json({
			success: true,
			message: 'Story successfully deleted',
		});
	} catch (error) {
		res.status(400).json({ success: false, error: error });
	}
});
module.exports = router;
