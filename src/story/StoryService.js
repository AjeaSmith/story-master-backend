const StoryDAL = require('./StoryDAL');

const getAllStories = async () => {
	try {
		const stories = await StoryDAL.getAllStories();
		return { data: stories };
	} catch (error) {
		return { error: error.message };
	}
};
const addStory = async (title, text, userId) => {
	await StoryDAL.addStory(title, text, userId);
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
