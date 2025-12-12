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

// import User from "../models/User.js";
// import Otp from "../models/Otp.js";
// import otpGenerator from "otp-generator";
// import sendEmail from "../utils/sendEmail.js";
// import jwt from "jsonwebtoken";

// // Generate JWT token
// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
// };

// // STEP 1 — Register Step 1: Send OTP
// export const sendOtp = async (req, res) => {
//   try {
//     const { name, email, password } = req.body;

//     // Check if user exists
//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     // Generate a 6-digit OTP
//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     // Save OTP (delete if previous exists)
//     await Otp.deleteMany({ email });
//     await Otp.create({ email, otp });

//     console.log("Generated OTP:", otp);

//     // Send email
//     await sendEmail(email, otp);

//     res.json({
//       message: "OTP sent to email",
//       tempUser: { name, email, password },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "Failed to send OTP" });
//   }
// };

// // STEP 2 — Verify OTP & Register User
// export const verifyOtp = async (req, res) => {
//   try {
//     const { name, email, password, otp } = req.body;

//     // Check OTP
//     const validOtp = await Otp.findOne({ email, otp });
//     if (!validOtp)
//       return res.status(400).json({ message: "Invalid or expired OTP" });

//     // Create user account
//     const user = await User.create({ name, email, password });

//     // Delete OTP after use
//     await Otp.deleteMany({ email });

//     res.json({
//       message: "Registration successful",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       },
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: "OTP verification failed" });
//   }
// };

// // LOGIN (unchanged)
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

// // backend/controllers/authController.js
// import User from "../models/User.js";
// import Otp from "../models/Otp.js";
// import otpGenerator from "otp-generator";
// import sendEmail from "../utils/sendEmail.js";
// import jwt from "jsonwebtoken";

// // Helper to generate JWT (used only for login)
// const generateToken = (id) =>
//   jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// /**
//  * Step 1: sendOtp
//  * Called when user starts registration (name, email, password sent from frontend).
//  * We store the signup info temporarily in frontend or send only OTP to email.
//  * Here we only send OTP and save it; account creation happens on verify-otp.
//  */
// export const sendOtp = async (req, res) => {
//   try {
//     const { name, email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     // If a user already exists, we can block registration
//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     // generate a 6-digit numeric OTP
//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     console.log("You OTP code is:", otp);

//     // Save OTP document (expires automatically after 5 minutes per model)
//     const otpDoc = new Otp({ email, otp });
//     await otpDoc.save();

//     // send email
//     await sendEmail(email, name || "", otp);

//     return res.json({ message: "OTP sent to your email", expiresIn: 300 });
//   } catch (err) {
//     console.error("sendOtp error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * Step 2: verifyOtp
//  * Frontend will send: { name, email, password, otp } — this verifies OTP and creates user.
//  * If you prefer to store name/password in a temp store, adapt accordingly.
//  */
// export const verifyOtp = async (req, res) => {
//   try {
//     const { name, email, password, otp } = req.body;
//     if (!email || !otp || !password || !name)
//       return res.status(400).json({ message: "Missing required fields" });

//     // find latest OTP doc for email
//     const latest = await Otp.findOne({ email }).sort({ createdAt: -1 });
//     if (!latest)
//       return res.status(400).json({ message: "OTP not found or expired" });

//     if (latest.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // OTP verified; create the user
//     const userExists = await User.findOne({ email });
//     if (userExists)
//       return res.status(400).json({ message: "User already exists" });

//     const user = await User.create({ name, email, password });

//     // delete OTPs for this email to prevent reuse
//     await Otp.deleteMany({ email });

//     // Optionally auto-login by returning token
//     const token = generateToken(user._id);

//     return res.status(201).json({
//       message: "Registration successful",
//       user: { _id: user._id, name: user.name, email: user.email },
//       token,
//     });
//   } catch (err) {
//     console.error("verifyOtp error:", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * Resend OTP endpoint
//  * POST { email }
//  * Enforces short cooldown (60s)
//  */
// export const resendOtp = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     // find latest OTP
//     const latest = await Otp.findOne({ email }).sort({ createdAt: -1 });

//     const RESEND_COOLDOWN_SECONDS = 60;
//     if (latest) {
//       const secondsSince = Math.floor(
//         (Date.now() - latest.createdAt.getTime()) / 1000
//       );
//       if (secondsSince < RESEND_COOLDOWN_SECONDS) {
//         return res.status(429).json({
//           message: `Please wait ${
//             RESEND_COOLDOWN_SECONDS - secondsSince
//           } seconds before resending OTP.`,
//         });
//       }
//     }

//     // generate new OTP
//     const otp = otpGenerator.generate(6, {
//       upperCaseAlphabets: false,
//       lowerCaseAlphabets: false,
//       specialChars: false,
//     });

//     // Save new OTP (previous OTPs will expire naturally within 5 minutes)
//     const newOtp = new Otp({ email, otp });
//     await newOtp.save();

//     // Send OTP email
//     await sendEmail(email, "", otp);

//     return res.json({
//       message: "OTP resent successfully",
//       cooldown: RESEND_COOLDOWN_SECONDS,
//     });
//   } catch (err) {
//     console.error("resendOtp error", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// /**
//  * loginUser
//  * Standard login returns a token
//  */
// export const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     if (!email || !password)
//       return res.status(400).json({ message: "Missing credentials" });

//     const user = await User.findOne({ email });
//     if (user && (await user.matchPassword(password))) {
//       return res.json({
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         token: generateToken(user._id),
//       });
//     } else {
//       return res.status(401).json({ message: "Invalid email or password" });
//     }
//   } catch (err) {
//     console.error("loginUser error", err);
//     return res.status(500).json({ message: "Server error" });
//   }
// };

// backend/controllers/authController.js
import User from "../models/User.js";
import Otp from "../models/Otp.js";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendEmail.js";

// Email templates
import { registrationOtpTemplate } from "../utils/emailTemplates/registrationOtp.js";
import { resetOtpTemplate } from "../utils/emailTemplates/resetOtp.js";

// ===============================
// JWT HELPERS
// ===============================

// Registration/Login JWT
const generateAuthToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

// Reset password 15-minute token
const generateResetToken = (id) =>
  jwt.sign({ id, purpose: "reset" }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

// ===============================
// REGISTRATION OTP
// ===============================

/**
 * STEP 1 — SEND OTP FOR REGISTRATION
 * Body: { name, email, password }
 */
export const sendOtp = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // Generate OTP
    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Registration OTP:", otp);

    // Save OTP
    await new Otp({ email, otp }).save();

    // Send registration OTP email
    await sendEmail({
      email,
      subject: "Verify your Jaum Rentals account",
      html: registrationOtpTemplate(name, otp),
    });

    return res.json({ message: "OTP sent to your email", expiresIn: 300 });
  } catch (err) {
    console.error("sendOtp error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * STEP 2 — VERIFY OTP & CREATE USER
 * Body: { name, email, password, otp }
 */
export const verifyOtp = async (req, res) => {
  try {
    const { name, email, password, otp } = req.body;

    if (!email || !password || !name || !otp)
      return res.status(400).json({ message: "Missing required fields" });

    const latest = await Otp.findOne({ email }).sort({ createdAt: -1 });
    if (!latest)
      return res.status(400).json({ message: "OTP expired or not found" });

    if (latest.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create({ name, email, password });

    // Clean up OTP
    await Otp.deleteMany({ email });

    // Create login token
    const token = generateAuthToken(user._id);

    return res.status(201).json({
      message: "Registration successful",
      user: { _id: user._id, name: user.name, email: user.email },
      token,
    });
  } catch (err) {
    console.error("verifyOtp error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * RESEND OTP FOR REGISTRATION
 */
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const latest = await Otp.findOne({ email }).sort({ createdAt: -1 });

    const COOLDOWN = 60;
    if (latest) {
      const elapsed = Math.floor(
        (Date.now() - latest.createdAt.getTime()) / 1000
      );
      if (elapsed < COOLDOWN) {
        return res.status(429).json({
          message: `Please wait ${
            COOLDOWN - elapsed
          } seconds before resending.`,
        });
      }
    }

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    await new Otp({ email, otp }).save();

    await sendEmail({
      email,
      subject: "Your new verification code",
      html: registrationOtpTemplate("", otp),
    });

    return res.json({ message: "OTP resent successfully", cooldown: COOLDOWN });
  } catch (err) {
    console.error("resendOtp error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// LOGIN
// ===============================
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Missing credentials" });

    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        token: generateAuthToken(user._id),
      });
    }

    return res.status(401).json({ message: "Invalid email or password" });
  } catch (err) {
    console.error("loginUser error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

// ===============================
// FORGOT PASSWORD SYSTEM
// ===============================

/**
 * STEP 1 — SEND RESET OTP
 * Body: { email }
 */
export const sendResetOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(404)
        .json({ message: "No account found with this email" });

    const otp = otpGenerator.generate(6, {
      upperCaseAlphabets: false,
      lowerCaseAlphabets: false,
      specialChars: false,
    });

    console.log("Reset OTP:", otp);

    await new Otp({ email, otp }).save();

    await sendEmail({
      email,
      subject: "Reset your Jaum Rentals password",
      html: resetOtpTemplate(user.name, otp),
    });

    return res.json({ message: "Reset OTP sent", expiresIn: 300 });
  } catch (err) {
    console.error("sendResetOtp error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * STEP 2 — VERIFY RESET OTP
 * Body: { email, otp }
 */
export const verifyResetOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp)
      return res.status(400).json({ message: "Email and OTP are required" });

    const latest = await Otp.findOne({ email }).sort({ createdAt: -1 });

    if (!latest)
      return res.status(400).json({ message: "OTP expired or not found" });

    if (latest.otp !== otp)
      return res.status(400).json({ message: "Invalid OTP" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    await Otp.deleteMany({ email });

    const resetToken = generateResetToken(user._id);

    return res.json({
      message: "OTP verified",
      resetToken,
      expiresIn: 900, // 15 minutes
    });
  } catch (err) {
    console.error("verifyResetOtp error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

/**
 * STEP 3 — RESET PASSWORD
 * Body: { email, newPassword, token }
 */
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword, token } = req.body;

    if (!email || !newPassword || !token)
      return res.status(400).json({ message: "Missing required fields" });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res
        .status(401)
        .json({ message: "Invalid or expired reset token" });
    }

    if (decoded.purpose !== "reset")
      return res.status(401).json({ message: "Invalid reset token" });

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    user.password = newPassword;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error("resetPassword error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};
