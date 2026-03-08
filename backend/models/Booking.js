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
      enum: ["pending", "confirmed", "rejected", "cancelled"],
      default: "pending",
    },

    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },

    paymentMethod: {
      type: String,
      enum: ["khalti", "cash"],
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
  },
  { timestamps: true },
);

export default mongoose.model("Booking", bookingSchema);
