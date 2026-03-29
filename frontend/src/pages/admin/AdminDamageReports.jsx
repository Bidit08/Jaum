import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Search,
  Eye,
  Filter,
  AlertCircle,
  CheckCircle,
  Clock,
  Camera,
  User,
  Car,
  ArrowRight,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminDamageReports = () => {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchReports = async () => {
    try {
      setLoading(true);
      const res = await api.get("/damage/admin/all");
      setReports(res.data);
    } catch (err) {
      toast.error("Failed to fetch damage reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const filteredReports = reports.filter((r) => {
    const searchLower = search.toLowerCase();
    const matchesSearch =
      r.booking?.listing?.name?.toLowerCase().includes(searchLower) ||
      r.booking?.user?.name?.toLowerCase().includes(searchLower) ||
      r._id.toLowerCase().includes(searchLower);

    if (filter === "all") return matchesSearch;
    if (filter === "pending")
      return matchesSearch && r.reportStatus !== "resolved";
    if (filter === "resolved")
      return matchesSearch && r.reportStatus === "resolved";
    if (filter === "damage")
      return (
        matchesSearch &&
        (r.damageStatus === "minor" || r.damageStatus === "major")
      );
    return matchesSearch;
  });

  const GET_IMAGE_URL = (path) => {
    if (!path) return "/placeholder-car.jpg";
    if (path.startsWith("http")) return path;
    const normalizedPath = path.replace(/\\/g, "/");
    return `http://localhost:5000${normalizedPath.startsWith("/") ? "" : "/"}${normalizedPath}`;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Damage Reports</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Oversee vehicle inspections and damage assessments
          </p>
        </div>
        <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl border border-slate-200 text-sm font-bold text-slate-700 shadow-sm">
          <ClipboardList size={18} className="text-rose-500" />
          {reports.length} Total Reports
        </div>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search by vehicle, user or ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/10 focus:border-rose-400 transition"
          />
        </div>
        <div className="flex gap-2">
          {[
            { id: "all", label: "All" },
            { id: "pending", label: "Pending" },
            { id: "resolved", label: "Resolved" },
            { id: "damage", label: "Damage Found" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-xl text-sm font-bold transition ${
                filter === f.id
                  ? "bg-rose-500 text-white shadow-md shadow-rose-200"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Table/List */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredReports.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-2xl p-20 text-center space-y-4">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
            <ClipboardList size={32} />
          </div>
          <p className="text-slate-500 font-medium">
            No reports matching your criteria
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 italic">
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Vehicle / ID
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Parties
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Photos
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest">
                  Verdict
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-widest text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredReports.map((r) => (
                <tr
                  key={r._id}
                  className="hover:bg-slate-50/50 transition duration-200 group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={GET_IMAGE_URL(r.booking?.listing?.photos?.[0])}
                        className="w-12 h-10 rounded-lg object-cover border border-slate-100"
                        alt=""
                      />
                      <div>
                        <p className="font-bold text-slate-900 text-sm">
                          {r.booking?.listing?.name}
                        </p>
                        <p className="text-[10px] font-mono text-slate-400">
                          ID: ...{r._id.slice(-6)}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-xs">
                        <User size={12} className="text-blue-500" />
                        <span className="font-semibold text-slate-700">
                          {r.booking?.user?.name}
                        </span>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-400 italic">Renter</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs">
                        <User size={12} className="text-emerald-500" />
                        <span className="font-semibold text-slate-700">
                          {r.booking?.owner?.name}
                        </span>
                        <span className="text-slate-300 mx-1">/</span>
                        <span className="text-slate-400 italic">Owner</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border ${
                        r.reportStatus === "resolved"
                          ? "bg-emerald-50 text-emerald-600 border-emerald-100"
                          : r.reportStatus === "after-uploaded"
                            ? "bg-blue-50 text-blue-600 border-blue-100"
                            : "bg-amber-50 text-amber-600 border-amber-100"
                      }`}
                    >
                      {r.reportStatus.replace(/-/g, " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">
                          In
                        </span>
                        <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                          {r.beforeImages?.length || 0}
                        </span>
                      </div>
                      <ArrowRight size={10} className="text-slate-300 mt-4" />
                      <div className="flex flex-col items-center">
                        <span className="text-[9px] font-bold text-slate-400 uppercase mb-1">
                          Out
                        </span>
                        <span className="w-7 h-7 rounded-lg bg-slate-100 flex items-center justify-center text-xs font-bold text-slate-600 border border-slate-200">
                          {r.afterImages?.length || 0}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {r.damageStatus && (
                      <span
                        className={`font-bold text-sm capitalize ${
                          r.damageStatus === "none"
                            ? "text-emerald-500"
                            : r.damageStatus === "minor"
                              ? "text-amber-500"
                              : "text-rose-500"
                        }`}
                      >
                        {r.damageStatus}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      to={`/dashboard/damage-report/${r.booking?._id}`}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-rose-600 transition shadow-lg shadow-slate-200"
                    >
                      <Eye size={14} />
                      View Full Report
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDamageReports;
