module.exports = (db) => {
  const { users, sessions } = db;

  users.hasMany(sessions, { foreignKey: "user_id" });
  sessions.belongsTo(users, { foreignKey: "user_id" });
};
