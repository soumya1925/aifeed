const router = require("express").Router();
const {
  getCreatorsWithReels,
  getBrandsWithCampaigns
} = require("../services/analytics.service");

router.get("/creators", async (req, res) => {
  res.json(await getCreatorsWithReels());
});

router.get("/brands", async (req, res) => {
  res.json(await getBrandsWithCampaigns());
});

module.exports = router;
