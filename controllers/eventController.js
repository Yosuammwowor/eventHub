const Event = require("../models/Event");

const joinEvent = async (req, res) => {
  const User = require("../models/User");

  const { id } = req.params;

  const userId = req.session.userId;

  await Event.findByIdAndUpdate(id, { $push: { participants: userId } });
  await User.findByIdAndUpdate(userId, { $push: { joinedEvents: id } });

  res.redirect(`/dashboard/${userId}`);
};

module.exports = { joinEvent };
