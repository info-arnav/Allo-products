const tw = require("@/config/twillio.config.js");

const sendMessage = async (number, message) => {
  await tw.messages.create({
    body: message,
    from: process.env.TWILIO_MOBILE_NUMBER,
    to: number,
  });
};

module.exports = sendMessage;
