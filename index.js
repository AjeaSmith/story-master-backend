const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const InitalDBServer = require('./config/db');

const auth = require('./src/auth/AuthRouter');

//Set up mongodb connection
InitalDBServer().catch((err) => console.error(err));

// middleware
app.use(cors());
app.use(bodyParser.json({ type: 'application/json' }));
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/auth', auth);

// routes
app.get('/', (req, res) => {
	res.send('API Working....');
});

app.listen(process.env.PORT, () => console.log('server started...'));
