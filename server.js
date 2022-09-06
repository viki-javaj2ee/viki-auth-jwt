const express = require("express");
require("dotenv").config();
const app = express();
app.use(express.json());
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

const mongodbConnection = require("./config/mongodbConnection");
const port = 5000;

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
