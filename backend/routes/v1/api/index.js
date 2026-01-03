const express = require("express");
const router = express.Router();

const getUserInfo = require("./getUserInfo");
const saveAddress = require("./saveAddress");

const { authenticate } = require("../../../auth/authenticate");

router.use("/get-user-info", authenticate, getUserInfo);
router.use("/save-address", authenticate, saveAddress);

module.exports = router;
