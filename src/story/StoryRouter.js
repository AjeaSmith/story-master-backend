const express = require('express');
const {
	validate,
	storyValidationRules,
} = require('../../middleware/storyValidate');

const router = express.Router();
const StoryService = require('./StoryService');
const passport = require('passport');

router.get('/', async (req, res) => {
	const { data, error } = await StoryService.getAllStories();
	if (error) {
		res.status(500).json({ success: false, error: error });
	}
	res.status(200).json({ stories: data });
});

router.post(
	'/add',
	passport.authenticate('jwt', { session: false }),
	async (req, res) => {
		console.log(req.user);
		try {
			await StoryService.addStory(req.body.text, req.user._id);
			res.status(201).json({
				success: true,
				message: 'Story successfully added',
			});
		} catch (error) {
			res.status(400).json({ success: false, error: error });
		}
	}
);
module.exports = router;
