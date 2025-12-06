// // controllers/authController.js
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// // Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // Register User
// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password)
//     return res.status(400).json({ message: "Please fill all fields" });

//   const userExists = await User.findOne({ email });
//   if (userExists)
//     return res.status(400).json({ message: "User already exists" });

//   const user = await User.create({ name, email, password });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400).json({ message: "Invalid user data" });
//   }
// };

// // Login User
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401).json({ message: "Invalid email or password" });
//   }
// };

// //controllers / authController.js;
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";

// // Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // Register User
// export const registerUser = async (req, res) => {
//   const { name, email, password } = req.body;

//   if (!name || !email || !password)
//     return res.status(400).json({ message: "Please fill all fields" });

//   const userExists = await User.findOne({ email });
//   if (userExists)
//     return res.status(400).json({ message: "User already exists" });

//   const user = await User.create({ name, email, password });

//   if (user) {
//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(400).json({ message: "Invalid user data" });
//   }
// };

// // Login User
// export const loginUser = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email });
//   if (user && (await user.matchPassword(password))) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       token: generateToken(user._id),
//     });
//   } else {
//     res.status(401).json({ message: "Invalid email or password" });
//   }
// };

// // Get current user profile (protected)
// export const getMe = async (req, res) => {
//   // req.user is set by auth middleware
//   if (!req.user) return res.status(401).json({ message: "Not authenticated" });

//   res.json({
//     _id: req.user._id,
//     name: req.user.name,
//     email: req.user.email,
//   });
// };

// // Update password (protected) - expects { currentPassword, newPassword }
// export const updatePassword = async (req, res) => {
//   const { currentPassword, newPassword } = req.body;

//   if (!currentPassword || !newPassword)
//     return res.status(400).json({ message: "Please provide both fields" });

//   const user = await User.findById(req.user._id);

//   if (!user) return res.status(404).json({ message: "User not found" });

//   const isMatch = await user.matchPassword(currentPassword);
//   if (!isMatch)
//     return res.status(401).json({ message: "Current password incorrect" });

//   user.password = newPassword;
//   await user.save();

//   // return a new token if you want
//   res.json({
//     message: "Password updated successfully",
//     token: generateToken(user._id),
//   });
// };

// // controllers/authController.js
// import User from "../models/User.js";
// import jwt from "jsonwebtoken";
// import { sendEmail } from "../utils/mailer.js";
// import bcrypt from "bcryptjs";

// const generateToken = (payload, expiresIn = "7d") => {
//   return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
// };

// // --- Register (now sends verification email)
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;
//     if (!name || !email || !password)
//       return res.status(400).json({ message: "Please fill all fields" });

//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({
//       name,
//       email,
//       password,
//       isVerified: false,
//     });

//     // Create verification token (short lived)
//     const token = generateToken(
//       { id: user._id, purpose: "email_verify" },
//       "1d"
//     );

//     // Verification link (frontend should call backend verify endpoint)
//     const verifyUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

//     const html = `
//       <p>Hi ${user.name},</p>
//       <p>Thanks for registering. Click the link below to verify your email:</p>
//       <p><a href="${verifyUrl}">Verify Email</a></p>
//       <p>If the link doesn't open, copy and paste this URL in your browser:</p>
//       <p>${verifyUrl}</p>
//       <p>This link will expire in 24 hours.</p>
//     `;

//     await sendEmail({
//       to: user.email,
//       subject: "Verify your email",
//       html,
//     });

//     res.status(201).json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       message: "User registered. Verification email sent.",
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // --- Verify email (called by frontend after user clicks link)
// export const verifyEmail = async (req, res) => {
//   try {
//     const token = req.query.token || req.body.token;
//     if (!token) return res.status(400).json({ message: "Token is required" });

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     if (decoded.purpose !== "email_verify")
//       return res.status(400).json({ message: "Invalid token purpose" });

//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.isVerified)
//       return res.status(200).json({ message: "User already verified" });

//     user.isVerified = true;
//     await user.save();

//     res.status(200).json({ message: "Email verified successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // --- Login: ensure user is verified
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//       if (!user.isVerified) {
//         return res
//           .status(401)
//           .json({ message: "Please verify your email first" });
//       }
//       // Issue auth token (longer lived)
//       const token = generateToken(
//         { id: user._id, purpose: "auth" },
//         process.env.JWT_EXPIRES_IN || "7d"
//       );
//       res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token,
//       });
//     } else {
//       res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // --- Forgot password: create reset token and email it
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await User.findOne({ email });
//     if (!user)
//       return res
//         .status(200)
//         .json({
//           message: "If a matching account was found, an email was sent",
//         });

//     const token = generateToken(
//       { id: user._id, purpose: "password_reset" },
//       "1h"
//     );
//     const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

//     const html = `
//       <p>Hi ${user.name},</p>
//       <p>You requested a password reset. Click the link below to reset your password (valid for 1 hour):</p>
//       <p><a href="${resetUrl}">Reset Password</a></p>
//       <p>If you didn't request this, ignore this email.</p>
//     `;

//     await sendEmail({
//       to: user.email,
//       subject: "Password reset request",
//       html,
//     });

//     // respond with generic message to avoid account enumeration
//     res
//       .status(200)
//       .json({ message: "If a matching account was found, an email was sent" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // --- Reset password: use token to set new password
// export const resetPassword = async (req, res) => {
//   try {
//     const { token, password } = req.body;
//     if (!token || !password)
//       return res
//         .status(400)
//         .json({ message: "Token and new password are required" });

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch (err) {
//       return res.status(400).json({ message: "Invalid or expired token" });
//     }

//     if (decoded.purpose !== "password_reset")
//       return res.status(400).json({ message: "Invalid token purpose" });

//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Set new password and save (pre-save hook will hash it)
//     user.password = password;
//     await user.save();

//     // Optionally inform user by email that their password was changed
//     await sendEmail({
//       to: user.email,
//       subject: "Your password has been changed",
//       html: `<p>Hi ${user.name},</p><p>Your password was changed successfully. If you didn't perform this change, contact support immediately.</p>`,
//     });

//     res.status(200).json({ message: "Password reset successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// import User from "../models/user.js";
// import otpGenerator from "otp-generator";
// import bcrypt from "bcryptjs";
// import nodemailer from "nodemailer";

// // REGISTER USER + SEND OTP
// export const registerUser = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check user
//     const existingUser = await User.findOne({ email });
//     if (existingUser)
//       return res.status(400).json({ message: "User already exists" });

//     // Create user
//     const user = await User.create({ name, email, password });

//     // Generate OTP
//     const otp = otpGenerator.generate(6, {
//       digits: true,
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     user.otp = otp;
//     user.otpExpires = Date.now() + 5 * 60 * 1000;
//     await user.save();

//     // Send email
//     sendOTP(email, otp);

//     res.status(200).json({ message: "OTP sent to email", userId: user._id });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // LOGIN USER → SEND OTP
// export const loginUser = async (req, res) => {
//   try {
//     const { email } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     // Generate OTP
//     const otp = otpGenerator.generate(6, { digits: true });
//     user.otp = otp;
//     user.otpExpires = Date.now() + 5 * 60 * 1000;
//     await user.save();

//     sendOTP(email, otp);

//     res.status(200).json({ message: "OTP sent", userId: user._id });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // VERIFY OTP
// export const verifyOTP = async (req, res) => {
//   try {
//     const { userId, otp } = req.body;

//     const user = await User.findById(userId);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.otp !== otp || user.otpExpires < Date.now()) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     user.otp = null;
//     user.otpExpires = null;
//     await user.save();

//     res.status(200).json({ message: "OTP verified" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error" });
//   }
// };

// // EMAIL OTP SENDER
// export const sendOTP = async (email, otp) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.SMTP_EMAIL,
//       pass: process.env.SMTP_PASS,
//     },
//   });

//   await transporter.sendMail({
//     from: process.env.SMTP_EMAIL,
//     to: email,
//     subject: "Your OTP Code",
//     text: `Your verification code is: ${otp}`,
//   });
// };

import User from "../models/User.js";
import Otp from "../models/Otp.js";
import otpGenerator from "otp-generator";
import sendEmail from "../utils/sendEmail.js";
import jwt from "jsonwebtoken";

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// STEP 1 — Register Step 1: Send OTP
export const sendOtp = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Generate a 6-digit OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    // Save OTP (delete if previous exists)
    await Otp.deleteMany({ email });
    await Otp.create({ email, otp });

    console.log("Generated OTP:", otp);

    // Send email
    await sendEmail(email, otp);

    res.json({
      message: "OTP sent to email",
      tempUser: { name, email, password },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Failed to send OTP" });
  }
};

// STEP 2 — Verify OTP & Register User
export const verifyOtp = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    // Check OTP
    const validOtp = await Otp.findOne({ email, otp });
    if (!validOtp)
      return res.status(400).json({ message: "Invalid or expired OTP" });

    // Create user account
    const user = await User.create({ name, email, password });

    // Delete OTP after use
    await Otp.deleteMany({ email });

    res.json({
      message: "Registration successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "OTP verification failed" });
  }
};

// LOGIN (unchanged)
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
};
