const mongoose = require("mongoose");

const otpSchema = mongoose.Schema({
  otpKey: {
    type: String,
    required: [true, "OTP is required"],
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    email: {
      type: String,
    },
  },
});

module.exports = mongoose.model("OTP", otpSchema);
