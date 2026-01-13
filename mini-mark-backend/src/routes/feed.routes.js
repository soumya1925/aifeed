// const router = require("express").Router();
// const { getFeed } = require("../controllers/feed.controller");
// const { protect } = require("../middleware/auth.middleware");

// router.get("/", protect, getFeed);

// module.exports = router;


const router = require("express").Router();
const { 
  getFeed, 
  updateCampaign, 
  updateCreatorReel,
  updateOwnCampaign 
} = require("../controllers/feed.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const Joi = require("joi");

// GET feed for all authenticated users
router.get("/", protect, getFeed);

// PUT update campaign (only for brand owners)
router.put(
  "/campaigns/:id",
  protect,
  restrictTo("brand"),
  updateCampaign
);

// PUT update creator reel (only for brands)
router.put(
  "/reels/:id",
  protect,
  restrictTo("brand"),
  updateCreatorReel
);

// PUT update own campaign (simpler version)
router.put(
  "/my-campaigns/:id",
  protect,
  restrictTo("brand"),
  updateOwnCampaign
);

module.exports = router;
