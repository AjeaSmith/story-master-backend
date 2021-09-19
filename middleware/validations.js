const { body, validationResult } = require('express-validator');

const loginValidationRules = () => {
	return [
		// email must be an email
		body('email').isEmail().withMessage('Please enter a valid email address'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),
	];
};
const registerValidationRules = () => {
	return [
		// email must be an email
		body('username')
			.isLength({ min: 3 })
			.withMessage('username must be at least 3 characters long'),

		body('email').isEmail().withMessage('Please enter a valid email address'),
		body('password')
			.isLength({ min: 6 })
			.withMessage('Password must be at least 6 characters long'),
	];
};
const addStoryRules = () => {
	return [
		body('title').isEmpty().withMessage('Title field is required'),

		body('text').isEmpty().withMessage('Story field is required'),
	];
};
const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	next();
};

module.exports = {
	validate,
	loginValidationRules,
	registerValidationRules,
	addStoryRules,
};
