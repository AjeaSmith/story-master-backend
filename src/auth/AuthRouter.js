const express = require('express');
// const { check, validationResult } = require('express-validator/check');
const router = express.Router();
const AuthService = require('./AuthService');

router.post('/register', async (req, res) => {
	const { token, error } = await AuthService.register(req.body);

	if (!error) {
		res.status(201).json({ token });
	}
	res.status(409).json({ error });
});

module.exports = router;
