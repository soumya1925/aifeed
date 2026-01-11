const router = require("express").Router();
const { viewReel } = require("../controllers/reel.controller");
const { protect, restrictTo } = require("../middleware/auth.middleware");
const { validate, objectId } = require("../validations/common.validator");
const Joi = require("joi");

router.post(
  "/:id/view",
  protect,
  restrictTo("brand"),
  validate(Joi.object({ id: objectId }), "params"),
  viewReel
);

module.exports = router;
