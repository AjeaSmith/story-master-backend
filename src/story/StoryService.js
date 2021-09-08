const StoryDAL = require('./StoryDAL');

const getAllStories = async () => {
	try {
		const stories = await StoryDAL.getAllStories();
		return { data: stories };
	} catch (error) {
		return { error: error.message };
	}
};
const addStory = async (text, userId) => {
	await StoryDAL.addStory(text, userId);
};
module.exports = {
	getAllStories,
	addStory,
};
