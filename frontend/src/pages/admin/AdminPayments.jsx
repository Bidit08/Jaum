import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  DollarSign,
  CreditCard,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Download,
  ExternalLink,
  User,
  Car,
  Calendar,
  ArrowUpRight,
  TrendingUp,
  AlertCircle,
  FileText,
  Edit3,
  X,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

/* ─── Helpers ────────────────────────────────────────────────── */
const fmtPrice = (n) => (n != null ? `Rs ${n.toLocaleString()}` : "—");
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");

const STATUS_FILTERS = [
  { key: "all", label: "All Status" },
  { key: "paid", label: "Paid" },
  { key: "pending", label: "Pending" },
  { key: "failed", label: "Failed" },
  { key: "refunded", label: "Refunded" },
];

const METHOD_FILTERS = [
  { key: "all", label: "All Methods" },
  { key: "khalti", label: "Khalti" },
  { key: "cash", label: "Cash" },
];

/* ─── Components ────────────────────────────────────────────── */
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
    paid: "bg-emerald-100 text-emerald-700",
    pending: "bg-yellow-100 text-yellow-700",
    failed: "bg-red-100 text-red-700",
    refunded: "bg-blue-100 text-blue-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function AdminPayments() {
  const [payments, setPayments] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    paidCount: 0,
    pendingCount: 0,
    failedCount: 0,
    refundedCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");
  const [selectedPayment, setSelectedPayment] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [sRes, pRes] = await Promise.all([
        api.get("/admin/payments/stats"),
        api.get("/admin/payments", {
          params: { search, status: statusFilter, method: methodFilter },
        }),
      ]);
      setStats(sRes.data);
      setPayments(pRes.data);
    } catch {
      toast.error("Failed to fetch payment data");
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, methodFilter]);

  useEffect(() => {
    const t = setTimeout(fetchData, 300);
    return () => clearTimeout(t);
  }, [fetchData]);

  const handleUpdateStatus = async (id, data) => {
    try {
      await api.patch(`/admin/payments/${id}/status`, data);
      toast.success("Payment status updated");
      setSelectedPayment(null);
      fetchData();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatCard
          title="Total Earnings"
          value={fmtPrice(stats.totalEarnings)}
          icon={DollarSign}
          color="bg-emerald-500"
          subtext="Total from 'Paid' bookings"
        />
        <StatCard
          title="Total Paid"
          value={stats.paidCount}
          icon={CheckCircle}
          color="bg-emerald-500"
        />
        <StatCard
          title="Pending"
          value={stats.pendingCount}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="Failed"
          value={stats.failedCount}
          icon={XCircle}
          color="bg-red-500"
        />
        <StatCard
          title="Refunded"
          value={stats.refundedCount}
          icon={ArrowUpRight}
          color="bg-blue-500"
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
            placeholder="Search Transaction ID, Booking ID, User, or Vehicle..."
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
          <select
            value={methodFilter}
            onChange={(e) => setMethodFilter(e.target.value)}
            className="px-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-medium outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            {METHOD_FILTERS.map((f) => (
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
        ) : payments.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <CreditCard size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium text-lg">No transactions found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Transaction / Booking
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    User & Vehicle
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Amount
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Method
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Status
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Date
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px] text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="font-mono text-[10px] text-rose-500 font-bold tracking-tight">
                          TXN:{" "}
                          {(p.pidx || p.transactionId || "N/A").slice(0, 16)}...
                        </p>
                        <p className="text-xs text-slate-400">BID: {p._id}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-1.5 font-bold text-slate-900">
                          <User size={12} className="text-slate-400" />
                          {p.user?.name}
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-slate-500">
                          <Car size={12} className="text-slate-400" />
                          {p.listing?.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-slate-900">
                      {fmtPrice(p.totalPrice)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {p.paymentMethod === "khalti" ? (
                          <span className="p-1.5 bg-purple-50 rounded-lg text-purple-600 font-extrabold text-[10px] uppercase">
                            Khalti
                          </span>
                        ) : (
                          <span className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600 font-extrabold text-[10px] uppercase">
                            Cash
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={p.paymentStatus} />
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {fmtDate(p.updatedAt)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        {p.invoiceUrl && (
                          <a
                            href={p.invoiceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-xl transition-all"
                            title="View Invoice"
                          >
                            <FileText size={18} />
                          </a>
                        )}
                        <button
                          onClick={() => setSelectedPayment(p)}
                          className="p-2 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-xl transition-all"
                          title="Edit Payment Status"
                        >
                          <Edit3 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Edit Modal */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Manage Payment
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Transaction ID:{" "}
                  {selectedPayment.pidx ||
                    selectedPayment.transactionId ||
                    "N/A"}
                </p>
              </div>
              <button
                onClick={() => setSelectedPayment(null)}
                className="p-2 hover:bg-slate-100 rounded-2xl transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-3">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                  Update Status
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {STATUS_FILTERS.filter((f) => f.key !== "all").map((f) => (
                    <button
                      key={f.key}
                      onClick={() =>
                        handleUpdateStatus(selectedPayment._id, {
                          paymentStatus: f.key,
                        })
                      }
                      className={`py-3 px-4 rounded-2xl text-xs font-bold transition-all ${
                        selectedPayment.paymentStatus === f.key
                          ? "bg-slate-900 text-white shadow-lg scale-105"
                          : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-100"
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {selectedPayment.paymentStatus === "refunded" && (
                <div className="space-y-3">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest px-1">
                    Refund Handling
                  </label>
                  <select
                    value={selectedPayment.refundHandleStatus || "none"}
                    onChange={(e) =>
                      handleUpdateStatus(selectedPayment._id, {
                        refundHandleStatus: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-sm font-bold outline-none ring-rose-500/20"
                  >
                    <option value="none">None</option>
                    <option value="pending">Pending Refund</option>
                    <option value="processed">Processed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              )}

              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex items-start gap-3">
                <div className="p-2 bg-rose-500/10 rounded-xl text-rose-500">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Amount
                  </p>
                  <p className="text-xl font-black text-rose-500 leading-tight mt-1">
                    {fmtPrice(selectedPayment.totalPrice)}
                  </p>
                </div>
              </div>
            </div>

            <div className="px-8 pb-8 pt-2">
              <button
                onClick={() => setSelectedPayment(null)}
                className="w-full py-4 bg-slate-900 text-white rounded-[24px] font-bold shadow-xl hover:shadow-2xl transition hover:-translate-y-1 active:scale-95"
              >
                Close Management
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
