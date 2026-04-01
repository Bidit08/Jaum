// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import { createBooking } from "../controllers/bookingController.js";

// const router = express.Router();

// router.post("/", authMiddleware, createBooking);

// export default router;

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   createBooking,
//   getMyBookings,
// } from "../controllers/bookingController.js";

// const router = express.Router();

// router.post("/", authMiddleware, createBooking);
// router.get("/my", authMiddleware, getMyBookings);

// export default router;

import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  createBooking,
  getMyBookings,

  // OWNER ACTIONS
  getOwnerBookings,
  approveBooking,
  rejectBooking,
  completeBooking,
  getBlockedDates,
} from "../controllers/bookingController.js";

const router = express.Router();

/* =========================
   USER ROUTES
========================= */

// ➕ Create booking (user books vehicle / seat)
router.post("/", authMiddleware, createBooking);

// 📖 Get my bookings (user side)
router.get("/my", authMiddleware, getMyBookings);

/* =========================
   OWNER ROUTES
========================= */

// 📥 Incoming bookings for owner (pending only)
router.get("/owner", authMiddleware, getOwnerBookings);

// ✅ Approve booking
router.put("/:id/approve", authMiddleware, approveBooking);

// ❌ Reject booking
router.put("/:id/reject", authMiddleware, rejectBooking);

// ✅ Complete booking (mark as finished)
router.put("/:id/complete", authMiddleware, completeBooking);

router.get("/blocked/:listingId", getBlockedDates);

export default router;
