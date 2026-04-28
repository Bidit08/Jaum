import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  User,
  Car,
  FileText,
  Edit3,
  X,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

/* ─── Helpers ────────────────────────────────────────────────── */
const fmtPrice = (n) => (n != null ? `Rs ${n.toLocaleString()}` : "—");
const fmtDate = (d) => (d ? new Date(d).toLocaleDateString() : "—");

function StatusBadge({ status }) {
  const styles = {
    "refund-pending": "bg-yellow-100 text-yellow-700",
    refunded: "bg-emerald-100 text-emerald-700",
    processed: "bg-blue-100 text-blue-700",
    pending: "bg-yellow-100 text-yellow-700",
  };
  return (
    <span
      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
        styles[status] || "bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function AdminRefunds() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedRefund, setSelectedRefund] = useState(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch all payments and filter for refund-related ones locally
      const pRes = await api.get("/admin/payments", {
        params: { search, status: "all" },
      });
      const refundPayments = pRes.data.filter(
        (p) =>
          p.paymentStatus === "refund-pending" ||
          p.paymentStatus === "refunded" ||
          p.refundHandleStatus === "pending" ||
          p.refundHandleStatus === "processed",
      );
      setPayments(refundPayments);
    } catch {
      toast.error("Failed to fetch refund data");
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const t = setTimeout(fetchData, 300);
    return () => clearTimeout(t);
  }, [fetchData]);

  const handleUpdateStatus = async (id, data) => {
    try {
      await api.patch(`/admin/payments/${id}/status`, data);
      toast.success("Refund status updated");
      setSelectedRefund(null);
      fetchData();
    } catch {
      toast.error("Failed to update status");
    }
  };

  return (
    <div className="space-y-8">
      {/* Header Info */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black text-slate-900">
            Refund Management
          </h2>
          <p className="text-slate-500 mt-1">
            Manage and process booking cancellations that require refunds.
          </p>
        </div>
        <div className="p-4 bg-rose-50 rounded-2xl">
          <RefreshCw className="text-rose-500" size={32} />
        </div>
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
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-24 text-slate-400">
            <RefreshCw size={48} className="mx-auto mb-4 opacity-20" />
            <p className="font-medium text-lg">No pending refunds found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50">
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Booking / TXN
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    User & Vehicle
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Total Paid
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Penalty (20%)
                  </th>
                  <th className="px-6 py-4 font-bold text-slate-500 uppercase tracking-tighter text-[11px]">
                    Refund Amount
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
                {payments.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50/50 transition">
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <p className="text-xs text-slate-600 font-bold">
                          BID: {p._id.slice(-6)}
                        </p>
                        <p className="font-mono text-[10px] text-rose-500 tracking-tight">
                          TXN:{" "}
                          {(p.pidx || p.transactionId || "N/A").slice(0, 16)}...
                        </p>
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
                    <td className="px-6 py-4 font-bold text-red-600">
                      {fmtPrice(p.penaltyAmount)}
                    </td>
                    <td className="px-6 py-4 font-black text-emerald-600 text-lg">
                      {fmtPrice(p.refundAmount)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        <StatusBadge status={p.paymentStatus} />
                        <br />
                        <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">
                          Handle: {p.refundHandleStatus || "none"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => setSelectedRefund(p)}
                        className="px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-rose-600 transition-colors shadow-lg"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Status Edit Modal */}
      {selectedRefund && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[32px] shadow-2xl w-full max-w-md overflow-hidden">
            <div className="px-8 pt-8 pb-4 flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-black text-slate-900">
                  Process Refund
                </h2>
                <p className="text-sm text-slate-400 mt-1">
                  Refund exactly{" "}
                  <span className="font-bold text-emerald-600">
                    {fmtPrice(selectedRefund.refundAmount)}
                  </span>{" "}
                  to {selectedRefund.user?.name}
                </p>
              </div>
              <button
                onClick={() => setSelectedRefund(null)}
                className="p-2 hover:bg-slate-100 rounded-2xl transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="bg-slate-50 p-4 rounded-3xl border border-slate-100 flex items-start gap-3">
                <div className="p-2 bg-emerald-500/10 rounded-xl text-emerald-500">
                  <CheckCircle size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Amount to Refund
                  </p>
                  <p className="text-xl font-black text-emerald-500 leading-tight mt-1">
                    {fmtPrice(selectedRefund.refundAmount)}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-slate-600 font-medium">
                  By clicking confirm, you acknowledge that you have manually
                  transferred the funds back to the user via their payment
                  method or bank.
                </p>

                <button
                  onClick={() =>
                    handleUpdateStatus(selectedRefund._id, {
                      paymentStatus: "refunded",
                      refundHandleStatus: "processed",
                    })
                  }
                  className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-[20px] font-bold shadow-xl transition-all active:scale-95 flex justify-center items-center gap-2"
                >
                  <CheckCircle size={18} />
                  Confirm & Mark Processed
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
