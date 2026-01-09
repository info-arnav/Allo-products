const db = require("@/models");
const Otp = db.otps;
const { fn, col, where } = db.Sequelize;

exports.create = async (number, otp) => {
  try {
    const user = await Otp.upsert(
      {
        number: number.toLowerCase(),
        code: otp,
        expires_at: new Date(Date.now() + 1000 * 60 * 5),
      },
      {
        returning: true,
        conflictFields: ["number"],
      }
    );

    return {
      error: false,
      data: user,
    };
  } catch (err) {
    return {
      error: true,
      message: err.message || "Some error occurred while upserting the OTP.",
    };
  }
};

exports.find = async (number) => {
  if (!number) {
    res.status(400).send({
      message: "number is required",
    });
    return;
  }

  const query = {
    where: where(fn("LOWER", col("number")), "=", number),
  };

  return await Otp.findOne(query)
    .then((data) => {
      if (data.expires_at < new Date()) {
        return {
          error: true,
          message: "OTP Expired",
        };
      }
      return { error: false, data: data };
    })
    .catch((err) => {
      return {
        error: true,
        message: "Some error occurred.",
      };
    });
};
