const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true });
const connection = mongoose.connection;

connection.on("error", (err) => {
  console.error("Error occured while connecting Mongo DB", err);
});
connection.on("connected", () => {
  console.log("Mongo DB connection successful");
});
