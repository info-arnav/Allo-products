"use strict";
require("dotenv").config();
const express = require("express");
const { RateLimiterRedis } = require("rate-limiter-flexible");
const cors = require("cors");
const helmet = require("helmet");
const v1Routes = require("./routes/v1");

const cookieParser = require("cookie-parser");
const fs = require("fs");
const path = require("path");

// WebSocket setup
const Redis = require("ioredis");
const redisConfig = require("./config/redis.config");

// Create the express app
const app = express();

// Multer
const UPLOAD_DIR = path.join(__dirname, "uploads");
fs.mkdirSync(UPLOAD_DIR, { recursive: true });

// Routes and middleware
app.use(
  "/v1/api/meta-data/client-chat",
  cors({
    origin: "*",
    credentials: false,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    preflightContinue: false,
    optionsSuccessStatus: 204,
  })
);
app.use(
  cors({
    origin: [
      "https://digiiq.ai",
      "https://www.digiiq.ai",
      process.env.FRONTEND_URI,
    ],
    credentials: true,
  })
);
app.use(helmet());
app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));
app.use(cookieParser());
app.set("trust proxy", 2);

// Rate Limits
const redis = new Redis(redisConfig);

const rateLimiter = new RateLimiterRedis({
  storeClient: redis,
  keyPrefix: "rl:",
  points: 120,
  duration: 60,
});

app.use(async (req, res, next) => {
  try {
    await rateLimiter.consume(req.ip);
    next();
  } catch (err) {
    res.status(429).json({ error: true, message: "Too many requests" });
  }
});

// Logger
app.use((req, res, next) => {
  console.log(
    `[LOG] [${new Date().toISOString()}] ${req.ip} ${req.method} ${
      req.originalUrl
    }`
  );
  next();
});

// Routes
app.use("/v1", v1Routes);

// Error handlers
app.use(function fourOhFourHandler(req, res) {
  res.redirect(302, "https://www.digiiq.ai/404");
});
app.use(function fiveHundredHandler(err, req, res, next) {
  console.error(err);
  res.redirect(302, "https://www.digiiq.ai/500");
});

app.listen(process.env.PORT, function (err) {
  console.log(`Started at http://localhost:${process.env.PORT}`);
});
