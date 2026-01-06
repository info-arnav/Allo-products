const mailConfig = require("../config/mail.config.js");

const { Client } = require("@microsoft/microsoft-graph-client");
const { ClientSecretCredential } = require("@azure/identity");
require("isomorphic-fetch");

const credential = new ClientSecretCredential(
  mailConfig.AZURE_TENANT_ID,
  mailConfig.AZURE_CLIENT_ID,
  mailConfig.AZURE_CLIENT_SECRET
);

const graphClient = Client.initWithMiddleware({
  authProvider: {
    getAccessToken: async () => {
      const token = await credential.getToken(
        "https://graph.microsoft.com/.default"
      );
      return token.token;
    },
  },
});

exports.sendMail = async (to, subject, text, html) => {
  try {
    await graphClient.api(`/users/${mailConfig.EMAIL}/sendMail`).post({
      message: {
        subject,
        body: {
          contentType: "HTML",
          content: html || text,
        },
        toRecipients: [
          {
            emailAddress: { address: to },
          },
        ],
      },
      saveToSentItems: "true",
    });
    return { error: false };
  } catch (error) {
    return {
      error: true,
      message: "Failed to send email",
    };
  }
};
