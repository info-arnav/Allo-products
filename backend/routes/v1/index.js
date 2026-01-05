const express = require("express");
const router = express.Router();

const userRoutes = require("./user");
// const shopRoutes = require("./shop");
const adminRoutes = require("./admin");

router.use("/user", userRoutes);
// router.use("/shop", shopRoutes);
router.use("/admin", adminRoutes);

module.exports = router;
