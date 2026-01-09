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
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import BookingModal from "../../components/BookingModal";

const BACKEND_URL = "http://localhost:5000";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await api.get(`/listings/${id}`);
        setListing(res.data);
      } catch (err) {
        toast.error("Listing not found");
        navigate("/listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!listing) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-6"
      >
        <ArrowLeft size={18} /> Back
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Images */}
        <div className="space-y-4">
          <img
            src={
              listing.photos?.length
                ? `${BACKEND_URL}${listing.photos[0]}`
                : "/placeholder-car.jpg"
            }
            alt={listing.name}
            className="w-full h-80 object-cover rounded-2xl shadow"
          />

          {listing.photos?.length > 1 && (
            <div className="grid grid-cols-4 gap-3">
              {listing.photos.slice(1).map((p, i) => (
                <img
                  key={i}
                  src={`${BACKEND_URL}${p}`}
                  alt=""
                  className="h-20 w-full object-cover rounded-lg"
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{listing.name}</h1>
            <p className="text-slate-500">
              {listing.brand} {listing.model} • {listing.year}
            </p>
          </div>

          {/* Type */}
          <span
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold ${
              listing.listingType === "full"
                ? "bg-blue-100 text-blue-700"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            {listing.listingType === "full" ? (
              <>
                <Car size={16} /> Full Vehicle
              </>
            ) : (
              <>
                <Users size={16} /> Seat Listing
              </>
            )}
          </span>

          {/* Price */}
          <div className="bg-slate-50 p-5 rounded-xl">
            <p className="text-slate-500 text-sm">Price</p>
            <p className="text-3xl font-bold text-slate-900">
              Rs.{" "}
              {listing.listingType === "full"
                ? listing.pricePerDay
                : listing.pricePerSeat}
              <span className="text-base font-normal text-slate-500">
                {listing.listingType === "full" ? " / day" : " / seat"}
              </span>
            </p>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2 text-slate-600">
              <Fuel size={16} /> {listing.fuelType}
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Settings size={16} /> {listing.transmission}
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Users size={16} /> {listing.seats} seats
            </div>
            {listing.listingType === "full" ? (
              <div className="flex items-center gap-2 text-slate-600">
                <MapPin size={16} /> {listing.location}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-slate-600">
                <Calendar size={16} /> {listing.departure} →{" "}
                {listing.destination}
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="font-bold mb-2">Description</h3>
            <p className="text-slate-600 leading-relaxed">
              {listing.description || "No description provided."}
            </p>
          </div>

          {/* Book Button */}
          <button
            onClick={() => setShowBooking(true)}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl text-lg font-semibold transition"
          >
            {listing.listingType === "full" ? "Book Vehicle" : "Book Seat"}
          </button>
        </div>
      </div>

      {/* Booking Modal */}
      {showBooking && (
        <BookingModal listing={listing} onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default ListingDetails;
