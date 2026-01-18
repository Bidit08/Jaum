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

import { useState } from "react";
import { X, Loader2, Calendar, Users } from "lucide-react";
import api from "../utils/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const BookingModal = ({ listing, onClose }) => {
  const navigate = useNavigate();

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [seats, setSeats] = useState(1);
  const [loading, setLoading] = useState(false);

  const isFullVehicle = listing.listingType === "full";

  const handleBooking = async () => {
    // Validation
    if (isFullVehicle) {
      if (!startDate || !endDate) {
        toast.error("Please select start and end dates");
        return;
      }
      if (new Date(endDate) <= new Date(startDate)) {
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

      toast.success("Booking successful 🚀");
      onClose();

      // ✅ REDIRECT TO PROFILE → MY BOOKINGS
      navigate("/dashboard/profile?tab=bookings");
    } catch (err) {
      toast.error(err.response?.data?.message || "Booking failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="relative bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl animate-in zoom-in-95">
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl hover:bg-slate-100 transition"
        >
          <X />
        </button>

        {/* Header */}
        <h2 className="text-2xl font-bold text-slate-900 mb-2">
          Confirm Booking
        </h2>
        <p className="text-slate-500 mb-6 text-sm">{listing.name}</p>

        {/* Full Vehicle */}
        {isFullVehicle ? (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-slate-600">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-semibold text-slate-600">
                End Date
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>
          </div>
        ) : (
          // Seat booking
          <div className="space-y-4">
            <label className="text-sm font-semibold text-slate-600">
              Seats to Book
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="number"
                min="1"
                max={listing.availableSeats}
                value={seats}
                onChange={(e) => setSeats(e.target.value)}
                className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <p className="text-xs text-slate-500">
              {listing.availableSeats} seats available
            </p>
          </div>
        )}

        {/* Action */}
        <button
          onClick={handleBooking}
          disabled={loading}
          className="mt-8 w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition disabled:opacity-50"
        >
          {loading && <Loader2 className="animate-spin" size={18} />}
          Confirm Booking
        </button>
      </div>
    </div>
  );
};

export default BookingModal;
