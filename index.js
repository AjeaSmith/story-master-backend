const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const cors = require('cors');

const InitalDBServer = require('./config/db');
const user = require('./src/auth/UserRouter');
const story = require('./src/story/StoryRouter');
const comment = require('./src/comment/CommentRouter');

require('dotenv').config();

//Set up mongodb connection
InitalDBServer().catch((err) => console.error(err));

let corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};
// ------------ Middlewares (General) --------------
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ------------  Middleware (Session configuration) ---------------
app.use(
	session({
		secret: 'process.env.SESSION',
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
		},
	})
);
app.use(cookieParser('process.env.SESSION'));
// ----------- Passport Authentication -------------------

app.use(passport.initialize());
app.use(passport.session());
require('./config/passport')(passport);

// ------------- Routes ---------------------
app.use('/api/user', user);
app.use('/api/story', story);
app.use('/api/comment', comment);
app.get('/', (req, res) => {
	res.send('API Working....');
});

app.listen(8080, () => console.log('server started...'));
