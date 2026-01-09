// import express from "express";
// import {
//   getPendingListings,
//   approveListing,
//   deleteListing,
// } from "../controllers/adminController.js";

// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

// const router = express.Router();

// /* =========================
//    ADMIN ROUTES
// ========================= */

// // 🕒 Get all pending listings
// router.get(
//   "/listings/pending",
//   authMiddleware,
//   adminMiddleware,
//   getPendingListings
// );

// // ✅ Approve a listing
// router.put(
//   "/listings/:id/approve",
//   authMiddleware,
//   adminMiddleware,
//   approveListing
// );

// // ❌ Delete / reject listing
// router.delete("/listings/:id", authMiddleware, adminMiddleware, deleteListing);

// export default router;

// import express from "express";
// import {
//   getPendingListings,
//   approveListing,
//   rejectListing,
// } from "../controllers/adminController.js";

// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";

// const router = express.Router();

// /* =======================
//    ADMIN LISTING ROUTES
// ======================= */

// router.get(
//   "/listings/pending",
//   authMiddleware,
//   adminMiddleware,
//   getPendingListings
// );

// router.put(
//   "/listings/:id/approve",
//   authMiddleware,
//   adminMiddleware,
//   approveListing
// );

// router.delete(
//   "/listings/:id/reject",
//   authMiddleware,
//   adminMiddleware,
//   rejectListing
// );

// export default router;

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getPendingListings,
  approveListing,
  rejectListing,
} from "../controllers/adminController.js";

const router = express.Router();

router.get(
  "/listings/pending",
  authMiddleware,
  adminMiddleware,
  getPendingListings
);

router.put(
  "/listings/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveListing
);

router.delete(
  "/listings/:id/reject",
  authMiddleware,
  adminMiddleware,
  rejectListing
);

export default router;
