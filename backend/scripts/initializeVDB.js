"use strict";
require("dotenv").config();
const pcConfig = require("../config/pc.config.js");
const vdb = require("../vdb/index.js");

const createIndex = async () => {
  try {
    const index = await vdb.pc.createIndexForModel({
      name: process.env.PINECONE_INDEX,
      cloud: pcConfig.cloud,
      region: pcConfig.region,
      embed: {
        model: pcConfig.embed.model,
        fieldMap: pcConfig.embed.fieldMap,
      },
      waitUntilReady: true,
    });
    console.log({ error: false, data: "Vector DB initialized" });
  } catch (err) {
    const errorMessage = err.message || JSON.stringify(err);
    if (
      errorMessage.includes("already exists") ||
      errorMessage.includes("409")
    ) {
      console.log("Index already created. Ignoring Conflict Error.");
    } else {
      console.error({ error: true, message: err });
    }
  }
};

createIndex();
