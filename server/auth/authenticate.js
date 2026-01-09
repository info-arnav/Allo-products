const sessions = require("@/controllers/session.controller.js");
const users = require("@/controllers/user.controller.js");

async function authenticate(req, res, next) {
  if (!req.headers.authorization.split(" ")[1] || !req.headers["x-device-id"]) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Required credentials not provided",
    });
  }

  let deviceId = req.headers["x-device-id"];
  let access_token = req.headers.authorization.split(" ")[1];

  let data = await sessions.validateAccessTokenWithDeviceId(
    access_token,
    deviceId,
    "user"
  );

  if (data.error || data.expired) {
    return res
      .status(400)
      .json({ error: true, message: "Access Denied", data: data });
  }

  req.processedUser = data;

  next();
}

async function rootAuthenticate(req, res, next) {
  if (
    !req.headers.authorization.split(" ")[1] ||
    !req.headers["x-device-fingerprint"]
  ) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Required credentials not provided",
    });
  }

  let fingerprint = req.headers["x-device-fingerprint"];
  let access_token = req.headers.authorization.split(" ")[1];

  let data = await sessions.validateAccessTokenWithFingerprint(
    access_token,
    fingerprint,
    "admin"
  );

  if (data.error || data.expired) {
    return res
      .status(400)
      .json({ error: true, message: "Access Denied", data: data });
  }

  const userData = await users.findById(data.user_id);

  if (userData.error) {
    return res
      .status(500)
      .json({ error: true, message: "User fetch failed", data: userData });
  }

  req.processedUser = userData.data;

  if (!req.processedUser || !req.processedUser.email) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "User authentication required",
    });
  }

  const email = req.processedUser.email;

  if (!email.endsWith("@allo.co.in")) {
    return res.status(403).json({
      error: true,
      code: 403,
      message: "Access denied. Root access required.",
    });
  }

  next();
}

async function verified(req, res, next) {
  if (!req.processedUser.verified) {
    return res.status(403).json({
      error: true,
      code: 403,
      message: "User email not verified",
    });
  }

  next();
}

async function shopAuthenticate(req, res, next) {
  if (!req.headers.authorization.split(" ")[1] || !req.headers["x-device-id"]) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Required credentials not provided",
    });
  }

  let deviceId = req.headers["x-device-id"];
  let access_token = req.headers.authorization.split(" ")[1];

  let data = await sessions.validateAccessTokenWithDeviceId(
    access_token,
    deviceId,
    "shop"
  );

  if (data.error || data.expired) {
    return res
      .status(400)
      .json({ error: true, message: "Access Denied", data: data });
  }

  req.processedUser = data;

  if (!req.processedUser.userType || req.processedUser.userType !== "shop") {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "Shop authentication required",
    });
  }

  next();
}

module.exports = { authenticate, rootAuthenticate, shopAuthenticate, verified };
