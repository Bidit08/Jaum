import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  DollarSign,
  CheckCircle,
  Clock,
  XCircle,
  User,
  Car,
  Check,
  X,
  ShieldAlert,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const fmtPrice = (n) => (n != null ? `Rs ${n.toLocaleString()}` : "—");
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");

const STATUS_FILTERS = [
  { key: "all", label: "All Status" },
  { key: "pending", label: "Pending" },
  { key: "released", label: "Released" },
  { key: "failed", label: "Failed" },
];

function StatCard({ title, value, icon: Icon, color, subtext }) {
  return (
    <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-start gap-4">
      <div className={`p-3 rounded-xl ${color} bg-opacity-10`}>
        <Icon className={`${color.replace("bg-", "text-")}`} size={24} />
      </div>
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </p>
        <p className="text-xl font-black text-slate-900 mt-1">{value}</p>
        {subtext && (
          <p className="text-[10px] text-slate-400 mt-1">{subtext}</p>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    released: "bg-emerald-100 text-emerald-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status] || "bg-slate-100 text-slate-500"}`}
    >
      {status || "N/A"}
    </span>
  );
}

export default function AdminPayouts() {
  const [payouts, setPayouts] = useState([]);
  const [stats, setStats] = useState({
    pendingPayouts: 0,
    releasedPayouts: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [sRes, pRes] = await Promise.all([
        api.get("/admin/payments/stats"),
        api.get("/admin/payouts", { params: { status: statusFilter } }),
      ]);
      setStats(sRes.data);
      setPayouts(pRes.data);
    } catch {
      toast.error("Failed to fetch payout data");
    } finally {
      setLoading(false);
    }
  }, [statusFilter]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredPayouts = payouts.filter((p) => {
    if (!search.trim()) return true;
    const s = search.toLowerCase();
    const idMatch = p._id.toLowerCase().includes(s);
    const ownerMatch = p.owner?.name?.toLowerCase().includes(s);
    const vehicleMatch = p.listing?.name?.toLowerCase().includes(s);
    return idMatch || ownerMatch || vehicleMatch;
  });

  const handleUpdateStatus = async (id, status) => {
    if (
      !window.confirm(`Are you sure you want to mark this payout as ${status}?`)
    )
      return;
    try {
      await api.patch(`/admin/payouts/${id}/status`, { payoutStatus: status });
      toast.success(`Payout marked as ${status}`);
      fetchData();
    } catch {
      toast.error("Failed to update payout status");
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <StatCard
          title="Pending Payouts"
          value={fmtPrice(stats.pendingPayouts)}
          icon={Clock}
          color="bg-yellow-500"
          subtext="Amount owed to owners"
        />
        <StatCard
          title="Released Payouts"
          value={fmtPrice(stats.releasedPayouts)}
          icon={CheckCircle}
          color="bg-emerald-500"
          subtext="Amount successfully paid out"
        />
      </div>

      {/* Control Bar */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />
          <input
            type="text"
            placeholder="Search Booking ID, Owner, or Vehicle..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition"
          />
        </div>
        <div className="flex gap-3 overflow-x-auto pb-1">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            {STATUS_FILTERS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredPayouts.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <DollarSign size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium text-lg">No payouts found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Booking ID
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Owner & Vehicle
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Total
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Commission
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Owner Share
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredPayouts.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4">
                      <p className="text-xs font-mono text-slate-500">
                        {p._id}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {fmtDate(p.updatedAt)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <User size={12} className="text-slate-400" />
                          {p.owner?.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Car size={12} className="text-slate-400" />
                          {p.listing?.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 font-medium">
                      {fmtPrice(p.totalPrice)}
                    </td>
                    <td className="px-6 py-4 font-bold text-rose-500">
                      {fmtPrice(p.commissionAmount)}
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-600">
                      {fmtPrice(p.ownerAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={p.payoutStatus} />
                    </td>
                    <td className="px-6 py-4 text-right">
                      {p.payoutStatus === "pending" ? (
                        <div className="flex justify-end gap-2">
                          <button
                            onClick={() =>
                              handleUpdateStatus(p._id, "released")
                            }
                            className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all"
                            title="Mark as Released"
                          >
                            <Check size={18} />
                          </button>
                          <button
                            onClick={() => handleUpdateStatus(p._id, "failed")}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Mark as Failed"
                          >
                            <X size={18} />
                          </button>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-400 font-medium mx-2">
                          Processed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
