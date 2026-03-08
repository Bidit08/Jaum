import path from "path";
import fs from "fs";
import Booking from "../models/Booking.js";
import { generateInvoice } from "../utils/invoiceGenerator.js";

/**
 * Download Invoice PDF
 * GET /api/bookings/:id/invoice
 */
export const downloadInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const booking = await Booking.findById(id)
      .populate("user", "name email")
      .populate("listing", "name listingType pricePerDay pricePerSeat");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Security: Only user who booked or listing owner can view invoice
    // Simplified: Only the user who made the booking for now
    if (booking.user._id.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Unauthorized access to this invoice" });
    }

    // Only allow for paid or confirmed bookings
    if (booking.paymentStatus !== "paid" && booking.paymentMethod !== "cash") {
      return res
        .status(400)
        .json({ message: "Invoice is only available for paid bookings" });
    }

    const fileName = `invoice-${booking._id}.pdf`;
    const outputPath = path.join(
      process.cwd(),
      "uploads",
      "invoices",
      fileName,
    );

    // Generate PDF (even if it exists, to ensure current data)
    await generateInvoice(booking, outputPath);

    // Update booking with invoice URL if not already there
    if (!booking.invoiceUrl) {
      booking.invoiceUrl = `/uploads/invoices/${fileName}`;
      await booking.save();
    }

    // Send file
    res.download(outputPath, fileName, (err) => {
      if (err) {
        console.error("Download Error:", err);
        if (!res.headersSent) {
          res.status(500).json({ message: "Could not download the file" });
        }
      }
    });
  } catch (error) {
    console.error("Invoice Controller Error:", error);
    res
      .status(500)
      .json({ message: "Failed to generate invoice", error: error.message });
  }
};
