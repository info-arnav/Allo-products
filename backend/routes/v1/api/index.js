const express = require("express");
const router = express.Router();

const getUserInfo = require("./getUserInfo");

const authenticate = require("../../../auth/authenticate");

router.use("/get-user-info", authenticate, getUserInfo);

module.exports = router;
