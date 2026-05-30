import React from "react";
import { useComparison } from "../context/ComparisonContext";
import { X, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const FloatingCompareBar = () => {
  const { selectedVehicles, removeFromComparison, clearComparison } =
    useComparison();
  const navigate = useNavigate();

  if (selectedVehicles.length < 1) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/90 backdrop-blur-md text-white p-3 rounded-2xl shadow-2xl flex items-center gap-4 pr-4 border border-white/10">
        {/* Thumbnails */}
        <div className="flex items-center -space-x-3">
          {selectedVehicles.map((v) => (
            <div key={v._id} className="relative group">
              <img
                src={
                  v.photos?.[0]
                    ? v.photos[0].startsWith("http")
                      ? v.photos[0]
                      : `https://jaum-t3no.onrender.com${v.photos[0]}`
                    : "/placeholder-car.jpg"
                }
                alt={v.name}
                className="w-12 h-12 rounded-full border-2 border-slate-800 object-cover"
              />
              <button
                onClick={() => removeFromComparison(v._id)}
                className="absolute -top-1 -right-1 bg-red-500 rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={10} />
              </button>
            </div>
          ))}
          {/* Empty slots placeholders if needed, but dynamic is fine */}
          {selectedVehicles.length < 3 && (
            <div className="w-12 h-12 rounded-full border-2 border-slate-800 bg-slate-800/50 flex items-center justify-center text-xs font-bold text-slate-500">
              {selectedVehicles.length}/3
            </div>
          )}
        </div>

        <div className="h-8 w-px bg-white/20 mx-2"></div>

        <div className="flex flex-col">
          <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Compare
          </span>
          <span className="text-sm font-bold">
            {selectedVehicles.length} Vehicle
            {selectedVehicles.length !== 1 ? "s" : ""}
          </span>
        </div>

        <button
          onClick={clearComparison}
          className="text-xs text-slate-400 hover:text-white underline px-2"
        >
          Clear
        </button>

        <button
          onClick={() => navigate("/compare")}
          disabled={selectedVehicles.length < 2}
          className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest flex items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Compare <ArrowRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default FloatingCompareBar;
