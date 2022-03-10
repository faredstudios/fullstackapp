const mongoose = require("mongoose");
mongoose.set("debug",true);
mongoose.Promisee = Promise;
mongoose.connect("mongodb://localhost/FullstackApp", {
	keepAlive: true,
	useMongoClient: true
});
