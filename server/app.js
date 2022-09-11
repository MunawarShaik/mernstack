const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const app = express();

dotenv.config({ path: "./config.env" });

const DB = process.env.DATABASE;

mongoose
  .connect(DB)
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => {
    console.log(`no connection`);
  });

// Middleware

const middleware = (req, res, next) => {
  console.log(`this is from middleware`);
  next();
};

app.get("/", (req, res) => {
  res.send(`Hello world from the server`);
});

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

app.listen(4000, () => {
  console.log(`server is running at port number 4000`);
});
