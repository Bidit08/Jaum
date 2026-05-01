// import Review from "../models/Review.js";
// import Booking from "../models/Booking.js";
// import Listing from "../models/Listing.js";

// /**
//  * Recalculate and update averageRating and reviewCount for a listing
//  */
// const updateListingRating = async (listingId) => {
//   const stats = await Review.aggregate([
//     { $match: { listing: listingId } },
//     {
//       $group: {
//         _id: "$listing",
//         averageRating: { $avg: "$rating" },
//         reviewCount: { $sum: 1 },
//       },
//     },
//   ]);

//   if (stats.length > 0) {
//     await Listing.findByIdAndUpdate(listingId, {
//       averageRating: Math.round(stats[0].averageRating * 10) / 10,
//       reviewCount: stats[0].reviewCount,
//     });
//   } else {
//     await Listing.findByIdAndUpdate(listingId, {
//       averageRating: 0,
//       reviewCount: 0,
//     });
//   }
// };

// /**
//  * CREATE REVIEW
//  */
// export const createReview = async (req, res) => {
//   try {
//     const { listingId, bookingId, rating, title, comment } = req.body;
//     const userId = req.user._id;

//     // Validate booking
//     const booking = await Booking.findOne({
//       _id: bookingId,
//       user: userId,
//       listing: listingId,
//       status: "completed",
//     });

//     if (!booking) {
//       return res.status(400).json({
//         message: "You can only review completed bookings.",
//       });
//     }

//     // Check if review already exists
//     const existingReview = await Review.findOne({
//       user: userId,
//       booking: bookingId,
//     });

//     if (existingReview) {
//       return res.status(400).json({
//         message: "You have already reviewed this booking.",
//       });
//     }

//     const review = await Review.create({
//       user: userId,
//       listing: listingId,
//       booking: bookingId,
//       rating,
//       title,
//       comment,
//     });

//     // Update listing stats
//     await updateListingRating(listingId);

//     // Fetch review with user details to send back
//     const populatedReview = await Review.findById(review._id).populate(
//       "user",
//       "name profilePicture",
//     );

//     res.status(201).json(populatedReview);
//   } catch (err) {
//     console.error("Create review error:", err);
//     res.status(500).json({ message: "Failed to create review" });
//   }
// };

// /**
//  * GET REVIEWS BY LISTING
//  */
// export const getListingReviews = async (req, res) => {
//   try {
//     const { listingId } = req.params;

//     const reviews = await Review.find({ listing: listingId })
//       .populate("user", "name profilePicture")
//       .sort({ createdAt: -1 });

//     res.json(reviews);
//   } catch (err) {
//     console.error("Get reviews error:", err);
//     res.status(500).json({ message: "Failed to fetch reviews" });
//   }
// };

// /**
//  * UPDATE REVIEW
//  */
// export const updateReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { rating, title, comment } = req.body;
//     const userId = req.user._id;

//     const review = await Review.findOne({ _id: id, user: userId });

//     if (!review) {
//       return res
//         .status(404)
//         .json({ message: "Review not found or unauthorized" });
//     }

//     review.rating = rating || review.rating;
//     review.title = title || review.title;
//     review.comment = comment || review.comment;

//     await review.save();

//     // Update listing stats
//     await updateListingRating(review.listing);

//     const populatedReview = await Review.findById(review._id).populate(
//       "user",
//       "name profilePicture",
//     );

//     res.json(populatedReview);
//   } catch (err) {
//     console.error("Update review error:", err);
//     res.status(500).json({ message: "Failed to update review" });
//   }
// };

// /**
//  * DELETE REVIEW
//  */
// export const deleteReview = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const userId = req.user._id;

//     const review = await Review.findOneAndDelete({ _id: id, user: userId });

//     if (!review) {
//       return res
//         .status(404)
//         .json({ message: "Review not found or unauthorized" });
//     }

//     // Update listing stats
//     await updateListingRating(review.listing);

//     res.json({ message: "Review deleted successfully" });
//   } catch (err) {
//     console.error("Delete review error:", err);
//     res.status(500).json({ message: "Failed to delete review" });
//   }
// };

import Review from "../models/Review.js";
import Booking from "../models/Booking.js";
import Listing from "../models/Listing.js";

/**
 * Recalculate and update averageRating and reviewCount for a listing
 */
const updateListingRating = async (listingId) => {
  const stats = await Review.aggregate([
    { $match: { listing: listingId } },
    {
      $group: {
        _id: "$listing",
        averageRating: { $avg: "$rating" },
        reviewCount: { $sum: 1 },
      },
    },
  ]);

  if (stats.length > 0) {
    await Listing.findByIdAndUpdate(listingId, {
      averageRating: Math.round(stats[0].averageRating * 10) / 10,
      reviewCount: stats[0].reviewCount,
    });
  } else {
    await Listing.findByIdAndUpdate(listingId, {
      averageRating: 0,
      reviewCount: 0,
    });
  }
};

/**
 * CREATE REVIEW
 */
export const createReview = async (req, res) => {
  try {
    const { listingId, bookingId, rating, title, comment } = req.body;
    const userId = req.user._id;

    const booking = await Booking.findOne({
      _id: bookingId,
      user: userId,
      listing: listingId,
      status: "completed",
    });

    if (!booking) {
      return res
        .status(400)
        .json({ message: "You can only review completed bookings." });
    }

    const existingReview = await Review.findOne({
      user: userId,
      booking: bookingId,
    });

    if (existingReview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this booking." });
    }

    const review = await Review.create({
      user: userId,
      listing: listingId,
      booking: bookingId,
      rating,
      title,
      comment,
    });

    await updateListingRating(listingId);

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name profilePicture",
    );

    res.status(201).json(populatedReview);
  } catch (err) {
    console.error("Create review error:", err);
    res.status(500).json({ message: "Failed to create review" });
  }
};

/**
 * GET REVIEWS BY LISTING
 */
export const getListingReviews = async (req, res) => {
  try {
    const { listingId } = req.params;

    const reviews = await Review.find({ listing: listingId })
      .populate("user", "name profilePicture")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (err) {
    console.error("Get reviews error:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

/**
 * UPDATE REVIEW
 */
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, title, comment } = req.body;
    const userId = req.user._id;

    const review = await Review.findOne({ _id: id, user: userId });

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or unauthorized" });
    }

    review.rating = rating || review.rating;
    review.title = title || review.title;
    review.comment = comment || review.comment;

    await review.save();
    await updateListingRating(review.listing);

    const populatedReview = await Review.findById(review._id).populate(
      "user",
      "name profilePicture",
    );

    res.json(populatedReview);
  } catch (err) {
    console.error("Update review error:", err);
    res.status(500).json({ message: "Failed to update review" });
  }
};

/**
 * DELETE REVIEW (user)
 */
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const review = await Review.findOneAndDelete({ _id: id, user: userId });

    if (!review) {
      return res
        .status(404)
        .json({ message: "Review not found or unauthorized" });
    }

    await updateListingRating(review.listing);

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Delete review error:", err);
    res.status(500).json({ message: "Failed to delete review" });
  }
};

/**
 * ADMIN – GET ALL REVIEWS
 */
export const adminGetAllReviews = async (req, res) => {
  try {
    const { search = "", rating, page = 1, limit = 20 } = req.query;
    const filter = {};

    if (rating) filter.rating = Number(rating);

    const reviews = await Review.find(filter)
      .populate("user", "name profilePicture email")
      .populate("listing", "name brand model")
      .sort({ createdAt: -1 })
      .skip((page - 1) * Number(limit))
      .limit(Number(limit));

    const filtered = search
      ? reviews.filter(
          (r) =>
            r.user?.name?.toLowerCase().includes(search.toLowerCase()) ||
            r.listing?.name?.toLowerCase().includes(search.toLowerCase()) ||
            r.comment?.toLowerCase().includes(search.toLowerCase()),
        )
      : reviews;

    const total = await Review.countDocuments(filter);

    res.json({ reviews: filtered, total });
  } catch (err) {
    console.error("Admin get reviews error:", err);
    res.status(500).json({ message: "Failed to fetch reviews" });
  }
};

/**
 * ADMIN – DELETE ANY REVIEW
 */
export const adminDeleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByIdAndDelete(id);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await updateListingRating(review.listing);

    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Admin delete review error:", err);
    res.status(500).json({ message: "Failed to delete review" });
  }
};
