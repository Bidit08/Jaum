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
  Check,
  Minus,
  Zap,
  Tag,
  Info,
  List,
  Leaf,
  Sparkles,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComparePage = () => {
  const { selectedVehicles, removeFromComparison, clearComparison } =
    useComparison();
  const navigate = useNavigate();

  const [openSections, setOpenSections] = React.useState({
    overview: true,
    pricing: true,
    engineTransmission: true,
    specifications: true,
    features: true,
    pickupLocation: true,
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

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
            className="px-8 py-3.5 bg-slate-900 text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
          >
            Browse Fleet
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  const BACKEND_URL = "https://jaum-t3no.onrender.com";

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

  const getHighestFeatureCountId = () => {
    if (selectedVehicles.length < 2) return null;
    return selectedVehicles.reduce(
      (max, v) => {
        const count = v.features?.length || 0;
        return count > max.count ? { id: v._id, count } : max;
      },
      { id: null, count: -1 },
    ).id;
  };

  const getNewestModelId = () => {
    if (selectedVehicles.length < 2) return null;
    return selectedVehicles.reduce(
      (newest, v) => {
        const yr = v.year || 0;
        return yr > newest.year ? { id: v._id, year: yr } : newest;
      },
      { id: null, year: -1 },
    ).id;
  };

  const bestPriceId = getLowestPriceId();
  const highestFeaturesId = getHighestFeatureCountId();
  const newestModelId = getNewestModelId();

  const fillerSlots = Array(3 - selectedVehicles.length).fill(null);

  const premiumFeaturesList = [
    "GPS",
    "Bluetooth",
    "Sunroof",
    "Heated Seats",
    "Leather Seats",
    "Apple CarPlay",
    "Android Auto",
    "Backup Camera",
  ];

  // Collapsible Specification Card Container
  const SpecBox = ({ title, icon: Icon, sectionKey, children }) => {
    const isOpen = openSections[sectionKey];
    return (
      <div className="w-full bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_20px_-4px_rgba(15,23,42,0.04)] overflow-hidden flex flex-col transition-all duration-300">
        {/* Collapsible Header */}
        <button
          onClick={() => toggleSection(sectionKey)}
          className="w-full flex items-center justify-between p-5 bg-slate-50/50 hover:bg-slate-50 transition-colors text-left border-b border-slate-100 cursor-pointer select-none"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50/80 text-blue-600 rounded-xl border border-blue-100/50 shadow-sm flex items-center justify-center">
              <Icon size={18} strokeWidth={2.5} />
            </div>
            <span className="font-bold text-slate-800 tracking-tight text-base">
              {title}
            </span>
          </div>
          <div className="text-slate-400 hover:text-slate-600 transition-colors mr-2">
            {isOpen ? (
              <ChevronUp size={18} strokeWidth={2.5} />
            ) : (
              <ChevronDown size={18} strokeWidth={2.5} />
            )}
          </div>
        </button>

        {/* Section Content */}
        {isOpen && <div className="flex flex-col w-full">{children}</div>}
      </div>
    );
  };

  // Compact comparison row
  const Row = ({ label, children }) => (
    <div className="flex border-b border-slate-100 last:border-b-0 hover:bg-slate-50/30 transition-colors group items-stretch odd:bg-slate-50/15 even:bg-white">
      <div className="w-56 bg-slate-50/30 border-r border-slate-100 shrink-0 py-3.5 px-6 flex items-center group-hover:bg-slate-100/30 transition-colors">
        <span className="font-bold text-xs uppercase tracking-wider text-slate-500">
          {label}
        </span>
      </div>
      {children}
    </div>
  );

  // Compact cell
  const Cell = ({ children, isHighlighted = false }) => (
    <div
      className={`flex-1 min-w-[300px] py-3.5 px-6 flex flex-col justify-center items-center text-center border-r border-slate-100 last:border-r-0 relative ${isHighlighted ? "bg-blue-50/10" : ""}`}
    >
      {children}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] flex flex-col pt-24 font-sans">
      <Navbar />

      <main className="flex-1 max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 py-10 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              Compare Fleet
            </h1>
            <p className="text-slate-500 text-sm font-medium mt-1 font-semibold">
              Analyzing {selectedVehicles.length} vehicles side-by-side
            </p>
          </div>
          <button
            onClick={clearComparison}
            className="text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-rose-600 hover:bg-rose-50 px-5 py-2.5 rounded-full transition-all border border-transparent hover:border-rose-200 cursor-pointer"
          >
            Clear Fleet
          </button>
        </div>

        {/* Main Comparison Container */}
        <div className="w-full overflow-x-auto pb-12 hide-scrollbar">
          <div className="min-w-[1000px] flex flex-col gap-6 relative z-10">
            {/* ================= STICKY HERO HEADER ================= */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_10px_35px_-10px_rgba(15,23,42,0.05)] overflow-hidden flex sticky top-24 z-30 bg-white/95 backdrop-blur-md">
              <div className="w-56 bg-slate-50/50 border-r border-slate-100 shrink-0 flex items-end p-6">
                <span className="font-bold text-xs uppercase tracking-widest text-slate-400">
                  Vehicles
                </span>
              </div>

              {selectedVehicles.map((vehicle) => (
                <div
                  key={`hero-${vehicle._id}`}
                  className="flex-1 min-w-[300px] border-r border-slate-100 last:border-r-0 relative p-6 flex flex-col justify-end group"
                >
                  <button
                    onClick={() => removeFromComparison(vehicle._id)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center hover:bg-rose-50 hover:text-rose-500 shadow-sm hover:scale-110 transition-all z-20 cursor-pointer"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>

                  {/* Badges Container */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2 z-20 items-start">
                    {bestPriceId === vehicle._id && (
                      <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
                        <Star size={10} className="fill-white" /> Best Value
                      </span>
                    )}
                    {highestFeaturesId === vehicle._id && (
                      <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
                        <Sparkles size={10} className="fill-white" /> Most
                        Premium
                      </span>
                    )}
                    {vehicle.category?.toLowerCase() === "electric" && (
                      <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
                        <Leaf size={10} className="fill-white" /> Eco Friendly
                      </span>
                    )}
                    {newestModelId === vehicle._id && (
                      <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-md flex items-center gap-1">
                        <Zap size={10} className="fill-white" /> Newest Model
                      </span>
                    )}
                  </div>

                  <div
                    className="h-32 bg-gradient-to-b from-slate-50 to-slate-100/50 rounded-2xl mb-4 flex items-center justify-center p-3 relative overflow-hidden group-hover:shadow-sm transition-shadow cursor-pointer border border-slate-150"
                    onClick={() => navigate(`/listings/${vehicle._id}`)}
                  >
                    <img
                      src={
                        vehicle.photos?.[0]
                          ? vehicle.photos[0].startsWith("http")
                            ? vehicle.photos[0]
                            : `${BACKEND_URL}${vehicle.photos[0]}`
                          : "/placeholder-car.jpg"
                      }
                      className="max-h-full max-w-full object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-700"
                      alt={vehicle.name}
                    />
                  </div>

                  <div className="text-center">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1 truncate px-2">
                      {vehicle.brand} • {vehicle.year}
                    </p>
                    <h3
                      className="text-lg font-extrabold text-slate-800 leading-tight truncate px-2 cursor-pointer hover:text-blue-600 transition-colors"
                      onClick={() => navigate(`/listings/${vehicle._id}`)}
                    >
                      {vehicle.name}
                    </h3>
                  </div>
                </div>
              ))}

              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-hero-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-100 last:border-r-0 bg-slate-50/20 flex flex-col items-center justify-center p-6 opacity-40"
                >
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center mb-3 border-2 border-dashed border-slate-200">
                    <Car size={24} className="text-slate-300" />
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Add Vehicle
                  </p>
                </div>
              ))}
            </div>

            {/* ================= OVERVIEW SECTION ================= */}
            <SpecBox title="Overview" icon={Info} sectionKey="overview">
              <Row label="Brand">
                {selectedVehicles.map((v) => (
                  <Cell key={`brand-${v._id}`}>
                    <span className="font-semibold text-slate-700 text-sm">
                      {v.brand || "-"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-brand-${i}`} />
                ))}
              </Row>
              <Row label="Model">
                {selectedVehicles.map((v) => (
                  <Cell key={`model-${v._id}`}>
                    <span className="font-semibold text-slate-700 text-sm">
                      {v.model || v.name || "-"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-model-${i}`} />
                ))}
              </Row>
              <Row label="Year">
                {selectedVehicles.map((v) => (
                  <Cell key={`year-${v._id}`}>
                    <span className="font-semibold text-slate-700 text-sm">
                      {v.year || "-"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-year-${i}`} />
                ))}
              </Row>
              <Row label="Category">
                {selectedVehicles.map((v) => (
                  <Cell key={`cat-${v._id}`}>
                    <span className="font-semibold text-slate-700 text-sm">
                      {v.category || "-"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-cat-${i}`} />
                ))}
              </Row>
              <Row label="Listing Type">
                {selectedVehicles.map((v) => (
                  <Cell key={`ltype-${v._id}`}>
                    <span
                      className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider flex items-center gap-1 shadow-sm ${v.listingType === "full" ? "bg-blue-50 text-blue-600 border border-blue-100" : "bg-emerald-50 text-emerald-600 border border-emerald-100"}`}
                    >
                      {v.listingType === "full" ? (
                        <Car size={10} />
                      ) : (
                        <Users size={10} />
                      )}
                      {v.listingType === "full" ? "Full Rental" : "Seat Share"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-ltype-${i}`} />
                ))}
              </Row>
              <Row label="Description">
                {selectedVehicles.map((v) => (
                  <Cell key={`desc-${v._id}`}>
                    <p className="text-xs text-slate-500 font-medium text-center line-clamp-3 leading-relaxed max-w-[280px]">
                      {v.description || "No description provided."}
                    </p>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-desc-${i}`} />
                ))}
              </Row>
            </SpecBox>

            {/* ================= PRICING SECTION ================= */}
            <SpecBox title="Pricing & Value" icon={Tag} sectionKey="pricing">
              <Row label="Rental Rate">
                {selectedVehicles.map((v) => (
                  <Cell
                    key={`rate-${v._id}`}
                    isHighlighted={bestPriceId === v._id}
                  >
                    <span
                      className={`text-xl font-black ${bestPriceId === v._id ? "text-emerald-600" : "text-slate-900"}`}
                    >
                      <span className="text-xs font-bold align-top text-slate-500 mr-0.5">
                        Rs.
                      </span>
                      {v.listingType === "full"
                        ? (v.pricePerDay || 0).toLocaleString()
                        : (v.pricePerSeat || 0).toLocaleString()}
                    </span>
                    <span className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mt-0.5">
                      /{v.listingType === "full" ? "day" : "seat"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-rate-${i}`} />
                ))}
              </Row>

              <Row label="Security Deposit">
                {selectedVehicles.map((v) => (
                  <Cell key={`dep-${v._id}`}>
                    {v.listingType === "full" && v.deposit ? (
                      <span className="font-semibold text-slate-700 text-sm">
                        Rs. {v.deposit.toLocaleString()}
                      </span>
                    ) : (
                      <span className="font-bold text-slate-400 text-sm">
                        -
                      </span>
                    )}
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-dep-${i}`} />
                ))}
              </Row>
            </SpecBox>

            {/* ================= ENGINE & TRANSMISSION ================= */}
            <SpecBox
              title="Engine & Transmission"
              icon={Settings}
              sectionKey="engineTransmission"
            >
              <Row label="Fuel Type">
                {selectedVehicles.map((v) => (
                  <Cell key={`fuel-${v._id}`}>
                    <div className="flex items-center gap-1.5 justify-center">
                      <Fuel size={14} className="text-slate-400" />
                      <span className="font-semibold text-slate-700 text-sm">
                        {v.fuelType || "-"}
                      </span>
                    </div>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-fuel-${i}`} />
                ))}
              </Row>

              <Row label="Transmission">
                {selectedVehicles.map((v) => (
                  <Cell key={`trans-${v._id}`}>
                    <span className="font-semibold text-slate-700 text-sm">
                      {v.transmission || "-"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-trans-${i}`} />
                ))}
              </Row>
            </SpecBox>

            {/* ================= SPECIFICATIONS ================= */}
            <SpecBox
              title="Specifications"
              icon={List}
              sectionKey="specifications"
            >
              <Row label="Seat Capacity">
                {selectedVehicles.map((v) => (
                  <Cell key={`seats-${v._id}`}>
                    <div className="flex items-center gap-1.5 justify-center">
                      <Users size={14} className="text-slate-400" />
                      <span className="font-semibold text-slate-700 text-sm">
                        {v.seats || v.availableSeats || "-"}
                      </span>
                    </div>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-seats-${i}`} />
                ))}
              </Row>

              <Row label="Mileage">
                {selectedVehicles.map((v) => (
                  <Cell key={`mil-${v._id}`}>
                    <span className="font-semibold text-slate-700 text-sm">
                      {v.mileage || "-"}
                    </span>
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-mil-${i}`} />
                ))}
              </Row>
            </SpecBox>

            {/* ================= FEATURES ================= */}
            <SpecBox title="Features" icon={CheckCircle2} sectionKey="features">
              {premiumFeaturesList.map((feature, index) => (
                <Row key={`feat-row-${index}`} label={feature}>
                  {selectedVehicles.map((v) => {
                    const hasFeature = v.features?.some(
                      (f) => f.toLowerCase() === feature.toLowerCase(),
                    );
                    return (
                      <Cell key={`feat-${v._id}-${index}`}>
                        {hasFeature ? (
                          <div className="w-5.5 h-5.5 rounded-full bg-blue-50 flex items-center justify-center border border-blue-150">
                            <Check
                              size={12}
                              strokeWidth={3}
                              className="text-blue-600"
                            />
                          </div>
                        ) : (
                          <Minus size={14} className="text-slate-300" />
                        )}
                      </Cell>
                    );
                  })}
                  {fillerSlots.map((_, i) => (
                    <Cell key={`f-feat-${index}-${i}`} />
                  ))}
                </Row>
              ))}
            </SpecBox>

            {/* ================= PICKUP LOCATION ================= */}
            <SpecBox
              title="Pickup Location"
              icon={MapPin}
              sectionKey="pickupLocation"
            >
              <Row label="Location Details">
                {selectedVehicles.map((v) => (
                  <Cell key={`loc-${v._id}`}>
                    {v.listingType === "full" ? (
                      <div className="text-center flex flex-col items-center">
                        <p className="font-semibold text-slate-750 text-sm max-w-[250px]">
                          {v.location || "-"}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <span className="font-semibold text-slate-750 text-sm text-center max-w-[250px]">
                          {v.departure}
                        </span>
                        <ArrowRight size={12} className="text-slate-300" />
                        <span className="font-semibold text-slate-750 text-sm text-center max-w-[250px]">
                          {v.destination}
                        </span>
                      </div>
                    )}
                  </Cell>
                ))}
                {fillerSlots.map((_, i) => (
                  <Cell key={`f-loc-${i}`} />
                ))}
              </Row>
            </SpecBox>

            {/* ================= ACTIONS ================= */}
            <div className="bg-white rounded-3xl border border-slate-200/60 shadow-[0_10px_30px_-10px_rgba(15,23,42,0.05)] overflow-hidden flex items-stretch">
              <div className="w-56 bg-slate-50/50 border-r border-slate-100 shrink-0 py-6" />
              {selectedVehicles.map((v) => (
                <div
                  key={`act-${v._id}`}
                  className="flex-1 min-w-[300px] p-6 flex justify-center items-center border-r border-slate-100 last:border-r-0"
                >
                  <button
                    onClick={() => navigate(`/listings/${v._id}`)}
                    className="w-full py-3.5 rounded-xl font-bold uppercase tracking-widest text-xs transition-all duration-300 transform hover:scale-[1.02] active:scale-95 bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_8px_20px_-8px_rgba(37,99,235,0.5)] hover:shadow-[0_12px_24px_-8px_rgba(37,99,235,0.7)] cursor-pointer"
                  >
                    View Vehicle
                  </button>
                </div>
              ))}
              {fillerSlots.map((_, i) => (
                <div
                  key={`filler-act-${i}`}
                  className="flex-1 min-w-[300px] border-r border-slate-100 last:border-r-0 bg-slate-50/10"
                />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ComparePage;
