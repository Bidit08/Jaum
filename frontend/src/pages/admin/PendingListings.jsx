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

import { useEffect, useState } from "react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const PendingListings = () => {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);

  const BACKEND_URL = "http://localhost:5000";

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

  const approve = async (id) => {
    await api.put(`/admin/listings/${id}/approve`);
    toast.success("Listing approved");
    fetchListings();
  };

  const reject = async (id) => {
    await api.delete(`/admin/listings/${id}/reject`);
    toast.success("Listing rejected");
    fetchListings();
  };

  if (loading) return <p>Loading...</p>;

  if (!listings.length)
    return <p className="text-slate-500">No pending listings.</p>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Pending Listings</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {listings.map((l) => (
          <div
            key={l._id}
            className="bg-white rounded-2xl border shadow overflow-hidden"
          >
            <img
              src={`${BACKEND_URL}${l.photos[0]}`}
              alt={l.name}
              className="h-48 w-full object-cover"
            />

            <div className="p-4 space-y-2">
              <h3 className="font-bold">{l.name}</h3>
              <p className="text-sm text-slate-500">Owner: {l.owner?.name}</p>

              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => approve(l._id)}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700"
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(l._id)}
                  className="flex-1 bg-red-600 text-white py-2 rounded-lg font-semibold hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingListings;
