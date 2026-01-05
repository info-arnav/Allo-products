const express = require("express");
const router = express.Router();
const otps = require("../../../../controllers/otp.controller.js");
const sessions = require("../../../../controllers/session.controller.js");
const users = require("../../../../controllers/user.controller.js");

router.post("/", async (req, res) => {
  if (!req.body.number || !req.body.otp || !req.headers["x-device-id"]) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Required credentials not provided",
    });
  }

  const { number, otp } = req.body;
  let deviceId = req.headers["x-device-id"];

  const otpData = await otps.find(number);

  if (otpData.error) {
    return res.status(500).json({
      error: true,
      message: otpData.message,
    });
  }

  if (otpData.data.code != otp) {
    return res.status(400).json({
      error: true,
      message: "Invalid OTP. Please try again.",
    });
  }

  let userResponse = await users.createWithNumber(number);

  if (userResponse.error) {
    return res.status(400).json({
      error: true,
      message: "Some error occurred while creating user.",
    });
  }

  const sessionData = await sessions.createWithNumber(
    number,
    deviceId,
    userResponse.data.user_id
  );

  return res.status(sessionData.error ? 500 : 200).json(sessionData);
});

module.exports = router;
