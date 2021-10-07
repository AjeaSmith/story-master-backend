const User = require('../src/auth/User');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const verifyCallback = (username, password, done) => {
	// check for user in DB
	User.findOne({ username: username })
		.then(async (user) => {
			if (!user) return done(null, false);
			const validPassword = await bcrypt.compare(password, user.password);
			if (!validPassword) return done(null, false);
			return done(null, user);
		})
		.catch((err) => {
			done(err);
		});
};

const Localstrategy = new LocalStrategy(verifyCallback);

passport.use(Localstrategy);

passport.serializeUser((user, done) => {
	// store user id in session
	done(null, user.id);
});
passport.deserializeUser((userId, done) => {
	// find user and set user to req obj -> req.user to use within your routes
	User.findById({ _id: userId })
		.then((user) => {
			done(null, user);
		})
		.catch((err) => {
			done(err);
		});
});
