const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  logging: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./personal/user.model.js")(sequelize, Sequelize);
db.otps = require("./auth/otp.model.js")(sequelize, Sequelize);
db.sessions = require("./auth/session.model.js")(sequelize, Sequelize);
db.verifications = require("./auth/verification.model.js")(
  sequelize,
  Sequelize
);

require("./associations")(db);

module.exports = db;
