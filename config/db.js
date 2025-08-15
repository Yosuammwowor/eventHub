const mongoose = require("mongoose");

const connectDb = async () => {
  const URI = process.env.MONGO_URI;
  mongoose
    .connect(URI)
    .then(() => {
      console.log("Connection to database success!!!");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
