// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     listing: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing",
//       required: true,
//     },

//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     bookingType: {
//       type: String,
//       enum: ["full", "seats"],
//       required: true,
//     },

//     // FULL VEHICLE
//     startDate: Date,
//     endDate: Date,
//     totalDays: Number,

//     // SEAT LISTING
//     seatsBooked: Number,

//     totalPrice: {
//       type: Number,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Booking", bookingSchema);

// import mongoose from "mongoose";

// const bookingSchema = new mongoose.Schema(
//   {
//     user: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//       index: true,
//     },

//     listing: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing",
//       required: true,
//     },

//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     bookingType: {
//       type: String,
//       enum: ["full", "seats"],
//       required: true,
//     },

//     // FULL VEHICLE
//     startDate: Date,
//     endDate: Date,
//     totalDays: Number,

//     // SEAT LISTING
//     seatsBooked: Number,

//     totalPrice: {
//       type: Number,
//       required: true,
//     },

//     status: {
//       type: String,
//       enum: ["pending", "confirmed", "rejected", "cancelled"],
//       default: "pending",
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Booking", bookingSchema);

import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bookingType: {
      type: String,
      enum: ["full", "seats"],
      required: true,
    },

    // FULL VEHICLE
    startDate: Date,
    endDate: Date,
    totalDays: Number,

    // SEAT LISTING
    seatsBooked: Number,

    totalPrice: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      enum: [
        "pending",
        "approved-awaiting-payment",
        "confirmed",
        "rejected",
        "cancelled",
        "completed",
      ],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["khalti", "cash"],
    },

    transactionId: {
      type: String,
    },

    refundHandleStatus: {
      type: String,
      enum: ["none", "pending", "processed", "rejected"],
      default: "none",
    },

    receiptNumber: {
      type: String,
      unique: true,
      sparse: true,
    },

    invoiceUrl: {
      type: String,
    },

    pidx: {
      type: String,
    },

    isDisputed: {
      type: Boolean,
      default: false,
    },

    disputeReason: {
      type: String,
    },

    isFlagged: {
      type: Boolean,
      default: false,
    },

    commissionRate: {
      type: Number,
      default: 10,
    },
    commissionAmount: {
      type: Number,
    },
    ownerAmount: {
      type: Number,
    },
    payoutStatus: {
      type: String,
      enum: ["pending", "released", "failed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
