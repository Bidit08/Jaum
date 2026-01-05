// import express from "express";
// import multer from "multer";
// import authMiddleware from "../middleware/authMiddleware.js";
// import {
//   createVehicle,
//   getOwnerVehicles,
// } from "../controllers/vehicleController.js";

// const router = express.Router();

// const upload = multer({ dest: "uploads/" });

// router.post("/", authMiddleware, upload.array("images", 6), createVehicle);
// router.get("/my-vehicles", authMiddleware, getOwnerVehicles);

// export default router;

// import express from "express";
// import {
//   createListing,
//   getMyListings,
//   getListingById,
//   updateListing,
//   deleteListing,
// } from "../controllers/listingController.js";
// import authMiddleware from "../middleware/authMiddleware.js";

// const router = express.Router();

// router.post("/", authMiddleware, createListing);
// router.get("/my", authMiddleware, getMyListings);
// router.get("/:id", getListingById);
// router.put("/:id", authMiddleware, updateListing);
// router.delete("/:id", authMiddleware, deleteListing);

// export default router;

// import express from "express";
// import {
//   createListing,
//   getMyListings,
//   getListingById,
//   updateListing,
//   deleteListing,
//   uploadListingPhotos,
// } from "../controllers/listingController.js";

// import authMiddleware from "../middleware/authMiddleware.js";
// import upload from "../middleware/uploadMiddleware.js";

// const router = express.Router();

// // Create listing (expects photo URLs already)
// router.post("/", authMiddleware, createListing);

// // 🔹 Upload listing photos
// router.post(
//   "/upload/photos",
//   authMiddleware,
//   upload.array("photos", 10),
//   uploadListingPhotos
// );

// router.get("/my", authMiddleware, getMyListings);
// router.get("/:id", getListingById);
// router.put("/:id", authMiddleware, updateListing);
// router.delete("/:id", authMiddleware, deleteListing);
// router.get("/", getAllListings);

// export default router;

import express from "express";
import {
  createListing,
  uploadListingPhotos,
  getMyListings,
  getListingById,
  updateListing,
  deleteListing,
  getAllListings, // ✅ IMPORT WAS MISSING
} from "../controllers/listingController.js";

import authMiddleware from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

/* =======================
   PUBLIC ROUTES
======================= */

// 🌍 Get all active & approved listings
router.get("/", getAllListings);

// 🌍 Get single listing by ID
router.get("/:id", getListingById);

/* =======================
   AUTHENTICATED ROUTES
======================= */

// ➕ Create listing (expects photo URLs)
router.post("/", authMiddleware, createListing);

// 📸 Upload listing photos
router.post(
  "/upload/photos",
  authMiddleware,
  upload.array("photos", 10),
  uploadListingPhotos
);

// 👤 Get my listings
router.get("/my", authMiddleware, getMyListings);

// ✏️ Update listing
router.put("/:id", authMiddleware, updateListing);

// 🗑️ Delete listing
router.delete("/:id", authMiddleware, deleteListing);

export default router;
