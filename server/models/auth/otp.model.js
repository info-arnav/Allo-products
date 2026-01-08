module.exports = (sequelize, Sequelize) => {
  const Otp = sequelize.define(
    "otp",
    {
      number: {
        primaryKey: true,
        type: Sequelize.TEXT,
        unique: true,
        validate: { isNumeric: true },
      },
      code: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 1000 * 60 * 5),
      },
    },
    { timestamps: true }
  );

  return Otp;
};
