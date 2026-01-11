const router = require("express").Router();
const { deployCampaign } = require("../controllers/campaign.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const { validate, objectId } = require("../validations/common.validator");
const Joi = require("joi");

router.post(
  "/:id/deploy",
  protect,
  restrictTo("brand"),
  validate(Joi.object({ id: objectId }), "params"),
  deployCampaign
);

module.exports = router;
