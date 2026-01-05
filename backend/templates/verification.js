const verificationTemplate = (frontned_uri, user_id, code) => {
  return [
    "Verify Your Allo Account",
    `
Hi there,

To complete your Allo signup, please verify your email:

Verify: ${frontned_uri}/verify-user?user=${user_id}&code=${code}

Revoke: ${frontned_uri}/revoke-user?user=${user_id}&code=${code}

This is an auto-generated email. For any queries, contact info@allo.co.in.

— The Allo Team
  `,
    `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif; max-width: 600px; margin: 0 auto; padding: 0; background: #0a0a0a;">
    
    <div style="background: linear-gradient(135deg, #171717 0%, #0a0a0a 100%); padding: 48px 32px; text-align: center; border-bottom: 2px solid #f6b215;">
      <img src="https://www.allo.co.in/logo.png" alt="Allo Logo" style="width: 80px; height: 80px; margin-bottom: 24px;" />
      <h1 style="font-size: 32px; font-weight: 700; margin: 0; color: #ededed;">
        Allo <span style="color: #f6b215;">Admin</span>
      </h1>
    </div>

    <div style="background: #1a1a1a; padding: 40px 32px; border-left: 1px solid #262626; border-right: 1px solid #262626;">
      
      <h2 style="font-size: 24px; font-weight: 700; margin: 0 0 16px 0; color: #ededed; text-align: center;">
        Verify Your Account
      </h2>

      <p style="font-size: 16px; line-height: 1.6; margin: 0 0 32px 0; color: #a3a3a3; text-align: center;">
        You're just one step away from accessing the Allo admin portal. Click below to verify your email address and activate your account.
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${frontned_uri}/verify-user?user=${user_id}&code=${code}"
           style="display: inline-block; background: #f6b215; color: #02213e; text-decoration: none; padding: 16px 32px; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 8px 24px rgba(246, 178, 21, 0.25); transition: all 0.3s ease;">
          Verify My Email
        </a>
      </div>

      <div style="background: #262626; height: 1px; margin: 32px 0;"></div>

      <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px 0; color: #a3a3a3; text-align: center;">
        Didn't request this? You can cancel the signup below:
      </p>

      <div style="text-align: center; margin-bottom: 32px;">
        <a href="${frontned_uri}/revoke-user?user=${user_id}&code=${code}"
           style="display: inline-block; background: #404040; color: #ededed; text-decoration: none; padding: 12px 24px; border-radius: 12px; font-size: 14px; font-weight: 600; border: 1px solid #525252;">
          Revoke Signup
        </a>
      </div>

      <div style="background: #0a0a0a; padding: 24px; border-radius: 12px; border: 1px solid #262626; margin-top: 32px;">
        <p style="font-size: 12px; line-height: 1.6; margin: 0 0 16px 0; color: #737373; text-align: center;">
          If the buttons don't work, copy and paste the links below into your browser:
        </p>

        <p style="font-size: 11px; line-height: 1.8; margin: 0 0 12px 0; word-break: break-all; color: #a3a3a3;">
          <strong style="color: #d4d4d4;">Verify:</strong><br />
          <a href="${frontned_uri}/verify-user?user=${user_id}&code=${code}" style="color: #f6b215; text-decoration: none;">
            ${frontned_uri}/verify-user?user=${user_id}&code=${code}
          </a>
        </p>

        <p style="font-size: 11px; line-height: 1.8; margin: 0; word-break: break-all; color: #a3a3a3;">
          <strong style="color: #d4d4d4;">Revoke:</strong><br />
          <a href="${frontned_uri}/revoke-user?user=${user_id}&code=${code}" style="color: #737373; text-decoration: none;">
            ${frontned_uri}/revoke-user?user=${user_id}&code=${code}
          </a>
        </p>
      </div>

    </div>

    <div style="background: #0a0a0a; padding: 32px; text-align: center; border-top: 1px solid #262626;">
      <p style="font-size: 13px; line-height: 1.6; margin: 0 0 8px 0; color: #737373;">
        This is an auto-generated email. For any queries, contact
        <a href="mailto:info@allo.co.in" style="color: #f6b215; text-decoration: none;">info@allo.co.in</a>
      </p>

      <p style="font-size: 14px; line-height: 1.6; margin: 16px 0 0 0; color: #a3a3a3;">
        Best regards,<br />
        <strong style="color: #ededed;">The Allo Team</strong>
      </p>
    </div>

  </div>
  `,
  ];
};

module.exports = verificationTemplate;
