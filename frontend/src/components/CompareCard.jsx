import React from "react";
import { Car, Users, Check, Plus } from "lucide-react";
import { useComparison } from "../context/ComparisonContext";

const CompareCard = ({ listing }) => {
  const { selectedVehicles, addToComparison, removeFromComparison } =
    useComparison();

  const isSelected = selectedVehicles.some((v) => v._id === listing._id);
  const isFull = listing.listingType === "full";
  const BACKEND_URL = "https://jaum-t3no.onrender.com";

  const handleToggle = () => {
    if (isSelected) {
      removeFromComparison(listing._id);
    } else {
      addToComparison(listing);
    }
  };

  return (
    <div
      onClick={handleToggle}
      className={`relative group bg-white rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 border-2 ${
        isSelected
          ? "border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.15)] scale-[1.02]"
          : "border-transparent hover:border-slate-200 hover:shadow-xl"
      }`}
    >
      {/* Selection Overlay */}
      {isSelected && (
        <div className="absolute inset-0 bg-blue-600/10 z-10 pointer-events-none flex items-center justify-center">
          <div className="bg-blue-600 text-white p-3 rounded-full shadow-xl animate-in zoom-in duration-200">
            <Check size={24} strokeWidth={3} />
          </div>
        </div>
      )}

      {/* Image */}
      <div className="relative h-56 bg-slate-100">
        <img
          src={
            listing.photos?.[0]
              ? listing.photos[0].startsWith("http")
                ? listing.photos[0]
                : `${BACKEND_URL}${listing.photos[0]}`
              : "/placeholder-car.jpg"
          }
          alt={listing.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span
            className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md flex items-center gap-1.5 border border-white/20 text-white ${
              isFull ? "bg-blue-600/90" : "bg-emerald-500/90"
            }`}
          >
            {isFull ? <Car size={12} /> : <Users size={12} />}
            {isFull ? "Rental" : "Share"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
              {listing.brand}
            </p>
            <h3 className="font-bold text-lg text-slate-900 leading-tight">
              {listing.name}
            </h3>
          </div>
          <div className="text-right">
            <p className="font-black text-lg text-slate-900">
              <span className="text-blue-600 text-sm align-top">$</span>
              {isFull ? listing.pricePerDay : listing.pricePerSeat}
            </p>
          </div>
        </div>

        {/* Action Button (Visual only, card click handles action) */}
        <button
          className={`w-full py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors ${
            isSelected
              ? "bg-blue-50 text-blue-600"
              : "bg-slate-100 text-slate-500 group-hover:bg-slate-900 group-hover:text-white"
          }`}
        >
          {isSelected ? (
            <>
              <Check size={14} /> Selected
            </>
          ) : (
            <>
              <Plus size={14} /> Add to Compare
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default CompareCard;
