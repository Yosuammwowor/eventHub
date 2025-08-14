let userStatus = false;

const getUserStatus = () => {
  return userStatus;
};

const setUserActive = (status) => {
  userStatus = status;
};

const auth = (req, res, next) => {
  const userStatus = getUserStatus();
  if (!userStatus) {
    return console.log("User unidentified!");
  }

  next();
};

module.exports = { getUserStatus, setUserActive, auth };
