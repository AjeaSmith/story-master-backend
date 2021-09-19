const StoryDAL = require('./StoryDAL');
const {
	StoriesNotFoundException,
	PostStoryException,
} = require('../errorHandlers/storyExceptions');
const getAllStories = async () => {
	const stories = await StoryDAL.getAllStories();
	if (!stories.length) {
		throw new StoriesNotFoundException();
	}
	return { data: stories };
};
const addStory = async (title, text, profileId) => {
	await StoryDAL.addStory(title, text, profileId);
};
const deleteStory = async (storyId) => {
	await StoryDAL.deleteStory(storyId);
};
const deleteUserStory = async (authorId, storyId) => {
	await StoryDAL.deleteUserStory(authorId, storyId);
};
module.exports = {
	getAllStories,
	addStory,
	deleteStory,
	deleteUserStory,
};
