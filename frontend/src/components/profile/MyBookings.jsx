// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar } from "lucide-react";

// export default function BookingsTab() {
//   return (
//     <Card>
//       <CardContent className="py-10 text-center text-gray-500">
//         <Calendar className="mx-auto mb-2 h-6 w-6" />
//         No bookings yet
//       </CardContent>
//     </Card>
//   );
// }

// import { Card, CardContent } from "@/components/ui/card";
// import { Calendar } from "lucide-react";

// export default function BookingsTab() {
//   return (
//     <Card className="bg-white/10 backdrop-blur-xl border-white/20">
//       <CardContent className="py-12 text-center text-gray-400">
//         <Calendar className="mx-auto mb-3 h-7 w-7 text-cyan-400" />
//         No bookings yet
//       </CardContent>
//     </Card>
//   );
// }

// const MyBookings = () => {
//   return (
//     <div className="bg-white rounded-2xl p-6 shadow text-gray-500">
//       My bookings will appear here.
//     </div>
//   );
// };

// export default MyBookings;

// const MyBookings = () => {
//   return (
//     <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-gray-300">
//       My bookings will appear here.
//     </div>
//   );
// };

// export default MyBookings;

// const MyBookings = () => {
//   return (
//     <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-gray-300">
//       My bookings will appear here.
//     </div>
//   );
// };

// export default MyBookings;

// import React from "react";
// import { CalendarSearch } from "lucide-react";

// const MyBookings = () => {
//   return (
//     <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
//         <CalendarSearch className="text-slate-300" size={40} />
//       </div>

//       <div className="space-y-2">
//         <h3 className="text-2xl font-bold text-slate-900">
//           No active bookings yet
//         </h3>
//         <p className="text-slate-500 max-w-sm mx-auto font-medium">
//           Ready to hit the road? Discover premium vehicles and start your first
//           rental journey today.
//         </p>
//       </div>

//       <button className="mt-6 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
//         Explore Luxury Cars
//       </button>
//     </div>
//   );
// };

// export default MyBookings;

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { CalendarSearch, Car, Users, Calendar } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await api.get("/bookings/my");
//         setBookings(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) {
//     return <p className="text-slate-500">Loading bookings...</p>;
//   }

//   if (!bookings.length) {
//     return (
//       // <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm">
//       //   <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
//       //     <CalendarSearch className="text-slate-300" size={40} />
//       //   </div>

//       //   <h3 className="text-2xl font-bold text-slate-900">
//       //     No active bookings yet
//       //   </h3>
//       //   <p className="text-slate-500 max-w-sm mx-auto font-medium">
//       //     Ready to hit the road? Discover premium vehicles and start your first
//       //     rental journey today.
//       //   </p>
//       // </div>

//       <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
//         <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
//           <CalendarSearch className="text-slate-300" size={40} />
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-2xl font-bold text-slate-900">
//             No active bookings yet
//           </h3>
//           <p className="text-slate-500 max-w-sm mx-auto font-medium">
//             Ready to hit the road? Discover premium vehicles and start your
//             first rental journey today.
//           </p>
//         </div>

//         <button className="mt-6 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
//           Explore Luxury Cars
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {bookings.map((b) => (
//         <div
//           key={b._id}
//           className="bg-white border border-slate-200 rounded-3xl p-6 flex gap-6 items-center shadow-sm"
//         >
//           <img
//             src={
//               b.listing?.photos?.length
//                 ? `${BACKEND_URL}${b.listing.photos[0]}`
//                 : "/placeholder-car.jpg"
//             }
//             className="w-32 h-24 object-cover rounded-xl"
//             alt={b.listing?.name}
//           />

//           <div className="flex-1">
//             <h3 className="font-bold text-lg">{b.listing?.name}</h3>

//             <p className="text-sm text-slate-500 flex items-center gap-2">
//               {b.bookingType === "full" ? (
//                 <>
//                   <Car size={14} /> Full Vehicle
//                 </>
//               ) : (
//                 <>
//                   <Users size={14} /> {b.seatsBooked} Seats
//                 </>
//               )}
//             </p>

//             {b.startDate && (
//               <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
//                 <Calendar size={12} />
//                 {new Date(b.startDate).toLocaleDateString()} →{" "}
//                 {new Date(b.endDate).toLocaleDateString()}
//               </p>
//             )}
//           </div>

//           {/* <div className="text-right">
//             <p className="font-bold text-slate-900">₹{b.totalPrice}</p>
//             <span className="text-xs font-bold text-emerald-600">
//               {b.status}
//             </span>
//           </div> */}

//           <div className="text-right">
//             <p className="font-bold text-slate-900">₹{b.totalPrice}</p>

//             <span
//               className={`inline-block mt-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
//       ${
//         b.status === "pending"
//           ? "bg-amber-100 text-amber-700"
//           : b.status === "confirmed"
//             ? "bg-emerald-100 text-emerald-700"
//             : b.status === "rejected"
//               ? "bg-rose-100 text-rose-700"
//               : "bg-slate-100 text-slate-600"
//       }
//     `}
//             >
//               {b.status}
//             </span>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyBookings;

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import {
//   CalendarSearch,
//   Car,
//   Users,
//   Calendar,
//   FileText,
//   CreditCard,
//   Star,
//   Camera,
//   XCircle,
// } from "lucide-react";
// import { Link } from "react-router-dom";

// import { toast } from "react-toastify";
// import PaymentMethodModal from "../bookings/PaymentMethodModal";
// import ReviewModal from "../reviews/ReviewModal";

// const BACKEND_URL = "http://localhost:5000";

// const MyBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showPayment, setShowPayment] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [selectedBookingForReview, setSelectedBookingForReview] =
//     useState(null);

//   const [showCancelModal, setShowCancelModal] = useState(false);
//   const [selectedBookingToCancel, setSelectedBookingToCancel] = useState(null);
//   const [cancelLoading, setCancelLoading] = useState(false);

//   const handlePayment = (booking) => {
//     setSelectedBooking(booking);
//     setShowPayment(true);
//   };

//   const handleDownloadInvoice = async (bookingId) => {
//     try {
//       const response = await api.get(`/payments/${bookingId}/invoice`, {
//         responseType: "blob",
//       });
//       const url = window.URL.createObjectURL(new Blob([response.data]));
//       const link = document.createElement("a");
//       link.href = url;
//       link.setAttribute("download", `invoice-${bookingId}.pdf`);
//       document.body.appendChild(link);
//       link.click();
//       link.remove();
//       toast.success("Invoice downloaded!");
//     } catch (err) {
//       toast.error("Failed to download invoice");
//     }
//   };

//   const handleCancelBooking = async () => {
//     if (!selectedBookingToCancel) return;
//     setCancelLoading(true);
//     try {
//       const res = await api.put(
//         `/bookings/${selectedBookingToCancel._id}/cancel`,
//       );
//       toast.success(res.data.message || "Booking cancelled successfully");
//       setShowCancelModal(false);
//       setSelectedBookingToCancel(null);
//       // Refresh bookings
//       const fetchRes = await api.get("/bookings/my");
//       setBookings(fetchRes.data);
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Failed to cancel booking");
//     } finally {
//       setCancelLoading(false);
//     }
//   };

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const res = await api.get("/bookings/my");
//         setBookings(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBookings();
//   }, []);

//   if (loading) {
//     return <p className="text-slate-500">Loading bookings...</p>;
//   }

//   if (!bookings.length) {
//     return (
//       // <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm">
//       //   <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
//       //     <CalendarSearch className="text-slate-300" size={40} />
//       //   </div>

//       //   <h3 className="text-2xl font-bold text-slate-900">
//       //     No active bookings yet
//       //   </h3>
//       //   <p className="text-slate-500 max-w-sm mx-auto font-medium">
//       //     Ready to hit the road? Discover premium vehicles and start your first
//       //     rental journey today.
//       //   </p>
//       // </div>

//       <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
//         <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
//           <CalendarSearch className="text-slate-300" size={40} />
//         </div>

//         <div className="space-y-2">
//           <h3 className="text-2xl font-bold text-slate-900">
//             No active bookings yet
//           </h3>
//           <p className="text-slate-500 max-w-sm mx-auto font-medium">
//             Ready to hit the road? Discover premium vehicles and start your
//             first rental journey today.
//           </p>
//         </div>

//         <button className="mt-6 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
//           Explore Luxury Cars
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {bookings.map((b) => (
//         <div
//           key={b._id}
//           className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col md:flex-row gap-6 items-center shadow-sm"
//         >
//           <img
//             src={
//               b.listing?.photos?.length
//                 ? `${BACKEND_URL}${b.listing.photos[0]}`
//                 : "/placeholder-car.jpg"
//             }
//             className="w-full md:w-32 h-48 md:h-24 object-cover rounded-xl"
//             alt={b.listing?.name}
//           />

//           <div className="flex-1">
//             <h3 className="font-bold text-lg">{b.listing?.name}</h3>

//             <p className="text-sm text-slate-500 flex items-center gap-2">
//               {b.bookingType === "full" ? (
//                 <>
//                   <Car size={14} /> Full Vehicle
//                 </>
//               ) : (
//                 <>
//                   <Users size={14} /> {b.seatsBooked} Seats
//                 </>
//               )}
//             </p>

//             {b.startDate && (
//               <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
//                 <Calendar size={12} />
//                 {new Date(b.startDate).toLocaleDateString()} →{" "}
//                 {new Date(b.endDate).toLocaleDateString()}
//               </p>
//             )}
//           </div>

//           {/* <div className="text-right">
//             <p className="font-bold text-slate-900">₹{b.totalPrice}</p>
//             <span className="text-xs font-bold text-emerald-600">
//               {b.status}
//             </span>
//           </div> */}

//           <div className="text-right flex flex-col items-end gap-2 w-full md:w-auto">
//             <div>
//               <p className="font-bold text-slate-900 text-xl">
//                 ₹{b.totalPrice}
//               </p>
//               <div className="flex flex-wrap justify-end gap-2 mt-1">
//                 <span
//                   className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide
//                   ${
//                     b.status === "pending"
//                       ? "bg-amber-100 text-amber-700"
//                       : b.status === "approved-awaiting-payment"
//                         ? "bg-blue-100 text-blue-700"
//                         : b.status === "confirmed"
//                           ? "bg-emerald-100 text-emerald-700"
//                           : b.status === "rejected"
//                             ? "bg-rose-100 text-rose-700"
//                             : "bg-slate-100 text-slate-600"
//                   }`}
//                 >
//                   {b.status === "pending"
//                     ? "Waiting for owner approval"
//                     : b.status === "approved-awaiting-payment"
//                       ? "Approved"
//                       : b.status === "confirmed"
//                         ? "Booking confirmed"
//                         : b.status === "rejected"
//                           ? "Booking rejected by owner"
//                           : b.status}
//                 </span>

//                 {b.paymentStatus && (
//                   <span
//                     className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide
//                    ${
//                      b.paymentStatus === "paid"
//                        ? "bg-blue-100 text-blue-700"
//                        : b.paymentMethod === "cash"
//                          ? "bg-amber-100 text-amber-700"
//                          : "bg-slate-100 text-slate-500"
//                    }`}
//                   >
//                     {b.paymentMethod === "cash" && b.paymentStatus === "pending"
//                       ? "Cash Pending"
//                       : b.paymentStatus}
//                   </span>
//                 )}
//               </div>
//             </div>

//             <div className="flex flex-col gap-2">
//               {b.status === "approved-awaiting-payment" &&
//                 b.paymentStatus !== "paid" && (
//                   <button
//                     onClick={() => handlePayment(b)}
//                     className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all text-xs flex items-center gap-2 shadow-lg shadow-blue-200"
//                   >
//                     <CreditCard size={14} />
//                     Pay Now
//                   </button>
//                 )}

//               {/* Download Invoice Button (Show if paid or confirmed cash) */}
//               {(b.paymentStatus === "paid" ||
//                 (b.paymentMethod === "cash" &&
//                   b.status === "confirmed" &&
//                   b.paymentStatus === "paid")) && (
//                 <button
//                   onClick={() => handleDownloadInvoice(b._id)}
//                   className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all text-xs flex items-center gap-2"
//                 >
//                   <FileText size={14} />
//                   Invoice
//                 </button>
//               )}

//               {/* Damage Report Button (Show if confirmed or completed) */}
//               {(b.status === "confirmed" || b.status === "completed") && (
//                 <Link
//                   to={`/dashboard/damage-report/${b._id}`}
//                   className="px-6 py-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold rounded-xl transition-all text-xs flex items-center gap-2 border border-indigo-100"
//                 >
//                   <Camera size={14} />
//                   {b.status === "confirmed"
//                     ? "Pickup Photos"
//                     : "Return Photos / Report"}
//                 </Link>
//               )}

//               {/* Write Review Button (Show if completed) */}
//               {b.status === "completed" && (
//                 <button
//                   onClick={() => {
//                     setSelectedBookingForReview(b);
//                     setShowReviewModal(true);
//                   }}
//                   className="px-6 py-2.5 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all text-xs flex items-center gap-2 shadow-lg shadow-purple-200"
//                 >
//                   <Star size={14} />
//                   Write Review
//                 </button>
//               )}

//               {/* Cancel Booking Button */}
//               {["pending", "approved-awaiting-payment", "confirmed"].includes(
//                 b.status,
//               ) && (
//                 <button
//                   onClick={() => {
//                     setSelectedBookingToCancel(b);
//                     setShowCancelModal(true);
//                   }}
//                   className="px-6 py-2.5 bg-white hover:bg-rose-50 text-rose-600 font-bold rounded-xl transition-all text-xs flex items-center justify-center gap-2 border border-rose-200"
//                 >
//                   <XCircle size={14} />
//                   Cancel Booking
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       ))}

//       {showPayment && selectedBooking && (
//         <PaymentMethodModal
//           isOpen={showPayment}
//           onClose={() => setShowPayment(false)}
//           bookingId={selectedBooking._id}
//           totalPrice={selectedBooking.totalPrice}
//           onComplete={() => {
//             // Refresh bookings
//             api.get("/bookings/my").then((res) => setBookings(res.data));
//           }}
//         />
//       )}

//       {showReviewModal && selectedBookingForReview && (
//         <ReviewModal
//           isOpen={showReviewModal}
//           onClose={() => {
//             setShowReviewModal(false);
//             setSelectedBookingForReview(null);
//           }}
//           booking={selectedBookingForReview}
//         />
//       )}

//       {/* Cancel Confirmation Modal */}
//       {showCancelModal && selectedBookingToCancel && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
//           <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative">
//             <h3 className="text-2xl font-bold text-slate-900 mb-4">
//               Cancel Booking
//             </h3>
//             <p className="text-slate-600 mb-6">
//               Are you sure you want to cancel this booking?
//             </p>

//             {selectedBookingToCancel.paymentStatus === "paid" && (
//               <div className="bg-rose-50 p-4 rounded-xl mb-6 border border-rose-100">
//                 <p className="text-rose-700 font-medium text-sm flex items-start gap-2">
//                   <XCircle className="w-5 h-5 shrink-0" />
//                   <span>
//                     <strong>Cancellation Fee:</strong> A 20% cancellation fee
//                     will be deducted from your payment.
//                   </span>
//                 </p>
//               </div>
//             )}

//             <div className="flex items-center gap-3 mt-8">
//               <button
//                 onClick={() => {
//                   setShowCancelModal(false);
//                   setSelectedBookingToCancel(null);
//                 }}
//                 className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
//                 disabled={cancelLoading}
//               >
//                 Keep Booking
//               </button>
//               <button
//                 onClick={handleCancelBooking}
//                 disabled={cancelLoading}
//                 className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition-all flex justify-center items-center gap-2"
//               >
//                 {cancelLoading ? (
//                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
//                 ) : (
//                   "Yes, Cancel"
//                 )}
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default MyBookings;

import { useEffect, useState } from "react";
import api from "../../utils/api";
import {
  CalendarSearch,
  Calendar,
  FileText,
  CreditCard,
  Star,
  Camera,
  XCircle,
  Clock,
  ArrowRight,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";

import { toast } from "react-toastify";
import PaymentMethodModal from "../bookings/PaymentMethodModal";
import ReviewModal from "../reviews/ReviewModal";

const BACKEND_URL = "http://localhost:5000";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showPayment, setShowPayment] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBookingForReview, setSelectedBookingForReview] =
    useState(null);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedBookingToCancel, setSelectedBookingToCancel] = useState(null);
  const [cancelLoading, setCancelLoading] = useState(false);

  const [activeFilterTab, setActiveFilterTab] = useState("all");

  const handlePayment = (booking) => {
    setSelectedBooking(booking);
    setShowPayment(true);
  };

  const handleDownloadInvoice = async (bookingId) => {
    try {
      const response = await api.get(`/payments/${bookingId}/invoice`, {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${bookingId}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Invoice downloaded!");
    } catch (err) {
      toast.error("Failed to download invoice");
    }
  };

  const handleCancelBooking = async () => {
    if (!selectedBookingToCancel) return;
    setCancelLoading(true);
    try {
      const res = await api.put(
        `/bookings/${selectedBookingToCancel._id}/cancel`,
      );
      toast.success(res.data.message || "Booking cancelled successfully");
      setShowCancelModal(false);
      setSelectedBookingToCancel(null);
      const fetchRes = await api.get("/bookings/my");
      setBookings(fetchRes.data);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel booking");
    } finally {
      setCancelLoading(false);
    }
  };

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await api.get("/bookings/my");
        setBookings(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-9 h-9 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xs font-bold tracking-widest uppercase text-slate-400">
          Loading bookings...
        </p>
      </div>
    );
  }

  if (!bookings.length) {
    return (
      <div className="bg-white border border-slate-200/60 rounded-3xl p-16 text-center space-y-5 shadow-[0_4px_24px_-4px_rgba(15,23,42,0.04)] animate-in fade-in duration-500 max-w-lg mx-auto">
        <div className="w-20 h-20 bg-gradient-to-br from-slate-50 to-slate-100 rounded-3xl flex items-center justify-center mx-auto border border-slate-200/50 shadow-sm">
          <CalendarSearch className="text-slate-300" size={38} />
        </div>
        <div className="space-y-2">
          <h3 className="text-2xl font-black text-slate-800 tracking-tight">
            No bookings yet
          </h3>
          <p className="text-slate-500 text-sm max-w-xs mx-auto font-medium leading-relaxed">
            Ready to hit the road? Discover premium vehicles and start your
            first rental journey.
          </p>
        </div>
        <button className="px-10 py-3.5 bg-slate-900 hover:bg-blue-600 text-white font-bold rounded-2xl transition-all duration-300 shadow-lg shadow-slate-900/10 hover:shadow-blue-500/20 hover:-translate-y-0.5 active:scale-95 cursor-pointer text-sm tracking-wide">
          Explore Fleet
        </button>
      </div>
    );
  }

  // Filter logic
  const filterTabs = [
    { id: "all", label: "All" },
    { id: "upcoming", label: "Upcoming" },
    { id: "completed", label: "Completed" },
    { id: "cancelled", label: "Cancelled" },
  ];

  const filteredBookings = bookings.filter((b) => {
    if (activeFilterTab === "all") return true;
    if (activeFilterTab === "upcoming")
      return ["pending", "approved-awaiting-payment", "confirmed"].includes(
        b.status,
      );
    if (activeFilterTab === "completed") return b.status === "completed";
    if (activeFilterTab === "cancelled")
      return ["cancelled", "rejected"].includes(b.status);
    return true;
  });

  // Status chip helpers
  const getStatusStyles = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200/60";
      case "pending":
        return "bg-amber-50 text-amber-700 border border-amber-200/60";
      case "approved-awaiting-payment":
        return "bg-sky-50 text-sky-700 border border-sky-200/60";
      case "rejected":
      case "cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-200/60";
      case "completed":
        return "bg-slate-100 text-slate-600 border border-slate-200/60";
      default:
        return "bg-slate-50 text-slate-600 border border-slate-200/60";
    }
  };

  const getStatusLabel = (status) => {
    const map = {
      pending: "Pending",
      "approved-awaiting-payment": "Approved",
      confirmed: "Confirmed",
      rejected: "Rejected",
      cancelled: "Cancelled",
      completed: "Completed",
    };
    return map[status] || status;
  };

  const getPaymentStyles = (paymentStatus, paymentMethod) => {
    if (paymentMethod === "cash" && paymentStatus === "pending")
      return "bg-amber-50 text-amber-700 border border-amber-200/60";
    if (paymentStatus === "paid")
      return "bg-blue-50 text-blue-700 border border-blue-200/60";
    return "bg-slate-50 text-slate-600 border border-slate-200/60";
  };

  const getPaymentLabel = (paymentStatus, paymentMethod) => {
    if (paymentMethod === "cash" && paymentStatus === "pending")
      return "Cash Pending";
    return paymentStatus === "paid" ? "Paid" : paymentStatus;
  };

  return (
    <div className="space-y-5 max-w-4xl mx-auto">
      {/* Segmented Filter Control */}
      <div className="flex bg-slate-100/80 border border-slate-200/60 rounded-xl p-1 max-w-xs shadow-sm gap-0.5">
        {filterTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilterTab(tab.id)}
            className={`flex-1 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all duration-250 cursor-pointer ${
              activeFilterTab === tab.id
                ? "bg-white text-blue-600 shadow-sm border border-slate-200/30"
                : "text-slate-400 hover:text-slate-600 hover:bg-white/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Bookings List */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white border border-slate-200/60 rounded-2xl p-12 text-center text-slate-400 shadow-sm">
          <CalendarSearch className="mx-auto mb-3 h-8 w-8 text-slate-300" />
          <p className="font-semibold text-sm">
            No {activeFilterTab} bookings found.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredBookings.map((b) => {
            const durationDays =
              b.startDate && b.endDate
                ? Math.ceil(
                    (new Date(b.endDate) - new Date(b.startDate)) /
                      (1000 * 60 * 60 * 24),
                  )
                : 0;

            return (
              <div
                key={b._id}
                className="group bg-white border border-slate-200/60 rounded-2xl p-5 flex flex-col md:flex-row items-stretch gap-5 shadow-[0_2px_16px_-4px_rgba(15,23,42,0.05)] hover:shadow-[0_8px_32px_-6px_rgba(15,23,42,0.10)] hover:-translate-y-0.5 hover:border-slate-300/80 transition-all duration-300 cursor-default"
              >
                {/* LEFT ZONE: Image + Details */}
                <div className="flex-1 flex items-start gap-4 min-w-0">
                  {/* Vehicle Thumbnail */}
                  <div className="w-28 h-20 shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/40 flex items-center justify-center shadow-sm">
                    <img
                      src={
                        b.listing?.photos?.length
                          ? `${BACKEND_URL}${b.listing.photos[0]}`
                          : "/placeholder-car.jpg"
                      }
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      alt={b.listing?.name}
                    />
                  </div>

                  {/* Booking Details */}
                  <div className="min-w-0 space-y-1.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-extrabold text-slate-800 text-sm leading-tight group-hover:text-blue-600 transition-colors duration-300">
                        {b.listing?.name || "Premium Vehicle"}
                      </h3>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border ${
                          b.bookingType === "full"
                            ? "bg-blue-50 text-blue-600 border-blue-200/50"
                            : "bg-emerald-50 text-emerald-600 border-emerald-200/50"
                        }`}
                      >
                        {b.bookingType === "full"
                          ? "Full Rental"
                          : "Seat Share"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                      <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                        <Calendar
                          size={12}
                          className="text-slate-350 shrink-0"
                        />
                        <span>
                          {new Date(b.startDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                          })}
                          <span className="mx-1 text-slate-300">→</span>
                          {new Date(b.endDate).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                        <Clock size={12} className="text-slate-300 shrink-0" />
                        <span>
                          {b.bookingType === "full"
                            ? `${durationDays} ${durationDays === 1 ? "day" : "days"}`
                            : `${b.seatsBooked} ${b.seatsBooked === 1 ? "seat" : "seats"}`}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-450 font-medium">
                      <MapPin size={12} className="text-slate-350 shrink-0" />
                      <span className="truncate max-w-[240px] text-slate-500">
                        {b.bookingType === "full" ? (
                          b.listing?.location || "Not specified"
                        ) : (
                          <span className="flex items-center gap-1">
                            <span className="truncate">
                              {b.listing?.departure}
                            </span>
                            <ArrowRight
                              size={10}
                              className="text-slate-300 shrink-0"
                            />
                            <span className="truncate">
                              {b.listing?.destination}
                            </span>
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CENTER ZONE: Status + Date */}
                <div className="flex flex-row md:flex-col items-center justify-start md:justify-center gap-2 md:w-44 shrink-0 md:border-l md:border-r border-slate-100 md:px-5">
                  <div className="flex flex-row flex-wrap gap-1.5">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${getStatusStyles(b.status)}`}
                    >
                      {getStatusLabel(b.status)}
                    </span>
                    {b.paymentStatus && (
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider shadow-sm ${getPaymentStyles(b.paymentStatus, b.paymentMethod)}`}
                      >
                        {getPaymentLabel(b.paymentStatus, b.paymentMethod)}
                      </span>
                    )}
                  </div>
                  {b.createdAt && (
                    <p className="text-[9px] font-semibold text-slate-400 tracking-wide text-center">
                      Booked{" "}
                      {new Date(b.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  )}
                </div>

                {/* RIGHT ZONE: Price + Actions */}
                <div className="flex flex-col items-end justify-between gap-3 shrink-0 border-t md:border-t-0 pt-3 md:pt-0 w-full md:w-auto">
                  {/* Price */}
                  <div className="text-right">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-0.5">
                      Total
                    </p>
                    <p className="font-black text-slate-900 text-xl leading-none">
                      <span className="text-sm font-semibold text-slate-500 mr-0.5">
                        Rs.
                      </span>
                      {b.totalPrice.toLocaleString()}
                    </p>
                  </div>

                  {/* Action Buttons — hierarchical */}
                  <div className="flex items-center gap-1.5 flex-wrap justify-end">
                    {/* PRIMARY: Pay Now */}
                    {b.status === "approved-awaiting-payment" &&
                      b.paymentStatus !== "paid" && (
                        <button
                          onClick={() => handlePayment(b)}
                          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-extrabold rounded-xl text-[10px] uppercase tracking-wider shadow-md shadow-blue-200/60 flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-300/40"
                        >
                          <CreditCard size={12} />
                          Pay Now
                        </button>
                      )}

                    {/* PRIMARY: Review */}
                    {b.status === "completed" && (
                      <button
                        onClick={() => {
                          setSelectedBookingForReview(b);
                          setShowReviewModal(true);
                        }}
                        className="px-3.5 py-2 bg-purple-600 hover:bg-purple-700 text-white font-extrabold rounded-xl text-[10px] uppercase tracking-wider shadow-md shadow-purple-200/60 flex items-center gap-1.5 cursor-pointer transition-all duration-200 hover:-translate-y-0.5"
                      >
                        <Star size={12} />
                        Review
                      </button>
                    )}

                    {/* SECONDARY: Pickup Photos */}
                    {(b.status === "confirmed" || b.status === "completed") && (
                      <Link
                        to={`/dashboard/damage-report/${b._id}`}
                        className="px-3.5 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-extrabold rounded-xl text-[10px] uppercase tracking-wider border border-indigo-100 flex items-center gap-1.5 transition-all duration-200"
                      >
                        <Camera size={12} />
                        {b.status === "confirmed" ? "Pickup" : "Photos"}
                      </Link>
                    )}

                    {/* GHOST: Invoice */}
                    {(b.paymentStatus === "paid" ||
                      (b.paymentMethod === "cash" &&
                        b.status === "confirmed" &&
                        b.paymentStatus === "paid")) && (
                      <button
                        onClick={() => handleDownloadInvoice(b._id)}
                        className="px-3.5 py-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 cursor-pointer transition-all duration-200"
                      >
                        <FileText size={12} className="text-slate-400" />
                        Invoice
                      </button>
                    )}

                    {/* DESTRUCTIVE OUTLINE: Cancel */}
                    {[
                      "pending",
                      "approved-awaiting-payment",
                      "confirmed",
                    ].includes(b.status) && (
                      <button
                        onClick={() => {
                          setSelectedBookingToCancel(b);
                          setShowCancelModal(true);
                        }}
                        className="px-3.5 py-2 bg-transparent hover:bg-rose-50 text-rose-500 hover:text-rose-700 border border-rose-200 hover:border-rose-300 rounded-xl text-[10px] uppercase tracking-wider font-extrabold flex items-center gap-1.5 cursor-pointer transition-all duration-200"
                      >
                        <XCircle size={12} />
                        Cancel
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && selectedBooking && (
        <PaymentMethodModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          bookingId={selectedBooking._id}
          totalPrice={selectedBooking.totalPrice}
          onComplete={() => {
            api.get("/bookings/my").then((res) => setBookings(res.data));
          }}
        />
      )}

      {/* Review Modal */}
      {showReviewModal && selectedBookingForReview && (
        <ReviewModal
          isOpen={showReviewModal}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedBookingForReview(null);
          }}
          booking={selectedBookingForReview}
        />
      )}

      {/* Cancel Confirmation Modal */}
      {showCancelModal && selectedBookingToCancel && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl border border-slate-200/50 animate-in fade-in zoom-in-95 duration-200">
            <h3 className="text-xl font-black text-slate-800 mb-3 tracking-tight">
              Cancel Booking?
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-5 font-medium">
              This action cannot be undone. Are you sure you want to cancel this
              booking?
            </p>

            {selectedBookingToCancel.paymentStatus === "paid" && (
              <div className="bg-rose-50 p-4 rounded-2xl mb-5 border border-rose-100">
                <p className="text-rose-700 font-bold text-xs flex items-start gap-2 leading-relaxed">
                  <XCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                  <span>
                    A <strong>20% cancellation fee</strong> will be deducted
                    from your refund amount per our cancellation policy.
                  </span>
                </p>
              </div>
            )}

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => {
                  setShowCancelModal(false);
                  setSelectedBookingToCancel(null);
                }}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold rounded-xl transition-all text-xs tracking-wider cursor-pointer select-none"
                disabled={cancelLoading}
              >
                Keep Booking
              </button>
              <button
                onClick={handleCancelBooking}
                disabled={cancelLoading}
                className="flex-1 py-3 bg-rose-600 hover:bg-rose-700 text-white font-extrabold rounded-xl transition-all text-xs tracking-wider flex justify-center items-center gap-2 cursor-pointer select-none shadow-md shadow-rose-200"
              >
                {cancelLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Yes, Cancel"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
