const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const user = require('./src/auth/UserRouter');
const story = require('./src/story/StoryRouter');
const comment = require('./src/comment/CommentRouter');

const MongoStore = require('connect-mongo');

require('dotenv').config();

//Set up mongodb connection
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@story-master-cluster.b6bqf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const connection = mongoose.connection;

connection.once('open', () => {
	console.log('MongoDB database connection established successfully');
});

// cors options
let corsOptions = {
	origin: 'http://localhost:3000',
	credentials: true,
};
// ------------ Middlewares (General) --------------
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ------------  Middleware (Session configuration) ---------------

app.use(
	session({
		secret: process.env.SESSION,
		resave: false,
		saveUninitialized: true,
		store: MongoStore.create({ mongoUrl: uri }),
		cookie: {
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
	console.log(req.session);
});
const port = process.env.PORT || 8080;
app.listen(port, () => console.log('server started...'));
