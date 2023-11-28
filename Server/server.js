const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.get("/", (req, res) => {});

app.get("register", (req, res) => {});

app.listen(3001, () => {
  console.log("Server is Running");
});
