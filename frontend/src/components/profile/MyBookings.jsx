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

import React from "react";
import { CalendarSearch } from "lucide-react";

const MyBookings = () => {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-5 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
        <CalendarSearch className="text-slate-300" size={40} />
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-slate-900">
          No active bookings yet
        </h3>
        <p className="text-slate-500 max-w-sm mx-auto font-medium">
          Ready to hit the road? Discover premium vehicles and start your first
          rental journey today.
        </p>
      </div>

      <button className="mt-6 px-10 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">
        Explore Luxury Cars
      </button>
    </div>
  );
};

export default MyBookings;
