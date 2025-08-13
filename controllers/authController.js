const User = require("../models/User");

const authLogin = async (req, res, next) => {
  const { email, password } = req.body;

  if (typeof email !== "string" || typeof password !== "string") {
    return console.log("Tipe Data Error!");
  }

  const users = await User.findOne({ email: email });

  if (users.length === 0) {
    return console.log("User Error!");
  }

  if (password !== users.password) {
    return console.log("Password Error!");
  }

  console.log("Semua aman!");
};

module.exports = { authLogin };
