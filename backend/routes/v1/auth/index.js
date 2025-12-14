const express = require("express");
const router = express.Router();

const requestOtp = require("./requestOtp");
const verifyOtp = require("./verifyOtp");
const revokeToken = require("./revokeToken");
const updateToken = require("./updateToken");

router.use("/request-otp", requestOtp);
router.use("/verify-otp", verifyOtp);
router.use("/revoke-token", revokeToken);
router.use("/update-token", updateToken);

module.exports = router;
