const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

const users = require("../../../../controllers/user.controller.js");
const verifications = require("../../../../controllers/verification.controller.js");
const mailer = require("../../../../mail/transporter.js");
const sessions = require("../../../../controllers/session.controller.js");

const verificationTemplate = require("../../../../templates/verification.js");

router.post("/", async (req, res) => {
  if (
    (!req.body.email, !req.body.password, !req.headers["x-device-fingerprint"])
  ) {
    return res.status(401).json({
      error: true,
      code: 400,
      message: "Required credentials not provided",
    });
  }

  const { email, password } = req.body;
  const fingerprint = req.headers["x-device-fingerprint"];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: "Invalid email format",
    });
  }

  if (!email.endsWith("@allo.co.in")) {
    return res.status(400).json({
      error: true,
      code: 400,
      message: "Only @allo.co.in email addresses are allowed",
    });
  }

  let data = await users.findOneWithEmail(email);
  if (data.error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: "Internal server error",
    });
  } else if (data.data != null) {
    return res
      .status(400)
      .json({ error: true, message: "User already exists", code: 401 });
  }

  let hashedPassword;

  try {
    hashedPassword = await bcrypt.hash(password, 10);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }

  let userResponse = await users.createWithEmail(email, hashedPassword);

  if (userResponse.error) {
    return res.status(500).json(userResponse);
  }

  let verificationData = await verifications.create(userResponse.data.user_id);

  if (verificationData.error) {
    return res.status(500).json(verificationData);
  }

  const verificationCode = verificationData.data[0].verification_id;

  const mailResponse = await mailer.sendMail(
    email,
    ...verificationTemplate(
      process.env.FRONTEND_URI,
      userResponse.data.user_id,
      verificationCode
    )
  );

  if (mailResponse.error) {
    return res.status(500).json(mailResponse);
  }

  const sessionData = await sessions.createWithEmail(
    email,
    fingerprint,
    userResponse.data.user_id,
    "admin"
  );

  if (!sessionData.error) {
    res.cookie("refresh_token", sessionData.data.refresh_token, {
      httpOnly: true,
      secure: process.env.PROD == "true",
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    delete sessionData.data.refresh_token;
  }

  return res.status(sessionData.error ? 500 : 200).json(sessionData);
});

module.exports = router;
