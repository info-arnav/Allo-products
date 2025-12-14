const express = require("express");
const router = express.Router();
const otps = require("../../../controllers/otp.controller.js");
const sendMessage = require("../../../message/sendMessage.js");

router.post("/", async (req, res) => {
  if (!req.body.number) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Required credentials not provided",
    });
  }

  const { number } = req.body;

  if (number.length != 10) {
    return res.status(400).json({
      error: true,
      message: "Please enter a valid 10-digit phone number.",
    });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);

  const otpData = await otps.create(number, otp);

  if (otpData.error) {
    return res.status(500).json({
      error: true,
      message: "Could not generate OTP. Please try again.",
    });
  }

  try {
    await sendMessage(
      `+91${number}`,
      `<#> Please use OTP ${otp} to login to your Allo account and shop from our wide array of products. OTP valid for 5 minutes`
    );
  } catch (err) {
    return res.status(500).json({
      error: true,
      message: "Could not send OTP. Please try again.",
    });
  }

  return res
    .status(200)
    .json({ error: false, message: "OTP sent successfully" });
});

module.exports = router;
