const express = require("express");
const router = express.Router();

const getUserInfo = require("./getUserInfo");
const { rootAuthenticate } = require("../../../../auth/authenticate");

router.use("/get-user-info", rootAuthenticate, getUserInfo);

module.exports = router;
