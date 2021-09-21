const express = require('express');
const {
	validate,
	registerValidationRules,
	loginValidationRules,
} = require('../../middleware/validations');
const router = express.Router();
const UserService = require('./UserService');
const { authorization } = require('../../middleware/authorize');

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
			expires: expires,
			httpOnly: false,
			secure: false,
		})
			.status(200)
			.json({ msg: 'Logged in successfully' });
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});
router.get('/logout', (req, res) => {
	const options = {
		expires: new Date(Date.now() + 10000),
		secure: false,
		httpOnly: false,
	};
	res.cookie('access_token', 'expired_token', options);
	return res.status(200).send({ message: 'logged out successfully' });
});

router.get('/:id', authorization, async (req, res) => {
	try {
		const { profile } = await UserService.getProfile(req.params.id);
		res.status(200).json(profile);
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});

router.put('/:id/edit', authorization, async (req, res) => {
	try {
		const { updated } = await UserService.editProfile(
			req.params.id,
			req.body
		);
		res.status(200).json({ profile: updated });
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});
router.delete('/', authorization, async (req, res) => {
	try {
		const { message } = await UserService.disableAccount(req.userId);
		res.status(200).json({ message });
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});
module.exports = router;
