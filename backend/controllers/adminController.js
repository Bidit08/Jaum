// import Listing from "../models/Listing.js";

// /**
//  * GET ALL PENDING LISTINGS (ADMIN)
//  */
// export const getPendingListings = async (req, res) => {
//   try {
//     const listings = await Listing.find({
//       isApproved: false,
//     })
//       .populate("owner", "name email")
//       .sort({ createdAt: -1 });

//     res.json(listings);
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to fetch pending listings",
//     });
//   }
// };

// /**
//  * APPROVE LISTING (ADMIN)
//  */
// export const approveListing = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id);

//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found" });
//     }

//     listing.isApproved = true;
//     listing.status = "active";
//     await listing.save();

//     res.json({
//       message: "Listing approved successfully",
//       listing,
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to approve listing",
//     });
//   }
// };

// /**
//  * DELETE / REJECT LISTING (ADMIN)
//  */
// export const deleteListing = async (req, res) => {
//   try {
//     const listing = await Listing.findByIdAndDelete(req.params.id);

//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found" });
//     }

//     res.json({
//       message: "Listing deleted successfully",
//     });
//   } catch (err) {
//     res.status(500).json({
//       message: "Failed to delete listing",
//     });
//   }
// };

// import Listing from "../models/Listing.js";

// /* =======================
//    GET PENDING LISTINGS
// ======================= */
// export const getPendingListings = async (req, res) => {
//   try {
//     const listings = await Listing.find({
//       isApproved: false,
//     })
//       .populate("owner", "name email")
//       .sort({ createdAt: -1 });

//     res.json(listings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch pending listings" });
//   }
// };

// /* =======================
//    APPROVE LISTING
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

// /* =======================
//    REJECT LISTING
// ======================= */
// export const rejectListing = async (req, res) => {
//   try {
//     const listing = await Listing.findByIdAndDelete(req.params.id);

//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found" });
//     }

//     res.json({ message: "Listing rejected & deleted" });
//   } catch (err) {
//     res.status(500).json({ message: "Reject failed" });
//   }
// };

import Listing from "../models/Listing.js";

/* =======================
   GET PENDING LISTINGS
======================= */
export const getPendingListings = async (req, res) => {
  try {
    const listings = await Listing.find({
      isApproved: false,
    }).sort({ createdAt: -1 });

    res.json(listings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch pending listings" });
  }
};

/* =======================
   APPROVE LISTING
======================= */
export const approveListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    listing.isApproved = true;
    await listing.save();

    res.json({ message: "Listing approved", listing });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/* =======================
   REJECT / DELETE LISTING
======================= */
export const rejectListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json({ message: "Listing rejected & deleted" });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
};
