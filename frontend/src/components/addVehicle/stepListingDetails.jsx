// import React from "react";
// import { DollarSign, MapPin, Calendar } from "lucide-react";

// const StepListingDetails = ({ formData, updateFormData }) => {
//   const handleChange = (e) => {
//     updateFormData({ [e.target.name]: e.target.value });
//   };

//   if (formData.listingType === "full") {
//     return (
//       <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//         <div className="space-y-2">
//           <h2 className="text-xl font-bold text-slate-900">
//             Pricing & Availability
//           </h2>
//           <p className="text-slate-500 text-sm">
//             Define how much you want to charge for the full vehicle.
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700">
//               Price per Day ($)
//             </label>
//             <div className="relative">
//               <DollarSign
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <input
//                 type="number"
//                 name="pricePerDay"
//                 value={formData.pricePerDay}
//                 onChange={handleChange}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold"
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700">
//               Security Deposit ($)
//             </label>
//             <div className="relative">
//               <DollarSign
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 size={18}
//               />
//               <input
//                 type="number"
//                 name="deposit"
//                 value={formData.deposit}
//                 onChange={handleChange}
//                 className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 outline-none font-bold"
//               />
//             </div>
//           </div>
//         </div>

//         <div className="md:col-span-2 p-6 bg-blue-50 rounded-2xl border border-blue-100 flex items-start gap-4">
//           <Calendar className="text-blue-600 shrink-0" size={24} />
//           <div className="space-y-1">
//             <h4 className="text-sm font-bold text-blue-900">Instant Booking</h4>
//             <p className="text-xs text-blue-700 leading-relaxed">
//               Your vehicle will be marked as available immediately upon listing.
//               You can manage block-out dates in your dashboard after publishing.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <div className="space-y-2">
//         <h2 className="text-xl font-bold text-slate-900">Trip Details</h2>
//         <p className="text-slate-500 text-sm">
//           Where are you going and how many seats are available?
//         </p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="space-y-2">
//           <label className="text-sm font-semibold text-slate-700">
//             Departure Location
//           </label>
//           <div className="relative">
//             <MapPin
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               size={18}
//             />
//             <input
//               name="departure"
//               value={formData.departure}
//               onChange={handleChange}
//               placeholder="e.g. San Francisco"
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 outline-none"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-semibold text-slate-700">
//             Destination
//           </label>
//           <div className="relative">
//             <MapPin
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               size={18}
//             />
//             <input
//               name="destination"
//               value={formData.destination}
//               onChange={handleChange}
//               placeholder="e.g. Los Angeles"
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 outline-none"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-semibold text-slate-700">
//             Departure Date & Time
//           </label>
//           <div className="relative">
//             <Calendar
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               size={18}
//             />
//             <input
//               type="datetime-local"
//               name="departureTime"
//               value={formData.departureTime}
//               onChange={handleChange}
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 outline-none"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-semibold text-slate-700">
//             Price per Seat ($)
//           </label>
//           <div className="relative">
//             <DollarSign
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               size={18}
//             />
//             <input
//               type="number"
//               name="pricePerSeat"
//               value={formData.pricePerSeat}
//               onChange={handleChange}
//               className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 outline-none font-bold"
//             />
//           </div>
//         </div>

//         <div className="space-y-2">
//           <label className="text-sm font-semibold text-slate-700">
//             Available Seats
//           </label>
//           <input
//             type="number"
//             name="availableSeats"
//             value={formData.availableSeats}
//             onChange={handleChange}
//             max={formData.seats}
//             className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 outline-none"
//           />
//         </div>

//         <div className="md:col-span-2 space-y-2">
//           <label className="text-sm font-semibold text-slate-700">
//             Trip Rules & Notes
//           </label>
//           <textarea
//             name="rules"
//             value={formData.rules}
//             onChange={handleChange}
//             placeholder="e.g. No smoking, light luggage only..."
//             rows={3}
//             className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-blue-500/10 outline-none"
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StepListingDetails;

import React from "react";
import { DollarSign, MapPin, Calendar } from "lucide-react";

const StepListingDetails = ({ formData, updateFormData }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  if (formData.listingType === "full") {
    return (
      <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900">Rental Terms</h2>
          <p className="text-slate-500 text-sm">
            Define how much you want to charge and where the vehicle is located.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-semibold text-slate-700">
              Vehicle Location (Pick-up Point)
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                name="location"
                value={formData.location || ""}
                onChange={handleChange}
                placeholder="e.g. 123 Luxury Ave, Beverly Hills, CA"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Price per Day (Rs.)
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="number"
                name="pricePerDay"
                value={formData.pricePerDay}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 font-bold"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              Security Deposit (Rs.)
            </label>
            <div className="relative">
              <DollarSign
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="number"
                name="deposit"
                value={formData.deposit}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3 font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="space-y-2">
        <h2 className="text-xl font-bold text-slate-900">Trip Details</h2>
        <p className="text-slate-500 text-sm">
          Where are you going and how many seats are available?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "departure", label: "Departure Location" },
          { name: "destination", label: "Destination" },
        ].map((f) => (
          <div key={f.name} className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">
              {f.label}
            </label>
            <div className="relative">
              <MapPin
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                name={f.name}
                value={formData[f.name]}
                onChange={handleChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3"
              />
            </div>
          </div>
        ))}

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Departure Date & Time
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              type="datetime-local"
              name="departureTime"
              value={formData.departureTime}
              onChange={handleChange}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl px-10 py-3"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Price per Seat (Rs.)
          </label>
          <input
            type="number"
            name="pricePerSeat"
            value={formData.pricePerSeat}
            onChange={handleChange}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Available Seats
          </label>
          <input
            type="number"
            name="availableSeats"
            value={formData.availableSeats}
            onChange={handleChange}
            max={formData.seats}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          />
        </div>

        <div className="md:col-span-2 space-y-2">
          <label className="text-sm font-semibold text-slate-700">
            Trip Rules & Notes
          </label>
          <textarea
            name="rules"
            value={formData.rules}
            onChange={handleChange}
            rows={3}
            className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3"
          />
        </div>
      </div>
    </div>
  );
};

export default StepListingDetails;
