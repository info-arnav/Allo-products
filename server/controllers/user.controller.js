const db = require("../models");
const generator = require("./components/generator");
const User = db.users;
const { fn, col, where } = db.Sequelize;

exports.findOneWithNumber = async (number) => {
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

exports.findOneWithEmail = async (email) => {
  if (!email) {
    return { error: true, message: "Email is required" };
  }

  const query = {
    where: where(fn("LOWER", col("email")), "=", email.toLowerCase()),
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

exports.createWithNumber = async (number, type = "user") => {
  if (!number) {
    return { error: true, message: "Number is required" };
  }

  const res = await this.findOneWithNumber(number);

  if (!res.error && res.data) {
    return { error: false, data: res.data };
  }

  const user = {
    number: number,
    verified: true,
    type: type,
  };

  return await generator(User, user);
};

exports.createWithEmail = async (email, password, type = "admin") => {
  if (!email) {
    return { error: true, message: "Email is required" };
  }

  const user = {
    email: email,
    password: password,
    verified: false,
    type: type,
  };

  return await generator(User, user);
};

exports.addAddress = async (user_id, address) => {
  if (!user_id || !address) {
    return { error: true, message: "User ID and address are required" };
  }

  try {
    await db.sequelize.query(
      `
      UPDATE users
      SET addresses = array_append(COALESCE(addresses, ARRAY[]::json[]), :address::json)
      WHERE user_id = :userId
      `,
      {
        replacements: {
          userId: user_id,
          address: JSON.stringify(address),
        },
        type: db.Sequelize.QueryTypes.UPDATE,
      }
    );

    return { error: false, message: "Address appended successfully" };
  } catch (err) {
    return {
      error: true,
      message: err.message || "Failed to append address",
    };
  }
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

exports.delete = async (user_id) => {
  if (!user_id) {
    return { error: true, message: "User ID is required" };
  }

  const query = {
    where: {
      user_id: user_id,
    },
  };

  try {
    await User.destroy(query);
    return { error: false, message: "User deleted successfully" };
  } catch (err) {
    return {
      error: true,
      message: err,
    };
  }
};
