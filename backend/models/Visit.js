// const mongoose = require("mongoose");

// const visitSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     vehicleId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing", // change to "Vehicle" if your model name is Vehicle
//       required: true,
//     },
//     ownerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     visitDate: {
//       type: Date,
//       required: true,
//     },
//     note: {
//       type: String,
//       default: "",
//       trim: true,
//       maxlength: 500,
//     },
//     status: {
//       type: String,
//       enum: [
//         "REQUESTED",
//         "APPROVED",
//         "REJECTED",
//         "RESCHEDULED",
//         "COMPLETED",
//         "CANCELLED",
//       ],
//       default: "REQUESTED",
//     },
//     adminNote: {
//       type: String,
//       default: "",
//       trim: true,
//     },
//   },
//   { timestamps: true },
// );

// module.exports = mongoose.model("Visit", visitSchema);

// import mongoose from "mongoose";

// const visitSchema = new mongoose.Schema(
//   {
//     userId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     ownerId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     vehicleId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Listing",
//       required: true,
//     },

//     visitDate: {
//       type: Date,
//       required: true,
//     },

//     note: {
//       type: String,
//       trim: true,
//     },

//     ownerNote: {
//       type: String,
//       trim: true,
//     },

//     status: {
//       type: String,
//       enum: [
//         "REQUESTED",
//         "APPROVED",
//         "REJECTED",
//         "RESCHEDULED",
//         "COMPLETED",
//         "CANCELLED",
//       ],
//       default: "REQUESTED",
//     },
//   },
//   { timestamps: true },
// );

// export default mongoose.model("Visit", visitSchema);

import mongoose from "mongoose";

const visitSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    vehicleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true,
      index: true,
    },
    visitDate: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      trim: true,
    },
    ownerNote: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: [
        "REQUESTED",
        "APPROVED",
        "REJECTED",
        "RESCHEDULED",
        "COMPLETED",
        "CANCELLED",
      ],
      default: "REQUESTED",
    },
  },
  { timestamps: true },
);

// Prevent duplicate pending requests for same user, vehicle and date (within same hour)
visitSchema.index({ userId: 1, vehicleId: 1, visitDate: 1 }, { unique: true });

const Visit = mongoose.model("Visit", visitSchema);
export default Visit;
