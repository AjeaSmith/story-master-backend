const Story = require('./Story');
const User = require('../auth/User');

const getAllStories = async () => {
	const stories = await Story.find({})
		.populate('author', '_id username')
		.sort({ createdAt: -1 });

	return stories;
};

const addStory = async (title, text, userId) => {
	const story = new Story({ title: title, text: text, author: userId });
	await story.save();

	const user = await User.findById({ _id: userId });
	user.publishedStories.push(story._id);

	await user.save();
};
const getStory = async (id) => {
	const story = await Story.findById(id)
		.populate('author', '_id username')
		.populate({
			path: 'comments',
			populate: { path: 'author', select: 'username' },
		});
	return story;
};
const editStory = async (id, data) => {};

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
	getStory,
};
