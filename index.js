const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');

// middleware
app.use(cors());

// routes
app.get('/', (req, res) => {
	res.send('API Working....');
});

//Set up mongodb connection
async function main() {
	const uri =
		'mongodb+srv://ajea:ajea1234@story-master-cluster.b6bqf.mongodb.net/admin?retryWrites=true&w=majority';

	const client = new MongoClient(uri);

	try {
		// Connect to the MongoDB cluster
		await client.connect();

		console.log('Mongodb connected');
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);

// start server
const port = 8000;
app.listen(port, () => console.log('server started...'));

