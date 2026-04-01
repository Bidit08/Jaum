// import React from "react";
// import { useComparison } from "../../context/ComparisonContext";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import {
//   Car,
//   Users,
//   MapPin,
//   Gauge,
//   ShieldCheck,
//   X,
//   ArrowRight,
//   Check,
//   Minus,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const ComparePage = () => {
//   const { selectedVehicles, removeFromComparison, clearComparison } =
//     useComparison();
//   const navigate = useNavigate();

//   if (selectedVehicles.length === 0) {
//     return (
//       <div className="min-h-screen bg-slate-50 flex flex-col">
//         <Navbar />
//         <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
//           <Car size={64} className="text-slate-300 mb-6" />
//           <h2 className="text-2xl font-bold text-slate-800 mb-2">
//             No Vehicles to Compare
//           </h2>
//           <p className="text-slate-500 mb-8">
//             Select vehicles from the listings page to see them side-by-side.
//           </p>
//           <button
//             onClick={() => navigate("/listings")}
//             className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
//           >
//             Browse Listings
//           </button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   // Helper to get value or default
//   const getValue = (vehicle, field) => vehicle[field] || "-";

//   const renderCell = (vehicle, field, isPrice = false) => {
//     let content = getValue(vehicle, field);
//     if (isPrice) {
//       const price =
//         vehicle.listingType === "full"
//           ? vehicle.pricePerDay
//           : vehicle.pricePerSeat;
//       content = `$${price}`;
//     }
//     return (
//       <div className="py-4 border-b border-slate-100 text-sm font-medium text-slate-700 h-16 flex items-center justify-center text-center px-2">
//         {content}
//       </div>
//     );
//   };

//   const getLowestPriceId = () => {
//     if (selectedVehicles.length < 2) return null;
//     // Only compare if types match somewhat, or just raw numbers?
//     // Let's just find min price regardless of type for now, or maybe split logic visually.
//     // For simplicity: specific to listing type
//     return selectedVehicles.reduce(
//       (min, v) => {
//         const p = v.listingType === "full" ? v.pricePerDay : v.pricePerSeat;
//         return p < min.price ? { id: v._id, price: p } : min;
//       },
//       { id: null, price: Infinity },
//     ).id;
//   };

//   const bestPriceId = getLowestPriceId();

//   return (
//     <div className="min-h-screen bg-slate-50 flex flex-col pt-24">
//       <Navbar />

//       <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
//         <div className="flex justify-between items-center mb-8">
//           <h1 className="text-3xl font-black text-slate-900">
//             Compare Vehicles
//           </h1>
//           <button
//             onClick={clearComparison}
//             className="text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition"
//           >
//             Clear All
//           </button>
//         </div>

//         <div className="overflow-x-auto pb-8">
//           <div className="min-w-[800px] grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-0 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
//             {/* Labels Column */}
//             <div className="col-span-1 bg-slate-50/50 border-r border-slate-200">
//               <div className="h-64 border-b border-slate-200 p-4 font-bold text-slate-400 flex items-end pb-4">
//                 Vehicle Details
//               </div>
//               {[
//                 "Price",
//                 "Type",
//                 "Transmission",
//                 "Seats",
//                 "Fuel",
//                 "Location",
//                 "Brand",
//               ].map((label) => (
//                 <div
//                   key={label}
//                   className="py-4 border-b border-slate-100 text-sm font-bold text-slate-900 h-16 flex items-center px-6"
//                 >
//                   {label}
//                 </div>
//               ))}
//               <div className="py-4 h-24 flex items-center px-6" />
//             </div>

//             {/* Vehicle Columns */}
//             {selectedVehicles.map((vehicle) => (
//               <div
//                 key={vehicle._id}
//                 className="col-span-1 border-r border-slate-100 min-w-[250px] relative"
//               >
//                 <button
//                   onClick={() => removeFromComparison(vehicle._id)}
//                   className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition z-10"
//                 >
//                   <X size={16} />
//                 </button>

//                 {/* Header / Image */}
//                 <div className="h-64 border-b border-slate-200 p-4 flex flex-col justify-end relative">
//                   <div className="absolute inset-0 p-4">
//                     <img
//                       src={
//                         vehicle.photos?.[0]
//                           ? vehicle.photos[0].startsWith("http")
//                             ? vehicle.photos[0]
//                             : `http://localhost:5000${vehicle.photos[0]}`
//                           : "/placeholder-car.jpg"
//                       }
//                       className="w-full h-32 object-contain mb-4 rounded-xl"
//                       alt={vehicle.name}
//                     />
//                   </div>
//                   <div className="pt-32 relative z-10 text-center">
//                     <h3 className="font-bold text-lg text-slate-900 truncate px-2">
//                       {vehicle.name}
//                     </h3>
//                     <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
//                       {vehicle.brand}
//                     </p>
//                   </div>
//                 </div>

//                 {/* Rows */}
//                 <div
//                   className={`py-4 border-b border-slate-100 h-16 flex items-center justify-center ${bestPriceId === vehicle._id ? "bg-emerald-50/50" : ""}`}
//                 >
//                   <span
//                     className={`font-bold ${bestPriceId === vehicle._id ? "text-emerald-600" : "text-slate-900"}`}
//                   >
//                     $
//                     {vehicle.listingType === "full"
//                       ? vehicle.pricePerDay
//                       : vehicle.pricePerSeat}
//                     <span className="text-xs font-normal text-slate-400 ml-1">
//                       /{vehicle.listingType === "full" ? "day" : "seat"}
//                     </span>
//                   </span>
//                   {bestPriceId === vehicle._id && (
//                     <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-700 font-bold uppercase">
//                       Best Value
//                     </span>
//                   )}
//                 </div>

//                 {/* Type */}
//                 <div className="py-4 border-b border-slate-100 h-16 flex items-center justify-center">
//                   <span
//                     className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${vehicle.listingType === "full" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}
//                   >
//                     {vehicle.listingType === "full" ? (
//                       <Car size={12} />
//                     ) : (
//                       <Users size={12} />
//                     )}
//                     {vehicle.listingType === "full"
//                       ? "Full Rental"
//                       : "Seat Share"}
//                   </span>
//                 </div>

//                 {/* Transmission */}
//                 {renderCell(vehicle, "transmission")}

//                 {/* Seats */}
//                 <div className="py-4 border-b border-slate-100 h-16 flex items-center justify-center">
//                   <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
//                     <Users size={14} className="text-slate-400" />
//                     {vehicle.seats || vehicle.availableSeats}
//                   </span>
//                 </div>

//                 {/* Fuel */}
//                 {renderCell(vehicle, "fuelType")}

//                 {/* Location */}
//                 <div className="py-4 border-b border-slate-100 h-16 flex items-center justify-center px-4">
//                   <div className="flex flex-col items-center">
//                     <span className="text-xs text-center font-medium block truncate max-w-[200px]">
//                       {vehicle.listingType === "full" ? (
//                         vehicle.location
//                       ) : (
//                         <span className="flex items-center gap-1">
//                           {vehicle.departure} <ArrowRight size={10} />{" "}
//                           {vehicle.destination}
//                         </span>
//                       )}
//                     </span>
//                   </div>
//                 </div>

//                 {/* Brand */}
//                 {renderCell(vehicle, "brand")}

//                 {/* Action */}
//                 <div className="py-4 h-24 flex items-center justify-center px-4">
//                   <button
//                     onClick={() => navigate(`/listings/${vehicle._id}`)}
//                     className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition shadow-lg shadow-slate-200"
//                   >
//                     View Details
//                   </button>
//                 </div>
//               </div>
//             ))}

//             {/* Empty Slots Filler */}
//             {[...Array(3 - selectedVehicles.length)].map((_, i) => (
//               <div
//                 key={`empty-${i}`}
//                 className="col-span-1 border-r border-slate-50 bg-slate-50/30 min-w-[250px] flex flex-col items-center justify-center p-8 opacity-50"
//               >
//                 <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 border border-dashed border-slate-300">
//                   <Car size={24} className="text-slate-300" />
//                 </div>
//                 <p className="text-sm font-bold text-slate-400">Add Vehicle</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ComparePage;

import React from "react";
import { useComparison } from "../../context/ComparisonContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Car,
  Users,
  MapPin,
  Settings,
  Fuel,
  X,
  ArrowRight,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComparePage = () => {
  const { selectedVehicles, removeFromComparison, clearComparison } =
    useComparison();
  const navigate = useNavigate();

  if (selectedVehicles.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-24 h-24 bg-white rounded-full shadow-[0_10px_30px_-10px_rgba(0,0,0,0.1)] flex items-center justify-center mb-6 border border-slate-100">
            <Car size={32} className="text-slate-300" />
          </div>
          <h2 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">
            No Vehicles Selected
          </h2>
          <p className="text-slate-500 font-medium max-w-sm mb-8">
            It looks like your comparison tray is empty. Head back to the
            marketplace to add vehicles.
          </p>
          <button
            onClick={() => navigate("/listings")}
            className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            Browse Fleet
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const BACKEND_URL = "http://localhost:5000";

  const getLowestPriceId = () => {
    if (selectedVehicles.length < 2) return null;
    return selectedVehicles.reduce(
      (min, v) => {
        const p = v.listingType === "full" ? v.pricePerDay : v.pricePerSeat;
        return p < min.price ? { id: v._id, price: p } : min;
      },
      { id: null, price: Infinity },
    ).id;
  };

  const bestPriceId = getLowestPriceId();
  const fillerSlots = Array(3 - selectedVehicles.length).fill(null);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24 font-sans">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-12 w-full">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              Side-by-Side Comparison
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1">
              Analyzing {selectedVehicles.length} vehicles
            </p>
          </div>
          <button
            onClick={clearComparison}
            className="text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-rose-600 hover:bg-rose-50 px-5 py-2.5 rounded-full transition-all duration-300 border border-transparent hover:border-rose-200"
          >
            Clear Fleet
          </button>
        </div>

        {/* Table Wrapper */}
        <div className="w-full overflow-x-auto pb-12 hide-scrollbar">
          <div className="min-w-[1000px] bg-white rounded-[2rem] shadow-[0_20px_40px_-20px_rgba(15,23,42,0.12)] border border-slate-100 overflow-hidden flex flex-col">
            {/* ================= STICKY HEADER ROW ================= */}
            <div className="flex sticky top-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200/60 shadow-sm">
              {/* Empty Label Cell */}
              <div className="w-56 bg-slate-50/50 border-r border-slate-100 shrink-0" />

              {/* Vehicle Header Cells */}
              {selectedVehicles.map((vehicle) => (
                <div
                  key={`header-${vehicle._id}`}
                  className={`flex-1 min-w-[300px] border-r border-slate-100 relative group transition-colors ${bestPriceId === vehicle._id ? "bg-emerald-50/10" : ""}`}
                >
                  <button
                    onClick={() => removeFromComparison(vehicle._id)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 shadow-sm hover:scale-110 transition-all z-20"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>

                  <div
                    className="p-8 flex flex-col justify-end text-center h-full relative cursor-pointer"
                    onClick={() => navigate(`/listings/${vehicle._id}`)}
                  >
                    <div className="h-32 mb-6 flex items-center justify-center">
                      <img
                        src={
                          vehicle.photos?.[0]
                            ? vehicle.photos[0].startsWith("http")
                              ? vehicle.photos[0]
                              : `${BACKEND_URL}${vehicle.photos[0]}`
                            : "/placeholder-car.jpg"
                        }
                        className="max-h-full max-w-full object-contain drop-shadow-md group-hover:drop-shadow-xl group-hover:scale-110 transition-all duration-500"
                        alt={vehicle.name}
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 truncate px-4">
                      {vehicle.brand}
                    </p>
                    <h3 className="text-xl font-bold text-slate-900 leading-tight truncate px-4 group-hover:text-blue-600 transition-colors">
                      {vehicle.name}
                    </h3>
                  </div>
                </div>
              ))}

              {/* Filler Headers */}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-head-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30 flex flex-col items-center justify-center p-8 opacity-50"
                >
                  <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 border-2 border-dashed border-slate-300">
                    <Car size={24} className="text-slate-300" />
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Add Vehicle
                  </p>
                </div>
              ))}
            </div>

            {/* ================= ROW: PRICE ================= */}
            <div className="flex border-b border-slate-100 hover:bg-slate-50/80 transition-colors group/row">
              <div className="w-56 bg-slate-50/80 border-r border-slate-100 shrink-0 p-6 flex items-center group-hover/row:bg-slate-100/50 transition-colors">
                <span className="font-bold text-sm text-slate-500">
                  Price Structure
                </span>
              </div>
              {selectedVehicles.map((v) => (
                <div
                  key={`price-${v._id}`}
                  className={`flex-1 min-w-[300px] p-6 py-8 flex flex-col justify-center items-center border-r border-slate-100 relative ${bestPriceId === v._id ? "bg-emerald-50/30" : ""}`}
                >
                  <span
                    className={`text-3xl font-black ${bestPriceId === v._id ? "text-emerald-600" : "text-blue-600"}`}
                  >
                    Rs.{" "}
                    {v.listingType === "full" ? v.pricePerDay : v.pricePerSeat}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">
                    /{v.listingType === "full" ? "day" : "seat"}
                  </span>
                  {bestPriceId === v._id ? (
                    <div className="absolute top-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-sm flex items-center gap-1">
                      <Star size={10} className="fill-emerald-600" /> Best Value
                    </div>
                  ) : null}
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-price-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30"
                />
              ))}
            </div>

            {/* ================= ROW: TYPE ================= */}
            <div className="flex border-b border-slate-100 hover:bg-slate-50/80 transition-colors group/row">
              <div className="w-56 bg-slate-50/80 border-r border-slate-100 shrink-0 p-6 flex items-center group-hover/row:bg-slate-100/50 transition-colors">
                <span className="font-bold text-sm text-slate-500">
                  Listing Type
                </span>
              </div>
              {selectedVehicles.map((v) => (
                <div
                  key={`type-${v._id}`}
                  className={`flex-1 min-w-[300px] p-6 flex justify-center items-center border-r border-slate-100 ${bestPriceId === v._id ? "bg-emerald-50/30" : ""}`}
                >
                  <span
                    className={`px-4 py-2 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center gap-2 shadow-sm ${v.listingType === "full" ? "bg-blue-600 text-white" : "bg-emerald-500 text-white"}`}
                  >
                    {v.listingType === "full" ? (
                      <Car size={13} />
                    ) : (
                      <Users size={13} />
                    )}
                    {v.listingType === "full" ? "Premium Rental" : "Seat Share"}
                  </span>
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-type-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30"
                />
              ))}
            </div>

            {/* ================= ROW: TRANSMISSION ================= */}
            <div className="flex border-b border-slate-100 hover:bg-slate-50/80 transition-colors group/row">
              <div className="w-56 bg-slate-50/80 border-r border-slate-100 shrink-0 p-6 flex items-center group-hover/row:bg-slate-100/50 transition-colors">
                <span className="font-bold text-sm text-slate-500 flex items-center gap-3">
                  <Settings size={18} className="text-slate-400" /> Transmission
                </span>
              </div>
              {selectedVehicles.map((v) => (
                <div
                  key={`trans-${v._id}`}
                  className={`flex-1 min-w-[300px] p-6 flex justify-center items-center border-r border-slate-100 ${bestPriceId === v._id ? "bg-emerald-50/30" : ""}`}
                >
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                    {v.transmission || "-"}
                  </span>
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-trans-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30"
                />
              ))}
            </div>

            {/* ================= ROW: SEATS ================= */}
            <div className="flex border-b border-slate-100 hover:bg-slate-50/80 transition-colors group/row">
              <div className="w-56 bg-slate-50/80 border-r border-slate-100 shrink-0 p-6 flex items-center group-hover/row:bg-slate-100/50 transition-colors">
                <span className="font-bold text-sm text-slate-500 flex items-center gap-3">
                  <Users size={18} className="text-slate-400" /> Seat Capacity
                </span>
              </div>
              {selectedVehicles.map((v) => (
                <div
                  key={`seats-${v._id}`}
                  className={`flex-1 min-w-[300px] p-6 flex justify-center items-center border-r border-slate-100 ${bestPriceId === v._id ? "bg-emerald-50/30" : ""}`}
                >
                  <span className="font-black text-slate-800 text-lg flex items-center gap-2">
                    {v.seats || v.availableSeats || "-"}{" "}
                    <span className="text-slate-400 text-xs font-bold uppercase tracking-widest mt-1">
                      Occupants
                    </span>
                  </span>
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-seats-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30"
                />
              ))}
            </div>

            {/* ================= ROW: FUEL ================= */}
            <div className="flex border-b border-slate-100 hover:bg-slate-50/80 transition-colors group/row">
              <div className="w-56 bg-slate-50/80 border-r border-slate-100 shrink-0 p-6 flex items-center group-hover/row:bg-slate-100/50 transition-colors">
                <span className="font-bold text-sm text-slate-500 flex items-center gap-3">
                  <Fuel size={18} className="text-slate-400" /> Fuel System
                </span>
              </div>
              {selectedVehicles.map((v) => (
                <div
                  key={`fuel-${v._id}`}
                  className={`flex-1 min-w-[300px] p-6 flex justify-center items-center border-r border-slate-100 ${bestPriceId === v._id ? "bg-emerald-50/30" : ""}`}
                >
                  <span className="font-bold text-slate-700 uppercase tracking-wider text-xs">
                    {v.fuelType || "-"}
                  </span>
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-fuel-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30"
                />
              ))}
            </div>

            {/* ================= ROW: LOCATION ================= */}
            <div className="flex border-b border-slate-100 hover:bg-slate-50/80 transition-colors group/row">
              <div className="w-56 bg-slate-50/80 border-r border-slate-100 shrink-0 p-6 flex items-center group-hover/row:bg-slate-100/50 transition-colors">
                <span className="font-bold text-sm text-slate-500 flex items-center gap-3">
                  <MapPin size={18} className="text-slate-400" /> Location
                </span>
              </div>
              {selectedVehicles.map((v) => (
                <div
                  key={`loc-${v._id}`}
                  className={`flex-1 min-w-[300px] p-6 flex justify-center items-center border-r border-slate-100 ${bestPriceId === v._id ? "bg-emerald-50/30" : ""}`}
                >
                  {v.listingType === "full" ? (
                    <span className="font-bold text-slate-700 text-sm truncate max-w-full text-center">
                      {v.location || "-"}
                    </span>
                  ) : (
                    <span className="font-bold text-slate-700 text-sm flex items-center gap-3 truncate max-w-full justify-center">
                      {v.departure}{" "}
                      <ArrowRight
                        size={14}
                        className="text-slate-300 shrink-0"
                      />{" "}
                      {v.destination}
                    </span>
                  )}
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-loc-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30"
                />
              ))}
            </div>

            {/* ================= ACTION ROW ================= */}
            <div className="flex bg-slate-50/30">
              <div className="w-56 bg-slate-50/80 border-r border-slate-100 shrink-0" />
              {selectedVehicles.map((v) => (
                <div
                  key={`act-${v._id}`}
                  className={`flex-1 min-w-[300px] p-8 flex justify-center items-center border-r border-slate-100 ${bestPriceId === v._id ? "bg-emerald-50/30" : ""}`}
                >
                  <button
                    onClick={() => navigate(`/listings/${v._id}`)}
                    className="w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-105 active:scale-95 bg-slate-900 text-white hover:bg-gradient-to-r hover:from-blue-600 hover:to-cyan-500 hover:shadow-[0_15px_30px_-10px_rgba(37,99,235,0.6)]"
                  >
                    View Details
                  </button>
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-act-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-50 bg-slate-50/30"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComparePage;
