// import Vehicle from "../models/Vehicle.js";

// export const createVehicle = async (req, res) => {
//   try {
//     const imagePaths = req.files?.map((file) => `/uploads/${file.filename}`);

//     const vehicle = new Vehicle({
//       ...req.body,
//       owner: req.user._id,
//       images: imagePaths,
//     });

//     await vehicle.save();
//     res.json(vehicle);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to list vehicle" });
//   }
// };

// export const getOwnerVehicles = async (req, res) => {
//   const vehicles = await Vehicle.find({ owner: req.user._id });
//   res.json(vehicles);
// };

// import Listing from "../models/Listing.js";

// /**
//  * CREATE LISTING
//  */
// export const createListing = async (req, res) => {
//   try {
//     const listing = await Listing.create({
//       ...req.body,
//       owner: req.user.id,
//     });

//     res.status(201).json(listing);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: "Failed to create listing" });
//   }
// };

// /**
//  * GET MY LISTINGS
//  */
// export const getMyListings = async (req, res) => {
//   try {
//     const listings = await Listing.find({ owner: req.user.id }).sort({
//       createdAt: -1,
//     });
//     res.json(listings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch listings" });
//   }
// };

// /**
//  * GET SINGLE LISTING
//  */
// export const getListingById = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) return res.status(404).json({ message: "Not found" });

//     res.json(listing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch listing" });
//   }
// };

// /**
//  * UPDATE LISTING
//  */
// export const updateListing = async (req, res) => {
//   try {
//     const listing = await Listing.findOneAndUpdate(
//       { _id: req.params.id, owner: req.user.id },
//       req.body,
//       { new: true }
//     );

//     if (!listing) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     res.json(listing);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update listing" });
//   }
// };

// /**
//  * DELETE LISTING
//  */
// export const deleteListing = async (req, res) => {
//   try {
//     const listing = await Listing.findOneAndDelete({
//       _id: req.params.id,
//       owner: req.user.id,
//     });

//     if (!listing) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     res.json({ message: "Listing deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete listing" });
//   }
// };

// import Listing from "../models/Listing.js";

// /**
//  * CREATE LISTING
//  */
// export const createListing = async (req, res) => {
//   try {
//     const allowedFields = [
//       "listingType",
//       "name",
//       "brand",
//       "model",
//       "year",
//       "description",
//       "fuelType",
//       "transmission",
//       "seats",
//       "mileage",
//       "features",
//       "pricePerDay",
//       "deposit",
//       "location",
//       "availableSeats",
//       "pricePerSeat",
//       "departure",
//       "destination",
//       "departureTime",
//       "rules",
//       "photos",
//     ];

//     const data = {};
//     allowedFields.forEach((field) => {
//       if (req.body[field] !== undefined) {
//         data[field] = req.body[field];
//       }
//     });

//     // 🔹 Ensure photos exist
//     if (!Array.isArray(data.photos) || data.photos.length === 0) {
//       return res.status(400).json({
//         message: "At least one photo is required",
//       });
//     }

//     const listing = await Listing.create({
//       ...data,
//       owner: req.user.id,
//     });

//     res.status(201).json(listing);
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({
//       message: err.message || "Failed to create listing",
//     });
//   }
// };

// /**
//  * UPLOAD LISTING PHOTOS
//  */
// export const uploadListingPhotos = async (req, res) => {
//   try {
//     if (!req.files || req.files.length === 0) {
//       return res.status(400).json({ message: "No files uploaded" });
//     }

//     const photos = req.files.map((file) => `/uploads/${file.filename}`);

//     res.status(201).json({
//       photos,
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Photo upload failed" });
//   }
// };

// /**
//  * GET MY LISTINGS
//  */
// export const getMyListings = async (req, res) => {
//   try {
//     const listings = await Listing.find({ owner: req.user.id }).sort({
//       createdAt: -1,
//     });

//     res.json(listings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch listings" });
//   }
// };

// /**
//  * GET SINGLE LISTING (PUBLIC)
//  */
// export const getListingById = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id).populate(
//       "owner",
//       "name"
//     );

//     if (!listing || !listing.isApproved) {
//       return res.status(404).json({ message: "Listing not available" });
//     }

//     res.json(listing);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch listing" });
//   }
// };

// /**
//  * UPDATE LISTING
//  */
// export const updateListing = async (req, res) => {
//   try {
//     const listing = await Listing.findOne({
//       _id: req.params.id,
//       owner: req.user.id,
//     });

//     if (!listing) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     Object.assign(listing, req.body);
//     await listing.save();

//     res.json(listing);
//   } catch (err) {
//     res.status(400).json({ message: "Failed to update listing" });
//   }
// };

// /**
//  * DELETE LISTING
//  */
// export const deleteListing = async (req, res) => {
//   try {
//     const listing = await Listing.findOneAndDelete({
//       _id: req.params.id,
//       owner: req.user.id,
//     });

//     if (!listing) {
//       return res.status(403).json({ message: "Unauthorized" });
//     }

//     res.json({ message: "Listing deleted successfully" });
//   } catch (err) {
//     res.status(500).json({ message: "Failed to delete listing" });
//   }
// };

// export const getAllListings = async (req, res) => {
//   try {
//     const listings = await Listing.find({
//       isApproved: true,
//       status: "active",
//     })
//       .sort({ createdAt: -1 })
//       .select("-__v");

//     res.json(listings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch listings" });
//   }
// };

// import Listing from "../models/Listing.js";

// /**
//  * CREATE LISTING (User)
//  */
// export const createListing = async (req, res) => {
//   try {
//     if (!req.body.photos || req.body.photos.length === 0) {
//       return res.status(400).json({ message: "At least one photo required" });
//     }

//     const listing = await Listing.create({
//       ...req.body,
//       owner: req.user.id,
//       isApproved: false, // 🔒 admin approval required
//     });

//     res.status(201).json(listing);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// /**
//  * UPLOAD LISTING PHOTOS
//  */
// export const uploadListingPhotos = async (req, res) => {
//   if (!req.files || req.files.length === 0) {
//     return res.status(400).json({ message: "No photos uploaded" });
//   }

//   const photos = req.files.map((file) => `/uploads/${file.filename}`);

//   res.status(201).json({ photos });
// };

// /**
//  * GET MY LISTINGS (User dashboard)
//  */
// export const getMyListings = async (req, res) => {
//   const listings = await Listing.find({ owner: req.user.id }).sort({
//     createdAt: -1,
//   });

//   res.json(listings);
// };

// /**
//  * GET SINGLE LISTING (PUBLIC)
//  */
// export const getListingById = async (req, res) => {
//   const listing = await Listing.findOne({
//     _id: req.params.id,
//     isApproved: true,
//   }).populate("owner", "name");

//   if (!listing) {
//     return res.status(404).json({ message: "Listing not available" });
//   }

//   res.json(listing);
// };

// /**
//  * GET ALL APPROVED LISTINGS (PUBLIC)
//  */
// export const getAllListings = async (req, res) => {
//   const listings = await Listing.find({
//     isApproved: true,
//     status: "active",
//   }).sort({ createdAt: -1 });

//   res.json(listings);
// };

// /**
//  * ADMIN – GET PENDING LISTINGS
//  */
// export const getPendingListings = async (req, res) => {
//   const listings = await Listing.find({ isApproved: false })
//     .populate("owner", "name email")
//     .sort({ createdAt: -1 });

//   res.json(listings);
// };

// /**
//  * ADMIN – APPROVE LISTING
//  */
// export const approveListing = async (req, res) => {
//   const listing = await Listing.findById(req.params.id);

//   if (!listing) {
//     return res.status(404).json({ message: "Listing not found" });
//   }

//   listing.isApproved = true;
//   await listing.save();

//   res.json({ message: "Listing approved", listing });
// };

// /**
//  * DELETE LISTING
//  */
// export const deleteListing = async (req, res) => {
//   const listing = await Listing.findOneAndDelete({
//     _id: req.params.id,
//     owner: req.user.id,
//   });

//   if (!listing) {
//     return res.status(403).json({ message: "Unauthorized" });
//   }

//   res.json({ message: "Listing deleted" });
// };

import Listing from "../models/Listing.js";

/* =======================
   CREATE LISTING
======================= */
export const createListing = async (req, res) => {
  try {
    const allowedFields = [
      "listingType",
      "name",
      "brand",
      "model",
      "year",
      "description",
      "fuelType",
      "transmission",
      "seats",
      "mileage",
      "features",
      "pricePerDay",
      "deposit",
      "location",
      "availableSeats",
      "pricePerSeat",
      "departure",
      "destination",
      "departureTime",
      "rules",
      "photos",
    ];

    const data = {};
    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        data[field] = req.body[field];
      }
    });

    if (!Array.isArray(data.photos) || data.photos.length === 0) {
      return res.status(400).json({
        message: "At least one photo is required",
      });
    }

    const listing = await Listing.create({
      ...data,
      owner: req.user.id,
      isApproved: false, // admin approval required
    });

    res.status(201).json(listing);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: err.message });
  }
};

/* =======================
   UPLOAD PHOTOS
======================= */
export const uploadListingPhotos = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No photos uploaded" });
    }

    const photos = req.files.map((file) => `/uploads/${file.filename}`);

    res.status(201).json({ photos });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Photo upload failed" });
  }
};

/* =======================
   GET MY LISTINGS
======================= */
export const getMyListings = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const listings = await Listing.find({
      owner: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    console.error("getMyListings error:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

/* =======================
   GET MY LISTING BY ID (EDIT)
======================= */
export const getMyListingById = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listing" });
  }
};

/* =======================
   GET ALL PUBLIC LISTINGS
======================= */
export const getAllListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      isApproved: true,
      $or: [
        { status: "active" },
        { status: { $exists: false } }, // ✅ IMPORTANT FIX
      ],
    }).sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    console.error("getAllListings error:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

/* =======================
   GET SINGLE LISTING
======================= */
export const getListingById = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner",
      "name"
    );

    if (!listing || !listing.isApproved) {
      return res.status(404).json({ message: "Listing not available" });
    }

    res.json(listing);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch listing" });
  }
};

/* =======================
   UPDATE LISTING  ✅ FIX
======================= */
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findOne({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!listing) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    Object.assign(listing, req.body);
    listing.isApproved = false; // re-approval required after edit
    await listing.save();

    res.json(listing);
  } catch (err) {
    res.status(400).json({ message: "Failed to update listing" });
  }
};

/* =======================
   DELETE LISTING
======================= */
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findOneAndDelete({
      _id: req.params.id,
      owner: req.user.id,
    });

    if (!listing) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    res.json({ message: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete listing" });
  }
};

// /* =======================
//    ADMIN: GET PENDING
// ======================= */
// export const getPendingListings = async (req, res) => {
//   try {
//     const listings = await Listing.find({
//       isApproved: false,
//     }).sort({ createdAt: -1 });

//     res.json(listings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch pending listings" });
//   }
// };

// /* =======================
//    ADMIN: APPROVE LISTING
// ======================= */
// export const approveListing = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id);

//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found" });
//     }

//     listing.isApproved = true;
//     await listing.save();

//     res.json({ message: "Listing approved", listing });
//   } catch (err) {
//     res.status(500).json({ message: "Approval failed" });
//   }
// };
