// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { CheckCircle, XCircle, Calendar, Users, Car } from "lucide-react";
// import { toast } from "react-toastify";

// const BACKEND_URL = "http://localhost:5000";

// const OwnerBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionId, setActionId] = useState(null);

//   useEffect(() => {
//     fetchOwnerBookings();
//   }, []);

//   const fetchOwnerBookings = async () => {
//     try {
//       const res = await api.get("/bookings/owner");
//       setBookings(res.data || []);
//     } catch (err) {
//       toast.error("Failed to load incoming bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, action) => {
//     try {
//       setActionId(id);
//       await api.put(`/bookings/${id}/${action}`);
//       toast.success(`Booking ${action}d`);
//       setBookings((prev) => prev.filter((b) => b._id !== id));
//     } catch (err) {
//       toast.error("Action failed");
//     } finally {
//       setActionId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!bookings.length) {
//     return (
//       <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
//         <h3 className="text-2xl font-bold text-slate-900 mb-2">
//           No incoming bookings
//         </h3>
//         <p className="text-slate-500">
//           When users book your vehicles, requests will appear here.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {bookings.map((b) => (
//         <div
//           key={b._id}
//           className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6"
//         >
//           {/* Listing Image */}
//           <img
//             src={
//               b.listing?.photos?.length
//                 ? `${BACKEND_URL}${b.listing.photos[0]}`
//                 : "/placeholder-car.jpg"
//             }
//             alt={b.listing?.name}
//             className="w-full md:w-32 h-24 object-cover rounded-2xl border"
//           />

//           {/* Booking Info */}
//           <div className="flex-1 space-y-2">
//             <h4 className="text-lg font-bold text-slate-900">
//               {b.listing?.name}
//             </h4>

//             <div className="flex flex-wrap gap-4 text-sm text-slate-600">
//               <span className="flex items-center gap-1">
//                 <Car size={14} />
//                 {b.bookingType === "full" ? "Full Vehicle" : "Seat Booking"}
//               </span>

//               {b.bookingType === "full" ? (
//                 <span className="flex items-center gap-1">
//                   <Calendar size={14} />
//                   {new Date(b.startDate).toLocaleDateString()} →{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1">
//                   <Users size={14} />
//                   {b.seatsBooked} seats
//                 </span>
//               )}
//             </div>

//             <p className="font-semibold text-slate-900">
//               Amount to Collect: Rs. {b.totalPrice}
//             </p>
//             {b.ownerAmount && (
//               <p className="text-sm font-bold text-emerald-600">
//                 Your Payout: Rs. {b.ownerAmount}
//               </p>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3">
//             {b.status === "pending" && (
//               <>
//                 <button
//                   onClick={() => handleAction(b._id, "approve")}
//                   disabled={actionId === b._id}
//                   className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition disabled:opacity-50"
//                 >
//                   <CheckCircle size={18} />
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => handleAction(b._id, "reject")}
//                   disabled={actionId === b._id}
//                   className="flex items-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl transition disabled:opacity-50"
//                 >
//                   <XCircle size={18} />
//                   Reject
//                 </button>
//               </>
//             )}

//             {b.status === "approved-awaiting-payment" && (
//               <span className="px-5 py-3 bg-blue-50 text-blue-600 font-bold rounded-2xl flex items-center gap-2 border border-blue-200">
//                 Awaiting Payment
//               </span>
//             )}

//             {b.status === "confirmed" && (
//               <button
//                 onClick={() => handleAction(b._id, "complete")}
//                 disabled={actionId === b._id}
//                 className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition disabled:opacity-50 shadow-lg shadow-purple-200"
//               >
//                 <CheckCircle size={18} />
//                 Mark as Completed
//               </button>
//             )}

//             {b.status === "completed" && (
//               <span className="px-5 py-3 bg-slate-100 text-slate-500 font-bold rounded-2xl flex items-center gap-2 border border-slate-200">
//                 <CheckCircle size={18} className="text-emerald-500" />
//                 Completed
//               </span>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OwnerBookings;

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import {
//   CheckCircle,
//   XCircle,
//   Calendar,
//   Users,
//   Car,
//   Camera,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// import { toast } from "react-toastify";

// const BACKEND_URL = "http://localhost:5000";

// const OwnerBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [actionId, setActionId] = useState(null);

//   useEffect(() => {
//     fetchOwnerBookings();
//   }, []);

//   const fetchOwnerBookings = async () => {
//     try {
//       const res = await api.get("/bookings/owner");
//       setBookings(res.data || []);
//     } catch (err) {
//       toast.error("Failed to load incoming bookings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAction = async (id, action) => {
//     try {
//       setActionId(id);
//       await api.put(`/bookings/${id}/${action}`);
//       toast.success(`Booking ${action}d`);
//       setBookings((prev) => prev.filter((b) => b._id !== id));
//     } catch (err) {
//       toast.error("Action failed");
//     } finally {
//       setActionId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center py-20">
//         <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
//       </div>
//     );
//   }

//   if (!bookings.length) {
//     return (
//       <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center shadow-sm">
//         <h3 className="text-2xl font-bold text-slate-900 mb-2">
//           No incoming bookings
//         </h3>
//         <p className="text-slate-500">
//           When users book your vehicles, requests will appear here.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {bookings.map((b) => (
//         <div
//           key={b._id}
//           className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col md:flex-row md:items-center gap-6"
//         >
//           {/* Listing Image */}
//           <img
//             src={
//               b.listing?.photos?.length
//                 ? `${BACKEND_URL}${b.listing.photos[0]}`
//                 : "/placeholder-car.jpg"
//             }
//             alt={b.listing?.name}
//             className="w-full md:w-32 h-24 object-cover rounded-2xl border"
//           />

//           {/* Booking Info */}
//           <div className="flex-1 space-y-2">
//             <h4 className="text-lg font-bold text-slate-900">
//               {b.listing?.name}
//             </h4>

//             <div className="flex flex-wrap gap-4 text-sm text-slate-600">
//               <span className="flex items-center gap-1">
//                 <Car size={14} />
//                 {b.bookingType === "full" ? "Full Vehicle" : "Seat Booking"}
//               </span>

//               {b.bookingType === "full" ? (
//                 <span className="flex items-center gap-1">
//                   <Calendar size={14} />
//                   {new Date(b.startDate).toLocaleDateString()} →{" "}
//                   {new Date(b.endDate).toLocaleDateString()}
//                 </span>
//               ) : (
//                 <span className="flex items-center gap-1">
//                   <Users size={14} />
//                   {b.seatsBooked} seats
//                 </span>
//               )}
//             </div>

//             <p className="font-semibold text-slate-900">
//               Amount to Collect: Rs. {b.totalPrice}
//             </p>
//             {b.ownerAmount && (
//               <p className="text-sm font-bold text-emerald-600">
//                 Your Payout: Rs. {b.ownerAmount}
//               </p>
//             )}
//           </div>

//           {/* Actions */}
//           <div className="flex gap-3">
//             {b.status === "pending" && (
//               <>
//                 <button
//                   onClick={() => handleAction(b._id, "approve")}
//                   disabled={actionId === b._id}
//                   className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition disabled:opacity-50"
//                 >
//                   <CheckCircle size={18} />
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => handleAction(b._id, "reject")}
//                   disabled={actionId === b._id}
//                   className="flex items-center gap-2 px-5 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-2xl transition disabled:opacity-50"
//                 >
//                   <XCircle size={18} />
//                   Reject
//                 </button>
//               </>
//             )}

//             {b.status === "approved-awaiting-payment" && (
//               <span className="px-5 py-3 bg-blue-50 text-blue-600 font-bold rounded-2xl flex items-center gap-2 border border-blue-200">
//                 Awaiting Payment
//               </span>
//             )}

//             {b.status === "confirmed" && (
//               <div className="flex flex-col gap-2">
//                 <Link
//                   to={`/dashboard/damage-report/${b._id}`}
//                   className="flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition shadow-lg shadow-blue-200"
//                 >
//                   <Camera size={18} />
//                   Pickup Photos
//                 </Link>
//                 <button
//                   onClick={() => handleAction(b._id, "complete")}
//                   disabled={actionId === b._id}
//                   className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition disabled:opacity-50 shadow-lg shadow-purple-200"
//                 >
//                   <CheckCircle size={18} />
//                   Mark as Completed
//                 </button>
//               </div>
//             )}

//             {b.status === "completed" && (
//               <div className="flex flex-col gap-2">
//                 <Link
//                   to={`/dashboard/damage-report/${b._id}`}
//                   className="px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl flex items-center gap-2 border border-slate-700 transition"
//                 >
//                   <Camera size={18} />
//                   Damage Report
//                 </Link>
//                 <span className="px-5 py-3 bg-slate-100 text-slate-500 font-bold rounded-2xl flex items-center gap-2 border border-slate-200">
//                   <CheckCircle size={18} className="text-emerald-500" />
//                   Completed
//                 </span>
//               </div>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default OwnerBookings;

import { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Users,
  Car,
  Camera,
  BadgeCheck,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const BACKEND_URL = "https://jaum-t3no.onrender.com";

// ── Confirmation Modal ──────────────────────────────────────────────────────
const ConfirmCashModal = ({ booking, onConfirm, onCancel, loading }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
    <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 p-8 border border-slate-100">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center">
          <BadgeCheck size={24} className="text-emerald-600" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-900">
            Confirm Cash Payment
          </h3>
          <p className="text-sm text-slate-500">This action cannot be undone</p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-2xl p-4 mb-6 border border-slate-200 space-y-2">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Vehicle:</span>{" "}
          {booking.listing?.name}
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Renter:</span>{" "}
          {booking.user?.name}
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Amount:</span>{" "}
          <span className="text-emerald-600 font-bold">
            Rs. {booking.totalPrice}
          </span>
        </p>
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-slate-800">Receipt No:</span>{" "}
          {booking.receiptNumber || "N/A"}
        </p>
      </div>

      <p className="text-sm text-slate-500 mb-6">
        By confirming, you verify that you have physically received the cash
        payment. The renter will be notified and the booking will be marked as{" "}
        <strong>Completed</strong>.
      </p>

      <div className="flex gap-3">
        <button
          onClick={onCancel}
          disabled={loading}
          className="flex-1 px-5 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-2xl transition disabled:opacity-50"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition disabled:opacity-70 shadow-lg shadow-emerald-200"
        >
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" /> Confirming...
            </>
          ) : (
            <>
              <BadgeCheck size={18} /> Confirm Payment
            </>
          )}
        </button>
      </div>
    </div>
  </div>
);

// ── Main Component ──────────────────────────────────────────────────────────
const OwnerBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionId, setActionId] = useState(null);
  const [cashConfirmBooking, setCashConfirmBooking] = useState(null);
  const [cashLoading, setCashLoading] = useState(false);

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

  const handleMarkCashPaid = async () => {
    if (!cashConfirmBooking) return;
    try {
      setCashLoading(true);
      await api.patch(`/payments/${cashConfirmBooking._id}/mark-cash-paid`);
      toast.success("Cash payment confirmed! Renter has been notified.");
      setBookings((prev) =>
        prev.map((b) =>
          b._id === cashConfirmBooking._id
            ? { ...b, paymentStatus: "paid", cashPaidAt: new Date() }
            : b,
        ),
      );
      setCashConfirmBooking(null);
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to confirm cash payment",
      );
    } finally {
      setCashLoading(false);
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
    <>
      {/* Cash Payment Confirmation Modal */}
      {cashConfirmBooking && (
        <ConfirmCashModal
          booking={cashConfirmBooking}
          onConfirm={handleMarkCashPaid}
          onCancel={() => setCashConfirmBooking(null)}
          loading={cashLoading}
        />
      )}

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

                {/* Payment method badge */}
                {b.paymentMethod && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                      b.paymentMethod === "cash"
                        ? "bg-amber-100 text-amber-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {b.paymentMethod === "cash" ? "💵 Cash" : b.paymentMethod}
                  </span>
                )}
              </div>

              <p className="font-semibold text-slate-900">
                Amount to Collect: Rs. {b.totalPrice}
              </p>
              {b.ownerAmount && (
                <p className="text-sm font-bold text-emerald-600">
                  Your Payout: Rs. {b.ownerAmount}
                </p>
              )}

              {/* Cash Verified badge */}
              {b.paymentMethod === "cash" && b.paymentStatus === "paid" && (
                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  <BadgeCheck size={14} />
                  Cash Verified
                </span>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              {b.status === "pending" && (
                <>
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
                </>
              )}

              {b.status === "approved-awaiting-payment" && (
                <span className="px-5 py-3 bg-blue-50 text-blue-600 font-bold rounded-2xl flex items-center gap-2 border border-blue-200">
                  Awaiting Payment
                </span>
              )}

              {b.status === "confirmed" && (
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/dashboard/damage-report/${b._id}`}
                    className="flex items-center gap-2 px-5 py-3 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-2xl transition shadow-lg shadow-blue-200"
                  >
                    <Camera size={18} />
                    Pickup Photos
                  </Link>

                  {/* Mark as Paid — only for cash bookings not yet paid */}
                  {b.paymentMethod === "cash" && b.paymentStatus !== "paid" && (
                    <button
                      onClick={() => setCashConfirmBooking(b)}
                      className="flex items-center gap-2 px-5 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-2xl transition shadow-lg shadow-emerald-200"
                    >
                      <BadgeCheck size={18} />
                      Mark as Paid
                    </button>
                  )}

                  {/* Mark as Completed — for cash (once paid) or non-cash */}
                  {(b.paymentMethod !== "cash" ||
                    b.paymentStatus === "paid") && (
                    <button
                      onClick={() => handleAction(b._id, "complete")}
                      disabled={actionId === b._id}
                      className="flex items-center gap-2 px-5 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-2xl transition disabled:opacity-50 shadow-lg shadow-purple-200"
                    >
                      <CheckCircle size={18} />
                      Mark as Completed
                    </button>
                  )}
                </div>
              )}

              {b.status === "completed" && (
                <div className="flex flex-col gap-2">
                  <Link
                    to={`/dashboard/damage-report/${b._id}`}
                    className="px-5 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-2xl flex items-center gap-2 border border-slate-700 transition"
                  >
                    <Camera size={18} />
                    Damage Report
                  </Link>
                  <span className="px-5 py-3 bg-slate-100 text-slate-500 font-bold rounded-2xl flex items-center gap-2 border border-slate-200">
                    <CheckCircle size={18} className="text-emerald-500" />
                    Completed
                  </span>
                </div>
              )}

              {(b.status === "cancelled" || b.status === "rejected") && (
                <span className="px-5 py-3 bg-rose-50 text-rose-600 font-bold rounded-2xl flex items-center gap-2 border border-rose-200">
                  <XCircle size={18} />
                  {b.status === "cancelled" ? "Cancelled by User" : "Rejected"}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default OwnerBookings;
