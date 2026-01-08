const express = require("express");
const router = express.Router();

const getUserInfo = require("./getUserInfo");
const saveAddress = require("./saveAddress");

router.use("/get-user-info", getUserInfo);
router.use("/save-address", saveAddress);

module.exports = router;
