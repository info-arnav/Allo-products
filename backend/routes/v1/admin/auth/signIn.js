const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

const users = require("../../../../controllers/user.controller.js");
const sessions = require("../../../../controllers/session.controller.js");

router.post("/", async (req, res) => {
  if (
    !req.body.email ||
    !req.body.password ||
    !req.headers["x-device-fingerprint"]
  ) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Required credentials not provided",
    });
  }

  const { email, password } = req.body;
  let fingerprint = req.headers["x-device-fingerprint"];
  let data = await users.findOneWithEmail(email);

  if (data.error) {
    return res.status(500).json({
      error: true,
      code: 500,
      message: "Internal server error",
    });
  } else if (data.data == null) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "No user found with this email",
    });
  }

  let matched;

  try {
    matched = await bcrypt.compare(password, data.data.password);
  } catch (err) {
    return res.status(500).json({ error: true, message: err.message });
  }

  if (!matched) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Unauthorized: Incorrect Password",
    });
  }

  const sessionData = await sessions.createWithEmail(
    email,
    fingerprint,
    data.data.user_id
  );

  if (!sessionData.error) {
    res.cookie("refresh_token", sessionData.data.refresh_token, {
      httpOnly: true,
      secure: process.env.PROD == "true",
      sameSite: "Strict",
      maxAge: 365 * 24 * 60 * 60 * 1000,
    });
    delete sessionData.data.refresh_token;
  }

  return res.status(sessionData.error ? 500 : 200).json(sessionData);
});

module.exports = router;
