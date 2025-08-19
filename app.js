require("dotenv").config();

const express = require("express");
const session = require("express-session");
const connectDb = require("./config/db");

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

// Database connection
connectDb();

// Auth Routes
app.use(require("./routes/authRoutes"));
// User Routes
app.use(require("./routes/userRoutes"));
// Event Routes
app.use(require("./routes/eventRoutes"));

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

  const events = await Event.findById(req.params.id).populate([
    "createdBy",
    "participants",
  ]);

  const { getUserStatus } = require("./middleware/authMiddleware");

  if (!getUserStatus) {
    res.render("events/eventDetails", { events, getUserStatus });
  } else {
    res.render("events/eventDetails", { events, getUserStatus });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://127.0.0.1:${PORT}`);
});
