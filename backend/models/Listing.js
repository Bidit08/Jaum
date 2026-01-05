// import mongoose from "mongoose";

// const vehicleSchema = new mongoose.Schema({
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User",
//     required: true,
//   },
//   title: { type: String, required: true },
//   brand: { type: String, required: true },
//   model: { type: String, required: true },
//   year: { type: Number, required: true },
//   seats: { type: Number, required: true },
//   fuelType: { type: String, required: true },
//   pricePerDay: { type: Number, required: true },
//   location: { type: String, required: true },
//   description: { type: String },
//   images: [String],
//   createdAt: { type: Date, default: Date.now },
// });

// export default mongoose.model("Vehicle", vehicleSchema);

// import mongoose from "mongoose";

// const listingSchema = new mongoose.Schema(
//   {
//     owner: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },

//     listingType: {
//       type: String,
//       enum: ["full", "seats"],
//       required: true,
//     },

//     // Basic Info
//     name: { type: String, required: true },
//     brand: { type: String, required: true },
//     model: { type: String, required: true },
//     year: { type: Number, required: true },
//     description: { type: String },

//     // Specs
//     fuelType: { type: String },
//     transmission: { type: String },
//     seats: { type: Number },
//     mileage: { type: String },
//     features: [{ type: String }],

//     // Full rental fields
//     pricePerDay: { type: Number },
//     deposit: { type: Number },
//     location: { type: String },

//     // Seat sharing fields
//     availableSeats: { type: Number },
//     pricePerSeat: { type: Number },
//     departure: { type: String },
//     destination: { type: String },
//     departureTime: { type: Date },
//     rules: { type: String },

//     // Photos
//     photos: [{ type: String }],

//     // Status
//     isActive: {
//       type: Boolean,
//       default: true,
//     },

//     isApproved: {
//       type: Boolean,
//       default: false, // admin approval later
//     },
//   },
//   { timestamps: true }
// );

// export default mongoose.model("Listing", listingSchema);

import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    listingType: {
      type: String,
      enum: ["full", "seats"],
      required: true,
      index: true,
    },

    // ===== BASIC INFO =====
    name: { type: String, required: true, trim: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    description: String,

    // ===== SPECS =====
    fuelType: String,
    transmission: String,
    seats: Number,
    mileage: String,
    features: [String],

    // ===== FULL RENTAL =====
    pricePerDay: {
      type: Number,
      required: function () {
        return this.listingType === "full";
      },
    },
    deposit: {
      type: Number,
      required: function () {
        return this.listingType === "full";
      },
    },
    location: {
      type: String,
      required: function () {
        return this.listingType === "full";
      },
    },

    // ===== SEAT SHARING =====
    availableSeats: {
      type: Number,
      required: function () {
        return this.listingType === "seats";
      },
    },
    pricePerSeat: {
      type: Number,
      required: function () {
        return this.listingType === "seats";
      },
    },
    departure: {
      type: String,
      required: function () {
        return this.listingType === "seats";
      },
    },
    destination: {
      type: String,
      required: function () {
        return this.listingType === "seats";
      },
    },
    departureTime: {
      type: Date,
      required: function () {
        return this.listingType === "seats";
      },
    },
    rules: String,

    // ===== PHOTOS =====
    photos: {
      type: [String],
      validate: [(v) => v.length > 0, "At least one photo required"],
    },

    // ===== STATUS =====
    status: {
      type: String,
      enum: ["draft", "active", "paused"],
      default: "active",
    },

    isApproved: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Listing", listingSchema);
