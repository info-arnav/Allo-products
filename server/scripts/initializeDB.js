"use strict";
require("dotenv").config();
const db = require("@/models");

const syncDb = async () => {
  try {
    await db.sequelize.sync({ force: true });
    console.log("Database synchronized successfully.");
    process.exit(0);
  } catch (err) {
    console.error("Failed to sync db:", err.message);
    process.exit(1);
  }
};

syncDb();
