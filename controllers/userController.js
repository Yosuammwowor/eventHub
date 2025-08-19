const { setUserActive } = require("../middleware/authMiddleware");
const User = require("../models/User");

const getDashboard = async (req, res) => {
  const users = await User.findById(req.params.id).populate("joinedEvents");
  let eventData;

  const Event = require("../models/Event");
  await Event.find()
    .populate("createdBy")
    .then((res) => {
      for (let event of res) {
        if (event.createdBy._id == req.params.id) {
          eventData = event;
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });

  if (!eventData) {
    res.render("dashboard", { users, events: undefined });
  } else {
    res.render("dashboard", { users, events: eventData });
  }
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
