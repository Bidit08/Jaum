import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Calendar,
  X,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  Flag,
  Ban,
  Clock,
  CreditCard,
  User,
  Car,
  MapPin,
  Mail,
  Phone,
  ExternalLink,
  ChevronRight,
  ArrowRight,
  CheckSquare,
  ClipboardList,
  Camera,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../utils/api";
import { toast } from "react-toastify";

/* ─── Helpers ────────────────────────────────────────────────── */
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "—";

const fmtPrice = (n) => (n != null ? `Rs ${n.toLocaleString()}` : "—");

const GET_IMAGE_URL = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `http://localhost:5000/${cleanPath}`;
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "confirmed", label: "Confirmed" },
  { key: "completed", label: "Completed" },
  { key: "cancelled", label: "Cancelled" },
  { key: "disputed", label: "Disputed" },
];

/* ─── Status Badge ───────────────────────────────────────────── */
function StatusBadge({ status }) {
  const styles = {
    pending: "bg-yellow-100 text-yellow-700",
    "approved-awaiting-payment": "bg-blue-100 text-blue-700",
    confirmed: "bg-sky-100 text-sky-700",
    completed: "bg-emerald-100 text-emerald-700",
    rejected: "bg-red-100 text-red-700",
    cancelled: "bg-slate-100 text-slate-600",
  };
  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider ${styles[status] || "bg-slate-100"}`}
    >
      {status.replace(/-/g, " ")}
    </span>
  );
}

/* ─── Booking Item ────────────────────────────────────────────── */
function BookingThumb({ photos }) {
  if (photos?.[0])
    return (
      <img
        src={GET_IMAGE_URL(photos[0])}
        alt=""
        className="w-12 h-10 rounded-lg object-cover shrink-0"
      />
    );
  return (
    <div className="w-12 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
      <Car size={14} className="text-slate-400" />
    </div>
  );
}

/* ─── Detail Modal ───────────────────────────────────────────── */
function BookingDetailModal({ bookingId, onClose, onUpdate }) {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    api
      .get(`/admin/bookings/${bookingId}`)
      .then((r) => setBooking(r.data))
      .catch(() => {
        toast.error("Failed to load booking details");
        onClose();
      })
      .finally(() => setLoading(false));
  }, [bookingId]);

  const handleStatusChange = async (newStatus) => {
    setUpdating(true);
    try {
      const res = await api.patch(`/admin/bookings/${booking._id}/status`, {
        status: newStatus,
      });
      setBooking(res.data.booking);
      onUpdate(res.data.booking);
      toast.success(`Status changed to ${newStatus}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setUpdating(false);
    }
  };

  const handleResolveDispute = async () => {
    try {
      const res = await api.patch(
        `/admin/bookings/${booking._id}/resolve-dispute`,
        {},
      );
      setBooking(res.data.booking);
      onUpdate(res.data.booking);
      toast.success(res.data.message);
    } catch (err) {
      console.error("resolveDispute error:", err);
      toast.error(err.response?.data?.message || "Failed to resolve dispute");
    }
  };

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              Booking Details
            </h2>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              ID: {booking._id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Status Hero */}
          <div className="flex items-center justify-between bg-slate-50 p-4 rounded-2xl border border-slate-100">
            <div className="space-y-1">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Current Status
              </p>
              <StatusBadge status={booking.status} />
            </div>
            <div className="flex gap-2">
              {(booking.status === "confirmed" ||
                booking.status === "completed") && (
                <Link
                  to={`/dashboard/damage-report/${booking._id}`}
                  className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-bold hover:bg-slate-900 transition flex items-center gap-1.5"
                >
                  <Camera size={14} />
                  Damage Report
                </Link>
              )}
              {booking.status !== "completed" && (
                <button
                  onClick={() => handleStatusChange("completed")}
                  disabled={updating}
                  className="px-3 py-1.5 bg-emerald-500 text-white rounded-lg text-xs font-bold hover:bg-emerald-600 transition"
                >
                  Mark Completed
                </button>
              )}

              {booking.isDisputed ? (
                <button
                  onClick={handleResolveDispute}
                  className="px-3 py-1.5 bg-blue-500 text-white rounded-lg text-xs font-bold hover:bg-blue-600 transition"
                >
                  Resolve Dispute
                </button>
              ) : (
                <button
                  onClick={() => handleResolveDispute()}
                  className="px-3 py-1.5 border border-amber-200 bg-amber-50 text-amber-700 rounded-lg text-xs font-bold hover:bg-amber-100 transition"
                >
                  Flag Dispute
                </button>
              )}
            </div>
          </div>

          {/* Vehicle Info */}
          <div className="flex gap-4 items-start">
            <img
              src={GET_IMAGE_URL(booking.listing?.photos?.[0])}
              className="w-24 h-20 rounded-xl object-cover border border-slate-200"
              alt=""
            />
            <div>
              <h3 className="font-bold text-slate-900 leading-tight">
                {booking.listing?.name}
              </h3>
              <p className="text-sm text-slate-500">
                {booking.listing?.brand} {booking.listing?.model}
              </p>
              <div className="flex items-center gap-1.5 mt-2 text-xs text-slate-400">
                <MapPin size={12} className="text-rose-400" />
                <span>{booking.listing?.location || "No location"}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Renter */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Renter
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={GET_IMAGE_URL(booking.user?.profilePicture)}
                  className="w-10 h-10 rounded-full border border-slate-200"
                  alt=""
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {booking.user?.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {booking.user?.email}
                  </p>
                </div>
              </div>
            </div>

            {/* Owner */}
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Owner
              </p>
              <div className="flex items-center gap-3">
                <img
                  src={GET_IMAGE_URL(booking.owner?.profilePicture)}
                  className="w-10 h-10 rounded-full border border-slate-200"
                  alt=""
                />
                <div>
                  <p className="text-sm font-bold text-slate-900">
                    {booking.owner?.name}
                  </p>
                  <p className="text-xs text-slate-500">
                    {booking.owner?.email}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <hr className="border-slate-100" />

          {/* Booking Info */}
          <div className="grid grid-cols-2 gap-y-4 text-sm">
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Dates</p>
              <p className="font-semibold flex items-center gap-2">
                {fmtDate(booking.startDate).split(",")[0]}
                <ArrowRight size={12} className="text-slate-300" />
                {fmtDate(booking.endDate).split(",")[0]}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Total Duration</p>
              <p className="font-semibold">{booking.totalDays} Days</p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Payment Method</p>
              <p className="font-semibold capitalize flex items-center gap-1.5">
                <CreditCard size={14} className="text-blue-500" />
                {booking.paymentMethod || "N/A"}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400 mb-0.5">Payment Status</p>
              <p className="font-semibold capitalize">
                {booking.paymentStatus}
              </p>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span className="text-slate-500">Price per day</span>
              <span className="font-semibold">
                {fmtPrice(booking.listing?.pricePerDay)}
              </span>
            </div>
            <div className="flex justify-between items-center mb-4 text-sm">
              <span className="text-slate-500">
                Total for {booking.totalDays} days
              </span>
              <span className="font-semibold">
                {fmtPrice(booking.totalPrice)}
              </span>
            </div>
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center">
              <span className="font-bold text-slate-900">Total Paid</span>
              <span className="text-xl font-black text-rose-500">
                {fmtPrice(booking.totalPrice)}
              </span>
            </div>
          </div>

          {/* Dispute Reason */}
          {booking.isDisputed && (
            <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200 flex gap-3">
              <AlertCircle className="text-amber-600 shrink-0" size={20} />
              <div>
                <p className="text-sm font-bold text-amber-800">
                  Booking Disputed
                </p>
                <p className="text-xs text-amber-700 mt-0.5">
                  {booking.disputeReason || "No reason provided."}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <select
            value={booking.status}
            onChange={(e) => handleStatusChange(e.target.value)}
            disabled={updating}
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium outline-none focus:ring-2 focus:ring-rose-400 bg-white cursor-pointer"
          >
            <option value="pending">Mark Pending</option>
            <option value="approved-awaiting-payment">
              Approved (Await Payment)
            </option>
            <option value="confirmed">Mark Confirmed</option>
            <option value="completed">Mark Completed</option>
            <option value="cancelled">Mark Cancelled</option>
            <option value="rejected">Mark Rejected</option>
          </select>
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold hover:bg-slate-800 transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [detailId, setDetailId] = useState(null);

  const fetchBookings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/bookings", {
        params: { search, status: filter },
      });
      setBookings(res.data);
    } catch {
      toast.error("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    const t = setTimeout(fetchBookings, 300);
    return () => clearTimeout(t);
  }, [fetchBookings]);

  const patchBooking = (id, updates) =>
    setBookings((prev) =>
      prev.map((b) => (b._id === id ? { ...b, ...updates } : b)),
    );

  const handleToggleFlag = async (booking) => {
    try {
      const res = await api.patch(`/admin/bookings/${booking._id}/flag`, {});
      patchBooking(booking._id, { isFlagged: res.data.isFlagged });
      toast.success(res.data.message);
    } catch (err) {
      console.error("toggleFlag error:", err);
      toast.error(err.response?.data?.message || "Failed to flag booking");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Booking Management
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Monitor and manage all rental transactions
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 text-sm text-slate-600">
          <Calendar size={16} className="text-rose-500" />
          <span className="font-semibold">{bookings.length}</span> bookings
        </div>
      </div>

      {/* Control Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by ID, vehicle, user or owner…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Status Filters */}
        <div className="flex gap-1 px-4 py-2 border-b border-slate-100 overflow-x-auto">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`whitespace-nowrap px-4 py-1.5 rounded-lg text-sm font-medium transition ${
                filter === f.key
                  ? "bg-rose-500 text-white shadow-sm"
                  : "text-slate-500 hover:bg-slate-100"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Calendar size={40} className="mb-3 opacity-40" />
            <p className="text-sm font-medium">No bookings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                  <th className="px-4 py-3 font-medium">Vehicle / ID</th>
                  <th className="px-4 py-3 font-medium">Renter</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Duration</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {bookings.map((b) => (
                  <tr
                    key={b._id}
                    className={`hover:bg-slate-50/60 transition ${b.isDisputed ? "bg-amber-50/30" : b.isFlagged ? "bg-red-50/30" : ""}`}
                  >
                    {/* Vehicle */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <BookingThumb photos={b.listing?.photos} />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate max-w-[140px]">
                            {b.listing?.name || "Deleted Vehicle"}
                          </p>
                          <p className="text-[10px] font-mono text-slate-400 uppercase tracking-tighter">
                            ID: ...{b._id.slice(-6)}
                          </p>
                          {(b.isDisputed || b.isFlagged) && (
                            <div className="flex gap-1 mt-0.5">
                              {b.isDisputed && (
                                <span
                                  className="p-0.5 bg-amber-100 text-amber-600 rounded"
                                  title="Disputed"
                                >
                                  <AlertCircle size={10} />
                                </span>
                              )}
                              {b.isFlagged && (
                                <span
                                  className="p-0.5 bg-red-100 text-red-600 rounded"
                                  title="Flagged"
                                >
                                  <Flag size={10} />
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* Renter */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={GET_IMAGE_URL(b.user?.profilePicture)}
                          className="w-7 h-7 rounded-sm object-cover border border-slate-100"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-700 truncate max-w-[100px]">
                            {b.user?.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[100px]">
                            {b.user?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Owner */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <img
                          src={GET_IMAGE_URL(b.owner?.profilePicture)}
                          className="w-7 h-7 rounded-sm object-cover border border-slate-100"
                        />
                        <div className="min-w-0">
                          <p className="font-medium text-slate-700 truncate max-w-[100px]">
                            {b.owner?.name}
                          </p>
                          <p className="text-[10px] text-slate-400 truncate max-w-[100px]">
                            {b.owner?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Dates */}
                    <td className="px-4 py-3">
                      <div className="space-y-0.5 text-xs">
                        <p className="text-slate-600 font-medium">
                          {new Date(b.startDate).toLocaleDateString()}
                        </p>
                        <p className="text-slate-400">
                          — {new Date(b.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </td>

                    <td className="px-4 py-3 font-bold text-slate-700">
                      {fmtPrice(b.totalPrice)}
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge status={b.status} />
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => setDetailId(b._id)}
                          className="p-1.5 rounded-lg bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-500 transition"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleToggleFlag(b)}
                          className={`p-1.5 rounded-lg transition ${b.isFlagged ? "bg-red-50 text-red-500" : "bg-slate-50 text-slate-400 hover:bg-red-50 hover:text-red-500"}`}
                          title={b.isFlagged ? "Unflag" : "Flag as suspicious"}
                        >
                          <Flag size={16} />
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

      {/* Detail Modal */}
      {detailId && (
        <BookingDetailModal
          bookingId={detailId}
          onClose={() => setDetailId(null)}
          onUpdate={(upd) => patchBooking(upd._id, upd)}
        />
      )}
    </div>
  );
}
