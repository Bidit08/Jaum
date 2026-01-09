import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { createBooking } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);

export default router;
