const express = require('express');
const router = express.Router();
const passport = require('passport');
const UserService = require('./UserService');
const isAuthenticated = require('../middleware/isAuthenticated');

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
router.post('/login', passport.authenticate('local'), (req, res) => {
	req.login(req.user, (err) => {
		if (err) return console.log(err);
		res.send({
			msg: 'Successfully logged in',
			authenticated: req.isAuthenticated(),
		});
	});
});
router.get('/authenticated', async (req, res) => {
	if (req.isAuthenticated()) {
		res.send({ authenticated: req.isAuthenticated(), user: req.user });
	} else {
		res.send({ authenticated: req.isAuthenticated() });
	}
	console.log('authenticated', req.isAuthenticated());
	console.log(req.session);
});
router.get('/logout', (req, res) => {
	req.session.destroy(function (err) {
		// cannot access session here
		if (err) return console.log(err);
	});
	res.send({ authenticated: req.isAuthenticated() });
});
router.get('/:id', async (req, res) => {
	UserService.getProfile(req.params.id)
		.then((profile) => {
			res.status(200).json(profile);
		})
		.catch((error) => {
			return res.status(error.code).send({ error: error.message });
		});
});
router.put('/:id/edit', isAuthenticated, async (req, res) => {
	UserService.editProfile(req.params.id, req.body)
		.then(() => {
			res.status(200).json({ message: 'updated successfully' });
		})
		.catch((err) => {
			return res.status(err.code).send({ error: err.message });
		});
});
router.delete('/:id', isAuthenticated, async (req, res) => {
	UserService.disableAccount(req.params.id)
		.then(() => {
			res.status(200).json({ message: 'Account successfully disabled' });
			req.session.destroy(function (err) {
				// cannot access session here
				if (err) return console.log(err);
			});
		})
		.catch((err) => {
			return res.status(err.code).send({ error: err.message });
		});
});
module.exports = router;
