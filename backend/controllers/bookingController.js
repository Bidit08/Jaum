// import Booking from "../models/Booking.js";
// import Listing from "../models/Listing.js";

// export const createBooking = async (req, res) => {
//   try {
//     const { listingId, startDate, endDate, seatsBooked } = req.body;

//     const listing = await Listing.findById(listingId);

//     if (!listing || !listing.isApproved) {
//       return res.status(404).json({ message: "Listing not available" });
//     }

//     let totalPrice = 0;

//     if (listing.listingType === "full") {
//       const days =
//         (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24) + 1;

//       totalPrice = days * listing.pricePerDay;
//     } else {
//       if (seatsBooked > listing.availableSeats) {
//         return res.status(400).json({ message: "Not enough seats available" });
//       }

//       totalPrice = seatsBooked * listing.pricePerSeat;
//     }

//     const booking = await Booking.create({
//       user: req.user.id,
//       owner: listing.owner,
//       listing: listing._id,
//       bookingType: listing.listingType,
//       startDate,
//       endDate,
//       seatsBooked,
//       totalPrice,
//     });

//     res.status(201).json(booking);
//   } catch (err) {
//     res.status(500).json({ message: "Booking failed" });
//   }
// };

// import Booking from "../models/Booking.js";
// import Listing from "../models/Listing.js";

// /* =========================
//    CREATE BOOKING
// ========================= */
// export const createBooking = async (req, res) => {
//   try {
//     const { listingId, startDate, endDate, seatsBooked } = req.body;

//     const listing = await Listing.findById(listingId);

//     if (!listing || !listing.isApproved) {
//       return res.status(404).json({ message: "Listing not available" });
//     }

//     let totalPrice = 0;
//     let totalDays = 0;

//     if (listing.listingType === "full") {
//       totalDays =
//         Math.ceil(
//           (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
//         ) || 1;

//       totalPrice = totalDays * listing.pricePerDay;
//     } else {
//       if (seatsBooked > listing.availableSeats) {
//         return res.status(400).json({ message: "Not enough seats available" });
//       }

//       totalPrice = seatsBooked * listing.pricePerSeat;

//       // 🔻 Reduce seats
//       listing.availableSeats -= seatsBooked;
//       await listing.save();
//     }

//     const booking = await Booking.create({
//       user: req.user.id,
//       owner: listing.owner,
//       listing: listing._id,
//       bookingType: listing.listingType,
//       startDate,
//       endDate,
//       totalDays,
//       seatsBooked,
//       totalPrice,
//       status: "pending",
//     });

//     res.status(201).json(booking);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Booking failed" });
//   }
// };

// /* =========================
//    GET MY BOOKINGS
// ========================= */
// export const getMyBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({ user: req.user.id })
//       .populate("listing")
//       .sort({ createdAt: -1 });

//     res.json(bookings);
//   } catch (err) {
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// };

// /* =========================
//    GET OWNER BOOKINGS
// ========================= */
// export const getOwnerBookings = async (req, res) => {
//   try {
//     const bookings = await Booking.find({
//       owner: req.user.id,
//       status: "pending",
//     })
//       .populate("listing", "name photos listingType pricePerDay pricePerSeat")
//       .populate("user", "name email")
//       .sort({ createdAt: -1 });

//     res.json(bookings);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to fetch owner bookings" });
//   }
// };

// // Approve Booking
// export const approveBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       owner: req.user.id,
//       status: "pending",
//     }).populate("listing");

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // SEAT LISTING: reduce available seats
//     if (booking.bookingType === "seats") {
//       if (booking.seatsBooked > booking.listing.availableSeats) {
//         return res.status(400).json({ message: "Not enough seats available" });
//       }

//       booking.listing.availableSeats -= booking.seatsBooked;
//       await booking.listing.save();
//     }

//     booking.status = "confirmed";
//     await booking.save();

//     res.json({ message: "Booking approved", booking });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to approve booking" });
//   }
// };

// // Reject Booking
// export const rejectBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       owner: req.user.id,
//       status: "pending",
//     });

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     booking.status = "rejected";
//     await booking.save();

//     res.json({ message: "Booking rejected" });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to reject booking" });
//   }
// };

import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

/* =========================
   CREATE BOOKING (USER)
   → Always PENDING
========================= */
export const createBooking = async (req, res) => {
  try {
    const { listingId, startDate, endDate, seatsBooked } = req.body;

    const listing = await Listing.findById(listingId);

    if (!listing || !listing.isApproved) {
      return res.status(404).json({ message: "Listing not available" });
    }

    let totalPrice = 0;
    let totalDays = 0;

    // 🔹 FULL VEHICLE BOOKING
    // if (listing.listingType === "full") {
    //   if (!startDate || !endDate) {
    //     return res
    //       .status(400)
    //       .json({ message: "Start and end dates required" });
    //   }

    //   totalDays =
    //     Math.ceil(
    //       (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
    //     ) || 1;

    //   totalPrice = totalDays * listing.pricePerDay;
    // }
    // 🔹 FULL VEHICLE BOOKING
    if (listing.listingType === "full") {
      if (!startDate || !endDate) {
        return res
          .status(400)
          .json({ message: "Start and end dates required" });
      }

      // ❗ CHECK FOR DATE CONFLICT
      const conflict = await Booking.findOne({
        listing: listing._id,
        status: "confirmed",
        $or: [
          {
            startDate: { $lte: endDate },
            endDate: { $gte: startDate },
          },
        ],
      });

      if (conflict) {
        return res.status(400).json({
          message: "Vehicle is already booked for the selected dates",
        });
      }

      const totalDays =
        Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24),
        ) || 1;

      totalPrice = totalDays * listing.pricePerDay;
    }

    // 🔹 SEAT BOOKING
    if (listing.listingType === "seats") {
      if (!seatsBooked || seatsBooked < 1) {
        return res.status(400).json({ message: "Invalid seat count" });
      }

      if (seatsBooked > listing.availableSeats) {
        return res.status(400).json({ message: "Not enough seats available" });
      }

      totalPrice = seatsBooked * listing.pricePerSeat;
    }

    // 🔥 IMPORTANT:
    // ❌ DO NOT reduce seats here
    // ✅ Seats will be reduced ONLY when owner approves

    const booking = await Booking.create({
      user: req.user.id,
      owner: listing.owner,
      listing: listing._id,
      bookingType: listing.listingType,
      startDate: listing.listingType === "full" ? startDate : undefined,
      endDate: listing.listingType === "full" ? endDate : undefined,
      totalDays: listing.listingType === "full" ? totalDays : undefined,
      seatsBooked: listing.listingType === "seats" ? seatsBooked : undefined,
      totalPrice,
      status: "pending", // ✅ FIXED
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error("createBooking error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

/* =========================
   GET MY BOOKINGS (USER)
========================= */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      user: req.user.id,
    })
      .populate("listing", "name photos listingType")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("getMyBookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/* =========================
   GET OWNER INCOMING BOOKINGS
========================= */
export const getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({
      owner: req.user.id,
      status: "pending",
    })
      .populate(
        "listing",
        "name photos listingType pricePerDay pricePerSeat availableSeats",
      )
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    console.error("getOwnerBookings error:", err);
    res.status(500).json({ message: "Failed to fetch incoming bookings" });
  }
};

/* =========================
   APPROVE BOOKING (OWNER)
========================= */
// export const approveBooking = async (req, res) => {
//   try {
//     const booking = await Booking.findOne({
//       _id: req.params.id,
//       owner: req.user.id,
//       status: "pending",
//     }).populate("listing");

//     if (!booking) {
//       return res.status(404).json({ message: "Booking not found" });
//     }

//     // 🔹 Reduce seats ONLY NOW
//     if (booking.bookingType === "seats") {
//       if (booking.seatsBooked > booking.listing.availableSeats) {
//         return res.status(400).json({ message: "Not enough seats available" });
//       }

//       booking.listing.availableSeats -= booking.seatsBooked;
//       await booking.listing.save();
//     }

//     booking.status = "confirmed";
//     await booking.save();

//     res.json({ message: "Booking approved", booking });
//   } catch (err) {
//     console.error("approveBooking error:", err);
//     res.status(500).json({ message: "Failed to approve booking" });
//   }
// };
export const approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      owner: req.user.id,
      status: "pending",
    }).populate("listing");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // 🔥 SEAT LOGIC
    if (booking.bookingType === "seats") {
      if (booking.seatsBooked > booking.listing.availableSeats) {
        return res.status(400).json({
          message: "Not enough seats available",
        });
      }

      booking.listing.availableSeats -= booking.seatsBooked;
      await booking.listing.save();
    }

    booking.status = "confirmed";
    await booking.save();

    res.json({ message: "Booking approved", booking });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/* =========================
   REJECT BOOKING (OWNER)
========================= */
export const rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({
      _id: req.params.id,
      owner: req.user.id,
      status: "pending",
    });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    booking.status = "rejected";
    await booking.save();

    res.json({ message: "Booking rejected" });
  } catch (err) {
    console.error("rejectBooking error:", err);
    res.status(500).json({ message: "Failed to reject booking" });
  }
};

// GET BLOCKED DATES FOR A LISTING (FULL VEHICLE)
export const getBlockedDates = async (req, res) => {
  try {
    const bookings = await Booking.find({
      listing: req.params.listingId,
      bookingType: "full",
      status: "confirmed",
    }).select("startDate endDate");

    res.json(bookings);
  } catch (err) {
    console.error("getBlockedDates error:", err);
    res.status(500).json({ message: "Failed to fetch blocked dates" });
  }
};
