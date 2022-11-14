const express = require("express");
const { ObjectId } = require("mongodb");

// recordRoutes is an instance of the express router
// we use it to define our routes
// The router will be added as a middleware and will take control of requests starting with path /record
const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = "../db/conn";

// This helps convert the id from string to objectfield for the _id
const OjectId = require("mongodb").ObjectId;

// This section will help you get a list of all records
recordRoutes.route("/record").get((req, res) => {
	let db_connect = dbo.getDb("employees");
	db_connect
		.collection("records")
		.find({})
		.toArray((err, result) => {
			if (err) throw err;
			res.json(result);
		});
});

// This section will help you to get a single record
recordRoutes.route("/record/:id").get((req, res) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("records").findOne(myquery, (err, result) => {
		if (err) throw err;
		res.json(result);
	});
});

// This section will help create a new record
recordRoutes.route("/record/add").post((req, response) => {
	let db_connect = dbo.getDb();
	let myobj = {
		name: req.body.name,
		postition: req.body.position,
		level: req.body.level,
	};
	db_connect.collection("records").insertOne(myobj),
		(err, res) => {
			if (err) throw err;
			response.json(res);
		};
});

// This section will update a record by id
recordRoutes.route("/update/:id").post((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	let newValues = {
		$set: {
			name: req.body.name,
			position: req.body.position,
			level: req.body.level,
		},
	};
	db_connect.collection("records").updateOne(myquery, newValues, (err, res) => {
		if (err) throw err;
		console.log("1 document updated");
		response.json(res);
	});
});

// This section will delete a record
recordRoutes.route("/:id").delete((req, response) => {
	let db_connect = dbo.getDb();
	let myquery = { _id: ObjectId(req.params.id) };
	db_connect.collection("records").deleteOne(myquery, (err, obj) => {
		if (err) throw err;
		console.log("1 Document deleted");
		response.json(obj);
	});
});

module.exports = recordRoutes;
