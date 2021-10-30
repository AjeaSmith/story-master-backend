const StoryDAL = require('./StoryDAL');
const {
	StoriesNotFoundException,
} = require('../errorHandlers/storyExceptions');
const getAllStories = async () => {
	const stories = await StoryDAL.getAllStories();
	if (!stories.length) {
		throw new StoriesNotFoundException('No stories found');
	}
	return { data: stories };
};
const getStoryById = async (id) => {
	const story = await StoryDAL.getStory(id);
	return story;
};
const addStory = async (title, text, profileId) => {
	StoryDAL.addStory(title, text, profileId).catch((err) => {
		throw new PostStoryException('Could not add story');
	});
};
const deleteStory = async (storyId) => {
	await StoryDAL.deleteStory(storyId);
};
const deleteUserStory = async (authorId, storyId) => {
	await StoryDAL.deleteUserStory(authorId, storyId);
};
module.exports = {
	getAllStories,
	getStoryById,
	addStory,
	deleteStory,
	deleteUserStory,
};
