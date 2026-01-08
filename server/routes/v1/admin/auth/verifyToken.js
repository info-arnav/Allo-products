const express = require("express");
const router = express.Router();

const sessions = require("../../../../controllers/session.controller.js");

router.post("/", async (req, res) => {
  if (
    !req.headers.authorization.split(" ")[1] ||
    !req.headers["x-device-fingerprint"]
  ) {
    return res.status(401).json({
      error: true,
      code: 400,
      message: "Required details are not provided",
    });
  }

  const fingerprint = req.headers["x-device-fingerprint"];
  const access_token = req.headers.authorization.split(" ")[1];

  let data = await sessions.validateAccessTokenWithFingerprint(
    access_token,
    fingerprint,
    "admin"
  );

  if (data.error) {
    return res.status(400).json(data);
  }
  return res.status(200).json(data);
});

module.exports = router;
