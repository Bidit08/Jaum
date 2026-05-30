import React from "react";
import { useComparison } from "../context/ComparisonContext";
import { X, ArrowRight, Car } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CompareTray = () => {
  const { selectedVehicles, removeFromComparison, clearComparison } =
    useComparison();
  const navigate = useNavigate();

  if (selectedVehicles.length < 1) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 animate-in slide-in-from-bottom-10 duration-500">
      <div className="max-w-4xl mx-auto mb-6 px-4">
        <div className="bg-slate-900 border border-slate-700 text-white rounded-3xl p-4 shadow-2xl shadow-blue-900/40 flex flex-col md:flex-row items-center gap-6 justify-between backdrop-blur-xl">
          {/* Left: Info */}
          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="bg-blue-600 rounded-2xl w-12 h-12 flex items-center justify-center shrink-0">
              <span className="font-black text-lg">
                {selectedVehicles.length}
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-0.5">
                Selection
              </p>
              <p className="font-bold text-sm">Compare Vehicles</p>
            </div>
          </div>

          {/* Middle: Thumbs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto justify-center">
            {selectedVehicles.map((v) => (
              <div key={v._id} className="relative group shrink-0">
                <img
                  src={
                    v.photos?.[0]
                      ? v.photos[0].startsWith("http")
                        ? v.photos[0]
                        : `https://jaum-t3no.onrender.com${v.photos[0]}`
                      : "/placeholder-car.jpg"
                  }
                  alt={v.name}
                  className="w-14 h-14 rounded-xl border-2 border-slate-700 object-cover group-hover:border-blue-500 transition-colors"
                />
                <button
                  onClick={() => removeFromComparison(v._id)}
                  className="absolute -top-1.5 -right-1.5 bg-red-500 rounded-full p-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all shadow-md hover:scale-110"
                >
                  <X size={10} strokeWidth={3} />
                </button>
              </div>
            ))}

            {/* Empty Slots */}
            {[...Array(3 - selectedVehicles.length)].map((_, i) => (
              <div
                key={`empty-${i}`}
                className="w-14 h-14 rounded-xl border-2 border-dashed border-slate-700 flex items-center justify-center shrink-0"
              >
                <Car size={16} className="text-slate-700" />
              </div>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-4 w-full md:w-auto justify-end">
            <button
              onClick={clearComparison}
              className="text-xs text-slate-400 hover:text-white font-bold uppercase tracking-wider px-2"
            >
              Clear All
            </button>
            <button
              onClick={() => navigate("/compare")}
              disabled={selectedVehicles.length < 2}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
            >
              Compare Now <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompareTray;
