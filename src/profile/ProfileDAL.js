const Profile = require('../profile/Profile');

const me = async (profileId) => {
	const profile = await Profile.findById(profileId);
	return profile;
};
const addProfile = async (username, email) => {
	const newProfile = new Profile({
		name: username,
		email,
    });
    newProfile.save()
};
module.exports = {
	me,
	addProfile,
};
