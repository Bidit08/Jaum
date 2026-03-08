import Booking from "../models/Booking.js";

/**
 * Set Payment Method and Initiate Process
 * POST /api/payments/method
 */
export const selectPaymentMethod = async (req, res) => {
  try {
    const { bookingId, method } = req.body;
    const userId = req.user.id;

    const booking = await Booking.findById(bookingId).populate("listing");

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.user.toString() !== userId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    booking.paymentMethod = method;

    if (method === "cash") {
      booking.paymentStatus = "pending";
      // Generate a simple receipt number for cash
      booking.receiptNumber = `CSH-${Date.now()}-${booking._id.toString().toUpperCase().slice(-4)}`;
      await booking.save();

      return res.status(200).json({
        message: "Cash payment method selected. Please pay at the counter.",
        booking,
      });
    } else if (method === "khalti") {
      const secretKey = process.env.KHALTI_SECRET_KEY;
      const frontendUrl = (
        process.env.FRONTEND_URL || "http://localhost:5173"
      ).replace(/\/$/, "");

      if (!secretKey) {
        console.error("KHALTI_SECRET_KEY is missing in environment variables");
        return res
          .status(500)
          .json({ message: "Khalti payment is not configured on the server." });
      }

      // Logic from initiateKhaltiPayment
      const payload = {
        return_url: `${frontendUrl}/payment/success`,
        website_url: frontendUrl,
        amount: booking.totalPrice * 100,
        purchase_order_id: booking._id,
        purchase_order_name: `Booking for ${booking.listing.name}`,
      };

      const khaltiResponse = await fetch(
        "https://a.khalti.com/api/v2/epayment/initiate/",
        {
          method: "POST",
          headers: {
            Authorization: `Key ${secretKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await khaltiResponse.json();

      if (khaltiResponse.ok && data.pidx) {
        booking.pidx = data.pidx;
        await booking.save();

        return res.status(200).json({
          payment_url: data.payment_url,
          pidx: data.pidx,
        });
      } else {
        return res
          .status(400)
          .json({
            message: "Failed to initiate Khalti payment",
            details: data,
          });
      }
    } else {
      return res.status(400).json({ message: "Invalid payment method" });
    }
  } catch (error) {
    console.error("Select Payment Method Error:", error);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

/**
 * Verify Khalti ePayment (Existing but updated with receipt number)
 * POST /api/payments/khalti/verify
 */
export const verifyKhaltiPayment = async (req, res) => {
  try {
    const { pidx } = req.body;

    const secretKey = process.env.KHALTI_SECRET_KEY;

    if (!secretKey) {
      console.error("KHALTI_SECRET_KEY is missing in environment variables");
      return res
        .status(500)
        .json({
          message: "Khalti verification is not configured on the server.",
        });
    }

    const response = await fetch(
      "https://a.khalti.com/api/v2/epayment/lookup/",
      {
        method: "POST",
        headers: {
          Authorization: `Key ${secretKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pidx }),
      },
    );

    const data = await response.json();

    if (response.ok && data.status === "Completed") {
      const booking = await Booking.findOne({ pidx }).populate("listing");

      if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
      }

      booking.paymentStatus = "paid";
      booking.status = "confirmed";
      booking.receiptNumber = `KHT-${data.transaction_id || Date.now()}`;
      await booking.save();

      return res.status(200).json({
        message: "Payment verified successfully",
        booking,
      });
    } else {
      return res.status(400).json({
        message: "Payment verification failed",
        status: data?.status,
        details: data,
      });
    }
  } catch (error) {
    console.error("Khalti Verify Error:", error.message);
    res
      .status(500)
      .json({ message: "Payment verification failed", error: error.message });
  }
};
