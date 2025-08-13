const express = require("express");
const route = express.Router();

const { authLogin } = require("../controllers/authController");

route.get("/login", (req, res) => {
  res.render("auth/login");
});

route.post("/login", authLogin);

route.get("/register", (req, res) => {
  res.render("auth/register");
});

module.exports = route;
