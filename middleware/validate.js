const { body, validationResult } = require('express-validator');
const UserService = require('../src/auth/UserService');
const userValidationRules = () => {
	return [
		// email must be an email
		body('username')
			.isLength({ min: 3 })
			.withMessage('username must be at least 3 characters long'),

		body('email')
			.isEmail()
			.withMessage('Please enter a valid email address')
			.bail()
			.custom(async (email) => {
				const user = await UserService.findByEmail(email);
				if (user) {
					throw new Error('User already exists');
				}
			}),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),
	];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	next();
};

module.exports = { validate, userValidationRules };
