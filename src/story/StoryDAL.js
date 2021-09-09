const Story = require('./Story');
const User = require('../auth/User');

const getAllStories = async () => {
	const stories = await Story.find({});
	return stories;
};
const addStory = async (title, text, userId) => {
	const story = new Story({ title: title, text: text });
	await story.save();

	const user = await User.findById({ _id: userId });
	user.publishedStories.push(story._id);

	await user.save();
};
const deleteStory = async (storyID) => {
	await Story.deleteOne({ _id: storyID });
};
const deleteUserStory = async (authorID, storyID) => {
	await User.findById({ _id: authorID }).updateOne(
		{},
		{ $pull: { publishedStories: storyID } }
	);
};


module.exports = {
	getAllStories,
	addStory,
	deleteStory,
	deleteUserStory,
};
