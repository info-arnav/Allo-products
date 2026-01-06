const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.config.js");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: mailConfig.EMAIL,
    pass: mailConfig.PASSWORD,
  },
});

exports.sendMail = async (recipient, subject, text, html) => {
  try {
    console.log(1);
    await transporter.sendMail({
      from: `"${mailConfig.NAME}" <${mailConfig.EMAIL}>`,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    });
    return { error: false };
  } catch (error) {
    console.log(2);
    console.log(error);
    return { error: true, message: error };
  }
};
