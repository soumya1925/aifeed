const Campaign = require("../models/Campaign");
const CreatorReel = require("../models/CreatorReel");

exports.getFeed = async (req, res) => {
  const { role } = req.user;

  const campaigns = await Campaign.find().lean();
  const reels = await CreatorReel.find().lean();

  let feed = [...campaigns, ...reels];

  // 🔒 Consumers cannot see views & earnings
  if (role === "consumer") {
    feed = feed.map(item => {
      const { views, earnings, ...safeItem } = item;
      return safeItem;
    });
  }

  res.json(feed);
};
