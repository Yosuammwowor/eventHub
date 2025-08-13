require("dotenv").config();
const URI = process.env.MONGO_URI;

const mongoose = require("../config/db")(URI);

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    max: 300,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
  participants: [
    {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  ],
});

module.exports = mongoose.model("Event", eventSchema);
