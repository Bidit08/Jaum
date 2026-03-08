// const Visit = require("../models/Visit");
// const Listing = require("../models/Listing"); // change if your listing model is named differently

// // Create a visit request (User)
// exports.createVisitRequest = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.user?._id;
//     const { vehicleId, visitDate, visitTime, message } = req.body;

//     if (!userId) {
//       return res.status(401).json({ message: "Unauthorized" });
//     }

//     if (!vehicleId || !visitDate || !visitTime) {
//       return res
//         .status(400)
//         .json({ message: "Vehicle, date, and time are required." });
//     }

//     const listing = await Listing.findById(vehicleId);
//     if (!listing) {
//       return res.status(404).json({ message: "Vehicle not found." });
//     }

//     // owner id field may differ in your schema (ownerId / userId / createdBy)
//     const ownerId = listing.ownerId || listing.userId || listing.createdBy;
//     if (!ownerId) {
//       return res.status(400).json({ message: "Listing owner not found." });
//     }

//     // Basic duplicate check: same user + same vehicle + same slot
//     const existing = await Visit.findOne({
//       userId,
//       vehicleId,
//       visitDate,
//       visitTime,
//       status: { $in: ["pending", "approved"] },
//     });

//     if (existing) {
//       return res
//         .status(409)
//         .json({ message: "You already requested this date/time." });
//     }

//     const visit = await Visit.create({
//       userId,
//       vehicleId,
//       ownerId,
//       visitDate,
//       visitTime,
//       message: message || "",
//     });

//     return res.status(201).json({
//       message: "Visit request sent successfully.",
//       visit,
//     });
//   } catch (error) {
//     console.error("createVisitRequest error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error while creating visit request." });
//   }
// };

// // Logged-in user sees own visit requests
// exports.getMyVisitRequests = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.user?._id;

//     const visits = await Visit.find({ userId })
//       .populate(
//         "vehicleId",
//         "name brand location photos pricePerDay pricePerSeat listingType",
//       )
//       .sort({ createdAt: -1 });

//     return res.json(visits);
//   } catch (error) {
//     console.error("getMyVisitRequests error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error while fetching visits." });
//   }
// };

// // Owner/Admin sees requests for their vehicles
// exports.getOwnerVisitRequests = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.user?._id;
//     const userRole = req.user?.role;

//     let query = {};

//     // Admin can see all
//     if (userRole === "admin") {
//       query = {};
//     } else {
//       query = { ownerId: userId };
//     }

//     const visits = await Visit.find(query)
//       .populate("userId", "name email")
//       .populate("vehicleId", "name brand location photos listingType")
//       .sort({ createdAt: -1 });

//     return res.json(visits);
//   } catch (error) {
//     console.error("getOwnerVisitRequests error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error while fetching owner visit requests." });
//   }
// };

// // Update visit request status (Owner/Admin)
// exports.updateVisitStatus = async (req, res) => {
//   try {
//     const userId = req.user?.id || req.user?._id;
//     const userRole = req.user?.role;
//     const { visitId } = req.params;
//     const { status } = req.body;

//     const allowed = ["approved", "rejected", "completed", "cancelled"];
//     if (!allowed.includes(status)) {
//       return res.status(400).json({ message: "Invalid status value." });
//     }

//     const visit = await Visit.findById(visitId);
//     if (!visit) {
//       return res.status(404).json({ message: "Visit request not found." });
//     }

//     // Owner or admin only
//     if (userRole !== "admin" && String(visit.ownerId) !== String(userId)) {
//       return res
//         .status(403)
//         .json({ message: "Not allowed to update this visit request." });
//     }

//     visit.status = status;
//     await visit.save();

//     return res.json({ message: "Visit status updated.", visit });
//   } catch (error) {
//     console.error("updateVisitStatus error:", error);
//     return res
//       .status(500)
//       .json({ message: "Server error while updating visit status." });
//   }
// };

// import Visit from "../models/Visit.js";
// import Listing from "../models/Listing.js";

// /* =========================
//    CREATE VISIT REQUEST
// ========================= */
// export const createVisit = async (req, res) => {
//   try {
//     const { vehicleId, visitDate, note } = req.body;

//     if (!vehicleId || !visitDate) {
//       return res
//         .status(400)
//         .json({ message: "Vehicle and visit date are required" });
//     }

//     const date = new Date(visitDate);
//     if (isNaN(date.getTime()) || date <= new Date()) {
//       return res
//         .status(400)
//         .json({ message: "Visit date must be in the future" });
//     }

//     const listing = await Listing.findById(vehicleId);
//     if (!listing) {
//       return res.status(404).json({ message: "Vehicle not found" });
//     }

//     // Prevent duplicate pending visit for same user + vehicle + date
//     const existing = await Visit.findOne({
//       userId: req.user.id,
//       vehicleId,
//       status: "REQUESTED",
//       visitDate: date,
//     });

//     if (existing) {
//       return res
//         .status(400)
//         .json({ message: "You already requested a visit for this time" });
//     }

//     const visit = await Visit.create({
//       userId: req.user.id,
//       ownerId: listing.owner,
//       vehicleId,
//       visitDate: date,
//       note,
//     });

//     res.status(201).json(visit);
//   } catch (err) {
//     console.error("createVisit error:", err);
//     res.status(500).json({ message: "Failed to create visit request" });
//   }
// };

// /* =========================
//    GET MY VISITS (USER)
// ========================= */
// export const getMyVisits = async (req, res) => {
//   try {
//     const visits = await Visit.find({ userId: req.user.id })
//       .populate("vehicleId", "name photos")
//       .populate("ownerId", "name email")
//       .sort({ createdAt: -1 });

//     res.json(visits);
//   } catch (err) {
//     console.error("getMyVisits error:", err);
//     res.status(500).json({ message: "Failed to fetch visits" });
//   }
// };

// /* =========================
//    GET INCOMING VISITS (OWNER)
// ========================= */
// export const getIncomingVisits = async (req, res) => {
//   try {
//     const visits = await Visit.find({ ownerId: req.user.id })
//       .populate("vehicleId", "name photos")
//       .populate("userId", "name email")
//       .sort({ createdAt: -1 });

//     res.json(visits);
//   } catch (err) {
//     console.error("getIncomingVisits error:", err);
//     res.status(500).json({ message: "Failed to fetch incoming visits" });
//   }
// };

// /* =========================
//    UPDATE VISIT STATUS (OWNER)
// ========================= */
// export const updateVisitStatus = async (req, res) => {
//   try {
//     const { status, ownerNote, visitDate } = req.body;

//     const visit = await Visit.findById(req.params.id);
//     if (!visit) {
//       return res.status(404).json({ message: "Visit not found" });
//     }

//     if (visit.ownerId.toString() !== req.user.id) {
//       return res.status(403).json({ message: "Not authorized" });
//     }

//     if (visitDate) {
//       const newDate = new Date(visitDate);
//       if (newDate <= new Date()) {
//         return res
//           .status(400)
//           .json({ message: "New visit date must be in the future" });
//       }
//       visit.visitDate = newDate;
//       visit.status = "RESCHEDULED";
//     } else if (status) {
//       visit.status = status;
//     }

//     if (ownerNote) {
//       visit.ownerNote = ownerNote;
//     }

//     await visit.save();

//     res.json(visit);
//   } catch (err) {
//     console.error("updateVisitStatus error:", err);
//     res.status(500).json({ message: "Failed to update visit" });
//   }
// };

import Visit from "../models/Visit.js";
import Listing from "../models/Listing.js";

// @desc    Create a new visit request
// @route   POST /api/visits
// @access  Private
export const createVisit = async (req, res) => {
  try {
    const { vehicleId, visitDate, note } = req.body;

    if (!vehicleId || !visitDate) {
      return res
        .status(400)
        .json({ message: "Vehicle ID and date are required" });
    }

    const listing = await Listing.findById(vehicleId);
    if (!listing) {
      return res.status(404).json({ message: "Vehicle listing not found" });
    }

    // Prevent owner from booking a visit for their own vehicle
    if (listing.owner.toString() === req.user._id.toString()) {
      return res
        .status(400)
        .json({ message: "You cannot book a visit for your own vehicle" });
    }

    // Check for duplicate pending request
    const existingVisit = await Visit.findOne({
      userId: req.user._id,
      vehicleId,
      status: "REQUESTED",
    });

    if (existingVisit) {
      return res
        .status(400)
        .json({
          message: "You already have a pending visit request for this vehicle",
        });
    }

    const visit = await Visit.create({
      userId: req.user._id,
      ownerId: listing.owner,
      vehicleId,
      visitDate,
      note,
    });

    res.status(201).json(visit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get logged-in user's visit requests
// @route   GET /api/visits/my
// @access  Private
export const getMyVisits = async (req, res) => {
  try {
    const visits = await Visit.find({ userId: req.user._id })
      .populate("vehicleId", "name brand model photos location")
      .populate("ownerId", "name email phoneNumber")
      .sort("-createdAt");

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get incoming visit requests for vehicle owner
// @route   GET /api/visits/incoming
// @access  Private
export const getIncomingVisits = async (req, res) => {
  try {
    const visits = await Visit.find({ ownerId: req.user._id })
      .populate("vehicleId", "name brand model photos location")
      .populate("userId", "name email phoneNumber")
      .sort("-createdAt");

    res.json(visits);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update visit status
// @route   PATCH /api/visits/:id/status
// @access  Private (Owner Only)
export const updateVisitStatus = async (req, res) => {
  try {
    const { status, ownerNote, visitDate } = req.body;
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: "Visit request not found" });
    }

    // Only owner can update status
    if (visit.ownerId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to update this visit" });
    }

    visit.status = status || visit.status;
    visit.ownerNote = ownerNote || visit.ownerNote;
    if (status === "RESCHEDULED" && visitDate) {
      visit.visitDate = visitDate;
    }

    const updatedVisit = await visit.save();
    res.json(updatedVisit);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
