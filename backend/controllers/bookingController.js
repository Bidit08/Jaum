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

import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

/* =========================
   CREATE BOOKING
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

    if (listing.listingType === "full") {
      totalDays =
        Math.ceil(
          (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)
        ) || 1;

      totalPrice = totalDays * listing.pricePerDay;
    } else {
      if (seatsBooked > listing.availableSeats) {
        return res.status(400).json({ message: "Not enough seats available" });
      }

      totalPrice = seatsBooked * listing.pricePerSeat;

      // 🔻 Reduce seats
      listing.availableSeats -= seatsBooked;
      await listing.save();
    }

    const booking = await Booking.create({
      user: req.user.id,
      owner: listing.owner,
      listing: listing._id,
      bookingType: listing.listingType,
      startDate,
      endDate,
      totalDays,
      seatsBooked,
      totalPrice,
      status: "confirmed",
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Booking failed" });
  }
};

/* =========================
   GET MY BOOKINGS
========================= */
export const getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("listing")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};
