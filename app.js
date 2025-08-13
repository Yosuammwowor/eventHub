require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", async (req, res) => {
  const Event = require("./models/Event");

  const events = await Event.find();

  res.render("home", { events });
});

app.get("/events/:id", async (req, res) => {
  const Event = require("./models/Event");
  require("./models/User");

  const events = await Event.findById(req.params.id).populate([
    "createdBy",
    "participants",
  ]);

  res.render("eventDetails", { events });
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
