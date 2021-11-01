const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const cors = require('cors');
const MongoStore = require('connect-mongo');

const InitalDBServer = require('./config/db');
const user = require('./src/auth/UserRouter');
const story = require('./src/story/StoryRouter');
const comment = require('./src/comment/CommentRouter');

require('dotenv').config();

//Set up mongodb connection
InitalDBServer().catch((err) => console.error(err));

let corsOptions = {
	origin: 'https://story-master-elite.netlify.app/',
	credentials: true,
};
// ------------ Middlewares (General) --------------
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ------------  Middleware (Session configuration) ---------------
app.set('trust proxy', 1);
app.use(
	session({
		secret: process.env.SESSION,
		resave: false,
		saveUninitialized: false,
		store: MongoStore.create({
			mongoUrl: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@story-master-cluster.b6bqf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
		}),
		cookie: {
			httpOnly: true,
			secure: true,
			sameSite: 'none',
			maxAge: 1000 * 60 * 60 * 24, // Equals 1 day (1 day * 24 hr/1 day * 60 min/1 hr * 60 sec/1 min * 1000 ms / 1 sec)
		},
	})
);
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

const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server started...'));
