const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const InitalDBServer = require('./config/db');

const auth = require('./routes/auth-route');

// middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/auth', auth);

// routes
app.get('/', (req, res) => {
	res.send('API Working....');
});

//Set up mongodb connection
InitalDBServer();
app.listen(process.env.PORT, () => console.log('server started...'));
