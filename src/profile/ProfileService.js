const ProfileDAL = require('./ProfileDAL');

const me = async (profileId) => {
	try {
		const profile = await ProfileDAL.me(profileId);
		return {
			profile: profile,
		};
	} catch (error) {
		return { error: error.message };
	}
};

module.exports = {
	me,
};
