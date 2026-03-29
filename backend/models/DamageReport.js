import mongoose from "mongoose";

const damageReportSchema = new mongoose.Schema(
  {
    booking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Booking",
      required: true,
      unique: true,
    },

    // Images captured by owner before rental starts (locked after upload)
    beforeImages: {
      type: [String],
      default: [],
    },

    // Images captured by renter after rental ends
    afterImages: {
      type: [String],
      default: [],
    },

    // Set when before images are uploaded – prevents re-upload
    beforeLockedAt: {
      type: Date,
      default: null,
    },

    // Lifecycle: pending → before-uploaded → after-uploaded → under-review → resolved
    reportStatus: {
      type: String,
      enum: [
        "pending",
        "before-uploaded",
        "after-uploaded",
        "under-review",
        "resolved",
      ],
      default: "pending",
    },

    // Owner's damage verdict
    damageStatus: {
      type: String,
      enum: ["none", "minor", "major"],
      default: "none",
    },

    ownerNotes: {
      type: String,
      default: "",
    },
  },
  { timestamps: true },
);

export default mongoose.model("DamageReport", damageReportSchema);
