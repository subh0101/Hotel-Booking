const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: true,
  },
  userEmail: {
    type: String,
    require: true,
  },
  date: {
    type: String,
    require: true,
  },
  startTime: {
    type: String,
    require: true,
  },
  endTime: {
    type: String,
    require: true,
  },
  roomType: {
    type: String,
    require: true,
  },
  roomNumber: {
    type: Number,
    required: true,
  },
  price : {
    type : String
  }
});

module.exports = mongoose.model("user", userSchema);
