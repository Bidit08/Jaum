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

// import Listing from "../models/Listing.js";
// import User from "../models/User.js";
// import Booking from "../models/Booking.js";

// /* =======================
//    GET PENDING LISTINGS
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
//    REJECT LISTING (SOFT)
// ======================= */
// export const rejectListing = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id);

//     if (!listing) {
//       return res.status(404).json({ message: "Listing not found" });
//     }

//     listing.isApproved = false;
//     listing.isRejected = true;
//     await listing.save();

//     res.json({ message: "Listing rejected", listing });
//   } catch (err) {
//     res.status(500).json({ message: "Rejection failed" });
//   }
// };

// /* =======================
//    GET DASHBOARD STATS
// ======================= */
// export const getDashboardStats = async (req, res) => {
//   try {
//     const totalUsers = await User.countDocuments();
//     const totalListings = await Listing.countDocuments();
//     const totalBookings = await Booking.countDocuments();

//     const pendingBookings = await Booking.countDocuments({ status: "pending" });
//     const approvedBookings = await Booking.countDocuments({
//       status: { $in: ["approved-awaiting-payment", "confirmed"] },
//     });
//     const rejectedBookings = await Booking.countDocuments({
//       status: { $in: ["rejected", "cancelled"] },
//     });
//     const completedRentals = await Booking.countDocuments({
//       status: "completed",
//     });

//     // Aggregate total revenue for paid bookings
//     const revenueAgg = await Booking.aggregate([
//       { $match: { paymentStatus: "paid" } },
//       {
//         $group: {
//           _id: null,
//           total: { $sum: "$totalPrice" },
//           totalCommission: { $sum: "$commissionAmount" },
//           totalOwnerPayout: { $sum: "$ownerAmount" },
//         },
//       },
//     ]);
//     const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
//     const totalCommission =
//       revenueAgg.length > 0 ? revenueAgg[0].totalCommission : 0;
//     const totalOwnerPayout =
//       revenueAgg.length > 0 ? revenueAgg[0].totalOwnerPayout : 0;

//     // Recent items
//     const recentUsers = await User.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .select("-password");

//     const recentBookings = await Booking.find()
//       .sort({ createdAt: -1 })
//       .limit(5)
//       .populate("user", "name email")
//       .populate("listing", "title name make model");

//     const recentPayments = await Booking.find({ paymentStatus: "paid" })
//       .sort({ updatedAt: -1 })
//       .limit(5)
//       .populate("user", "name email")
//       .populate("listing", "title name");

//     res.json({
//       metrics: {
//         totalUsers,
//         totalListings,
//         totalBookings,
//         pendingBookings,
//         approvedBookings,
//         rejectedBookings,
//         completedRentals,
//         totalRevenue,
//         totalCommission,
//         totalOwnerPayout,
//       },
//       latest: {
//         recentUsers,
//         recentBookings,
//         recentPayments,
//       },
//     });
//   } catch (err) {
//     console.error("Error fetching dashboard stats:", err);
//     res.status(500).json({ message: "Failed to fetch dashboard statistics" });
//   }
// };

// /* =======================
//    USER MANAGEMENT
// ======================= */

// /**
//  * GET ALL USERS with search + filter
//  * GET /api/admin/users?search=&filter=
//  * filter options: all | renters | owners | active | suspended
//  */
// export const getAllUsers = async (req, res) => {
//   try {
//     const { search = "", filter = "all" } = req.query;

//     // Build base query
//     let userQuery = {};

//     if (search.trim()) {
//       const regex = new RegExp(search.trim(), "i");
//       userQuery.$or = [{ name: regex }, { email: regex }, { username: regex }];
//     }

//     if (filter === "active") {
//       userQuery.isSuspended = false;
//     } else if (filter === "suspended") {
//       userQuery.isSuspended = true;
//     }

//     // Fetch all matching users
//     let users = await User.find(userQuery)
//       .select("-password")
//       .sort({ createdAt: -1 });

//     // For renters/owners we need to cross-reference bookings/listings
//     if (filter === "renters") {
//       const renterIds = await Booking.distinct("user");
//       const renterSet = new Set(renterIds.map((id) => id.toString()));
//       users = users.filter((u) => renterSet.has(u._id.toString()));
//     } else if (filter === "owners") {
//       const ownerIds = await Listing.distinct("owner");
//       const ownerSet = new Set(ownerIds.map((id) => id.toString()));
//       users = users.filter((u) => ownerSet.has(u._id.toString()));
//     }

//     // Attach booking and listing counts per user
//     const userIds = users.map((u) => u._id);

//     const [bookingCounts, listingCounts] = await Promise.all([
//       Booking.aggregate([
//         { $match: { user: { $in: userIds } } },
//         { $group: { _id: "$user", count: { $sum: 1 } } },
//       ]),
//       Listing.aggregate([
//         { $match: { owner: { $in: userIds } } },
//         { $group: { _id: "$owner", count: { $sum: 1 } } },
//       ]),
//     ]);

//     const bookingMap = Object.fromEntries(
//       bookingCounts.map((b) => [b._id.toString(), b.count]),
//     );
//     const listingMap = Object.fromEntries(
//       listingCounts.map((l) => [l._id.toString(), l.count]),
//     );

//     const enriched = users.map((u) => ({
//       ...u.toObject(),
//       bookingCount: bookingMap[u._id.toString()] || 0,
//       listingCount: listingMap[u._id.toString()] || 0,
//     }));

//     res.json(enriched);
//   } catch (err) {
//     console.error("getAllUsers error:", err);
//     res.status(500).json({ message: "Failed to fetch users" });
//   }
// };

// /**
//  * GET USER DETAIL — profile + bookings + listings
//  * GET /api/admin/users/:id
//  */
// export const getUserDetail = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const [bookings, listings] = await Promise.all([
//       Booking.find({ user: user._id })
//         .sort({ createdAt: -1 })
//         .populate(
//           "listing",
//           "name brand model photos pricePerDay pricePerSeat listingType",
//         ),
//       Listing.find({ owner: user._id })
//         .sort({ createdAt: -1 })
//         .select(
//           "name brand model photos pricePerDay pricePerSeat listingType isApproved status createdAt",
//         ),
//     ]);

//     res.json({ user, bookings, listings });
//   } catch (err) {
//     console.error("getUserDetail error:", err);
//     res.status(500).json({ message: "Failed to fetch user detail" });
//   }
// };

// /**
//  * TOGGLE SUSPEND USER
//  * PATCH /api/admin/users/:id/suspend
//  */
// export const toggleSuspendUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.role === "admin")
//       return res
//         .status(403)
//         .json({ message: "Cannot suspend an admin account" });

//     user.isSuspended = !user.isSuspended;
//     await user.save();

//     res.json({
//       message: user.isSuspended
//         ? "User suspended successfully"
//         : "User activated successfully",
//       isSuspended: user.isSuspended,
//     });
//   } catch (err) {
//     console.error("toggleSuspendUser error:", err);
//     res.status(500).json({ message: "Failed to update user status" });
//   }
// };

// /**
//  * DELETE USER
//  * DELETE /api/admin/users/:id
//  */
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) return res.status(404).json({ message: "User not found" });

//     if (user.role === "admin")
//       return res
//         .status(403)
//         .json({ message: "Cannot delete an admin account" });

//     await User.findByIdAndDelete(req.params.id);

//     res.json({ message: "User deleted successfully" });
//   } catch (err) {
//     console.error("deleteUser error:", err);
//     res.status(500).json({ message: "Failed to delete user" });
//   }
// };

// /* ==============================
//    LISTING MANAGEMENT
// ============================== */

// /**
//  * GET ALL LISTINGS (admin)
//  * GET /api/admin/listings?search=&filter=
//  * filter: all | pending | approved | rejected | active | paused
//  */
// export const getAllListings = async (req, res) => {
//   try {
//     const { search = "", filter = "all" } = req.query;

//     let query = {};

//     // Status filter
//     if (filter === "pending") {
//       query.isApproved = false;
//       query.isRejected = false;
//     } else if (filter === "approved") {
//       query.isApproved = true;
//       query.isRejected = false;
//     } else if (filter === "rejected") {
//       query.isRejected = true;
//     } else if (filter === "active") {
//       query.status = "active";
//       query.isApproved = true;
//     } else if (filter === "paused") {
//       query.status = "paused";
//     }

//     let listings = await Listing.find(query)
//       .populate("owner", "name email profilePicture username")
//       .sort({ createdAt: -1 });

//     // Search by listing name, location, or owner name/email
//     if (search.trim()) {
//       const s = search.trim().toLowerCase();
//       listings = listings.filter(
//         (l) =>
//           l.name?.toLowerCase().includes(s) ||
//           l.location?.toLowerCase().includes(s) ||
//           l.departure?.toLowerCase().includes(s) ||
//           l.destination?.toLowerCase().includes(s) ||
//           l.brand?.toLowerCase().includes(s) ||
//           l.owner?.name?.toLowerCase().includes(s) ||
//           l.owner?.email?.toLowerCase().includes(s),
//       );
//     }

//     res.json(listings);
//   } catch (err) {
//     console.error("getAllListings error:", err);
//     res.status(500).json({ message: "Failed to fetch listings" });
//   }
// };

// /**
//  * GET LISTING DETAIL (admin)
//  * GET /api/admin/listings/:id
//  */
// export const getListingDetail = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id).populate(
//       "owner",
//       "name email profilePicture username phoneNumber createdAt role isSuspended",
//     );
//     if (!listing) return res.status(404).json({ message: "Listing not found" });

//     const bookingCount = await Booking.countDocuments({ listing: listing._id });

//     res.json({ listing, bookingCount });
//   } catch (err) {
//     console.error("getListingDetail error:", err);
//     res.status(500).json({ message: "Failed to fetch listing detail" });
//   }
// };

// /**
//  * ADMIN UPDATE LISTING
//  * PUT /api/admin/listings/:id
//  */
// export const adminUpdateListing = async (req, res) => {
//   try {
//     const allowed = [
//       "name",
//       "brand",
//       "model",
//       "year",
//       "description",
//       "pricePerDay",
//       "pricePerSeat",
//       "deposit",
//       "location",
//       "departure",
//       "destination",
//       "fuelType",
//       "transmission",
//       "seats",
//       "mileage",
//       "features",
//       "rules",
//     ];

//     const updates = {};
//     allowed.forEach((field) => {
//       if (req.body[field] !== undefined) updates[field] = req.body[field];
//     });

//     const listing = await Listing.findByIdAndUpdate(
//       req.params.id,
//       { $set: updates },
//       { new: true, runValidators: false },
//     ).populate("owner", "name email profilePicture");

//     if (!listing) return res.status(404).json({ message: "Listing not found" });

//     res.json({ message: "Listing updated", listing });
//   } catch (err) {
//     console.error("adminUpdateListing error:", err);
//     res.status(500).json({ message: "Failed to update listing" });
//   }
// };

// /**
//  * ADMIN DELETE LISTING
//  * DELETE /api/admin/listings/:id
//  */
// export const adminDeleteListing = async (req, res) => {
//   try {
//     const listing = await Listing.findByIdAndDelete(req.params.id);
//     if (!listing) return res.status(404).json({ message: "Listing not found" });

//     res.json({ message: "Listing deleted successfully" });
//   } catch (err) {
//     console.error("adminDeleteListing error:", err);
//     res.status(500).json({ message: "Failed to delete listing" });
//   }
// };

// /**
//  * TOGGLE LISTING STATUS (active ↔ paused)
//  * PATCH /api/admin/listings/:id/status
//  */
// export const toggleListingStatus = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) return res.status(404).json({ message: "Listing not found" });

//     listing.status = listing.status === "active" ? "paused" : "active";
//     await listing.save();

//     res.json({
//       message: `Listing marked as ${listing.status}`,
//       status: listing.status,
//     });
//   } catch (err) {
//     console.error("toggleListingStatus error:", err);
//     res.status(500).json({ message: "Failed to toggle listing status" });
//   }
// };

// /**
//  * TOGGLE FEATURED
//  * PATCH /api/admin/listings/:id/feature
//  */
// export const toggleFeatured = async (req, res) => {
//   try {
//     const listing = await Listing.findById(req.params.id);
//     if (!listing) return res.status(404).json({ message: "Listing not found" });

//     listing.isFeatured = !listing.isFeatured;
//     await listing.save();

//     res.json({
//       message: listing.isFeatured ? "Listing featured" : "Listing unfeatured",
//       isFeatured: listing.isFeatured,
//     });
//   } catch (err) {
//     console.error("toggleFeatured error:", err);
//     res.status(500).json({ message: "Failed to toggle featured status" });
//   }
// };

// /* ==============================
//    BOOKING MANAGEMENT
// ============================== */

// /**
//  * GET ALL BOOKINGS (admin)
//  * GET /api/admin/bookings?search=&status=
//  * status: all | pending | approved-awaiting-payment | confirmed | rejected | cancelled | completed | disputed
//  */
// export const getAllBookings = async (req, res) => {
//   try {
//     const { search = "", status = "all" } = req.query;

//     let query = {};

//     // Status filter
//     if (status === "disputed") {
//       query.isDisputed = true;
//     } else if (status !== "all") {
//       query.status = status;
//     }

//     let bookings = await Booking.find(query)
//       .populate("user", "name email profilePicture")
//       .populate("owner", "name email profilePicture")
//       .populate("listing", "name photos brand model")
//       .sort({ createdAt: -1 });

//     // Search by ID, vehicle name, renter name, or owner name
//     if (search.trim()) {
//       const s = search.trim().toLowerCase();
//       bookings = bookings.filter((b) => {
//         const idMatch = b._id.toString().toLowerCase().includes(s);
//         const vehicleMatch = b.listing?.name?.toLowerCase().includes(s);
//         const userMatch = b.user?.name?.toLowerCase().includes(s);
//         const ownerMatch = b.owner?.name?.toLowerCase().includes(s);
//         return idMatch || vehicleMatch || userMatch || ownerMatch;
//       });
//     }

//     res.json(bookings);
//   } catch (err) {
//     console.error("getAllBookings error:", err);
//     res.status(500).json({ message: "Failed to fetch bookings" });
//   }
// };

// /**
//  * GET BOOKING DETAIL (admin)
//  * GET /api/admin/bookings/:id
//  */
// export const getBookingDetail = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id)
//       .populate("user", "name email phoneNumber profilePicture")
//       .populate("owner", "name email phoneNumber profilePicture")
//       .populate(
//         "listing",
//         "name photos brand model status isApproved location listingType pricePerDay pricePerSeat",
//       );

//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     res.json(booking);
//   } catch (err) {
//     console.error("getBookingDetail error:", err);
//     res.status(500).json({ message: "Failed to fetch booking detail" });
//   }
// };

// /**
//  * UPDATE BOOKING STATUS (admin override)
//  * PATCH /api/admin/bookings/:id/status
//  */
// export const updateBookingStatus = async (req, res) => {
//   try {
//     const { status } = req.body;
//     const allowed = [
//       "pending",
//       "approved-awaiting-payment",
//       "confirmed",
//       "rejected",
//       "cancelled",
//       "completed",
//     ];

//     if (!allowed.includes(status)) {
//       return res.status(400).json({ message: "Invalid status" });
//     }

//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.status = status;
//     await booking.save();

//     // Populate for frontend sync
//     const updatedBooking = await Booking.findById(booking._id)
//       .populate("user", "name email phoneNumber profilePicture")
//       .populate("owner", "name email phoneNumber profilePicture")
//       .populate(
//         "listing",
//         "name photos brand model status isApproved location listingType pricePerDay pricePerSeat",
//       );

//     res.json({
//       message: `Booking status updated to ${status}`,
//       booking: updatedBooking,
//     });
//   } catch (err) {
//     console.error("updateBookingStatus error:", err);
//     res.status(500).json({ message: "Failed to update booking status" });
//   }
// };

// /**
//  * TOGGLE BOOKING FLAG
//  * PATCH /api/admin/bookings/:id/flag
//  */
// export const toggleBookingFlag = async (req, res) => {
//   try {
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.isFlagged = !booking.isFlagged;
//     await booking.save();

//     const updatedBooking = await Booking.findById(booking._id)
//       .populate("user", "name email profilePicture")
//       .populate("owner", "name email profilePicture")
//       .populate("listing", "name photos brand model");

//     res.json({
//       message: booking.isFlagged ? "Booking flagged" : "Booking unflagged",
//       isFlagged: booking.isFlagged,
//       booking: updatedBooking,
//     });
//   } catch (err) {
//     console.error("toggleBookingFlag error:", err);
//     res.status(500).json({ message: "Failed to toggle booking flag" });
//   }
// };

// /**
//  * RESOLVE / TOGGLE DISPUTE
//  * PATCH /api/admin/bookings/:id/resolve-dispute
//  */
// export const resolveDispute = async (req, res) => {
//   try {
//     const { disputeReason } = req.body || {};
//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.isDisputed = !booking.isDisputed;
//     if (disputeReason) booking.disputeReason = disputeReason;
//     await booking.save();

//     const updatedBooking = await Booking.findById(booking._id)
//       .populate("user", "name email profilePicture")
//       .populate("owner", "name email profilePicture")
//       .populate("listing", "name photos brand model");

//     res.json({
//       message: booking.isDisputed
//         ? "Booking marked as disputed"
//         : "Dispute resolved",
//       isDisputed: booking.isDisputed,
//       booking: updatedBooking,
//     });
//   } catch (err) {
//     console.error("resolveDispute error:", err);
//     res.status(500).json({ message: "Failed to resolve/dispute booking" });
//   }
// };

// /* ===============================
//    PAYMENT & FINANCE MANAGEMENT
// =============================== */

// /**
//  * GET PAYMENT STATS
//  * GET /api/admin/payments/stats
//  */
// export const getPaymentStats = async (req, res) => {
//   try {
//     const stats = await Booking.aggregate([
//       {
//         $group: {
//           _id: "$paymentStatus",
//           count: { $sum: 1 },
//           totalAmount: { $sum: "$totalPrice" },
//           totalCommission: { $sum: "$commissionAmount" },
//         },
//       },
//     ]);

//     const payoutStats = await Booking.aggregate([
//       {
//         $group: {
//           _id: "$payoutStatus",
//           count: { $sum: 1 },
//           totalAmount: { $sum: "$ownerAmount" },
//         },
//       },
//     ]);

//     // Format stats for easy frontend consumption
//     const summary = {
//       totalEarnings: 0,
//       totalCommission: 0,
//       paidCount: 0,
//       pendingCount: 0,
//       failedCount: 0,
//       refundedCount: 0,
//       pendingPayouts: 0,
//       releasedPayouts: 0,
//     };

//     stats.forEach((s) => {
//       if (s._id === "paid") {
//         summary.totalEarnings = s.totalAmount;
//         summary.totalCommission = s.totalCommission || 0;
//         summary.paidCount = s.count;
//       } else if (s._id === "pending") {
//         summary.pendingCount = s.count;
//       } else if (s._id === "failed") {
//         summary.failedCount = s.count;
//       } else if (s._id === "refunded") {
//         summary.refundedCount = s.count;
//       }
//     });

//     payoutStats.forEach((p) => {
//       if (p._id === "pending") {
//         summary.pendingPayouts = p.totalAmount || 0;
//       } else if (p._id === "released") {
//         summary.releasedPayouts = p.totalAmount || 0;
//       }
//     });

//     res.json(summary);
//   } catch (err) {
//     console.error("getPaymentStats error:", err);
//     res.status(500).json({ message: "Failed to fetch payment stats" });
//   }
// };

// /**
//  * GET ALL PAYMENTS
//  * GET /api/admin/payments?search=&status=&method=
//  */
// export const getAllPayments = async (req, res) => {
//   try {
//     const { search = "", status = "all", method = "all" } = req.query;

//     let query = {};
//     if (status !== "all") query.paymentStatus = status;
//     if (method !== "all") query.paymentMethod = method;

//     let bookings = await Booking.find(query)
//       .populate("user", "name email")
//       .populate("owner", "name email")
//       .populate("listing", "name brand model")
//       .sort({ updatedAt: -1 });

//     if (search.trim()) {
//       const s = search.trim().toLowerCase();
//       bookings = bookings.filter((b) => {
//         const idMatch = b._id.toString().toLowerCase().includes(s);
//         const txnMatch = (b.pidx || b.transactionId || "")
//           .toLowerCase()
//           .includes(s);
//         const userMatch = b.user?.name?.toLowerCase().includes(s);
//         const vehicleMatch = b.listing?.name?.toLowerCase().includes(s);
//         return idMatch || txnMatch || userMatch || vehicleMatch;
//       });
//     }

//     res.json(bookings);
//   } catch (err) {
//     console.error("getAllPayments error:", err);
//     res.status(500).json({ message: "Failed to fetch payments" });
//   }
// };

// /**
//  * UPDATE PAYMENT STATUS
//  * PATCH /api/admin/payments/:id/status
//  */
// export const updatePaymentStatus = async (req, res) => {
//   try {
//     const { paymentStatus, refundHandleStatus, transactionId } = req.body;
//     const allowed = ["pending", "paid", "failed", "refunded"];

//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     if (paymentStatus && allowed.includes(paymentStatus)) {
//       booking.paymentStatus = paymentStatus;
//     }
//     if (refundHandleStatus) booking.refundHandleStatus = refundHandleStatus;
//     if (transactionId) booking.transactionId = transactionId;

//     await booking.save();

//     const updated = await Booking.findById(booking._id)
//       .populate("user", "name email")
//       .populate("listing", "name");

//     res.json({ message: "Payment status updated", booking: updated });
//   } catch (err) {
//     console.error("updatePaymentStatus error:", err);
//     res.status(500).json({ message: "Failed to update payment status" });
//   }
// };

// /* ===============================
//    PAYOUT MANAGEMENT
// =============================== */

// /**
//  * GET ALL PAYOUTS
//  * GET /api/admin/payouts
//  */
// export const getPayouts = async (req, res) => {
//   try {
//     const { status = "all" } = req.query;

//     // We only care about bookings that are paid, as only they have legitimate payouts
//     let query = { paymentStatus: "paid" };
//     if (status !== "all") {
//       query.payoutStatus = status;
//     }

//     const payouts = await Booking.find(query)
//       .populate("owner", "name email profilePicture phoneNumber")
//       .populate("listing", "name brand model")
//       .sort({ updatedAt: -1 });

//     res.json(payouts);
//   } catch (err) {
//     console.error("getPayouts error:", err);
//     res.status(500).json({ message: "Failed to fetch payouts" });
//   }
// };

// /**
//  * UPDATE PAYOUT STATUS
//  * PATCH /api/admin/payouts/:id/status
//  */
// export const updatePayoutStatus = async (req, res) => {
//   try {
//     const { payoutStatus } = req.body;
//     const allowed = ["pending", "released", "failed"];

//     if (!allowed.includes(payoutStatus)) {
//       return res.status(400).json({ message: "Invalid payout status" });
//     }

//     const booking = await Booking.findById(req.params.id);
//     if (!booking) return res.status(404).json({ message: "Booking not found" });

//     booking.payoutStatus = payoutStatus;
//     await booking.save();

//     const updated = await Booking.findById(booking._id)
//       .populate("owner", "name email profilePicture phoneNumber")
//       .populate("listing", "name brand model");

//     res.json({ message: `Payout marked as ${payoutStatus}`, payout: updated });
//   } catch (err) {
//     console.error("updatePayoutStatus error:", err);
//     res.status(500).json({ message: "Failed to update payout status" });
//   }
// };

import Listing from "../models/Listing.js";
import User from "../models/User.js";
import Booking from "../models/Booking.js";
import { createNotification } from "../utils/notificationHelper.js";

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
    listing.isRejected = false;
    await listing.save();

    // 🔔 Notify the listing owner
    try {
      await createNotification({
        user: listing.owner,
        title: "Listing Approved ✅",
        message: `Your listing "${listing.name}" has been approved by the admin and is now live!`,
        type: "system",
        link: "/dashboard/my-listings",
      });
    } catch (notifErr) {
      console.error("Failed to send approval notification:", notifErr.message);
    }

    res.json({ message: "Listing approved", listing });
  } catch (err) {
    res.status(500).json({ message: "Approval failed" });
  }
};

/* =======================
   REJECT LISTING (SOFT)
======================= */
export const rejectListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    listing.isApproved = false;
    listing.isRejected = true;
    await listing.save();

    // 🔔 Notify the listing owner
    try {
      await createNotification({
        user: listing.owner,
        title: "Listing Rejected ❌",
        message: `Your listing "${listing.name}" was rejected by the admin. Please review and resubmit with corrections.`,
        type: "system",
        link: "/dashboard/my-listings",
      });
    } catch (notifErr) {
      console.error("Failed to send rejection notification:", notifErr.message);
    }

    res.json({ message: "Listing rejected", listing });
  } catch (err) {
    res.status(500).json({ message: "Rejection failed" });
  }
};

/* =======================
   GET DASHBOARD STATS
======================= */
export const getDashboardStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalListings = await Listing.countDocuments();
    const totalBookings = await Booking.countDocuments();

    const pendingBookings = await Booking.countDocuments({ status: "pending" });
    const approvedBookings = await Booking.countDocuments({
      status: { $in: ["approved-awaiting-payment", "confirmed"] },
    });
    const rejectedBookings = await Booking.countDocuments({
      status: { $in: ["rejected", "cancelled"] },
    });
    const completedRentals = await Booking.countDocuments({
      status: "completed",
    });

    // Aggregate total revenue for paid & refunded bookings (platform keeps penalty)
    const revenueAgg = await Booking.aggregate([
      {
        $match: {
          paymentStatus: { $in: ["paid", "refund-pending", "refunded"] },
        },
      },
      {
        $group: {
          _id: null,
          // total effective revenue (owner share + platform commission)
          total: {
            $sum: {
              $add: [
                { $ifNull: ["$commissionAmount", 0] },
                { $ifNull: ["$ownerAmount", 0] },
              ],
            },
          },
          totalCommission: { $sum: "$commissionAmount" },
          totalOwnerPayout: { $sum: "$ownerAmount" },
        },
      },
    ]);
    const totalRevenue = revenueAgg.length > 0 ? revenueAgg[0].total : 0;
    const totalCommission =
      revenueAgg.length > 0 ? revenueAgg[0].totalCommission : 0;
    const totalOwnerPayout =
      revenueAgg.length > 0 ? revenueAgg[0].totalOwnerPayout : 0;

    // Recent items
    const recentUsers = await User.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select("-password");

    const recentBookings = await Booking.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .populate("listing", "title name make model");

    const recentPayments = await Booking.find({ paymentStatus: "paid" })
      .sort({ updatedAt: -1 })
      .limit(5)
      .populate("user", "name email")
      .populate("listing", "title name");

    res.json({
      metrics: {
        totalUsers,
        totalListings,
        totalBookings,
        pendingBookings,
        approvedBookings,
        rejectedBookings,
        completedRentals,
        totalRevenue,
        totalCommission,
        totalOwnerPayout,
      },
      latest: {
        recentUsers,
        recentBookings,
        recentPayments,
      },
    });
  } catch (err) {
    console.error("Error fetching dashboard stats:", err);
    res.status(500).json({ message: "Failed to fetch dashboard statistics" });
  }
};

/* =======================
   USER MANAGEMENT
======================= */

/**
 * GET ALL USERS with search + filter
 * GET /api/admin/users?search=&filter=
 * filter options: all | renters | owners | active | suspended
 */
export const getAllUsers = async (req, res) => {
  try {
    const { search = "", filter = "all" } = req.query;

    // Build base query
    let userQuery = {};

    if (search.trim()) {
      const regex = new RegExp(search.trim(), "i");
      userQuery.$or = [{ name: regex }, { email: regex }, { username: regex }];
    }

    if (filter === "active") {
      userQuery.isSuspended = false;
    } else if (filter === "suspended") {
      userQuery.isSuspended = true;
    }

    // Fetch all matching users
    let users = await User.find(userQuery)
      .select("-password")
      .sort({ createdAt: -1 });

    // For renters/owners we need to cross-reference bookings/listings
    if (filter === "renters") {
      const renterIds = await Booking.distinct("user");
      const renterSet = new Set(renterIds.map((id) => id.toString()));
      users = users.filter((u) => renterSet.has(u._id.toString()));
    } else if (filter === "owners") {
      const ownerIds = await Listing.distinct("owner");
      const ownerSet = new Set(ownerIds.map((id) => id.toString()));
      users = users.filter((u) => ownerSet.has(u._id.toString()));
    }

    // Attach booking and listing counts per user
    const userIds = users.map((u) => u._id);

    const [bookingCounts, listingCounts] = await Promise.all([
      Booking.aggregate([
        { $match: { user: { $in: userIds } } },
        { $group: { _id: "$user", count: { $sum: 1 } } },
      ]),
      Listing.aggregate([
        { $match: { owner: { $in: userIds } } },
        { $group: { _id: "$owner", count: { $sum: 1 } } },
      ]),
    ]);

    const bookingMap = Object.fromEntries(
      bookingCounts.map((b) => [b._id.toString(), b.count]),
    );
    const listingMap = Object.fromEntries(
      listingCounts.map((l) => [l._id.toString(), l.count]),
    );

    const enriched = users.map((u) => ({
      ...u.toObject(),
      bookingCount: bookingMap[u._id.toString()] || 0,
      listingCount: listingMap[u._id.toString()] || 0,
    }));

    res.json(enriched);
  } catch (err) {
    console.error("getAllUsers error:", err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
};

/**
 * GET USER DETAIL — profile + bookings + listings
 * GET /api/admin/users/:id
 */
export const getUserDetail = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const [bookings, listings] = await Promise.all([
      Booking.find({ user: user._id })
        .sort({ createdAt: -1 })
        .populate(
          "listing",
          "name brand model photos pricePerDay pricePerSeat listingType",
        ),
      Listing.find({ owner: user._id })
        .sort({ createdAt: -1 })
        .select(
          "name brand model photos pricePerDay pricePerSeat listingType isApproved status createdAt",
        ),
    ]);

    res.json({ user, bookings, listings });
  } catch (err) {
    console.error("getUserDetail error:", err);
    res.status(500).json({ message: "Failed to fetch user detail" });
  }
};

/**
 * TOGGLE SUSPEND USER
 * PATCH /api/admin/users/:id/suspend
 */
export const toggleSuspendUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin")
      return res
        .status(403)
        .json({ message: "Cannot suspend an admin account" });

    user.isSuspended = !user.isSuspended;
    await user.save();

    res.json({
      message: user.isSuspended
        ? "User suspended successfully"
        : "User activated successfully",
      isSuspended: user.isSuspended,
    });
  } catch (err) {
    console.error("toggleSuspendUser error:", err);
    res.status(500).json({ message: "Failed to update user status" });
  }
};

/**
 * DELETE USER
 * DELETE /api/admin/users/:id
 */
export const deleteUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.role === "admin")
      return res
        .status(403)
        .json({ message: "Cannot delete an admin account" });

    await User.findByIdAndDelete(req.params.id);

    res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error("deleteUser error:", err);
    res.status(500).json({ message: "Failed to delete user" });
  }
};

/* ==============================
   LISTING MANAGEMENT
============================== */

/**
 * GET ALL LISTINGS (admin)
 * GET /api/admin/listings?search=&filter=
 * filter: all | pending | approved | rejected | active | paused
 */
export const getAllListings = async (req, res) => {
  try {
    const { search = "", filter = "all" } = req.query;

    let query = {};

    // Status filter
    if (filter === "pending") {
      query.isApproved = false;
      query.isRejected = false;
    } else if (filter === "approved") {
      query.isApproved = true;
      query.isRejected = false;
    } else if (filter === "rejected") {
      query.isRejected = true;
    } else if (filter === "active") {
      query.status = "active";
      query.isApproved = true;
    } else if (filter === "paused") {
      query.status = "paused";
    }

    let listings = await Listing.find(query)
      .populate("owner", "name email profilePicture username")
      .sort({ createdAt: -1 });

    // Search by listing name, location, or owner name/email
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      listings = listings.filter(
        (l) =>
          l.name?.toLowerCase().includes(s) ||
          l.location?.toLowerCase().includes(s) ||
          l.departure?.toLowerCase().includes(s) ||
          l.destination?.toLowerCase().includes(s) ||
          l.brand?.toLowerCase().includes(s) ||
          l.owner?.name?.toLowerCase().includes(s) ||
          l.owner?.email?.toLowerCase().includes(s),
      );
    }

    res.json(listings);
  } catch (err) {
    console.error("getAllListings error:", err);
    res.status(500).json({ message: "Failed to fetch listings" });
  }
};

/**
 * GET LISTING DETAIL (admin)
 * GET /api/admin/listings/:id
 */
export const getListingDetail = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate(
      "owner",
      "name email profilePicture username phoneNumber createdAt role isSuspended",
    );
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    const bookingCount = await Booking.countDocuments({ listing: listing._id });

    res.json({ listing, bookingCount });
  } catch (err) {
    console.error("getListingDetail error:", err);
    res.status(500).json({ message: "Failed to fetch listing detail" });
  }
};

/**
 * ADMIN UPDATE LISTING
 * PUT /api/admin/listings/:id
 */
export const adminUpdateListing = async (req, res) => {
  try {
    const allowed = [
      "name",
      "brand",
      "model",
      "year",
      "description",
      "pricePerDay",
      "pricePerSeat",
      "deposit",
      "location",
      "departure",
      "destination",
      "fuelType",
      "transmission",
      "seats",
      "mileage",
      "features",
      "rules",
    ];

    const updates = {};
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });

    const listing = await Listing.findByIdAndUpdate(
      req.params.id,
      { $set: updates },
      { new: true, runValidators: false },
    ).populate("owner", "name email profilePicture");

    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.json({ message: "Listing updated", listing });
  } catch (err) {
    console.error("adminUpdateListing error:", err);
    res.status(500).json({ message: "Failed to update listing" });
  }
};

/**
 * ADMIN DELETE LISTING
 * DELETE /api/admin/listings/:id
 */
export const adminDeleteListing = async (req, res) => {
  try {
    const listing = await Listing.findByIdAndDelete(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    res.json({ message: "Listing deleted successfully" });
  } catch (err) {
    console.error("adminDeleteListing error:", err);
    res.status(500).json({ message: "Failed to delete listing" });
  }
};

/**
 * TOGGLE LISTING STATUS (active ↔ paused)
 * PATCH /api/admin/listings/:id/status
 */
export const toggleListingStatus = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    listing.status = listing.status === "active" ? "paused" : "active";
    await listing.save();

    res.json({
      message: `Listing marked as ${listing.status}`,
      status: listing.status,
    });
  } catch (err) {
    console.error("toggleListingStatus error:", err);
    res.status(500).json({ message: "Failed to toggle listing status" });
  }
};

/**
 * TOGGLE FEATURED
 * PATCH /api/admin/listings/:id/feature
 */
export const toggleFeatured = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ message: "Listing not found" });

    listing.isFeatured = !listing.isFeatured;
    await listing.save();

    res.json({
      message: listing.isFeatured ? "Listing featured" : "Listing unfeatured",
      isFeatured: listing.isFeatured,
    });
  } catch (err) {
    console.error("toggleFeatured error:", err);
    res.status(500).json({ message: "Failed to toggle featured status" });
  }
};

/* ==============================
   BOOKING MANAGEMENT
============================== */

/**
 * GET ALL BOOKINGS (admin)
 * GET /api/admin/bookings?search=&status=
 * status: all | pending | approved-awaiting-payment | confirmed | rejected | cancelled | completed | disputed
 */
export const getAllBookings = async (req, res) => {
  try {
    const { search = "", status = "all" } = req.query;

    let query = {};

    // Status filter
    if (status === "disputed") {
      query.isDisputed = true;
    } else if (status !== "all") {
      query.status = status;
    }

    let bookings = await Booking.find(query)
      .populate("user", "name email profilePicture")
      .populate("owner", "name email profilePicture")
      .populate("listing", "name photos brand model")
      .sort({ createdAt: -1 });

    // Search by ID, vehicle name, renter name, or owner name
    if (search.trim()) {
      const s = search.trim().toLowerCase();
      bookings = bookings.filter((b) => {
        const idMatch = b._id.toString().toLowerCase().includes(s);
        const vehicleMatch = b.listing?.name?.toLowerCase().includes(s);
        const userMatch = b.user?.name?.toLowerCase().includes(s);
        const ownerMatch = b.owner?.name?.toLowerCase().includes(s);
        return idMatch || vehicleMatch || userMatch || ownerMatch;
      });
    }

    res.json(bookings);
  } catch (err) {
    console.error("getAllBookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

/**
 * GET BOOKING DETAIL (admin)
 * GET /api/admin/bookings/:id
 */
export const getBookingDetail = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate("user", "name email phoneNumber profilePicture")
      .populate("owner", "name email phoneNumber profilePicture")
      .populate(
        "listing",
        "name photos brand model status isApproved location listingType pricePerDay pricePerSeat",
      );

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    res.json(booking);
  } catch (err) {
    console.error("getBookingDetail error:", err);
    res.status(500).json({ message: "Failed to fetch booking detail" });
  }
};

/**
 * UPDATE BOOKING STATUS (admin override)
 * PATCH /api/admin/bookings/:id/status
 */
export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowed = [
      "pending",
      "approved-awaiting-payment",
      "confirmed",
      "rejected",
      "cancelled",
      "completed",
    ];

    if (!allowed.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.status = status;
    await booking.save();

    // Populate for frontend sync
    const updatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email phoneNumber profilePicture")
      .populate("owner", "name email phoneNumber profilePicture")
      .populate(
        "listing",
        "name photos brand model status isApproved location listingType pricePerDay pricePerSeat",
      );

    res.json({
      message: `Booking status updated to ${status}`,
      booking: updatedBooking,
    });
  } catch (err) {
    console.error("updateBookingStatus error:", err);
    res.status(500).json({ message: "Failed to update booking status" });
  }
};

/**
 * TOGGLE BOOKING FLAG
 * PATCH /api/admin/bookings/:id/flag
 */
export const toggleBookingFlag = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.isFlagged = !booking.isFlagged;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email profilePicture")
      .populate("owner", "name email profilePicture")
      .populate("listing", "name photos brand model");

    res.json({
      message: booking.isFlagged ? "Booking flagged" : "Booking unflagged",
      isFlagged: booking.isFlagged,
      booking: updatedBooking,
    });
  } catch (err) {
    console.error("toggleBookingFlag error:", err);
    res.status(500).json({ message: "Failed to toggle booking flag" });
  }
};

/**
 * RESOLVE / TOGGLE DISPUTE
 * PATCH /api/admin/bookings/:id/resolve-dispute
 */
export const resolveDispute = async (req, res) => {
  try {
    const { disputeReason } = req.body || {};
    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.isDisputed = !booking.isDisputed;
    if (disputeReason) booking.disputeReason = disputeReason;
    await booking.save();

    const updatedBooking = await Booking.findById(booking._id)
      .populate("user", "name email profilePicture")
      .populate("owner", "name email profilePicture")
      .populate("listing", "name photos brand model");

    res.json({
      message: booking.isDisputed
        ? "Booking marked as disputed"
        : "Dispute resolved",
      isDisputed: booking.isDisputed,
      booking: updatedBooking,
    });
  } catch (err) {
    console.error("resolveDispute error:", err);
    res.status(500).json({ message: "Failed to resolve/dispute booking" });
  }
};

/* ===============================
   PAYMENT & FINANCE MANAGEMENT
=============================== */

/**
 * GET PAYMENT STATS
 * GET /api/admin/payments/stats
 */
export const getPaymentStats = async (req, res) => {
  try {
    const stats = await Booking.aggregate([
      {
        $group: {
          _id: "$paymentStatus",
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalPrice" },
          totalCommission: { $sum: "$commissionAmount" },
        },
      },
    ]);

    const payoutStats = await Booking.aggregate([
      {
        $group: {
          _id: "$payoutStatus",
          count: { $sum: 1 },
          totalAmount: { $sum: "$ownerAmount" },
        },
      },
    ]);

    // Format stats for easy frontend consumption
    const summary = {
      totalEarnings: 0,
      totalCommission: 0,
      paidCount: 0,
      pendingCount: 0,
      failedCount: 0,
      refundedCount: 0,
      pendingPayouts: 0,
      releasedPayouts: 0,
    };

    stats.forEach((s) => {
      if (["paid", "refund-pending", "refunded"].includes(s._id)) {
        summary.totalCommission += s.totalCommission || 0;
      }

      if (s._id === "paid") {
        summary.totalEarnings += s.totalAmount;
        summary.paidCount += s.count;
      } else if (s._id === "refund-pending" || s._id === "refunded") {
        // Only count what was not refunded (the penalty) towards gross earnings
        summary.totalEarnings += s.totalCommission || 0;
        summary.refundedCount += s.count;
      } else if (s._id === "pending") {
        summary.pendingCount += s.count;
      } else if (s._id === "failed") {
        summary.failedCount += s.count;
      }
    });

    payoutStats.forEach((p) => {
      if (p._id === "pending") {
        summary.pendingPayouts = p.totalAmount || 0;
      } else if (p._id === "released") {
        summary.releasedPayouts = p.totalAmount || 0;
      }
    });

    res.json(summary);
  } catch (err) {
    console.error("getPaymentStats error:", err);
    res.status(500).json({ message: "Failed to fetch payment stats" });
  }
};

/**
 * GET ALL PAYMENTS
 * GET /api/admin/payments?search=&status=&method=
 */
export const getAllPayments = async (req, res) => {
  try {
    const { search = "", status = "all", method = "all" } = req.query;

    let query = {};
    if (status !== "all") query.paymentStatus = status;
    if (method !== "all") query.paymentMethod = method;

    let bookings = await Booking.find(query)
      .populate("user", "name email")
      .populate("owner", "name email")
      .populate("listing", "name brand model")
      .sort({ updatedAt: -1 });

    if (search.trim()) {
      const s = search.trim().toLowerCase();
      bookings = bookings.filter((b) => {
        const idMatch = b._id.toString().toLowerCase().includes(s);
        const txnMatch = (b.pidx || b.transactionId || "")
          .toLowerCase()
          .includes(s);
        const userMatch = b.user?.name?.toLowerCase().includes(s);
        const vehicleMatch = b.listing?.name?.toLowerCase().includes(s);
        return idMatch || txnMatch || userMatch || vehicleMatch;
      });
    }

    res.json(bookings);
  } catch (err) {
    console.error("getAllPayments error:", err);
    res.status(500).json({ message: "Failed to fetch payments" });
  }
};

/**
 * UPDATE PAYMENT STATUS
 * PATCH /api/admin/payments/:id/status
 */
export const updatePaymentStatus = async (req, res) => {
  try {
    const { paymentStatus, refundHandleStatus, transactionId } = req.body;
    const allowed = ["pending", "paid", "failed", "refunded"];

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (paymentStatus && allowed.includes(paymentStatus)) {
      booking.paymentStatus = paymentStatus;
    }
    if (refundHandleStatus) booking.refundHandleStatus = refundHandleStatus;
    if (transactionId) booking.transactionId = transactionId;

    await booking.save();

    const updated = await Booking.findById(booking._id)
      .populate("user", "name email")
      .populate("listing", "name");

    res.json({ message: "Payment status updated", booking: updated });

    // 🔔 Notify User if Refunded
    if (paymentStatus === "refunded") {
      await createNotification({
        user: updated.user._id,
        title: "Refund Processed",
        message: `Your refund for booking ${updated.listing.name} has been processed successfully.`,
        type: "refund",
        link: "/dashboard/bookings",
      });
    }
  } catch (err) {
    console.error("updatePaymentStatus error:", err);
    res.status(500).json({ message: "Failed to update payment status" });
  }
};

/* ===============================
   PAYOUT MANAGEMENT
=============================== */

/**
 * GET ALL PAYOUTS
 * GET /api/admin/payouts
 */
export const getPayouts = async (req, res) => {
  try {
    const { status = "all" } = req.query;

    // We only care about bookings that are paid, as only they have legitimate payouts
    let query = { paymentStatus: "paid" };
    if (status !== "all") {
      query.payoutStatus = status;
    }

    const payouts = await Booking.find(query)
      .populate("owner", "name email profilePicture phoneNumber")
      .populate("listing", "name brand model")
      .sort({ updatedAt: -1 });

    res.json(payouts);
  } catch (err) {
    console.error("getPayouts error:", err);
    res.status(500).json({ message: "Failed to fetch payouts" });
  }
};

/**
 * UPDATE PAYOUT STATUS
 * PATCH /api/admin/payouts/:id/status
 */
export const updatePayoutStatus = async (req, res) => {
  try {
    const { payoutStatus } = req.body;
    const allowed = ["pending", "released", "failed"];

    if (!allowed.includes(payoutStatus)) {
      return res.status(400).json({ message: "Invalid payout status" });
    }

    const booking = await Booking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.payoutStatus = payoutStatus;
    await booking.save();

    const updated = await Booking.findById(booking._id)
      .populate("owner", "name email profilePicture phoneNumber")
      .populate("listing", "name brand model");

    res.json({ message: `Payout marked as ${payoutStatus}`, payout: updated });
  } catch (err) {
    console.error("updatePayoutStatus error:", err);
    res.status(500).json({ message: "Failed to update payout status" });
  }
};
