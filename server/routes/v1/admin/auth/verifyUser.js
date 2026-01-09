const express = require("express");
const router = express.Router();

const verifications = require("@/controllers/verification.controller.js");
const users = require("@/controllers/user.controller.js");
const mailer = require("@/mail/transporter.js");

const verificationTemplate = require("@/templates/verification.js");

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

  let userData = await users.findById(user);

  if (userData.error) {
    return res.status(500).json(userData);
  }

  if (userData.data.verified) {
    return res.json({ error: false, message: "User already verified." });
  }

  if (data.data.verification_id == code) {
    users.update(user, { verified: true });
    return res.json({ error: false, message: "User verified successfully." });
  }

  let verificationData = await verifications.create(user);

  if (verificationData.error) {
    return res.status(500).json(verificationData);
  }

  const verificationCode = verificationData.data[0].verification_id;

  await mailer.sendMail(
    userData.data.email,
    ...verificationTemplate(process.env.FRONTEND_URI, user, verificationCode)
  );

  return res
    .status(500)
    .json({ error: true, message: "Verification Failed and Code reset." });
});

module.exports = router;
