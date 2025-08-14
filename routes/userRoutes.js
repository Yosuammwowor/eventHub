const express = require("express");
const route = express.Router();

const { getDashboard, logOut } = require("../controllers/userController");
const { auth } = require("../middleware/authMiddleware");

route.get("/dashboard/:id", auth, getDashboard);

route.post("/dashboard", logOut);

module.exports = route;
