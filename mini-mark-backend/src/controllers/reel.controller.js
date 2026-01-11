const CreatorReel = require("../models/CreatorReel");

exports.viewReel = async (req, res) => {
  const reel = await CreatorReel.findById(req.params.id);

  if (!reel) {
    return res.status(404).json({ message: "Reel not found" });
  }

  reel.views += 1;
  reel.earnings += 0.05;

  await reel.save();

  res.json(reel);
};
