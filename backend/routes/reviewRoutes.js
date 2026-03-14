import express from "express";
import {
  createReview,
  getListingReviews,
  updateReview,
  deleteReview,
} from "../controllers/reviewController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/listing/:listingId", getListingReviews);

router.post("/", protect, createReview);
router.put("/:id", protect, updateReview);
router.delete("/:id", protect, deleteReview);

export default router;
