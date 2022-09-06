const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    rquired: true,
  },
  email: { type: String, rquired: true },
  password: { type: String, rquired: true },
  isVerified: {
    type: Boolean,
    default: false,
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
