const nodemailer = require("nodemailer");
const mailConfig = require("../config/mail.config.js");

const transporter = nodemailer.createTransport({
  host: "email-smtp.ap-south-1.amazonaws.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: mailConfig.SMTP_USERNAME,
    pass: mailConfig.SMTP_PASSWORD,
  },
  debug: true,
  logger: true,
});

exports.sendMail = async (recipient, subject, text, html) => {
  try {
    await transporter.sendMail({
      from: `"${mailConfig.NAME}" <${mailConfig.EMAIL}>`,
      to: recipient,
      subject: subject,
      text: text,
      html: html,
    });
    return { error: false };
  } catch (error) {
    return { error: true, message: "Some error occurred while sending email" };
  }
};
