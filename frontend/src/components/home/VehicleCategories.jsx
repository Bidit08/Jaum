import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "../../utils/api";

/* ── Category definitions ───────────────────────────────────── */
const CATEGORIES = [
  {
    key: "SUV",
    label: "SUV",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M4 8l2-4h12l2 4" />
        <rect x="2" y="8" width="20" height="9" rx="2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    filter: (l) => l.category?.toLowerCase().includes("suv"),
  },
  {
    key: "Sedan",
    label: "Sedan",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M3 10l3-5h12l3 5" />
        <rect x="1" y="10" width="22" height="7" rx="2" />
        <circle cx="6" cy="17" r="2" />
        <circle cx="18" cy="17" r="2" />
      </svg>
    ),
    filter: (l) => l.category?.toLowerCase().includes("sedan"),
  },
  {
    key: "Electric",
    label: "Electric",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    ),
    filter: (l) => l.fuelType?.toLowerCase() === "electric",
  },
  {
    key: "Luxury",
    label: "Luxury",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M6 3h12l4 6-10 12L2 9l4-6z" />
        <path d="M2 9h20" />
        <path d="M12 21V9" />
        <path d="M6 3l6 6" />
        <path d="M18 3l-6 6" />
      </svg>
    ),
    filter: (l) => l.category?.toLowerCase().includes("luxury"),
  },
  {
    key: "Hatchback",
    label: "Hatchback",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-8 h-8"
      >
        <path d="M4 11l3-6h8l3 3v3" />
        <rect x="2" y="11" width="20" height="6" rx="2" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
      </svg>
    ),
    filter: (l) => l.category?.toLowerCase().includes("hatchback"),
  },
];

/* ── Component ──────────────────────────────────────────────── */
const VehicleCategories = () => {
  const [counts, setCounts] = useState({});

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const res = await api.get("/listings");
        const listings = res.data;
        const map = {};
        CATEGORIES.forEach((cat) => {
          map[cat.key] = listings.filter(cat.filter).length;
        });
        setCounts(map);
      } catch {
        /* silently fail */
      }
    };
    fetchCounts();
  }, []);

  return (
    <section className="py-20 bg-slate-50 relative border-b border-slate-100">
      <div className="container mx-auto px-6 md:px-12 lg:px-20 relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          {/* <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
              Browse by Body Type
            </h2>
            <p className="text-slate-500 mt-2 text-base">
              Find the perfect vehicle for your next adventure
            </p>
          </div> */}
          <div>
            <p className="text-xs font-bold tracking-[0.2em] uppercase text-blue-600 mb-3">
              Explore by type
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
              Choose Your{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Ride Style
              </span>
            </h2>
            <p className="text-slate-500 mt-3 text-base font-medium">
              From daily drives to luxury experiences
            </p>
          </div>
          <Link
            to="/listings"
            className="shrink-0 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            View All <ArrowRight size={16} />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.key}
              to={`/listings?category=${cat.key.toLowerCase().replace(" ", "-")}`}
              className="group flex flex-col items-center text-center bg-white border border-slate-200 rounded-2xl p-6 transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-md hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 mb-4 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-200 group-hover:shadow-sm transition-all duration-300">
                {cat.icon}
              </div>

              {/* Text Content */}
              <h3 className="text-slate-800 font-medium text-lg">
                {cat.label}
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                {counts[cat.key] != null
                  ? `${counts[cat.key]} vehicles`
                  : "Browse"}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VehicleCategories;
