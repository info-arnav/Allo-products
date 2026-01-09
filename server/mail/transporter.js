const { SESClient, SendEmailCommand } = require("@aws-sdk/client-ses");
const mailConfig = require("@/config/mail.config.js");

const sesClient = new SESClient({
  region: mailConfig.AWS_REGION,
  credentials: {
    accessKeyId: mailConfig.AWS_ACCESS_KEY_ID,
    secretAccessKey: mailConfig.AWS_SECRET_ACCESS_KEY,
  },
});

exports.sendMail = async (recipient, subject, text, html) => {
  if (!recipient || !subject || (!text && !html)) {
    return {
      error: true,
      message: "Invalid email parameters",
    };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(recipient)) {
    return {
      error: true,
      message: "Invalid email address",
    };
  }

  const params = {
    Source: `"${mailConfig.NAME}" <${mailConfig.EMAIL}>`,
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Subject: {
        Data: subject,
        Charset: "UTF-8",
      },
      Body: {
        ...(html && {
          Html: {
            Data: html,
            Charset: "UTF-8",
          },
        }),
        ...(text && {
          Text: {
            Data: text,
            Charset: "UTF-8",
          },
        }),
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const response = await sesClient.send(command);

    return {
      error: false,
      messageId: response.MessageId,
    };
  } catch (error) {
    console.error("[error] [ses]", error);
    return {
      error: true,
      message: "Failed to send email",
      details: error.message,
      code: error.code,
    };
  }
};
