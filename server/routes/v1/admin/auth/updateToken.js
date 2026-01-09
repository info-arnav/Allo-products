const express = require("express");
const router = express.Router();

const sessions = require("@/controllers/session.controller.js");

router.post("/", async (req, res) => {
  if (
    !req.cookies.refresh_token ||
    !req.headers["x-device-fingerprint-old"] ||
    !req.headers["x-device-fingerprint"]
  ) {
    return res.status(401).json({
      error: true,
      code: 400,
      message: "Required details are not provided",
    });
  }

  const { refresh_token } = req.cookies;
  const fingerprint = req.headers["x-device-fingerprint"];
  const oldFingerprint = req.headers["x-device-fingerprint-old"];

  let data = await sessions.updateAccessTokenWithFingerPrint(
    refresh_token,
    fingerprint,
    oldFingerprint,
    "admin"
  );

  if (data.error) {
    return res.status(400).json(data);
  }
  res.cookie("refresh_token", data.data.refresh_token, {
    httpOnly: true,
    secure: process.env.PROD == "true",
    sameSite: "Strict",
    maxAge: 365 * 24 * 60 * 60 * 1000,
  });
  delete data.data.refresh_token;

  data.data.old_refresh_token = refresh_token;

  return res.status(200).json(data);
});

module.exports = router;
