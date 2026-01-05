const express = require("express");
const router = express.Router();

const users = require("../../../../controllers/user.controller.js");

router.post("/", async (req, res) => {
  let user = await users.findById(req.processedUser.user_id);

  if (user.error) {
    return res.status(500).json(user);
  }

  const { first_name, last_name, number, addresses } = user.data;

  return res.status(200).json({
    error: false,
    data: {
      first_name,
      last_name,
      number,
      addresses,
    },
  });
});

module.exports = router;
