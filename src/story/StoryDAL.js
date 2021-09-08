const Story = require('./Story');
const User = require('../auth/User');

const getAllStories = async () => {
	const stories = await Story.find({});
	return stories;
};
const addStory = async (text, userId) => {
	const story = new Story({ text: text });
	await story.save();

	const user = await User.findById({ _id: userId });
	user.publishedStories.push(story);

	await user.save();
};
module.exports = {
	getAllStories,
	addStory,
};
