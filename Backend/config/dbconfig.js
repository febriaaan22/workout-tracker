const mongoose = require("mongoose");
const { MONGO_URI } = require("./config");

const dbConnection = () => {
	mongoose
		.connect(MONGO_URI, {
			// useNewUrlParser: true,
			// useUnifiedTopology: true,
		})
		.then(() => {
			console.log("Success connected to MongoDB");
		})
		.catch((err) => {
			console.error(err);
		});
	console.log(MONGO_URI);
};

module.exports = dbConnection;
