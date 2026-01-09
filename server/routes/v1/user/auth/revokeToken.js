const express = require("express");
const router = express.Router();

const sessions = require("@/controllers/session.controller.js");

router.post("/", async (req, res) => {
  if (!req.body.refresh_token || !req.headers["x-device-id"]) {
    return res.status(401).json({
      error: true,
      code: 400,
      message: "Required details are not provided",
    });
  }

  const { refresh_token } = req.body;

  let deviceId = req.headers["x-device-id"];

  let data = await sessions.deleteWithDeviceId(refresh_token, deviceId);

  if (data.error) {
    return res.status(400).json(data);
  }
  return res.status(200).json(data);
});

module.exports = router;
