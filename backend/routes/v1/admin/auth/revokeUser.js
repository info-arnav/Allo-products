const express = require("express");
const router = express.Router();

const verifications = require("../../../../controllers/verification.controller.js");
const users = require("../../../../controllers/user.controller.js");

router.post("/", async (req, res) => {
  if (!req.body.code || !req.body.user) {
    return res.status(401).json({
      error: true,
      code: 400,
      message: "Required details are not provided",
    });
  }

  const { user, code } = req.body;

  let data = await verifications.findOne(user);

  if (data.error) {
    return res.status(400).json({
      error: true,
      code: 500,
      message: "Internal server error",
    });
  }

  if (!data.data) {
    return res.json({ error: false, message: "User already deleted." });
  }

  if (data.data.verification_id != code) {
    return res.json({ error: true, message: "Invalid verification code." });
  }

  let userData = await users.findById(user);

  if (userData.error) {
    return res.status(500).json(userData);
  }

  if (userData.data.verified) {
    return res.json({ error: true, message: "User already verified." });
  }

  let delData = await users.delete(user);

  if (delData.error) {
    return res.status(500).json(delData);
  }

  return res.json({ error: false, message: "User revoked successfully." });
});

module.exports = router;
