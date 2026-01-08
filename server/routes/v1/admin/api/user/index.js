const express = require("express");
const router = express.Router();

const getUserInfo = require("./getUserInfo");

router.use("/get-user-info", getUserInfo);

module.exports = router;
