const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  joinedEvents: [
    {
      type: String,
      ref: "Event",
    },
  ],
});

userSchema.pre("findOneAndUpdate", async function () {
  if (this.getUpdate.$set && this.getUpdate().$set.password) {
    await bcrypt.hash(this.getUpdate().$set.password, 12).then((hash) => {
      this.getUpdate().$set.password = hash;
    });
  }
});

userSchema.pre("save", async function () {
  await bcrypt.hash(this.password, 12).then((hash) => {
    this.password = hash;
  });
});

userSchema.methods.comparePassword = async function (originalPass) {
  const result = await bcrypt.compare(originalPass, this.password);
  return result;
};

module.exports = mongoose.model("User", userSchema);
