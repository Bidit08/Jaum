// import React from "react";
// import {
//   Car,
//   Settings,
//   DollarSign,
//   Image as ImageIcon,
//   CheckCircle,
// } from "lucide-react";

// const StepReview = ({ formData }) => {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
//       <div className="space-y-2">
//         <h2 className="text-xl font-bold text-slate-900">Review Listing</h2>
//         <p className="text-slate-500 text-sm">
//           Everything looks great! Review your details before publishing.
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//         {/* Main Details */}
//         <div className="space-y-6">
//           <div className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <Car size={14} /> Basic Information
//             </h3>
//             <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 space-y-3">
//               <div>
//                 <p className="text-xs text-slate-500">Name</p>
//                 <p className="font-bold text-slate-900">
//                   {formData.name || "N/A"}
//                 </p>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-xs text-slate-500">Brand</p>
//                   <p className="font-bold text-slate-900">
//                     {formData.brand || "N/A"}
//                   </p>
//                 </div>
//                 <div>
//                   <p className="text-xs text-slate-500">Year</p>
//                   <p className="font-bold text-slate-900">
//                     {formData.year || "N/A"}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <Settings size={14} /> Specifications
//             </h3>
//             <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 flex flex-wrap gap-2">
//               <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
//                 {formData.fuelType}
//               </span>
//               <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
//                 {formData.transmission}
//               </span>
//               <span className="px-3 py-1 bg-white border border-slate-200 rounded-lg text-xs font-semibold text-slate-700">
//                 {formData.seats} Seats
//               </span>

//               {formData.features.map((f) => (
//                 <span
//                   key={f}
//                   className="px-3 py-1 bg-blue-50 border border-blue-100 rounded-lg text-xs font-semibold text-blue-600"
//                 >
//                   ✓ {f}
//                 </span>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Pricing & Photos */}
//         <div className="space-y-6">
//           <div className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <DollarSign size={14} /> Pricing
//             </h3>
//             <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 grid grid-cols-2 gap-4">
//               <div>
//                 <p className="text-xs text-slate-500">Daily Rate</p>
//                 <p className="text-xl font-extrabold text-blue-600">
//                   ${formData.pricePerDay}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-xs text-slate-500">Deposit</p>
//                 <p className="text-xl font-extrabold text-slate-900">
//                   ${formData.deposit}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="space-y-4">
//             <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
//               <ImageIcon size={14} /> Photos ({formData.photos.length})
//             </h3>
//             <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//               {formData.photos.map((p, i) => (
//                 <img
//                   key={i}
//                   src={p}
//                   className="w-16 h-16 rounded-lg object-cover border border-slate-200 flex-shrink-0"
//                 />
//               ))}
//               {formData.photos.length === 0 && (
//                 <p className="text-xs text-slate-400 italic">
//                   No photos uploaded
//                 </p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-4">
//         <CheckCircle className="text-emerald-500" size={24} />
//         <p className="text-xs text-emerald-800 font-medium">
//           Listing is ready for review by our moderation team. Most vehicles go
//           live within 24 hours.
//         </p>
//       </div>
//     </div>
//   );
// };

// export default StepReview;

// import React from "react";
// import {
//   Car,
//   Settings,
//   DollarSign,
//   Image as ImageIcon,
//   CheckCircle,
//   MapPin,
// } from "lucide-react";

// const StepReview = ({ formData }) => {
//   return (
//     <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div>
//         <h2 className="text-xl font-bold">Final Review</h2>
//         <p className="text-slate-500 text-sm">
//           Review your listing before publishing.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="space-y-6">
//           <div>
//             <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
//               <Car size={14} /> Listing Type
//             </h3>
//             <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
//               {formData.listingType === "full"
//                 ? "Full Vehicle Rental"
//                 : "Seat Sharing"}
//             </span>
//           </div>

//           <div>
//             <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
//               <Settings size={14} /> Vehicle Specs
//             </h3>
//             <div className="bg-slate-50 p-4 rounded-xl mt-2 space-y-2">
//               <p className="font-bold">{formData.name}</p>
//               <p>
//                 {formData.brand} {formData.model}
//               </p>
//               <p>
//                 {formData.fuelType} • {formData.transmission}
//               </p>
//             </div>
//           </div>
//         </div>

//         <div className="space-y-6">
//           <div>
//             <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
//               <DollarSign size={14} /> Pricing
//             </h3>

//             {formData.listingType === "full" ? (
//               <div className="bg-slate-50 p-4 rounded-xl space-y-2">
//                 <p className="flex items-center gap-2">
//                   <MapPin size={14} /> {formData.location}
//                 </p>
//                 <p className="font-bold text-xl text-blue-600">
//                   ${formData.pricePerDay}/day
//                 </p>
//               </div>
//             ) : (
//               <div className="bg-slate-50 p-4 rounded-xl space-y-2">
//                 <p>
//                   {formData.departure} → {formData.destination}
//                 </p>
//                 <p className="font-bold text-emerald-600">
//                   ${formData.pricePerSeat} per seat
//                 </p>
//               </div>
//             )}
//           </div>

//           <div>
//             <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
//               <ImageIcon size={14} /> Photos
//             </h3>
//             <div className="flex gap-2 mt-2">
//               {formData.photos.map((p, i) => (
//                 <img
//                   key={i}
//                   src={p}
//                   className="w-16 h-16 object-cover rounded-lg border"
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
//         <CheckCircle className="text-blue-500" />
//         <p className="text-sm font-semibold">Ready to publish 🚀</p>
//       </div>
//     </div>
//   );
// };

// export default StepReview;

import React from "react";
import {
  Car,
  Settings,
  DollarSign,
  Image as ImageIcon,
  CheckCircle,
  MapPin,
} from "lucide-react";

const BACKEND_URL = "http://localhost:5000";

const StepReview = ({ formData }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h2 className="text-xl font-bold">Final Review</h2>
        <p className="text-slate-500 text-sm">
          Review your listing before publishing.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* LEFT */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
              <Car size={14} /> Listing Type
            </h3>
            <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold">
              {formData.listingType === "full"
                ? "Full Vehicle Rental"
                : "Seat Sharing"}
            </span>
          </div>

          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
              <Settings size={14} /> Vehicle Specs
            </h3>
            <div className="bg-slate-50 p-4 rounded-xl mt-2 space-y-1">
              <p className="font-bold">{formData.name}</p>
              <p>
                {formData.brand} {formData.model}
              </p>
              <p>
                {formData.fuelType} • {formData.transmission}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
              <DollarSign size={14} /> Pricing
            </h3>

            {formData.listingType === "full" ? (
              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <p className="flex items-center gap-2">
                  <MapPin size={14} /> {formData.location}
                </p>
                <p className="font-bold text-xl text-blue-600">
                  ${formData.pricePerDay} / day
                </p>
              </div>
            ) : (
              <div className="bg-slate-50 p-4 rounded-xl space-y-2">
                <p>
                  {formData.departure} → {formData.destination}
                </p>
                <p className="font-bold text-emerald-600">
                  ${formData.pricePerSeat} per seat
                </p>
              </div>
            )}
          </div>

          {/* PHOTOS */}
          <div>
            <h3 className="text-xs font-bold uppercase text-slate-400 flex gap-2">
              <ImageIcon size={14} /> Photos
            </h3>

            <div className="flex gap-2 mt-2 flex-wrap">
              {formData.photos && formData.photos.length > 0 ? (
                formData.photos.map((p, i) => (
                  <img
                    key={i}
                    src={`${BACKEND_URL}${p}`}
                    alt="Vehicle"
                    className="w-16 h-16 object-cover rounded-lg border"
                  />
                ))
              ) : (
                <p className="text-xs text-slate-400 italic">
                  No photos uploaded
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
        <CheckCircle className="text-blue-500" />
        <p className="text-sm font-semibold">Ready to publish 🚀</p>
      </div>
    </div>
  );
};

export default StepReview;
