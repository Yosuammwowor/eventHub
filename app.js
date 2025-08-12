require("dotenv").config();

const express = require("express");
const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;
// const mongoose = require("./config/db");

require("./config/db")(MONGO_URI);

app.get("/", (req, res) => {
  res.send("Hello World!!!");
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
