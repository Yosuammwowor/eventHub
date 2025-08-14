const User = require("../models/User");

const { setUserActive } = require("../middleware/authMiddleware");

const authLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return console.log("Tipe Data Error!");
  }

  const users = await User.findOne({ email: email });

  if (!users) {
    return console.log("Email Error!");
  }

  const statusPassword = await users.comparePassword(password);

  if (!statusPassword) {
    return console.log("Password Error!");
  }

  // save in session
  req.session.userId = users._id;

  setUserActive(true);
  res.redirect(`/dashboard/${users._id}`);
};

const authRegister = async (req, res, next) => {
  const { username, email, password } = req.body;

  if (
    typeof email !== "string" ||
    typeof password !== "string" ||
    typeof username !== "string"
  ) {
    return console.log("Tipe Data Error!");
  }

  const users = await User.insertOne({
    username: username,
    email: email,
    password: password,
  });

  setUserActive(true);
  res.redirect(`/dashboard/${users._id}`);
};

module.exports = { authLogin, authRegister };
