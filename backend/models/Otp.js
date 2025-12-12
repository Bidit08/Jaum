// import mongoose from "mongoose";

// const otpSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//   },
//   otp: {
//     type: String,
//     required: true,
//   },
//   createdAt: {
//     type: Date,
//     expires: 300, // ⏳ OTP auto-deletes after 5 minutes
//     default: Date.now,
//   },
// });

// const Otp = mongoose.model("Otp", otpSchema);
// export default Otp;

// backend/models/Otp.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 300, // OTP auto-deletes after 5 minutes
    default: Date.now,
  },
  // optional fields you can add later:
  // resendCount: { type: Number, default: 0 },
  // attempts: { type: Number, default: 0 },
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
