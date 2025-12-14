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

module.exports = authenticate;
