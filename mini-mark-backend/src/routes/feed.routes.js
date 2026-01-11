const router = require("express").Router();
const { getFeed } = require("../controllers/feed.controller");
const { protect } = require("../middleware/auth.middleware");

router.get("/", protect, getFeed);

module.exports = router;
