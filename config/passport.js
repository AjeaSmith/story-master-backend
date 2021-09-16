const User = require('../src/auth/User');
const jwtStrategy = require('passport-jwt').Strategy;
const extractedJWT = require('passport-jwt').ExtractJwt;

// options to pass in strategy
const options = {
	jwtFromRequest: extractedJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: process.env.TOKEN_SECRET,
};

// passport obj is passed in through index.js file
module.exports = (passport) => {
	// middleware kicks in when your token needs to be verified before accessing the route
	passport.use(
		new jwtStrategy(options, function (jwt_payload, done) {
			// We will assign the `sub` property on the JWT to the database ID of user
			User.findOne({ _id: jwt_payload.sub }, function (err, user) {
				// This flow look familiar?  It is the same as when we implemented
				// the `passport-local` strategy
				if (err) {
					return done(err, false);
				}
				if (user) {
					return done(null, user);
				} else {
					return done(null, false);
				}
			});
		})
	);
};
