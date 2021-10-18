const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserService = require('./UserService');

router.post('/register', (req, res, next) => {
	const { email, username, password } = req.body;
	UserService.register(email, username, password)
		.then(() => {
			res.status(200).send({ msg: 'User registration successfully' });
		})
		.catch((err) => {
			res.status(err.code).send({ error: err.message });
		});
});
router.post('/login', passport.authenticate('local'), (req, res, next) => {
	req.login(req.user, (err) => {
		if (err) return console.log(err);
		res.send({
			msg: 'Successfully logged in',
			authenticated: req.isAuthenticated(),
		});
	});
});
router.get('/authenticated', async (req, res) => {
	res.send({ authenticated: req.isAuthenticated() });
	console.log('from authenticated', req.isAuthenticated());
});
router.get('/logout', (req, res) => {
	req.session.destroy(function (err) {
		// cannot access session here
		if (err) return console.log(err);
		console.log('session destroyed');
	});
	res.send({ msg: 'Successfully logged out' });
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
