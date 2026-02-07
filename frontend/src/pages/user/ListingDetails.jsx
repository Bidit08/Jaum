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
  Tag,
  Heart,
  Share2,
  Navigation,
  Battery,
  Palette,
  Bluetooth,
  Music,
  Wifi,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import BookingModal from "../../components/BookingModal";
import Navbar from "@/components/Navbar";

const BACKEND_URL = "http://localhost:5000";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showBooking, setShowBooking] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);

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
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-slate-50 to-white">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
          <Car className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-600" />
        </div>
      </div>
    );
  }

  if (!listing) return null;

  const isSeatListing = listing.listingType === "seats";
  const isSoldOut = isSeatListing && Number(listing.availableSeats) === 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Navbar />
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 py-8">
        {/* Header with Back Button */}
        <div className="flex items-center justify-between mb-8 pt-15">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 group"
          >
            <div className="p-2 bg-white rounded-xl border border-slate-200 group-hover:border-blue-300 group-hover:bg-blue-50 transition-all">
              <ArrowLeft className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </div>
            <span className="text-slate-600 font-medium group-hover:text-blue-600 transition-colors">
              Back to listings
            </span>
          </button>

          <div className="flex items-center gap-3">
            <button className="p-3 bg-white rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group">
              <Share2 className="w-5 h-5 text-slate-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button
              onClick={() => setIsFavorite(!isFavorite)}
              className="p-3 bg-white rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50 transition-all group"
            >
              <Heart
                className={`w-5 h-5 transition-colors ${
                  isFavorite
                    ? "fill-rose-500 text-rose-500"
                    : "text-slate-600 group-hover:text-rose-500"
                }`}
              />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images Section */}
          <div className="space-y-6">
            {/* Main Image */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <img
                src={
                  listing.photos?.length
                    ? `${BACKEND_URL}${listing.photos[selectedImage]}`
                    : "/placeholder-car.jpg"
                }
                alt={listing.name}
                className="w-full h-[400px] object-cover rounded-3xl shadow-xl border border-slate-200 relative group-hover:scale-[1.02] transition-transform duration-500"
              />

              {/* Image Badges */}
              <div className="absolute top-6 left-6 flex flex-col gap-2">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                    listing.listingType === "full"
                      ? "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                      : "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
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

                  {isSeatListing && (
                    <div className="absolute bottom-7 left-110">
                      <div
                        className={`px-4 py-2 rounded-2xl text-xs font-bold backdrop-blur-xl border shadow-lg flex items-center gap-2
        ${
          isSoldOut
            ? "bg-rose-600/90 text-white border-rose-400"
            : "bg-emerald-600/90 text-white border-emerald-400"
        }`}
                      >
                        <Users size={14} />
                        {isSoldOut
                          ? "Fully Booked"
                          : `${listing.availableSeats} Seats Available`}
                      </div>
                    </div>
                  )}
                </div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-sm font-bold text-slate-700 shadow-lg">
                  <Shield size={16} className="text-emerald-500" />
                  Verified Host
                </div>
              </div>
            </div>

            {/* Thumbnails */}
            {listing.photos?.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {listing.photos.map((p, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(i)}
                    className={`relative overflow-hidden rounded-2xl border-2 transition-all ${
                      selectedImage === i
                        ? "border-blue-500 ring-4 ring-blue-100"
                        : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <img
                      src={`${BACKEND_URL}${p}`}
                      alt=""
                      className="h-24 w-full object-cover"
                    />
                    {selectedImage === i && (
                      <div className="absolute inset-0 bg-blue-500/20"></div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            {/* Title and Rating */}
            <div>
              <div className="flex items-start justify-between mb-3">
                <h1 className="text-4xl font-bold text-slate-900">
                  {listing.name}
                </h1>
                <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
                  <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                  <span className="font-bold text-slate-900">4.8</span>
                  <span className="text-slate-500 text-sm">(24 reviews)</span>
                </div>
              </div>
              <p className="text-xl text-slate-600 mb-4">
                {listing.brand} {listing.model} • {listing.year}
              </p>

              {/* Quick Stats */}
              <div className="flex items-center gap-6 text-slate-600">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span className="font-medium">Instant booking</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">Free cancellation</span>
                </div>
              </div>
            </div>

            {/* Price Card */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-slate-300 text-sm">Starting from</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold">
                      Rs.{" "}
                      {listing.listingType === "full"
                        ? listing.pricePerDay
                        : listing.pricePerSeat}
                    </span>
                    <span className="text-slate-300">
                      {listing.listingType === "full" ? "/ day" : "/ seat"}
                    </span>
                  </div>
                </div>
                <Sparkles className="w-8 h-8 text-amber-400" />
              </div>
              <p className="text-slate-400 text-sm">
                Includes insurance and 24/7 roadside assistance
              </p>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-blue-50 to-white p-4 rounded-2xl border border-blue-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-blue-100 rounded-xl">
                    <Fuel className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Fuel Type</p>
                    <p className="font-semibold text-slate-900">
                      {listing.fuelType}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-white p-4 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-xl">
                    <Settings className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Transmission</p>
                    <p className="font-semibold text-slate-900">
                      {listing.transmission}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white p-4 rounded-2xl border border-purple-100">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-purple-100 rounded-xl">
                    <Users className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-500">Seats</p>
                    <p className="font-semibold text-slate-900">
                      {listing.seats} seats
                    </p>
                  </div>
                </div>
              </div>

              {listing.listingType === "full" ? (
                <div className="bg-gradient-to-br from-amber-50 to-white p-4 rounded-2xl border border-amber-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-amber-100 rounded-xl">
                      <MapPin className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Location</p>
                      <p className="font-semibold text-slate-900">
                        {listing.location}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-cyan-50 to-white p-4 rounded-2xl border border-cyan-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-cyan-100 rounded-xl">
                      <Navigation className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm text-slate-500">Route</p>
                      <p className="font-semibold text-slate-900">
                        {listing.departure} → {listing.destination}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {isSeatListing && (
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold text-emerald-700">
                    Seat Availability
                  </p>
                  {/* <p className="text-xs text-emerald-600">
                    Updated in real-time
                  </p> */}
                </div>
                <span className="text-2xl font-bold text-emerald-800">
                  {listing.availableSeats}
                </span>
              </div>
            )}

            {/* Vehicle Features */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Vehicle Features
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
                  <Bluetooth className="w-4 h-4" />
                  <span className="text-sm">Bluetooth</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
                  <Music className="w-4 h-4" />
                  <span className="text-sm">Premium Sound</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
                  <Battery className="w-4 h-4" />
                  <span className="text-sm">Navigation</span>
                </div>
                <div className="flex items-center gap-2 text-slate-600 p-3 bg-slate-50 rounded-xl">
                  <Palette className="w-4 h-4" />
                  <span className="text-sm">Leather Seats</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-3xl border border-slate-200 p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Description
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {listing.description ||
                  "No description provided. This vehicle is well-maintained and ready for your next adventure. Experience comfort, safety, and reliability with this premium rental."}
              </p>
            </div>

            {/* Book Button */}
            <button
              disabled={isSoldOut}
              onClick={() => {
                if (isSoldOut) {
                  toast.error("No seats available for this ride");
                  return;
                }
                setShowBooking(true);
              }}
              className={`w-full py-5 rounded-2xl text-lg font-bold shadow-xl transition-all duration-300
    ${
      isSoldOut
        ? "bg-slate-300 text-slate-600 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white hover:shadow-2xl hover:scale-[1.02]"
    }`}
            >
              {listing.listingType === "full"
                ? "Book This Vehicle Now"
                : isSoldOut
                  ? "No Seats Available"
                  : "Book Seat Now"}
            </button>
          </div>
        </div>

        {/* Booking Modal */}
        {showBooking && (
          <BookingModal
            listing={listing}
            onClose={() => setShowBooking(false)}
          />
        )}
      </div>
    </div>
  );
};

export default ListingDetails;
