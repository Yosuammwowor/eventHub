const { setUserActive } = require("../middleware/authMiddleware");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  const users = await User.findById(req.params.id);
  res.render("dashboard", { users });
};

const logOut = (req, res) => {
  // console.log("user logout");
  setUserActive(false);
  res.redirect("/");
};

module.exports = { getDashboard, logOut };
