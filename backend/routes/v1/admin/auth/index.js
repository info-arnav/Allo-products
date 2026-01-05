const express = require("express");
const router = express.Router();

const signIn = require("./signIn");
const signUp = require("./signUp");
const updateToken = require("./updateToken");
const revokeToken = require("./revokeToken");
const revokeTokenBody = require("./revokeTokenBody");
const verifyUser = require("./verifyUser");
const revokeUser = require("./revokeUser");
const sendVerification = require("./sendVerification");
const verifyToken = require("./verifyToken");
const { rootAuthenticate } = require("../../../../auth/authenticate");

router.use("/sign-in", signIn);
router.use("/sign-up", signUp);
router.use("/update-token", updateToken);
router.use("/revoke-token", revokeToken);
router.use("/revoke-token-body", revokeTokenBody);
router.use("/verify-user", verifyUser);
router.use("/revoke-user", revokeUser);
router.use("/send-verification", rootAuthenticate, sendVerification);
router.use("/verify-token", verifyToken);

module.exports = router;
