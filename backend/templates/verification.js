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
  <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 40px 24px; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 12px; box-shadow: 0 4px 12px rgba(0, 0, 0, 0.07); text-align: center;">
    
    <div style="margin-bottom: 32px;">
      <img src="https://www.allo.co.in/logo.png" alt="Allo Logo" style="max-width: 180px; height: auto;" />
    </div>

    <br> 
    <br> 

    <h1 style="font-size: 24px; font-weight: 700; margin-bottom: 20px; color: #111;">
      Verify your <span style="color: #0872fc;">Allo</span> account
    </h1>

    <p style="font-size: 16px; line-height: 1.6; margin-bottom: 24px;">
      You're just one step away! Click below to verify your email address and activate your account.
    </p>

    <a href="${frontned_uri}/verify-user?user=${user_id}&code=${code}"
       style="display: inline-block; background: #0872fc; color: #fff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-size: 16px; font-weight: 600; margin-bottom: 32px;">
      Verify My Email
    </a>

    <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />

    <p style="font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
      Didn’t request this? You can cancel the signup below:
    </p>

    <a href="${frontned_uri}/revoke-user?user=${user_id}&code=${code}"
       style="display: inline-block; background: #e11d48; color: #fff; text-decoration: none; padding: 10px 22px; border-radius: 6px; font-size: 14px; font-weight: 600;">
      Revoke Signup
    </a>

    <p style="font-size: 12px; line-height: 1.6; margin-top: 32px; color: #666;">
      If the buttons don’t work, copy and paste the links below into your browser:
    </p>

    <p style="font-size: 12px; line-height: 1.6; word-break: break-word">
      Verify:<br />
      <a href="${frontned_uri}/verify-user?user=${user_id}&code=${code}" style="word-break: break-word;">
        ${frontned_uri}/<wbr>verify-user?<wbr>user=${user_id}&amp;code=${code}
      </a>
    </p>

    <p style="font-size: 12px; line-height: 1.6; word-break: break-word;">
      Revoke:<br />
      <a href="${frontned_uri}/revoke-user?user=${user_id}&code=${code}" style="word-break: break-word;">
        ${frontned_uri}/<wbr>revoke-user?<wbr>user=${user_id}&amp;code=${code}
      </a>
    </p>

    <p style="font-size: 13px; line-height: 1.6; margin-top: 40px; color: #555;">
      This is an auto-generated email. For any queries, contact
      <a href="mailto:info@allo.co.in" style="">info@allo.co.in</a>.
    </p>

    <p style="font-size: 14px; line-height: 1.6; margin-top: 16px; color: #555;">
      Best regards,<br />
      <strong>The Allo Team</strong>
    </p>
  </div>
  `,
  ];
};

module.exports = verificationTemplate;
