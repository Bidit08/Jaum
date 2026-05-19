const baseStyle = `
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background-color: #f9fafb;
  padding: 40px 20px;
  color: #1f2937;
`;

const containerStyle = `
  max-width: 600px;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

const headerStyle = `
  background-color: #4f46e5;
  padding: 32px;
  text-align: center;
`;

const contentStyle = `
  padding: 32px;
`;

const footerStyle = `
  padding: 24px;
  text-align: center;
  font-size: 14px;
  color: #6b7280;
  background-color: #f3f4f6;
`;

const buttonStyle = `
  display: inline-block;
  padding: 12px 24px;
  background-color: #4f46e5;
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  margin-top: 24px;
`;

const infoBoxStyle = `
  background-color: #f3f4f6;
  border-radius: 12px;
  padding: 20px;
  margin-top: 24px;
`;

const formatCurrency = (amount) => `Rs. ${amount.toLocaleString()}`;

export const bookingRequestedTemplate = (
  ownerName,
  userName,
  listingName,
  booking,
) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">New Booking Request</h1>
    </div>
    <div style="${contentStyle}">
      <p style="font-size: 16px; margin: 0;">Hi <strong>${ownerName}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
        Good news! <strong>${userName}</strong> has requested to book your vehicle <strong>${listingName}</strong>.
      </p>
      
      <div style="${infoBoxStyle}">
        <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #374151;">Booking Details:</h3>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Listing:</strong> ${listingName}</p>
        ${
          booking.bookingType === "full"
            ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Dates:</strong> ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}</p>`
            : `<p style="margin: 4px 0; font-size: 14px;"><strong>Seats:</strong> ${booking.seatsBooked}</p>`
        }
        <p style="margin: 4px 0; font-size: 14px;"><strong>Total Price:</strong> ${formatCurrency(booking.totalPrice)}</p>
      </div>

      <p style="margin-top: 24px; font-size: 14px; color: #6b7280;">
        Please log in to your dashboard to approve or reject this request.
      </p>
      
      <a href="${process.env.FRONTEND_URL}/dashboard/bookings" style="${buttonStyle}">Review Request</a>
    </div>
    <div style="${footerStyle}">
      &copy; ${new Date().getFullYear()} Jaum Rentals. All rights reserved.
    </div>
  </div>
</div>
`;

export const bookingApprovedTemplate = (userName, listingName, booking) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Booking Approved!</h1>
    </div>
    <div style="${contentStyle}">
      <p style="font-size: 16px; margin: 0;">Hi <strong>${userName}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
        Your booking request for <strong>${listingName}</strong> has been <strong>approved</strong> by the owner!
      </p>
      
      <p style="font-size: 16px; margin-top: 16px;">
        To secure your booking, please complete the payment within the next few hours.
      </p>

      <div style="${infoBoxStyle}">
        <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #374151;">Booking Summary:</h3>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Vehicle:</strong> ${listingName}</p>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Amount to Pay:</strong> ${formatCurrency(booking.totalPrice)}</p>
      </div>

      <a href="${process.env.FRONTEND_URL}/dashboard/bookings" style="${buttonStyle}">Pay Now</a>
    </div>
    <div style="${footerStyle}">
      &copy; ${new Date().getFullYear()} Jaum Rentals. All rights reserved.
    </div>
  </div>
</div>
`;

export const bookingRejectedTemplate = (userName, listingName) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}; background-color: #ef4444;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Booking Update</h1>
    </div>
    <div style="${contentStyle}">
      <p style="font-size: 16px; margin: 0;">Hi <strong>${userName}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
        We're sorry to inform you that your booking request for <strong>${listingName}</strong> could not be accepted at this time.
      </p>
      
      <p style="font-size: 16px; margin-top: 16px;">
        Don't worry! There are plenty of other amazing vehicles available on Jaum.
      </p>

      <a href="${process.env.FRONTEND_URL}/listings" style="${buttonStyle}">Explore Other Vehicles</a>
    </div>
    <div style="${footerStyle}">
      &copy; ${new Date().getFullYear()} Jaum Rentals. All rights reserved.
    </div>
  </div>
</div>
`;

export const bookingConfirmedTemplate = (
  userName,
  listingName,
  booking,
  isOwner = false,
) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}; background-color: #10b981;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Booking Confirmed!</h1>
    </div>
    <div style="${contentStyle}">
      <p style="font-size: 16px; margin: 0;">Hi <strong>${userName}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
        ${
          isOwner
            ? `The booking for <strong>${listingName}</strong> has been confirmed and paid for.`
            : `Your booking for <strong>${listingName}</strong> is now <strong>confirmed</strong>! Pack your bags and get ready.`
        }
      </p>
      
      <div style="${infoBoxStyle}">
        <h3 style="margin: 0 0 12px 0; font-size: 16px; color: #374151;">Trip Details:</h3>
        <p style="margin: 4px 0; font-size: 14px;"><strong>Vehicle:</strong> ${listingName}</p>
        ${
          booking.bookingType === "full"
            ? `<p style="margin: 4px 0; font-size: 14px;"><strong>Dates:</strong> ${new Date(booking.startDate).toLocaleDateString()} - ${new Date(booking.endDate).toLocaleDateString()}</p>`
            : `<p style="margin: 4px 0; font-size: 14px;"><strong>Seats:</strong> ${booking.seatsBooked}</p>`
        }
        <p style="margin: 4px 0; font-size: 14px;"><strong>Receipt No:</strong> ${booking.receiptNumber || "N/A"}</p>
      </div>

      <a href="${process.env.FRONTEND_URL}/dashboard/bookings" style="${buttonStyle}">View Booking</a>
    </div>
    <div style="${footerStyle}">
      &copy; ${new Date().getFullYear()} Jaum Rentals. All rights reserved.
    </div>
  </div>
</div>
`;

export const bookingCancelledTemplate = (
  userName,
  listingName,
  cancelledBy,
  isRefundable = false,
) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}; background-color: #6b7280;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Booking Cancelled</h1>
    </div>
    <div style="${contentStyle}">
      <p style="font-size: 16px; margin: 0;">Hi <strong>${userName}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
        The booking for <strong>${listingName}</strong> has been <strong>cancelled</strong> by ${cancelledBy}.
      </p>
      
      ${
        isRefundable
          ? `<p style="font-size: 15px; color: #059669; margin-top: 12px; font-weight: 500;">A refund has been initiated and will be processed shortly.</p>`
          : ""
      }

      <a href="${process.env.FRONTEND_URL}/listings" style="${buttonStyle}">Book Another Trip</a>
    </div>
    <div style="${footerStyle}">
      &copy; ${new Date().getFullYear()} Jaum Rentals. All rights reserved.
    </div>
  </div>
</div>
`;

export const bookingCompletedTemplate = (userName, listingName) => `
<div style="${baseStyle}">
  <div style="${containerStyle}">
    <div style="${headerStyle}; background-color: #4f46e5;">
      <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Trip Completed!</h1>
    </div>
    <div style="${contentStyle}">
      <p style="font-size: 16px; margin: 0;">Hi <strong>${userName}</strong>,</p>
      <p style="font-size: 16px; line-height: 1.5; margin-top: 16px;">
        We hope you had a fantastic experience with <strong>${listingName}</strong>!
      </p>
      
      <p style="font-size: 16px; margin-top: 16px;">
        How was your trip? Please take a moment to leave a review and help other travelers.
      </p>

      <a href="${process.env.FRONTEND_URL}/dashboard/bookings" style="${buttonStyle}">Leave a Review</a>
    </div>
    <div style="${footerStyle}">
      &copy; ${new Date().getFullYear()} Jaum Rentals. All rights reserved.
    </div>
  </div>
</div>
`;
