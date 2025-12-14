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
        allowNull: false,
        unique: true,
        validate: { isNumeric: true },
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
      addresses: { type: Sequelize.ARRAY(Sequelize.JSON), allowNull: true },
    },
    { timestamps: true }
  );

  return User;
};
