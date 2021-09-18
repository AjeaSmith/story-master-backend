const express = require('express');
const {
	validate,
	registerValidationRules,
	loginValidationRules,
} = require('../../middleware/validations');
const router = express.Router();
const UserService = require('./UserService');
const passport = require('passport');

router.post(
	'/register',
	registerValidationRules(),
	validate,
	async (req, res) => {
		try {
			await UserService.register(req.body);
			res.status(201).json({ msg: 'User successfully registered' });
		} catch (error) {
			return res.status(error.status).send({ error: error.message });
		}
	}
);
router.post('/login', loginValidationRules(), validate, async (req, res) => {
	try {
		const { token, expires } = await UserService.login(req.body);
		res.cookie('access_token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})
			.status(200)
			.json({ msg: 'Logged in successfully' });
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});

router.get('/:userId', async (req, res) => {
	const { profile, error } = await UserService.getProfile(req.params.userId);
	if (error) {
		res.status(404).json({ success: false, error });
	}
	res.status(200).json({ success: true, profile });
});
router.post('/:userId/edit', passport.authenticate('jwt'), async (req, res) => {
	const { updated, error } = await UserService.editProfile(
		req.params.userId,
		req.body
	);
	if (error) {
		res.json({ error: error });
	}
	res.status(200).json({ success: true, profile: updated });
});
router.delete('/:userId', passport.authenticate('jwt'), async (req, res) => {
	const { msg, error } = await UserService.disableAccount(req.params.userId);
	if (error) {
		res.json({ error: error });
	}
	res.status(200).json({ success: true, message: msg });
});

module.exports = router;
