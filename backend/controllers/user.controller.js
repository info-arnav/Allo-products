const db = require("../models");
const generator = require("./components/generator");
const User = db.users;
const { fn, col, where } = db.Sequelize;

exports.findOne = async (number) => {
  if (!number) {
    return { error: true, message: "Number is required" };
  }

  const query = {
    where: where(fn("LOWER", col("number")), "=", number),
  };

  return await User.findOne(query)
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      return {
        error: true,
        message:
          err.message || "Some error occurred while searching for the User.",
      };
    });
};

exports.create = async (number) => {
  if (!number) {
    return { error: true, message: "Number is required" };
  }

  const res = await this.findOne(number);

  if (!res.error && res.data) {
    return { error: false, data: res.data };
  }

  const user = {
    number: number,
  };

  return await generator(User, user);
};

exports.findById = async (user_id) => {
  if (!user_id) {
    return { error: true, message: "User Id is required" };
  }

  const query = {
    where: { user_id: user_id },
  };

  return await User.findOne(query)
    .then((data) => {
      return { error: false, data: data };
    })
    .catch((err) => {
      return {
        error: true,
        message:
          err.message || "Some error occurred while searching for the User.",
      };
    });
};

exports.update = async (user_id, changes) => {
  if (!user_id || !changes) {
    return { error: true, message: "User ID and changes are required" };
  }

  const query = {
    where: {
      user_id: user_id,
    },
  };

  try {
    await User.update(changes, query);
    return { error: false, message: "User updated successfully" };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
