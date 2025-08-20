const express = require("express");
const route = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  getCreateEvent,
  createEvent,
  joinEvent,
} = require("../controllers/eventController");

route.get("/events/new", auth, getCreateEvent);

route.post("/events/new", auth, createEvent);

route.post("/events/:id/join", auth, joinEvent);

module.exports = route;
