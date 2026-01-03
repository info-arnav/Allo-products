const sessions = require("../controllers/session.controller.js");

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

  let data = await sessions.validateAccessToken(access_token, deviceId);

  if (data.error || data.expired) {
    return res
      .status(400)
      .json({ error: true, message: "Access Denied", data: data });
  }

  req.processedUser = data;

  next();
}

async function rootAuthenticate(req, res, next) {
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

async function shopAuthenticate(req, res, next) {
  if (!req.processedUser || !req.processedUser.userType) {
    return res.status(401).json({
      error: true,
      code: 401,
      message: "User authentication required",
    });
  }

  if (req.processedUser.userType !== "shop") {
    return res.status(403).json({
      error: true,
      code: 403,
      message: "Access denied. Shop account required.",
    });
  }

  next();
}

module.exports = { authenticate, rootAuthenticate, shopAuthenticate };
