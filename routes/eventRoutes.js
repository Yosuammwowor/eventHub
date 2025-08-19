const express = require("express");
const route = express.Router();

const { auth } = require("../middleware/authMiddleware");
const { joinEvent } = require("../controllers/eventController");

route.post("/events/:id/join", auth, joinEvent);

module.exports = route;
