// const express = require("express");
// const router = express.Router();
// const Visit = require("../models/Visit");
// const Listing = require("../models/Listing"); // change if your listing model file is different
// const auth = require("../middleware/auth"); // your JWT middleware
// const adminAuth = require("../middleware/adminAuth"); // if you already have this

// // POST /api/visits
// router.post("/", auth, async (req, res) => {
//   try {
//     const { vehicleId, visitDate, note } = req.body;

//     if (!vehicleId || !visitDate) {
//       return res
//         .status(400)
//         .json({ message: "vehicleId and visitDate are required" });
//     }

//     const selectedDate = new Date(visitDate);
//     if (isNaN(selectedDate.getTime())) {
//       return res.status(400).json({ message: "Invalid date/time" });
//     }

//     if (selectedDate < new Date()) {
//       return res
//         .status(400)
//         .json({ message: "Visit date must be in the future" });
//     }

//     const vehicle = await Listing.findById(vehicleId);
//     if (!vehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     // ownerId from listing (adjust field name if your listing uses userId/owner)
//     const ownerId = vehicle.ownerId || vehicle.userId;
//     if (!ownerId) {
//       return res.status(400).json({ message: "Vehicle owner not found" });
//     }

//     // Prevent duplicate pending visit by same user for same vehicle/date (optional)
//     const existing = await Visit.findOne({
//       userId: req.user.id,
//       vehicleId,
//       status: { $in: ["REQUESTED", "APPROVED"] },
//       visitDate: selectedDate,
//     });

//     if (existing) {
//       return res
//         .status(409)
//         .json({ message: "You already requested this slot" });
//     }

//     const visit = await Visit.create({
//       userId: req.user.id,
//       vehicleId,
//       ownerId,
//       visitDate: selectedDate,
//       note: note || "",
//     });

//     res.status(201).json({
//       message: "Visit request sent successfully",
//       visit,
//     });
//   } catch (err) {
//     console.error("Create visit error:", err);
//     res.status(500).json({ message: "Server error creating visit request" });
//   }
// });

// // GET /api/visits/my
// router.get("/my", auth, async (req, res) => {
//   try {
//     const visits = await Visit.find({ userId: req.user.id })
//       .populate("vehicleId", "name brand photos location")
//       .sort({ createdAt: -1 });

//     res.json(visits);
//   } catch (err) {
//     console.error("Fetch my visits error:", err);
//     res.status(500).json({ message: "Server error fetching visits" });
//   }
// });

// // GET /api/visits/incoming
// router.get("/incoming", auth, async (req, res) => {
//   try {
//     const visits = await Visit.find({ ownerId: req.user.id })
//       .populate("userId", "name email")
//       .populate("vehicleId", "name brand photos location")
//       .sort({ createdAt: -1 });

//     res.json(visits);
//   } catch (err) {
//     console.error("Fetch incoming visits error:", err);
//     res.status(500).json({ message: "Server error fetching incoming visits" });
//   }
// });

// // PATCH /api/visits/:id/status
// router.patch("/:id/status", auth, async (req, res) => {
//   try {
//     const { status, adminNote, visitDate } = req.body;

//     const allowed = [
//       "APPROVED",
//       "REJECTED",
//       "RESCHEDULED",
//       "COMPLETED",
//       "CANCELLED",
//     ];
//     if (!allowed.includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const visit = await Visit.findById(req.params.id);
//     if (!visit) {
//       return res.status(404).json({ message: "Visit request not found" });
//     }

//     // Only owner/admin can update
//     // If admin role exists, add role check here as well
//     if (
//       String(visit.ownerId) !== String(req.user.id) &&
//       req.user.role !== "ADMIN"
//     ) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     visit.status = status;
//     if (adminNote) visit.adminNote = adminNote;

//     // Optional reschedule time
//     if (status === "RESCHEDULED" && visitDate) {
//       const newDate = new Date(visitDate);
//       if (!isNaN(newDate.getTime())) visit.visitDate = newDate;
//     }

//     await visit.save();

//     res.json({ message: "Visit status updated", visit });
//   } catch (err) {
//     console.error("Update visit status error:", err);
//     res.status(500).json({ message: "Server error updating visit" });
//   }
// });

// const express = require("express");
// const router = express.Router();
// const {
//   createVisitRequest,
//   getMyVisitRequests,
//   getOwnerVisitRequests,
//   updateVisitStatus,
// } = require("../controllers/visitController");

// const { protect } = require("../middleware/authMiddleware");
// // If your middleware name is different (e.g., verifyToken), replace it.

// router.post("/", protect, createVisitRequest);
// router.get("/my", protect, getMyVisitRequests);
// router.get("/owner", protect, getOwnerVisitRequests);
// router.patch("/:visitId/status", protect, updateVisitStatus);

// module.exports = router;

// import express from "express";
// import Visit from "../models/Visit.js";
// import Listing from "../models/Listing.js"; // change if your file name differs
// import auth from "../middleware/auth.js"; // change path if needed

// const router = express.Router();

// // POST /api/visits
// router.post("/", auth, async (req, res) => {
//   try {
//     const { vehicleId, visitDate, note } = req.body;

//     if (!vehicleId || !visitDate) {
//       return res
//         .status(400)
//         .json({ message: "vehicleId and visitDate are required" });
//     }

//     const selectedDate = new Date(visitDate);
//     if (isNaN(selectedDate.getTime())) {
//       return res.status(400).json({ message: "Invalid date/time" });
//     }

//     if (selectedDate < new Date()) {
//       return res
//         .status(400)
//         .json({ message: "Visit date must be in the future" });
//     }

//     const vehicle = await Listing.findById(vehicleId);
//     if (!vehicle) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     const ownerId = vehicle.ownerId || vehicle.userId;
//     if (!ownerId) {
//       return res.status(400).json({ message: "Vehicle owner not found" });
//     }

//     const existing = await Visit.findOne({
//       userId: req.user.id,
//       vehicleId,
//       status: { $in: ["REQUESTED", "APPROVED"] },
//       visitDate: selectedDate,
//     });

//     if (existing) {
//       return res
//         .status(409)
//         .json({ message: "You already requested this slot" });
//     }

//     const visit = await Visit.create({
//       userId: req.user.id,
//       vehicleId,
//       ownerId,
//       visitDate: selectedDate,
//       note: note || "",
//     });

//     res.status(201).json({
//       message: "Visit request sent successfully",
//       visit,
//     });
//   } catch (err) {
//     console.error("Create visit error:", err);
//     res.status(500).json({ message: "Server error creating visit request" });
//   }
// });

// // GET /api/visits/my
// router.get("/my", auth, async (req, res) => {
//   try {
//     const visits = await Visit.find({ userId: req.user.id })
//       .populate("vehicleId", "name brand photos location")
//       .sort({ createdAt: -1 });

//     res.json(visits);
//   } catch (err) {
//     console.error("Fetch my visits error:", err);
//     res.status(500).json({ message: "Server error fetching visits" });
//   }
// });

// // GET /api/visits/incoming
// router.get("/incoming", auth, async (req, res) => {
//   try {
//     const visits = await Visit.find({ ownerId: req.user.id })
//       .populate("userId", "name email")
//       .populate("vehicleId", "name brand photos location")
//       .sort({ createdAt: -1 });

//     res.json(visits);
//   } catch (err) {
//     console.error("Fetch incoming visits error:", err);
//     res.status(500).json({ message: "Server error fetching incoming visits" });
//   }
// });

// // PATCH /api/visits/:id/status
// router.patch("/:id/status", auth, async (req, res) => {
//   try {
//     const { status, adminNote, visitDate } = req.body;

//     const allowed = [
//       "APPROVED",
//       "REJECTED",
//       "RESCHEDULED",
//       "COMPLETED",
//       "CANCELLED",
//     ];
//     if (!allowed.includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const visit = await Visit.findById(req.params.id);
//     if (!visit) {
//       return res.status(404).json({ message: "Visit request not found" });
//     }

//     if (
//       String(visit.ownerId) !== String(req.user.id) &&
//       req.user.role !== "ADMIN"
//     ) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     visit.status = status;
//     if (adminNote) visit.adminNote = adminNote;

//     if (status === "RESCHEDULED" && visitDate) {
//       const newDate = new Date(visitDate);
//       if (!isNaN(newDate.getTime())) visit.visitDate = newDate;
//     }

//     await visit.save();

//     res.json({ message: "Visit status updated", visit });
//   } catch (err) {
//     console.error("Update visit status error:", err);
//     res.status(500).json({ message: "Server error updating visit" });
//   }
// });

// export default router;

// import express from "express";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   createVisit,
//   getMyVisits,
//   getIncomingVisits,
//   updateVisitStatus,
// } from "../controllers/visitController.js";

// const router = express.Router();

// router.post("/", authMiddleware, createVisit);
// router.get("/my", authMiddleware, getMyVisits);
// router.get("/incoming", authMiddleware, getIncomingVisits);
// router.patch("/:id/status", authMiddleware, updateVisitStatus);

// export default router;

import express from "express";
import {
  createVisit,
  getMyVisits,
  getIncomingVisits,
  updateVisitStatus,
} from "../controllers/visitController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createVisit);
router.get("/my", getMyVisits);
router.get("/incoming", getIncomingVisits);
router.patch("/:id/status", updateVisitStatus);

export default router;
