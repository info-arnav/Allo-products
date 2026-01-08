const express = require("express");
const router = express.Router();

const user = require("./user");
const { authenticate } = require("../../../../auth/authenticate");

router.use("/user", authenticate, user);

module.exports = router;
