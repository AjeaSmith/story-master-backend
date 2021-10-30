function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.status(401).send({ msg: 'You are not authorized!' });
}
module.exports = isAuthenticated;
