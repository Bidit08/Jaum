import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../utils/api";
import {
  Camera,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ChevronRight,
  AlertTriangle,
  Search,
  Filter,
} from "lucide-react";
import { toast } from "react-toastify";

const BACKEND_URL = "https://jaum-t3no.onrender.com";

const DamageReportsList = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [allBookings, setAllBookings] = useState([]);
  const [filter, setFilter] = useState("all"); // all, owner, renter

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setLoading(true);
        const [myRes, ownerRes] = await Promise.all([
          api.get("/bookings/my"),
          api.get("/bookings/owner"),
        ]);

        // Add role markers
        const myWithRole = (myRes.data || []).map((b) => ({
          ...b,
          role: "renter",
        }));
        const ownerWithRole = (ownerRes.data || []).map((b) => ({
          ...b,
          role: "owner",
        }));

        // Sort by date (descending)
        const combined = [...myWithRole, ...ownerWithRole]
          .filter((b) => ["confirmed", "completed"].includes(b.status))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setAllBookings(combined);
      } catch (err) {
        toast.error("Failed to load bookings for reports");
      } finally {
        setLoading(false);
      }
    };
    fetchBookings();
  }, []);

  const filtered = allBookings.filter((b) => {
    if (filter === "owner") return b.role === "owner";
    if (filter === "renter") return b.role === "renter";
    return true;
  });

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] font-black uppercase tracking-widest">
            <ShieldAlert size={12} /> Inspection Center
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Damage Reporting
          </h1>
          <p className="text-slate-500 font-medium">
            Manage pre-trip and post-trip vehicle inspections.
          </p>
        </div>

        {/* Filters */}
        <div className="flex bg-white p-1.5 rounded-2xl border border-slate-200 shadow-sm">
          {["all", "owner", "renter"].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-6 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${
                filter === f
                  ? "bg-slate-900 text-white shadow-lg"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid gap-4">
        {filtered.length > 0 ? (
          filtered.map((b) => (
            <div
              key={b._id}
              onClick={() => navigate(`/dashboard/damage-report/${b._id}`)}
              className="bg-white border border-slate-200 rounded-[2rem] p-6 hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
            >
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Vehicle Preview */}
                <div className="relative shrink-0">
                  <img
                    src={
                      b.listing?.photos?.[0]
                        ? `${BACKEND_URL}${b.listing.photos[0]}`
                        : "/placeholder-car.jpg"
                    }
                    className="w-40 h-24 object-cover rounded-2xl shadow-md border-2 border-white"
                    alt="Vehicle"
                  />
                  <div
                    className={`absolute -top-2 -left-2 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest border shadow-sm ${
                      b.role === "owner"
                        ? "bg-indigo-600 text-white border-indigo-700"
                        : "bg-white text-slate-900 border-slate-200"
                    }`}
                  >
                    {b.role === "owner" ? "Hosting" : "Rented"}
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1 text-center md:text-left">
                  <h3 className="text-xl font-black text-slate-900 truncate tracking-tight">
                    {b.listing?.name}
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 text-slate-500 text-xs font-bold">
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                      <Clock size={14} className="text-indigo-500" />
                      {new Date(b.startDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                      <AlertTriangle size={14} className="text-amber-500" />
                      ID: {b._id.slice(-6).toUpperCase()}
                    </div>
                  </div>
                </div>

                {/* Status / CTA */}
                <div className="shrink-0 flex items-center gap-4">
                  <div
                    className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] border flex items-center gap-2 ${
                      b.status === "completed"
                        ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                        : "bg-blue-50 text-blue-600 border-blue-100"
                    }`}
                  >
                    {b.status === "completed" ? (
                      <CheckCircle2 size={14} />
                    ) : (
                      <Clock size={14} />
                    )}
                    {b.status}
                  </div>
                  <div className="w-10 h-10 rounded-full bg-slate-950 text-white flex items-center justify-center group-hover:scale-110 group-hover:bg-indigo-600 transition-all shadow-lg">
                    <Camera size={18} strokeWidth={2.5} />
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="py-20 text-center bg-white border-2 border-dashed border-slate-200 rounded-[3rem] space-y-6">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto border border-slate-100">
              <ShieldAlert className="text-slate-300" size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-slate-900">
                No reportable bookings
              </h3>
              <p className="text-slate-500 font-medium max-w-xs mx-auto text-sm">
                Only confirmed or completed bookings support damage reporting.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DamageReportsList;
