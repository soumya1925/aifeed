// const Campaign = require("../models/Campaign");
// const CreatorReel = require("../models/CreatorReel");

// exports.getFeed = async (req, res) => {
//   const { role } = req.user;

//   const campaigns = await Campaign.find().lean();
//   const reels = await CreatorReel.find().lean();

//   let feed = [...campaigns, ...reels];

//   // 🔒 Consumers cannot see views & earnings
//   if (role === "consumer") {
//     feed = feed.map(item => {
//       const { views, earnings, ...safeItem } = item;
//       return safeItem;
//     });
//   }

//   res.json(feed);
// };

const Campaign = require("../models/Campaign");
const CreatorReel = require("../models/CreatorReel");

exports.getFeed = async (req, res) => {
  const { role, userId } = req.user;

  const campaigns = await Campaign.find().lean();
  const reels = await CreatorReel.find().lean();

  let feed = [...campaigns, ...reels];

  // 🔒 Apply role-based filtering
  if (role === "consumer") {
    // Consumers cannot see views & earnings
    feed = feed.map(item => {
      const { views, earnings, ...safeItem } = item;
      return safeItem;
    });
  }

  res.json(feed);
};

// New endpoint for updating campaign (only for brand owners)
exports.updateCampaign = async (req, res) => {
  try {
    const { role, userId } = req.user;
    const { id } = req.params;
    const { budget, status } = req.body;

    // Only brands can update campaigns
    if (role !== "brand") {
      return res.status(403).json({ 
        message: "Only brand accounts can update campaigns" 
      });
    }

    const campaign = await Campaign.findById(id);
    
    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    // Check if this brand owns the campaign
    if (campaign.brandId.toString() !== userId) {
      return res.status(403).json({ 
        message: "You can only update your own campaigns" 
      });
    }

    // Validate input
    if (budget !== undefined) {
      if (budget < 0) {
        return res.status(400).json({ 
          message: "Budget cannot be negative" 
        });
      }
      campaign.budget = budget;
    }

    if (status !== undefined) {
      const validStatuses = ["active", "paused", "completed", "draft"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` 
        });
      }
      campaign.status = status;
    }

    await campaign.save();

    res.json({
      message: "Campaign updated successfully",
      campaign
    });
  } catch (error) {
    console.error("Update campaign error:", error);
    res.status(500).json({ message: "Failed to update campaign" });
  }
};

// New endpoint for updating creator reel views/earnings (only for brands)
exports.updateCreatorReel = async (req, res) => {
  try {
    const { role } = req.user;
    const { id } = req.params;
    const { views, earnings } = req.body;

    // Only brands can update creator reels
    if (role !== "brand") {
      return res.status(403).json({ 
        message: "Only brand accounts can update creator reels" 
      });
    }

    const reel = await CreatorReel.findById(id);
    
    if (!reel) {
      return res.status(404).json({ message: "Reel not found" });
    }

    // Validate input
    if (views !== undefined) {
      if (views < 0) {
        return res.status(400).json({ 
          message: "Views cannot be negative" 
        });
      }
      reel.views = views;
    }

    if (earnings !== undefined) {
      if (earnings < 0) {
        return res.status(400).json({ 
          message: "Earnings cannot be negative" 
        });
      }
      reel.earnings = earnings;
    }

    await reel.save();

    res.json({
      message: "Creator reel updated successfully",
      reel
    });
  } catch (error) {
    console.error("Update creator reel error:", error);
    res.status(500).json({ message: "Failed to update creator reel" });
  }
};

// New endpoint for brand to update their own campaign status/budget
exports.updateOwnCampaign = async (req, res) => {
  try {
    const { role, userId } = req.user;
    const { id } = req.params;
    const { budget, status } = req.body;

    // Only brands can update campaigns
    if (role !== "brand") {
      return res.status(403).json({ 
        message: "Only brand accounts can update campaigns" 
      });
    }

    const campaign = await Campaign.findOne({
      _id: id,
      brandId: userId // Ensure the campaign belongs to this brand
    });
    
    if (!campaign) {
      return res.status(404).json({ 
        message: "Campaign not found or you don't have permission to update it" 
      });
    }

    // Validate and update fields
    if (budget !== undefined) {
      if (budget < 0) {
        return res.status(400).json({ 
          message: "Budget cannot be negative" 
        });
      }
      campaign.budget = budget;
    }

    if (status !== undefined) {
      const validStatuses = ["active", "paused", "completed", "draft"];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ 
          message: `Invalid status. Must be one of: ${validStatuses.join(", ")}` 
        });
      }
      campaign.status = status;
    }

    await campaign.save();

    res.json({
      message: "Campaign updated successfully",
      campaign
    });
  } catch (error) {
    console.error("Update own campaign error:", error);
    res.status(500).json({ message: "Failed to update campaign" });
  }
};
