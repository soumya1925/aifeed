const Campaign = require("../models/Campaign");

exports.deployCampaign = async (req, res) => {
  const campaign = await Campaign.findById(req.params.id);

  if (!campaign) {
    return res.status(404).json({ message: "Campaign not found" });
  }

  if (campaign.budget <= 0) {
    return res.status(400).json({ message: "Insufficient budget" });
  }

  campaign.budget -= 100;

  if (campaign.budget <= 0) {
    campaign.status = "completed";
  }

  await campaign.save();

  res.json({
    message: "Campaign deployed",
    remainingBudget: campaign.budget
  });
};
