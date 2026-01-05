const db = require("../models");

const Verification = db.verifications;

exports.create = async (user_id) => {
  if (!user_id) {
    return { error: true, message: "User ID is required." };
  }

  try {
    const verification_id = Array.from({ length: 128 }, () =>
      Math.random().toString(36).charAt(2)
    ).join("");

    const verification_details = await Verification.upsert(
      {
        user_id: user_id,
        verification_id: verification_id,
      },
      {
        returning: true,
        conflictFields: ["user_id"],
      }
    );

    return {
      error: false,
      data: verification_details,
    };
  } catch (err) {
    return {
      error: true,
      message:
        err.message ||
        "Some error occurred while upserting the Verification code.",
    };
  }
};

exports.findOne = async (user_id) => {
  if (!user_id) {
    return { error: true, message: "User ID is required" };
  }

  const query = {
    where: {
      user_id: user_id,
    },
  };

  return await Verification.findOne(query)
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      return {
        error: true,
        message:
          err.message ||
          "Some error occurred while searching for the Verification Code.",
      };
    });
};
