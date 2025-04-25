const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type:String,
    require: true,
  },
  role: {
    default: "user",
    type: String,
  },
});

const userModel = mongoose.model("userData", userSchema);

module.exports = userModel;
