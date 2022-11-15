const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.Port || 5000;

app.use(cors());
app.use(express.json());
app.use(require("./routes/record"));

// get driver connection
const { main } = require("./db/conn");

app.listen(port, () => {
	// perfom a database connection when server starts

	main();
	console.log(`Server is running on port ${port}`);
});
