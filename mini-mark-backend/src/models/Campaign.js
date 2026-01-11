const mongoose = require("mongoose");

const campaignSchema = new mongoose.Schema({
  brandId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  title: String,
  mediaUrl: String,
  budget: Number,
  status: { type: String, default: "active" },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Campaign", campaignSchema);
