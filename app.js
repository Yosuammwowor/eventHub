require("dotenv").config();

const express = require("express");
const session = require("express-session");

const app = express();
const path = require("path");
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "yoursecret",
    resave: false,
    saveUninitialized: false,
  })
);

// Auth Routes
app.use(require("./routes/authRoutes"));
// User Routes
app.use(require("./routes/userRoutes"));

app.get("/", async (req, res) => {
  const Event = require("./models/Event");

  const events = await Event.find();

  const { getUserStatus } = require("./middleware/authMiddleware");

  if (!getUserStatus()) {
    res.render("home", { events, getUserStatus });
  } else {
    const userId = req.session.userId;
    res.render("home", { events, getUserStatus, userId });
  }
});

app.get("/events/:id", async (req, res) => {
  const Event = require("./models/Event");
  require("./models/User");

  const events = await Event.findById(req.params.id).populate([
    "createdBy",
    "participants",
  ]);

  res.render("events/eventDetails", { events });
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
