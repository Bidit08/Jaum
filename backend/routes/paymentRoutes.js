import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  selectPaymentMethod,
  verifyKhaltiPayment,
} from "../controllers/paymentController.js";
import { downloadInvoice } from "../controllers/invoiceController.js";

const router = express.Router();

// 💳 Select payment method (Cash or Initiate Khalti)
router.post("/method", authMiddleware, selectPaymentMethod);

// ✅ Verify Khalti payment
router.post("/khalti/verify", authMiddleware, verifyKhaltiPayment);

// 📄 Download Invoice
router.get("/:id/invoice", authMiddleware, downloadInvoice);

export default router;
