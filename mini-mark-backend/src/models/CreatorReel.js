const mongoose = require("mongoose");

const creatorReelSchema = new mongoose.Schema({
  creatorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  mediaUrl: String,
  views: { type: Number, default: 0 },
  earnings: { type: Number, default: 0 }
});

module.exports = mongoose.model("CreatorReel", creatorReelSchema);
