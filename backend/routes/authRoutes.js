// routes/authRoutes.js
// import express from "express";
// import { registerUser, loginUser } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// export default router;

//routes / authRoutes.js;
// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   getMe,
//   updatePassword,
// } from "../controllers/authController.js";
// import { protect } from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // Protected
// router.get("/me", protect, getMe);
// router.put("/update-password", protect, updatePassword);

// export default router;

// // routes/authRoutes.js
// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   verifyEmail,
//   forgotPassword,
//   resetPassword,
// } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// // Email verification (accepts GET query ?token= or POST with token in body)
// router.get("/verify", verifyEmail);
// router.post("/verify", verifyEmail);

// // Password reset flows
// router.post("/forgot-password", forgotPassword); // send reset email
// router.post("/reset-password", resetPassword); // accept { token, password }

// export default router;

// import express from "express";
// import {
//   registerUser,
//   loginUser,
//   //   verifyOTP,
// } from "../controllers/authController.js";

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);
// // router.post("/verify-otp", verifyOTP);

// export default router;

import express from "express";
import {
  sendOtp,
  verifyOtp,
  loginUser,
} from "../controllers/authController.js";

const router = express.Router();

// Step 1 — User enters name/email/password → OTP sent to email
router.post("/send-otp", sendOtp);

// Step 2 — User enters OTP → account created
router.post("/verify-otp", verifyOtp);

// Login
router.post("/login", loginUser);

export default router;
