const { MongoClient } = require("mongodb");
const url = process.env.ATLAS_URI;
const client = new MongoClient(url);

const dbName = "employees";

const main = async () => {
	await client.connect();
	console.log("Connected to the Database");
	const db = client.db(dbName);
	const collection = db.collection("records");
};

const findAll = async (req, res) => {
	await client.connect();
	const db = client.db(dbName);
	const collection = db.collection("records");
	const findResults = await collection.find({}).toArray();
	console.log(findResults);
};

module.exports = { main, findAll };
