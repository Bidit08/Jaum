// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import ListingApprovalCard from "../../components/admin/ListingApprovalCard";

// const PendingListings = () => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchPending = async () => {
//       try {
//         const res = await api.get("/admin/listings/pending");
//         setListings(res.data);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPending();
//   }, []);

//   if (loading) return <p>Loading...</p>;

//   if (!listings.length)
//     return <p className="text-slate-500">No pending listings 🎉</p>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Pending Listings</h1>

//       <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
//         {listings.map((listing) => (
//           <ListingApprovalCard
//             key={listing._id}
//             listing={listing}
//             onApproved={() =>
//               setListings((prev) => prev.filter((l) => l._id !== listing._id))
//             }
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PendingListings;

// import { useEffect, useState } from "react";
// import api from "../../utils/api";
// import { toast } from "react-toastify";

// const PendingListings = () => {
//   const [listings, setListings] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const BACKEND_URL = "http://localhost:5000";

//   const fetchListings = async () => {
//     try {
//       const res = await api.get("/admin/listings/pending");
//       setListings(res.data);
//     } catch {
//       toast.error("Failed to load pending listings");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchListings();
//   }, []);

//   const approve = async (id) => {
//     await api.put(`/admin/listings/${id}/approve`);
//     toast.success("Listing approved");
//     fetchListings();
//   };

//   const reject = async (id) => {
//     await api.delete(`/admin/listings/${id}/reject`);
//     toast.success("Listing rejected");
//     fetchListings();
//   };

//   if (loading) return <p>Loading...</p>;

//   if (!listings.length)
//     return <p className="text-slate-500">No pending listings.</p>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Pending Listings</h1>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {listings.map((l) => (
//           <div
//             key={l._id}
//             className="bg-white rounded-2xl border shadow overflow-hidden"
//           >
//             <img
//               src={`${BACKEND_URL}${l.photos[0]}`}
//               alt={l.name}
//               className="h-48 w-full object-cover"
//             />

//             <div className="p-4 space-y-2">
//               <h3 className="font-bold">{l.name}</h3>
//               <p className="text-sm text-slate-500">Owner: {l.owner?.name}</p>

//               <div className="flex gap-2 pt-2">
//                 <button
//                   onClick={() => approve(l._id)}
//                   className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
//                 >
//                   Approve
//                 </button>

//                 <button
//                   onClick={() => reject(l._id)}
//                   className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PendingListings;

import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { Clock, ClipboardCheck } from "lucide-react";
import ListingApprovalCard from "@/components/admin/ListingApprovalCard";

const PendingListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchListings = async () => {
    try {
      const res = await api.get("/admin/listings/pending");
      setListings(res.data);
    } catch {
      toast.error("Failed to load pending listings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="w-12 h-12 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!listings.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-3xl p-16 text-center space-y-6 shadow-sm">
        <div className="w-20 h-20 bg-slate-50 rounded-3xl flex items-center justify-center mx-auto border">
          <ClipboardCheck className="text-slate-300" size={40} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900">
          No pending listings
        </h2>
        <p className="text-slate-500 max-w-md mx-auto">
          All submitted listings have been reviewed. New submissions will appear
          here for approval.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            Pending Listings
          </h1>
          <p className="text-slate-500">
            Review and approve newly submitted vehicle listings.
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-700 rounded-xl font-bold text-sm">
          <Clock size={16} />
          {listings.length} Awaiting Approval
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <ListingApprovalCard
            key={listing._id}
            listing={listing}
            onApproved={fetchListings}
            onRejected={fetchListings}
          />
        ))}
      </div>
    </div>
  );
};

export default PendingListings;
