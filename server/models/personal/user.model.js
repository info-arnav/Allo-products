module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define(
    "user",
    {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      number: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
        validate: { isNumeric: true },
      },
      password: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true,
        unique: true,
        validate: { isEmail: true },
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      first_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      last_name: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      company: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      designation: {
        type: Sequelize.TEXT,
        allowNull: true,
      },
      type: {
        type: Sequelize.TEXT,
        defaultValue: "user",
      },
      verified: { type: Sequelize.BOOLEAN, defaultValue: false },
      addresses: { type: Sequelize.ARRAY(Sequelize.JSON), allowNull: true },
    },
    { timestamps: true }
  );

  return User;
};
