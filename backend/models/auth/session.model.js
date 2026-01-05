module.exports = (sequelize, Sequelize) => {
  const Session = sequelize.define(
    "session",
    {
      number: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: { isNumeric: true },
      },
      email: {
        type: Sequelize.TEXT,
        allowNull: true,
        validate: { isEmail: true },
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
        allowNull: true,
      },
      fingerprint: {
        type: Sequelize.TEXT,
        allowNull: true,
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
