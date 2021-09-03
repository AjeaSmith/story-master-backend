const express = require('express');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());

// routes
app.get('/', (req, res) => {
	res.send('API Working....');
});

// start server
const port = 8000;
app.listen(port, () => console.log('server is started...'));
