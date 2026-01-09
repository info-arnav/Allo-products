const express = require("express");
const router = express.Router();

const users = require("@/controllers/user.controller.js");

router.post("/", async (req, res) => {
  const { address } = req.body;

  const updatedUser = await users.addAddress(
    req.processedUser.user_id,
    address
  );

  if (updatedUser.error) {
    return res.status(500).json(updatedUser);
  }

  return res.status(200).json({
    error: false,
    data: {
      address: address,
    },
  });
});

module.exports = router;
