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

import React, { useEffect, useState } from "react";
import {
  Search,
  Car,
  Users,
  LayoutGrid,
  Gauge,
  MapPin,
  ChevronRight,
  ShieldCheck,
  SlidersHorizontal,
  X,
  ChevronDown,
  Fuel,
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

  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [toQuery, setToQuery] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [fuelType, setFuelType] = useState([]);
  const [transmission, setTransmission] = useState([]);
  const [minSeats, setMinSeats] = useState(null);
  const [maxPrice, setMaxPrice] = useState(100000);
  const [sortBy, setSortBy] = useState("newest");

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

    if (mode) setActiveFilter(mode);
    if (search) setSearchQuery(search);
    else if (departure) setSearchQuery(departure);

    if (destination) setToQuery(destination);
    if (fuel) setFuelType([fuel]);
    if (pass) setMinSeats(parseInt(pass, 10));

    // Note: Trip-specific date filtering for seats could be added to the state logic
    // but the current AllListings state doesn't have a specific global 'travelDate' filter,
    // so we apply general filters for now.
  }, [searchParams]);

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

  useEffect(() => {
    let result = listings;

    if (activeFilter !== "all") {
      result = result.filter((l) => l.listingType === activeFilter);
    }

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

    if (toQuery) {
      const q = toQuery.toLowerCase();
      result = result.filter((l) => l.destination?.toLowerCase().includes(q));
    }

    if (fuelType.length > 0) {
      result = result.filter((l) =>
        fuelType.includes(l.fuelType || "Gasoline"),
      );
    }

    if (transmission.length > 0) {
      result = result.filter((l) =>
        transmission.includes(l.transmission || "Automatic"),
      );
    }

    if (minSeats !== null) {
      result = result.filter((l) => {
        const capacity =
          l.listingType === "seats" ? l.availableSeats || 0 : l.seats || 0;
        return Number(capacity) >= minSeats;
      });
    }

    result = result.filter((l) => {
      const price = l.listingType === "full" ? l.pricePerDay : l.pricePerSeat;
      return (price ?? 0) <= maxPrice;
    });

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
    searchQuery,
    toQuery,
    listings,
    fuelType,
    transmission,
    minSeats,
    maxPrice,
    sortBy,
  ]);

  const clearAllAdvanced = () => {
    setSearchQuery("");
    setToQuery("");
    setFuelType([]);
    setTransmission([]);
    setMinSeats(null);
    setMaxPrice(100000);
    setSortBy("newest");
  };

  const activeAdvCount =
    (fuelType.length || 0) +
    (transmission.length || 0) +
    (minSeats ? 1 : 0) +
    (maxPrice < 100000 ? 1 : 0) +
    (sortBy !== "newest" ? 1 : 0);

  return (
    <div className="min-h-screen bg-[#f5f7fb] text-slate-900 font-sans">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-24 relative z-10">
        {/* ================= HEADER & SEARCH ROW ================= */}
        <div className="flex flex-col mb-10 space-y-8">
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900">
              Find Your Perfect{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                Ride.
              </span>
            </h1>
            <p className="text-slate-500 font-medium max-w-xl text-lg relative z-10">
              The premier marketplace connecting you with luxury vehicles and
              exclusive ride-shares.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center justify-between gap-4 bg-white p-3 rounded-3xl shadow-sm border border-slate-200/60 relative z-20">
            {/* Search Input */}
            <div className="flex-1 w-full relative group">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors"
                size={20}
              />
              <input
                type="text"
                placeholder="Search by city, model or brand..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full py-4 pl-16 pr-6 bg-slate-50 rounded-full border border-slate-200 outline-none text-slate-900 font-medium placeholder:text-slate-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm shadow-inner"
              />
            </div>

            <div className="flex items-center gap-3 w-full lg:w-auto">
              {/* Sort By */}
              <div className="relative flex-1 lg:flex-none">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full appearance-none bg-slate-50 border border-slate-200 rounded-full px-6 py-4 pr-12 text-xs font-bold uppercase tracking-widest text-slate-500 outline-none hover:bg-slate-100 focus:border-blue-500 transition-all cursor-pointer shadow-sm"
                >
                  <option value="newest">Sort: Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="popularity">Most Popular</option>
                </select>
                <ChevronDown
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={16}
                />
              </div>

              {/* Advanced Filters Button */}
              <button
                onClick={() => setShowFilters(true)}
                className="relative flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-slate-900 text-white font-bold text-xs uppercase tracking-widest hover:bg-slate-800 transition-all shadow-md hover:shadow-lg hover:scale-105 active:scale-95"
              >
                <SlidersHorizontal size={14} />
                Filters
                {activeAdvCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-500 text-white flex items-center justify-center text-[10px] font-black shadow-sm ring-2 ring-white">
                    {activeAdvCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* ================= PILL FILTER TABS ================= */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-12 border-b border-slate-200/60 pb-8">
          <div className="flex gap-2 bg-slate-100/50 p-1.5 rounded-full border border-slate-200 overflow-x-auto w-full md:w-auto hide-scrollbar">
            {[
              { id: "all", label: "All Listings", icon: LayoutGrid },
              { id: "full", label: "Premium Rentals", icon: Car },
              { id: "seats", label: "Ride Shares", icon: Users },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap px-6 py-3 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 ${
                  activeFilter === tab.id
                    ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-md scale-105"
                    : "bg-transparent text-slate-500 border border-transparent hover:bg-white hover:border-slate-200 hover:text-slate-900 hover:shadow-sm"
                }`}
              >
                <tab.icon
                  size={16}
                  className={
                    activeFilter === tab.id ? "text-white" : "text-slate-400"
                  }
                />
                {tab.label}
              </button>
            ))}
          </div>

          <div className="hidden md:block text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              Live Inventory
            </p>
            <p className="text-2xl font-black text-slate-900 leading-none">
              {filteredListings.length}{" "}
              <span className="text-slate-500 text-sm font-semibold">
                Ready
              </span>
            </p>
          </div>
        </div>

        {/* ================= ACTIVE FILTER CHIPS ================= */}
        {(fuelType.length > 0 ||
          transmission.length > 0 ||
          minSeats !== null ||
          maxPrice < 100000 ||
          sortBy !== "newest") && (
          <div className="flex flex-wrap gap-2 mb-10">
            {toQuery && (
              <button
                onClick={() => setToQuery("")}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:bg-rose-50 text-[10px] font-bold uppercase text-slate-600 hover:text-rose-600 tracking-widest flex items-center gap-2 transition-all"
              >
                Destination: {toQuery} <X size={12} />
              </button>
            )}
            {fuelType.map((f) => (
              <button
                key={f}
                onClick={() =>
                  setFuelType((prev) => prev.filter((x) => x !== f))
                }
                className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:bg-rose-50 text-[10px] font-bold uppercase text-slate-600 hover:text-rose-600 tracking-widest flex items-center gap-2 transition-all"
              >
                {f} <X size={12} />
              </button>
            ))}
            {transmission.map((t) => (
              <button
                key={t}
                onClick={() =>
                  setTransmission((prev) => prev.filter((x) => x !== t))
                }
                className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:bg-rose-50 text-[10px] font-bold uppercase text-slate-600 hover:text-rose-600 tracking-widest flex items-center gap-2 transition-all"
              >
                {t} <X size={12} />
              </button>
            ))}
            {minSeats !== null && (
              <button
                onClick={() => setMinSeats(null)}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:bg-rose-50 text-[10px] font-bold uppercase text-slate-600 hover:text-rose-600 tracking-widest flex items-center gap-2 transition-all"
              >
                Seats: {minSeats}+ <X size={12} />
              </button>
            )}
            {maxPrice < 100000 && (
              <button
                onClick={() => setMaxPrice(100000)}
                className="px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm hover:border-rose-300 hover:bg-rose-50 text-[10px] font-bold uppercase text-slate-600 hover:text-rose-600 tracking-widest flex items-center gap-2 transition-all"
              >
                Under Rs. {maxPrice} <X size={12} />
              </button>
            )}
          </div>
        )}

        {/* ================= GRID LISTINGS ================= */}
        {loading ? (
          <div className="flex justify-center items-center py-32">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-32 bg-white rounded-3xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 font-medium text-lg">
              No vehicles found matching your criteria.
            </p>
            <button
              onClick={clearAllAdvanced}
              className="mt-4 text-blue-600 font-bold hover:text-blue-700 underline underline-offset-4"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {filteredListings.map((listing) => {
              const isFull = listing.listingType === "full";

              return (
                <div
                  key={listing._id}
                  className="group relative bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-200 hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] transition-all duration-300 overflow-hidden flex flex-col hover:-translate-y-1"
                >
                  {/* Image Block */}
                  <div className="relative h-[220px] overflow-hidden bg-slate-100">
                    <img
                      src={
                        listing.photos?.length
                          ? listing.photos[0].startsWith("http")
                            ? listing.photos[0]
                            : `${BACKEND_URL}${listing.photos[0]}`
                          : "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1000"
                      }
                      alt={listing.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0 to-slate-900/0 pointer-events-none" />

                    {/* Compare Box */}
                    <div className="absolute top-3 right-3 z-20">
                      <label className="flex items-center cursor-pointer bg-white/90 backdrop-blur-md p-1.5 rounded-lg shadow-sm hover:shadow-md hover:bg-white transition group/check border border-slate-200">
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
                          className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                        />
                      </label>
                    </div>

                    {/* Badges */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-white/25 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                        {isFull ? <Car size={12} /> : <Users size={12} />}
                        {isFull ? "Full" : "Seats"}
                      </span>
                      {!isFull && Number(listing.availableSeats) === 0 && (
                        <span className="px-2.5 py-1 rounded-md bg-rose-500/90 backdrop-blur-md border border-rose-500/50 text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm">
                          Fully Booked
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Text Block */}
                  <div className="p-5 flex flex-col flex-1 text-slate-900 justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex-1 pr-3">
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 line-clamp-1">
                            {listing.brand || "Vehicle"}
                          </p>
                          <h3 className="text-xl font-black tracking-tight leading-tight text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                            {listing.name}
                          </h3>
                        </div>
                      </div>

                      {/* Specs */}
                      <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 mb-4 uppercase tracking-wider">
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

                      {/* Price Section */}
                      <div className="flex items-end gap-1 mb-1">
                        <p className="text-2xl font-black text-slate-900 leading-none">
                          Rs.{" "}
                          {isFull ? listing.pricePerDay : listing.pricePerSeat}
                        </p>
                        <p className="text-xs font-bold text-slate-400 mb-0.5">
                          /{isFull ? "day" : "seat"}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5">
                      <button
                        onClick={() => navigate(`/listings/${listing._id}`)}
                        className="w-full py-3 bg-slate-900 hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5"
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
      </main>

      {/* ================= ADVANCED FILTER DRAWER ================= */}
      {showFilters && (
        <div className="fixed inset-0 z-[120] flex justify-end">
          <div
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
            onClick={() => setShowFilters(false)}
          />
          <div className="relative w-full max-w-sm h-full bg-white shadow-2xl flex flex-col transform transition-transform animate-in slide-in-from-right">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div>
                <h3 className="text-xl font-black text-slate-900">
                  Advanced Filters
                </h3>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                  Fine-tune your results
                </p>
              </div>
              <button
                onClick={() => setShowFilters(false)}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors shadow-sm"
              >
                <X size={16} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-10 bg-white">
              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Fuel size={14} className="text-blue-500" /> Fuel Profile
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Electric", "Hybrid", "Diesel", "Gasoline"].map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setFuelType((prev) =>
                          prev.includes(t)
                            ? prev.filter((x) => x !== t)
                            : [...prev, t],
                        )
                      }
                      className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${fuelType.includes(t) ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Gauge size={14} className="text-blue-500" /> Transmission
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {["Automatic", "Manual"].map((t) => (
                    <button
                      key={t}
                      onClick={() =>
                        setTransmission((prev) =>
                          prev.includes(t)
                            ? prev.filter((x) => x !== t)
                            : [...prev, t],
                        )
                      }
                      className={`px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${transmission.includes(t) ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/20" : "bg-white border-slate-200 text-slate-500 hover:border-slate-300 hover:bg-slate-50"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                  <Users size={14} className="text-blue-500" /> Passenger
                  Capacity
                </p>
                <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-50 border border-slate-200">
                  {[2, 4, 5, 7].map((n) => (
                    <button
                      key={n}
                      onClick={() => setMinSeats(minSeats === n ? null : n)}
                      className={`flex-1 py-3 rounded-xl text-xs font-black transition-all ${minSeats === n ? "bg-white text-blue-600 shadow-sm border border-slate-100" : "text-slate-500 hover:text-slate-700"}`}
                    >
                      {n}+
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                    Maximum Price
                  </p>
                  <p className="text-sm font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-lg">
                    Rs. {maxPrice}
                  </p>
                </div>
                <div className="pt-2">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    step="1000"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value, 10))}
                    className="w-full accent-blue-600 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-bold text-slate-400 mt-3">
                    <span>Rs. 0</span>
                    <span>Rs. 100,000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <button
                onClick={() => setShowFilters(false)}
                className="w-full py-4 rounded-xl bg-blue-600 text-white font-bold text-[11px] uppercase tracking-widest hover:bg-blue-700 transition-all shadow-md hover:shadow-lg shadow-blue-500/20 disabled:opacity-50"
              >
                Apply Criteria
              </button>

              <button
                onClick={clearAllAdvanced}
                className="w-full py-4 rounded-xl bg-white border border-slate-200 text-slate-600 font-bold text-[11px] uppercase tracking-widest hover:bg-slate-50 hover:text-slate-900 transition-all shadow-sm"
              >
                Reset Defaults
              </button>
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
