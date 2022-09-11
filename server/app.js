const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

require("./db/conn");

app.use(express.json());

//const User =  require('./modal/userSchema');

// we link the router files to make our route easy
app.use(require("./router/auth"));

const PORT = process.env.PORT;

// Middleware

const middleware = (req, res, next) => {
  console.log(`this is from middleware`);
  next();
};

// app.get("/", (req, res) => {
//   res.send(`Hello world from the app.js server`);
// });

app.get("/about", middleware, (req, res) => {
  res.send(`Hello world from the about`);
});

app.get("/contact", (req, res) => {
  res.send(`Hello world from the contact`);
});

app.get("/signin", (req, res) => {
  res.send(`Hello login world from the signin`);
});

app.get("/signup", (req, res) => {
  res.send(`Hello  registration world from the signup`);
});

app.listen(PORT, () => {
  console.log(`server is running at port number ${PORT}`);
});
