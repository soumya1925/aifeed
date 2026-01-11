const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/auth.routes");
const feedRoutes = require("./routes/feed.routes");
const campaignRoutes = require("./routes/campaign.routes");
const reelRoutes = require("./routes/reel.routes");
const analyticsRoutes = require("./routes/analytics.routes");

const { protect  } = require("./middleware/auth.middleware");

const app = express();

/* =======================
   Global Middlewares
======================= */
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());

/* =======================
   Public Routes
======================= */
app.get("/", (req, res) => {
  res.send("Mini Mark API running ✅");
});

app.use("/auth", authRoutes);

/* =======================
   Protected Routes (JWT)
======================= */
app.use("/feed", protect , feedRoutes);
app.use("/campaigns", protect , campaignRoutes);
app.use("/reels", protect , reelRoutes);
app.use("/analytics", protect , analyticsRoutes);

/* =======================
   404 Handler
======================= */
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

/* =======================
   Global Error Handler
======================= */
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Internal Server Error"
  });
});

module.exports = app;
