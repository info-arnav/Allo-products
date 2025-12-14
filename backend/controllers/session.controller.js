const db = require("../models");
const generator = require("./components/generator");
const jwt = require("jsonwebtoken");
const Session = db.sessions;
const { col, where, Op } = db.Sequelize;

exports.create = async (number, device_id, user_id) => {
  if (!number || !device_id || !user_id) {
    return { error: true, message: "Credentials are required" };
  }

  const session = {
    number: number,
    device_id: device_id,
    user_id: user_id,
  };

  const data = await generator(Session, session);
  const raw = data.data?.get?.({ plain: true }) || data.data;
  delete raw.device_id;

  raw.access_token = jwt.sign(
    { user_id: user_id, device_id: device_id },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  data.data = raw;

  return data;
};

exports.delete = async (refresh_token, device_id) => {
  if (!refresh_token || !device_id) {
    return { error: true, message: "Number and Device ID are required" };
  }

  const query = {
    where: {
      [Op.and]: [
        where(col("refresh_token"), "=", refresh_token),
        where(col("device_id"), "=", device_id),
      ],
    },
  };

  return await Session.destroy(query)
    .then(() => {
      return { error: false };
    })
    .catch((err) => {
      return { error: true, message: err };
    });
};

exports.validateAccessToken = async (access_token, device_id) => {
  if (!access_token || !device_id) {
    return { error: true, message: "Token or device ID missing" };
  }

  try {
    const decoded = jwt.verify(access_token, process.env.ACCESS_SECRET);

    if (decoded.device_id !== device_id) {
      return {
        error: false,
        exists: true,
        expired: true,
        message: "Device ID mismatch",
      };
    }

    return {
      error: false,
      exists: true,
      expired: false,
      user_id: decoded.user_id,
    };
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      return { error: false, exists: true, expired: true };
    } else {
      return {
        error: true,
        message: "Invalid token",
        exists: false,
      };
    }
  }
};

exports.updateAccessToken = async (refresh_token, device_id) => {
  if (!refresh_token || !device_id) {
    return { error: true, message: "Some details are missing" };
  }

  const query = {
    where: {
      [Op.and]: [
        where(col("refresh_token"), "=", refresh_token),
        where(col("device_id"), "=", device_id),
      ],
    },
  };

  return await Session.findOne(query)
    .then(async (data) => {
      if (data == null) {
        return { error: true, exists: false };
      } else if (data.refresh_token_expires_at < new Date()) {
        this.delete(refresh_token, device_id);
        return { error: true, exists: true, expired: true };
      }

      return this.create(data.number, device_id, data.user_id);
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message || "Some error occurred while updating the Token.",
      };
    });
};
