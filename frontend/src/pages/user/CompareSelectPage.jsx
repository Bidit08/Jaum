import React, { useEffect, useState } from "react";
import { useComparison } from "../../context/ComparisonContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import api from "../../utils/api";
import { Search, Filter, ArrowLeft, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import CompareCard from "../../components/CompareCard";
import CompareTray from "../../components/CompareTray";

const BACKEND_URL = "http://localhost:5000";

const CompareSelectPage = () => {
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const navigate = useNavigate();

  // Fetch Listings
  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await api.get("/listings");
        const data = Array.isArray(res.data) ? res.data : [];
        setListings(data);
        setFilteredListings(data);
      } catch (err) {
        console.error("Error fetching listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchListings();
  }, []);

  // Filter Logic
  useEffect(() => {
    let result = listings;

    if (activeFilter !== "all") {
      result = result.filter((l) => l.listingType === activeFilter);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.name?.toLowerCase().includes(q) ||
          l.brand?.toLowerCase().includes(q) ||
          l.location?.toLowerCase().includes(q) ||
          l.departure?.toLowerCase().includes(q),
      );
    }

    setFilteredListings(result);
  }, [activeFilter, searchQuery, listings]);

  return (
    <div className="min-h-screen bg-slate-50 relative pb-32">
      <Navbar />

      {/* Header Bar */}
      <div className="bg-white border-b border-slate-200 pt-24 pb-6 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full md:w-auto">
              <button
                onClick={() => navigate(-1)}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <ArrowLeft size={20} className="text-slate-600" />
              </button>
              <div>
                <h1 className="text-2xl font-black text-slate-900">
                  Select Vehicles
                </h1>
                <p className="text-slate-500 text-sm">
                  Choose up to 3 for comparison
                </p>
              </div>
            </div>

            {/* Search & Filter */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-xl text-sm font-medium focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>

              <div className="flex bg-slate-100 p-1 rounded-xl shrink-0">
                {["all", "full", "seats"].map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveFilter(f)}
                    className={`px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeFilter === f ? "bg-white text-blue-600 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={40} />
          </div>
        ) : filteredListings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-slate-400 font-medium">No vehicles found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredListings.map((listing) => (
              <CompareCard key={listing._id} listing={listing} />
            ))}
          </div>
        )}
      </main>

      <CompareTray />
      <Footer />
    </div>
  );
};

export default CompareSelectPage;
