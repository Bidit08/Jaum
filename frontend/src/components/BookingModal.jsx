// import { useState } from "react";
// import { X, Loader2, Calendar, Users } from "lucide-react";
// import api from "../utils/api";
// import { toast } from "react-toastify";

// const BookingModal = ({ listing, onClose }) => {
//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [seats, setSeats] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const isFullVehicle = listing.listingType === "full";

//   const handleBooking = async () => {
//     if (isFullVehicle) {
//       if (!startDate || !endDate) {
//         toast.error("Please select start and end dates");
//         return;
//       }

//       if (new Date(endDate) <= new Date(startDate)) {
//         toast.error("End date must be after start date");
//         return;
//       }
//     } else {
//       if (seats < 1 || seats > listing.availableSeats) {
//         toast.error("Invalid seat selection");
//         return;
//       }
//     }

//     try {
//       setLoading(true);

//       await api.post("/bookings", {
//         listingId: listing._id,
//         startDate: isFullVehicle ? startDate : undefined,
//         endDate: isFullVehicle ? endDate : undefined,
//         seatsBooked: isFullVehicle ? undefined : Number(seats),
//       });

//       toast.success("Booking successful 🚀");
//       onClose();
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Booking failed. Try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
//       <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition"
//         >
//           <X />
//         </button>

//         {/* Header */}
//         <h2 className="text-2xl font-bold text-slate-900 mb-2">
//           Confirm Booking
//         </h2>
//         <p className="text-slate-500 mb-6 text-sm">{listing.name}</p>

//         {/* Full Vehicle Booking */}
//         {isFullVehicle ? (
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 Start Date
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 End Date
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* Seat Booking */
//           <div className="space-y-4">
//             <label className="text-sm font-semibold text-slate-600">
//               Seats to Book
//             </label>
//             <div className="relative">
//               <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="number"
//                 min="1"
//                 max={listing.availableSeats}
//                 value={seats}
//                 onChange={(e) => setSeats(e.target.value)}
//                 className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//             <p className="text-xs text-slate-500">
//               {listing.availableSeats} seats available
//             </p>
//           </div>
//         )}

//         {/* Action */}
//         <button
//           onClick={handleBooking}
//           disabled={loading}
//           className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition disabled:opacity-50"
//         >
//           {loading && <Loader2 className="animate-spin" size={18} />}
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;

// import { useState } from "react";
// import { X, Loader2, Calendar, Users } from "lucide-react";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const BookingModal = ({ listing, onClose }) => {
//   const navigate = useNavigate();

//   const [startDate, setStartDate] = useState("");
//   const [endDate, setEndDate] = useState("");
//   const [seats, setSeats] = useState(1);
//   const [loading, setLoading] = useState(false);

//   const isFullVehicle = listing.listingType === "full";

//   const handleBooking = async () => {
//     // 🔐 AUTH CHECK
//     const token = localStorage.getItem("token");

//     if (!token) {
//       toast.info("Please log in to continue");
//       onClose();

//       // 🔁 Redirect to login
//       navigate("/login", {
//         state: { redirectTo: `/listings/${listing._id}` },
//       });
//       return;
//     }
//     // Validation
//     if (isFullVehicle) {
//       if (!startDate || !endDate) {
//         toast.error("Please select start and end dates");
//         return;
//       }
//       if (new Date(endDate) <= new Date(startDate)) {
//         toast.error("End date must be after start date");
//         return;
//       }
//     } else {
//       if (seats < 1 || seats > listing.availableSeats) {
//         toast.error("Invalid seat selection");
//         return;
//       }
//     }

//     try {
//       setLoading(true);

//       await api.post("/bookings", {
//         listingId: listing._id,
//         startDate: isFullVehicle ? startDate : undefined,
//         endDate: isFullVehicle ? endDate : undefined,
//         seatsBooked: isFullVehicle ? undefined : Number(seats),
//       });

//       toast.success("Booking successful 🚀");
//       onClose();

//       // ✅ REDIRECT TO PROFILE → MY BOOKINGS
//       navigate("/dashboard/profile?tab=bookings");
//     } catch (err) {
//       // toast.error(err.response?.data?.message || "Booking failed. Try again.");
//       toast.error(
//         err.response?.data?.message ||
//           "Vehicle is unavailable for selected dates",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
//       <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition"
//         >
//           <X />
//         </button>

//         {/* Header */}
//         <h2 className="text-2xl font-bold text-slate-900 mb-2">
//           Confirm Booking
//         </h2>
//         <p className="text-slate-500 mb-6 text-sm">{listing.name}</p>

//         {/* Full Vehicle */}
//         {isFullVehicle ? (
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 Start Date
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="date"
//                   value={startDate}
//                   onChange={(e) => setStartDate(e.target.value)}
//                   className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 End Date
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   type="date"
//                   value={endDate}
//                   onChange={(e) => setEndDate(e.target.value)}
//                   className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         ) : (
//           // Seat booking
//           <div className="space-y-4">
//             <label className="text-sm font-semibold text-slate-600">
//               Seats to Book
//             </label>
//             <div className="relative">
//               <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="number"
//                 min="1"
//                 max={listing.availableSeats}
//                 value={seats}
//                 onChange={(e) => setSeats(e.target.value)}
//                 className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//             <p className="text-xs text-slate-500">
//               {listing.availableSeats} seats available
//             </p>
//           </div>
//         )}

//         {/* Action */}
//         <button
//           onClick={handleBooking}
//           disabled={loading}
//           className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition disabled:opacity-50"
//         >
//           {loading && <Loader2 className="animate-spin" size={18} />}
//           Confirm Booking
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;

// import { useEffect, useState } from "react";
// import { X, Loader2, Calendar, Users } from "lucide-react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
// import api from "../utils/api";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";

// const BookingModal = ({ listing, onClose }) => {
//   const navigate = useNavigate();

//   // 🔒 HARD GUARD (prevents crash)
//   if (!listing) return null;

//   const isFullVehicle = listing.listingType === "full";

//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [seats, setSeats] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [blockedRanges, setBlockedRanges] = useState([]);

//   /* ===============================
//      FETCH BLOCKED DATES (FULL ONLY)
//   =============================== */
//   useEffect(() => {
//     if (!isFullVehicle) return;

//     api
//       .get(`/bookings/blocked/${listing._id}`)
//       .then((res) => {
//         const ranges = Array.isArray(res.data)
//           ? res.data.map((b) => ({
//               start: new Date(b.startDate),
//               end: new Date(b.endDate),
//             }))
//           : [];

//         setBlockedRanges(ranges);
//       })
//       .catch(() => {
//         toast.error("Failed to load availability");
//       });
//   }, [listing, isFullVehicle]);

//   /* ===============================
//      SUBMIT BOOKING
//   =============================== */
//   const handleBooking = async () => {
//     // 🔐 Auth check
//     if (!localStorage.getItem("token")) {
//       toast.info("Please log in to continue");
//       onClose();
//       navigate("/login", {
//         state: { redirectTo: `/listings/${listing._id}` },
//       });
//       return;
//     }

//     if (isFullVehicle) {
//       if (!startDate || !endDate) {
//         toast.error("Please select start and end dates");
//         return;
//       }

//       if (endDate <= startDate) {
//         toast.error("End date must be after start date");
//         return;
//       }
//     } else {
//       if (seats < 1 || seats > listing.availableSeats) {
//         toast.error("Invalid seat selection");
//         return;
//       }
//     }

//     try {
//       setLoading(true);

//       await api.post("/bookings", {
//         listingId: listing._id,
//         startDate: isFullVehicle ? startDate : undefined,
//         endDate: isFullVehicle ? endDate : undefined,
//         seatsBooked: !isFullVehicle ? seats : undefined,
//       });

//       toast.success("Booking request sent! Awaiting approval.");
//       onClose();

//       navigate("/dashboard/profile", {
//         state: { tab: "bookings" },
//       });
//     } catch (err) {
//       toast.error(
//         err.response?.data?.message ||
//           "Booking failed. Vehicle may be unavailable."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
//       <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95">
//         {/* Close */}
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition"
//         >
//           <X />
//         </button>

//         <h2 className="text-2xl font-bold text-slate-900 mb-1">
//           Confirm Booking
//         </h2>
//         <p className="text-slate-500 mb-6 text-sm">{listing.name}</p>

//         {/* FULL VEHICLE */}
//         {isFullVehicle ? (
//           <div className="space-y-4">
//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 Start Date
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-3.5 text-slate-400 z-10" />
//                 <DatePicker
//                   selected={startDate}
//                   onChange={(date) => setStartDate(date)}
//                   excludeDateIntervals={blockedRanges}
//                   minDate={new Date()}
//                   placeholderText="Select start date"
//                   className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="text-sm font-semibold text-slate-600">
//                 End Date
//               </label>
//               <div className="relative">
//                 <Calendar className="absolute left-3 top-3.5 text-slate-400 z-10" />
//                 <DatePicker
//                   selected={endDate}
//                   onChange={(date) => setEndDate(date)}
//                   excludeDateIntervals={blockedRanges}
//                   minDate={startDate || new Date()}
//                   placeholderText="Select end date"
//                   className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//                 />
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* SEAT BOOKING */
//           <div className="space-y-4">
//             <label className="text-sm font-semibold text-slate-600">
//               Seats to Book
//             </label>
//             <div className="relative">
//               <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//               <input
//                 type="number"
//                 min="1"
//                 max={listing.availableSeats}
//                 value={seats}
//                 onChange={(e) => setSeats(Number(e.target.value))}
//                 className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
//               />
//             </div>
//             <p className="text-xs text-slate-500">
//               {listing.availableSeats} seats available
//             </p>
//           </div>
//         )}

//         <button
//           onClick={handleBooking}
//           disabled={loading}
//           className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition disabled:opacity-50"
//         >
//           {loading && <Loader2 className="animate-spin" size={18} />}
//           Confirm Booking
//         </button>

//         <p className="mt-4 text-xs text-center text-slate-400">
//           Booking will be confirmed after owner approval
//         </p>
//       </div>
//     </div>
//   );
// };

// export default BookingModal;

import { useEffect, useState } from "react";
import { X, Loader2, Calendar, Users } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ listing, onClose }) => {
  const navigate = useNavigate();

  // 🔒 HARD GUARD (prevents crash)
  if (!listing) return null;

  const isFullVehicle = listing.listingType === "full";

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);
  const [blockedRanges, setBlockedRanges] = useState([]);

  /* ===============================
     FETCH BLOCKED DATES (FULL ONLY)
  =============================== */
  useEffect(() => {
    if (!isFullVehicle) return;

    api
      .get(`/bookings/blocked/${listing._id}`)
      .then((res) => {
        const ranges = Array.isArray(res.data)
          ? res.data.map((b) => ({
              start: new Date(b.startDate),
              end: new Date(b.endDate),
            }))
          : [];

        setBlockedRanges(ranges);
      })
      .catch(() => {
        toast.error("Failed to load availability");
      });
  }, [listing, isFullVehicle]);

  /* ===============================
     SUBMIT BOOKING
  =============================== */
  const handleBooking = async () => {
    // 🔐 Auth check
    const token = localStorage.getItem("token");
    if (!token) {
      toast.info("Please log in to continue");
      onClose();
      navigate("/login", {
        state: { redirectTo: `/listings/${listing._id}` },
      });
      return;
    }

    if (isFullVehicle) {
      if (!startDate || !endDate) {
        toast.error("Please select start and end dates");
        return;
      }
      if (endDate <= startDate) {
        toast.error("End date must be after start date");
        return;
      }
    } else {
      if (seats < 1 || seats > listing.availableSeats) {
        toast.error("Invalid seat selection");
        return;
      }
    }

    try {
      setLoading(true);

      await api.post("/bookings", {
        listingId: listing._id,
        startDate: isFullVehicle ? startDate : undefined,
        endDate: isFullVehicle ? endDate : undefined,
        seatsBooked: isFullVehicle ? undefined : Number(seats),
      });

      toast.success("Booking request sent! Awaiting approval.");
      onClose();

      navigate("/dashboard/profile?tab=bookings");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          "Booking failed. Vehicle may be unavailable.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-4 animate-in fade-in duration-200">
      <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 transition text-slate-500 hover:text-slate-900"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Confirm Booking</h2>
          <p className="text-slate-500 text-sm mt-1">{listing.name}</p>
        </div>

        {/* 🚙 Full Vehicle Booking (Date Range) */}
        {isFullVehicle ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                Select Dates
              </label>
              <div className="relative">
                <DatePicker
                  selected={startDate}
                  onChange={(dates) => {
                    const [start, end] = dates;

                    let isOverlapping = false;
                    if (start && end) {
                      for (const range of blockedRanges) {
                        if (start < range.start && end > range.start) {
                          isOverlapping = true;
                          break;
                        }
                      }
                    }

                    if (isOverlapping) {
                      toast.error(
                        "Selected range overlaps with an existing booking",
                      );
                      setStartDate(start);
                      setEndDate(null);
                    } else {
                      setStartDate(start);
                      setEndDate(end);
                    }
                  }}
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  selectsRange
                  excludeDateIntervals={blockedRanges}
                  placeholderText="Start Date - End Date"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
                />
                <Calendar
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            {/* Summary */}
            {startDate && endDate && (
              <div className="bg-blue-50 p-4 rounded-xl flex justify-between items-center text-sm font-semibold text-blue-800">
                <span>Total Days:</span>
                <span>
                  {Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))}{" "}
                  days
                </span>
              </div>
            )}
          </div>
        ) : (
          /* 💺 Seat Booking */
          <div className="space-y-4">
            <div>
              <label className="text-sm font-bold text-slate-700 mb-1.5 block">
                Seats to Book
              </label>
              <div className="relative">
                <Users
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
                <input
                  type="number"
                  min="1"
                  max={listing.seats} // Assuming listing.seats is available capacity for simplification
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700"
                />
              </div>
            </div>
            <p className="text-xs text-slate-500">
              {listing.availableSeats} seats available{" "}
            </p>
            <p className="text-xs text-center text-slate-400 font-medium">
              {listing.seats} seats total capacity
            </p>
          </div>
        )}

        {/* Action Button */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="mt-8 w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-600/20 active:scale-95"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            "Confirm Booking"
          )}
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
