const express = require("express");
const router = express.Router();

const user = require("./user");
const { rootAuthenticate } = require("../../../../auth/authenticate");

router.use("/user", rootAuthenticate, user);

module.exports = router;
