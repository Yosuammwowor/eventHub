const express = require("express");
const route = express.Router();

const { auth } = require("../middleware/authMiddleware");
const {
  getCreateEvent,
  createEvent,
  joinEvent,
  deleteEvent,
  getEditEvent,
  editEvent,
} = require("../controllers/eventController");

route.get("/events/new", auth, getCreateEvent);

route.post("/events/new", auth, createEvent);

route.post("/events/:id/join", auth, joinEvent);

route.delete("/events/:id", auth, deleteEvent);

route.get("/dashboard/events/:id", auth, getEditEvent);

route.put("/events/:id/edit", auth, editEvent);

module.exports = route;
