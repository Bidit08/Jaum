// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { Car, Users } from "lucide-react";

// const MyVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const res = await api.get("/listings/my");
//         setVehicles(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   if (!vehicles.length)
//     return <p className="text-slate-500">No listings yet.</p>;

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//       {vehicles.map((v) => (
//         <div
//           key={v._id}
//           className="bg-white rounded-2xl shadow border overflow-hidden"
//         >
//           <img
//             src={v.photos?.[0]}
//             alt={v.name}
//             className="h-48 w-full object-cover"
//           />

//           <div className="p-4 space-y-2">
//             <h3 className="font-bold text-lg">{v.name}</h3>

//             {/* Type badge */}
//             <span
//               className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
//                 v.listingType === "full"
//                   ? "bg-blue-100 text-blue-700"
//                   : "bg-emerald-100 text-emerald-700"
//               }`}
//             >
//               {v.listingType === "full" ? (
//                 <>
//                   <Car size={12} /> Full Vehicle
//                 </>
//               ) : (
//                 <>
//                   <Users size={12} /> Seat Listing
//                 </>
//               )}
//             </span>

//             {/* Price */}
//             {v.listingType === "full" ? (
//               <p className="font-semibold">${v.pricePerDay} / day</p>
//             ) : (
//               <p className="font-semibold">${v.pricePerSeat} / seat</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyVehicles;

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { Car, Users } from "lucide-react";

// const BACKEND_URL = "http://localhost:5000";

// const MyVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchVehicles = async () => {
//       try {
//         const res = await api.get("/listings/my");
//         setVehicles(res.data);
//       } catch (err) {
//         console.error("Failed to load vehicles", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchVehicles();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   if (!vehicles.length) {
//     return <p className="text-slate-500">No listings yet.</p>;
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//       {vehicles.map((v) => (
//         <div
//           key={v._id}
//           className="bg-white rounded-2xl shadow border overflow-hidden"
//         >
//           {/* COVER IMAGE */}
//           <img
//             src={
//               v.photos && v.photos.length > 0
//                 ? `${BACKEND_URL}${v.photos[0]}`
//                 : "/placeholder-car.jpg"
//             }
//             alt={v.name}
//             className="h-48 w-full object-cover"
//           />

//           <div className="p-4 space-y-2">
//             <h3 className="font-bold text-lg truncate">{v.name}</h3>

//             {/* TYPE BADGE */}
//             <span
//               className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
//                 v.listingType === "full"
//                   ? "bg-blue-100 text-blue-700"
//                   : "bg-emerald-100 text-emerald-700"
//               }`}
//             >
//               {v.listingType === "full" ? (
//                 <>
//                   <Car size={12} /> Full Vehicle
//                 </>
//               ) : (
//                 <>
//                   <Users size={12} /> Seat Listing
//                 </>
//               )}
//             </span>

//             {/* PRICE */}
//             {v.listingType === "full" ? (
//               <p className="font-semibold">${v.pricePerDay} / day</p>
//             ) : (
//               <p className="font-semibold">${v.pricePerSeat} / seat</p>
//             )}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default MyVehicles;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../../utils/api";
// import {
//   Car,
//   Users,
//   Trash2,
//   Pencil,
//   MoreVertical,
//   Calendar,
//   MapPin,
//   Settings,
//   Fuel,
//   Star,
//   CheckCircle,
//   Clock,
//   Zap,
//   Shield,
//   X,
//   AlertTriangle,
// } from "lucide-react";
// import { toast } from "react-toastify";

// const BACKEND_URL = "http://localhost:5000";

// const MyVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState(null);

//   const navigate = useNavigate();

//   const fetchVehicles = async () => {
//     try {
//       const res = await api.get("/listings/my");
//       setVehicles(res.data);
//     } catch (err) {
//       console.error(err);
//       toast.error("Failed to load vehicles");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const handleDeleteClick = (vehicle) => {
//     setVehicleToDelete(vehicle);
//     setShowDeleteModal(true);
//     setActiveDropdown(null); // Close dropdown if open
//   };

//   const handleDeleteConfirm = async () => {
//     if (!vehicleToDelete) return;

//     try {
//       setDeletingId(vehicleToDelete._id);
//       await api.delete(`/listings/${vehicleToDelete._id}`);
//       toast.success("Listing deleted successfully");
//       setVehicles((prev) => prev.filter((v) => v._id !== vehicleToDelete._id));
//       setShowDeleteModal(false);
//       setVehicleToDelete(null);
//     } catch (err) {
//       toast.error("Failed to delete listing");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   const handleDeleteCancel = () => {
//     setShowDeleteModal(false);
//     setVehicleToDelete(null);
//   };

//   const toggleDropdown = (id) => {
//     setActiveDropdown(activeDropdown === id ? null : id);
//   };

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="relative">
//           <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
//           <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
//         </div>
//       </div>
//     );
//   }

//   if (!vehicles.length) {
//     return (
//       <div className="text-center py-16 px-4">
//         <div className="relative w-24 h-24 mx-auto mb-6">
//           <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl rotate-6"></div>
//           <Car className="relative z-10 w-full h-full text-slate-400 p-6" />
//         </div>
//         <h3 className="text-2xl font-bold text-slate-800 mb-2">
//           No listings yet
//         </h3>
//         <p className="text-slate-500 mb-6 max-w-md mx-auto">
//           Start earning by listing your vehicle. Click the "Add New Vehicle"
//           button to begin.
//         </p>
//         <button
//           onClick={() => navigate("/dashboard/add-vehicle")}
//           className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
//         >
//           <Plus className="w-5 h-5" />
//           Add Your First Vehicle
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="relative">
//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && vehicleToDelete && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
//           <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
//             {/* Modal Header */}
//             <div className="p-6 border-b border-slate-200">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="p-2 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl">
//                   <AlertTriangle className="w-6 h-6 text-rose-600" />
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-bold text-slate-900">
//                     Delete Listing
//                   </h3>
//                   <p className="text-slate-600 text-sm">
//                     This action cannot be undone
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Body */}
//             <div className="p-6">
//               <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
//                 <img
//                   src={
//                     vehicleToDelete.photos?.length
//                       ? `${BACKEND_URL}${vehicleToDelete.photos[0]}`
//                       : "/placeholder-car.jpg"
//                   }
//                   alt={vehicleToDelete.name}
//                   className="w-16 h-16 object-cover rounded-lg"
//                 />
//                 <div>
//                   <h4 className="font-bold text-slate-900">
//                     {vehicleToDelete.name}
//                   </h4>
//                   <p className="text-slate-600 text-sm">
//                     {vehicleToDelete.listingType === "full"
//                       ? "Full Vehicle"
//                       : "Seat Listing"}{" "}
//                     • $
//                     {vehicleToDelete.listingType === "full"
//                       ? vehicleToDelete.pricePerDay
//                       : vehicleToDelete.pricePerSeat}
//                     {vehicleToDelete.listingType === "full" ? "/day" : "/seat"}
//                   </p>
//                 </div>
//               </div>

//               <div className="space-y-4">
//                 <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl">
//                   <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
//                   <div>
//                     <p className="text-rose-700 font-medium mb-1">Warning</p>
//                     <p className="text-rose-600 text-sm">
//                       All booking history, reviews, and data associated with
//                       this listing will be permanently removed.
//                     </p>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
//                   <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
//                   <p className="text-blue-700 text-sm">
//                     Consider marking as unavailable instead of deleting if you
//                     want to keep your history.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Modal Footer */}
//             <div className="p-6 border-t border-slate-200 flex gap-3">
//               <button
//                 onClick={handleDeleteCancel}
//                 className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleDeleteConfirm}
//                 disabled={deletingId === vehicleToDelete._id}
//                 className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
//               >
//                 {deletingId === vehicleToDelete._id ? (
//                   <div className="flex items-center justify-center gap-2">
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                     Deleting...
//                   </div>
//                 ) : (
//                   "Delete Permanently"
//                 )}
//               </button>
//             </div>

//             {/* Close Button */}
//             <button
//               onClick={handleDeleteCancel}
//               className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
//             >
//               <X className="w-5 h-5" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Background Effects */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
//         <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-30"></div>
//       </div>

//       <div className="relative">
//         {/* Stats Header */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600 font-medium">
//                   Total Listings
//                 </p>
//                 <p className="text-2xl font-bold text-slate-900">
//                   {vehicles.length}
//                 </p>
//               </div>
//               <div className="p-3 bg-blue-100 rounded-xl">
//                 <Car className="w-6 h-6 text-blue-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600 font-medium">
//                   Full Vehicles
//                 </p>
//                 <p className="text-2xl font-bold text-slate-900">
//                   {vehicles.filter((v) => v.listingType === "full").length}
//                 </p>
//               </div>
//               <div className="p-3 bg-emerald-100 rounded-xl">
//                 <Car className="w-6 h-6 text-emerald-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600 font-medium">
//                   Seat Listings
//                 </p>
//                 <p className="text-2xl font-bold text-slate-900">
//                   {vehicles.filter((v) => v.listingType === "seats").length}
//                 </p>
//               </div>
//               <div className="p-3 bg-purple-100 rounded-xl">
//                 <Users className="w-6 h-6 text-purple-600" />
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-white to-amber-50 border border-amber-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center justify-between">
//               <div>
//                 <p className="text-sm text-slate-600 font-medium">
//                   Active Status
//                 </p>
//                 <div className="flex items-center gap-2 mt-1">
//                   <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
//                   <p className="text-lg font-bold text-slate-900">All Active</p>
//                 </div>
//               </div>
//               <div className="p-3 bg-amber-100 rounded-xl">
//                 <CheckCircle className="w-6 h-6 text-amber-600" />
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Vehicle Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//           {vehicles.map((v) => (
//             <div
//               key={v._id}
//               className="group bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
//             >
//               {/* Image Section */}
//               <div className="relative h-56 overflow-hidden">
//                 <img
//                   src={
//                     v.photos?.length
//                       ? `${BACKEND_URL}${v.photos[0]}`
//                       : "/placeholder-car.jpg"
//                   }
//                   alt={v.name}
//                   className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
//                 />

//                 {/* Image Overlay Gradient */}
//                 <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

//                 {/* Status Badge */}
//                 <div className="absolute top-4 left-4">
//                   <span
//                     className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
//                       v.listingType === "full"
//                         ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
//                         : "bg-gradient-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-500/25"
//                     }`}
//                   >
//                     {v.listingType === "full" ? (
//                       <>
//                         <Car size={12} /> Full Vehicle
//                       </>
//                     ) : (
//                       <>
//                         <Users size={12} /> Seat Listing
//                       </>
//                     )}
//                   </span>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="absolute top-4 right-4">
//                   <button
//                     onClick={() => toggleDropdown(v._id)}
//                     className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors"
//                   >
//                     <MoreVertical className="w-5 h-5 text-slate-600" />
//                   </button>

//                   {/* Dropdown Menu */}
//                   {activeDropdown === v._id && (
//                     <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in slide-in-from-top-2">
//                       <button
//                         onClick={() => {
//                           navigate(`/dashboard/edit-vehicle/${v._id}`);
//                           setActiveDropdown(null);
//                         }}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                       >
//                         <Pencil className="w-4 h-4" />
//                         Edit Listing
//                       </button>
//                       <button
//                         onClick={() => handleDeleteClick(v)}
//                         className="flex items-center gap-3 w-full px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
//                       >
//                         <Trash2 className="w-4 h-4" />
//                         Delete Listing
//                       </button>
//                     </div>
//                   )}
//                 </div>

//                 {/* Price Tag */}
//                 <div className="absolute bottom-4 right-4">
//                   <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
//                     <p className="text-sm font-medium">Starting from</p>
//                     <p className="text-2xl font-bold">
//                       Rs.
//                       {v.listingType === "full"
//                         ? v.pricePerDay
//                         : v.pricePerSeat}
//                       <span className="text-sm font-normal text-slate-300">
//                         {v.listingType === "full" ? "/day" : "/seat"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Content Section */}
//               <div className="p-5">
//                 <div className="flex items-start justify-between mb-4">
//                   <h3 className="font-bold text-xl text-slate-900 truncate pr-4">
//                     {v.name}
//                   </h3>
//                   <div className="flex items-center gap-1">
//                     <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
//                     <span className="text-sm font-semibold text-slate-700">
//                       4.8
//                     </span>
//                   </div>
//                 </div>

//                 {/* Quick Details */}
//                 <div className="grid grid-cols-2 gap-3 mb-4">
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <MapPin className="w-4 h-4" />
//                     <span className="text-sm truncate">
//                       {v.city || "Location"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Fuel className="w-4 h-4" />
//                     <span className="text-sm truncate">
//                       {v.fuelType || "Fuel Type"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Settings className="w-4 h-4" />
//                     <span className="text-sm truncate">
//                       {v.transmission || "Transmission"}
//                     </span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-600">
//                     <Users className="w-4 h-4" />
//                     <span className="text-sm truncate">
//                       {v.seats || "Seats"} seats
//                     </span>
//                   </div>
//                 </div>

//                 {/* Description Preview */}
//                 <p className="text-slate-500 text-sm line-clamp-2 mb-6">
//                   {v.description || "No description available"}
//                 </p>

//                 {/* Action Buttons */}
//                 <div className="flex gap-3 pt-4 border-t border-slate-100">
//                   <button
//                     onClick={() => navigate(`/dashboard/edit-vehicle/${v._id}`)}
//                     className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group/edit"
//                   >
//                     <Pencil className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
//                     Edit
//                   </button>
//                   <button
//                     onClick={() => handleDeleteClick(v)}
//                     className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 font-semibold rounded-xl hover:from-rose-100 hover:to-rose-200 transition-all group/delete"
//                   >
//                     <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
//                     Delete
//                   </button>
//                 </div>

//                 {/* Additional Info */}
//                 <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
//                   <div className="flex items-center gap-2 text-slate-500 text-sm">
//                     <Clock className="w-4 h-4" />
//                     <span>Updated recently</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-slate-500 text-sm">
//                     <Shield className="w-4 h-4" />
//                     <span>Verified</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Empty State Message */}
//         <div className="text-center mt-12">
//           <p className="text-slate-500 text-sm">
//             Showing {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MyVehicles;

// // Add missing Plus icon component
// const Plus = ({ className = "w-6 h-6" }) => (
//   <svg
//     className={className}
//     fill="none"
//     viewBox="0 0 24 24"
//     stroke="currentColor"
//   >
//     <path
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth={2}
//       d="M12 4v16m8-8H4"
//     />
//   </svg>
// );

// import { useEffect, useState, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../../utils/api";
// import {
//   Car,
//   Users,
//   Trash2,
//   Pencil,
//   MoreVertical,
//   MapPin,
//   Settings,
//   Fuel,
//   Star,
//   CheckCircle,
//   Clock,
//   Shield,
//   X,
//   AlertTriangle,
//   Plus,
//   PlusCircle,
//   LayoutGrid,
//   TrendingUp,
//   Loader2,
//   ExternalLink,
// } from "lucide-react";
// import { toast } from "react-toastify";

// const BACKEND_URL = "http://localhost:5000";

// const StatusBadge = ({ type }) => {
//   const isFull = type === "full";
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
//         isFull
//           ? "bg-gradient-to-r from-blue-600 to-indigo-500 text-white shadow-blue-500/25"
//           : "bg-gradient-to-r from-emerald-500 to-teal-400 text-white shadow-emerald-500/25"
//       }`}
//     >
//       {isFull ? <Car size={12} /> : <Users size={12} />}
//       {isFull ? "Premium Rental" : "Seat Share"}
//     </span>
//   );
// };

// const VehicleCard = ({
//   v,
//   onEdit,
//   onDelete,
//   onToggleStatus,
//   activeDropdown,
//   toggleDropdown,
// }) => {
//   const dropdownRef = useRef(null);
//   const isPaused = v.status === "paused";

//   useEffect(() => {
//     const handleClickOutside = (e) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
//         if (activeDropdown === v._id) toggleDropdown(null);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, [activeDropdown, v._id, toggleDropdown]);

//   return (
//     <div
//       className={`group bg-white rounded-[2rem] border border-slate-200/60 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 flex flex-col relative h-full ${isPaused ? "opacity-75 grayscale-[0.5]" : ""}`}
//     >
//       {isPaused && (
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 pointer-events-none">
//           <div className="bg-slate-900/80 backdrop-blur-md text-white px-4 py-2 rounded-2xl border border-white/20 shadow-2xl skew-x-[-12deg]">
//             <p className="text-xs font-black tracking-widest uppercase">
//               Paused
//             </p>
//           </div>
//         </div>
//       )}
//       {/* Image Section */}
//       <div className="relative h-48 overflow-hidden m-1.5 rounded-[1.5rem] bg-slate-100">
//         <img
//           src={
//             v.photos?.length
//               ? `${BACKEND_URL}${v.photos[0]}`
//               : "https://images.unsplash.com/photo-1542362567-b05503f3f500?q=80&w=1000"
//           }
//           alt={v.name}
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
//         />

//         {/* Gradient Overlay */}
//         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

//         {/* Top Badges */}
//         <div className="absolute top-3 left-3 scale-90 origin-top-left">
//           <StatusBadge type={v.listingType} />
//         </div>

//         <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-md border border-white/20 text-white px-3 py-1.5 rounded-xl shadow-lg z-10">
//           <p className="text-[9px] font-black uppercase tracking-widest opacity-80 leading-none mb-0.5">
//             {v.listingType === "full" ? "Daily Rate" : "Per Seat"}
//           </p>
//           <p className="text-base font-black tracking-tight leading-none text-right">
//             Rs.{" "}
//             {(v.listingType === "full"
//               ? v.pricePerDay
//               : v.pricePerSeat
//             )?.toLocaleString()}
//           </p>
//         </div>
//       </div>

//       {/* 3-Dot Menu (Placed outside overflow-hidden image container to prevent clipping) */}
//       <div className="absolute top-4 right-4 z-50" ref={dropdownRef}>
//         <button
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleDropdown(activeDropdown === v._id ? null : v._id);
//           }}
//           className="p-2 bg-white/95 backdrop-blur-md rounded-xl shadow-sm hover:shadow-md hover:bg-white transition-all text-slate-700 active:scale-95 border border-slate-200/40"
//         >
//           <MoreVertical size={16} />
//         </button>

//         {/* Action Dropdown */}
//         {activeDropdown === v._id && (
//           <div className="absolute top-11 right-0 w-48 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.15)] border border-slate-100 p-1.5 z-[60] animate-in fade-in zoom-in-95 duration-200 origin-top-right">
//             <button
//               onClick={() => {
//                 onEdit(v._id);
//                 toggleDropdown(null);
//               }}
//               className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
//             >
//               <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
//                 <Pencil size={13} />
//               </div>
//               Edit Details
//             </button>

//             <button
//               onClick={() => {
//                 onToggleStatus(v);
//                 toggleDropdown(null);
//               }}
//               className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors"
//             >
//               <div
//                 className={`p-1.5 rounded-lg ${v.status === "active" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}
//               >
//                 {v.status === "active" ? (
//                   <Clock size={13} />
//                 ) : (
//                   <CheckCircle size={13} />
//                 )}
//               </div>
//               {v.status === "active" ? "Make Inactive" : "Make Active"}
//             </button>

//             <div className="h-px bg-slate-100 my-1 mx-2" />

//             <button
//               onClick={() => {
//                 onDelete(v);
//                 toggleDropdown(null);
//               }}
//               className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-sm font-bold text-rose-600 hover:bg-rose-50 transition-colors"
//             >
//               <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
//                 <Trash2 size={13} />
//               </div>
//               Remove Listing
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Content Section */}
//       <div className="p-5 flex flex-col flex-1">
//         <div className="flex items-start justify-between mb-3">
//           <div className="flex-1 min-w-0 pr-2">
//             <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5 truncate">
//               {v.brand || "Verified Vehicle"}
//             </p>
//             <h3 className="text-lg font-black text-slate-900 tracking-tight leading-tight group-hover:text-blue-600 transition-colors truncate">
//               {v.name}
//             </h3>
//           </div>
//           <div className="flex items-center gap-1 px-1.5 py-0.5 bg-amber-50 rounded-lg shrink-0 scale-90 origin-right">
//             <Star className="text-amber-400 fill-amber-400" size={12} />
//             <span className="text-[10px] font-black text-amber-700">4.8</span>
//           </div>
//         </div>

//         {/* Specs Grid */}
//         <div className="grid grid-cols-2 gap-y-2 gap-x-3 mb-4">
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
//               <MapPin size={12} />
//             </div>
//             <span className="text-[10px] font-bold text-slate-600 tracking-tight truncate">
//               {v.city || "Kathmandu"}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
//               <Fuel size={12} />
//             </div>
//             <span className="text-[10px] font-bold text-slate-600 tracking-tight truncate">
//               {v.fuelType || "Petrol"}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
//               <Settings size={12} />
//             </div>
//             <span className="text-[10px] font-bold text-slate-600 tracking-tight truncate">
//               {v.transmission || "Auto"}
//             </span>
//           </div>
//           <div className="flex items-center gap-2">
//             <div className="p-1.5 rounded-lg bg-slate-50 text-slate-400">
//               <Users size={12} />
//             </div>
//             <span className="text-[10px] font-bold text-slate-600 tracking-tight truncate">
//               {v.seats || 5} Seats
//             </span>
//           </div>
//         </div>

//         {/* Description Line Clamp */}
//         <p className="text-[13px] text-slate-500 font-medium line-clamp-2 mb-4 h-8">
//           {v.description ||
//             "Top-tier vehicle maintained with high standards, ready for your next journey."}
//         </p>

//         {/* Footer info */}
//         <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
//           <div className="flex items-center gap-1.5 text-[9px] font-bold text-slate-400 uppercase tracking-widest">
//             <Clock size={10} />
//             <span>Updated recently</span>
//           </div>
//           <div className="flex items-center gap-1 text-[9px] font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded-full">
//             <Shield size={9} />
//             <span>Verified</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// const MyVehicles = () => {
//   const [vehicles, setVehicles] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [deletingId, setDeletingId] = useState(null);
//   const [activeDropdown, setActiveDropdown] = useState(null);
//   const [showDeleteModal, setShowDeleteModal] = useState(false);
//   const [vehicleToDelete, setVehicleToDelete] = useState(null);

//   const navigate = useNavigate();

//   const fetchVehicles = async () => {
//     try {
//       const res = await api.get("/listings/my");
//       setVehicles(res.data);
//     } catch (err) {
//       toast.error("Failed to load vehicles");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchVehicles();
//   }, []);

//   const handleToggleStatus = async (vehicle) => {
//     const newStatus = vehicle.status === "active" ? "paused" : "active";
//     try {
//       await api.put(`/listings/${vehicle._id}`, { status: newStatus });
//       toast.success(
//         `Listing ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
//       );
//       setVehicles((prev) =>
//         prev.map((v) =>
//           v._id === vehicle._id ? { ...v, status: newStatus } : v,
//         ),
//       );
//     } catch (err) {
//       toast.error("Failed to update status");
//     }
//   };

//   const handleDeleteConfirm = async () => {
//     if (!vehicleToDelete) return;
//     try {
//       setDeletingId(vehicleToDelete._id);
//       await api.delete(`/listings/${vehicleToDelete._id}`);
//       toast.success("Listing deleted successfully");
//       setVehicles((prev) => prev.filter((v) => v._id !== vehicleToDelete._id));
//       setShowDeleteModal(false);
//       setVehicleToDelete(null);
//     } catch (err) {
//       toast.error("Failed to delete listing");
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
//         <div className="relative">
//           <div className="w-16 h-16 border-[5px] border-slate-100 border-t-blue-600 rounded-full animate-spin"></div>
//           <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
//         </div>
//         <p className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] animate-pulse">
//           Syncing Fleet...
//         </p>
//       </div>
//     );
//   }

//   if (!vehicles.length) {
//     return (
//       <div className="flex flex-col items-center justify-center py-24 text-center px-6">
//         <div className="relative w-32 h-32 mb-8 group">
//           <div className="absolute inset-0 bg-blue-100 rounded-full group-hover:scale-110 transition-transform duration-700 opacity-50 blur-2xl"></div>
//           <div className="relative bg-white border border-slate-100 rounded-full w-full h-full flex items-center justify-center shadow-2xl">
//             <Car
//               size={48}
//               className="text-slate-300 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"
//             />
//           </div>
//           <div className="absolute -top-2 -right-2 bg-blue-600 text-white p-2.5 rounded-2xl shadow-xl">
//             <Plus size={20} className="animate-bounce" />
//           </div>
//         </div>
//         <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
//           No Vehicles Found
//         </h3>
//         <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed text-lg">
//           Your garage is currently empty. Ready to start earning with your
//           automobile?
//         </p>
//         <button
//           onClick={() => navigate("/dashboard/add-vehicle")}
//           className="group flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-blue-600 hover:shadow-[0_20px_50px_-15px_rgba(37,99,235,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
//         >
//           Add Your First Vehicle{" "}
//           <Plus className="group-hover:rotate-90 transition-transform" />
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="relative font-sans animate-in fade-in duration-700">
//       {/* Delete Confirmation Modal */}
//       {showDeleteModal && vehicleToDelete && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-md">
//           <div className="relative w-full max-w-md bg-white rounded-[2rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
//             <div className="p-8">
//               <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 border border-rose-100">
//                 <AlertTriangle size={32} />
//               </div>
//               <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
//                 Delete Vehicle?
//               </h3>
//               <p className="text-slate-500 font-medium mb-6">
//                 Are you sure you want to remove{" "}
//                 <span className="text-slate-900 font-black">
//                   {vehicleToDelete.name}
//                 </span>
//                 ? All booking data and analytics will be permanently lost.
//               </p>

//               <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
//                 {/* <img
//                   src={
//                     v.photos && v.photos.length > 0
//                       ? `${BACKEND_URL}${v.photos[0]}`
//                       : ""
//                   }
//                   className="w-16 h-16 object-cover rounded-xl shadow-sm"
//                   alt=""
//                 /> */}
//                 <img
//                   src={
//                     vehicleToDelete.photos && vehicleToDelete.photos.length > 0
//                       ? `${BACKEND_URL}${vehicleToDelete.photos[0]}`
//                       : ""
//                   }
//                   className="w-16 h-16 object-cover rounded-xl shadow-sm"
//                   alt=""
//                 />
//                 <div>
//                   <p className="font-black text-slate-900 line-clamp-1">
//                     {vehicleToDelete.name}
//                   </p>
//                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
//                     {vehicleToDelete.listingType === "full"
//                       ? "Premium Rental"
//                       : "Seat Share"}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <button
//                   onClick={() => setShowDeleteModal(false)}
//                   className="flex-1 py-4 bg-slate-100 text-slate-900 font-black tracking-widest uppercase text-xs rounded-xl hover:bg-slate-200 transition-all active:scale-95"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleDeleteConfirm}
//                   disabled={deletingId === vehicleToDelete._id}
//                   className="flex-1 py-4 bg-rose-600 text-white font-black tracking-widest uppercase text-xs rounded-xl hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/30 transition-all active:scale-95 disabled:opacity-50"
//                 >
//                   {deletingId ? (
//                     <Loader2 size={16} className="animate-spin mx-auto" />
//                   ) : (
//                     "Delete Listing"
//                   )}
//                 </button>
//               </div>
//             </div>
//             <button
//               onClick={() => setShowDeleteModal(false)}
//               className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-xl transition-colors"
//             >
//               <X size={20} className="text-slate-400" />
//             </button>
//           </div>
//         </div>
//       )}

//       {/* Top Header Row with Action */}
//       <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
//         <div>
//           <h1 className="text-3xl font-black text-slate-900 tracking-tight">
//             Fleet Overview
//           </h1>
//           <p className="text-sm font-medium text-slate-500 mt-1">
//             Manage and monitor your vehicle inventory.
//           </p>
//         </div>
//         <button
//           onClick={() => navigate("/dashboard/add-vehicle")}
//           className="flex items-center justify-center gap-2 px-6 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl font-black tracking-widest uppercase text-xs shadow-[0_15px_30px_-10px_rgba(37,99,235,0.4)] hover:shadow-[0_20px_40px_-10px_rgba(37,99,235,0.6)] hover:-translate-y-1 transition-all duration-300 active:scale-95 whitespace-nowrap"
//         >
//           <PlusCircle size={18} /> Add New Vehicle
//         </button>
//       </div>

//       {/* Mini Stats Grid */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
//         <div className="group bg-blue-50 border border-blue-200/60 rounded-2xl p-4 transition-all hover:shadow-md cursor-default shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-blue-600 rounded-xl text-white shadow-lg shadow-blue-500/20">
//               <Car size={18} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
//                 Total Listings
//               </p>
//               <div className="flex items-baseline gap-1.5">
//                 <p className="text-xl font-black text-slate-900 tracking-tight leading-none">
//                   {vehicles.length}
//                 </p>
//                 <TrendingUp size={12} className="text-emerald-500" />
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="group bg-emerald-50 border border-emerald-200/60 rounded-2xl p-4 transition-all hover:shadow-md cursor-default shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-emerald-600 rounded-xl text-white shadow-lg shadow-emerald-500/20">
//               <TrendingUp size={18} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
//                 Full Rental
//               </p>
//               <p className="text-xl font-black text-slate-900 tracking-tight leading-none">
//                 {vehicles.filter((v) => v.listingType === "full").length}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="group bg-purple-50 border border-purple-200/60 rounded-2xl p-4 transition-all hover:shadow-md cursor-default shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-purple-600 rounded-xl text-white shadow-lg shadow-purple-500/20">
//               <Users size={18} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
//                 Seat Share
//               </p>
//               <p className="text-xl font-black text-slate-900 tracking-tight leading-none">
//                 {vehicles.filter((v) => v.listingType === "seats").length}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="group bg-amber-50 border border-amber-200/60 rounded-2xl p-4 transition-all hover:shadow-md cursor-default shadow-sm">
//           <div className="flex items-center gap-3">
//             <div className="p-2.5 bg-amber-600 rounded-xl text-white shadow-lg shadow-amber-500/20">
//               <CheckCircle size={18} />
//             </div>
//             <div className="min-w-0">
//               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-0.5">
//                 Active Listings
//               </p>
//               <p className="text-xl font-black text-slate-900 tracking-tight leading-none">
//                 {vehicles.filter((v) => v.status === "active").length}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Main Grid Layout */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
//         {vehicles.map((v) => (
//           <VehicleCard
//             key={v._id}
//             v={v}
//             onEdit={(id) => navigate(`/dashboard/edit-vehicle/${id}`)}
//             onDelete={(veh) => {
//               setVehicleToDelete(veh);
//               setShowDeleteModal(true);
//             }}
//             onToggleStatus={handleToggleStatus}
//             activeDropdown={activeDropdown}
//             toggleDropdown={setActiveDropdown}
//           />
//         ))}
//       </div>

//       {/* Quick Access Floating Action (Mobile Optional) */}
//       <div className="mt-12 flex justify-center">
//         <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
//           Syncing with live marketplace{" "}
//           <Loader2 size={12} className="animate-spin" />
//         </p>
//       </div>
//     </div>
//   );
// };

// export default MyVehicles;

import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import {
  Car,
  Users,
  Trash2,
  Pencil,
  MoreVertical,
  MapPin,
  Settings,
  Fuel,
  Star,
  CheckCircle,
  Clock,
  Shield,
  X,
  AlertTriangle,
  Plus,
  PlusCircle,
  LayoutGrid,
  TrendingUp,
  Loader2,
  ExternalLink,
  XCircle,
  HelpCircle,
} from "lucide-react";
import { toast } from "react-toastify";

const BACKEND_URL = "https://jaum-t3no.onrender.com";

const StatusBadge = ({ type }) => {
  const isFull = type === "full";
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-wider border ${
        isFull
          ? "bg-slate-950/85 text-white border-slate-800 backdrop-blur-sm"
          : "bg-indigo-500/10 text-indigo-400 border-indigo-500/20 backdrop-blur-sm"
      }`}
    >
      {isFull ? <Car size={10} /> : <Users size={10} />}
      {isFull ? "Premium Rental" : "Seat Share"}
    </span>
  );
};

const VehicleCard = ({
  v,
  onEdit,
  onDelete,
  onToggleStatus,
  activeDropdown,
  toggleDropdown,
}) => {
  const dropdownRef = useRef(null);
  const isPaused = v.status === "paused";
  const price = v.listingType === "full" ? v.pricePerDay : v.pricePerSeat;

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        if (activeDropdown === v._id) toggleDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown, v._id, toggleDropdown]);

  return (
    <div
      className={`group bg-white rounded-3xl border border-slate-200/50 shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-500 flex flex-col relative h-full overflow-hidden ${
        isPaused ? "opacity-80 grayscale-[0.1]" : ""
      }`}
    >
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden m-2 rounded-2xl bg-slate-50">
        <img
          src={
            v.photos?.length
              ? `${BACKEND_URL}${v.photos[0]}`
              : "https://images.unsplash.com/photo-1542362567-b05503f3f500?q=80&w=1000"
          }
          alt={v.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />

        {/* Subtle Bottom Gradient Overlay for Image depth */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

        {/* Top left Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <StatusBadge type={v.listingType} />
          {isPaused && (
            <span className="bg-rose-500/90 text-white backdrop-blur-sm px-2.5 py-1 rounded-full text-[8.5px] font-bold uppercase tracking-wider border border-rose-450/20">
              Paused
            </span>
          )}
        </div>

        {/* Approval Status Banner */}
        {v.isRejected ? (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 bg-red-600/90 text-white backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wide">
            <XCircle size={11} /> Rejected by Admin
          </div>
        ) : !v.isApproved ? (
          <div className="absolute bottom-3 left-3 right-3 flex items-center gap-1.5 bg-amber-500/90 text-white backdrop-blur-sm px-2.5 py-1.5 rounded-xl text-[9px] font-bold uppercase tracking-wide">
            <HelpCircle size={11} /> Pending Approval
          </div>
        ) : null}
      </div>

      {/* 3-Dot Menu Button & Dropdown */}
      <div className="absolute top-5 right-5 z-20" ref={dropdownRef}>
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleDropdown(activeDropdown === v._id ? null : v._id);
          }}
          className="p-1.5 bg-white/90 backdrop-blur-md rounded-lg shadow-sm hover:shadow-md hover:bg-white transition-all text-slate-700 active:scale-95 border border-slate-200/40"
        >
          <MoreVertical size={14} />
        </button>

        {/* Action Dropdown Menu */}
        {activeDropdown === v._id && (
          <div className="absolute top-9 right-0 w-44 bg-white rounded-2xl shadow-[0_10px_30px_-10px_rgba(0,0,0,0.12)] border border-slate-100/80 p-1.5 z-30 animate-in fade-in zoom-in-95 duration-150 origin-top-right">
            <button
              onClick={() => {
                onEdit(v._id);
                toggleDropdown(null);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-55 hover:bg-slate-50 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
                <Pencil size={12} />
              </div>
              Edit Details
            </button>

            <button
              onClick={() => {
                if (!v.isApproved) return;
                onToggleStatus(v);
                toggleDropdown(null);
              }}
              disabled={!v.isApproved}
              title={!v.isApproved ? "Listing must be approved first" : ""}
              className={`flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                !v.isApproved
                  ? "opacity-40 cursor-not-allowed text-slate-400"
                  : "text-slate-700 hover:bg-slate-50"
              }`}
            >
              <div
                className={`p-1.5 rounded-lg ${v.status === "active" ? "bg-amber-50 text-amber-600" : "bg-emerald-50 text-emerald-600"}`}
              >
                {v.status === "active" ? (
                  <Clock size={12} />
                ) : (
                  <CheckCircle size={12} />
                )}
              </div>
              {v.status === "active" ? "Make Inactive" : "Make Active"}
            </button>

            <div className="h-px bg-slate-100 my-1 mx-2" />

            <button
              onClick={() => {
                onDelete(v);
                toggleDropdown(null);
              }}
              className="flex items-center gap-2.5 w-full px-3 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors"
            >
              <div className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
                <Trash2 size={12} />
              </div>
              Remove Listing
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5 pt-3 flex flex-col flex-1">
        {/* Brand & Rating Row */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] font-black text-indigo-600 tracking-wider uppercase">
            {v.brand || "Verified Vehicle"}
          </span>
          <div className="flex items-center gap-1 px-1.5 py-0.5 bg-slate-50 border border-slate-100 rounded-md">
            <Star className="text-amber-400 fill-amber-400" size={10} />
            <span className="text-[10px] font-extrabold text-slate-650 text-slate-600">
              4.8
            </span>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-base font-black text-slate-900 tracking-tight leading-snug group-hover:text-indigo-600 transition-colors truncate mb-2">
          {v.name}
        </h3>

        {/* Specs Row */}
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-500 mb-3">
          <span className="flex items-center gap-1">
            <MapPin size={11} className="text-slate-400" />
            {v.city || "Kathmandu"}
          </span>
          <span className="text-slate-300 font-normal">•</span>
          <span className="flex items-center gap-1">
            <Fuel size={11} className="text-slate-400" />
            {v.fuelType || "Petrol"}
          </span>
          <span className="text-slate-300 font-normal">•</span>
          <span className="flex items-center gap-1">
            <Settings size={11} className="text-slate-400" />
            {v.transmission || "Auto"}
          </span>
          <span className="text-slate-300 font-normal">•</span>
          <span className="flex items-center gap-1">
            <Users size={11} className="text-slate-400" />
            {v.seats || 5} Seats
          </span>
        </div>

        {/* Description */}
        <p className="text-xs text-slate-400 font-medium line-clamp-2 mb-4 leading-relaxed h-8">
          {v.description ||
            "Top-tier vehicle maintained with high standards, ready for your next journey."}
        </p>

        {/* Price & Status Row */}
        <div className="mt-auto pt-4 border-t border-slate-100 flex items-end justify-between">
          <div className="flex flex-col">
            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest leading-none mb-1">
              {v.listingType === "full" ? "Daily Rate" : "Per Seat"}
            </span>
            <div className="flex items-baseline gap-0.5">
              <span className="text-lg font-black text-slate-900 leading-none">
                Rs. {price?.toLocaleString()}
              </span>
              <span className="text-[10px] font-bold text-slate-450 text-slate-450 leading-none">
                /{v.listingType === "full" ? "day" : "seat"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {v.isRejected ? (
              <div className="flex items-center gap-1 text-[9px] font-extrabold text-red-600 uppercase tracking-widest bg-red-50 border border-red-100 px-2 py-0.5 rounded-full">
                <XCircle size={9} />
                <span>Rejected</span>
              </div>
            ) : !v.isApproved ? (
              <div className="flex items-center gap-1 text-[9px] font-extrabold text-amber-600 uppercase tracking-widest bg-amber-50 border border-amber-100 px-2 py-0.5 rounded-full">
                <Clock size={9} />
                <span>Pending</span>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-1 text-[9px] font-extrabold text-indigo-600 uppercase tracking-widest bg-indigo-50/70 border border-indigo-100 px-2 py-0.5 rounded-full">
                  <Shield size={9} />
                  <span>Verified</span>
                </div>
                <div className="flex items-center gap-1">
                  <div
                    className={`w-1.5 h-1.5 rounded-full ${isPaused ? "bg-slate-400" : "bg-emerald-500 animate-pulse"}`}
                  />
                  <span
                    className={`text-[9px] font-extrabold uppercase tracking-wider ${isPaused ? "text-slate-400" : "text-emerald-600"}`}
                  >
                    {isPaused ? "Paused" : "Active"}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const MiniStatCard = ({
  icon: Icon,
  label,
  value,
  colorClass,
  bgClass,
  badge,
}) => {
  return (
    <div className="group bg-white border border-slate-200/60 rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-md cursor-default shadow-sm flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className={`p-2.5 rounded-xl border ${bgClass}`}>
          <Icon className={colorClass} size={18} />
        </div>
        <div>
          <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1 leading-none">
            {label}
          </p>
          <div className="flex items-baseline gap-1.5">
            <p className="text-xl font-black text-slate-900 tracking-tight leading-none">
              {value}
            </p>
            {badge}
          </div>
        </div>
      </div>
    </div>
  );
};

const MyVehicles = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const navigate = useNavigate();

  const fetchVehicles = async () => {
    try {
      const res = await api.get("/listings/my");
      setVehicles(res.data);
    } catch (err) {
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleToggleStatus = async (vehicle) => {
    const newStatus = vehicle.status === "active" ? "paused" : "active";
    try {
      await api.put(`/listings/${vehicle._id}`, { status: newStatus });
      toast.success(
        `Listing ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
      );
      setVehicles((prev) =>
        prev.map((v) =>
          v._id === vehicle._id ? { ...v, status: newStatus } : v,
        ),
      );
    } catch (err) {
      toast.error("Failed to update status");
    }
  };

  const handleDeleteConfirm = async () => {
    if (!vehicleToDelete) return;
    try {
      setDeletingId(vehicleToDelete._id);
      await api.delete(`/listings/${vehicleToDelete._id}`);
      toast.success("Listing deleted successfully");
      setVehicles((prev) => prev.filter((v) => v._id !== vehicleToDelete._id));
      setShowDeleteModal(false);
      setVehicleToDelete(null);
    } catch (err) {
      toast.error("Failed to delete listing");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[450px] space-y-4">
        <div className="relative">
          <div className="w-16 h-16 border-[5px] border-slate-100 border-t-indigo-600 rounded-full animate-spin"></div>
          <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-indigo-600" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] animate-pulse">
          Syncing Fleet...
        </p>
      </div>
    );
  }

  if (!vehicles.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center px-6">
        <div className="relative w-32 h-32 mb-8 group">
          <div className="absolute inset-0 bg-indigo-100 rounded-full group-hover:scale-110 transition-transform duration-700 opacity-50 blur-2xl"></div>
          <div className="relative bg-white border border-slate-100 rounded-full w-full h-full flex items-center justify-center shadow-2xl">
            <Car
              size={48}
              className="text-slate-300 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500"
            />
          </div>
          <div className="absolute -top-2 -right-2 bg-slate-950 text-white p-2.5 rounded-2xl shadow-xl">
            <Plus size={20} className="animate-bounce" />
          </div>
        </div>
        <h3 className="text-3xl font-black text-slate-900 tracking-tight mb-3">
          No Vehicles Found
        </h3>
        <p className="text-slate-500 font-medium max-w-sm mx-auto mb-10 leading-relaxed text-lg">
          Your garage is currently empty. Ready to start earning with your
          automobile?
        </p>
        <button
          onClick={() => navigate("/dashboard/add-vehicle")}
          className="group flex items-center gap-3 bg-slate-950 text-white px-8 py-4 rounded-2xl font-black tracking-widest uppercase text-xs hover:bg-indigo-600 hover:shadow-[0_20px_50px_-15px_rgba(99,102,241,0.4)] transition-all duration-300 hover:scale-105 active:scale-95"
        >
          Add Your First Vehicle{" "}
          <Plus className="group-hover:rotate-90 transition-transform" />
        </button>
      </div>
    );
  }

  return (
    <div className="relative font-sans animate-in fade-in duration-700 pb-10">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="p-8">
              <div className="w-14 h-14 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 border border-rose-100/50">
                <AlertTriangle size={28} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight mb-2">
                Delete Vehicle?
              </h3>
              <p className="text-slate-500 font-medium text-sm leading-relaxed mb-6">
                Are you sure you want to remove{" "}
                <span className="text-slate-900 font-black">
                  {vehicleToDelete.name}
                </span>
                ? All booking data and analytics will be permanently lost.
              </p>

              <div className="flex items-center gap-4 p-3.5 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
                <img
                  src={
                    vehicleToDelete.photos && vehicleToDelete.photos.length > 0
                      ? `${BACKEND_URL}${vehicleToDelete.photos[0]}`
                      : ""
                  }
                  className="w-14 h-14 object-cover rounded-xl shadow-sm border border-slate-200/50"
                  alt=""
                />
                <div>
                  <p className="font-bold text-slate-900 line-clamp-1 text-sm">
                    {vehicleToDelete.name}
                  </p>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-0.5">
                    {vehicleToDelete.listingType === "full"
                      ? "Premium Rental"
                      : "Seat Share"}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="flex-1 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-900 font-black tracking-widest uppercase text-[10px] rounded-xl transition-all active:scale-95"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  disabled={deletingId === vehicleToDelete._id}
                  className="flex-1 py-3.5 bg-rose-600 text-white font-black tracking-widest uppercase text-[10px] rounded-xl hover:bg-rose-700 hover:shadow-lg hover:shadow-rose-600/30 transition-all active:scale-95 disabled:opacity-50"
                >
                  {deletingId ? (
                    <Loader2 size={14} className="animate-spin mx-auto" />
                  ) : (
                    "Delete Listing"
                  )}
                </button>
              </div>
            </div>
            <button
              onClick={() => setShowDeleteModal(false)}
              className="absolute top-6 right-6 p-2 hover:bg-slate-50 rounded-xl transition-colors"
            >
              <X size={18} className="text-slate-400" />
            </button>
          </div>
        </div>
      )}

      {/* Top Header Row with Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Fleet Overview
          </h1>
          <p className="text-sm font-medium text-slate-500 mt-1">
            Manage and monitor your vehicle inventory.
          </p>
        </div>
        <button
          onClick={() => navigate("/dashboard/add-vehicle")}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-indigo-600 text-white rounded-xl font-bold text-xs hover:bg-indigo-700 hover:shadow-lg hover:shadow-indigo-500/20 hover:-translate-y-0.5 transition-all duration-300 active:scale-95 whitespace-nowrap"
        >
          <PlusCircle size={16} /> Add New Vehicle
        </button>
      </div>

      {/* Mini Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        <MiniStatCard
          icon={Car}
          label="Total Listings"
          value={vehicles.length}
          colorClass="text-blue-500"
          bgClass="bg-blue-50/50 border-blue-100/50"
          badge={<TrendingUp size={12} className="text-emerald-500 ml-1.5" />}
        />
        <MiniStatCard
          icon={TrendingUp}
          label="Full Rental"
          value={vehicles.filter((v) => v.listingType === "full").length}
          colorClass="text-indigo-500"
          bgClass="bg-indigo-50/50 border-indigo-100/50"
        />
        <MiniStatCard
          icon={Users}
          label="Seat Share"
          value={vehicles.filter((v) => v.listingType === "seats").length}
          colorClass="text-purple-500"
          bgClass="bg-purple-50/50 border-purple-100/50"
        />
        <MiniStatCard
          icon={CheckCircle}
          label="Active Listings"
          value={vehicles.filter((v) => v.status === "active").length}
          colorClass="text-emerald-500"
          bgClass="bg-emerald-50/50 border-emerald-100/50"
        />
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 xl:gap-8">
        {vehicles.map((v) => (
          <VehicleCard
            key={v._id}
            v={v}
            onEdit={(id) => navigate(`/dashboard/edit-vehicle/${id}`)}
            onDelete={(veh) => {
              setVehicleToDelete(veh);
              setShowDeleteModal(true);
            }}
            onToggleStatus={handleToggleStatus}
            activeDropdown={activeDropdown}
            toggleDropdown={setActiveDropdown}
          />
        ))}
      </div>

      {/* Quick Access Floating Action (Mobile Optional) */}
      <div className="mt-16 flex justify-center">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2">
          Syncing with live marketplace{" "}
          <Loader2 size={12} className="animate-spin text-indigo-500" />
        </p>
      </div>
    </div>
  );
};

export default MyVehicles;
