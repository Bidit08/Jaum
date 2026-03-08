import PDFDocument from "pdfkit";
import fs from "fs";
import path from "path";

/**
 * Generate a PDF invoice for a booking
 * @param {Object} booking - The booking object populated with user and listing
 * @param {string} outputPath - Where to save the PDF
 */
export const generateInvoice = (booking, outputPath) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: "A4", margin: 50 });

      // Create directories if they don't exist
      const dir = path.dirname(outputPath);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      const stream = fs.createWriteStream(outputPath);
      doc.pipe(stream);

      // --- Header ---
      doc
        .fillColor("#444444")
        .fontSize(20)
        .text("JAUM", 50, 57)
        .fontSize(10)
        .text("Premium Car Rental & Ride Sharing", 50, 80)
        .fillColor("#000000")
        .fontSize(20)
        .text("INVOICE", 50, 120, { align: "right" });

      doc.moveDown();

      // --- Invoice Info ---
      const infoTop = 160;
      doc
        .fontSize(10)
        .font("Helvetica-Bold")
        .text("Invoice Number:", 50, infoTop)
        .font("Helvetica")
        .text(
          booking.receiptNumber ||
            `INV-${booking._id.toString().toUpperCase().slice(-6)}`,
          150,
          infoTop,
        )
        .font("Helvetica-Bold")
        .text("Invoice Date:", 50, infoTop + 15)
        .font("Helvetica")
        .text(new Date().toLocaleDateString(), 150, infoTop + 15)
        .font("Helvetica-Bold")
        .text("Booking ID:", 50, infoTop + 30)
        .font("Helvetica")
        .text(booking._id, 150, infoTop + 30);

      // --- Customer Info ---
      doc
        .font("Helvetica-Bold")
        .text("Bill To:", 350, infoTop)
        .font("Helvetica")
        .text(booking.user.name, 350, infoTop + 15)
        .text(booking.user.email, 350, infoTop + 30);

      doc.moveDown(4);

      // --- Table Header ---
      const tableTop = 250;
      doc.font("Helvetica-Bold");
      generateTableRow(doc, tableTop, "Description", "Details", "Amount");
      generateHr(doc, tableTop + 20);

      // --- Table Body ---
      doc.font("Helvetica");
      let currentHeight = tableTop + 30;

      generateTableRow(
        doc,
        currentHeight,
        "Vehicle Rental",
        booking.listing.name,
        `NPR ${booking.totalPrice.toFixed(2)}`,
      );

      currentHeight += 20;

      if (booking.bookingType === "full") {
        generateTableRow(
          doc,
          currentHeight,
          "Duration",
          `${booking.totalDays} Days (${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()})`,
          "",
        );
      } else {
        generateTableRow(
          doc,
          currentHeight,
          "Seats",
          `${booking.seatsBooked} Seats`,
          "",
        );
      }

      generateHr(doc, currentHeight + 25);

      // --- Totals ---
      const totalTop = currentHeight + 40;
      doc.font("Helvetica-Bold");

      doc.text("Total Paid:", 350, totalTop);
      doc.text(`NPR ${booking.totalPrice.toFixed(2)}`, 450, totalTop, {
        align: "right",
      });

      doc
        .fontSize(10)
        .text("Payment Method:", 50, totalTop)
        .font("Helvetica")
        .text(booking.paymentMethod.toUpperCase(), 150, totalTop);

      doc
        .font("Helvetica-Bold")
        .text("Payment Status:", 50, totalTop + 15)
        .fillColor(booking.paymentStatus === "paid" ? "#10b981" : "#f59e0b")
        .text(booking.paymentStatus.toUpperCase(), 150, totalTop + 15);

      // --- Footer ---
      doc
        .fillColor("#444444")
        .fontSize(10)
        .text("Thank you for choosing Jaum. Ride safe!", 50, 700, {
          align: "center",
          width: 500,
        });

      doc.end();
      stream.on("finish", () => resolve(outputPath));
      stream.on("error", reject);
    } catch (error) {
      reject(error);
    }
  });
};

function generateTableRow(doc, y, item, description, amount) {
  doc
    .fontSize(10)
    .text(item, 50, y)
    .text(description, 150, y)
    .text(amount, 500, y, { align: "right" });
}

function generateHr(doc, y) {
  doc.strokeColor("#aaaaaa").lineWidth(1).moveTo(50, y).lineTo(550, y).stroke();
}
