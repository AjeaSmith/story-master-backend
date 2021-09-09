const { body, validationResult } = require('express-validator');

const storyValidationRules = () => {
	return [body('text').isEmpty().withMessage('Text is required.')];
};

const validate = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}
	next();
};

module.exports = { validate, storyValidationRules };
