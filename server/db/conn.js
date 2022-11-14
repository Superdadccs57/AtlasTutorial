const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

const run = async () => {
	try {
		await client.connect();
		// database and collection code goes here
		const db = client.db("employees");
		const collection = db.collection("records");
	} catch (error) {}
};
