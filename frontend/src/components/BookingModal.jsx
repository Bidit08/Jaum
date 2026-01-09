import { useState } from "react";
import api from "../utils/api";
import { toast } from "react-toastify";

const BookingModal = ({ listing, onClose }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  const handleBooking = async () => {
    try {
      setLoading(true);

      await api.post("/bookings", {
        listingId: listing._id,
        startDate,
        endDate,
        seatsBooked: seats,
      });

      toast.success("Booking successful!");
      onClose();
    } catch {
      toast.error("Booking failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Confirm Booking</h2>

        {listing.listingType === "full" ? (
          <>
            <input type="date" onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" onChange={(e) => setEndDate(e.target.value)} />
          </>
        ) : (
          <input
            type="number"
            min="1"
            max={listing.availableSeats}
            value={seats}
            onChange={(e) => setSeats(e.target.value)}
          />
        )}

        <button
          onClick={handleBooking}
          disabled={loading}
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded"
        >
          {loading ? "Booking..." : "Confirm Booking"}
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
