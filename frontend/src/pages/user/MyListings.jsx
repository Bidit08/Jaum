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

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import {
  Car,
  Users,
  Trash2,
  Pencil,
  MoreVertical,
  Calendar,
  MapPin,
  Settings,
  Fuel,
  Star,
  CheckCircle,
  Clock,
  Zap,
  Shield,
  X,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:5000";

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
      console.error(err);
      toast.error("Failed to load vehicles");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleDeleteClick = (vehicle) => {
    setVehicleToDelete(vehicle);
    setShowDeleteModal(true);
    setActiveDropdown(null); // Close dropdown if open
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

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setVehicleToDelete(null);
  };

  const toggleDropdown = (id) => {
    setActiveDropdown(activeDropdown === id ? null : id);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-blue-600" />
        </div>
      </div>
    );
  }

  if (!vehicles.length) {
    return (
      <div className="text-center py-16 px-4">
        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-2xl rotate-6"></div>
          <Car className="relative z-10 w-full h-full text-slate-400 p-6" />
        </div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">
          No listings yet
        </h3>
        <p className="text-slate-500 mb-6 max-w-md mx-auto">
          Start earning by listing your vehicle. Click the "Add New Vehicle"
          button to begin.
        </p>
        <button
          onClick={() => navigate("/dashboard/add-vehicle")}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all"
        >
          <Plus className="w-5 h-5" />
          Add Your First Vehicle
        </button>
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Delete Confirmation Modal */}
      {showDeleteModal && vehicleToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-rose-100 to-pink-100 rounded-xl">
                  <AlertTriangle className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">
                    Delete Listing
                  </h3>
                  <p className="text-slate-600 text-sm">
                    This action cannot be undone
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <div className="flex items-center gap-4 mb-6 p-4 bg-slate-50 rounded-xl">
                <img
                  src={
                    vehicleToDelete.photos?.length
                      ? `${BACKEND_URL}${vehicleToDelete.photos[0]}`
                      : "/placeholder-car.jpg"
                  }
                  alt={vehicleToDelete.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div>
                  <h4 className="font-bold text-slate-900">
                    {vehicleToDelete.name}
                  </h4>
                  <p className="text-slate-600 text-sm">
                    {vehicleToDelete.listingType === "full"
                      ? "Full Vehicle"
                      : "Seat Listing"}{" "}
                    • $
                    {vehicleToDelete.listingType === "full"
                      ? vehicleToDelete.pricePerDay
                      : vehicleToDelete.pricePerSeat}
                    {vehicleToDelete.listingType === "full" ? "/day" : "/seat"}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3 p-4 bg-rose-50 border border-rose-200 rounded-xl">
                  <AlertTriangle className="w-5 h-5 text-rose-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-rose-700 font-medium mb-1">Warning</p>
                    <p className="text-rose-600 text-sm">
                      All booking history, reviews, and data associated with
                      this listing will be permanently removed.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0" />
                  <p className="text-blue-700 text-sm">
                    Consider marking as unavailable instead of deleting if you
                    want to keep your history.
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-200 flex gap-3">
              <button
                onClick={handleDeleteCancel}
                className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 font-semibold rounded-xl hover:bg-slate-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                disabled={deletingId === vehicleToDelete._id}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {deletingId === vehicleToDelete._id ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </div>
                ) : (
                  "Delete Permanently"
                )}
              </button>
            </div>

            {/* Close Button */}
            <button
              onClick={handleDeleteCancel}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}

      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-30"></div>
      </div>

      <div className="relative">
        {/* Stats Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-white to-blue-50 border border-blue-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">
                  Total Listings
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {vehicles.length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <Car className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-emerald-50 border border-emerald-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">
                  Full Vehicles
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {vehicles.filter((v) => v.listingType === "full").length}
                </p>
              </div>
              <div className="p-3 bg-emerald-100 rounded-xl">
                <Car className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-purple-50 border border-purple-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">
                  Seat Listings
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  {vehicles.filter((v) => v.listingType === "seats").length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-white to-amber-50 border border-amber-100 rounded-2xl p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 font-medium">
                  Active Status
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                  <p className="text-lg font-bold text-slate-900">All Active</p>
                </div>
              </div>
              <div className="p-3 bg-amber-100 rounded-xl">
                <CheckCircle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {vehicles.map((v) => (
            <div
              key={v._id}
              className="group bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Section */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={
                    v.photos?.length
                      ? `${BACKEND_URL}${v.photos[0]}`
                      : "/placeholder-car.jpg"
                  }
                  alt={v.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Image Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                      v.listingType === "full"
                        ? "bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-lg shadow-blue-500/25"
                        : "bg-gradient-to-r from-emerald-500 to-green-400 text-white shadow-lg shadow-emerald-500/25"
                    }`}
                  >
                    {v.listingType === "full" ? (
                      <>
                        <Car size={12} /> Full Vehicle
                      </>
                    ) : (
                      <>
                        <Users size={12} /> Seat Listing
                      </>
                    )}
                  </span>
                </div>

                {/* Quick Actions */}
                <div className="absolute top-4 right-4">
                  <button
                    onClick={() => toggleDropdown(v._id)}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-xl hover:bg-white transition-colors"
                  >
                    <MoreVertical className="w-5 h-5 text-slate-600" />
                  </button>

                  {/* Dropdown Menu */}
                  {activeDropdown === v._id && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-in fade-in slide-in-from-top-2">
                      <button
                        onClick={() => {
                          navigate(`/dashboard/edit-vehicle/${v._id}`);
                          setActiveDropdown(null);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <Pencil className="w-4 h-4" />
                        Edit Listing
                      </button>
                      <button
                        onClick={() => handleDeleteClick(v)}
                        className="flex items-center gap-3 w-full px-4 py-3 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Listing
                      </button>
                    </div>
                  )}
                </div>

                {/* Price Tag */}
                <div className="absolute bottom-4 right-4">
                  <div className="bg-gradient-to-r from-slate-900/90 to-slate-800/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl">
                    <p className="text-sm font-medium">Starting from</p>
                    <p className="text-2xl font-bold">
                      Rs.
                      {v.listingType === "full"
                        ? v.pricePerDay
                        : v.pricePerSeat}
                      <span className="text-sm font-normal text-slate-300">
                        {v.listingType === "full" ? "/day" : "/seat"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Content Section */}
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="font-bold text-xl text-slate-900 truncate pr-4">
                    {v.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span className="text-sm font-semibold text-slate-700">
                      4.8
                    </span>
                  </div>
                </div>

                {/* Quick Details */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="flex items-center gap-2 text-slate-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm truncate">
                      {v.city || "Location"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Fuel className="w-4 h-4" />
                    <span className="text-sm truncate">
                      {v.fuelType || "Fuel Type"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Settings className="w-4 h-4" />
                    <span className="text-sm truncate">
                      {v.transmission || "Transmission"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-600">
                    <Users className="w-4 h-4" />
                    <span className="text-sm truncate">
                      {v.seats || "Seats"} seats
                    </span>
                  </div>
                </div>

                {/* Description Preview */}
                <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                  {v.description || "No description available"}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-slate-100">
                  <button
                    onClick={() => navigate(`/dashboard/edit-vehicle/${v._id}`)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 font-semibold rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group/edit"
                  >
                    <Pencil className="w-4 h-4 group-hover/edit:scale-110 transition-transform" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteClick(v)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-rose-50 to-rose-100 text-rose-700 font-semibold rounded-xl hover:from-rose-100 hover:to-rose-200 transition-all group/delete"
                  >
                    <Trash2 className="w-4 h-4 group-hover/delete:scale-110 transition-transform" />
                    Delete
                  </button>
                </div>

                {/* Additional Info */}
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Clock className="w-4 h-4" />
                    <span>Updated recently</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-sm">
                    <Shield className="w-4 h-4" />
                    <span>Verified</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State Message */}
        <div className="text-center mt-12">
          <p className="text-slate-500 text-sm">
            Showing {vehicles.length} vehicle{vehicles.length !== 1 ? "s" : ""}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MyVehicles;

// Add missing Plus icon component
const Plus = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4v16m8-8H4"
    />
  </svg>
);
