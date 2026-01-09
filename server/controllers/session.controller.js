const db = require("@/models");
const generator = require("./components/generator");
const jwt = require("jsonwebtoken");
const getSecret = require("./components/getSecret");
const Session = db.sessions;
const { col, where, Op } = db.Sequelize;

exports.createWithNumber = async (
  number,
  device_id,
  user_id,
  scope = "user"
) => {
  if (!number || !device_id || !user_id) {
    return { error: true, message: "Credentials are required" };
  }

  const session = {
    number: number,
    device_id: device_id,
    user_id: user_id,
    scope: scope,
  };

  const data = await generator(Session, session);
  const raw = data.data?.get?.({ plain: true }) || data.data;
  delete raw.device_id;

  raw.access_token = jwt.sign(
    { user_id: user_id, device_id: device_id, scope: scope },
    getSecret(scope),
    { expiresIn: "15m" }
  );

  data.data = raw;

  return data;
};

exports.createWithEmail = async (
  email,
  fingerprint,
  user_id,
  scope = "user"
) => {
  if (!email || !fingerprint || !user_id) {
    return { error: true, message: "Credentials are required" };
  }

  const session = {
    email: email,
    fingerprint: fingerprint,
    user_id: user_id,
    scope: scope,
  };

  const data = await generator(Session, session);
  const raw = data.data?.get?.({ plain: true }) || data.data;

  if (!raw || !raw.fingerprint) {
    return {
      error: true,
      message: "Some error occurred while creating session",
    };
  }

  delete raw.fingerprint;

  raw.access_token = jwt.sign(
    { user_id: user_id, fingerprint: fingerprint, scope: scope },
    getSecret(scope),
    { expiresIn: "15m" }
  );

  data.data = raw;

  return data;
};

exports.deleteWithDeviceId = async (refresh_token, device_id) => {
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

exports.deleteWithFingerPrint = async (refresh_token, fingerprint) => {
  if (!refresh_token || !fingerprint) {
    return { error: true, message: "Email and Fingerprint are required" };
  }

  const query = {
    where: {
      [Op.and]: [
        where(col("refresh_token"), "=", refresh_token),
        where(col("fingerprint"), "=", fingerprint),
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

exports.validateAccessTokenWithFingerprint = async (
  access_token,
  fingerprint,
  scope = "user"
) => {
  if (!access_token || !fingerprint) {
    return { error: true, message: "Token or fingerprint missing" };
  }

  try {
    const decoded = jwt.verify(access_token, getSecret(scope));

    if (decoded.fingerprint !== fingerprint) {
      return {
        error: false,
        exists: true,
        expired: true,
        message: "Fingerprint mismatch",
      };
    }

    if (decoded.scope !== scope) {
      return {
        error: false,
        exists: true,
        expired: true,
        message: "Scope mismatch",
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

exports.validateAccessTokenWithDeviceId = async (
  access_token,
  device_id,
  scope = "user"
) => {
  if (!access_token || !device_id) {
    return { error: true, message: "Token or device ID missing" };
  }

  try {
    const decoded = jwt.verify(access_token, getSecret(scope));

    if (decoded.device_id !== device_id) {
      return {
        error: false,
        exists: true,
        expired: true,
        message: "Device ID mismatch",
      };
    }

    if (decoded.scope !== scope) {
      return {
        error: false,
        exists: true,
        expired: true,
        message: "Scope mismatch",
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

exports.updateAccessTokenWithDeviceId = async (
  refresh_token,
  device_id,
  scope = "user"
) => {
  if (!refresh_token || !device_id) {
    return { error: true, message: "Some details are missing" };
  }

  const query = {
    where: {
      [Op.and]: [
        where(col("refresh_token"), "=", refresh_token),
        where(col("device_id"), "=", device_id),
        where(col("scope"), "=", scope),
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

      return this.createWithNumber(
        data.number,
        device_id,
        data.user_id,
        data.scope
      );
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message || "Some error occurred while updating the Token.",
      };
    });
};

exports.updateAccessTokenWithFingerPrint = async (
  refresh_token,
  fingerprint,
  oldFingerprint,
  scope = "user"
) => {
  if (!refresh_token || !fingerprint || !oldFingerprint) {
    return { error: true, message: "Some details are missing" };
  }

  const query = {
    where: {
      [Op.and]: [
        where(col("refresh_token"), "=", refresh_token),
        where(col("fingerprint"), "=", oldFingerprint),
        where(col("scope"), "=", scope),
      ],
    },
  };

  return await Session.findOne(query)
    .then(async (data) => {
      if (data == null) {
        return { error: true, exists: false };
      } else if (data.refresh_token_expires_at < new Date()) {
        this.delete(refresh_token, oldFingerprint);
        return { error: true, exists: true, expired: true };
      }

      return this.createWithEmail(
        data.email,
        fingerprint,
        data.user_id,
        data.scope
      );
    })
    .catch((err) => {
      return {
        error: true,
        message: err.message || "Some error occurred while updating the Token.",
      };
    });
};
