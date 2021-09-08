const express = require('express');
const app = express();
const cors = require('cors');
const passport = require('passport');

const InitalDBServer = require('./config/db');
const user = require('./src/auth/UserRouter');
const story = require('./src/story/StoryRouter');

require('dotenv').config();
require('./config/passport')(passport);
//Set up mongodb connection
InitalDBServer().catch((err) => console.error(err));

// passport
app.use(passport.initialize());

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/auth', user);
app.use('/api/story', story);

// routes
app.get('/', (req, res) => {
	res.send('API Working....');
});

app.listen(process.env.PORT, () => console.log('server started...'));
