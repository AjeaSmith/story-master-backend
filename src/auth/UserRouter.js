const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserService = require('./UserService');

router.post('/register', async (req, res, next) => {
	const { email, username, password } = req.body;
	UserService.register(email, username, password)
		.then(() => {
			console.log('user added successfully');
		})
		.catch((err) => {
			res.status(err.code).send({ error: err.message });
		});
});

router.post('/login', passport.authenticate('local'));
router.get('/logout', (req, res, next) => {
	req.logout();
	res.status(200).json({ msg: 'Logged out' });
});
router.get('/:email', async (req, res) => {
	UserService.getProfile(req.params.email)
		.then((profile) => {
			res.status(200).json(profile);
		})
		.catch((error) => {
			return res.status(error.code).send({ error: error.message });
		});
});
router.put('/:id/edit', async (req, res) => {
	UserService.editProfile(req.params.id, req.body)
		.then((updatedProfile) => {
			res.status(200).json({ profile: updatedProfile });
		})
		.catch((err) => {
			return res.status(err.code).send({ error: err.message });
		});
});
router.delete('/', async (req, res) => {
	UserService.disableAccount(req.userId)
		.then((message) => {
			res.status(200).json({ message });
		})
		.catch((err) => {
			return res.status(err.code).send({ error: err.message });
		});
});

module.exports = router;
