// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { Car, Users } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// const BACKEND_URL = "http://localhost:5000";

// const AllListings = () => {
//   const [listings, setListings] = useState([]);
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await api.get("/listings");
//         setListings(res.data);
//       } catch (err) {
//         console.error("Failed to load listings", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   const filteredListings =
//     filter === "all"
//       ? listings
//       : listings.filter((l) => l.listingType === filter);

//   if (loading) return <p>Loading listings...</p>;

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900">Browse Listings</h1>
//         <p className="text-slate-500">
//           Vehicles and seat availability near you
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-3">
//         {[
//           { key: "all", label: "All" },
//           { key: "full", label: "Full Vehicles" },
//           { key: "seats", label: "Seat Listings" },
//         ].map((f) => (
//           <button
//             key={f.key}
//             onClick={() => setFilter(f.key)}
//             className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
//               filter === f.key
//                 ? "bg-blue-600 text-white"
//                 : "bg-white border text-slate-600 hover:bg-slate-50"
//             }`}
//           >
//             {f.label}
//           </button>
//         ))}
//       </div>

//       {/* Listings Grid */}
//       {filteredListings.length === 0 ? (
//         <p className="text-slate-500">No listings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredListings.map((l) => (
//             <div
//               key={l._id}
//               className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
//             >
//               {/* Image */}
//               <img
//                 src={
//                   l.photos?.length
//                     ? `${BACKEND_URL}${l.photos[0]}`
//                     : "/placeholder-car.jpg"
//                 }
//                 alt={l.name}
//                 className="h-48 w-full object-cover"
//               />

//               {/* Content */}
//               <div className="p-4 space-y-2">
//                 <h3 className="font-bold text-lg truncate">{l.name}</h3>

//                 {/* Badge */}
//                 <span
//                   className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
//                     l.listingType === "full"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-emerald-100 text-emerald-700"
//                   }`}
//                 >
//                   {l.listingType === "full" ? (
//                     <>
//                       <Car size={12} /> Full Vehicle
//                     </>
//                   ) : (
//                     <>
//                       <Users size={12} /> Seat Listing
//                     </>
//                   )}
//                 </span>

//                 {/* Pricing */}
//                 {l.listingType === "full" ? (
//                   <p className="font-semibold text-slate-900">
//                     ${l.pricePerDay} / day
//                   </p>
//                 ) : (
//                   <p className="font-semibold text-slate-900">
//                     ${l.pricePerSeat} / seat • {l.availableSeats} seats
//                   </p>
//                 )}

//                 {/* Location / Route */}
//                 <p className="text-xs text-slate-500">
//                   {l.listingType === "full"
//                     ? l.location
//                     : `${l.departure} → ${l.destination}`}
//                 </p>
//               </div>
//               <button
//                 onClick={() => navigate(`/listings/${listing._id}`)}
//                 className="w-full mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AllListings;

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { Car, Users } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// const BACKEND_URL = "http://localhost:5000";

// const AllListings = () => {
//   const [listings, setListings] = useState([]);
//   const navigate = useNavigate();
//   const [filter, setFilter] = useState("all");
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await api.get("/listings");
//         setListings(res.data);
//       } catch (err) {
//         console.error("Failed to load listings", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListings();
//   }, []);

//   const filteredListings =
//     filter === "all"
//       ? listings
//       : listings.filter((l) => l.listingType === filter);

//   if (loading) return <p>Loading listings...</p>;

//   return (
//     <div className="space-y-6">
//       <Navbar />
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-slate-900 pt-20">
//           Browse Listings
//         </h1>
//         <p className="text-slate-500">
//           Vehicles and seat availability near you
//         </p>
//       </div>

//       {/* Filters */}
//       <div className="flex gap-3">
//         {[
//           { key: "all", label: "All" },
//           { key: "full", label: "Full Vehicles" },
//           { key: "seats", label: "Seat Listings" },
//         ].map((f) => (
//           <button
//             key={f.key}
//             onClick={() => setFilter(f.key)}
//             className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
//               filter === f.key
//                 ? "bg-blue-600 text-white"
//                 : "bg-white border text-slate-600 hover:bg-slate-50"
//             }`}
//           >
//             {f.label}
//           </button>
//         ))}
//       </div>

//       {/* Listings Grid */}
//       {filteredListings.length === 0 ? (
//         <p className="text-slate-500">No listings found.</p>
//       ) : (
//         <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
//           {filteredListings.map((l) => (
//             <div
//               key={l._id}
//               className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
//             >
//               {/* Image */}
//               <img
//                 src={
//                   l.photos?.length
//                     ? `${BACKEND_URL}${l.photos[0]}`
//                     : "/placeholder-car.jpg"
//                 }
//                 alt={l.name}
//                 className="h-48 w-full object-cover"
//               />

//               {/* Content */}
//               <div className="p-4 space-y-2">
//                 <h3 className="font-bold text-lg truncate">{l.name}</h3>

//                 {/* Badge */}
//                 <span
//                   className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
//                     l.listingType === "full"
//                       ? "bg-blue-100 text-blue-700"
//                       : "bg-emerald-100 text-emerald-700"
//                   }`}
//                 >
//                   {l.listingType === "full" ? (
//                     <>
//                       <Car size={12} /> Full Vehicle
//                     </>
//                   ) : (
//                     <>
//                       <Users size={12} /> Seat Listing
//                     </>
//                   )}
//                 </span>

//                 {/* Pricing */}
//                 {l.listingType === "full" ? (
//                   <p className="font-semibold text-slate-900">
//                     ${l.pricePerDay} / day
//                   </p>
//                 ) : (
//                   <p className="font-semibold text-slate-900">
//                     ${l.pricePerSeat} / seat • {l.availableSeats} seats
//                   </p>
//                 )}

//                 {/* Location / Route */}
//                 <p className="text-xs text-slate-500">
//                   {l.listingType === "full"
//                     ? l.location
//                     : `${l.departure} → ${l.destination}`}
//                 </p>
//               </div>

//               {/* CTA */}
//               <button
//                 onClick={() => navigate(`/listings/${l._id}`)}
//                 className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//               >
//                 View Details
//               </button>
//             </div>
//           ))}
//         </div>
//       )}
//       <Footer />
//     </div>
//   );
// };

// export default AllListings;

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Car,
//   Users,
//   MapPin,
//   Search,
//   Filter,
//   ChevronRight,
//   ArrowRight,
//   Gauge,
//   ShieldCheck,
//   TrendingUp,
//   Map,
// } from "lucide-react";
// import api from "../../utils/api";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";

// const BACKEND_URL = "http://localhost:5000";

// const AllListings = () => {
//   const [listings, setListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await api.get("/listings");
//         const data = Array.isArray(res.data) ? res.data : [];
//         setListings(data);
//         setFilteredListings(data);
//       } catch (err) {
//         console.error("Error fetching listings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListings();
//   }, []);

//   useEffect(() => {
//     let result = listings;

//     if (activeFilter !== "all") {
//       result = result.filter((l) => l.listingType === activeFilter);
//     }

//     if (searchQuery) {
//       const query = searchQuery.toLowerCase();
//       result = result.filter(
//         (l) =>
//           l.name?.toLowerCase().includes(query) ||
//           l.location?.toLowerCase().includes(query) ||
//           l.departure?.toLowerCase().includes(query) ||
//           l.destination?.toLowerCase().includes(query)
//       );
//     }

//     setFilteredListings(result);
//   }, [activeFilter, searchQuery, listings]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
//         <Navbar />
//         <div className="relative mb-6">
//           <div className="w-20 h-20 border-[3px] border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
//           <Car
//             className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-600"
//             size={24}
//           />
//         </div>
//         <p className="text-slate-400 font-black tracking-[0.3em] uppercase text-[10px] animate-pulse">
//           Syncing Marketplace
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-[#FDFDFF] overflow-x-hidden">
//       <Navbar />
//       {/* Dynamic Hero Section */}
//       <section className="relative pt-32 pb-16 px-6 overflow-hidden">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-400/5 blur-[120px] rounded-full -mr-64 -mt-32"></div>
//         <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-emerald-400/5 blur-[100px] rounded-full -ml-32 -mb-16"></div>

//         <div className="max-w-7xl mx-auto relative z-10">
//           <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
//             <div className="max-w-2xl space-y-6">
//               <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-100/50">
//                 <TrendingUp size={14} className="text-blue-600" />
//                 <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">
//                   Top Rated Platforms 2024
//                 </span>
//               </div>
//               <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[0.95] tracking-tighter">
//                 Find your next <br />
//                 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
//                   Great Journey.
//                 </span>
//               </h1>
//               <p className="text-slate-500 text-lg font-medium">
//                 The most reliable community for vehicle rentals and smart
//                 ride-sharing. Verified assets, seamless booking.
//               </p>
//             </div>

//             {/* Search Glassmorphism Box */}
//             <div className="w-full lg:w-[420px] p-2 bg-white rounded-[2.5rem] shadow-2xl shadow-blue-900/5 border border-slate-100 flex items-center">
//               <div className="flex-1 relative">
//                 <Search
//                   className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
//                   size={20}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search destination or car..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full py-5 pl-14 pr-6 bg-transparent outline-none text-slate-900 font-bold placeholder:text-slate-400 text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Elegant Filter System */}
//           <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border-b border-slate-100 pb-8">
//             <div className="flex items-center gap-2 p-1.5 bg-slate-100/50 rounded-[1.25rem] backdrop-blur-sm border border-slate-200/50">
//               {[
//                 { id: "all", label: "Explore All", icon: Map },
//                 { id: "full", label: "Rent Fleet", icon: Car },
//                 { id: "seats", label: "Ride Share", icon: Users },
//               ].map((btn) => (
//                 <button
//                   key={btn.id}
//                   onClick={() => setActiveFilter(btn.id)}
//                   className={`flex items-center gap-2.5 px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all duration-300 ${
//                     activeFilter === btn.id
//                       ? "bg-white text-blue-600 shadow-xl shadow-blue-500/10"
//                       : "text-slate-400 hover:text-slate-600"
//                   }`}
//                 >
//                   <btn.icon size={16} />
//                   {btn.label}
//                 </button>
//               ))}
//             </div>

//             <div className="flex items-center gap-6">
//               <div className="text-right">
//                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
//                   Available now
//                 </p>
//                 <p className="text-xl font-black text-slate-900">
//                   {filteredListings.length} Assets
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Modern Grid Section */}
//       <section className="max-w-7xl mx-auto px-6 py-12 pb-32">
//         {filteredListings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-40 bg-white rounded-[4rem] border border-dashed border-slate-200">
//             <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
//               <Filter className="text-slate-200" size={40} />
//             </div>
//             <h3 className="text-2xl font-black text-slate-900 tracking-tight">
//               No Matches Found
//             </h3>
//             <p className="text-slate-500 font-medium">
//               Try broadening your search or switching categories.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
//             {filteredListings.map((listing) => (
//               <div
//                 key={listing._id}
//                 className="group relative bg-white rounded-[3rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-blue-600/10 transition-all duration-700 overflow-hidden flex flex-col"
//               >
//                 {/* Visual Identity */}
//                 <div className="relative h-[280px] overflow-hidden m-3 rounded-[2.5rem]">
//                   <img
//                     src={
//                       listing.photos?.length
//                         ? listing.photos[0].startsWith("blob") ||
//                           listing.photos[0].startsWith("http")
//                           ? listing.photos[0]
//                           : `${BACKEND_URL}${listing.photos[0]}`
//                         : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000&auto=format&fit=crop"
//                     }
//                     alt={listing.name}
//                     className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                   />

//                   {/* Glass Floaties */}
//                   <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
//                     <span
//                       className={`px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest backdrop-blur-md border border-white/20 shadow-2xl flex items-center gap-2 ${
//                         listing.listingType === "full"
//                           ? "bg-blue-600/80 text-white"
//                           : "bg-emerald-600/80 text-white"
//                       }`}
//                     >
//                       {listing.listingType === "full" ? (
//                         <Car size={14} />
//                       ) : (
//                         <Users size={14} />
//                       )}
//                       {listing.listingType === "full" ? "Fleet" : "Shared"}
//                     </span>

//                     <div className="p-2.5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-opacity">
//                       <ShieldCheck size={18} />
//                     </div>
//                   </div>

//                   {listing.listingType === "seats" && (
//                     <div className="absolute bottom-4 left-4">
//                       <div className="bg-black/40 backdrop-blur-xl px-4 py-2 rounded-2xl flex items-center gap-2 border border-white/10 shadow-lg">
//                         <Users size={14} className="text-emerald-400" />
//                         <span className="text-[10px] font-black text-white uppercase tracking-widest">
//                           {listing.availableSeats} Open Slots
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Core Info */}
//                 <div className="px-8 pb-8 pt-4 flex-1 flex flex-col justify-between">
//                   <div className="space-y-6">
//                     <div className="flex justify-between items-start">
//                       <div className="space-y-1 flex-1 pr-4">
//                         <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest mb-1">
//                           {listing.brand || "Premium"}
//                         </p>
//                         <h3 className="text-2xl font-black text-slate-900 tracking-tighter leading-none truncate group-hover:text-blue-600 transition-colors">
//                           {listing.name}
//                         </h3>
//                       </div>
//                       <div className="text-right shrink-0">
//                         <p className="text-2xl font-black text-slate-900">
//                           <span className="text-blue-600 font-bold">$</span>
//                           {listing.listingType === "full"
//                             ? listing.pricePerDay
//                             : listing.pricePerSeat}
//                         </p>
//                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
//                           /{listing.listingType === "full" ? "Day" : "Seat"}
//                         </p>
//                       </div>
//                     </div>

//                     {/* Metadata Visualization */}
//                     <div className="space-y-4">
//                       {listing.listingType === "full" ? (
//                         <div className="flex items-center gap-3 bg-slate-50/50 p-4 rounded-[1.5rem] border border-slate-100">
//                           <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center text-blue-600 shrink-0">
//                             <MapPin size={18} />
//                           </div>
//                           <p className="text-sm font-bold text-slate-600 truncate">
//                             {listing.location || "Central Hub Pick-up"}
//                           </p>
//                         </div>
//                       ) : (
//                         <div className="bg-slate-50/50 p-5 rounded-[1.5rem] border border-slate-100 space-y-3">
//                           <div className="flex items-center gap-4">
//                             <div className="flex-1 space-y-1">
//                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                                 Origin
//                               </p>
//                               <p className="font-bold text-slate-900 text-sm truncate">
//                                 {listing.departure}
//                               </p>
//                             </div>
//                             <div className="flex items-center justify-center w-8 h-8 rounded-full bg-emerald-100">
//                               <ArrowRight
//                                 size={14}
//                                 className="text-emerald-600"
//                               />
//                             </div>
//                             <div className="flex-1 text-right space-y-1">
//                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
//                                 Goal
//                               </p>
//                               <p className="font-bold text-slate-900 text-sm truncate">
//                                 {listing.destination}
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       <div className="flex items-center gap-6 px-2">
//                         <div className="flex items-center gap-2 text-slate-400">
//                           <Gauge size={14} className="text-blue-500/50" />
//                           <span className="text-[9px] font-black uppercase tracking-widest">
//                             {listing.transmission || "Automatic"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2 text-slate-400">
//                           <Users size={14} className="text-blue-500/50" />
//                           <span className="text-[9px] font-black uppercase tracking-widest">
//                             {listing.seats || "5"} Seats
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => navigate(`/listings/${listing._id}`)}
//                     className="w-full mt-10 py-5 bg-slate-900 hover:bg-black text-white rounded-[1.75rem] font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 transition-all shadow-xl shadow-black/10 hover:shadow-blue-600/20 active:scale-95 group/btn"
//                   >
//                     View Experience
//                     <ChevronRight
//                       size={16}
//                       className="group-hover/btn:translate-x-1 transition-transform"
//                     />
//                   </button>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </section>
//       <Footer />
//     </div>
//   );
// };

// export default AllListings;

// import React, { useEffect, useState } from "react";
// import {
//   Search,
//   Filter,
//   Car,
//   Users,
//   LayoutGrid,
//   Gauge,
//   MapPin,
//   ArrowRight,
//   ChevronRight,
//   ShieldCheck,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import api from "../../utils/api";

// const BACKEND_URL = "http://localhost:5000";

// const AllListings = () => {
//   const [listings, setListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const navigate = useNavigate();

//   /* ================= FETCH LISTINGS (UNCHANGED) ================= */
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await api.get("/listings");
//         const data = Array.isArray(res.data) ? res.data : [];
//         setListings(data);
//         setFilteredListings(data);
//       } catch (err) {
//         console.error("Error fetching listings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListings();
//   }, []);

//   /* ================= FILTER + SEARCH (UNCHANGED) ================= */
//   useEffect(() => {
//     let result = listings;

//     if (activeFilter !== "all") {
//       result = result.filter((l) => l.listingType === activeFilter);
//     }

//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (l) =>
//           l.name?.toLowerCase().includes(q) ||
//           l.brand?.toLowerCase().includes(q) ||
//           l.location?.toLowerCase().includes(q) ||
//           l.departure?.toLowerCase().includes(q) ||
//           l.destination?.toLowerCase().includes(q),
//       );
//     }

//     setFilteredListings(result);
//   }, [activeFilter, searchQuery, listings]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative">
//       <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px] pointer-events-none" />
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
//         {/* ================= HEADER ================= */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
//           <div className="space-y-4">
//             <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
//               Asset <br />
//               <span className="text-cyan-400">Marketplace.</span>
//             </h1>
//             <p className="text-slate-300 font-medium max-w-sm">
//               Discover {filteredListings.length} premium vehicles and ride-share
//               opportunities.
//             </p>
//           </div>

//           {/* Search */}
//           <div className="w-full lg:w-[460px] p-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center shadow-2xl">
//             <div className="flex-1 relative">
//               <Search
//                 className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by city, model or brand..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-4 pl-16 pr-6 bg-transparent outline-none text-white font-bold placeholder:text-slate-400 text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* ================= FILTER BAR ================= */}
//         <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
//           <div className="flex p-1.5 bg-black/40 backdrop-blur-md rounded-[1.5rem] border border-white/10 shadow-inner">
//             {[
//               { id: "all", label: "All Listings", icon: LayoutGrid },
//               { id: "full", label: "Full Rentals", icon: Car },
//               { id: "seats", label: "Ride Shares", icon: Users },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveFilter(tab.id)}
//                 className={`flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
//                   activeFilter === tab.id
//                     ? "bg-white/20 text-cyan-400 shadow-xl border border-white/20"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 <tab.icon size={14} />
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <div className="text-right">
//             <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
//               Live Inventory
//             </p>
//             <p className="text-2xl font-black text-white">
//               {filteredListings.length}{" "}
//               <span className="text-slate-400 text-sm">Matches</span>
//             </p>
//           </div>
//         </div>

//         {/* ================= GRID ================= */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-[500px] bg-white/5 animate-pulse rounded-[3rem] border border-white/10"
//               />
//             ))}
//           </div>
//         ) : filteredListings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-40 bg-white/5 rounded-[4rem] border border-dashed border-white/10">
//             <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center mb-6 text-cyan-400">
//               <Filter size={48} />
//             </div>
//             <h3 className="text-2xl font-black">No matching assets found</h3>
//             <p className="text-slate-400 mt-2">
//               Adjust your filters or try a different search term.
//             </p>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredListings.map((listing) => {
//               const isFull = listing.listingType === "full";

//               return (
//                 <div
//                   key={listing._id}
//                   className="group relative bg-white rounded-[3rem] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-700 overflow-hidden flex flex-col shadow-2xl"
//                 >
//                   {/* Image */}
//                   <div className="relative h-64 overflow-hidden m-3 rounded-[2.5rem] bg-slate-100">
//                     <img
//                       src={
//                         listing.photos?.length
//                           ? listing.photos[0].startsWith("http")
//                             ? listing.photos[0]
//                             : `${BACKEND_URL}${listing.photos[0]}`
//                           : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000"
//                       }
//                       alt={listing.name}
//                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                     />

//                     <div className="absolute top-4 left-4">
//                       <span
//                         className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 border border-white/20 ${
//                           isFull ? "bg-blue-600/90" : "bg-emerald-500/90"
//                         }`}
//                       >
//                         {isFull ? <Car size={12} /> : <Users size={12} />}
//                         {isFull ? "Premium Rental" : "Seat Share"}
//                       </span>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="px-8 pb-8 pt-4 flex-1 flex flex-col justify-between text-slate-900">
//                     <div className="space-y-6">
//                       <div className="flex justify-between">
//                         <div>
//                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
//                             {listing.brand || "Luxury"}
//                           </p>
//                           <h3 className="text-2xl font-black tracking-tighter">
//                             {listing.name}
//                           </h3>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-2xl font-black">
//                             <span className="text-blue-600">$</span>
//                             {isFull
//                               ? listing.pricePerDay
//                               : listing.pricePerSeat}
//                           </p>
//                           <p className="text-[9px] uppercase tracking-widest text-slate-400">
//                             /{isFull ? "day" : "seat"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-6 text-slate-400">
//                         <div className="flex items-center gap-2">
//                           <Gauge size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             {listing.transmission || "Auto"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Users size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             {listing.seats || 5} Seats
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <ShieldCheck size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             Safe
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => navigate(`/listings/${listing._id}`)}
//                       className="w-full mt-10 py-5 bg-slate-900 hover:bg-black text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-[1.75rem]"
//                     >
//                       View Experience
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       <Footer />
//     </div>
//   );
// };

// export default AllListings;

// import React, { useEffect, useState } from "react";
// import {
//   Search,
//   Filter,
//   Car,
//   Users,
//   LayoutGrid,
//   Gauge,
//   MapPin,
//   ArrowRight,
//   ChevronRight,
//   ShieldCheck,
//   SlidersHorizontal,
//   X,
//   ChevronDown,
//   Fuel,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import api from "../../utils/api";
// import { Checkbox } from "@/components/ui/checkbox";
// import FloatingCompareBar from "../../components/FloatingCompareBar";
// import { useComparison } from "../../context/ComparisonContext";

// const BACKEND_URL = "http://localhost:5000";

// const AllListings = () => {
//   const [listings, setListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Existing logic state (unchanged)
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   // ✅ Added: Advanced filters + sorting (NEW)
//   const [showFilters, setShowFilters] = useState(false);
//   const [fuelType, setFuelType] = useState([]); // multi-select
//   const [transmission, setTransmission] = useState([]); // multi-select
//   const [minSeats, setMinSeats] = useState(null);
//   const [maxPrice, setMaxPrice] = useState(1000);
//   const [sortBy, setSortBy] = useState("newest"); // newest | price-asc | price-desc | popularity

//   const navigate = useNavigate();
//   const { selectedVehicles, addToComparison, removeFromComparison } =
//     useComparison();

//   /* ================= FETCH LISTINGS (UNCHANGED) ================= */
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await api.get("/listings");
//         const data = Array.isArray(res.data) ? res.data : [];
//         setListings(data);
//         setFilteredListings(data);
//       } catch (err) {
//         console.error("Error fetching listings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListings();
//   }, []);

//   /* ================= FILTER + SEARCH (UNCHANGED + EXTENDED) ================= */
//   useEffect(() => {
//     let result = listings;

//     // ✅ Your original logic (UNCHANGED)
//     if (activeFilter !== "all") {
//       result = result.filter((l) => l.listingType === activeFilter);
//     }

//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (l) =>
//           l.name?.toLowerCase().includes(q) ||
//           l.brand?.toLowerCase().includes(q) ||
//           l.location?.toLowerCase().includes(q) ||
//           l.departure?.toLowerCase().includes(q) ||
//           l.destination?.toLowerCase().includes(q),
//       );
//     }

//     // ✅ Added filters (does NOT change your logic above)
//     if (fuelType.length > 0) {
//       result = result.filter((l) =>
//         fuelType.includes(l.fuelType || "Gasoline"),
//       );
//     }

//     if (transmission.length > 0) {
//       result = result.filter((l) =>
//         transmission.includes(l.transmission || "Automatic"),
//       );
//     }

//     if (minSeats !== null) {
//       result = result.filter((l) => (l.seats || 0) >= minSeats);
//     }

//     // Price range: full => pricePerDay, seats => pricePerSeat
//     result = result.filter((l) => {
//       const price = l.listingType === "full" ? l.pricePerDay : l.pricePerSeat;
//       return (price ?? 0) <= maxPrice;
//     });

//     // ✅ Sorting
//     result = [...result].sort((a, b) => {
//       const priceA = a.listingType === "full" ? a.pricePerDay : a.pricePerSeat;
//       const priceB = b.listingType === "full" ? b.pricePerDay : b.pricePerSeat;

//       switch (sortBy) {
//         case "price-asc":
//           return (priceA ?? 0) - (priceB ?? 0);
//         case "price-desc":
//           return (priceB ?? 0) - (priceA ?? 0);
//         case "popularity":
//           return (b.views || 0) - (a.views || 0);
//         case "newest":
//         default:
//           return (
//             new Date(b.createdAt || 0).getTime() -
//             new Date(a.createdAt || 0).getTime()
//           );
//       }
//     });

//     setFilteredListings(result);
//   }, [
//     activeFilter,
//     searchQuery,
//     listings,
//     fuelType,
//     transmission,
//     minSeats,
//     maxPrice,
//     sortBy,
//   ]);

//   const clearAllAdvanced = () => {
//     setFuelType([]);
//     setTransmission([]);
//     setMinSeats(null);
//     setMaxPrice(1000);
//     setSortBy("newest");
//   };

//   const clearEverything = () => {
//     setSearchQuery("");
//     setActiveFilter("all");
//     clearAllAdvanced();
//   };

//   const activeAdvCount =
//     (fuelType.length || 0) +
//     (transmission.length || 0) +
//     (minSeats ? 1 : 0) +
//     (maxPrice < 1000 ? 1 : 0) +
//     (sortBy !== "newest" ? 1 : 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative">
//       <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px] pointer-events-none" />
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
//         {/* ================= HEADER ================= */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
//           <div className="space-y-4">
//             <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
//               Asset <br />
//               <span className="text-cyan-400">Marketplace.</span>
//             </h1>
//             <p className="text-slate-300 font-medium max-w-sm">
//               Discover {filteredListings.length} premium vehicles and ride-share
//               opportunities.
//             </p>
//           </div>

//           {/* Search */}
//           <div className="w-full lg:w-[460px] p-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center shadow-2xl">
//             <div className="flex-1 relative">
//               <Search
//                 className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by city, model or brand..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-4 pl-16 pr-6 bg-transparent outline-none text-white font-bold placeholder:text-slate-400 text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* ================= FILTER BAR ================= */}
//         <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
//           <div className="flex p-1.5 bg-black/40 backdrop-blur-md rounded-[1.5rem] border border-white/10 shadow-inner">
//             {[
//               { id: "all", label: "All Listings", icon: LayoutGrid },
//               { id: "full", label: "Full Rentals", icon: Car },
//               { id: "seats", label: "Ride Shares", icon: Users },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveFilter(tab.id)}
//                 className={`flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
//                   activeFilter === tab.id
//                     ? "bg-white/20 text-cyan-400 shadow-xl border border-white/20"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 <tab.icon size={14} />
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           {/* Right side: live inventory + sorting + filters */}
//           <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
//             {/* Sorting */}
//             <div className="relative">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="appearance-none bg-white/10 border border-white/20 rounded-2xl px-5 py-3 pr-11 text-[10px] font-black uppercase tracking-widest text-white outline-none hover:bg-white/15 transition-all"
//               >
//                 <option value="newest" className="bg-slate-900">
//                   Sort: Newest
//                 </option>
//                 <option value="price-asc" className="bg-slate-900">
//                   Price: Low to High
//                 </option>
//                 <option value="price-desc" className="bg-slate-900">
//                   Price: High to Low
//                 </option>
//                 <option value="popularity" className="bg-slate-900">
//                   Most Popular
//                 </option>
//               </select>
//               <ChevronDown
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
//                 size={16}
//               />
//             </div>

//             {/* Filters button */}
//             <button
//               onClick={() => setShowFilters(true)}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-400 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-cyan-300 transition-all"
//             >
//               <SlidersHorizontal size={14} />
//               Filters
//               {activeAdvCount > 0 && (
//                 <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px]">
//                   {activeAdvCount}
//                 </span>
//               )}
//             </button>

//             {/* Live Inventory */}
//             <div className="text-right">
//               <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
//                 Live Inventory
//               </p>
//               <p className="text-2xl font-black text-white">
//                 {filteredListings.length}{" "}
//                 <span className="text-slate-400 text-sm">Matches</span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ================= ACTIVE FILTER CHIPS ================= */}
//         {(fuelType.length > 0 ||
//           transmission.length > 0 ||
//           minSeats !== null ||
//           maxPrice < 1000 ||
//           sortBy !== "newest") && (
//           <div className="flex flex-wrap gap-2 mb-10">
//             {fuelType.map((f) => (
//               <button
//                 key={f}
//                 onClick={() =>
//                   setFuelType((prev) => prev.filter((x) => x !== f))
//                 }
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 {f} <X size={12} />
//               </button>
//             ))}

//             {transmission.map((t) => (
//               <button
//                 key={t}
//                 onClick={() =>
//                   setTransmission((prev) => prev.filter((x) => x !== t))
//                 }
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 {t} <X size={12} />
//               </button>
//             ))}

//             {minSeats !== null && (
//               <button
//                 onClick={() => setMinSeats(null)}
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 Seats: {minSeats}+ <X size={12} />
//               </button>
//             )}

//             {maxPrice < 1000 && (
//               <button
//                 onClick={() => setMaxPrice(1000)}
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 Under ${maxPrice} <X size={12} />
//               </button>
//             )}

//             {sortBy !== "newest" && (
//               <button
//                 onClick={() => setSortBy("newest")}
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 Sorting On <X size={12} />
//               </button>
//             )}

//             <button
//               onClick={clearAllAdvanced}
//               className="ml-auto text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-white underline underline-offset-4"
//             >
//               Clear Advanced Filters
//             </button>
//           </div>
//         )}

//         {/* ================= GRID ================= */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-[500px] bg-white/5 animate-pulse rounded-[3rem] border border-white/10"
//               />
//             ))}
//           </div>
//         ) : filteredListings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-40 bg-white/5 rounded-[4rem] border border-dashed border-white/10">
//             <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center mb-6 text-cyan-400">
//               <Filter size={48} />
//             </div>
//             <h3 className="text-2xl font-black">No matching assets found</h3>
//             <p className="text-slate-400 mt-2">
//               Adjust your filters or try a different search term.
//             </p>

//             <button
//               onClick={clearEverything}
//               className="mt-8 px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
//             >
//               Reset All
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredListings.map((listing) => {
//               const isFull = listing.listingType === "full";

//               return (
//                 <div
//                   key={listing._id}
//                   className="group relative bg-white rounded-[3rem] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-700 overflow-hidden flex flex-col shadow-2xl"
//                 >
//                   {/* Image */}
//                   <div className="relative h-64 overflow-hidden m-3 rounded-[2.5rem] bg-slate-100">
//                     <img
//                       src={
//                         listing.photos?.length
//                           ? listing.photos[0].startsWith("http")
//                             ? listing.photos[0]
//                             : `${BACKEND_URL}${listing.photos[0]}`
//                           : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000"
//                       }
//                       alt={listing.name}
//                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                     />

//                     <div className="absolute top-4 left-4">
//                       <span
//                         className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 border border-white/20 ${
//                           isFull ? "bg-blue-600/90" : "bg-emerald-500/90"
//                         }`}
//                       >
//                         {isFull ? <Car size={12} /> : <Users size={12} />}
//                         {isFull ? "Premium Rental" : "Seat Share"}
//                       </span>
//                     </div>

//                     {/* Compare Checkbox */}
//                     <div className="absolute top-4 right-4 z-20">
//                       <label className="flex items-center cursor-pointer gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-black/60 transition group/check">
//                         <input
//                           type="checkbox"
//                           checked={selectedVehicles.some(
//                             (v) => v._id === listing._id,
//                           )}
//                           onChange={(e) => {
//                             e.stopPropagation();
//                             if (e.target.checked) {
//                               addToComparison(listing);
//                             } else {
//                               removeFromComparison(listing._id);
//                             }
//                           }}
//                           className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
//                         />
//                         <span className="text-[10px] uppercase font-bold text-white tracking-widest ml-1 opacity-0 group-hover/check:opacity-100 transition-opacity w-0 group-hover/check:w-auto overflow-hidden whitespace-nowrap">
//                           Compare
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="px-8 pb-8 pt-4 flex-1 flex flex-col justify-between text-slate-900">
//                     <div className="space-y-6">
//                       <div className="flex justify-between">
//                         <div>
//                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
//                             {listing.brand || "Luxury"}
//                           </p>
//                           <h3 className="text-2xl font-black tracking-tighter">
//                             {listing.name}
//                           </h3>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-2xl font-black">
//                             <span className="text-blue-600">$</span>
//                             {isFull
//                               ? listing.pricePerDay
//                               : listing.pricePerSeat}
//                           </p>
//                           <p className="text-[9px] uppercase tracking-widest text-slate-400">
//                             /{isFull ? "day" : "seat"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-6 text-slate-400">
//                         <div className="flex items-center gap-2">
//                           <Gauge size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             {listing.transmission || "Auto"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Users size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             {listing.seats || 5} Seats
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <ShieldCheck size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             {listing.fuelType || "Gasoline"}
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => navigate(`/listings/${listing._id}`)}
//                       className="w-full mt-10 py-5 bg-slate-900 hover:bg-black text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-[1.75rem]"
//                     >
//                       View Experience
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       {/* ================= FILTER DRAWER ================= */}
//       {showFilters && (
//         <div className="fixed inset-0 z-[120] flex justify-end">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setShowFilters(false)}
//           />
//           <div className="relative w-full max-w-md h-full bg-white text-slate-900 shadow-2xl overflow-hidden flex flex-col">
//             <div className="p-6 border-b border-slate-200 flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-black">Advanced Filters</h3>
//                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
//                   Refine your results
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6 space-y-10">
//               {/* Fuel Type */}
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
//                   <Fuel size={14} className="text-blue-600" />
//                   Fuel Type
//                 </p>
//                 <div className="grid grid-cols-2 gap-3">
//                   {["Electric", "Hybrid", "Diesel", "Gasoline"].map((t) => (
//                     <button
//                       key={t}
//                       onClick={() =>
//                         setFuelType((prev) =>
//                           prev.includes(t)
//                             ? prev.filter((x) => x !== t)
//                             : [...prev, t],
//                         )
//                       }
//                       className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
//                         fuelType.includes(t)
//                           ? "bg-blue-600 border-blue-600 text-white"
//                           : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
//                       }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Transmission */}
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
//                   <Gauge size={14} className="text-blue-600" />
//                   Transmission
//                 </p>
//                 <div className="grid grid-cols-2 gap-3">
//                   {["Automatic", "Manual"].map((t) => (
//                     <button
//                       key={t}
//                       onClick={() =>
//                         setTransmission((prev) =>
//                           prev.includes(t)
//                             ? prev.filter((x) => x !== t)
//                             : [...prev, t],
//                         )
//                       }
//                       className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
//                         transmission.includes(t)
//                           ? "bg-blue-600 border-blue-600 text-white"
//                           : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
//                       }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Min Seats */}
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
//                   <Users size={14} className="text-blue-600" />
//                   Min Seats
//                 </p>
//                 <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
//                   {[2, 4, 5, 7].map((n) => (
//                     <button
//                       key={n}
//                       onClick={() => setMinSeats(minSeats === n ? null : n)}
//                       className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
//                         minSeats === n
//                           ? "bg-white text-blue-600 shadow-sm"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {n}+
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//                     Max Price
//                   </p>
//                   <p className="text-sm font-black text-blue-600">
//                     ${maxPrice}
//                   </p>
//                 </div>
//                 <input
//                   type="range"
//                   min="10"
//                   max="1000"
//                   step="10"
//                   value={maxPrice}
//                   onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
//                   className="w-full accent-blue-600"
//                 />
//                 <div className="flex justify-between text-[10px] font-bold text-slate-400">
//                   <span>$10</span>
//                   <span>$1000</span>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 border-t border-slate-200 bg-white space-y-3">
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all"
//               >
//                 Apply Filters
//               </button>

//               <button
//                 onClick={clearAllAdvanced}
//                 className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
//               >
//                 Clear Advanced Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <FloatingCompareBar />
//       <Footer />
//     </div>
//   );
// };

// export default AllListings;

// import React, { useEffect, useState } from "react";
// import {
//   Search,
//   Filter,
//   Car,
//   Users,
//   LayoutGrid,
//   Gauge,
//   MapPin,
//   ArrowRight,
//   ChevronRight,
//   ShieldCheck,
//   SlidersHorizontal,
//   X,
//   ChevronDown,
//   Fuel,
// } from "lucide-react";
// import { useNavigate } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import api from "../../utils/api";
// import { Checkbox } from "@/components/ui/checkbox";
// import FloatingCompareBar from "../../components/FloatingCompareBar";
// import { useComparison } from "../../context/ComparisonContext";

// const BACKEND_URL = "http://localhost:5000";

// const AllListings = () => {
//   const [listings, setListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [activeFilter, setActiveFilter] = useState("all");
//   const [searchQuery, setSearchQuery] = useState("");

//   const [showFilters, setShowFilters] = useState(false);
//   const [fuelType, setFuelType] = useState([]);
//   const [transmission, setTransmission] = useState([]);
//   const [minSeats, setMinSeats] = useState(null);
//   const [maxPrice, setMaxPrice] = useState(100000);
//   const [sortBy, setSortBy] = useState("newest");

//   const navigate = useNavigate();
//   const { selectedVehicles, addToComparison, removeFromComparison } =
//     useComparison();

//   /* ================= FETCH LISTINGS (UNCHANGED) ================= */
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await api.get("/listings");
//         const data = Array.isArray(res.data) ? res.data : [];
//         setListings(data);
//         setFilteredListings(data);
//       } catch (err) {
//         console.error("Error fetching listings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListings();
//   }, []);

//   /* ================= FILTER + SEARCH (EXTENDED) ================= */
//   useEffect(() => {
//     let result = listings;

//     if (activeFilter !== "all") {
//       result = result.filter((l) => l.listingType === activeFilter);
//     }

//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (l) =>
//           l.name?.toLowerCase().includes(q) ||
//           l.brand?.toLowerCase().includes(q) ||
//           l.location?.toLowerCase().includes(q) ||
//           l.departure?.toLowerCase().includes(q) ||
//           l.destination?.toLowerCase().includes(q),
//       );
//     }

//     if (fuelType.length > 0) {
//       result = result.filter((l) =>
//         fuelType.includes(l.fuelType || "Gasoline"),
//       );
//     }

//     if (transmission.length > 0) {
//       result = result.filter((l) =>
//         transmission.includes(l.transmission || "Automatic"),
//       );
//     }

//     if (minSeats !== null) {
//       result = result.filter((l) => (l.seats || 0) >= minSeats);
//     }

//     result = result.filter((l) => {
//       const price = l.listingType === "full" ? l.pricePerDay : l.pricePerSeat;
//       return (price ?? 0) <= maxPrice;
//     });

//     result = [...result].sort((a, b) => {
//       const priceA = a.listingType === "full" ? a.pricePerDay : a.pricePerSeat;
//       const priceB = b.listingType === "full" ? b.pricePerDay : b.pricePerSeat;

//       switch (sortBy) {
//         case "price-asc":
//           return (priceA ?? 0) - (priceB ?? 0);
//         case "price-desc":
//           return (priceB ?? 0) - (priceA ?? 0);
//         case "popularity":
//           return (b.views || 0) - (a.views || 0);
//         case "newest":
//         default:
//           return (
//             new Date(b.createdAt || 0).getTime() -
//             new Date(a.createdAt || 0).getTime()
//           );
//       }
//     });

//     setFilteredListings(result);
//   }, [
//     activeFilter,
//     searchQuery,
//     listings,
//     fuelType,
//     transmission,
//     minSeats,
//     maxPrice,
//     sortBy,
//   ]);

//   const clearAllAdvanced = () => {
//     setFuelType([]);
//     setTransmission([]);
//     setMinSeats(null);
//     setMaxPrice(100000);
//     setSortBy("newest");
//   };

//   const clearEverything = () => {
//     setSearchQuery("");
//     setActiveFilter("all");
//     clearAllAdvanced();
//   };

//   const activeAdvCount =
//     (fuelType.length || 0) +
//     (transmission.length || 0) +
//     (minSeats ? 1 : 0) +
//     (maxPrice < 100000 ? 1 : 0) +
//     (sortBy !== "newest" ? 1 : 0);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative">
//       <div className="absolute inset-0 bg-grid-white/[0.03] bg-[size:60px_60px] pointer-events-none" />
//       <Navbar />

//       <main className="max-w-7xl mx-auto px-6 pt-32 pb-24 relative z-10">
//         {/* ================= HEADER ================= */}
//         <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12 mb-16">
//           <div className="space-y-4">
//             <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.85]">
//               Asset <br />
//               <span className="text-cyan-400">Marketplace.</span>
//             </h1>
//             <p className="text-slate-300 font-medium max-w-sm">
//               Discover {filteredListings.length} premium vehicles and ride-share
//               opportunities.
//             </p>
//           </div>

//           {/* Search */}
//           <div className="w-full lg:w-[460px] p-1.5 bg-white/10 backdrop-blur-xl border border-white/20 rounded-[2rem] flex items-center shadow-2xl">
//             <div className="flex-1 relative">
//               <Search
//                 className="absolute left-6 top-1/2 -translate-y-1/2 text-cyan-400"
//                 size={20}
//               />
//               <input
//                 type="text"
//                 placeholder="Search by city, model or brand..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="w-full py-4 pl-16 pr-6 bg-transparent outline-none text-white font-bold placeholder:text-slate-400 text-sm"
//               />
//             </div>
//           </div>
//         </div>

//         {/* ================= FILTER BAR ================= */}
//         <div className="flex flex-wrap items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
//           <div className="flex p-1.5 bg-black/40 backdrop-blur-md rounded-[1.5rem] border border-white/10 shadow-inner">
//             {[
//               { id: "all", label: "All Listings", icon: LayoutGrid },
//               { id: "full", label: "Full Rentals", icon: Car },
//               { id: "seats", label: "Ride Shares", icon: Users },
//             ].map((tab) => (
//               <button
//                 key={tab.id}
//                 onClick={() => setActiveFilter(tab.id)}
//                 className={`flex items-center gap-2.5 px-8 py-3.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-300 ${
//                   activeFilter === tab.id
//                     ? "bg-white/20 text-cyan-400 shadow-xl border border-white/20"
//                     : "text-slate-400 hover:text-white"
//                 }`}
//               >
//                 <tab.icon size={14} />
//                 {tab.label}
//               </button>
//             ))}
//           </div>

//           <div className="flex flex-col sm:flex-row sm:items-end gap-4 sm:gap-6">
//             <div className="relative">
//               <select
//                 value={sortBy}
//                 onChange={(e) => setSortBy(e.target.value)}
//                 className="appearance-none bg-white/10 border border-white/20 rounded-2xl px-5 py-3 pr-11 text-[10px] font-black uppercase tracking-widest text-white outline-none hover:bg-white/15 transition-all"
//               >
//                 <option value="newest" className="bg-slate-900">
//                   Sort: Newest
//                 </option>
//                 <option value="price-asc" className="bg-slate-900">
//                   Price: Low to High
//                 </option>
//                 <option value="price-desc" className="bg-slate-900">
//                   Price: High to Low
//                 </option>
//                 <option value="popularity" className="bg-slate-900">
//                   Most Popular
//                 </option>
//               </select>
//               <ChevronDown
//                 className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan-400 pointer-events-none"
//                 size={16}
//               />
//             </div>

//             <button
//               onClick={() => setShowFilters(true)}
//               className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-cyan-400 text-slate-900 font-black text-[10px] uppercase tracking-widest hover:bg-cyan-300 transition-all"
//             >
//               <SlidersHorizontal size={14} />
//               Filters
//               {activeAdvCount > 0 && (
//                 <span className="w-5 h-5 rounded-full bg-slate-900 text-white flex items-center justify-center text-[9px]">
//                   {activeAdvCount}
//                 </span>
//               )}
//             </button>

//             <div className="text-right">
//               <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">
//                 Live Inventory
//               </p>
//               <p className="text-2xl font-black text-white">
//                 {filteredListings.length}{" "}
//                 <span className="text-slate-400 text-sm">Matches</span>
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* ================= ACTIVE FILTER CHIPS ================= */}
//         {(fuelType.length > 0 ||
//           transmission.length > 0 ||
//           minSeats !== null ||
//           maxPrice < 100000 ||
//           sortBy !== "newest") && (
//           <div className="flex flex-wrap gap-2 mb-10">
//             {fuelType.map((f) => (
//               <button
//                 key={f}
//                 onClick={() =>
//                   setFuelType((prev) => prev.filter((x) => x !== f))
//                 }
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 {f} <X size={12} />
//               </button>
//             ))}

//             {transmission.map((t) => (
//               <button
//                 key={t}
//                 onClick={() =>
//                   setTransmission((prev) => prev.filter((x) => x !== t))
//                 }
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 {t} <X size={12} />
//               </button>
//             ))}

//             {minSeats !== null && (
//               <button
//                 onClick={() => setMinSeats(null)}
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 Seats: {minSeats}+ <X size={12} />
//               </button>
//             )}

//             {maxPrice < 100000 && (
//               <button
//                 onClick={() => setMaxPrice(100000)}
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 Under Rs. {maxPrice} <X size={12} />
//               </button>
//             )}

//             {sortBy !== "newest" && (
//               <button
//                 onClick={() => setSortBy("newest")}
//                 className="px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:bg-white/15"
//               >
//                 Sorting On <X size={12} />
//               </button>
//             )}

//             <button
//               onClick={clearAllAdvanced}
//               className="ml-auto text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-white underline underline-offset-4"
//             >
//               Clear Advanced Filters
//             </button>
//           </div>
//         )}

//         {/* ================= GRID ================= */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {[...Array(6)].map((_, i) => (
//               <div
//                 key={i}
//                 className="h-[500px] bg-white/5 animate-pulse rounded-[3rem] border border-white/10"
//               />
//             ))}
//           </div>
//         ) : filteredListings.length === 0 ? (
//           <div className="flex flex-col items-center justify-center py-40 bg-white/5 rounded-[4rem] border border-dashed border-white/10">
//             <div className="w-24 h-24 bg-white/10 rounded-[2.5rem] flex items-center justify-center mb-6 text-cyan-400">
//               <Filter size={48} />
//             </div>
//             <h3 className="text-2xl font-black">No matching assets found</h3>
//             <p className="text-slate-400 mt-2">
//               Adjust your filters or try a different search term.
//             </p>

//             <button
//               onClick={clearEverything}
//               className="mt-8 px-8 py-3.5 rounded-2xl bg-white text-slate-900 font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-transform"
//             >
//               Reset All
//             </button>
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
//             {filteredListings.map((listing) => {
//               const isFull = listing.listingType === "full";

//               return (
//                 <div
//                   key={listing._id}
//                   className="group relative bg-white rounded-[3rem] hover:shadow-[0_0_40px_rgba(34,211,238,0.15)] transition-all duration-700 overflow-hidden flex flex-col shadow-2xl"
//                 >
//                   {/* Image */}
//                   <div className="relative h-64 overflow-hidden m-3 rounded-[2.5rem] bg-slate-100">
//                     <img
//                       src={
//                         listing.photos?.length
//                           ? listing.photos[0].startsWith("http")
//                             ? listing.photos[0]
//                             : `${BACKEND_URL}${listing.photos[0]}`
//                           : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000"
//                       }
//                       alt={listing.name}
//                       className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
//                     />

//                     <div className="absolute top-4 left-4 flex flex-col gap-2">
//                       <span
//                         className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 border border-white/20 ${
//                           isFull ? "bg-blue-600/90" : "bg-emerald-500/90"
//                         }`}
//                       >
//                         {isFull ? <Car size={12} /> : <Users size={12} />}
//                         {isFull ? "Premium Rental" : "Seat Share"}
//                       </span>

//                       {!isFull && (
//                         <div
//                           className={`w-fit px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 border shadow-lg
//                           ${
//                             Number(listing.availableSeats) === 0
//                               ? "bg-rose-600/90 text-white border-rose-400"
//                               : "bg-white/90 text-emerald-600 border-white/20"
//                           }`}
//                         >
//                           <Users size={12} />
//                           {Number(listing.availableSeats) === 0
//                             ? "Fully Booked"
//                             : `${listing.availableSeats} Seats Available`}
//                         </div>
//                       )}
//                     </div>

//                     {/* Compare Checkbox */}
//                     <div className="absolute top-4 right-4 z-20">
//                       <label className="flex items-center cursor-pointer gap-2 bg-black/40 backdrop-blur-md p-2 rounded-xl border border-white/10 hover:bg-black/60 transition group/check">
//                         <input
//                           type="checkbox"
//                           checked={selectedVehicles.some(
//                             (v) => v._id === listing._id,
//                           )}
//                           onChange={(e) => {
//                             e.stopPropagation();
//                             if (e.target.checked) {
//                               addToComparison(listing);
//                             } else {
//                               removeFromComparison(listing._id);
//                             }
//                           }}
//                           className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
//                         />
//                         <span className="text-[10px] uppercase font-bold text-white tracking-widest ml-1 opacity-0 group-hover/check:opacity-100 transition-opacity w-0 group-hover/check:w-auto overflow-hidden whitespace-nowrap">
//                           Compare
//                         </span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Content */}
//                   <div className="px-8 pb-8 pt-4 flex-1 flex flex-col justify-between text-slate-900">
//                     <div className="space-y-6">
//                       <div className="flex justify-between">
//                         <div>
//                           <p className="text-[10px] font-black text-blue-600 uppercase tracking-widest">
//                             {listing.brand || "Luxury"}
//                           </p>
//                           <h3 className="text-2xl font-black tracking-tighter">
//                             {listing.name}
//                           </h3>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-2xl font-black">
//                             <span className="text-blue-600">$</span>
//                             {isFull
//                               ? listing.pricePerDay
//                               : listing.pricePerSeat}
//                           </p>
//                           <p className="text-[9px] uppercase tracking-widest text-slate-400">
//                             /{isFull ? "day" : "seat"}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center gap-6 text-slate-400">
//                         <div className="flex items-center gap-2">
//                           <Gauge size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             {listing.transmission || "Auto"}
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <Users size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             {listing.seats || 5} Seats
//                           </span>
//                         </div>
//                         <div className="flex items-center gap-2">
//                           <ShieldCheck size={14} />
//                           <span className="text-[9px] font-black uppercase">
//                             Safe
//                           </span>
//                         </div>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() => navigate(`/listings/${listing._id}`)}
//                       className="w-full mt-10 py-5 bg-slate-900 hover:bg-black text-white font-black text-[11px] uppercase tracking-[0.2em] flex items-center justify-center gap-3 rounded-[1.75rem]"
//                     >
//                       View Experience
//                       <ChevronRight size={16} />
//                     </button>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </main>

//       {/* ================= FILTER DRAWER ================= */}
//       {showFilters && (
//         <div className="fixed inset-0 z-[120] flex justify-end">
//           <div
//             className="absolute inset-0 bg-black/60 backdrop-blur-sm"
//             onClick={() => setShowFilters(false)}
//           />
//           <div className="relative w-full max-w-md h-full bg-white text-slate-900 shadow-2xl overflow-hidden flex flex-col">
//             <div className="p-6 border-b border-slate-200 flex items-center justify-between">
//               <div>
//                 <h3 className="text-xl font-black">Advanced Filters</h3>
//                 <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
//                   Refine your results
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200"
//               >
//                 <X size={18} />
//               </button>
//             </div>

//             <div className="flex-1 overflow-y-auto p-6 space-y-10">
//               {/* Fuel Type */}
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
//                   <Fuel size={14} className="text-blue-600" />
//                   Fuel Type
//                 </p>
//                 <div className="grid grid-cols-2 gap-3">
//                   {["Electric", "Hybrid", "Diesel", "Gasoline"].map((t) => (
//                     <button
//                       key={t}
//                       onClick={() =>
//                         setFuelType((prev) =>
//                           prev.includes(t)
//                             ? prev.filter((x) => x !== t)
//                             : [...prev, t],
//                         )
//                       }
//                       className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
//                         fuelType.includes(t)
//                           ? "bg-blue-600 border-blue-600 text-white"
//                           : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
//                       }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Transmission */}
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
//                   <Gauge size={14} className="text-blue-600" />
//                   Transmission
//                 </p>
//                 <div className="grid grid-cols-2 gap-3">
//                   {["Automatic", "Manual"].map((t) => (
//                     <button
//                       key={t}
//                       onClick={() =>
//                         setTransmission((prev) =>
//                           prev.includes(t)
//                             ? prev.filter((x) => x !== t)
//                             : [...prev, t],
//                         )
//                       }
//                       className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${
//                         transmission.includes(t)
//                           ? "bg-blue-600 border-blue-600 text-white"
//                           : "bg-white border-slate-200 text-slate-500 hover:border-slate-400"
//                       }`}
//                     >
//                       {t}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Min Seats */}
//               <div className="space-y-4">
//                 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
//                   <Users size={14} className="text-blue-600" />
//                   Min Seats
//                 </p>
//                 <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 border border-slate-200">
//                   {[2, 4, 5, 7].map((n) => (
//                     <button
//                       key={n}
//                       onClick={() => setMinSeats(minSeats === n ? null : n)}
//                       className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${
//                         minSeats === n
//                           ? "bg-white text-blue-600 shadow-sm"
//                           : "text-slate-500"
//                       }`}
//                     >
//                       {n}+
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Price */}
//               <div className="space-y-4">
//                 <div className="flex items-center justify-between">
//                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//                     Max Price
//                   </p>
//                   <p className="text-sm font-black text-blue-600">
//                     Rs. {maxPrice}
//                   </p>
//                 </div>
//                 <input
//                   type="range"
//                   min="0"
//                   max="100000"
//                   step="1000"
//                   value={maxPrice}
//                   onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
//                   className="w-full accent-blue-600"
//                 />
//                 <div className="flex justify-between text-[10px] font-bold text-slate-400">
//                   <span>Rs. 0</span>
//                   <span>Rs. 100000</span>
//                 </div>
//               </div>
//             </div>

//             <div className="p-6 border-t border-slate-200 bg-white space-y-3">
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black text-[10px] uppercase tracking-widest hover:bg-black transition-all"
//               >
//                 Apply Filters
//               </button>

//               <button
//                 onClick={clearAllAdvanced}
//                 className="w-full py-3 rounded-2xl bg-slate-100 text-slate-700 font-black text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all"
//               >
//                 Clear Advanced Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <FloatingCompareBar />
//       <Footer />
//     </div>
//   );
// };

// export default AllListings;

// import React, { useEffect, useState } from "react";
// import {
//   Search,
//   Car,
//   Users,
//   LayoutGrid,
//   Gauge,
//   SlidersHorizontal,
//   X,
//   ChevronDown,
//   Fuel,
//   Check,
//   Calendar,
//   Sparkles,
//   MapPin,
// } from "lucide-react";
// import { useNavigate, useSearchParams } from "react-router-dom";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import api from "../../utils/api";
// import FloatingCompareBar from "../../components/FloatingCompareBar";
// import { useComparison } from "../../context/ComparisonContext";

// const BACKEND_URL = "http://localhost:5000";

// const AllListings = () => {
//   const [listings, setListings] = useState([]);
//   const [filteredListings, setFilteredListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Core filter states
//   const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'full', 'seats'
//   const [searchQuery, setSearchQuery] = useState("");
//   const [toQuery, setToQuery] = useState("");

//   const [showFilters, setShowFilters] = useState(false); // Mobile drawer state
//   const [fuelType, setFuelType] = useState([]);
//   const [transmission, setTransmission] = useState([]);
//   const [minSeats, setMinSeats] = useState(null);
//   const [maxPrice, setMaxPrice] = useState(100000);
//   const [sortBy, setSortBy] = useState("newest");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [onlyAvailable, setOnlyAvailable] = useState(false); // Availability toggle

//   const navigate = useNavigate();
//   const [searchParams] = useSearchParams();
//   const { selectedVehicles, addToComparison, removeFromComparison } =
//     useComparison();

//   // Load criteria from URL on mount
//   useEffect(() => {
//     const mode = searchParams.get("mode");
//     const search = searchParams.get("search");
//     const departure =
//       searchParams.get("departure") || searchParams.get("location") || "";
//     const destination = searchParams.get("destination");
//     const fuel = searchParams.get("fuelType");
//     const pass = searchParams.get("passengers") || searchParams.get("seats");
//     const category = searchParams.get("category");

//     if (mode) setActiveFilter(mode);
//     if (search) setSearchQuery(search);
//     else if (departure) setSearchQuery(departure);

//     if (destination) setToQuery(destination);
//     if (fuel) setFuelType([fuel]);
//     if (pass) setMinSeats(parseInt(pass, 10));
//     if (category) setCategoryFilter(category.toLowerCase());
//   }, [searchParams]);

//   // Fetch all listings
//   useEffect(() => {
//     const fetchListings = async () => {
//       try {
//         const res = await api.get("/listings");
//         const data = Array.isArray(res.data) ? res.data : [];
//         setListings(data);
//         setFilteredListings(data);
//       } catch (err) {
//         console.error("Error fetching listings:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchListings();
//   }, []);

//   // Multi-filter matching logic
//   useEffect(() => {
//     let result = listings;

//     // Filter by Service Type (All, Rental, Ride Share)
//     if (activeFilter !== "all") {
//       result = result.filter((l) => l.listingType === activeFilter);
//     }

//     // Filter by Category
//     if (categoryFilter) {
//       result = result.filter((l) => {
//         const cat = l.category?.toLowerCase() || "";
//         const fuel = l.fuelType?.toLowerCase() || "";
//         // "electric" category maps to fuelType === 'electric'
//         if (categoryFilter === "electric") return fuel === "electric";
//         return cat.includes(categoryFilter);
//       });
//     }

//     // Filter by Search Query
//     if (searchQuery) {
//       const q = searchQuery.toLowerCase();
//       result = result.filter(
//         (l) =>
//           l.name?.toLowerCase().includes(q) ||
//           l.brand?.toLowerCase().includes(q) ||
//           l.location?.toLowerCase().includes(q) ||
//           l.departure?.toLowerCase().includes(q),
//       );
//     }

//     // Filter by Destination
//     if (toQuery) {
//       const q = toQuery.toLowerCase();
//       result = result.filter((l) => l.destination?.toLowerCase().includes(q));
//     }

//     // Filter by Fuel Type
//     if (fuelType.length > 0) {
//       result = result.filter((l) =>
//         fuelType.includes(l.fuelType || "Gasoline"),
//       );
//     }

//     // Filter by Transmission
//     if (transmission.length > 0) {
//       result = result.filter((l) =>
//         transmission.includes(l.transmission || "Automatic"),
//       );
//     }

//     // Filter by Min Seats
//     if (minSeats !== null) {
//       result = result.filter((l) => {
//         const capacity =
//           l.listingType === "seats" ? l.availableSeats || 0 : l.seats || 0;
//         return Number(capacity) >= minSeats;
//       });
//     }

//     // Filter by Price Range
//     result = result.filter((l) => {
//       const price = l.listingType === "full" ? l.pricePerDay : l.pricePerSeat;
//       return (price ?? 0) <= maxPrice;
//     });

//     // Filter by Availability (Frontend only)
//     if (onlyAvailable) {
//       result = result.filter((l) => {
//         if (l.listingType === "seats") {
//           return Number(l.availableSeats || 0) > 0;
//         }
//         return true;
//       });
//     }

//     // Sort listings
//     result = [...result].sort((a, b) => {
//       const priceA = a.listingType === "full" ? a.pricePerDay : a.pricePerSeat;
//       const priceB = b.listingType === "full" ? b.pricePerDay : b.pricePerSeat;

//       switch (sortBy) {
//         case "price-asc":
//           return (priceA ?? 0) - (priceB ?? 0);
//         case "price-desc":
//           return (priceB ?? 0) - (priceA ?? 0);
//         case "popularity":
//           return (b.views || 0) - (a.views || 0);
//         case "newest":
//         default:
//           return (
//             new Date(b.createdAt || 0).getTime() -
//             new Date(a.createdAt || 0).getTime()
//           );
//       }
//     });

//     setFilteredListings(result);
//   }, [
//     activeFilter,
//     categoryFilter,
//     searchQuery,
//     toQuery,
//     listings,
//     fuelType,
//     transmission,
//     minSeats,
//     maxPrice,
//     sortBy,
//     onlyAvailable,
//   ]);

//   // Reset all criteria
//   const clearAllAdvanced = () => {
//     setSearchQuery("");
//     setToQuery("");
//     setFuelType([]);
//     setTransmission([]);
//     setMinSeats(null);
//     setMaxPrice(100000);
//     setSortBy("newest");
//     setCategoryFilter("");
//     setOnlyAvailable(false);
//   };

//   // Active filter count (excluding default parameters)
//   const activeAdvCount =
//     (fuelType.length || 0) +
//     (transmission.length || 0) +
//     (minSeats ? 1 : 0) +
//     (maxPrice < 100000 ? 1 : 0) +
//     (sortBy !== "newest" ? 1 : 0) +
//     (categoryFilter ? 1 : 0) +
//     (onlyAvailable ? 1 : 0);

//   // Sub-components to avoid duplicate JSX
//   const FilterControls = () => (
//     <div className="space-y-7">
//       {/* 1. Keyword Search */}
//       <div className="space-y-2.5">
//         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//           Keyword Search
//         </label>
//         <div className="relative group">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
//             size={16}
//           />
//           <input
//             type="text"
//             placeholder="e.g. Tesla, SUV, Pokhara..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full py-2.5 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 outline-none text-slate-950 text-xs font-semibold placeholder:text-slate-400 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-inner"
//           />
//         </div>
//       </div>

//       {/* 2. Service/Rental Type */}
//       <div className="space-y-2.5">
//         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//           Service Type
//         </label>
//         <div className="flex flex-col gap-1.5 p-1 bg-slate-50 border border-slate-200/80 rounded-2xl">
//           {[
//             { id: "all", label: "All Vehicles", icon: LayoutGrid },
//             { id: "full", label: "Premium Rentals", icon: Car },
//             { id: "seats", label: "Ride Shares", icon: Users },
//           ].map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveFilter(tab.id)}
//               className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
//                 activeFilter === tab.id
//                   ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm"
//                   : "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
//               }`}
//             >
//               <tab.icon
//                 size={14}
//                 className={
//                   activeFilter === tab.id ? "text-white" : "text-slate-400"
//                 }
//               />
//               <span>{tab.label}</span>
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 3. Categories / Vehicle Styles */}
//       <div className="space-y-2.5">
//         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//           Vehicle Category
//         </label>
//         <div className="flex flex-wrap gap-1.5">
//           {[
//             { id: "", label: "All Types" },
//             { id: "suv", label: "SUV" },
//             { id: "sedan", label: "Sedan" },
//             { id: "electric", label: "Electric" },
//             { id: "luxury", label: "Luxury" },
//             { id: "hatchback", label: "Hatchback" },
//           ].map((cat) => (
//             <button
//               key={cat.id}
//               onClick={() => setCategoryFilter(cat.id)}
//               className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-wider border transition-all duration-200 ${
//                 categoryFilter === cat.id
//                   ? "bg-slate-900 border-slate-900 text-white shadow-sm"
//                   : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"
//               }`}
//             >
//               {cat.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 4. Transmission */}
//       <div className="space-y-2.5">
//         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//           Transmission
//         </label>
//         <div className="grid grid-cols-2 gap-2">
//           {["Automatic", "Manual"].map((t) => {
//             const isChecked = transmission.includes(t);
//             return (
//               <button
//                 key={t}
//                 onClick={() =>
//                   setTransmission((prev) =>
//                     isChecked ? prev.filter((x) => x !== t) : [...prev, t],
//                   )
//                 }
//                 className={`px-3 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-between transition-all ${
//                   isChecked
//                     ? "bg-blue-50/60 border-blue-500/80 text-blue-700 shadow-sm shadow-blue-500/5 font-extrabold"
//                     : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
//                 }`}
//               >
//                 <span>{t}</span>
//                 {isChecked && (
//                   <Check size={12} className="text-blue-600 stroke-[3]" />
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 5. Fuel Type */}
//       <div className="space-y-2.5">
//         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
//           <Fuel size={12} className="text-slate-400" /> Fuel Profile
//         </label>
//         <div className="grid grid-cols-2 gap-2">
//           {["Electric", "Hybrid", "Diesel", "Gasoline"].map((t) => {
//             const isChecked = fuelType.includes(t);
//             return (
//               <button
//                 key={t}
//                 onClick={() =>
//                   setFuelType((prev) =>
//                     isChecked ? prev.filter((x) => x !== t) : [...prev, t],
//                   )
//                 }
//                 className={`px-3 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-between transition-all ${
//                   isChecked
//                     ? "bg-blue-50/60 border-blue-500/80 text-blue-700 shadow-sm shadow-blue-500/5 font-extrabold"
//                     : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
//                 }`}
//               >
//                 <span>{t}</span>
//                 {isChecked && (
//                   <Check size={12} className="text-blue-600 stroke-[3]" />
//                 )}
//               </button>
//             );
//           })}
//         </div>
//       </div>

//       {/* 6. Passenger Capacity */}
//       <div className="space-y-2.5">
//         <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
//           <Users size={12} className="text-slate-400" /> Passenger Capacity
//         </label>
//         <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-50 border border-slate-200/80">
//           {[2, 4, 5, 7].map((n) => (
//             <button
//               key={n}
//               onClick={() => setMinSeats(minSeats === n ? null : n)}
//               className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
//                 minSeats === n
//                   ? "bg-white text-blue-600 shadow-sm border border-slate-100 font-extrabold"
//                   : "text-slate-500 hover:text-slate-800"
//               }`}
//             >
//               {n}+
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* 7. Maximum Price Range */}
//       <div className="space-y-3 pt-1">
//         <div className="flex items-center justify-between">
//           <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
//             Price Budget
//           </label>
//           <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
//             Rs. {maxPrice.toLocaleString()}
//           </span>
//         </div>
//         <div className="px-1.5">
//           <input
//             type="range"
//             min="0"
//             max="100000"
//             step="1000"
//             value={maxPrice}
//             onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
//             className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
//           />
//           <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-2">
//             <span>Rs. 0</span>
//             <span>Rs. 100K</span>
//           </div>
//         </div>
//       </div>

//       {/* 8. Availability Switch */}
//       <div className="flex items-center justify-between pt-2 border-t border-slate-100">
//         <div className="space-y-0.5">
//           <p className="text-xs font-black text-slate-800 uppercase tracking-wider">
//             Available Only
//           </p>
//           <p className="text-[9px] font-medium text-slate-400 leading-tight">
//             Hide fully-booked ride shares
//           </p>
//         </div>
//         <label className="relative inline-flex items-center cursor-pointer">
//           <input
//             type="checkbox"
//             checked={onlyAvailable}
//             onChange={(e) => setOnlyAvailable(e.target.checked)}
//             className="sr-only peer"
//           />
//           <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
//         </label>
//       </div>

//       {/* 9. Reset Button */}
//       {activeAdvCount > 0 && (
//         <button
//           onClick={clearAllAdvanced}
//           className="w-full py-3 mt-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
//         >
//           Reset All Filters
//         </button>
//       )}
//     </div>
//   );

//   return (
//     <div className="min-h-screen bg-[#f5f7fb] text-slate-900 font-sans antialiased">
//       <Navbar />

//       <main className="max-w-[1600px] mx-auto px-3 sm:px-4 lg:px-6 pt-20 pb-20 relative z-10">
//         {/* ================= COMPACT HERO HEADER ================= */}
//         <div className="mb-5 pt-1">
//           <div className="max-w-3xl">
//             <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
//               Find Your Premium{" "}
//               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
//                 Ride.
//               </span>
//             </h1>
//             <p className="text-slate-500 font-medium text-xs mt-1">
//               Seamless premium rentals and verified shared commutes. Clean,
//               fast, and verified.
//             </p>
//           </div>
//         </div>

//         {/* ================= TWO COLUMN MARKETPLACE LAYOUT ================= */}
//         <div className="flex flex-col lg:flex-row gap-6 items-start">
//           {/* ================= FIXED LEFT SIDEBAR FILTERS (DESKTOP) ================= */}
//           <aside className="hidden lg:block w-64 shrink-0 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_24px_rgb(0,0,0,0.01)] rounded-2xl p-4 custom-scrollbar pr-2">
//             <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
//               <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
//                 <SlidersHorizontal size={14} className="text-blue-500" /> Filter
//                 Criteria
//               </h3>
//               {activeAdvCount > 0 && (
//                 <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-sm ring-2 ring-white">
//                   {activeAdvCount}
//                 </span>
//               )}
//             </div>
//             <FilterControls />
//           </aside>

//           {/* ================= MAIN CONTENT LISTINGS AREA ================= */}
//           <div className="flex-1 w-full space-y-6">
//             {/* COMPACT HORIZONTAL SEARCH + SORTING ROW */}
//             <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-2.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.015)] border border-slate-200/60 relative z-20">
//               {/* Compact Search Bar */}
//               <div className="flex-1 w-full relative group">
//                 <Search
//                   className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
//                   size={16}
//                 />
//                 <input
//                   type="text"
//                   placeholder="Search model, brand or location..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full py-2.5 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-100 outline-none text-slate-900 font-semibold placeholder:text-slate-400 focus:bg-white focus:border-blue-500/50 transition-all text-xs"
//                 />
//               </div>

//               <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
//                 {/* Sort dropdown */}
//                 <div className="relative flex-1 md:flex-none">
//                   <select
//                     value={sortBy}
//                     onChange={(e) => setSortBy(e.target.value)}
//                     className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-xl pl-4 pr-10 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 outline-none hover:bg-slate-100/80 focus:border-blue-500/50 transition-all cursor-pointer"
//                   >
//                     <option value="newest">Sort: Newest</option>
//                     <option value="price-asc">Price: Low to High</option>
//                     <option value="price-desc">Price: High to Low</option>
//                     <option value="popularity">Most Popular</option>
//                   </select>
//                   <ChevronDown
//                     className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                     size={12}
//                   />
//                 </div>

//                 {/* Mobile Filter Toggle Button */}
//                 <button
//                   onClick={() => setShowFilters(true)}
//                   className="lg:hidden relative flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider transition-all"
//                 >
//                   <SlidersHorizontal size={12} />
//                   <span>Filters</span>
//                   {activeAdvCount > 0 && (
//                     <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-black shadow-sm border border-white">
//                       {activeAdvCount}
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </div>

//             {/* LIVE INVENTORY & DISMISSIBLE ACTIVE CHIPS ROW */}
//             <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
//               <div className="flex items-center gap-2">
//                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
//                 <p className="text-xs font-bold text-slate-500">
//                   <span className="text-slate-900 font-extrabold">
//                     {filteredListings.length}
//                   </span>{" "}
//                   vehicles ready for bookings
//                 </p>
//               </div>

//               {/* Active Filter Chips */}
//               {(categoryFilter ||
//                 fuelType.length > 0 ||
//                 transmission.length > 0 ||
//                 minSeats !== null ||
//                 maxPrice < 100000 ||
//                 activeFilter !== "all" ||
//                 onlyAvailable) && (
//                 <div className="flex flex-wrap gap-1.5 items-center">
//                   {activeFilter !== "all" && (
//                     <button
//                       onClick={() => setActiveFilter("all")}
//                       className="px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-blue-600 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
//                     >
//                       Type: {activeFilter === "full" ? "Rental" : "Ride Share"}{" "}
//                       <X size={10} />
//                     </button>
//                   )}
//                   {categoryFilter && (
//                     <button
//                       onClick={() => setCategoryFilter("")}
//                       className="px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-blue-600 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
//                     >
//                       Cat: {categoryFilter} <X size={10} />
//                     </button>
//                   )}
//                   {fuelType.map((f) => (
//                     <button
//                       key={f}
//                       onClick={() =>
//                         setFuelType((prev) => prev.filter((x) => x !== f))
//                       }
//                       className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
//                     >
//                       {f} <X size={10} />
//                     </button>
//                   ))}
//                   {transmission.map((t) => (
//                     <button
//                       key={t}
//                       onClick={() =>
//                         setTransmission((prev) => prev.filter((x) => x !== t))
//                       }
//                       className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
//                     >
//                       {t} <X size={10} />
//                     </button>
//                   ))}
//                   {minSeats !== null && (
//                     <button
//                       onClick={() => setMinSeats(null)}
//                       className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
//                     >
//                       Seats: {minSeats}+ <X size={10} />
//                     </button>
//                   )}
//                   {maxPrice < 100000 && (
//                     <button
//                       onClick={() => setMaxPrice(100000)}
//                       className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
//                     >
//                       Max: Rs. {maxPrice.toLocaleString()} <X size={10} />
//                     </button>
//                   )}
//                   {onlyAvailable && (
//                     <button
//                       onClick={() => setOnlyAvailable(false)}
//                       className="px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-blue-600 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
//                     >
//                       Available Only <X size={10} />
//                     </button>
//                   )}
//                 </div>
//               )}
//             </div>

//             {/* ================= COMPACT CONTENT-DENSE LISTINGS GRID ================= */}
//             {loading ? (
//               <div className="flex justify-center items-center py-28">
//                 <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-blue-600"></div>
//               </div>
//             ) : filteredListings.length === 0 ? (
//               <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col items-center justify-center p-6">
//                 <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3 border border-slate-100">
//                   <Car size={20} />
//                 </div>
//                 <p className="text-slate-800 font-extrabold text-sm uppercase tracking-wide">
//                   No Matches Found
//                 </p>
//                 <p className="text-slate-400 text-xs mt-1 max-w-xs">
//                   We couldn't find any vehicles matching those parameters. Try
//                   clearing your filters or broadening your search criteria.
//                 </p>
//                 <button
//                   onClick={clearAllAdvanced}
//                   className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-lg"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             ) : (
//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {filteredListings.map((listing) => {
//                   const isFull = listing.listingType === "full";
//                   const isFullyBooked =
//                     !isFull && Number(listing.availableSeats || 0) === 0;

//                   return (
//                     <div
//                       key={listing._id}
//                       className="group relative bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_20px_rgba(0,0,0,0.015)] hover:border-slate-200/80 hover:shadow-[0_12px_32px_rgba(0,0,0,0.045)] transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
//                     >
//                       {/* Image block (Aspect ratio optimized) */}
//                       <div className="relative h-[165px] overflow-hidden bg-slate-100 w-full shrink-0">
//                         <img
//                           src={
//                             listing.photos?.length
//                               ? listing.photos[0].startsWith("http")
//                                 ? listing.photos[0]
//                                 : `${BACKEND_URL}${listing.photos[0]}`
//                               : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000"
//                           }
//                           alt={listing.name}
//                           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
//                         />

//                         {/* Dark Premium Gradient Image Overlay */}
//                         <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

//                         {/* Premium Compare Checkbox Overlay */}
//                         <div className="absolute top-2.5 right-2.5 z-20">
//                           <label className="flex items-center cursor-pointer bg-slate-900/65 backdrop-blur-md p-1.5 rounded-lg shadow-sm hover:shadow-md hover:bg-slate-900 border border-white/10 transition">
//                             <input
//                               type="checkbox"
//                               checked={selectedVehicles.some(
//                                 (v) => v._id === listing._id,
//                               )}
//                               onChange={(e) => {
//                                 e.stopPropagation();
//                                 e.target.checked
//                                   ? addToComparison(listing)
//                                   : removeFromComparison(listing._id);
//                               }}
//                               className="w-3.5 h-3.5 rounded border-slate-500/50 text-blue-600 focus:ring-blue-500/40 cursor-pointer accent-blue-600"
//                             />
//                           </label>
//                         </div>

//                         {/* Glassmorphic Badges */}
//                         <div className="absolute bottom-2.5 left-2.5 flex flex-wrap gap-1.5 pointer-events-none">
//                           <span className="px-2 py-0.5 rounded bg-slate-950/45 backdrop-blur-md border border-white/15 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
//                             {isFull ? <Car size={10} /> : <Users size={10} />}
//                             {isFull ? "Rental" : "Ride Share"}
//                           </span>
//                           {isFullyBooked && (
//                             <span className="px-2 py-0.5 rounded bg-rose-500/80 backdrop-blur-md border border-rose-500/45 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
//                               Fully Booked
//                             </span>
//                           )}
//                           {!isFull &&
//                             !isFullyBooked &&
//                             listing.availableSeats !== undefined && (
//                               <span className="px-2 py-0.5 rounded bg-cyan-600/80 backdrop-blur-md border border-cyan-500/30 text-white text-[9px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
//                                 {listing.availableSeats} Left
//                               </span>
//                             )}
//                         </div>
//                       </div>

//                       {/* Info Text Block */}
//                       <div className="p-4 flex flex-col flex-1 justify-between bg-white">
//                         <div className="space-y-1.5">
//                           <div className="flex items-start justify-between">
//                             <div className="min-w-0 flex-1">
//                               <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5 truncate">
//                                 {listing.brand || "Premium"}
//                               </p>
//                               <h3 className="text-base font-extrabold tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">
//                                 {listing.name}
//                               </h3>
//                             </div>
//                           </div>

//                           {/* Specific micro details */}
//                           <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-slate-400 uppercase tracking-wider">
//                             <span>{listing.transmission || "Auto"}</span>
//                             <span className="text-slate-300">•</span>
//                             <span>{listing.fuelType || "Gasoline"}</span>
//                             <span className="text-slate-300">•</span>
//                             <span>
//                               {listing.listingType === "seats"
//                                 ? `${listing.availableSeats || 0} seats available`
//                                 : `${listing.seats || 5} seats`}
//                             </span>
//                           </div>
//                         </div>

//                         {/* Location Details (if present) */}
//                         {(listing.location || listing.departure) && (
//                           <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 mt-2.5">
//                             <MapPin size={11} className="text-slate-400" />
//                             <span className="truncate">
//                               {listing.location || listing.departure}
//                             </span>
//                           </div>
//                         )}

//                         {/* Price & Action Row */}
//                         <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between gap-2">
//                           <div className="min-w-0">
//                             <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">
//                               Price
//                             </p>
//                             <div className="flex items-baseline gap-0.5">
//                               <span className="text-base font-extrabold text-slate-900 leading-none">
//                                 Rs.{" "}
//                                 {isFull
//                                   ? (listing.pricePerDay || 0).toLocaleString()
//                                   : (
//                                       listing.pricePerSeat || 0
//                                     ).toLocaleString()}
//                               </span>
//                               <span className="text-[9px] font-bold text-slate-400">
//                                 /{isFull ? "day" : "seat"}
//                               </span>
//                             </div>
//                           </div>

//                           <button
//                             onClick={() => navigate(`/listings/${listing._id}`)}
//                             className="px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white font-extrabold text-[9px] uppercase tracking-widest rounded-xl transition-all duration-300 shadow-sm hover:shadow-[0_0_12px_rgba(37,99,235,0.35)] active:scale-[0.98] shrink-0"
//                           >
//                             View Details
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )}
//           </div>
//         </div>
//       </main>

//       {/* ================= SLIDING DRAWER FILTERS (MOBILE ONLY) ================= */}
//       {showFilters && (
//         <div className="fixed inset-0 z-[120] flex justify-end">
//           {/* Backdrop */}
//           <div
//             className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
//             onClick={() => setShowFilters(false)}
//           />
//           {/* Slider Drawer Panel */}
//           <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-200">
//             {/* Header */}
//             <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
//               <div>
//                 <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
//                   <SlidersHorizontal size={14} className="text-blue-500" />{" "}
//                   Filter Criteria
//                 </h3>
//                 <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
//                   Refine Your Results
//                 </p>
//               </div>
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-800 transition-colors shadow-sm"
//               >
//                 <X size={14} />
//               </button>
//             </div>

//             {/* Scrollable Filters Content */}
//             <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
//               <FilterControls />
//             </div>

//             {/* Sticky bottom Action Bar */}
//             <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2 shrink-0">
//               <button
//                 onClick={() => setShowFilters(false)}
//                 className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] uppercase tracking-widest transition-all shadow-md shadow-blue-500/10 active:scale-95"
//               >
//                 Apply Criteria
//               </button>
//               {activeAdvCount > 0 && (
//                 <button
//                   onClick={() => {
//                     clearAllAdvanced();
//                     setShowFilters(false);
//                   }}
//                   className="py-3.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 transition-all"
//                 >
//                   Reset
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       )}

//       <FloatingCompareBar />
//       <Footer />
//     </div>
//   );
// };

// export default AllListings;

import React, { useEffect, useState } from "react";
import {
  Search,
  Car,
  Users,
  LayoutGrid,
  Gauge,
  SlidersHorizontal,
  X,
  ChevronDown,
  Fuel,
  Check,
  Calendar,
  Sparkles,
  MapPin,
  Zap,
  Gem,
} from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "../../utils/api";
import FloatingCompareBar from "../../components/FloatingCompareBar";
import { useComparison } from "../../context/ComparisonContext";

const BACKEND_URL = "http://localhost:5000";

const AllListings = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Core filter states
  const [activeFilter, setActiveFilter] = useState("all"); // 'all', 'full', 'seats'
  const [searchQuery, setSearchQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const [showFilters, setShowFilters] = useState(false); // Mobile drawer state
  const [fuelType, setFuelType] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [minSeats, setMinSeats] = useState(null);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("newest");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [onlyAvailable, setOnlyAvailable] = useState(false); // Availability toggle

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { selectedVehicles, addToComparison, removeFromComparison } =
    useComparison();

  // Load criteria from URL on mount
  useEffect(() => {
    const mode = searchParams.get("mode");
    const search = searchParams.get("search");
    const departure =
      searchParams.get("departure") || searchParams.get("location") || "";
    const destination = searchParams.get("destination");
    const fuel = searchParams.get("fuelType");
    const pass = searchParams.get("passengers") || searchParams.get("seats");
    const category = searchParams.get("category");

    if (mode) setActiveFilter(mode);
    if (search) setSearchQuery(search);
    else if (departure) setSearchQuery(departure);

    if (destination) setToQuery(destination);
    if (fuel) setFuelType([fuel]);
    if (pass) setMinSeats(parseInt(pass, 10));
    if (category) setCategoryFilter(category.toLowerCase());
  }, [searchParams]);

  // Fetch all listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        const data = Array.isArray(res.data) ? res.data : [];
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Multi-filter matching logic
  useEffect(() => {
    let result = listings;

    // Filter by Service Type (All, Rental, Ride Share)
    if (activeFilter !== "all") {
      result = result.filter((l) => l.listingType === activeFilter);
    }

    // Filter by Category
    if (categoryFilter) {
      result = result.filter((l) => {
        const cat = l.category?.toLowerCase() || "";
        const fuel = l.fuelType?.toLowerCase() || "";
        // "electric" category maps to fuelType === 'electric'
        if (categoryFilter === "electric") return fuel === "electric";
        return cat.includes(categoryFilter);
      });
    }

    // Filter by Search Query
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.brand?.toLowerCase().includes(q) ||
          l.location?.toLowerCase().includes(q) ||
          l.departure?.toLowerCase().includes(q),
      );
    }

    // Filter by Destination
    if (toQuery) {
      const q = toQuery.toLowerCase();
      result = result.filter((l) => l.destination?.toLowerCase().includes(q));
    }

    // Filter by Fuel Type
    if (fuelType.length > 0) {
      result = result.filter((l) =>
        fuelType.includes(l.fuelType || "Gasoline"),
      );
    }

    // Filter by Transmission
    if (transmission.length > 0) {
      result = result.filter((l) =>
        transmission.includes(l.transmission || "Automatic"),
      );
    }

    // Filter by Min Seats
    if (minSeats !== null) {
      result = result.filter((l) => {
        const capacity =
          l.listingType === "seats" ? l.availableSeats || 0 : l.seats || 0;
        return Number(capacity) >= minSeats;
      });
    }

    // Filter by Price Range
    result = result.filter((l) => {
      const price = l.listingType === "full" ? l.pricePerDay : l.pricePerSeat;
      return (price ?? 0) <= maxPrice;
    });

    // Filter by Availability (Frontend only)
    if (onlyAvailable) {
      result = result.filter((l) => {
        if (l.listingType === "seats") {
          return Number(l.availableSeats || 0) > 0;
        }
        return true;
      });
    }

    // Sort listings
    result = [...result].sort((a, b) => {
      const priceA = a.listingType === "full" ? a.pricePerDay : a.pricePerSeat;
      const priceB = b.listingType === "full" ? b.pricePerDay : b.pricePerSeat;

      switch (sortBy) {
        case "price-asc":
          return (priceA ?? 0) - (priceB ?? 0);
        case "price-desc":
          return (priceB ?? 0) - (priceA ?? 0);
        case "popularity":
          return (b.views || 0) - (a.views || 0);
        case "newest":
        default:
          return (
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime()
          );
      }
    });

    setFilteredListings(result);
  }, [
    activeFilter,
    categoryFilter,
    searchQuery,
    toQuery,
    listings,
    fuelType,
    transmission,
    minSeats,
    maxPrice,
    sortBy,
    onlyAvailable,
  ]);

  // Reset all criteria
  const clearAllAdvanced = () => {
    setSearchQuery("");
    setToQuery("");
    setFuelType([]);
    setTransmission([]);
    setMinSeats(null);
    setMaxPrice(100000);
    setSortBy("newest");
    setCategoryFilter("");
    setOnlyAvailable(false);
  };

  // Active filter count (excluding default parameters)
  const activeAdvCount =
    (fuelType.length || 0) +
    (transmission.length || 0) +
    (minSeats ? 1 : 0) +
    (maxPrice < 100000 ? 1 : 0) +
    (sortBy !== "newest" ? 1 : 0) +
    (categoryFilter ? 1 : 0) +
    (onlyAvailable ? 1 : 0);

  // Sub-components to avoid duplicate JSX
  const FilterControls = () => (
    <div className="space-y-7">
      {/* 1. Keyword Search */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Keyword Search
        </label>
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
            size={16}
          />
          <input
            type="text"
            placeholder="e.g. Tesla, SUV, Pokhara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-2.5 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-200 outline-none text-slate-950 text-xs font-semibold placeholder:text-slate-400 focus:border-blue-500/80 focus:ring-4 focus:ring-blue-500/5 transition-all shadow-inner"
          />
        </div>
      </div>

      {/* 2. Service/Rental Type */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Service Type
        </label>
        <div className="flex flex-col gap-1.5 p-1 bg-slate-50 border border-slate-200/80 rounded-2xl">
          {[
            { id: "all", label: "All Vehicles", icon: LayoutGrid },
            { id: "full", label: "Premium Rentals", icon: Car },
            { id: "seats", label: "Ride Shares", icon: Users },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveFilter(tab.id)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all duration-200 ${
                activeFilter === tab.id
                  ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-sm"
                  : "bg-transparent text-slate-500 hover:text-slate-800 hover:bg-slate-100"
              }`}
            >
              <tab.icon
                size={14}
                className={
                  activeFilter === tab.id ? "text-white" : "text-slate-400"
                }
              />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 4. Transmission */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
          Transmission
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["Automatic", "Manual"].map((t) => {
            const isChecked = transmission.includes(t);
            return (
              <button
                key={t}
                onClick={() =>
                  setTransmission((prev) =>
                    isChecked ? prev.filter((x) => x !== t) : [...prev, t],
                  )
                }
                className={`px-3 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-between transition-all ${
                  isChecked
                    ? "bg-blue-50/60 border-blue-500/80 text-blue-700 shadow-sm shadow-blue-500/5 font-extrabold"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <span>{t}</span>
                {isChecked && (
                  <Check size={12} className="text-blue-600 stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Fuel Type */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <Fuel size={12} className="text-slate-400" /> Fuel Profile
        </label>
        <div className="grid grid-cols-2 gap-2">
          {["Electric", "Hybrid", "Diesel", "Gasoline"].map((t) => {
            const isChecked = fuelType.includes(t);
            return (
              <button
                key={t}
                onClick={() =>
                  setFuelType((prev) =>
                    isChecked ? prev.filter((x) => x !== t) : [...prev, t],
                  )
                }
                className={`px-3 py-2.5 rounded-xl border text-[10px] font-black uppercase tracking-wider flex items-center justify-between transition-all ${
                  isChecked
                    ? "bg-blue-50/60 border-blue-500/80 text-blue-700 shadow-sm shadow-blue-500/5 font-extrabold"
                    : "bg-white border-slate-200 text-slate-500 hover:border-slate-300"
                }`}
              >
                <span>{t}</span>
                {isChecked && (
                  <Check size={12} className="text-blue-600 stroke-[3]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. Passenger Capacity */}
      <div className="space-y-2.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
          <Users size={12} className="text-slate-400" /> Passenger Capacity
        </label>
        <div className="flex items-center gap-1 p-1 rounded-2xl bg-slate-50 border border-slate-200/80">
          {[2, 4, 5, 7].map((n) => (
            <button
              key={n}
              onClick={() => setMinSeats(minSeats === n ? null : n)}
              className={`flex-1 py-2 rounded-xl text-xs font-black transition-all ${
                minSeats === n
                  ? "bg-white text-blue-600 shadow-sm border border-slate-100 font-extrabold"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {n}+
            </button>
          ))}
        </div>
      </div>

      {/* 7. Maximum Price Range */}
      <div className="space-y-3 pt-1">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
            Price Budget
          </label>
          <span className="text-[11px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
            Rs. {maxPrice.toLocaleString()}
          </span>
        </div>
        <div className="px-1.5">
          <input
            type="range"
            min="0"
            max="100000"
            step="1000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
            className="w-full accent-blue-600 h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-[9px] font-bold text-slate-400 mt-2">
            <span>Rs. 0</span>
            <span>Rs. 100K</span>
          </div>
        </div>
      </div>

      {/* 8. Availability Switch */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-100">
        <div className="space-y-0.5">
          <p className="text-xs font-black text-slate-800 uppercase tracking-wider">
            Available Only
          </p>
          <p className="text-[9px] font-medium text-slate-400 leading-tight">
            Hide fully-booked ride shares
          </p>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={onlyAvailable}
            onChange={(e) => setOnlyAvailable(e.target.checked)}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* 9. Reset Button */}
      {activeAdvCount > 0 && (
        <button
          onClick={clearAllAdvanced}
          className="w-full py-3 mt-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-slate-800 transition-colors shadow-sm"
        >
          Reset All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 font-sans antialiased">
      <Navbar />

      {/* ================= FULL WIDTH CATEGORY TAB BAR ================= */}
      <div className="mt-[76px] bg-white border-b border-slate-200/60 shadow-[0_4px_20px_rgb(0,0,0,0.015)] overflow-x-auto custom-scrollbar no-scrollbar flex items-center relative z-40">
        <div className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 w-full pt-3 pb-3">
          <div className="flex items-center justify-between w-full min-w-max md:min-w-full gap-4">
            {[
              { id: "", label: "All", icon: LayoutGrid },
              { id: "suv", label: "SUV", icon: Car },
              { id: "sedan", label: "Sedan", icon: Car },
              { id: "electric", label: "Electric", icon: Zap },
              { id: "luxury", label: "Luxury", icon: Gem },
              { id: "hatchback", label: "Hatchback", icon: Car },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={`flex items-center justify-center flex-1 min-w-[110px] gap-2 px-5 py-2.5 rounded-full font-bold text-xs uppercase tracking-wider transition-all duration-300 ${
                  categoryFilter === cat.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md shadow-blue-500/20"
                    : "bg-transparent text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <cat.icon
                  size={16}
                  className={
                    categoryFilter === cat.id ? "text-white" : "opacity-80"
                  }
                />
                <span className="whitespace-nowrap">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-[1600px] mx-auto px-6 sm:px-8 md:px-10 lg:px-12 pt-8 pb-20 relative z-10">
        {/* ================= COMPACT HERO HEADER ================= */}
        {/* <div className="mb-6">
          <div className="max-w-3xl">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-slate-900 leading-none">
              Find Your Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Ride.</span>
            </h1>
            <p className="text-slate-500 font-medium text-xs mt-1.5">
              Seamless premium rentals and verified shared commutes. Clean, fast, and verified.
            </p>
          </div>
        </div> */}

        {/* ================= TWO COLUMN MARKETPLACE LAYOUT ================= */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* ================= FIXED LEFT SIDEBAR FILTERS (DESKTOP) ================= */}
          <aside className="hidden lg:block w-80 shrink-0 sticky top-24 self-start max-h-[calc(100vh-120px)] overflow-y-auto bg-white/95 backdrop-blur-md border border-slate-200/50 shadow-[0_4px_24px_rgb(0,0,0,0.01)] rounded-2xl p-5 custom-scrollbar pr-2">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <SlidersHorizontal size={14} className="text-blue-500" /> Filter
                Criteria
              </h3>
              {activeAdvCount > 0 && (
                <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-sm ring-2 ring-white">
                  {activeAdvCount}
                </span>
              )}
            </div>
            <FilterControls />
          </aside>

          {/* ================= MAIN CONTENT LISTINGS AREA ================= */}
          <div className="flex-1 w-full space-y-6">
            {/* COMPACT HORIZONTAL SEARCH + SORTING ROW */}
            <div className="flex flex-col md:flex-row items-center gap-3 bg-white p-2.5 rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.015)] border border-slate-200/60 relative z-20">
              {/* Compact Search Bar */}
              <div className="flex-1 w-full md:max-w-md relative group">
                <Search
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search model, brand or location..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2.5 pl-11 pr-4 bg-slate-50 rounded-xl border border-slate-100 outline-none text-slate-900 font-semibold placeholder:text-slate-400 focus:bg-white focus:border-blue-500/50 transition-all text-xs"
                />
              </div>

              <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
                {/* Sort dropdown */}
                <div className="relative flex-1 md:flex-none">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-slate-50 border border-slate-100 rounded-xl pl-4 pr-10 py-2.5 text-[10px] font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 outline-none hover:bg-slate-100/80 focus:border-blue-500/50 transition-all cursor-pointer"
                  >
                    <option value="newest">Sort: Newest</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="popularity">Most Popular</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={12}
                  />
                </div>

                {/* Mobile Filter Toggle Button */}
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden relative flex-1 md:flex-none inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-[10px] uppercase tracking-wider transition-all"
                >
                  <SlidersHorizontal size={12} />
                  <span>Filters</span>
                  {activeAdvCount > 0 && (
                    <span className="w-4 h-4 rounded-full bg-blue-500 text-white flex items-center justify-center text-[9px] font-black shadow-sm border border-white">
                      {activeAdvCount}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* LIVE INVENTORY & DISMISSIBLE ACTIVE CHIPS ROW */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <p className="text-xs font-bold text-slate-500">
                  <span className="text-slate-900 font-extrabold">
                    {filteredListings.length}
                  </span>{" "}
                  vehicles ready for bookings
                </p>
              </div>

              {/* Active Filter Chips */}
              {(categoryFilter ||
                fuelType.length > 0 ||
                transmission.length > 0 ||
                minSeats !== null ||
                maxPrice < 100000 ||
                activeFilter !== "all" ||
                onlyAvailable) && (
                <div className="flex flex-wrap gap-1.5 items-center">
                  {activeFilter !== "all" && (
                    <button
                      onClick={() => setActiveFilter("all")}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-blue-600 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Type: {activeFilter === "full" ? "Rental" : "Ride Share"}{" "}
                      <X size={10} />
                    </button>
                  )}
                  {categoryFilter && (
                    <button
                      onClick={() => setCategoryFilter("")}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-blue-600 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Cat: {categoryFilter} <X size={10} />
                    </button>
                  )}
                  {fuelType.map((f) => (
                    <button
                      key={f}
                      onClick={() =>
                        setFuelType((prev) => prev.filter((x) => x !== f))
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      {f} <X size={10} />
                    </button>
                  ))}
                  {transmission.map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setTransmission((prev) => prev.filter((x) => x !== t))
                      }
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      {t} <X size={10} />
                    </button>
                  ))}
                  {minSeats !== null && (
                    <button
                      onClick={() => setMinSeats(null)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Seats: {minSeats}+ <X size={10} />
                    </button>
                  )}
                  {maxPrice < 100000 && (
                    <button
                      onClick={() => setMaxPrice(100000)}
                      className="px-2.5 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-slate-500 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Max: Rs. {maxPrice.toLocaleString()} <X size={10} />
                    </button>
                  )}
                  {onlyAvailable && (
                    <button
                      onClick={() => setOnlyAvailable(false)}
                      className="px-2.5 py-1.5 rounded-lg bg-blue-50/80 border border-blue-100 hover:border-rose-200 hover:bg-rose-50 text-[9px] font-bold uppercase text-blue-600 hover:text-rose-600 tracking-wider flex items-center gap-1.5 transition-all"
                    >
                      Available Only <X size={10} />
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* ================= COMPACT CONTENT-DENSE LISTINGS GRID ================= */}
            {loading ? (
              <div className="flex justify-center items-center py-28">
                <div className="animate-spin rounded-full h-9 w-9 border-b-2 border-blue-600"></div>
              </div>
            ) : filteredListings.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200/60 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col items-center justify-center p-6">
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mb-3 border border-slate-100">
                  <Car size={20} />
                </div>
                <p className="text-slate-800 font-extrabold text-sm uppercase tracking-wide">
                  No Matches Found
                </p>
                <p className="text-slate-400 text-xs mt-1 max-w-xs">
                  We couldn't find any vehicles matching those parameters. Try
                  clearing your filters or broadening your search criteria.
                </p>
                <button
                  onClick={clearAllAdvanced}
                  className="mt-5 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-[10px] uppercase tracking-widest rounded-xl transition-all shadow-md shadow-blue-500/10 hover:shadow-lg"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-x-2 gap-y-5">
                {filteredListings.map((listing) => {
                  const isFull = listing.listingType === "full";
                  const isFullyBooked =
                    !isFull && Number(listing.availableSeats || 0) === 0;

                  return (
                    <div
                      key={listing._id}
                      className="group relative max-w-[240px] w-full mx-auto bg-white rounded-2xl border border-slate-100/90 shadow-[0_4px_16px_rgba(0,0,0,0.012)] hover:border-slate-200/80 hover:shadow-[0_10px_28px_rgba(0,0,0,0.04)] transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                    >
                      {/* Image block (Aspect ratio optimized) */}
                      <div className="relative h-[155px] overflow-hidden bg-slate-100 w-full shrink-0">
                        <img
                          src={
                            listing.photos?.length
                              ? listing.photos[0].startsWith("http")
                                ? listing.photos[0]
                                : `${BACKEND_URL}${listing.photos[0]}`
                              : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000"
                          }
                          alt={listing.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                        />

                        {/* Dark Premium Gradient Image Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/15 to-transparent pointer-events-none" />

                        {/* Premium Compare Checkbox Overlay */}
                        <div className="absolute top-2 right-2 z-20">
                          <label className="flex items-center cursor-pointer bg-slate-900/65 backdrop-blur-md p-1.5 rounded-lg shadow-sm hover:shadow-md hover:bg-slate-900 border border-white/10 transition">
                            <input
                              type="checkbox"
                              checked={selectedVehicles.some(
                                (v) => v._id === listing._id,
                              )}
                              onChange={(e) => {
                                e.stopPropagation();
                                e.target.checked
                                  ? addToComparison(listing)
                                  : removeFromComparison(listing._id);
                              }}
                              className="w-3.5 h-3.5 rounded border-slate-500/50 text-blue-600 focus:ring-blue-500/40 cursor-pointer accent-blue-600"
                            />
                          </label>
                        </div>

                        {/* Glassmorphic Badges */}
                        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1 pointer-events-none">
                          <span className="px-1.5 py-0.5 rounded bg-slate-950/45 backdrop-blur-md border border-white/15 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                            {isFull ? <Car size={9} /> : <Users size={9} />}
                            {isFull ? "Rental" : "Ride Share"}
                          </span>
                          {isFullyBooked && (
                            <span className="px-1.5 py-0.5 rounded bg-rose-500/80 backdrop-blur-md border border-rose-500/45 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                              Fully Booked
                            </span>
                          )}
                          {!isFull &&
                            !isFullyBooked &&
                            listing.availableSeats !== undefined && (
                              <span className="px-1.5 py-0.5 rounded bg-cyan-600/80 backdrop-blur-md border border-cyan-500/30 text-white text-[8px] font-black uppercase tracking-widest flex items-center gap-1 shadow-sm">
                                {listing.availableSeats} Left
                              </span>
                            )}
                        </div>
                      </div>

                      {/* Info Text Block */}
                      <div className="p-4 flex flex-col flex-1 justify-between bg-white">
                        <div className="space-y-1.5">
                          <div className="flex items-start justify-between">
                            <div className="min-w-0 flex-1">
                              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-0.5 truncate">
                                {listing.brand || "Premium"}
                              </p>
                              <h3 className="text-sm font-black tracking-tight text-slate-800 group-hover:text-blue-600 transition-colors line-clamp-1 leading-tight">
                                {listing.name}
                              </h3>
                            </div>
                          </div>

                          {/* Specific micro details */}
                          <div className="flex items-center gap-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            <span>{listing.transmission || "Auto"}</span>
                            <span className="text-slate-300">•</span>
                            <span>{listing.fuelType || "Gasoline"}</span>
                            <span className="text-slate-300">•</span>
                            <span>
                              {listing.listingType === "seats"
                                ? `${listing.availableSeats || 0} seats left`
                                : `${listing.seats || 5} seats`}
                            </span>
                          </div>
                        </div>

                        {/* Location Details (if present) */}
                        {(listing.location || listing.departure) && (
                          <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-500 mt-2">
                            <MapPin size={10} className="text-slate-400" />
                            <span className="truncate">
                              {listing.location || listing.departure}
                            </span>
                          </div>
                        )}

                        {/* Price & Action Row */}
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-1.5">
                          <div className="min-w-0">
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-0.5">
                              Price
                            </p>
                            <div className="flex items-baseline gap-0.5">
                              <span className="text-base font-black text-slate-900 leading-none">
                                Rs.{" "}
                                {isFull
                                  ? (listing.pricePerDay || 0).toLocaleString()
                                  : (
                                      listing.pricePerSeat || 0
                                    ).toLocaleString()}
                              </span>
                              <span className="text-xs font-bold text-slate-400">
                                /{isFull ? "day" : "seat"}
                              </span>
                            </div>
                          </div>

                          <button
                            onClick={() => navigate(`/listings/${listing._id}`)}
                            className="px-2.5 py-1.5 bg-slate-900 hover:bg-blue-600 text-white font-black text-[10px] uppercase tracking-wider rounded-lg transition-all duration-300 shadow-sm hover:shadow-[0_0_8px_rgba(37,99,235,0.25)] active:scale-[0.98] shrink-0"
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* ================= SLIDING DRAWER FILTERS (MOBILE ONLY) ================= */}
      {showFilters && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowFilters(false)}
          />
          {/* Slider Drawer Panel */}
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right duration-200">
            {/* Header */}
            <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
              <div>
                <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-1.5">
                  <SlidersHorizontal size={14} className="text-blue-500" />{" "}
                  Filter Criteria
                </h3>
                <p className="text-[8px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">
                  Refine Your Results
                </p>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-400 hover:text-slate-800 transition-colors shadow-sm"
              >
                <X size={14} />
              </button>
            </div>

            {/* Scrollable Filters Content */}
            <div className="flex-1 overflow-y-auto p-5 scrollbar-thin">
              <FilterControls />
            </div>

            {/* Sticky bottom Action Bar */}
            <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex gap-2 shrink-0">
              <button
                onClick={() => setShowFilters(false)}
                className="flex-1 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-[10px] uppercase tracking-widest transition-all shadow-md shadow-blue-500/10 active:scale-95"
              >
                Apply Criteria
              </button>
              {activeAdvCount > 0 && (
                <button
                  onClick={() => {
                    clearAllAdvanced();
                    setShowFilters(false);
                  }}
                  className="py-3.5 px-4 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 text-[10px] font-extrabold uppercase tracking-widest text-slate-500 transition-all"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      <FloatingCompareBar />
      <Footer />
    </div>
  );
};

export default AllListings;
