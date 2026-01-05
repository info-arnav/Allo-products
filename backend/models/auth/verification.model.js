module.exports = (sequelize, Sequelize) => {
  const Verification = sequelize.define(
    "verification",
    {
      user_id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        unique: true,
      },
      verification_id: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
    },
    { timestamps: true }
  );

  return Verification;
};
