const mongoose = require("mongoose");

const accessKeySchema = mongoose.Schema({
  key: {
    type: String,
    required: true,
  },
  condition: {
    type: String,
    required: true,
    enum: ["Active", "Expired", "Revoked"],
    default: "Active",
  },
  procurementDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  expiryDate: {
    type: Date,
    required: true,
    default: new Date(new Date().getTime() + 15 * 24 * 60 * 60 * 1000),
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

module.exports = mongoose.model("AccessKey", accessKeySchema);
