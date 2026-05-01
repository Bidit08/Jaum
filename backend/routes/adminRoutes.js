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

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";
// import {
//   getPendingListings,
//   approveListing,
//   rejectListing,
//   getDashboardStats,
// } from "../controllers/adminController.js";

// const router = express.Router();

// router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

// router.get(
//   "/listings/pending",
//   authMiddleware,
//   adminMiddleware,
//   getPendingListings,
// );

// router.put(
//   "/listings/:id/approve",
//   authMiddleware,
//   adminMiddleware,
//   approveListing,
// );

// router.delete(
//   "/listings/:id/reject",
//   authMiddleware,
//   adminMiddleware,
//   rejectListing,
// );

// export default router;

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import adminMiddleware from "../middleware/adminMiddleware.js";
// import {
//   getPendingListings,
//   approveListing,
//   rejectListing,
//   getDashboardStats,
//   getAllUsers,
//   getUserDetail,
//   toggleSuspendUser,
//   deleteUser,
//   getAllListings,
//   getListingDetail,
//   adminUpdateListing,
//   adminDeleteListing,
//   toggleListingStatus,
//   toggleFeatured,
//   getAllBookings,
//   getBookingDetail,
//   updateBookingStatus,
//   toggleBookingFlag,
//   resolveDispute,
//   getPaymentStats,
//   getAllPayments,
//   updatePaymentStatus,
//   getPayouts,
//   updatePayoutStatus,
// } from "../controllers/adminController.js";

// const router = express.Router();

// // ── Dashboard ────────────────────────────────────────────────────────────────
// router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

// // ── Listings (full management) ───────────────────────────────────────────────
// router.get("/listings", authMiddleware, adminMiddleware, getAllListings);
// router.get(
//   "/listings/pending",
//   authMiddleware,
//   adminMiddleware,
//   getPendingListings,
// );
// router.get("/listings/:id", authMiddleware, adminMiddleware, getListingDetail);
// router.put(
//   "/listings/:id",
//   authMiddleware,
//   adminMiddleware,
//   adminUpdateListing,
// );
// router.delete(
//   "/listings/:id",
//   authMiddleware,
//   adminMiddleware,
//   adminDeleteListing,
// );
// router.patch(
//   "/listings/:id/approve",
//   authMiddleware,
//   adminMiddleware,
//   approveListing,
// );
// router.patch(
//   "/listings/:id/reject",
//   authMiddleware,
//   adminMiddleware,
//   rejectListing,
// );
// router.patch(
//   "/listings/:id/status",
//   authMiddleware,
//   adminMiddleware,
//   toggleListingStatus,
// );
// router.patch(
//   "/listings/:id/feature",
//   authMiddleware,
//   adminMiddleware,
//   toggleFeatured,
// );

// // ── Users ────────────────────────────────────────────────────────────────────
// router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
// router.get("/users/:id", authMiddleware, adminMiddleware, getUserDetail);
// router.patch(
//   "/users/:id/suspend",
//   authMiddleware,
//   adminMiddleware,
//   toggleSuspendUser,
// );
// router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// // ── Bookings ─────────────────────────────────────────────────────────────────
// router.get("/bookings", authMiddleware, adminMiddleware, getAllBookings);
// router.get("/bookings/:id", authMiddleware, adminMiddleware, getBookingDetail);
// router.patch(
//   "/bookings/:id/status",
//   authMiddleware,
//   adminMiddleware,
//   updateBookingStatus,
// );
// router.patch(
//   "/bookings/:id/flag",
//   authMiddleware,
//   adminMiddleware,
//   toggleBookingFlag,
// );
// router.patch(
//   "/bookings/:id/resolve-dispute",
//   authMiddleware,
//   adminMiddleware,
//   resolveDispute,
// );

// // ── Payments ─────────────────────────────────────────────────────────────────
// router.get("/payments/stats", authMiddleware, adminMiddleware, getPaymentStats);
// router.get("/payments", authMiddleware, adminMiddleware, getAllPayments);
// router.patch(
//   "/payments/:id/status",
//   authMiddleware,
//   adminMiddleware,
//   updatePaymentStatus,
// );

// // ── Payouts ──────────────────────────────────────────────────────────────────
// router.get("/payouts", authMiddleware, adminMiddleware, getPayouts);
// router.patch(
//   "/payouts/:id/status",
//   authMiddleware,
//   adminMiddleware,
//   updatePayoutStatus,
// );

// export default router;

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";
import {
  getPendingListings,
  approveListing,
  rejectListing,
  getDashboardStats,
  getAllUsers,
  getUserDetail,
  toggleSuspendUser,
  deleteUser,
  getAllListings,
  getListingDetail,
  adminUpdateListing,
  adminDeleteListing,
  toggleListingStatus,
  toggleFeatured,
  getAllBookings,
  getBookingDetail,
  updateBookingStatus,
  toggleBookingFlag,
  resolveDispute,
  getPaymentStats,
  getAllPayments,
  updatePaymentStatus,
  getPayouts,
  updatePayoutStatus,
} from "../controllers/adminController.js";
import {
  adminGetAllReviews,
  adminDeleteReview,
} from "../controllers/reviewController.js";

const router = express.Router();

// ── Dashboard ────────────────────────────────────────────────────────────────
router.get("/dashboard", authMiddleware, adminMiddleware, getDashboardStats);

// ── Listings (full management) ───────────────────────────────────────────────
router.get("/listings", authMiddleware, adminMiddleware, getAllListings);
router.get(
  "/listings/pending",
  authMiddleware,
  adminMiddleware,
  getPendingListings,
);
router.get("/listings/:id", authMiddleware, adminMiddleware, getListingDetail);
router.put(
  "/listings/:id",
  authMiddleware,
  adminMiddleware,
  adminUpdateListing,
);
router.delete(
  "/listings/:id",
  authMiddleware,
  adminMiddleware,
  adminDeleteListing,
);
router.patch(
  "/listings/:id/approve",
  authMiddleware,
  adminMiddleware,
  approveListing,
);
router.patch(
  "/listings/:id/reject",
  authMiddleware,
  adminMiddleware,
  rejectListing,
);
router.patch(
  "/listings/:id/status",
  authMiddleware,
  adminMiddleware,
  toggleListingStatus,
);
router.patch(
  "/listings/:id/feature",
  authMiddleware,
  adminMiddleware,
  toggleFeatured,
);

// ── Users ────────────────────────────────────────────────────────────────────
router.get("/users", authMiddleware, adminMiddleware, getAllUsers);
router.get("/users/:id", authMiddleware, adminMiddleware, getUserDetail);
router.patch(
  "/users/:id/suspend",
  authMiddleware,
  adminMiddleware,
  toggleSuspendUser,
);
router.delete("/users/:id", authMiddleware, adminMiddleware, deleteUser);

// ── Bookings ─────────────────────────────────────────────────────────────────
router.get("/bookings", authMiddleware, adminMiddleware, getAllBookings);
router.get("/bookings/:id", authMiddleware, adminMiddleware, getBookingDetail);
router.patch(
  "/bookings/:id/status",
  authMiddleware,
  adminMiddleware,
  updateBookingStatus,
);
router.patch(
  "/bookings/:id/flag",
  authMiddleware,
  adminMiddleware,
  toggleBookingFlag,
);
router.patch(
  "/bookings/:id/resolve-dispute",
  authMiddleware,
  adminMiddleware,
  resolveDispute,
);

// ── Payments ─────────────────────────────────────────────────────────────────
router.get("/payments/stats", authMiddleware, adminMiddleware, getPaymentStats);
router.get("/payments", authMiddleware, adminMiddleware, getAllPayments);
router.patch(
  "/payments/:id/status",
  authMiddleware,
  adminMiddleware,
  updatePaymentStatus,
);

// ── Payouts ──────────────────────────────────────────────────────────────────
router.get("/payouts", authMiddleware, adminMiddleware, getPayouts);
router.patch(
  "/payouts/:id/status",
  authMiddleware,
  adminMiddleware,
  updatePayoutStatus,
);

// ── Reviews ──────────────────────────────────────────────────────────────────
router.get("/reviews", authMiddleware, adminMiddleware, adminGetAllReviews);
router.delete(
  "/reviews/:id",
  authMiddleware,
  adminMiddleware,
  adminDeleteReview,
);

export default router;
