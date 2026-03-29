import express from "express";
import multer from "multer";
import path from "path";
import authMiddleware from "../middleware/authMiddleware.js";
import {
  uploadBeforeImages,
  uploadAfterImages,
  getDamageReport,
  submitDamageReview,
  adminGetAllReports,
} from "../controllers/damageController.js";

const router = express.Router();

// Custom storage for damage reports to keep them in a subfolder
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/damage/");
  },
  filename(req, file, cb) {
    // Using user ID to prevent name collisions
    cb(
      null,
      `${req.user._id}-${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`,
    );
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit per file
  fileFilter: (req, file, cb) => {
    const allowed = /jpg|jpeg|png|webp/;
    const ext = allowed.test(path.extname(file.originalname).toLowerCase());
    const mime = allowed.test(file.mimetype);
    if (ext && mime) cb(null, true);
    else cb(new Error("Images only (jpg, png, webp)"));
  },
});

/* ─── DAMAGE REPORT ROUTES ───────────────────────────────────────── */

// 📤 Upload "Before" images (Owner only)
router.post(
  "/:bookingId/before",
  authMiddleware,
  upload.array("images", 10),
  uploadBeforeImages,
);

// 📤 Upload "After" images (Renter only)
router.post(
  "/:bookingId/after",
  authMiddleware,
  upload.array("images", 10),
  uploadAfterImages,
);

// 📋 Get all reports (Admin only - controller handles role check)
router.get("/admin/all", authMiddleware, adminGetAllReports);

// 📖 Get report for a specific booking (Owner or Renter)
router.get("/:bookingId", authMiddleware, getDamageReport);

// ✍️ Submit damage review/verdict (Owner only)
router.patch("/:bookingId/review", authMiddleware, submitDamageReview);

export default router;
