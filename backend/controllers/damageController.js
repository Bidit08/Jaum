// import DamageReport from "../models/DamageReport.js";
// import Booking from "../models/Booking.js";
// import fs from "fs";

// /* ─── Helper ────────────────────────────────────────────────────── */
// const normalizeFilePath = (filename) => `uploads/damage/${filename}`;

// /* ─────────────────────────────────────────────────────────────────
//    1. UPLOAD BEFORE IMAGES  (owner, booking must be confirmed)
//    POST /api/damage/:bookingId/before
// ──────────────────────────────────────────────────────────────────── */
// export const uploadBeforeImages = async (req, res) => {
//   try {
//     const { bookingId } = req.params;

//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     // Only the owner of the listing can upload before images
//     if (booking.owner.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Only the vehicle owner can upload before images" });
//     }

//     // Booking must be confirmed (paid & active)
//     if (booking.status !== "confirmed") {
//       return res
//         .status(400)
//         .json({ message: "Booking must be confirmed before uploading images" });
//     }

//     // Find or create damage report
//     let report = await DamageReport.findOne({ booking: bookingId });

//     // If before images were already uploaded, prevent re-upload
//     if (report && report.beforeLockedAt) {
//       return res
//         .status(400)
//         .json({
//           message: "Before images are already locked and cannot be changed",
//         });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Please upload at least one image" });
//     }

//     const imagePaths = req.files.map((f) => normalizeFilePath(f.filename));

//     if (!report) {
//       report = new DamageReport({ booking: bookingId });
//     }

//     report.beforeImages = imagePaths;
//     report.beforeLockedAt = new Date();
//     report.reportStatus = "before-uploaded";
//     await report.save();

//     res
//       .status(200)
//       .json({ message: "Before images uploaded successfully", report });
//   } catch (err) {
//     console.error("uploadBeforeImages error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /* ─────────────────────────────────────────────────────────────────
//    2. UPLOAD AFTER IMAGES  (renter, booking must be completed)
//    POST /api/damage/:bookingId/after
// ──────────────────────────────────────────────────────────────────── */
// export const uploadAfterImages = async (req, res) => {
//   try {
//     const { bookingId } = req.params;

//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     // Only the renter can upload after images
//     if (booking.user.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({ message: "Only the renter can upload return images" });
//     }

//     // Booking must be completed
//     if (booking.status !== "completed") {
//       return res
//         .status(400)
//         .json({
//           message:
//             "Return images can only be uploaded after the booking is completed",
//         });
//     }

//     let report = await DamageReport.findOne({ booking: bookingId });

//     // Check if after images already uploaded
//     if (report && report.afterImages.length > 0) {
//       return res
//         .status(400)
//         .json({ message: "Return images have already been submitted" });
//     }

//     if (!req.files || req.files.length === 0) {
//       return res
//         .status(400)
//         .json({ message: "Please upload at least one image" });
//     }

//     const imagePaths = req.files.map((f) => normalizeFilePath(f.filename));

//     if (!report) {
//       report = new DamageReport({ booking: bookingId });
//     }

//     report.afterImages = imagePaths;
//     report.reportStatus = "after-uploaded";
//     await report.save();

//     res
//       .status(200)
//       .json({ message: "Return images uploaded successfully", report });
//   } catch (err) {
//     console.error("uploadAfterImages error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /* ─────────────────────────────────────────────────────────────────
//    3. GET DAMAGE REPORT  (owner or renter)
//    GET /api/damage/:bookingId
// ──────────────────────────────────────────────────────────────────── */
// export const getDamageReport = async (req, res) => {
//   try {
//     const { bookingId } = req.params;

//     const booking = await Booking.findById(bookingId).populate(
//       "listing",
//       "name photos brand model",
//     );
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     const userId = req.user._id.toString();
//     const isOwner = booking.owner.toString() === userId;
//     const isRenter = booking.user.toString() === userId;
//     const isAdmin = req.user.role === "admin";

//     if (!isOwner && !isRenter && !isAdmin) {
//       return res.status(403).json({ message: "Access denied" });
//     }

//     let report = await DamageReport.findOne({ booking: bookingId });

//     // Return empty report stub if not created yet
//     if (!report) {
//       return res.status(200).json({
//         bookingId,
//         booking: { listing: booking.listing, status: booking.status },
//         report: null,
//         isOwner,
//         isRenter,
//       });
//     }

//     res.status(200).json({
//       bookingId,
//       booking: { listing: booking.listing, status: booking.status },
//       report,
//       isOwner,
//       isRenter,
//     });
//   } catch (err) {
//     console.error("getDamageReport error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /* ─────────────────────────────────────────────────────────────────
//    4. SUBMIT DAMAGE REVIEW  (owner only)
//    PATCH /api/damage/:bookingId/review
// ──────────────────────────────────────────────────────────────────── */
// export const submitDamageReview = async (req, res) => {
//   try {
//     const { bookingId } = req.params;
//     const { damageStatus, ownerNotes } = req.body;

//     const booking = await Booking.findById(bookingId);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     if (booking.owner.toString() !== req.user._id.toString()) {
//       return res
//         .status(403)
//         .json({
//           message: "Only the vehicle owner can submit the damage review",
//         });
//     }

//     const report = await DamageReport.findOne({ booking: bookingId });
//     if (!report)
//       return res
//         .status(404)
//         .json({ message: "No damage report found for this booking" });

//     if (report.afterImages.length === 0) {
//       return res
//         .status(400)
//         .json({
//           message:
//             "Renter must upload return images before review can be submitted",
//         });
//     }

//     const allowedStatuses = ["none", "minor", "major"];
//     if (!allowedStatuses.includes(damageStatus)) {
//       return res
//         .status(400)
//         .json({
//           message: "Invalid damage status. Must be: none, minor, or major",
//         });
//     }

//     report.damageStatus = damageStatus;
//     report.ownerNotes = ownerNotes || "";
//     report.reportStatus = "resolved";
//     await report.save();

//     res
//       .status(200)
//       .json({ message: "Damage review submitted successfully", report });
//   } catch (err) {
//     console.error("submitDamageReview error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

// /* ─────────────────────────────────────────────────────────────────
//    5. ADMIN – GET ALL DAMAGE REPORTS
//    GET /api/damage/admin/all
// ──────────────────────────────────────────────────────────────────── */
// export const adminGetAllReports = async (req, res) => {
//   try {
//     const reports = await DamageReport.find({})
//       .populate({
//         path: "booking",
//         populate: [
//           { path: "listing", select: "name photos brand model" },
//           { path: "user", select: "name email profilePicture" },
//           { path: "owner", select: "name email profilePicture" },
//         ],
//       })
//       .sort({ createdAt: -1 });

//     res.status(200).json(reports);
//   } catch (err) {
//     console.error("adminGetAllReports error:", err);
//     res.status(500).json({ message: "Server error", error: err.message });
//   }
// };

import DamageReport from "../models/DamageReport.js";
import Booking from "../models/Booking.js";
import User from "../models/User.js";
import { createNotification } from "../utils/notificationHelper.js";
import fs from "fs";

/* ─── Helper ────────────────────────────────────────────────────── */
const normalizeFilePath = (filename) => `uploads/damage/${filename}`;

/* ─────────────────────────────────────────────────────────────────
   1. UPLOAD BEFORE IMAGES  (owner, booking must be confirmed)
   POST /api/damage/:bookingId/before
──────────────────────────────────────────────────────────────────── */
export const uploadBeforeImages = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only the owner of the listing can upload before images
    if (booking.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the vehicle owner can upload before images" });
    }

    // Booking must be confirmed (paid & active)
    if (booking.status !== "confirmed") {
      return res
        .status(400)
        .json({ message: "Booking must be confirmed before uploading images" });
    }

    // Find or create damage report
    let report = await DamageReport.findOne({ booking: bookingId });

    // If before images were already uploaded, prevent re-upload
    if (report && report.beforeLockedAt) {
      return res
        .status(400)
        .json({
          message: "Before images are already locked and cannot be changed",
        });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    const imagePaths = req.files.map((f) => normalizeFilePath(f.filename));

    if (!report) {
      report = new DamageReport({ booking: bookingId });
    }

    report.beforeImages = imagePaths;
    report.beforeLockedAt = new Date();
    report.reportStatus = "before-uploaded";
    await report.save();

    res
      .status(200)
      .json({ message: "Before images uploaded successfully", report });
  } catch (err) {
    console.error("uploadBeforeImages error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ─────────────────────────────────────────────────────────────────
   2. UPLOAD AFTER IMAGES  (renter, booking must be completed)
   POST /api/damage/:bookingId/after
──────────────────────────────────────────────────────────────────── */
export const uploadAfterImages = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Only the renter can upload after images
    if (booking.user.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Only the renter can upload return images" });
    }

    // Booking must be completed
    if (booking.status !== "completed") {
      return res
        .status(400)
        .json({
          message:
            "Return images can only be uploaded after the booking is completed",
        });
    }

    let report = await DamageReport.findOne({ booking: bookingId });

    // Check if after images already uploaded
    if (report && report.afterImages.length > 0) {
      return res
        .status(400)
        .json({ message: "Return images have already been submitted" });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ message: "Please upload at least one image" });
    }

    const imagePaths = req.files.map((f) => normalizeFilePath(f.filename));

    if (!report) {
      report = new DamageReport({ booking: bookingId });
    }

    report.afterImages = imagePaths;
    report.reportStatus = "after-uploaded";
    await report.save();

    res
      .status(200)
      .json({ message: "Return images uploaded successfully", report });
  } catch (err) {
    console.error("uploadAfterImages error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ─────────────────────────────────────────────────────────────────
   3. GET DAMAGE REPORT  (owner or renter)
   GET /api/damage/:bookingId
──────────────────────────────────────────────────────────────────── */
export const getDamageReport = async (req, res) => {
  try {
    const { bookingId } = req.params;

    const booking = await Booking.findById(bookingId).populate(
      "listing",
      "name photos brand model",
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    const userId = req.user._id.toString();
    const isOwner = booking.owner.toString() === userId;
    const isRenter = booking.user.toString() === userId;
    const isAdmin = req.user.role === "admin";

    if (!isOwner && !isRenter && !isAdmin) {
      return res.status(403).json({ message: "Access denied" });
    }

    let report = await DamageReport.findOne({ booking: bookingId });

    // Return empty report stub if not created yet
    if (!report) {
      return res.status(200).json({
        bookingId,
        booking: { listing: booking.listing, status: booking.status },
        report: null,
        isOwner,
        isRenter,
      });
    }

    res.status(200).json({
      bookingId,
      booking: { listing: booking.listing, status: booking.status },
      report,
      isOwner,
      isRenter,
    });
  } catch (err) {
    console.error("getDamageReport error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ─────────────────────────────────────────────────────────────────
   4. SUBMIT DAMAGE REVIEW  (owner only)
   PATCH /api/damage/:bookingId/review
──────────────────────────────────────────────────────────────────── */
export const submitDamageReview = async (req, res) => {
  try {
    const { bookingId } = req.params;
    const { damageStatus, ownerNotes } = req.body;

    const booking = await Booking.findById(bookingId).populate(
      "listing",
      "name",
    );
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.owner.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({
          message: "Only the vehicle owner can submit the damage review",
        });
    }

    const report = await DamageReport.findOne({ booking: bookingId });
    if (!report)
      return res
        .status(404)
        .json({ message: "No damage report found for this booking" });

    if (report.afterImages.length === 0) {
      return res
        .status(400)
        .json({
          message:
            "Renter must upload return images before review can be submitted",
        });
    }

    const allowedStatuses = ["none", "minor", "major"];
    if (!allowedStatuses.includes(damageStatus)) {
      return res
        .status(400)
        .json({
          message: "Invalid damage status. Must be: none, minor, or major",
        });
    }

    report.damageStatus = damageStatus;
    report.ownerNotes = ownerNotes || "";
    report.reportStatus = "resolved";
    await report.save();

    // 🔔 Create notifications
    try {
      // 1. Notify the renter
      await createNotification({
        user: booking.user,
        title: "Damage Review Submitted",
        message: `The owner reported "${damageStatus}" damage for your booking of ${booking.listing?.name || "the vehicle"}.`,
        type: "system",
        link: "/dashboard/reports",
      });

      // 2. If there is damage (minor or major), notify the Admins
      if (damageStatus !== "none") {
        const admins = await User.find({ role: "admin" });
        for (const admin of admins) {
          await createNotification({
            user: admin._id,
            title: "Damage Reported",
            message: `Owner reported "${damageStatus}" damage for booking of ${booking.listing?.name || "a vehicle"} (Booking #${bookingId}).`,
            type: "system",
            link: "/admin/damage-reports",
          });
        }
      }
    } catch (err) {
      console.error("Failed to create damage notifications:", err.message);
    }

    res
      .status(200)
      .json({ message: "Damage review submitted successfully", report });
  } catch (err) {
    console.error("submitDamageReview error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ─────────────────────────────────────────────────────────────────
   5. ADMIN – GET ALL DAMAGE REPORTS
   GET /api/damage/admin/all
──────────────────────────────────────────────────────────────────── */
export const adminGetAllReports = async (req, res) => {
  try {
    const reports = await DamageReport.find({})
      .populate({
        path: "booking",
        populate: [
          { path: "listing", select: "name photos brand model" },
          { path: "user", select: "name email profilePicture" },
          { path: "owner", select: "name email profilePicture" },
        ],
      })
      .sort({ createdAt: -1 });

    res.status(200).json(reports);
  } catch (err) {
    console.error("adminGetAllReports error:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
