module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define(
    "session",
    {
      number: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: { isNumeric: true },
      },
      user_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      refresh_token: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        unique: true,
      },
      device_id: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      refresh_token_expires_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: () => new Date(Date.now() + 1000 * 60 * 60 * 24 * 365),
      },
    },
    { timestamps: true }
  );

  return Session;
};
