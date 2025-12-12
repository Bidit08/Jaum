export const resetOtpTemplate = (name, otp) => `
<div style="
  font-family: Arial, sans-serif;
  background: #f7f7f7;
  padding: 20px;
  border-radius: 8px;
  max-width: 450px;
  margin: auto;
  color: #333;
">
  <h2 style="color: #DC2626; text-align:center; margin: 0;">
    Reset Your Password
  </h2>

  <p style="font-size: 15px;">
    Hi <strong>${name || ""}</strong>,
  </p>

  <p style="font-size: 15px;">
    Use the OTP code below to reset your password:
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <div style="
      display: inline-block;
      background: #DC2626;
      color: white;
      padding: 12px 24px;
      border-radius: 6px;
      letter-spacing: 4px;
      font-size: 24px;
      font-weight: bold;
    ">
      ${otp}
    </div>
  </div>

  <p style="font-size: 14px; color: #555;">
    This code will expire in <strong>5 minutes</strong>.
  </p>

  <p style="font-size: 14px; color: #777;">
    If you didn’t request a password reset, please ignore this email.
  </p>
</div>
`;
