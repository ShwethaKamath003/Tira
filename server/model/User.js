const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    phone: String,
    email: String,
    password: String
  },
  { collection: "users" }
);
UserSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model("User", UserSchema);