const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  isOnline: { type: Boolean, default: false },
  socketId: String
});

module.exports = mongoose.model("User", userSchema);
