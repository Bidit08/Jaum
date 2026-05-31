// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import api from "../../utils/api";
// import {
//   Car,
//   Users,
//   MapPin,
//   Fuel,
//   Settings,
//   Calendar,
//   ArrowLeft,
// } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await api.get(`/listings/${id}`);
//         setListing(res.data);
//       } catch (err) {
//         navigate("/listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListing();
//   }, [id, navigate]);

//   if (loading) {
//     return <div className="text-center mt-20">Loading...</div>;
//   }

//   if (!listing) return null;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 mb-6 text-slate-600 hover:text-slate-900"
//       >
//         <ArrowLeft size={18} /> Back
//       </button>

//       {/* Image Gallery */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
//         {listing.photos.map((photo, i) => (
//           <img
//             key={i}
//             src={`${BACKEND_URL}${photo}`}
//             alt="Vehicle"
//             className="w-full h-80 object-cover rounded-2xl"
//           />
//         ))}
//       </div>

//       {/* Info */}
//       <div className="grid md:grid-cols-3 gap-8">
//         {/* LEFT */}
//         <div className="md:col-span-2 space-y-6">
//           <h1 className="text-3xl font-bold">{listing.name}</h1>

//           <p className="text-slate-600">{listing.description}</p>

//           <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//             <Detail icon={<Fuel />} label="Fuel" value={listing.fuelType} />
//             <Detail
//               icon={<Settings />}
//               label="Transmission"
//               value={listing.transmission}
//             />
//             <Detail icon={<Users />} label="Seats" value={listing.seats} />
//             <Detail icon={<Calendar />} label="Year" value={listing.year} />
//             <Detail
//               icon={<MapPin />}
//               label="Location"
//               value={listing.location}
//             />
//           </div>
//         </div>

//         {/* RIGHT */}
//         <div className="bg-white border rounded-2xl p-6 shadow space-y-4">
//           <p className="text-sm text-slate-500">Price</p>

//           {listing.listingType === "full" ? (
//             <p className="text-3xl font-bold">
//               Rs. {listing.pricePerDay}
//               <span className="text-sm text-slate-500"> / day</span>
//             </p>
//           ) : (
//             <p className="text-3xl font-bold">
//               Rs. {listing.pricePerSeat}
//               <span className="text-sm text-slate-500"> / seat</span>
//             </p>
//           )}

//           <button
//             onClick={() => setShowBooking(true)}
//             className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold"
//           >
//             {listing.listingType === "full" ? "Book Vehicle" : "Book Seat"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// const Detail = ({ icon, label, value }) => (
//   <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl">
//     <div className="text-blue-600">{icon}</div>
//     <div>
//       <p className="text-xs text-slate-500">{label}</p>
//       <p className="font-semibold">{value || "-"}</p>
//     </div>
//   </div>
// );

// export default ListingDetails;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Car,
//   Users,
//   MapPin,
//   Fuel,
//   Settings,
//   Calendar,
//   ArrowLeft,
// } from "lucide-react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import BookingModal from "../../components/BookingModal";

// const BACKEND_URL = "http://localhost:5000";

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showBooking, setShowBooking] = useState(false);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await api.get(`/listings/${id}`);
//         setListing(res.data);
//       } catch (err) {
//         toast.error("Listing not found");
//         navigate("/listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListing();
//   }, [id, navigate]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[60vh]">
//         <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
//       </div>
//     );
//   }

//   if (!listing) return null;

//   return (
//     <div className="max-w-6xl mx-auto px-4 py-10">
//       {/* Back */}
//       <button
//         onClick={() => navigate(-1)}
//         className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
//       >
//         <ArrowLeft size={18} /> Back
//       </button>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         {/* Images */}
//         <div className="space-y-4">
//           <img
//             src={
//               listing.photos?.length
//                 ? `${BACKEND_URL}${listing.photos[0]}`
//                 : "/placeholder-car.jpg"
//             }
//             alt={listing.name}
//             className="w-full h-80 object-cover rounded-2xl shadow"
//           />

//           {listing.photos?.length > 1 && (
//             <div className="grid grid-cols-4 gap-3">
//               {listing.photos.slice(1).map((p, i) => (
//                 <img
//                   key={i}
//                   src={`${BACKEND_URL}${p}`}
//                   alt=""
//                   className="h-20 w-full object-cover rounded-lg"
//                 />
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Details */}
//         <div className="space-y-6">
//           <div>
//             <h1 className="text-3xl font-bold">{listing.name}</h1>
//             <p className="text-slate-500">
//               {listing.brand} {listing.model} • {listing.year}
//             </p>
//           </div>

//           {/* Type */}
//           <span
//             className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
//               listing.listingType === "full"
//                 ? "bg-blue-100 text-blue-700"
//                 : "bg-emerald-100 text-emerald-700"
//             }`}
//           >
//             {listing.listingType === "full" ? (
//               <>
//                 <Car size={16} /> Full Vehicle
//               </>
//             ) : (
//               <>
//                 <Users size={16} /> Seat Listing
//               </>
//             )}
//           </span>

//           {/* Price */}
//           <div className="bg-slate-50 p-5 rounded-xl">
//             <p className="text-slate-500 text-sm">Price</p>
//             <p className="text-3xl font-bold text-slate-900">
//               Rs.{" "}
//               {listing.listingType === "full"
//                 ? listing.pricePerDay
//                 : listing.pricePerSeat}
//               <span className="text-base font-normal text-slate-500">
//                 {listing.listingType === "full" ? " / day" : " / seat"}
//               </span>
//             </p>
//           </div>

//           {/* Info Grid */}
//           <div className="grid grid-cols-2 gap-4 text-sm">
//             <div className="flex items-center gap-2 text-slate-600">
//               <Fuel size={16} /> {listing.fuelType}
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <Settings size={16} /> {listing.transmission}
//             </div>
//             <div className="flex items-center gap-2 text-slate-600">
//               <Users size={16} /> {listing.seats} seats
//             </div>
//             {listing.listingType === "full" ? (
//               <div className="flex items-center gap-2 text-slate-600">
//                 <MapPin size={16} /> {listing.location}
//               </div>
//             ) : (
//               <div className="flex items-center gap-2 text-slate-600">
//                 <Calendar size={16} /> {listing.departure} →{" "}
//                 {listing.destination}
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           <div>
//             <h3 className="font-bold mb-2">Description</h3>
//             <p className="text-slate-600 leading-relaxed">
//               {listing.description || "No description provided."}
//             </p>
//           </div>

//           {/* Book Button */}
//           <button
//             onClick={() => setShowBooking(true)}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
//           >
//             {listing.listingType === "full" ? "Book Vehicle" : "Book Seat"}
//           </button>
//         </div>
//       </div>

//       {/* Booking Modal */}
//       {showBooking && (
//         <BookingModal listing={listing} onClose={() => setShowBooking(false)} />
//       )}
//     </div>
//   );
// };

// export default ListingDetails;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Car,
//   Users,
//   MapPin,
//   Fuel,
//   Settings,
//   Calendar,
//   ArrowLeft,
//   Star,
//   Shield,
//   Sparkles,
//   Clock,
//   CheckCircle,
//   Tag,
//   Heart,
//   Share2,
//   Navigation,
//   Battery,
//   Palette,
//   Bluetooth,
//   Music,
//   Wifi,
// } from "lucide-react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import BookingModal from "../../components/BookingModal";
// import Navbar from "@/components/Navbar";
// import BookVisitForm from "@/components/visits/BookVisitForm";

// const BACKEND_URL = "http://localhost:5000";

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showBooking, setShowBooking] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const res = await api.get(`/listings/${id}`);
//         setListing(res.data);
//       } catch (err) {
//         toast.error("Listing not found");
//         navigate("/listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListing();
//   }, [id, navigate]);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white">
//         <div className="relative">
//           <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
//           <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600" />
//         </div>
//       </div>
//     );
//   }

//   if (!listing) return null;

//   const isSeatListing = listing.listingType === "seats";
//   const isSoldOut = isSeatListing && Number(listing.availableSeats) === 0;

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
//       <Navbar />
//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
//         <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-20"></div>
//       </div>

//       <div className="relative max-w-7xl mx-auto px-4 py-8">
//         {/* Header with Back Button */}
//         <div className="flex items-center justify-between mb-8 pt-15">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-3 group"
//           >
//             <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-blue-300 group-hover:bg-blue-50 transition-all">
//               <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
//             </div>
//             <span className="text-slate-600 font-medium group-hover:text-blue-600 transition-colors">
//               Back to listings
//             </span>
//           </button>

//           <div className="flex items-center gap-3">
//             <button className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
//               <Share2 className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
//             </button>
//             <button
//               onClick={() => setIsFavorite(!isFavorite)}
//               className="p-3 bg-white rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50 transition-all group"
//             >
//               <Heart
//                 className={`w-5 h-5 transition-colors ${
//                   isFavorite
//                     ? "fill-rose-500 text-rose-500"
//                     : "text-slate-600 group-hover:text-rose-500"
//                 }`}
//               />
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
//           {/* Images Section */}
//           <div className="space-y-6">
//             {/* Main Image */}
//             <div className="relative group">
//               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
//               <img
//                 src={
//                   listing.photos?.length
//                     ? `${BACKEND_URL}${listing.photos[selectedImage]}`
//                     : "/placeholder-car.jpg"
//                 }
//                 alt={listing.name}
//                 className="w-full h-[400px] object-cover rounded-3xl shadow-xl border border-slate-200 relative group-hover:scale-[1.02] transition-transform duration-500"
//               />

//               {/* Image Badges */}
//               <div className="absolute top-6 left-6 flex flex-col gap-2">
//                 <div
//                   className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
//                     listing.listingType === "full"
//                       ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
//                       : "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
//                   }`}
//                 >
//                   {listing.listingType === "full" ? (
//                     <>
//                       <Car size={16} /> Full Vehicle
//                     </>
//                   ) : (
//                     <>
//                       <Users size={16} /> Seat Listing
//                     </>
//                   )}

//                   {isSeatListing && (
//                     <div className="absolute bottom-7 left-110">
//                       <div
//                         className={`px-4 py-2 rounded-2xl text-xs font-bold backdrop-blur-xl border shadow-lg flex items-center gap-2
//         ${
//           isSoldOut
//             ? "bg-rose-600/90 text-white border-rose-400"
//             : "bg-emerald-600/90 text-white border-emerald-400"
//         }`}
//                       >
//                         <Users size={14} />
//                         {isSoldOut
//                           ? "Fully Booked"
//                           : `${listing.availableSeats} Seats Available`}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//                 <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-700 shadow-lg">
//                   <Shield size={16} className="text-emerald-500" />
//                   Verified Host
//                 </div>
//               </div>
//             </div>

//             {/* Thumbnails */}
//             {listing.photos?.length > 1 && (
//               <div className="grid grid-cols-4 gap-4">
//                 {listing.photos.map((p, i) => (
//                   <button
//                     key={i}
//                     onClick={() => setSelectedImage(i)}
//                     className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
//                       selectedImage === i
//                         ? "border-blue-500 ring-4 ring-blue-100"
//                         : "border-slate-200 hover:border-blue-300"
//                     }`}
//                   >
//                     <img
//                       src={`${BACKEND_URL}${p}`}
//                       alt=""
//                       className="h-24 w-full object-cover"
//                     />
//                     {selectedImage === i && (
//                       <div className="absolute inset-0 bg-blue-500/20"></div>
//                     )}
//                   </button>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Details Section */}
//           <div className="space-y-8">
//             {/* Title and Rating */}
//             <div>
//               <div className="flex items-start justify-between mb-3">
//                 <h1 className="text-4xl font-bold text-slate-900">
//                   {listing.name}
//                 </h1>
//                 <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
//                   <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
//                   <span className="font-bold text-slate-900">4.8</span>
//                   <span className="text-slate-500 text-sm">(24 reviews)</span>
//                 </div>
//               </div>
//               <p className="text-xl text-slate-600 mb-4">
//                 {listing.brand} {listing.model} • {listing.year}
//               </p>

//               {/* Quick Stats */}
//               <div className="flex items-center gap-6 text-slate-600">
//                 <div className="flex items-center gap-2">
//                   <Clock className="w-5 h-5" />
//                   <span className="font-medium">Instant booking</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <CheckCircle className="w-5 h-5 text-emerald-500" />
//                   <span className="font-medium">Free cancellation</span>
//                 </div>
//               </div>
//             </div>

//             {/* Price Card */}
//             <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-2xl">
//               <div className="flex items-center justify-between mb-4">
//                 <div>
//                   <p className="text-slate-300 text-sm">Starting from</p>
//                   <div className="flex items-baseline gap-2">
//                     <span className="text-4xl font-bold">
//                       Rs.{" "}
//                       {listing.listingType === "full"
//                         ? listing.pricePerDay
//                         : listing.pricePerSeat}
//                     </span>
//                     <span className="text-slate-300">
//                       {listing.listingType === "full" ? "/ day" : "/ seat"}
//                     </span>
//                   </div>
//                 </div>
//                 <Sparkles className="w-8 h-8 text-amber-400" />
//               </div>
//               <p className="text-slate-400 text-sm">
//                 Includes insurance and 24/7 roadside assistance
//               </p>
//             </div>

//             {/* Features Grid */}
//             <div className="grid grid-cols-2 gap-4">
//               <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl border border-blue-100">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-blue-100 rounded-xl">
//                     <Fuel className="w-5 h-5 text-blue-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-500">Fuel Type</p>
//                     <p className="font-semibold text-slate-900">
//                       {listing.fuelType}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-emerald-100">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-emerald-100 rounded-xl">
//                     <Settings className="w-5 h-5 text-emerald-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-500">Transmission</p>
//                     <p className="font-semibold text-slate-900">
//                       {listing.transmission}
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-2xl border border-purple-100">
//                 <div className="flex items-center gap-3 mb-2">
//                   <div className="p-2 bg-purple-100 rounded-xl">
//                     <Users className="w-5 h-5 text-purple-600" />
//                   </div>
//                   <div>
//                     <p className="text-sm text-slate-500">Seats</p>
//                     <p className="font-semibold text-slate-900">
//                       {listing.seats} seats
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {listing.listingType === "full" ? (
//                 <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-2xl border border-amber-100">
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="p-2 bg-amber-100 rounded-xl">
//                       <MapPin className="w-5 h-5 text-amber-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-500">Location</p>
//                       <p className="font-semibold text-slate-900">
//                         {listing.location}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-2xl border border-cyan-100">
//                   <div className="flex items-center gap-3 mb-2">
//                     <div className="p-2 bg-cyan-100 rounded-xl">
//                       <Navigation className="w-5 h-5 text-cyan-600" />
//                     </div>
//                     <div>
//                       <p className="text-sm text-slate-500">Route</p>
//                       <p className="font-semibold text-slate-900">
//                         {listing.departure} → {listing.destination}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             {isSeatListing && (
//               <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
//                 <div>
//                   <p className="text-sm font-semibold text-emerald-700">
//                     Seat Availability
//                   </p>
//                   {/* <p className="text-xs text-emerald-600">
//                     Updated in real-time
//                   </p> */}
//                 </div>
//                 <span className="text-2xl font-bold text-emerald-800">
//                   {listing.availableSeats}
//                 </span>
//               </div>
//             )}

//             {/* Vehicle Features */}
//             <div className="bg-white rounded-3xl border border-slate-200 p-6">
//               <h3 className="text-xl font-bold text-slate-900 mb-4">
//                 Vehicle Features
//               </h3>
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                 <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
//                   <Bluetooth className="w-4 h-4" />
//                   <span className="text-sm">Bluetooth</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
//                   <Music className="w-4 h-4" />
//                   <span className="text-sm">Premium Sound</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
//                   <Battery className="w-4 h-4" />
//                   <span className="text-sm">Navigation</span>
//                 </div>
//                 <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
//                   <Palette className="w-4 h-4" />
//                   <span className="text-sm">Leather Seats</span>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="bg-white rounded-3xl border border-slate-200 p-6">
//               <h3 className="text-xl font-bold text-slate-900 mb-4">
//                 Description
//               </h3>
//               <p className="text-slate-600 leading-relaxed">
//                 {listing.description ||
//                   "No description provided. This vehicle is well-maintained and ready for your next adventure. Experience comfort, safety, and reliability with this premium rental."}
//               </p>
//             </div>

//             {/* Book Button */}
//             <button
//               disabled={isSoldOut}
//               onClick={() => {
//                 if (isSoldOut) {
//                   toast.error("No seats available for this ride");
//                   return;
//                 }
//                 setShowBooking(true);
//               }}
//               className={`w-full py-5 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300
//     ${
//       isSoldOut
//         ? "bg-slate-300 text-slate-600 cursor-not-allowed"
//         : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white hover:shadow-2xl hover:scale-[1.02]"
//     }`}
//             >
//               {listing.listingType === "full"
//                 ? "Book This Vehicle Now"
//                 : isSoldOut
//                   ? "No Seats Available"
//                   : "Book Seat Now"}
//             </button>
//           </div>
//         </div>

//         <BookVisitForm listing={listing} />

//         {/* Booking Modal */}
//         {showBooking && (
//           <BookingModal
//             listing={listing}
//             onClose={() => setShowBooking(false)}
//           />
//         )}
//       </div>
//     </div>
//   );
// };

// export default ListingDetails;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Car,
//   Users,
//   MapPin,
//   Fuel,
//   Settings,
//   Calendar,
//   ArrowLeft,
//   Star,
//   Shield,
//   Sparkles,
//   Clock,
//   CheckCircle,
//   Share2,
//   Heart,
//   Navigation,
//   Battery,
//   Palette,
//   Bluetooth,
//   Music,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import BookingModal from "../../components/BookingModal";
// import VisitModal from "../../components/VisitModal";
// import PaymentMethodModal from "../../components/bookings/PaymentMethodModal";
// import Navbar from "../../components/Navbar";
// import ReviewCard from "../../components/reviews/ReviewCard";

// const BACKEND_URL = "http://localhost:5000";

// const Skeleton = ({ className }) => (
//   <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`}></div>
// );

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showBooking, setShowBooking] = useState(false);
//   const [showVisit, setShowVisit] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isDescExpanded, setIsDescExpanded] = useState(false);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchListingAndReviews = async () => {
//       try {
//         const [listingRes, reviewsRes] = await Promise.all([
//           api.get(`/listings/${id}`),
//           api.get(`/reviews/listing/${id}`),
//         ]);
//         setListing(listingRes.data);
//         setReviews(reviewsRes.data);
//       } catch (err) {
//         toast.error("Listing not found");
//         navigate("/listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListingAndReviews();
//     window.scrollTo(0, 0);
//   }, [id, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
//           <Skeleton className="w-32 h-6 mb-8" />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="space-y-6">
//               <Skeleton className="w-full h-[450px]" />
//               <div className="grid grid-cols-4 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-24" />
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-8">
//               <Skeleton className="w-3/4 h-10" />
//               <Skeleton className="w-1/2 h-6" />
//               <Skeleton className="w-full h-40" />
//               <div className="grid grid-cols-2 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-20" />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!listing) return null;

//   const isSeatListing = listing.listingType === "seats";
//   const isSoldOut = isSeatListing && Number(listing.availableSeats) === 0;
//   const description =
//     listing.description ||
//     "No description provided. This vehicle is well-maintained and ready for your next adventure. Experience comfort, safety, and reliability with this premium rental.";
//   const shouldTruncate = description.length > 300;
//   const displayedDescription = isDescExpanded
//     ? description
//     : description.slice(0, 300) + (shouldTruncate ? "..." : "");

//   return (
//     <div className="min-h-screen bg-slate-50/50">
//       <Navbar />

//       <main className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16 pt-20 lg:pt-36">
//         {/* Breadcrumb & Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group"
//           >
//             <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
//               <ArrowLeft size={20} />
//             </div>
//             Back to explore
//           </button>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsFavorite(!isFavorite)}
//               className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group"
//             >
//               <Heart
//                 size={18}
//                 className={`${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-500"} transition-colors`}
//               />
//               <span className="text-sm font-semibold text-slate-700">Save</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group">
//               <Share2
//                 size={18}
//                 className="text-slate-400 group-hover:text-blue-600 transition-colors"
//               />
//               <span className="text-sm font-semibold text-slate-700">
//                 Share
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
//           {/* Main Content Area (8 Columns) */}
//           <div className="lg:col-span-8 space-y-10">
//             {/* Gallery Section */}
//             <section className="space-y-4">
//               <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-200">
//                 <img
//                   src={
//                     listing.photos?.length
//                       ? `${BACKEND_URL}${listing.photos[selectedImage]}`
//                       : "/placeholder-car.jpg"
//                   }
//                   alt={listing.name}
//                   className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

//                 {/* Status Badges */}
//                 <div className="absolute top-6 left-6 flex flex-wrap gap-2">
//                   <div
//                     className={`px-4 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2 border border-white/20 text-white font-bold text-sm ${
//                       listing.listingType === "full"
//                         ? "bg-blue-500/80"
//                         : "bg-emerald-500/80"
//                     }`}
//                   >
//                     {listing.listingType === "full" ? (
//                       <Car size={16} />
//                     ) : (
//                       <Users size={16} />
//                     )}
//                     {listing.listingType === "full"
//                       ? "Exclusive Rental"
//                       : "Smart Ride Share"}
//                   </div>
//                   <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center gap-2 border border-slate-100 text-slate-800 font-bold text-sm">
//                     <Shield size={16} className="text-blue-500" />
//                     Verified Listing
//                   </div>
//                 </div>

//                 {/* Instant Booking Badge */}
//                 <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-amber-400/90 backdrop-blur-sm text-amber-950 font-bold text-xs flex items-center gap-2 shadow-lg">
//                   <Sparkles size={14} />
//                   Top Rated Choice
//                 </div>
//               </div>

//               {/* Thumbnails */}
//               {listing.photos?.length > 1 && (
//                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
//                   {listing.photos.map((photo, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedImage(i)}
//                       className={`relative min-w-[100px] h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
//                         selectedImage === i
//                           ? "border-blue-500 ring-4 ring-blue-100 scale-95"
//                           : "border-transparent hover:border-slate-300"
//                       }`}
//                     >
//                       <img
//                         src={`${BACKEND_URL}${photo}`}
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                       {selectedImage !== i && (
//                         <div className="absolute inset-0 bg-black/10"></div>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* Vehicle Info Section */}
//             <section className="space-y-8 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
//               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
//                     <span className="font-bold text-slate-900">
//                       {listing.averageRating > 0
//                         ? listing.averageRating
//                         : "New"}
//                     </span>
//                     {listing.reviewCount > 0 ? (
//                       <span className="text-slate-400 font-medium">
//                         ({listing.reviewCount} reviews)
//                       </span>
//                     ) : (
//                       <span className="text-slate-400 font-medium">
//                         (No reviews yet)
//                       </span>
//                     )}
//                     <span className="text-slate-200 mx-1">•</span>
//                     <span className="text-blue-600 font-semibold text-sm">
//                       Most Popular
//                     </span>
//                   </div>
//                   <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
//                     {listing.name}
//                   </h1>
//                   <p className="text-xl text-slate-500 font-medium">
//                     {listing.brand} {listing.model} • Series {listing.year}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-4 text-slate-600">
//                   <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
//                     <Clock size={18} className="text-blue-500" />
//                     <span className="text-sm font-semibold tracking-wide uppercase">
//                       Fast Booking
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
//                     <CheckCircle size={18} className="text-emerald-500" />
//                     <span className="text-sm font-semibold tracking-wide uppercase">
//                       Free Cancellation
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Specifications Grid */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <SpecCard
//                   icon={<Fuel className="text-blue-500" />}
//                   label="Engine"
//                   value={listing.fuelType}
//                 />
//                 <SpecCard
//                   icon={<Settings className="text-purple-500" />}
//                   label="Drive"
//                   value={listing.transmission}
//                 />
//                 <SpecCard
//                   icon={<Users className="text-emerald-500" />}
//                   label="Capacity"
//                   value={`${listing.seats} Seats`}
//                 />
//                 {listing.listingType === "full" ? (
//                   <SpecCard
//                     icon={<MapPin className="text-rose-500" />}
//                     label="Location"
//                     value={listing.location}
//                   />
//                 ) : (
//                   <SpecCard
//                     icon={<Navigation className="text-cyan-500" />}
//                     label="Route"
//                     value={`${listing.departure} → ${listing.destination}`}
//                   />
//                 )}
//               </div>

//               {/* Description */}
//               <div className="space-y-4">
//                 <h3 className="text-2xl font-bold text-slate-900">
//                   Experience this Ride
//                 </h3>
//                 <div className="prose prose-slate max-w-none">
//                   <p className="text-slate-600 leading-[1.8] text-lg">
//                     {displayedDescription}
//                   </p>
//                 </div>
//                 {shouldTruncate && (
//                   <button
//                     onClick={() => setIsDescExpanded(!isDescExpanded)}
//                     className="flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700 transition-colors"
//                   >
//                     {isDescExpanded ? (
//                       <>
//                         Read Less <ChevronUp size={18} />
//                       </>
//                     ) : (
//                       <>
//                         Read More <ChevronDown size={18} />
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Features Chips */}
//               <div className="space-y-4 pt-4 border-t border-slate-100">
//                 <h3 className="text-xl font-bold text-slate-900">
//                   Premium Features
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   <FeatureChip
//                     icon={<Bluetooth size={16} />}
//                     label="Seamless Bluetooth"
//                   />
//                   <FeatureChip
//                     icon={<Music size={16} />}
//                     label="Surround Sound"
//                   />
//                   <FeatureChip
//                     icon={<Navigation size={16} />}
//                     label="GPS Navigation"
//                   />
//                   <FeatureChip
//                     icon={<Battery size={16} />}
//                     label="Eco Friendly"
//                   />
//                   <FeatureChip
//                     icon={<Palette size={16} />}
//                     label="Leather Interior"
//                   />
//                 </div>
//               </div>

//               {/* Reviews Section */}
//               <div className="space-y-6 pt-8 border-t border-slate-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold text-slate-900">
//                       Guest Reviews
//                     </h3>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
//                       <span className="font-bold text-lg text-slate-900">
//                         {listing.averageRating > 0
//                           ? listing.averageRating
//                           : "New"}
//                       </span>
//                       {listing.reviewCount > 0 && (
//                         <span className="text-slate-500 font-medium">
//                           ({listing.reviewCount} reviews)
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {reviews.length > 0 ? (
//                   <div className="grid grid-cols-1 gap-4">
//                     {reviews.map((review) => (
//                       <ReviewCard key={review._id} review={review} />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-10 bg-slate-50 rounded-3xl border border-slate-100">
//                     <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                     <h4 className="text-lg font-bold text-slate-900 mb-1">
//                       No reviews yet
//                     </h4>
//                     <p className="text-slate-500 text-sm">
//                       Be the first to share your experience after booking!
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>
//           </div>

//           {/* Sidebar Booking Card (4 Columns) */}
//           <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
//             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden shadow-blue-900/5">
//               {/* Card Header Pricing */}
//               <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 text-white">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs">
//                     Premium Price
//                   </span>
//                   <Sparkles className="text-amber-400" size={20} />
//                 </div>
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-5xl font-black">
//                     Rs.{" "}
//                     {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//                   </span>
//                   <span className="text-slate-400 font-medium text-lg">
//                     / {isSeatListing ? "seat" : "day"}
//                   </span>
//                 </div>
//                 <p className="text-slate-500 text-xs mt-4 flex items-center gap-2">
//                   <Shield size={12} /> Includes standard protection and 24/7
//                   support
//                 </p>
//               </div>

//               {/* Card Body */}
//               <div className="p-8 space-y-6">
//                 {isSeatListing && (
//                   <div
//                     className={`p-4 rounded-2xl border flex items-center justify-between ${
//                       isSoldOut
//                         ? "bg-rose-50 border-rose-100 text-rose-700"
//                         : "bg-emerald-50 border-emerald-100 text-emerald-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <Users
//                         className={
//                           isSoldOut ? "text-rose-500" : "text-emerald-500"
//                         }
//                       />
//                       <span className="font-bold">Seats Left</span>
//                     </div>
//                     <span className="text-2xl font-black">
//                       {listing.availableSeats}
//                     </span>
//                   </div>
//                 )}

//                 {!isSeatListing && (
//                   <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center gap-3">
//                     <Calendar className="text-blue-500" />
//                     <span className="font-bold">Available Now</span>
//                   </div>
//                 )}

//                 <div className="space-y-3">
//                   <button
//                     onClick={() => setShowBooking(true)}
//                     disabled={isSoldOut}
//                     className={`group relative w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg ${
//                       isSoldOut
//                         ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                         : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25 shadow-blue-500/10"
//                     }`}
//                   >
//                     <span className="relative z-10">
//                       {!isSeatListing
//                         ? "Reserve Vehicle"
//                         : isSoldOut
//                           ? "Fully Booked"
//                           : "Book My Seat"}
//                     </span>
//                     {!isSoldOut && (
//                       <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
//                     )}
//                   </button>

//                   {!isSeatListing && (
//                     <button
//                       onClick={() => setShowVisit(true)}
//                       className="w-full py-4 rounded-2xl text-base font-bold text-blue-600 bg-white border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
//                     >
//                       Schedule Visit / Test
//                     </button>
//                   )}
//                 </div>

//                 <div className="pt-6 border-t border-slate-100 space-y-4">
//                   <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
//                     <CheckCircle size={16} className="text-emerald-500" />
//                     No hidden fees or charges
//                   </div>
//                   <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
//                     <CheckCircle size={16} className="text-emerald-500" />
//                     Secure payment processing
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sub-card: Host Info */}
//             <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
//               <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl uppercase">
//                 {(listing.owner?.name || listing.ownerName || "O")[0]}
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
//                   Owned By
//                 </p>
//                 <p className="font-bold text-slate-900">
//                   {listing.owner?.name ||
//                     listing.ownerName ||
//                     "Verified Partner"}
//                 </p>
//               </div>
//               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
//                 <Shield size={20} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Mobile Fixed CTA */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-full duration-500">
//         <div>
//           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
//             Total
//           </p>
//           <p className="text-2xl font-black text-slate-900">
//             Rs. {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//           </p>
//         </div>
//         <button
//           onClick={() => setShowBooking(true)}
//           disabled={isSoldOut}
//           className={`flex-1 max-w-[200px] py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
//             isSoldOut
//               ? "bg-slate-200 text-slate-500"
//               : "bg-blue-600 text-white shadow-blue-500/20"
//           }`}
//         >
//           {isSoldOut ? "Sold Out" : "Book Now"}
//         </button>
//       </div>

//       {/* Modals */}
//       {showBooking && (
//         <BookingModal
//           listing={listing}
//           onClose={() => setShowBooking(false)}
//           onSuccess={(booking) => {
//             setCurrentBooking(booking);
//             setShowBooking(false);
//             setShowPayment(true);
//           }}
//         />
//       )}
//       {showVisit && (
//         <VisitModal listing={listing} onClose={() => setShowVisit(false)} />
//       )}
//       {showPayment && currentBooking && (
//         <PaymentMethodModal
//           isOpen={showPayment}
//           onClose={() => setShowPayment(false)}
//           bookingId={currentBooking._id}
//           totalPrice={currentBooking.totalPrice}
//           onComplete={() => navigate("/dashboard/profile?tab=bookings")}
//         />
//       )}

//       {/* Spacer for mobile footer */}
//       <div className="h-24 lg:hidden"></div>
//     </div>
//   );
// };

// /* Helper Components */
// const SpecCard = ({ icon, label, value }) => (
//   <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
//     <div className="p-2 bg-white rounded-xl w-fit shadow-sm mb-3 group-hover:scale-110 transition-transform">
//       {icon}
//     </div>
//     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">
//       {label}
//     </p>
//     <p className="text-slate-900 font-bold truncate">{value || "—"}</p>
//   </div>
// );

// const FeatureChip = ({ icon, label }) => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-default text-sm font-semibold text-slate-700">
//     <span className="text-blue-500">{icon}</span>
//     {label}
//   </div>
// );

// export default ListingDetails;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Car,
//   Users,
//   MapPin,
//   Fuel,
//   Settings,
//   Calendar,
//   ArrowLeft,
//   Star,
//   Shield,
//   Sparkles,
//   Clock,
//   CheckCircle,
//   Share2,
//   Heart,
//   Navigation,
//   Battery,
//   Palette,
//   Bluetooth,
//   Music,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import BookingModal from "../../components/BookingModal";
// import VisitModal from "../../components/VisitModal";
// import PaymentMethodModal from "../../components/bookings/PaymentMethodModal";
// import Navbar from "../../components/Navbar";
// import ReviewCard from "../../components/reviews/ReviewCard";

// const BACKEND_URL = "http://localhost:5000";

// const Skeleton = ({ className }) => (
//   <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`}></div>
// );

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showBooking, setShowBooking] = useState(false);
//   const [showVisit, setShowVisit] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isDescExpanded, setIsDescExpanded] = useState(false);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchListingAndReviews = async () => {
//       try {
//         const [listingRes, reviewsRes] = await Promise.all([
//           api.get(`/listings/${id}`),
//           api.get(`/reviews/listing/${id}`),
//         ]);
//         setListing(listingRes.data);
//         setReviews(reviewsRes.data);
//       } catch (err) {
//         toast.error("Listing not found");
//         navigate("/listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListingAndReviews();
//     window.scrollTo(0, 0);
//   }, [id, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
//           <Skeleton className="w-32 h-6 mb-8" />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="space-y-6">
//               <Skeleton className="w-full h-[450px]" />
//               <div className="grid grid-cols-4 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-24" />
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-8">
//               <Skeleton className="w-3/4 h-10" />
//               <Skeleton className="w-1/2 h-6" />
//               <Skeleton className="w-full h-40" />
//               <div className="grid grid-cols-2 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-20" />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!listing) return null;

//   const isSeatListing = listing.listingType === "seats";
//   const isSoldOut = isSeatListing && Number(listing.availableSeats) === 0;
//   const description =
//     listing.description ||
//     "No description provided. This vehicle is well-maintained and ready for your next adventure. Experience comfort, safety, and reliability with this premium rental.";
//   const shouldTruncate = description.length > 300;
//   const displayedDescription = isDescExpanded
//     ? description
//     : description.slice(0, 300) + (shouldTruncate ? "..." : "");

//   return (
//     <div className="min-h-screen bg-slate-50/50">
//       <Navbar />

//       <main className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16 pt-20 lg:pt-36">
//         {/* Breadcrumb & Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group"
//           >
//             <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
//               <ArrowLeft size={20} />
//             </div>
//             Back to explore
//           </button>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsFavorite(!isFavorite)}
//               className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group"
//             >
//               <Heart
//                 size={18}
//                 className={`${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-500"} transition-colors`}
//               />
//               <span className="text-sm font-semibold text-slate-700">Save</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group">
//               <Share2
//                 size={18}
//                 className="text-slate-400 group-hover:text-blue-600 transition-colors"
//               />
//               <span className="text-sm font-semibold text-slate-700">
//                 Share
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
//           {/* Main Content Area (8 Columns) */}
//           <div className="lg:col-span-8 space-y-10">
//             {/* Gallery Section */}
//             <section className="space-y-4">
//               <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-200">
//                 <img
//                   src={
//                     listing.photos?.length
//                       ? `${BACKEND_URL}${listing.photos[selectedImage]}`
//                       : "/placeholder-car.jpg"
//                   }
//                   alt={listing.name}
//                   className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

//                 {/* Status Badges */}
//                 <div className="absolute top-6 left-6 flex flex-wrap gap-2">
//                   <div
//                     className={`px-4 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2 border border-white/20 text-white font-bold text-sm ${
//                       listing.listingType === "full"
//                         ? "bg-blue-500/80"
//                         : "bg-emerald-500/80"
//                     }`}
//                   >
//                     {listing.listingType === "full" ? (
//                       <Car size={16} />
//                     ) : (
//                       <Users size={16} />
//                     )}
//                     {listing.listingType === "full"
//                       ? "Exclusive Rental"
//                       : "Smart Ride Share"}
//                   </div>
//                   <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center gap-2 border border-slate-100 text-slate-800 font-bold text-sm">
//                     <Shield size={16} className="text-blue-500" />
//                     Verified Listing
//                   </div>
//                 </div>

//                 {/* Instant Booking Badge */}
//                 <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-amber-400/90 backdrop-blur-sm text-amber-950 font-bold text-xs flex items-center gap-2 shadow-lg">
//                   <Sparkles size={14} />
//                   Top Rated Choice
//                 </div>
//               </div>

//               {/* Thumbnails */}
//               {listing.photos?.length > 1 && (
//                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
//                   {listing.photos.map((photo, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedImage(i)}
//                       className={`relative min-w-[100px] h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
//                         selectedImage === i
//                           ? "border-blue-500 ring-4 ring-blue-100 scale-95"
//                           : "border-transparent hover:border-slate-300"
//                       }`}
//                     >
//                       <img
//                         src={`${BACKEND_URL}${photo}`}
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                       {selectedImage !== i && (
//                         <div className="absolute inset-0 bg-black/10"></div>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* Vehicle Info Section */}
//             <section className="space-y-8 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
//               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
//                     <span className="font-bold text-slate-900">
//                       {listing.averageRating > 0
//                         ? listing.averageRating
//                         : "New"}
//                     </span>
//                     {listing.reviewCount > 0 ? (
//                       <span className="text-slate-400 font-medium">
//                         ({listing.reviewCount} reviews)
//                       </span>
//                     ) : (
//                       <span className="text-slate-400 font-medium">
//                         (No reviews yet)
//                       </span>
//                     )}
//                     <span className="text-slate-200 mx-1">•</span>
//                     <span className="text-blue-600 font-semibold text-sm">
//                       Most Popular
//                     </span>
//                   </div>
//                   <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
//                     {listing.name}
//                   </h1>
//                   <p className="text-xl text-slate-500 font-medium">
//                     {listing.brand} {listing.model} • Series {listing.year}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-4 text-slate-600">
//                   <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
//                     <Clock size={18} className="text-blue-500" />
//                     <span className="text-sm font-semibold tracking-wide uppercase">
//                       Fast Booking
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
//                     <CheckCircle size={18} className="text-emerald-500" />
//                     <span className="text-sm font-semibold tracking-wide uppercase">
//                       Free Cancellation
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Specifications Grid */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <SpecCard
//                   icon={<Fuel className="text-blue-500" />}
//                   label="Engine"
//                   value={listing.fuelType}
//                 />
//                 <SpecCard
//                   icon={<Settings className="text-purple-500" />}
//                   label="Drive"
//                   value={listing.transmission}
//                 />
//                 <SpecCard
//                   icon={<Users className="text-emerald-500" />}
//                   label="Capacity"
//                   value={`${listing.seats} Seats`}
//                 />
//                 {listing.listingType === "full" ? (
//                   <SpecCard
//                     icon={<MapPin className="text-rose-500" />}
//                     label="Location"
//                     value={listing.location}
//                   />
//                 ) : (
//                   <SpecCard
//                     icon={<Navigation className="text-cyan-500" />}
//                     label="Route"
//                     value={`${listing.departure} → ${listing.destination}`}
//                   />
//                 )}
//               </div>

//               {/* Description */}
//               <div className="space-y-4">
//                 <h3 className="text-2xl font-bold text-slate-900">
//                   Experience this Ride
//                 </h3>
//                 <div className="prose prose-slate max-w-none">
//                   <p className="text-slate-600 leading-[1.8] text-lg">
//                     {displayedDescription}
//                   </p>
//                 </div>
//                 {shouldTruncate && (
//                   <button
//                     onClick={() => setIsDescExpanded(!isDescExpanded)}
//                     className="flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700 transition-colors"
//                   >
//                     {isDescExpanded ? (
//                       <>
//                         Read Less <ChevronUp size={18} />
//                       </>
//                     ) : (
//                       <>
//                         Read More <ChevronDown size={18} />
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Features Chips */}
//               <div className="space-y-4 pt-4 border-t border-slate-100">
//                 <h3 className="text-xl font-bold text-slate-900">
//                   Premium Features
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   <FeatureChip
//                     icon={<Bluetooth size={16} />}
//                     label="Seamless Bluetooth"
//                   />
//                   <FeatureChip
//                     icon={<Music size={16} />}
//                     label="Surround Sound"
//                   />
//                   <FeatureChip
//                     icon={<Navigation size={16} />}
//                     label="GPS Navigation"
//                   />
//                   <FeatureChip
//                     icon={<Battery size={16} />}
//                     label="Eco Friendly"
//                   />
//                   <FeatureChip
//                     icon={<Palette size={16} />}
//                     label="Leather Interior"
//                   />
//                 </div>
//               </div>

//               {/* Reviews Section */}
//               <div className="space-y-6 pt-8 border-t border-slate-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold text-slate-900">
//                       Guest Reviews
//                     </h3>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
//                       <span className="font-bold text-lg text-slate-900">
//                         {listing.averageRating > 0
//                           ? listing.averageRating
//                           : "New"}
//                       </span>
//                       {listing.reviewCount > 0 && (
//                         <span className="text-slate-500 font-medium">
//                           ({listing.reviewCount} reviews)
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {reviews.length > 0 ? (
//                   <div className="grid grid-cols-1 gap-4">
//                     {reviews.map((review) => (
//                       <ReviewCard key={review._id} review={review} />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-10 bg-slate-50 rounded-3xl border border-slate-100">
//                     <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                     <h4 className="text-lg font-bold text-slate-900 mb-1">
//                       No reviews yet
//                     </h4>
//                     <p className="text-slate-500 text-sm">
//                       Be the first to share your experience after booking!
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>
//           </div>

//           {/* Sidebar Booking Card (4 Columns) */}
//           <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
//             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden shadow-blue-900/5">
//               {/* Card Header Pricing */}
//               <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 text-white">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs">
//                     Premium Price
//                   </span>
//                   <Sparkles className="text-amber-400" size={20} />
//                 </div>
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-5xl font-black">
//                     Rs.{" "}
//                     {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//                   </span>
//                   <span className="text-slate-400 font-medium text-lg">
//                     / {isSeatListing ? "seat" : "day"}
//                   </span>
//                 </div>
//                 <p className="text-slate-500 text-xs mt-4 flex items-center gap-2">
//                   <Shield size={12} /> Includes standard protection and 24/7
//                   support
//                 </p>
//               </div>

//               {/* Card Body */}
//               <div className="p-8 space-y-6">
//                 {isSeatListing && (
//                   <div
//                     className={`p-4 rounded-2xl border flex items-center justify-between ${
//                       isSoldOut
//                         ? "bg-rose-50 border-rose-100 text-rose-700"
//                         : "bg-emerald-50 border-emerald-100 text-emerald-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <Users
//                         className={
//                           isSoldOut ? "text-rose-500" : "text-emerald-500"
//                         }
//                       />
//                       <span className="font-bold">Seats Left</span>
//                     </div>
//                     <span className="text-2xl font-black">
//                       {listing.availableSeats}
//                     </span>
//                   </div>
//                 )}

//                 {!isSeatListing && (
//                   <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center gap-3">
//                     <Calendar className="text-blue-500" />
//                     <span className="font-bold">Available Now</span>
//                   </div>
//                 )}

//                 <div className="space-y-3">
//                   <button
//                     onClick={() => setShowBooking(true)}
//                     disabled={isSoldOut}
//                     className={`group relative w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg ${
//                       isSoldOut
//                         ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                         : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25 shadow-blue-500/10"
//                     }`}
//                   >
//                     <span className="relative z-10">
//                       {!isSeatListing
//                         ? "Reserve Vehicle"
//                         : isSoldOut
//                           ? "Fully Booked"
//                           : "Book My Seat"}
//                     </span>
//                     {!isSoldOut && (
//                       <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
//                     )}
//                   </button>

//                   {!isSeatListing && (
//                     <button
//                       onClick={() => setShowVisit(true)}
//                       className="w-full py-4 rounded-2xl text-base font-bold text-blue-600 bg-white border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
//                     >
//                       Schedule Visit / Test
//                     </button>
//                   )}
//                 </div>

//                 <div className="pt-6 border-t border-slate-100 space-y-4">
//                   <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
//                     <CheckCircle size={16} className="text-emerald-500" />
//                     No hidden fees or charges
//                   </div>
//                   <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
//                     <CheckCircle size={16} className="text-emerald-500" />
//                     Secure payment processing
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sub-card: Host Info */}
//             <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
//               <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl uppercase">
//                 {(listing.owner?.name || listing.ownerName || "O")[0]}
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
//                   Owned By
//                 </p>
//                 <p className="font-bold text-slate-900">
//                   {listing.owner?.name ||
//                     listing.ownerName ||
//                     "Verified Partner"}
//                 </p>
//               </div>
//               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
//                 <Shield size={20} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Mobile Fixed CTA */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-full duration-500">
//         <div>
//           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
//             Total
//           </p>
//           <p className="text-2xl font-black text-slate-900">
//             Rs. {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//           </p>
//         </div>
//         <button
//           onClick={() => setShowBooking(true)}
//           disabled={isSoldOut}
//           className={`flex-1 max-w-[200px] py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
//             isSoldOut
//               ? "bg-slate-200 text-slate-500"
//               : "bg-blue-600 text-white shadow-blue-500/20"
//           }`}
//         >
//           {isSoldOut ? "Sold Out" : "Book Now"}
//         </button>
//       </div>

//       {/* Modals */}
//       {showBooking && (
//         <BookingModal
//           listing={listing}
//           onClose={() => setShowBooking(false)}
//           onSuccess={(booking) => {
//             setShowBooking(false);
//             toast.success("Booking requested! Waiting for owner approval.");
//             navigate("/dashboard/profile?tab=bookings");
//           }}
//         />
//       )}
//       {showVisit && (
//         <VisitModal listing={listing} onClose={() => setShowVisit(false)} />
//       )}
//       {showPayment && currentBooking && (
//         <PaymentMethodModal
//           isOpen={showPayment}
//           onClose={() => setShowPayment(false)}
//           bookingId={currentBooking._id}
//           totalPrice={currentBooking.totalPrice}
//           onComplete={() => navigate("/dashboard/profile?tab=bookings")}
//         />
//       )}

//       {/* Spacer for mobile footer */}
//       <div className="h-24 lg:hidden"></div>
//     </div>
//   );
// };

// /* Helper Components */
// const SpecCard = ({ icon, label, value }) => (
//   <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
//     <div className="p-2 bg-white rounded-xl w-fit shadow-sm mb-3 group-hover:scale-110 transition-transform">
//       {icon}
//     </div>
//     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">
//       {label}
//     </p>
//     <p className="text-slate-900 font-bold truncate">{value || "—"}</p>
//   </div>
// );

// const FeatureChip = ({ icon, label }) => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-default text-sm font-semibold text-slate-700">
//     <span className="text-blue-500">{icon}</span>
//     {label}
//   </div>
// );

// export default ListingDetails;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Car,
//   Users,
//   MapPin,
//   Fuel,
//   Settings,
//   Calendar,
//   ArrowLeft,
//   Star,
//   Shield,
//   Sparkles,
//   Clock,
//   CheckCircle,
//   Share2,
//   Heart,
//   Navigation,
//   Battery,
//   Palette,
//   Bluetooth,
//   Music,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import BookingModal from "../../components/BookingModal";
// import VisitModal from "../../components/VisitModal";
// import PaymentMethodModal from "../../components/bookings/PaymentMethodModal";
// import Navbar from "../../components/Navbar";
// import ReviewCard from "../../components/reviews/ReviewCard";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix leaflet marker icon issue in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const BACKEND_URL = "http://localhost:5000";

// const Skeleton = ({ className }) => (
//   <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`}></div>
// );

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showBooking, setShowBooking] = useState(false);
//   const [showVisit, setShowVisit] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isDescExpanded, setIsDescExpanded] = useState(false);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchListingAndReviews = async () => {
//       try {
//         const [listingRes, reviewsRes] = await Promise.all([
//           api.get(`/listings/${id}`),
//           api.get(`/reviews/listing/${id}`),
//         ]);
//         setListing(listingRes.data);
//         setReviews(reviewsRes.data);
//       } catch (err) {
//         toast.error("Listing not found");
//         navigate("/listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListingAndReviews();
//     window.scrollTo(0, 0);
//   }, [id, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
//           <Skeleton className="w-32 h-6 mb-8" />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="space-y-6">
//               <Skeleton className="w-full h-[450px]" />
//               <div className="grid grid-cols-4 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-24" />
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-8">
//               <Skeleton className="w-3/4 h-10" />
//               <Skeleton className="w-1/2 h-6" />
//               <Skeleton className="w-full h-40" />
//               <div className="grid grid-cols-2 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-20" />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!listing) return null;

//   const isSeatListing = listing.listingType === "seats";
//   const isSoldOut = isSeatListing && Number(listing.availableSeats) === 0;
//   const description =
//     listing.description ||
//     "No description provided. This vehicle is well-maintained and ready for your next adventure. Experience comfort, safety, and reliability with this premium rental.";
//   const shouldTruncate = description.length > 300;
//   const displayedDescription = isDescExpanded
//     ? description
//     : description.slice(0, 300) + (shouldTruncate ? "..." : "");

//   return (
//     <div className="min-h-screen bg-slate-50/50">
//       <Navbar />

//       <main className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16 pt-20 lg:pt-36">
//         {/* Breadcrumb & Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group"
//           >
//             <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
//               <ArrowLeft size={20} />
//             </div>
//             Back to explore
//           </button>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsFavorite(!isFavorite)}
//               className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group"
//             >
//               <Heart
//                 size={18}
//                 className={`${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-500"} transition-colors`}
//               />
//               <span className="text-sm font-semibold text-slate-700">Save</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group">
//               <Share2
//                 size={18}
//                 className="text-slate-400 group-hover:text-blue-600 transition-colors"
//               />
//               <span className="text-sm font-semibold text-slate-700">
//                 Share
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
//           {/* Main Content Area (8 Columns) */}
//           <div className="lg:col-span-8 space-y-10">
//             {/* Gallery Section */}
//             <section className="space-y-4">
//               <div className="relative group overflow-hidden rounded-[2.5rem] shadow-2xl bg-slate-200">
//                 <img
//                   src={
//                     listing.photos?.length
//                       ? `${BACKEND_URL}${listing.photos[selectedImage]}`
//                       : "/placeholder-car.jpg"
//                   }
//                   alt={listing.name}
//                   className="w-full h-[400px] md:h-[500px] lg:h-[600px] object-cover transition-transform duration-700 group-hover:scale-105"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60"></div>

//                 {/* Status Badges */}
//                 <div className="absolute top-6 left-6 flex flex-wrap gap-2">
//                   <div
//                     className={`px-4 py-2 rounded-full backdrop-blur-md shadow-lg flex items-center gap-2 border border-white/20 text-white font-bold text-sm ${
//                       listing.listingType === "full"
//                         ? "bg-blue-500/80"
//                         : "bg-emerald-500/80"
//                     }`}
//                   >
//                     {listing.listingType === "full" ? (
//                       <Car size={16} />
//                     ) : (
//                       <Users size={16} />
//                     )}
//                     {listing.listingType === "full"
//                       ? "Exclusive Rental"
//                       : "Smart Ride Share"}
//                   </div>
//                   <div className="px-4 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg flex items-center gap-2 border border-slate-100 text-slate-800 font-bold text-sm">
//                     <Shield size={16} className="text-blue-500" />
//                     Verified Listing
//                   </div>
//                 </div>

//                 {/* Instant Booking Badge */}
//                 <div className="absolute bottom-6 left-6 px-4 py-2 rounded-xl bg-amber-400/90 backdrop-blur-sm text-amber-950 font-bold text-xs flex items-center gap-2 shadow-lg">
//                   <Sparkles size={14} />
//                   Top Rated Choice
//                 </div>
//               </div>

//               {/* Thumbnails */}
//               {listing.photos?.length > 1 && (
//                 <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
//                   {listing.photos.map((photo, i) => (
//                     <button
//                       key={i}
//                       onClick={() => setSelectedImage(i)}
//                       className={`relative min-w-[100px] h-20 rounded-2xl overflow-hidden border-2 transition-all duration-300 shrink-0 ${
//                         selectedImage === i
//                           ? "border-blue-500 ring-4 ring-blue-100 scale-95"
//                           : "border-transparent hover:border-slate-300"
//                       }`}
//                     >
//                       <img
//                         src={`${BACKEND_URL}${photo}`}
//                         alt=""
//                         className="w-full h-full object-cover"
//                       />
//                       {selectedImage !== i && (
//                         <div className="absolute inset-0 bg-black/10"></div>
//                       )}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </section>

//             {/* Vehicle Info Section */}
//             <section className="space-y-8 bg-white rounded-[2.5rem] p-8 md:p-10 border border-slate-100 shadow-sm">
//               <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-100">
//                 <div className="space-y-2">
//                   <div className="flex items-center gap-2">
//                     <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
//                     <span className="font-bold text-slate-900">
//                       {listing.averageRating > 0
//                         ? listing.averageRating
//                         : "New"}
//                     </span>
//                     {listing.reviewCount > 0 ? (
//                       <span className="text-slate-400 font-medium">
//                         ({listing.reviewCount} reviews)
//                       </span>
//                     ) : (
//                       <span className="text-slate-400 font-medium">
//                         (No reviews yet)
//                       </span>
//                     )}
//                     <span className="text-slate-200 mx-1">•</span>
//                     <span className="text-blue-600 font-semibold text-sm">
//                       Most Popular
//                     </span>
//                   </div>
//                   <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight">
//                     {listing.name}
//                   </h1>
//                   <p className="text-xl text-slate-500 font-medium">
//                     {listing.brand} {listing.model} • Series {listing.year}
//                   </p>
//                 </div>

//                 <div className="flex items-center gap-4 text-slate-600">
//                   <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
//                     <Clock size={18} className="text-blue-500" />
//                     <span className="text-sm font-semibold tracking-wide uppercase">
//                       Fast Booking
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 rounded-2xl border border-slate-100">
//                     <CheckCircle size={18} className="text-emerald-500" />
//                     <span className="text-sm font-semibold tracking-wide uppercase">
//                       Free Cancellation
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Specifications Grid */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//                 <SpecCard
//                   icon={<Fuel className="text-blue-500" />}
//                   label="Engine"
//                   value={listing.fuelType}
//                 />
//                 <SpecCard
//                   icon={<Settings className="text-purple-500" />}
//                   label="Drive"
//                   value={listing.transmission}
//                 />
//                 <SpecCard
//                   icon={<Users className="text-emerald-500" />}
//                   label="Capacity"
//                   value={`${listing.seats} Seats`}
//                 />
//                 {listing.listingType === "full" ? (
//                   <SpecCard
//                     icon={<MapPin className="text-rose-500" />}
//                     label="Location"
//                     value={listing.location}
//                   />
//                 ) : (
//                   <SpecCard
//                     icon={<Navigation className="text-cyan-500" />}
//                     label="Route"
//                     value={`${listing.departure} → ${listing.destination}`}
//                   />
//                 )}
//               </div>

//               {/* Description */}
//               <div className="space-y-4">
//                 <h3 className="text-2xl font-bold text-slate-900">
//                   Experience this Ride
//                 </h3>
//                 <div className="prose prose-slate max-w-none">
//                   <p className="text-slate-600 leading-[1.8] text-lg">
//                     {displayedDescription}
//                   </p>
//                 </div>
//                 {shouldTruncate && (
//                   <button
//                     onClick={() => setIsDescExpanded(!isDescExpanded)}
//                     className="flex items-center gap-1 text-blue-600 font-bold hover:text-blue-700 transition-colors"
//                   >
//                     {isDescExpanded ? (
//                       <>
//                         Read Less <ChevronUp size={18} />
//                       </>
//                     ) : (
//                       <>
//                         Read More <ChevronDown size={18} />
//                       </>
//                     )}
//                   </button>
//                 )}
//               </div>

//               {/* Features Chips */}
//               <div className="space-y-4 pt-4 border-t border-slate-100">
//                 <h3 className="text-xl font-bold text-slate-900">
//                   Premium Features
//                 </h3>
//                 <div className="flex flex-wrap gap-3">
//                   <FeatureChip
//                     icon={<Bluetooth size={16} />}
//                     label="Seamless Bluetooth"
//                   />
//                   <FeatureChip
//                     icon={<Music size={16} />}
//                     label="Surround Sound"
//                   />
//                   <FeatureChip
//                     icon={<Navigation size={16} />}
//                     label="GPS Navigation"
//                   />
//                   <FeatureChip
//                     icon={<Battery size={16} />}
//                     label="Eco Friendly"
//                   />
//                   <FeatureChip
//                     icon={<Palette size={16} />}
//                     label="Leather Interior"
//                   />
//                 </div>
//               </div>

//               {/* Pickup Location Map */}
//               {listing.latitude && listing.longitude && (
//                 <div className="space-y-4 pt-8 border-t border-slate-100">
//                   <h3 className="text-2xl font-bold text-slate-900">
//                     Pickup Location
//                   </h3>
//                   <div className="h-[300px] w-full rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm relative z-0">
//                     <MapContainer
//                       center={[listing.latitude, listing.longitude]}
//                       zoom={14}
//                       scrollWheelZoom={false}
//                       className="h-full w-full"
//                     >
//                       <TileLayer
//                         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                       />
//                       <Marker position={[listing.latitude, listing.longitude]}>
//                         <Popup>{listing.location || "Vehicle Location"}</Popup>
//                       </Marker>
//                     </MapContainer>
//                   </div>
//                   {listing.location && (
//                     <p className="text-slate-600 font-medium text-base flex items-center gap-2 mt-4 ml-2">
//                       <MapPin size={18} className="text-rose-500" />{" "}
//                       {listing.location}
//                     </p>
//                   )}
//                 </div>
//               )}

//               {/* Reviews Section */}
//               <div className="space-y-6 pt-8 border-t border-slate-100">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <h3 className="text-2xl font-bold text-slate-900">
//                       Guest Reviews
//                     </h3>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
//                       <span className="font-bold text-lg text-slate-900">
//                         {listing.averageRating > 0
//                           ? listing.averageRating
//                           : "New"}
//                       </span>
//                       {listing.reviewCount > 0 && (
//                         <span className="text-slate-500 font-medium">
//                           ({listing.reviewCount} reviews)
//                         </span>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {reviews.length > 0 ? (
//                   <div className="grid grid-cols-1 gap-4">
//                     {reviews.map((review) => (
//                       <ReviewCard key={review._id} review={review} />
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="text-center py-10 bg-slate-50 rounded-3xl border border-slate-100">
//                     <Star className="w-12 h-12 text-slate-300 mx-auto mb-3" />
//                     <h4 className="text-lg font-bold text-slate-900 mb-1">
//                       No reviews yet
//                     </h4>
//                     <p className="text-slate-500 text-sm">
//                       Be the first to share your experience after booking!
//                     </p>
//                   </div>
//                 )}
//               </div>
//             </section>
//           </div>

//           {/* Sidebar Booking Card (4 Columns) */}
//           <div className="lg:col-span-4 lg:sticky lg:top-24 space-y-6">
//             <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden shadow-blue-900/5">
//               {/* Card Header Pricing */}
//               <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 p-8 text-white">
//                 <div className="flex items-center justify-between mb-2">
//                   <span className="text-slate-400 font-semibold uppercase tracking-widest text-xs">
//                     Premium Price
//                   </span>
//                   <Sparkles className="text-amber-400" size={20} />
//                 </div>
//                 <div className="flex items-baseline gap-2">
//                   <span className="text-5xl font-black">
//                     Rs.{" "}
//                     {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//                   </span>
//                   <span className="text-slate-400 font-medium text-lg">
//                     / {isSeatListing ? "seat" : "day"}
//                   </span>
//                 </div>
//                 <p className="text-slate-500 text-xs mt-4 flex items-center gap-2">
//                   <Shield size={12} /> Includes standard protection and 24/7
//                   support
//                 </p>
//               </div>

//               {/* Card Body */}
//               <div className="p-8 space-y-6">
//                 {isSeatListing && (
//                   <div
//                     className={`p-4 rounded-2xl border flex items-center justify-between ${
//                       isSoldOut
//                         ? "bg-rose-50 border-rose-100 text-rose-700"
//                         : "bg-emerald-50 border-emerald-100 text-emerald-700"
//                     }`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <Users
//                         className={
//                           isSoldOut ? "text-rose-500" : "text-emerald-500"
//                         }
//                       />
//                       <span className="font-bold">Seats Left</span>
//                     </div>
//                     <span className="text-2xl font-black">
//                       {listing.availableSeats}
//                     </span>
//                   </div>
//                 )}

//                 {!isSeatListing && (
//                   <div className="p-4 rounded-2xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center gap-3">
//                     <Calendar className="text-blue-500" />
//                     <span className="font-bold">Available Now</span>
//                   </div>
//                 )}

//                 <div className="space-y-3">
//                   <button
//                     onClick={() => setShowBooking(true)}
//                     disabled={isSoldOut}
//                     className={`group relative w-full py-5 rounded-2xl text-xl font-bold transition-all duration-300 transform active:scale-95 shadow-lg ${
//                       isSoldOut
//                         ? "bg-slate-100 text-slate-400 cursor-not-allowed"
//                         : "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/25 shadow-blue-500/10"
//                     }`}
//                   >
//                     <span className="relative z-10">
//                       {!isSeatListing
//                         ? "Reserve Vehicle"
//                         : isSoldOut
//                           ? "Fully Booked"
//                           : "Book My Seat"}
//                     </span>
//                     {!isSoldOut && (
//                       <div className="absolute inset-x-0 bottom-0 h-1 bg-white/20 scale-x-0 group-hover:scale-x-100 transition-transform origin-center"></div>
//                     )}
//                   </button>

//                   {!isSeatListing && (
//                     <button
//                       onClick={() => setShowVisit(true)}
//                       className="w-full py-4 rounded-2xl text-base font-bold text-blue-600 bg-white border-2 border-blue-100 hover:border-blue-600 hover:bg-blue-50 transition-all duration-300"
//                     >
//                       Schedule Visit / Test
//                     </button>
//                   )}
//                 </div>

//                 <div className="pt-6 border-t border-slate-100 space-y-4">
//                   <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
//                     <CheckCircle size={16} className="text-emerald-500" />
//                     No hidden fees or charges
//                   </div>
//                   <div className="flex items-center gap-3 text-sm font-medium text-slate-500">
//                     <CheckCircle size={16} className="text-emerald-500" />
//                     Secure payment processing
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Sub-card: Host Info */}
//             <div className="bg-white rounded-[2rem] p-6 border border-slate-200 shadow-sm flex items-center gap-4">
//               <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl uppercase">
//                 {(listing.owner?.name || listing.ownerName || "O")[0]}
//               </div>
//               <div className="flex-1">
//                 <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
//                   Owned By
//                 </p>
//                 <p className="font-bold text-slate-900">
//                   {listing.owner?.name ||
//                     listing.ownerName ||
//                     "Verified Partner"}
//                 </p>
//               </div>
//               <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl">
//                 <Shield size={20} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Mobile Fixed CTA */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-full duration-500">
//         <div>
//           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
//             Total
//           </p>
//           <p className="text-2xl font-black text-slate-900">
//             Rs. {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//           </p>
//         </div>
//         <button
//           onClick={() => setShowBooking(true)}
//           disabled={isSoldOut}
//           className={`flex-1 max-w-[200px] py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
//             isSoldOut
//               ? "bg-slate-200 text-slate-500"
//               : "bg-blue-600 text-white shadow-blue-500/20"
//           }`}
//         >
//           {isSoldOut ? "Sold Out" : "Book Now"}
//         </button>
//       </div>

//       {/* Modals */}
//       {showBooking && (
//         <BookingModal
//           listing={listing}
//           onClose={() => setShowBooking(false)}
//           onSuccess={(booking) => {
//             setShowBooking(false);
//             toast.success("Booking requested! Waiting for owner approval.");
//             navigate("/dashboard/profile?tab=bookings");
//           }}
//         />
//       )}
//       {showVisit && (
//         <VisitModal listing={listing} onClose={() => setShowVisit(false)} />
//       )}
//       {showPayment && currentBooking && (
//         <PaymentMethodModal
//           isOpen={showPayment}
//           onClose={() => setShowPayment(false)}
//           bookingId={currentBooking._id}
//           totalPrice={currentBooking.totalPrice}
//           onComplete={() => navigate("/dashboard/profile?tab=bookings")}
//         />
//       )}

//       {/* Spacer for mobile footer */}
//       <div className="h-24 lg:hidden"></div>
//     </div>
//   );
// };

// /* Helper Components */
// const SpecCard = ({ icon, label, value }) => (
//   <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
//     <div className="p-2 bg-white rounded-xl w-fit shadow-sm mb-3 group-hover:scale-110 transition-transform">
//       {icon}
//     </div>
//     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">
//       {label}
//     </p>
//     <p className="text-slate-900 font-bold truncate">{value || "—"}</p>
//   </div>
// );

// const FeatureChip = ({ icon, label }) => (
//   <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all cursor-default text-sm font-semibold text-slate-700">
//     <span className="text-blue-500">{icon}</span>
//     {label}
//   </div>
// );

// export default ListingDetails;

// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Car,
//   Users,
//   MapPin,
//   Fuel,
//   Settings,
//   Calendar,
//   ArrowLeft,
//   Star,
//   Shield,
//   Sparkles,
//   Clock,
//   CheckCircle,
//   Share2,
//   Heart,
//   Navigation,
//   Battery,
//   Palette,
//   Bluetooth,
//   Music,
//   ChevronDown,
//   ChevronUp,
// } from "lucide-react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import BookingModal from "../../components/BookingModal";
// import VisitModal from "../../components/VisitModal";
// import PaymentMethodModal from "../../components/bookings/PaymentMethodModal";
// import Navbar from "../../components/Navbar";
// import ReviewCard from "../../components/reviews/ReviewCard";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import "leaflet/dist/leaflet.css";
// import L from "leaflet";

// // Fix leaflet marker icon issue in React
// delete L.Icon.Default.prototype._getIconUrl;
// L.Icon.Default.mergeOptions({
//   iconRetinaUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
//   iconUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
//   shadowUrl:
//     "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
// });

// const BACKEND_URL = "http://localhost:5000";

// const Skeleton = ({ className }) => (
//   <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`}></div>
// );

// const ListingDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [showBooking, setShowBooking] = useState(false);
//   const [showVisit, setShowVisit] = useState(false);
//   const [showPayment, setShowPayment] = useState(false);
//   const [currentBooking, setCurrentBooking] = useState(null);
//   const [selectedImage, setSelectedImage] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [isDescExpanded, setIsDescExpanded] = useState(false);
//   const [reviews, setReviews] = useState([]);

//   useEffect(() => {
//     const fetchListingAndReviews = async () => {
//       try {
//         const [listingRes, reviewsRes] = await Promise.all([
//           api.get(`/listings/${id}`),
//           api.get(`/reviews/listing/${id}`),
//         ]);
//         setListing(listingRes.data);
//         setReviews(reviewsRes.data);
//       } catch (err) {
//         toast.error("Listing not found");
//         navigate("/listings");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListingAndReviews();
//     window.scrollTo(0, 0);
//   }, [id, navigate]);

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-white">
//         <Navbar />
//         <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
//           <Skeleton className="w-32 h-6 mb-8" />
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//             <div className="space-y-6">
//               <Skeleton className="w-full h-[450px]" />
//               <div className="grid grid-cols-4 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-24" />
//                 ))}
//               </div>
//             </div>
//             <div className="space-y-8">
//               <Skeleton className="w-3/4 h-10" />
//               <Skeleton className="w-1/2 h-6" />
//               <Skeleton className="w-full h-40" />
//               <div className="grid grid-cols-2 gap-4">
//                 {[1, 2, 3, 4].map((i) => (
//                   <Skeleton key={i} className="h-20" />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (!listing) return null;

//   const isSeatListing = listing.listingType === "seats";
//   const isSoldOut = isSeatListing && Number(listing.availableSeats) === 0;
//   const description =
//     listing.description ||
//     "No description provided. This vehicle is well-maintained and ready for your next adventure. Experience comfort, safety, and reliability with this premium rental.";
//   const shouldTruncate = description.length > 300;
//   const displayedDescription = isDescExpanded
//     ? description
//     : description.slice(0, 300) + (shouldTruncate ? "..." : "");

//   return (
//     <div className="min-h-screen bg-slate-50/50">
//       <Navbar />

//       <main className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16 pt-20 lg:pt-36">
//         {/* Breadcrumb & Actions */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-10 gap-4">
//           <button
//             onClick={() => navigate(-1)}
//             className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group"
//           >
//             <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
//               <ArrowLeft size={20} />
//             </div>
//             Back to explore
//           </button>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => setIsFavorite(!isFavorite)}
//               className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group"
//             >
//               <Heart
//                 size={18}
//                 className={`${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-500"} transition-colors`}
//               />
//               <span className="text-sm font-semibold text-slate-700">Save</span>
//             </button>
//             <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group">
//               <Share2
//                 size={18}
//                 className="text-slate-400 group-hover:text-blue-600 transition-colors"
//               />
//               <span className="text-sm font-semibold text-slate-700">
//                 Share
//               </span>
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
//           {/* Main Content Area (8 Columns) */}
//           <div className="lg:col-span-8">
//             {/* Header & Gallery Section */}
//             <section className="mb-8">
//               <div className="mb-6">
//                 <h1 className="text-[32px] leading-tight font-semibold text-slate-900">
//                   {listing.name}
//                 </h1>
//                 <div className="flex items-center flex-wrap gap-2 mt-2 text-[15px] text-slate-700">
//                   <Star className="w-4 h-4 fill-slate-900 text-slate-900" />
//                   <span className="font-semibold">
//                     {listing.averageRating > 0 ? listing.averageRating : "New"}
//                   </span>
//                   {listing.reviewCount > 0 && (
//                     <span className="underline font-semibold">
//                       ({listing.reviewCount} reviews)
//                     </span>
//                   )}
//                   <span>·</span>
//                   <span className="flex items-center gap-1 font-semibold underline">
//                     {listing.location || "Location not specified"}
//                   </span>
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 md:grid-cols-2 gap-2 rounded-2xl overflow-hidden h-[300px] md:h-[400px]">
//                 {/* Main image */}
//                 <div
//                   className="w-full h-full relative group cursor-pointer"
//                   onClick={() => setSelectedImage(0)}
//                 >
//                   <img
//                     src={
//                       listing.photos?.length
//                         ? `${BACKEND_URL}${listing.photos[0]}`
//                         : "/placeholder-car.jpg"
//                     }
//                     className="w-full h-full object-cover hover:opacity-90 transition-opacity"
//                     alt="Main"
//                   />
//                 </div>
//                 {/* Thumbnails grid */}
//                 <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-2 h-full">
//                   {listing.photos?.slice(1, 5).map((p, i) => (
//                     <div
//                       key={i}
//                       className="w-full h-full relative group cursor-pointer"
//                       onClick={() => setSelectedImage(i + 1)}
//                     >
//                       <img
//                         src={`${BACKEND_URL}${p}`}
//                         className="w-full h-full object-cover hover:opacity-90 transition-opacity"
//                         alt={`Thumbnail ${i + 1}`}
//                       />
//                     </div>
//                   ))}
//                   {/* Fill empty spots if less than 5 photos */}
//                   {(!listing.photos || listing.photos.length < 5) &&
//                     Array.from({
//                       length: 5 - (listing.photos?.length || 1),
//                     }).map((_, i) => (
//                       <div
//                         key={`empty-${i}`}
//                         className="w-full h-full bg-slate-100 border border-slate-200"
//                       ></div>
//                     ))}
//                 </div>
//               </div>
//             </section>

//             {/* Host & Specs */}
//             <div className="flex justify-between items-center py-6 border-b border-slate-200">
//               <div>
//                 <h2 className="text-xl font-semibold text-slate-900">
//                   {listing.listingType === "full"
//                     ? "Entire vehicle"
//                     : "Shared ride"}{" "}
//                   hosted by{" "}
//                   {listing.owner?.name || listing.ownerName || "Prasana"}
//                 </h2>
//                 <div className="flex items-center flex-wrap gap-1.5 mt-1 text-[15px] text-slate-600">
//                   <span>{listing.seats} seats</span>
//                   <span>·</span>
//                   <span>{listing.transmission || "Automatic"}</span>
//                   <span>·</span>
//                   <span>{listing.fuelType || "Gasoline"}</span>
//                   <span>·</span>
//                   <span>{listing.brand}</span>
//                 </div>
//               </div>
//               <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-xl font-semibold text-white uppercase overflow-hidden shrink-0">
//                 {(listing.owner?.name || listing.ownerName || "P")[0]}
//               </div>
//             </div>

//             {/* Highlights */}
//             <div className="py-8 border-b border-slate-200 space-y-6">
//               <div className="flex items-start gap-4">
//                 <Navigation
//                   size={28}
//                   className="text-slate-800"
//                   strokeWidth={1.5}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-slate-900 text-base">
//                     Perfect for your trip
//                   </h3>
//                   <p className="text-slate-500 text-[15px] leading-snug mt-0.5">
//                     Highly rated for city rides and weekend getaways.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <CheckCircle
//                   size={28}
//                   className="text-slate-800"
//                   strokeWidth={1.5}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-slate-900 text-base">
//                     Free cancellation
//                   </h3>
//                   <p className="text-slate-500 text-[15px] leading-snug mt-0.5">
//                     Cancel for a full refund up to 24 hours before your trip.
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-start gap-4">
//                 <Shield
//                   size={28}
//                   className="text-slate-800"
//                   strokeWidth={1.5}
//                 />
//                 <div>
//                   <h3 className="font-semibold text-slate-900 text-base">
//                     Verified and Insured
//                   </h3>
//                   <p className="text-slate-500 text-[15px] leading-snug mt-0.5">
//                     This vehicle includes standard insurance and Jaum support.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Description */}
//             <div className="py-8 border-b border-slate-200 space-y-4">
//               <h2 className="text-xl font-semibold text-slate-900">
//                 About this vehicle
//               </h2>
//               <div className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-line">
//                 {displayedDescription}
//               </div>
//               {shouldTruncate && (
//                 <button
//                   onClick={() => setIsDescExpanded(!isDescExpanded)}
//                   className="font-semibold text-slate-900 underline hover:text-slate-600 transition-colors mt-2"
//                 >
//                   {isDescExpanded ? "Show less" : "Show more"}
//                 </button>
//               )}
//             </div>

//             {/* Features Section */}
//             <div className="py-8 border-b border-slate-200 space-y-6">
//               <h2 className="text-xl font-semibold text-slate-900">
//                 What this vehicle offers
//               </h2>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
//                 <div className="flex items-center gap-3 text-slate-700 text-[15px]">
//                   <Bluetooth size={24} strokeWidth={1.5} /> Seamless Bluetooth
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-700 text-[15px]">
//                   <Music size={24} strokeWidth={1.5} /> Surround Sound
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-700 text-[15px]">
//                   <Navigation size={24} strokeWidth={1.5} /> GPS Navigation
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-700 text-[15px]">
//                   <Battery size={24} strokeWidth={1.5} /> Eco Friendly
//                 </div>
//                 <div className="flex items-center gap-3 text-slate-700 text-[15px]">
//                   <Palette size={24} strokeWidth={1.5} /> Leather Interior
//                 </div>
//               </div>
//             </div>

//             {/* Map Section */}
//             {listing.latitude && listing.longitude && (
//               <div className="py-8 border-b border-slate-200 space-y-6">
//                 <h2 className="text-xl font-semibold text-slate-900">
//                   Where you'll be
//                 </h2>
//                 <div className="h-[320px] w-full rounded-2xl overflow-hidden relative z-0">
//                   <MapContainer
//                     center={[listing.latitude, listing.longitude]}
//                     zoom={14}
//                     scrollWheelZoom={false}
//                     className="h-full w-full"
//                   >
//                     <TileLayer
//                       url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//                       attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//                     />
//                     <Marker position={[listing.latitude, listing.longitude]}>
//                       <Popup>{listing.location || "Vehicle Location"}</Popup>
//                     </Marker>
//                   </MapContainer>
//                 </div>
//                 {listing.location && (
//                   <p className="text-slate-900 font-semibold text-[15px]">
//                     {listing.location}
//                   </p>
//                 )}
//                 <p className="text-slate-600 text-[15px]">
//                   Exact location provided after booking.
//                 </p>
//               </div>
//             )}

//             {/* Reviews Section */}
//             <div className="py-8 space-y-8">
//               <div className="flex items-center gap-2">
//                 <Star className="w-5 h-5 fill-slate-900 text-slate-900" />
//                 <h2 className="text-xl font-semibold text-slate-900">
//                   {listing.averageRating > 0
//                     ? `${listing.averageRating} · ${listing.reviewCount} reviews`
//                     : "No reviews (yet)"}
//                 </h2>
//               </div>

//               {reviews.length > 0 ? (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
//                   {reviews.map((review) => (
//                     <ReviewCard key={review._id} review={review} />
//                   ))}
//                 </div>
//               ) : (
//                 <div className="text-slate-600 text-[15px]">
//                   This vehicle doesn't have any reviews yet. Be the first to
//                   review after your trip!
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Sidebar Booking Card */}
//           <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 mb-12">
//             <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6">
//               {/* Pricing */}
//               <div className="flex items-baseline gap-1 mb-6">
//                 <span className="text-[22px] font-semibold text-slate-900">
//                   Rs.{" "}
//                   {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//                 </span>
//                 <span className="text-slate-600 text-[15px]">
//                   / {isSeatListing ? "seat" : "day"}
//                 </span>
//               </div>

//               <div className="space-y-4">
//                 {isSeatListing && (
//                   <div className="p-3 rounded-lg border border-slate-300 text-slate-900 flex items-center justify-between">
//                     <span className="text-sm font-semibold uppercase tracking-wider text-slate-600">
//                       Seats Left
//                     </span>
//                     <span className="font-semibold">
//                       {listing.availableSeats}
//                     </span>
//                   </div>
//                 )}

//                 <button
//                   onClick={() => setShowBooking(true)}
//                   disabled={isSoldOut}
//                   className={`w-full py-3.5 rounded-lg text-base font-semibold transition-colors ${
//                     isSoldOut
//                       ? "bg-slate-200 text-slate-400 cursor-not-allowed"
//                       : "bg-[#e51d53] text-white hover:bg-[#d4164b]" // Using an Airbnb-style reddish pink for CTA
//                   }`}
//                 >
//                   {!isSeatListing
//                     ? "Reserve"
//                     : isSoldOut
//                       ? "Sold Out"
//                       : "Book Seat"}
//                 </button>

//                 <p className="text-center text-sm text-slate-500 font-medium">
//                   You won't be charged yet
//                 </p>

//                 {!isSeatListing && (
//                   <button
//                     onClick={() => setShowVisit(true)}
//                     className="w-full py-3.5 mt-2 rounded-lg text-base font-semibold text-slate-900 border border-slate-900 hover:bg-slate-50 transition-colors"
//                   >
//                     Schedule Visit
//                   </button>
//                 )}
//               </div>

//               {/* Price Breakdown Preview */}
//               <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
//                 <div className="flex justify-between text-[15px] text-slate-600 underline">
//                   <span>
//                     Rs.{" "}
//                     {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}{" "}
//                     x 1 {isSeatListing ? "seat" : "day"}
//                   </span>
//                   <span>
//                     Rs.{" "}
//                     {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//                   </span>
//                 </div>
//                 <div className="flex justify-between text-[15px] text-slate-600 underline">
//                   <span>Jaum service fee</span>
//                   <span>Rs. 0</span>
//                 </div>
//                 <div className="flex justify-between font-semibold text-[15px] text-slate-900 pt-4 border-t border-slate-200">
//                   <span>Total</span>
//                   <span>
//                     Rs.{" "}
//                     {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//                   </span>
//                 </div>
//               </div>
//             </div>

//             {/* Small Trust indicator below card */}
//             <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
//               <Shield size={16} />
//               <span>Book with confidence on Jaum</span>
//             </div>
//           </div>
//         </div>
//       </main>

//       {/* Mobile Fixed CTA */}
//       <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-full duration-500">
//         <div>
//           <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
//             Total
//           </p>
//           <p className="text-2xl font-black text-slate-900">
//             Rs. {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
//           </p>
//         </div>
//         <button
//           onClick={() => setShowBooking(true)}
//           disabled={isSoldOut}
//           className={`flex-1 max-w-[200px] py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
//             isSoldOut
//               ? "bg-slate-200 text-slate-500"
//               : "bg-blue-600 text-white shadow-blue-500/20"
//           }`}
//         >
//           {isSoldOut ? "Sold Out" : "Book Now"}
//         </button>
//       </div>

//       {/* Modals */}
//       {showBooking && (
//         <BookingModal
//           listing={listing}
//           onClose={() => setShowBooking(false)}
//           onSuccess={(booking) => {
//             setShowBooking(false);
//             toast.success("Booking requested! Waiting for owner approval.");
//             navigate("/dashboard/profile?tab=bookings");
//           }}
//         />
//       )}
//       {showVisit && (
//         <VisitModal listing={listing} onClose={() => setShowVisit(false)} />
//       )}
//       {showPayment && currentBooking && (
//         <PaymentMethodModal
//           isOpen={showPayment}
//           onClose={() => setShowPayment(false)}
//           bookingId={currentBooking._id}
//           totalPrice={currentBooking.totalPrice}
//           onComplete={() => navigate("/dashboard/profile?tab=bookings")}
//         />
//       )}

//       {/* Spacer for mobile footer */}
//       <div className="h-24 lg:hidden"></div>
//     </div>
//   );
// };

// /* Helper Components */
// const SpecCard = ({ icon, label, value }) => (
//   <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
//     <div className="p-2 bg-white rounded-xl w-fit shadow-sm mb-3 group-hover:scale-110 transition-transform">
//       {icon}
//     </div>
//     <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">
//       {label}
//     </p>
//     <p className="text-slate-900 font-bold truncate">{value || "—"}</p>
//   </div>
// );

// const FeatureChip = ({ icon, label }) => (
//   <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/10 transition-all cursor-default text-sm font-bold text-slate-700">
//     <span className="text-blue-500">{icon}</span>
//     {label}
//   </div>
// );

// export default ListingDetails;

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Car,
  Users,
  MapPin,
  Fuel,
  Settings,
  Calendar,
  ArrowLeft,
  Star,
  Shield,
  Sparkles,
  Clock,
  CheckCircle,
  Share2,
  Heart,
  Navigation,
  Battery,
  Palette,
  Bluetooth,
  Music,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import BookingModal from "../../components/BookingModal";
import VisitModal from "../../components/VisitModal";
import PaymentMethodModal from "../../components/bookings/PaymentMethodModal";
import Navbar from "../../components/Navbar";
import ReviewCard from "../../components/reviews/ReviewCard";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet marker icon issue in React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const departureIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destinationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const BACKEND_URL = "https://jaum-t3no.onrender.com";

const Skeleton = ({ className }) => (
  <div className={`animate-pulse bg-slate-200 rounded-2xl ${className}`}></div>
);

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [showVisit, setShowVisit] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isDescExpanded, setIsDescExpanded] = useState(false);
  const [reviews, setReviews] = useState([]);

  // Swipe gesture support
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEndHandler = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

  const nextImage = () => {
    if (listing?.photos?.length) {
      setSelectedImage((prev) => (prev + 1) % listing.photos.length);
    }
  };

  const prevImage = () => {
    if (listing?.photos?.length) {
      setSelectedImage(
        (prev) => (prev - 1 + listing.photos.length) % listing.photos.length,
      );
    }
  };

  useEffect(() => {
    const fetchListingAndReviews = async () => {
      try {
        const [listingRes, reviewsRes] = await Promise.all([
          api.get(`/listings/${id}`),
          api.get(`/reviews/listing/${id}`),
        ]);
        setListing(listingRes.data);
        setReviews(reviewsRes.data);
      } catch (err) {
        toast.error("Listing not found");
        navigate("/listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListingAndReviews();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  const handleMessageOwner = async () => {
    try {
      const userStr = localStorage.getItem("user");
      if (!userStr) {
        toast.error("Please login to message the owner.");
        navigate("/login");
        return;
      }
      const user = JSON.parse(userStr);

      const ownerId = listing.owner?._id || listing.owner;
      if (!ownerId) {
        toast.error("Owner information not found.");
        return;
      }

      // Fallback check if user ID matches owner ID
      if (user._id === ownerId || user.id === ownerId) {
        toast.info("This is your own listing.");
        return;
      }

      const res = await api.post("/chat", {
        receiverId: ownerId,
        listingId: listing._id,
      });

      navigate("/dashboard/chat", {
        state: { activeConversation: res.data._id },
      });
    } catch (err) {
      toast.error("Failed to start conversation.");
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
          <Skeleton className="w-32 h-6 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
              <Skeleton className="w-full h-[450px]" />
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-24" />
                ))}
              </div>
            </div>
            <div className="space-y-8">
              <Skeleton className="w-3/4 h-10" />
              <Skeleton className="w-1/2 h-6" />
              <Skeleton className="w-full h-40" />
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-20" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const isSeatListing = listing.listingType === "seats";
  const isSoldOut = isSeatListing && Number(listing.availableSeats) === 0;
  const description =
    listing.description ||
    "No description provided. This vehicle is well-maintained and ready for your next adventure. Experience comfort, safety, and reliability with this premium rental.";
  const shouldTruncate = description.length > 300;
  const displayedDescription = isDescExpanded
    ? description
    : description.slice(0, 300) + (shouldTruncate ? "..." : "");

  return (
    <div className="min-h-screen bg-slate-50/50">
      <Navbar />
      <main className="relative max-w-7xl mx-auto px-4 py-12 lg:py-16 pt-20 lg:pt-25">
        {/* Breadcrumb & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-5 gap-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-medium transition-colors group"
          >
            <div className="p-2 rounded-full group-hover:bg-blue-50 transition-colors">
              <ArrowLeft size={20} />
            </div>
            Back to explore
          </button>

          {/* <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group"
            >
              <Heart
                size={18}
                className={`${isFavorite ? "fill-rose-500 text-rose-500" : "text-slate-400 group-hover:text-rose-500"} transition-colors`}
              />
              <span className="text-sm font-semibold text-slate-700">Save</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm hover:shadow-md transition-all active:scale-95 group">
              <Share2
                size={18}
                className="text-slate-400 group-hover:text-blue-600 transition-colors"
              />
              <span className="text-sm font-semibold text-slate-700">
                Share
              </span>
            </button>
          </div> */}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Main Content Area (8 Columns) */}
          <div className="lg:col-span-8 space-y-8">
            {/* Header & Gallery Section */}
            <section className="mb-2">
              <div className="flex flex-col gap-3">
                {/* Main image */}
                <div
                  className="w-full h-[300px] md:h-[450px] relative rounded-2xl overflow-hidden group bg-slate-900"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEndHandler}
                >
                  {listing.photos?.length > 1 && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          prevImage();
                        }}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                      >
                        <ChevronLeft size={24} />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          nextImage();
                        }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/80 hover:bg-white text-slate-800 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-all active:scale-95"
                      >
                        <ChevronRight size={24} />
                      </button>
                    </>
                  )}
                  {listing.photos?.map((photo, i) => (
                    <img
                      key={i}
                      src={`${BACKEND_URL}${photo}`}
                      alt={`Vehicle ${i + 1}`}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${i === selectedImage ? "opacity-100 z-0" : "opacity-0 -z-10"}`}
                    />
                  ))}
                  {(!listing.photos || listing.photos.length === 0) && (
                    <img
                      src="/placeholder-car.jpg"
                      className="w-full h-full object-cover opacity-90"
                      alt="Main"
                    />
                  )}
                </div>

                {/* Thumbnails row */}
                {listing.photos?.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto py-2 px-1 scrollbar-hide">
                    {listing.photos.map((p, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedImage(i)}
                        className={`relative w-24 h-16 md:w-32 md:h-20 shrink-0 rounded-xl overflow-hidden transition-all ${selectedImage === i ? "ring-2 ring-blue-600 ring-offset-2" : "opacity-70 hover:opacity-100"}`}
                      >
                        <img
                          src={`${BACKEND_URL}${p}`}
                          className="w-full h-full object-cover"
                          alt={`Thumbnail ${i + 1}`}
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Vehicle Overview Card */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
              {/* Vehicle Title & Ratings */}
              <div className="pb-6 border-b border-slate-200">
                <h1 className="text-[32px] leading-tight font-semibold text-slate-900">
                  {listing.name}
                </h1>
                <div className="flex items-center flex-wrap gap-2 mt-2 text-[15px] text-slate-700">
                  {/* <Star className="w-4 h-4 fill-slate-900 text-slate-900" /> */}
                  {/* <span className="font-semibold">{listing.averageRating > 0 ? listing.averageRating : "New"}</span> */}
                  {/* {listing.reviewCount > 0 && <span className="underline font-semibold">({listing.reviewCount} reviews)</span>}
                  <span>·</span> */}
                  <span className="flex items-center gap-1 font-semibold underline">
                    {isSeatListing
                      ? `${listing.departure} → ${listing.destination}`
                      : listing.location || "Location not specified"}
                  </span>
                </div>
              </div>

              <div className="pb-6 border-b border-slate-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-900">
                    {listing.listingType === "full"
                      ? "Entire vehicle"
                      : "Shared ride"}
                  </h2>
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg text-sm font-semibold border border-blue-100">
                    <Car size={16} /> Overview
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-5 gap-x-6">
                  {listing.brand && (
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Brand
                      </p>
                      <p className="text-[15px] font-semibold text-slate-900">
                        {listing.brand}
                      </p>
                    </div>
                  )}
                  {listing.model && (
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Model
                      </p>
                      <p className="text-[15px] font-semibold text-slate-900">
                        {listing.model}
                      </p>
                    </div>
                  )}
                  {listing.year && (
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Year
                      </p>
                      <p className="text-[15px] font-semibold text-slate-900">
                        {listing.year}
                      </p>
                    </div>
                  )}
                  {listing.category && (
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Category
                      </p>
                      <p className="text-[15px] font-semibold text-slate-900">
                        {listing.category}
                      </p>
                    </div>
                  )}
                  {listing.seats && (
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Seats
                      </p>
                      <p className="text-[15px] font-semibold text-slate-900">
                        {listing.seats}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                      Transmission
                    </p>
                    <p className="text-[15px] font-semibold text-slate-900">
                      {listing.transmission || "Automatic"}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                      Fuel Type
                    </p>
                    <p className="text-[15px] font-semibold text-slate-900">
                      {listing.fuelType || "Gasoline"}
                    </p>
                  </div>
                  {listing.mileage && (
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                        Mileage
                      </p>
                      <p className="text-[15px] font-semibold text-slate-900">
                        {listing.mileage}
                      </p>
                    </div>
                  )}
                  {isSeatListing && (
                    <>
                      <div className="col-span-2">
                        <p className="text-[11px] text-blue-600 uppercase tracking-wider font-bold mb-1">
                          Departure
                        </p>
                        <p className="text-[15px] font-semibold text-slate-900">
                          {listing.departure}
                        </p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-[11px] text-rose-600 uppercase tracking-wider font-bold mb-1">
                          Destination
                        </p>
                        <p className="text-[15px] font-semibold text-slate-900">
                          {listing.destination}
                        </p>
                      </div>
                      <div className="col-span-2 sm:col-span-4">
                        <p className="text-[11px] text-slate-400 uppercase tracking-wider font-bold mb-1">
                          Departure Time
                        </p>
                        <p className="text-[15px] font-semibold text-slate-900">
                          {listing.departureTime
                            ? new Date(listing.departureTime).toLocaleString(
                                "en-US",
                                {
                                  weekday: "short",
                                  month: "short",
                                  day: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )
                            : "Not specified"}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Navigation
                    size={28}
                    className="text-slate-800"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">
                      Perfect for your trip
                    </h3>
                    <p className="text-slate-500 text-[15px] leading-snug mt-0.5">
                      Highly rated for city rides and weekend getaways.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle
                    size={28}
                    className="text-slate-800"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">
                      Free cancellation
                    </h3>
                    <p className="text-slate-500 text-[15px] leading-snug mt-0.5">
                      Cancel for a full refund up to 24 hours before your trip.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Shield
                    size={28}
                    className="text-slate-800"
                    strokeWidth={1.5}
                  />
                  <div>
                    <h3 className="font-semibold text-slate-900 text-base">
                      Verified and Insured
                    </h3>
                    <p className="text-slate-500 text-[15px] leading-snug mt-0.5">
                      This vehicle includes standard insurance and Jaum support.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* About this vehicle Card */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-4">
              <h2 className="text-xl font-semibold text-slate-900">
                About this vehicle
              </h2>
              <div className="text-slate-700 text-[15px] leading-relaxed whitespace-pre-line">
                {displayedDescription}
              </div>
              {shouldTruncate && (
                <button
                  onClick={() => setIsDescExpanded(!isDescExpanded)}
                  className="font-semibold text-slate-900 underline hover:text-slate-600 transition-colors mt-2"
                >
                  {isDescExpanded ? "Show less" : "Show more"}
                </button>
              )}
            </section>

            {/* Key Features Card */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Key features
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                <div className="flex items-center gap-3 text-slate-700 text-[15px]">
                  <Bluetooth size={24} strokeWidth={1.5} /> Seamless Bluetooth
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-[15px]">
                  <Music size={24} strokeWidth={1.5} /> Surround Sound
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-[15px]">
                  <Navigation size={24} strokeWidth={1.5} /> GPS Navigation
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-[15px]">
                  <Battery size={24} strokeWidth={1.5} /> Eco Friendly
                </div>
                <div className="flex items-center gap-3 text-slate-700 text-[15px]">
                  <Palette size={24} strokeWidth={1.5} /> Leather Interior
                </div>
              </div>
            </section>

            {/* Pickup Location/Map Card */}
            {((!isSeatListing && listing.latitude && listing.longitude) ||
              (isSeatListing &&
                (listing.departureLatitude ||
                  listing.destinationLatitude))) && (
              <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  {isSeatListing ? "Route details" : "Where you'll be"}
                </h2>
                <div className="h-[320px] w-full rounded-2xl overflow-hidden relative z-0 border border-slate-200">
                  <MapContainer
                    center={
                      isSeatListing
                        ? [
                            listing.departureLatitude ||
                              listing.destinationLatitude ||
                              27.7172,
                            listing.departureLongitude ||
                              listing.destinationLongitude ||
                              85.324,
                          ]
                        : [listing.latitude, listing.longitude]
                    }
                    zoom={isSeatListing ? 10 : 14}
                    scrollWheelZoom={false}
                    className="h-full w-full"
                  >
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    {!isSeatListing &&
                      listing.latitude &&
                      listing.longitude && (
                        <Marker
                          position={[listing.latitude, listing.longitude]}
                        >
                          <Popup>
                            {listing.location || "Vehicle Location"}
                          </Popup>
                        </Marker>
                      )}
                    {isSeatListing &&
                      listing.departureLatitude &&
                      listing.departureLongitude && (
                        <Marker
                          position={[
                            listing.departureLatitude,
                            listing.departureLongitude,
                          ]}
                          icon={departureIcon}
                        >
                          <Popup>Departure: {listing.departure}</Popup>
                        </Marker>
                      )}
                    {isSeatListing &&
                      listing.destinationLatitude &&
                      listing.destinationLongitude && (
                        <Marker
                          position={[
                            listing.destinationLatitude,
                            listing.destinationLongitude,
                          ]}
                          icon={destinationIcon}
                        >
                          <Popup>Destination: {listing.destination}</Popup>
                        </Marker>
                      )}
                  </MapContainer>
                </div>
                {isSeatListing ? (
                  <div className="space-y-3">
                    <p className="text-slate-900 font-semibold text-[15px] flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-blue-600" />
                      <span className="text-slate-500 font-medium w-20">
                        From:
                      </span>{" "}
                      {listing.departure}
                    </p>
                    <p className="text-slate-900 font-semibold text-[15px] flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-600" />
                      <span className="text-slate-500 font-medium w-20">
                        To:
                      </span>{" "}
                      {listing.destination}
                    </p>
                  </div>
                ) : (
                  listing.location && (
                    <p className="text-slate-900 font-semibold text-[15px] flex items-center gap-2">
                      <MapPin size={18} className="text-rose-500" />{" "}
                      {listing.location}
                    </p>
                  )
                )}
                <p className="text-slate-500 text-[15px]">
                  Exact location provided after booking.
                </p>
              </section>
            )}

            {/* Owner Details Card */}
            {/* <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center text-2xl font-semibold text-white uppercase overflow-hidden shrink-0">
                  {(listing.owner?.name || listing.ownerName || "P")[0]}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Hosted by{" "}
                    {listing.owner?.name || listing.ownerName || "Prasana"}
                  </h2>
                  <p className="text-slate-500 text-[15px] flex items-center gap-2 mt-1">
                    <Shield size={16} className="text-emerald-500" /> Identity
                    verified
                  </p>
                </div>
              </div>
              <button
                onClick={handleMessageOwner}
                className="flex items-center gap-2 px-6 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl font-bold transition-colors shadow-sm whitespace-nowrap"
              >
                <MessageCircle size={18} />
                Message Owner
              </button>
            </section> */}

            {/* Reviews Card */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-slate-900 text-slate-900" />
                <h2 className="text-xl font-semibold text-slate-900">
                  {listing.averageRating > 0
                    ? `${listing.averageRating} · ${listing.reviewCount} reviews`
                    : "No reviews (yet)"}
                </h2>
              </div>

              {reviews.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  {reviews.map((review) => (
                    <ReviewCard key={review._id} review={review} />
                  ))}
                </div>
              ) : (
                <div className="text-slate-600 text-[15px]">
                  This vehicle doesn't have any reviews yet. Be the first to
                  review after your trip!
                </div>
              )}
            </section>
          </div>

          {/* Sidebar Booking Card */}
          <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-6 mb-12">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6">
              {/* Pricing */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-[22px] font-semibold text-slate-900">
                  Rs.{" "}
                  {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
                </span>
                <span className="text-slate-600 text-[15px]">
                  / {isSeatListing ? "seat" : "day"}
                </span>
              </div>

              <div className="space-y-4">
                {isSeatListing && (
                  <div className="p-3 rounded-lg border border-slate-300 text-slate-900 flex items-center justify-between">
                    <span className="text-sm font-semibold uppercase tracking-wider text-slate-600">
                      Seats Left
                    </span>
                    <span className="font-semibold">
                      {listing.availableSeats}
                    </span>
                  </div>
                )}

                <button
                  onClick={() => setShowBooking(true)}
                  disabled={isSoldOut}
                  className={`w-full py-3.5 rounded-lg text-base font-semibold transition-colors ${
                    isSoldOut
                      ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-500/20"
                  }`}
                >
                  {!isSeatListing
                    ? "Reserve"
                    : isSoldOut
                      ? "Sold Out"
                      : "Book Seat"}
                </button>

                <p className="text-center text-sm text-slate-500 font-medium">
                  You won't be charged yet
                </p>

                {!isSeatListing && (
                  <button
                    onClick={() => setShowVisit(true)}
                    className="w-full py-3.5 mt-2 rounded-lg text-base font-semibold text-slate-900 border border-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    Schedule Visit
                  </button>
                )}
              </div>

              {/* Price Breakdown Preview */}
              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                <div className="flex justify-between text-[15px] text-slate-600 underline">
                  <span>
                    Rs.{" "}
                    {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}{" "}
                    x 1 {isSeatListing ? "seat" : "day"}
                  </span>
                  <span>
                    Rs.{" "}
                    {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
                  </span>
                </div>
                <div className="flex justify-between text-[15px] text-slate-600 underline">
                  <span>Jaum service fee</span>
                  <span>Rs. 0</span>
                </div>
                <div className="flex justify-between font-semibold text-[15px] text-slate-900 pt-4 border-t border-slate-200">
                  <span>Total</span>
                  <span>
                    Rs.{" "}
                    {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
                  </span>
                </div>
              </div>
            </div>

            {/* Owner Details Card */}
            <section className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-5">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center text-xl font-semibold text-white uppercase overflow-hidden shrink-0">
                  {(listing.owner?.name || listing.ownerName || "P")[0]}
                </div>

                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Hosted by{" "}
                    {listing.owner?.name || listing.ownerName || "Prasana"}
                  </h2>
                  <p className="text-slate-500 text-sm flex items-center gap-2 mt-1">
                    <Shield size={15} className="text-emerald-500" />
                    Identity verified
                  </p>
                </div>
              </div>

              <button
                onClick={handleMessageOwner}
                className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-xl font-bold transition-colors shadow-sm"
              >
                <MessageCircle size={18} />
                Message Owner
              </button>
            </section>

            {/* Small Trust indicator below card */}
            <div className="flex items-center justify-center gap-2 text-slate-500 text-sm">
              <Shield size={16} />
              <span>Book with confidence on Jaum</span>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Fixed CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-lg border-t border-slate-200 z-50 flex items-center justify-between gap-4 animate-in slide-in-from-bottom-full duration-500">
        <div>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
            Total
          </p>
          <p className="text-2xl font-black text-slate-900">
            Rs. {isSeatListing ? listing.pricePerSeat : listing.pricePerDay}
          </p>
        </div>
        <button
          onClick={() => setShowBooking(true)}
          disabled={isSoldOut}
          className={`flex-1 max-w-[200px] py-4 rounded-2xl font-bold shadow-lg transition-all active:scale-95 ${
            isSoldOut
              ? "bg-slate-200 text-slate-500"
              : "bg-blue-600 text-white shadow-blue-500/20"
          }`}
        >
          {isSoldOut ? "Sold Out" : "Book Now"}
        </button>
      </div>

      {/* Modals */}
      {showBooking && (
        <BookingModal
          listing={listing}
          onClose={() => setShowBooking(false)}
          onSuccess={(booking) => {
            setShowBooking(false);
            toast.success("Booking requested! Waiting for owner approval.");
            navigate("/dashboard/profile?tab=bookings");
          }}
        />
      )}
      {showVisit && (
        <VisitModal listing={listing} onClose={() => setShowVisit(false)} />
      )}
      {showPayment && currentBooking && (
        <PaymentMethodModal
          isOpen={showPayment}
          onClose={() => setShowPayment(false)}
          bookingId={currentBooking._id}
          totalPrice={currentBooking.totalPrice}
          onComplete={() => navigate("/dashboard/profile?tab=bookings")}
        />
      )}

      {/* Spacer for mobile footer */}
      <div className="h-24 lg:hidden"></div>
    </div>
  );
};

/* Helper Components */
const SpecCard = ({ icon, label, value }) => (
  <div className="p-5 bg-slate-50 border border-slate-100 rounded-3xl group hover:bg-white hover:border-blue-200 hover:shadow-md transition-all duration-300">
    <div className="p-2 bg-white rounded-xl w-fit shadow-sm mb-3 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-0.5">
      {label}
    </p>
    <p className="text-slate-900 font-bold truncate">{value || "—"}</p>
  </div>
);

const FeatureChip = ({ icon, label }) => (
  <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl hover:border-blue-400 hover:bg-blue-50 hover:-translate-y-0.5 hover:shadow-md hover:shadow-blue-500/10 transition-all cursor-default text-sm font-bold text-slate-700">
    <span className="text-blue-500">{icon}</span>
    {label}
  </div>
);

export default ListingDetails;
