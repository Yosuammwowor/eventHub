const { setUserActive } = require("../middleware/authMiddleware");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  const users = await User.findById(req.params.id);
  res.render("dashboard", { users });
};

const logOut = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session: ", err);
      return res.redirect("/");
    }
    res.clearCookie("connect.sid");
    setUserActive(false);
    res.redirect("/");
  });
};

module.exports = { getDashboard, logOut };
