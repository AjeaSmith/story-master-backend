const mongoose = require('mongoose');
require('dotenv/config');

async function InitalDBServer() {
	const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@story-master-cluster.b6bqf.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

	mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
	const connection = mongoose.connection;
	connection.once('open', () => {
		console.log('MongoDB database connection established successfully');
	});
}
module.exports = InitalDBServer;
