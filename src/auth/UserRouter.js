const express = require('express');
const { validate, userValidationRules } = require('../../middleware/validate');
const router = express.Router();
const UserService = require('./UserService');

router.post('/register', userValidationRules(), validate, async (req, res) => {
	const { token, user, expires, success, error } = await UserService.register(
		req.body
	);
	if (error) {
		res.status(409).json({ error: error });
	}
	res.status(201).json({
		token,
		user,
		expires,
		success,
		message: 'User successfully registered',
	});
});

router.post('/login', userValidationRules(), validate, async (req, res) => {
	const { token, expires, success, error } = await UserService.login(req.body);
	if (error) {
		res.status(409).json({ error: error });
	}
	res.status(200).json({
		token,
		expires,
		success,
		message: 'User successfully logged in',
	});
});

module.exports = router;
