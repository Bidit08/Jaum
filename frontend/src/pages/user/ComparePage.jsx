import React from "react";
import { useComparison } from "../../context/ComparisonContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Car,
  Users,
  MapPin,
  Gauge,
  ShieldCheck,
  X,
  ArrowRight,
  Check,
  Minus,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const ComparePage = () => {
  const { selectedVehicles, removeFromComparison, clearComparison } =
    useComparison();
  const navigate = useNavigate();

  if (selectedVehicles.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <Car size={64} className="text-slate-300 mb-6" />
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            No Vehicles to Compare
          </h2>
          <p className="text-slate-500 mb-8">
            Select vehicles from the listings page to see them side-by-side.
          </p>
          <button
            onClick={() => navigate("/listings")}
            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition"
          >
            Browse Listings
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  // Helper to get value or default
  const getValue = (vehicle, field) => vehicle[field] || "-";

  const renderCell = (vehicle, field, isPrice = false) => {
    let content = getValue(vehicle, field);
    if (isPrice) {
      const price =
        vehicle.listingType === "full"
          ? vehicle.pricePerDay
          : vehicle.pricePerSeat;
      content = `$${price}`;
    }
    return (
      <div className="py-4 border-b border-slate-100 text-sm font-medium text-slate-700 h-16 flex items-center justify-center text-center px-2">
        {content}
      </div>
    );
  };

  const getLowestPriceId = () => {
    if (selectedVehicles.length < 2) return null;
    // Only compare if types match somewhat, or just raw numbers?
    // Let's just find min price regardless of type for now, or maybe split logic visually.
    // For simplicity: specific to listing type
    return selectedVehicles.reduce(
      (min, v) => {
        const p = v.listingType === "full" ? v.pricePerDay : v.pricePerSeat;
        return p < min.price ? { id: v._id, price: p } : min;
      },
      { id: null, price: Infinity },
    ).id;
  };

  const bestPriceId = getLowestPriceId();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col pt-24">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 py-8 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-black text-slate-900">
            Compare Vehicles
          </h1>
          <button
            onClick={clearComparison}
            className="text-sm font-bold text-red-500 hover:text-red-700 hover:bg-red-50 px-4 py-2 rounded-lg transition"
          >
            Clear All
          </button>
        </div>

        <div className="overflow-x-auto pb-8">
          <div className="min-w-[800px] grid grid-cols-[200px_repeat(auto-fit,minmax(250px,1fr))] gap-0 bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Labels Column */}
            <div className="col-span-1 bg-slate-50/50 border-r border-slate-200">
              <div className="h-64 border-b border-slate-200 p-4 font-bold text-slate-400 flex items-end pb-4">
                Vehicle Details
              </div>
              {[
                "Price",
                "Type",
                "Transmission",
                "Seats",
                "Fuel",
                "Location",
                "Brand",
              ].map((label) => (
                <div
                  key={label}
                  className="py-4 border-b border-slate-100 text-sm font-bold text-slate-900 h-16 flex items-center px-6"
                >
                  {label}
                </div>
              ))}
              <div className="py-4 h-24 flex items-center px-6" />
            </div>

            {/* Vehicle Columns */}
            {selectedVehicles.map((vehicle) => (
              <div
                key={vehicle._id}
                className="col-span-1 border-r border-slate-100 min-w-[250px] relative"
              >
                <button
                  onClick={() => removeFromComparison(vehicle._id)}
                  className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-100 text-slate-400 hover:bg-red-50 hover:text-red-500 transition z-10"
                >
                  <X size={16} />
                </button>

                {/* Header / Image */}
                <div className="h-64 border-b border-slate-200 p-4 flex flex-col justify-end relative">
                  <div className="absolute inset-0 p-4">
                    <img
                      src={
                        vehicle.photos?.[0]
                          ? vehicle.photos[0].startsWith("http")
                            ? vehicle.photos[0]
                            : `http://localhost:5000${vehicle.photos[0]}`
                          : "/placeholder-car.jpg"
                      }
                      className="w-full h-32 object-contain mb-4 rounded-xl"
                      alt={vehicle.name}
                    />
                  </div>
                  <div className="pt-32 relative z-10 text-center">
                    <h3 className="font-bold text-lg text-slate-900 truncate px-2">
                      {vehicle.name}
                    </h3>
                    <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                      {vehicle.brand}
                    </p>
                  </div>
                </div>

                {/* Rows */}
                <div
                  className={`py-4 border-b border-slate-100 h-16 flex items-center justify-center ${bestPriceId === vehicle._id ? "bg-emerald-50/50" : ""}`}
                >
                  <span
                    className={`font-bold ${bestPriceId === vehicle._id ? "text-emerald-600" : "text-slate-900"}`}
                  >
                    $
                    {vehicle.listingType === "full"
                      ? vehicle.pricePerDay
                      : vehicle.pricePerSeat}
                    <span className="text-xs font-normal text-slate-400 ml-1">
                      /{vehicle.listingType === "full" ? "day" : "seat"}
                    </span>
                  </span>
                  {bestPriceId === vehicle._id && (
                    <span className="ml-2 px-1.5 py-0.5 rounded text-[9px] bg-emerald-100 text-emerald-700 font-bold uppercase">
                      Best Value
                    </span>
                  )}
                </div>

                {/* Type */}
                <div className="py-4 border-b border-slate-100 h-16 flex items-center justify-center">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 ${vehicle.listingType === "full" ? "bg-blue-100 text-blue-700" : "bg-emerald-100 text-emerald-700"}`}
                  >
                    {vehicle.listingType === "full" ? (
                      <Car size={12} />
                    ) : (
                      <Users size={12} />
                    )}
                    {vehicle.listingType === "full"
                      ? "Full Rental"
                      : "Seat Share"}
                  </span>
                </div>

                {/* Transmission */}
                {renderCell(vehicle, "transmission")}

                {/* Seats */}
                <div className="py-4 border-b border-slate-100 h-16 flex items-center justify-center">
                  <span className="flex items-center gap-1.5 text-sm font-medium text-slate-700">
                    <Users size={14} className="text-slate-400" />
                    {vehicle.seats || vehicle.availableSeats}
                  </span>
                </div>

                {/* Fuel */}
                {renderCell(vehicle, "fuelType")}

                {/* Location */}
                <div className="py-4 border-b border-slate-100 h-16 flex items-center justify-center px-4">
                  <div className="flex flex-col items-center">
                    <span className="text-xs text-center font-medium block truncate max-w-[200px]">
                      {vehicle.listingType === "full" ? (
                        vehicle.location
                      ) : (
                        <span className="flex items-center gap-1">
                          {vehicle.departure} <ArrowRight size={10} />{" "}
                          {vehicle.destination}
                        </span>
                      )}
                    </span>
                  </div>
                </div>

                {/* Brand */}
                {renderCell(vehicle, "brand")}

                {/* Action */}
                <div className="py-4 h-24 flex items-center justify-center px-4">
                  <button
                    onClick={() => navigate(`/listings/${vehicle._id}`)}
                    className="w-full py-3 rounded-xl bg-slate-900 text-white text-xs font-bold uppercase tracking-wider hover:bg-blue-600 transition shadow-lg shadow-slate-200"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}

            {/* Empty Slots Filler */}
            {[...Array(3 - selectedVehicles.length)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="col-span-1 border-r border-slate-50 bg-slate-50/30 min-w-[250px] flex flex-col items-center justify-center p-8 opacity-50"
              >
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mb-4 border border-dashed border-slate-300">
                  <Car size={24} className="text-slate-300" />
                </div>
                <p className="text-sm font-bold text-slate-400">Add Vehicle</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ComparePage;
