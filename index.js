const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const cors = require('cors');
require('dotenv').config();

// middleware
app.use(cors());

// routes
app.get('/', (req, res) => {
	res.send('API Working....');
});

//Set up mongodb connection
async function main() {
	const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@story-master-cluster.b6bqf.mongodb.net/admin?retryWrites=true&w=majority`;

	const client = new MongoClient(uri);

	try {
		// Connect to the MongoDB cluster
		await client.connect();
		console.log('Mongodb connected');

		// start server
		app.listen(process.env.PORT, () => console.log('server started...'));
	} catch (e) {
		console.error(e);
	} finally {
		await client.close();
	}
}

main().catch(console.error);
