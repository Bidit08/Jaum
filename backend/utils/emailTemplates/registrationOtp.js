export const registrationOtpTemplate = (name, otp) => `
<div style="
  font-family: Arial, sans-serif; 
  background: #f7f7f7; 
  padding: 20px; 
  border-radius: 8px; 
  max-width: 450px; 
  margin: auto; 
  color: #333;
">
  <h2 style="color: #4F46E5; text-align:center; margin: 0;">
    Verify Your Email
  </h2>

  <p style="font-size: 15px;">
    Hi <strong>${name || ""}</strong>,
  </p>

  <p style="font-size: 15px;">
    Use the OTP code below to verify your email:
  </p>

  <div style="text-align: center; margin: 20px 0;">
    <div style="
      display: inline-block;
      background: #4F46E5;
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
    If you did not request this, you can ignore this message.
  </p>
</div>
`;
