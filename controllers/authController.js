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

  if (password !== users.password) {
    return console.log("Password Error!");
  }

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

  setUserActive(true);
  res.redirect(`/dashboard/${users._id}`);
};

module.exports = { authLogin, authRegister };
