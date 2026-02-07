import { useEffect, useState } from "react";
import api from "../../utils/api";
import { CheckCircle, XCircle, Calendar, Users, Car } from "lucide-react";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:5000";

const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  const fetchOwnerBookings = async () => {
    try {
      const res = await api.get("/bookings/owner");
      setBookings(res.data || []);
    } catch (err) {
      toast.error("Failed to load incoming bookings");
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      setActionId(id);
      await api.put(`/bookings/${id}/${action}`);
      toast.success(`Booking ${action}d`);
      setBookings((prev) => prev.filter((b) => b._id !== id));
    } catch (err) {
      toast.error("Action failed");
    } finally {
      setActionId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
        <h3 className="text-2xl font-bold text-slate-900 mb-2">
          No incoming bookings
        </h3>
        <p className="text-slate-500">
          When users book your vehicles, requests will appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6"
        >
          {/* Listing Image */}
          <img
            src={
              b.listing?.photos?.length
                ? `${BACKEND_URL}${b.listing.photos[0]}`
                : "/placeholder-car.jpg"
            }
            alt={b.listing?.name}
            className="w-full md:w-32 h-24 object-cover rounded-2xl border"
          />

          {/* Booking Info */}
          <div className="flex-1 space-y-2">
            <h4 className="text-lg font-bold text-slate-900">
              {b.listing?.name}
            </h4>

            <div className="flex flex-wrap gap-4 text-sm text-slate-600">
              <span className="flex items-center gap-1">
                <Car size={14} />
                {b.bookingType === "full" ? "Full Vehicle" : "Seat Booking"}
              </span>

              {b.bookingType === "full" ? (
                <span className="flex items-center gap-1">
                  <Calendar size={14} />
                  {new Date(b.startDate).toLocaleDateString()} →{" "}
                  {new Date(b.endDate).toLocaleDateString()}
                </span>
              ) : (
                <span className="flex items-center gap-1">
                  <Users size={14} />
                  {b.seatsBooked} seats
                </span>
              )}
            </div>

            <p className="font-semibold text-slate-900">
              Total: Rs. {b.totalPrice}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => handleAction(b._id, "approve")}
              disabled={actionId === b._id}
              className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition disabled:opacity-50"
            >
              <CheckCircle size={18} />
              Approve
            </button>

            <button
              onClick={() => handleAction(b._id, "reject")}
              disabled={actionId === b._id}
              className="flex items-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl transition disabled:opacity-50"
            >
              <XCircle size={18} />
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OwnerBookings;
