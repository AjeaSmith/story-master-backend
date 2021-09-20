const express = require('express');
const app = express();
const cors = require('cors');

const InitalDBServer = require('./config/db');
const user = require('./src/auth/UserRouter');
const story = require('./src/story/StoryRouter');
const comment = require('./src/comment/CommentRouter');
const cookieParser = require('cookie-parser');

require('dotenv').config();

//Set up mongodb connection
InitalDBServer().catch((err) => console.error(err));

var corsOptions = {
	origin: 'http://localhost:3000',
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use('/api/user', user);
app.use('/api/story', story);
app.use('/api/comment', comment);

// routes
app.get('/', (req, res) => {
	res.send('API Working....');
});

app.listen(8080, () => console.log('server started...'));
