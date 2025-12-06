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
    expires: 300, // ⏳ OTP auto-deletes after 5 minutes
    default: Date.now,
  },
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
