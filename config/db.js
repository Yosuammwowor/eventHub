const mongoose = require("mongoose");

module.exports = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("Connection to database success!!!");
    })
    .catch((err) => {
      console.log(err);
    });

  return mongoose;
};
