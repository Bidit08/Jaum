// import { Car, Users, CheckCircle } from "lucide-react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const BACKEND_URL = "http://localhost:5000";

// const ListingApprovalCard = ({ listing, onApproved }) => {
//   const approveListing = async () => {
//     try {
//       await api.put(`/admin/listings/${listing._id}/approve`);
//       toast.success("Listing approved");
//       onApproved();
//     } catch (err) {
//       toast.error("Approval failed");
//     }
//   };

//   return (
//     <div className="bg-white rounded-2xl shadow border overflow-hidden">
//       <img
//         src={`${BACKEND_URL}${listing.photos[0]}`}
//         alt={listing.name}
//         className="h-48 w-full object-cover"
//       />

//       <div className="p-4 space-y-2">
//         <h3 className="font-bold text-lg">{listing.name}</h3>

//         <span
//           className={`inline-flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full ${
//             listing.listingType === "full"
//               ? "bg-blue-100 text-blue-700"
//               : "bg-emerald-100 text-emerald-700"
//           }`}
//         >
//           {listing.listingType === "full" ? (
//             <>
//               <Car size={12} /> Full Vehicle
//             </>
//           ) : (
//             <>
//               <Users size={12} /> Seat Listing
//             </>
//           )}
//         </span>

//         <p className="text-sm text-slate-500">
//           Owner: {listing.owner?.name || "Unknown"}
//         </p>

//         <button
//           onClick={approveListing}
//           className="w-full mt-3 bg-emerald-600 text-white py-2 rounded-xl font-semibold hover:bg-emerald-700 transition flex items-center justify-center gap-2"
//         >
//           <CheckCircle size={18} /> Approve Listing
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ListingApprovalCard;

import { Car, Users, CheckCircle, XCircle, Clock } from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const BACKEND_URL = "http://localhost:5000";

const ListingApprovalCard = ({ listing, onApproved, onRejected }) => {
  const approveListing = async () => {
    try {
      await api.put(`/admin/listings/${listing._id}/approve`);
      toast.success("Listing approved");
      onApproved();
    } catch {
      toast.error("Approval failed");
    }
  };

  const rejectListing = async () => {
    try {
      await api.delete(`/admin/listings/${listing._id}/reject`);
      toast.success("Listing rejected");
      onRejected();
    } catch {
      toast.error("Rejection failed");
    }
  };

  return (
    <div className="group bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all overflow-hidden">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        <img
          src={`${BACKEND_URL}${listing.photos?.[0]}`}
          alt={listing.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Pending Badge */}
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-amber-100 text-amber-700 text-xs font-bold flex items-center gap-1">
          <Clock size={12} /> Pending Approval
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <span
            className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1
              ${
                listing.listingType === "full"
                  ? "bg-blue-600 text-white"
                  : "bg-emerald-600 text-white"
              }`}
          >
            {listing.listingType === "full" ? (
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
      </div>

      {/* Content */}
      <div className="p-5 space-y-4">
        <div>
          <h3 className="text-lg font-bold text-slate-900 truncate">
            {listing.name}
          </h3>
          <p className="text-sm text-slate-500">
            Owner:{" "}
            <span className="font-semibold text-slate-700">
              {listing.owner?.name || "Unknown"}
            </span>
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-2">
          <button
            onClick={approveListing}
            className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-2.5 rounded-xl font-semibold transition flex items-center justify-center gap-2"
          >
            <CheckCircle size={16} /> Approve
          </button>

          <button
            onClick={rejectListing}
            className="flex-1 bg-rose-600 hover:bg-rose-700 text-white py-2.5 rounded-xl font-semibold transition flex items-center justify-center gap-2"
          >
            <XCircle size={16} /> Reject
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListingApprovalCard;
