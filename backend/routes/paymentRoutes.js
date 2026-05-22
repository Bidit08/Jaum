// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   selectPaymentMethod,
//   verifyKhaltiPayment,
// } from "../controllers/paymentController.js";
// import { downloadInvoice } from "../controllers/invoiceController.js";

// const router = express.Router();

// // 💳 Select payment method (Cash or Initiate Khalti)
// router.post("/method", authMiddleware, selectPaymentMethod);

// // ✅ Verify Khalti payment
// router.post("/khalti/verify", authMiddleware, verifyKhaltiPayment);

// // 📄 Download Invoice
// router.get("/:id/invoice", authMiddleware, downloadInvoice);

// export default router;

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  selectPaymentMethod,
  verifyKhaltiPayment,
  verifyEsewaPayment,
  markCashAsPaid,
} from "../controllers/paymentController.js";
import { downloadInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

// 💳 Select payment method (Cash or Initiate Khalti/eSewa)
router.post("/method", authMiddleware, selectPaymentMethod);

// ✅ Verify Khalti payment
router.post("/khalti/verify", authMiddleware, verifyKhaltiPayment);

// ✅ Verify eSewa payment
router.post("/esewa/verify", authMiddleware, verifyEsewaPayment);

// 💵 Owner marks cash booking as paid
router.patch("/:bookingId/mark-cash-paid", authMiddleware, markCashAsPaid);

// 📄 Download Invoice
router.get("/:id/invoice", authMiddleware, downloadInvoice);

export default router;
