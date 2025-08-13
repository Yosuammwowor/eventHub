require("dotenv").config();
const URI = process.env.MONGO_URI;

const mongoose = require("../config/db")(URI);

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedEvents: [
    {
      type: String,
    },
  ],
});

// const User = mongoose.model("User", userSchema);

module.exports = mongoose.model("User", userSchema);
