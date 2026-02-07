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

import { useEffect, useState } from "react";
import api from "../../utils/api";
import { CalendarSearch, Car, Users, Calendar } from "lucide-react";

const BACKEND_URL = "http://localhost:5000";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return <p className="text-slate-500">Loading bookings...</p>;
  }

  if (!bookings.length) {
    return (
      // <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm">
      //   <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
      //     <CalendarSearch className="text-slate-300" size={40} />
      //   </div>

      //   <h3 className="text-2xl font-bold text-slate-900">
      //     No active bookings yet
      //   </h3>
      //   <p className="text-slate-500 max-w-sm mx-auto font-medium">
      //     Ready to hit the road? Discover premium vehicles and start your first
      //     rental journey today.
      //   </p>
      // </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
          <CalendarSearch className="text-slate-300" size={40} />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">
            No active bookings yet
          </h3>
          <p className="text-slate-500 max-w-sm mx-auto font-medium">
            Ready to hit the road? Discover premium vehicles and start your
            first rental journey today.
          </p>
        </div>

        <button className="mt-6 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
          Explore Luxury Cars
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="bg-white border border-slate-200 rounded-3xl p-6 flex gap-6 items-center shadow-sm"
        >
          <img
            src={
              b.listing?.photos?.length
                ? `${BACKEND_URL}${b.listing.photos[0]}`
                : "/placeholder-car.jpg"
            }
            className="w-32 h-24 object-cover rounded-xl"
            alt={b.listing?.name}
          />

          <div className="flex-1">
            <h3 className="font-bold text-lg">{b.listing?.name}</h3>

            <p className="text-sm text-slate-500 flex items-center gap-2">
              {b.bookingType === "full" ? (
                <>
                  <Car size={14} /> Full Vehicle
                </>
              ) : (
                <>
                  <Users size={14} /> {b.seatsBooked} Seats
                </>
              )}
            </p>

            {b.startDate && (
              <p className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                <Calendar size={12} />
                {new Date(b.startDate).toLocaleDateString()} →{" "}
                {new Date(b.endDate).toLocaleDateString()}
              </p>
            )}
          </div>

          {/* <div className="text-right">
            <p className="font-bold text-slate-900">₹{b.totalPrice}</p>
            <span className="text-xs font-bold text-emerald-600">
              {b.status}
            </span>
          </div> */}

          <div className="text-right">
            <p className="font-bold text-slate-900">₹{b.totalPrice}</p>

            <span
              className={`inline-block mt-1 px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide
      ${
        b.status === "pending"
          ? "bg-amber-100 text-amber-700"
          : b.status === "confirmed"
            ? "bg-emerald-100 text-emerald-700"
            : b.status === "rejected"
              ? "bg-rose-100 text-rose-700"
              : "bg-slate-100 text-slate-600"
      }
    `}
            >
              {b.status}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
