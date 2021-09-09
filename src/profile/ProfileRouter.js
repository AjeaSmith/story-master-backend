const router = express.Router();
const ProfileService = require('./ProfileService');
// const passport = require('passport');

router.get('/:profileId', async (req, res) => {
	try {
		const { profile, error } = ProfileService.me(req.params.profileId);
		if (error) {
			res.status(404).json({ error: error });
		}
		res.status(200).json({ profile: profile, success: true });
	} catch (error) {
		res.status(404).json({ error: error });
	}
});

module.exports = router;
