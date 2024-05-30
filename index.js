const express = require("express");
const path = require("path");
const userRoute = require("./routes/user");
const mongoose = require("mongoose");

const app = express();
const PORT = 3009;

mongoose.connect("mongodb://127.0.0.1:27017/blogify").then(() => {
  console.log("MongoDb Connected");
});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.render("home");
});

app.use("/user", userRoute);
app.listen(PORT, (req, res) => {
  console.log(`Your port is running on ${PORT}`);
});
