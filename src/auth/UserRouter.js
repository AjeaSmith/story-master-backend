const express = require('express');
const mongoose = require('mongoose');
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
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
		})
			.status(200)
			.json({ msg: 'Logged in successfully' });
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});
router.get('/:id', async (req, res) => {
	try {
		const { profile } = await UserService.getProfile(req.params.id);
		res.status(200).json(profile);
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});
router.put('/:id/edit', authorization, async (req, res) => {
	try {
		console.log(req.body);
		const { updated } = await UserService.editProfile(
			req.params.id,
			req.body
		);
		res.status(200).json({ profile: updated });
	} catch (error) {
		return res.status(error.status).send({ error: error.message });
	}
});
router.delete('/:id', authorization, async (req, res) => {
	try {
		await UserService.disableAccount(req.params.userId);
		res.status(200).json({ success: true, message: msg });
	} catch (error) {
		console.log('error from delete account', error);
	}
});

module.exports = router;
