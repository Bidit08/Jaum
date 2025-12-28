import express from "express";
import {
  getProfile,
  updateProfile,
  uploadProfilePicture,
  changePassword,
} from "../controllers/userController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.get("/profile", authMiddleware, getProfile);
router.put("/profile", authMiddleware, updateProfile);

router.post(
  "/profile/upload",
  authMiddleware,
  upload.single("image"),
  uploadProfilePicture
);

router.put("/change-password", authMiddleware, changePassword);

export default router;
