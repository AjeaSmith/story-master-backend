const { MongoClient } = require('mongodb');
require('dotenv').config();

async function InitalDBServer() {
	const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@story-master-cluster.b6bqf.mongodb.net/admin?retryWrites=true&w=majority`;

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
module.exports = InitalDBServer;
