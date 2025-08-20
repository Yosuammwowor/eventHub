const Event = require("../models/Event");

const getCreateEvent = (req, res) => {
  res.render("events/createEvent");
};

const createEvent = async (req, res) => {
  req.body.createdBy = req.session.userId;

  await Event.insertOne(req.body);

  res.redirect(`/dashboard/${req.session.userId}`);
};

const joinEvent = async (req, res) => {
  const User = require("../models/User");

  const { id } = req.params;

  const userId = req.session.userId;

  await Event.findByIdAndUpdate(id, { $push: { participants: userId } });
  await User.findByIdAndUpdate(userId, { $push: { joinedEvents: id } });

  res.redirect(`/dashboard/${userId}`);
};

const deleteEvent = async (req, res) => {
  await Event.findByIdAndDelete(req.params.id);

  res.redirect(`/dashboard/${req.session.userId}`);
};

const getEditEvent = async (req, res) => {
  const events = await Event.findById(req.params.id);

  res.render("events/editEvent", { events });
};

const editEvent = async (req, res) => {
  await Event.findByIdAndUpdate(req.params.id, req.body);

  res.redirect(`/dashboard/${req.session.userId}`);
};

module.exports = {
  getCreateEvent,
  createEvent,
  joinEvent,
  deleteEvent,
  getEditEvent,
  editEvent,
};
