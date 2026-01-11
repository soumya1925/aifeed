const User = require("../models/User");

exports.getCreatorsWithReels = async () => {
  return User.aggregate([
    { $match: { role: "creator" } },
    {
      $lookup: {
        from: "creatorreels",
        localField: "_id",
        foreignField: "creatorId",
        as: "reels"
      }
    },
    {
      $project: {
        name: 1,
        email: 1,
        reelCount: { $size: "$reels" },
        totalViews: { $sum: "$reels.views" },
        totalEarnings: { $sum: "$reels.earnings" }
      }
    },
    { $sort: { totalEarnings: -1 } }
  ]);
};

exports.getBrandsWithCampaigns = async () => {
  return User.aggregate([
    { $match: { role: "brand" } },
    {
      $lookup: {
        from: "campaigns",
        localField: "_id",
        foreignField: "brandId",
        as: "campaigns"
      }
    },
    {
      $project: {
        name: 1,
        email: 1,
        campaignCount: { $size: "$campaigns" },
        activeCampaigns: {
          $size: {
            $filter: {
              input: "$campaigns",
              as: "c",
              cond: { $eq: ["$$c.status", "active"] }
            }
          }
        },
        totalBudget: { $sum: "$campaigns.budget" }
      }
    }
  ]);
};
