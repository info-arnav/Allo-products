const twillioConifg = require("../config/twillio.config.js");
const twilio = require("twilio");

const tw = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = tw;
