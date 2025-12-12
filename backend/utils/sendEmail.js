// import nodemailer from "nodemailer";

// const sendEmail = async (email, name, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD, // <-- Gmail App Password
//       },
//     });

//     const htmlContent = `
// <div style="font-family: Arial, sans-serif; background: #f4f4f4; padding: 20px;">
//   <div style="max-width: 500px; margin: auto; background: white; padding: 25px; border-radius: 10px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

//     <h2 style="text-align: center; color: #4F46E5;">🔐 Email Verification</h2>

//     <p style="font-size: 16px; color: #333;">
//       Hi <b>${name}</b>,
//       <br><br>
//       Thank you for registering! Please use the OTP below to verify your email address.
//     </p>

//     <div style="text-align: center; margin-top: 20px; margin-bottom: 20px;">
//       <div style="display: inline-block; padding: 15px 30px; background: #4F46E5; color: white; font-size: 24px; font-weight: bold; border-radius: 8px;">
//         ${otp}
//       </div>
//     </div>

//     <p style="font-size: 14px; color: #555;">
//       This OTP is valid for <b>10 minutes</b>.
//       If you did not request this, please ignore the message.
//     </p>

//     <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">

//     <p style="font-size: 12px; color: #999; text-align: center;">
//       © ${new Date().getFullYear()} Jaum Rentals. All rights reserved.
//     </p>

//   </div>
// </div>
// `;

//     await transporter.sendMail({
//       from: `"Jaum Rentals" <${process.env.EMAIL_USER}>`,
//       to: email,
//       subject: "Your OTP Code",
//       html: htmlContent,
//     });

//     console.log("Email sent to:", email);
//   } catch (error) {
//     console.error("Email Error:", error);
//   }
// };

// export default sendEmail;

// backend/utils/sendEmail.js
// import nodemailer from "nodemailer";

// const sendEmail = async (email, name, otp) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail", // or configure host/port
//       auth: {
//         user: process.env.SMTP_EMAIL,
//         pass: process.env.SMTP_PASSWORD, // Gmail App Password or SMTP password
//       },
//     });

//     const htmlContent = `
//       <div style="
//   font-family: Arial, sans-serif;
//   background: #f7f7f7;
//   padding: 20px;
//   border-radius: 8px;
//   max-width: 450px;
//   margin: auto;
//   color: #333;
// ">
//   <h2 style="margin-top: 0; color: #4F46E5; text-align:center;">
//     Verify Your Email
//   </h2>

//   <p style="font-size: 15px;">
//     Hi <strong>${name || ""}</strong>,
//   </p>

//   <p style="font-size: 15px;">
//     Use the OTP code below to verify your email:
//   </p>

//   <div style="
//     text-align: center;
//     margin: 20px 0;
//   ">
//     <div style="
//       display: inline-block;
//       background: #4F46E5;
//       color: #fff;
//       padding: 12px 24px;
//       font-size: 24px;
//       font-weight: bold;
//       border-radius: 6px;
//       letter-spacing: 4px;
//     ">
//       ${otp}
//     </div>
//   </div>

//   <p style="font-size: 14px; color: #555;">
//     This code will expire in <strong>5 minutes</strong>.
//   </p>

//   <p style="font-size: 14px; color: #777;">
//     If you didn’t request this email, you can safely ignore it.
//   </p>
// </div>

//     `;

//     await transporter.sendMail({
//       from: '"Jaum Rentals" <${process.env.SMTP_EMAIL}>',
//       to: email,
//       subject: "Your OTP Code",
//       html: htmlContent,
//     });
//     // return true;
//     console.log("Email sent to:", email);
//   } catch (err) {
//     console.error("sendEmail error:", err);
//     throw err;
//   }
// };

// export default sendEmail;

// backend/utils/sendEmail.js
import nodemailer from "nodemailer";

const sendEmail = async ({ email, subject, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Jaum Rentals" <${process.env.SMTP_EMAIL}>`,
      to: email,
      subject,
      html,
    });

    console.log("Email sent to:", email);
  } catch (err) {
    console.error("sendEmail error:", err);
    throw err;
  }
};

export default sendEmail;
