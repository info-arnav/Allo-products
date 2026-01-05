const express = require("express");
const router = express.Router();

const users = require("../../../../controllers/user.controller.js");
const verifications = require("../../../../controllers/verification.controller.js");
const mailer = require("../../../../mail/transporter.js");

const verificationTemplate = require("../../../../templates/verification.js");

router.post("/", async (req, res) => {
  let data = req.processedUser;

  let userData = await users.findById(data.user_id);

  if (userData.error) {
    return res.status(500).json(userData);
  }

  let verificationData = await verifications.create(data.user_id);

  if (verificationData.error) {
    return res.status(500).json(verificationData);
  }

  const verificationCode = verificationData.data[0].verification_id;

  const mailResponse = await mailer.sendMail(
    userData.data.email,
    ...verificationTemplate(
      process.env.FRONTEND_URI,
      data.user_id,
      verificationCode
    )
  );

  return res
    .status(mailResponse.error ? 500 : 200)
    .json(
      mailResponse.error
        ? mailResponse
        : { error: false, message: "Verification code sent to email." }
    );
});

module.exports = router;
