module.exports = (db) => {
  const { users, sessions, verifications } = db;

  users.hasMany(sessions, { foreignKey: "user_id" });
  sessions.belongsTo(users, { foreignKey: "user_id" });

  users.hasMany(verifications, { foreignKey: "user_id" });
  verifications.belongsTo(users, { foreignKey: "user_id" });
};
