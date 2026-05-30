import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Car,
  X,
  Eye,
  Trash2,
  CheckCircle,
  XCircle,
  Star,
  PauseCircle,
  PlayCircle,
  Pencil,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Users,
  ChevronRight,
  Image,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

/* ─── Helpers ────────────────────────────────────────────────── */
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

const fmtPrice = (n) => (n != null ? `Rs ${n.toLocaleString()}` : "—");

const GET_IMAGE_URL = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  // Ensure we don't have double slashes if path already starts with /
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `https://jaum-t3no.onrender.com${cleanPath}`;
};

const FILTERS = [
  { key: "all", label: "All" },
  { key: "pending", label: "Pending" },
  { key: "approved", label: "Approved" },
  { key: "rejected", label: "Rejected" },
  { key: "active", label: "Active" },
  { key: "paused", label: "Paused" },
];

/* ─── Badges ─────────────────────────────────────────────────── */
function ApprovalBadge({ listing }) {
  if (listing.isRejected)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
        Rejected
      </span>
    );
  if (listing.isApproved)
    return (
      <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-700">
        Approved
      </span>
    );
  return (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700">
      Pending
    </span>
  );
}

function StatusBadge({ status }) {
  return status === "active" ? (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-600">
      Active
    </span>
  ) : (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
      Paused
    </span>
  );
}

function TypeBadge({ type }) {
  return type === "full" ? (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-violet-100 text-violet-700">
      Full Rental
    </span>
  ) : (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-cyan-100 text-cyan-700">
      Seat Sharing
    </span>
  );
}

/* ─── Owner Avatar ───────────────────────────────────────────── */
function OwnerAvatar({ owner, size = "sm" }) {
  const cls = size === "lg" ? "w-14 h-14 text-lg" : "w-8 h-8 text-xs";
  if (owner?.profilePicture)
    return (
      <img
        src={GET_IMAGE_URL(owner.profilePicture)}
        alt={owner.name}
        className={`${cls} rounded-full object-cover border-2 border-slate-200`}
      />
    );
  const initials = owner?.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`${cls} rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center border-2 border-rose-200`}
    >
      {initials}
    </div>
  );
}

/* ─── Thumbnail ─────────────────────────────────────────────── */
function ListingThumb({ photos }) {
  if (photos?.[0])
    return (
      <img
        src={GET_IMAGE_URL(photos[0])}
        alt=""
        className="w-16 h-14 rounded-xl object-cover shrink-0"
      />
    );
  return (
    <div className="w-16 h-14 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
      <Image size={18} className="text-slate-400" />
    </div>
  );
}

/* ─── Edit Modal ─────────────────────────────────────────────── */
function EditModal({ listing, onClose, onSaved }) {
  const [form, setForm] = useState({
    name: listing.name || "",
    brand: listing.brand || "",
    model: listing.model || "",
    year: listing.year || "",
    description: listing.description || "",
    pricePerDay: listing.pricePerDay || "",
    pricePerSeat: listing.pricePerSeat || "",
    deposit: listing.deposit || "",
    location: listing.location || "",
    fuelType: listing.fuelType || "",
    transmission: listing.transmission || "",
    seats: listing.seats || "",
    mileage: listing.mileage || "",
  });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const res = await api.put(`/admin/listings/${listing._id}`, form);
      toast.success("Listing updated");
      onSaved(res.data.listing);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update");
    } finally {
      setSaving(false);
    }
  };

  const field = (label, key, type = "text", opts = {}) => (
    <div>
      <label className="block text-xs font-medium text-slate-500 mb-1">
        {label}
      </label>
      <input
        type={type}
        value={form[key]}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-rose-400/30 focus:border-rose-400 transition"
        {...opts}
      />
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Edit Listing — {listing.name}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {field("Listing Name", "name")}
          {field("Brand", "brand")}
          {field("Model", "model")}
          {field("Year", "year", "number")}
          {listing.listingType === "full" &&
            field("Price / Day (Rs)", "pricePerDay", "number")}
          {listing.listingType === "seats" &&
            field("Price / Seat (Rs)", "pricePerSeat", "number")}
          {listing.listingType === "full" &&
            field("Deposit (Rs)", "deposit", "number")}
          {listing.listingType === "full" && field("Location", "location")}
          {field("Fuel Type", "fuelType")}
          {field("Transmission", "transmission")}
          {field("Seats", "seats", "number")}
          {field("Mileage", "mileage")}
          <div className="sm:col-span-2">
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Description
            </label>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-50 text-sm outline-none focus:ring-2 focus:ring-rose-400/30 focus:border-rose-400 transition resize-none"
            />
          </div>
        </div>

        <div className="px-6 py-4 border-t border-slate-100 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex-1 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-medium transition disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Listing Detail Modal ───────────────────────────────────── */
function ListingDetailModal({ listingId, onClose, onUpdate }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/admin/listings/${listingId}`)
      .then((r) => setData(r.data))
      .catch(() => {
        toast.error("Failed to load details");
        onClose();
      })
      .finally(() => setLoading(false));
  }, [listingId]);

  if (loading)
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="w-10 h-10 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  const { listing, bookingCount } = data;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">Listing Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {/* Photos */}
          {listing.photos?.length > 0 && (
            <div className="flex gap-2 p-4 overflow-x-auto bg-slate-50 border-b border-slate-100">
              {listing.photos.map((p, i) => (
                <img
                  key={i}
                  src={GET_IMAGE_URL(p)}
                  alt=""
                  className="h-36 w-auto rounded-xl object-cover shrink-0"
                />
              ))}
            </div>
          )}

          <div className="px-6 py-5 space-y-5">
            {/* Name + badges */}
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                <ApprovalBadge listing={listing} />
                <StatusBadge status={listing.status} />
                <TypeBadge type={listing.listingType} />
                {listing.isFeatured && (
                  <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-700 flex items-center gap-1">
                    <Star size={10} /> Featured
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                {listing.name}
              </h3>
              <p className="text-slate-500 text-sm">
                {listing.brand} {listing.model} · {listing.year}
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-blue-600">
                  {bookingCount}
                </p>
                <p className="text-xs text-blue-500">Bookings</p>
              </div>
              <div className="bg-emerald-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-emerald-600">
                  {listing.averageRating?.toFixed(1) || "—"}
                </p>
                <p className="text-xs text-emerald-500">Avg Rating</p>
              </div>
              <div className="bg-rose-50 rounded-xl p-3 text-center">
                <p className="text-xl font-bold text-rose-600">
                  {fmtPrice(listing.pricePerDay || listing.pricePerSeat)}
                </p>
                <p className="text-xs text-rose-500">
                  {listing.pricePerDay ? "/day" : "/seat"}
                </p>
              </div>
            </div>

            {/* Location / route */}
            {listing.location && (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <MapPin size={14} className="shrink-0 text-rose-400" />
                {listing.location}
              </div>
            )}
            {listing.departure && (
              <div className="flex items-center gap-2 text-slate-500 text-sm">
                <ChevronRight size={14} className="shrink-0 text-rose-400" />
                {listing.departure} → {listing.destination}
              </div>
            )}

            {/* Description */}
            {listing.description && (
              <p className="text-slate-600 text-sm leading-relaxed">
                {listing.description}
              </p>
            )}

            {/* Owner */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-3">
                Listing Owner
              </p>
              <div className="flex items-center gap-3">
                <OwnerAvatar owner={listing.owner} size="lg" />
                <div>
                  <p className="font-semibold text-slate-900">
                    {listing.owner?.name}
                  </p>
                  {listing.owner?.username && (
                    <p className="text-xs text-slate-400">
                      @{listing.owner.username}
                    </p>
                  )}
                  <div className="mt-1 flex flex-col gap-0.5 text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                      <Mail size={11} />
                      {listing.owner?.email}
                    </span>
                    {listing.owner?.phoneNumber && (
                      <span className="flex items-center gap-1">
                        <Phone size={11} />
                        {listing.owner.phoneNumber}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />
                      Joined {fmtDate(listing.owner?.createdAt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Confirm Delete ─────────────────────────────────────────── */
function ConfirmDeleteDialog({ listing, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
          Delete Listing
        </h3>
        <p className="text-slate-500 text-sm text-center mb-6">
          Permanently delete <strong>{listing?.name}</strong>? This cannot be
          undone.
        </p>
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 py-2.5 rounded-xl border border-slate-200 text-slate-700 font-medium hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-medium transition disabled:opacity-60"
          >
            {loading ? "Deleting…" : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ─── Action Button Helper ───────────────────────────────────── */
function ActionBtn({ onClick, title, className, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`p-1.5 rounded-lg transition text-slate-400 ${className}`}
    >
      {children}
    </button>
  );
}

/* ─── Main Page ──────────────────────────────────────────────── */
export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [detailId, setDetailId] = useState(null);
  const [editTarget, setEditTarget] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  // Generic confirm dialog state
  const [pendingAction, setPendingAction] = useState(null); // { variant, title, message, fn }
  const [actionLoading, setActionLoading] = useState(false);

  const fetchListings = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/listings", {
        params: { search, filter },
      });
      setListings(res.data);
    } catch {
      toast.error("Failed to fetch listings");
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    const t = setTimeout(fetchListings, 300);
    return () => clearTimeout(t);
  }, [fetchListings]);

  /* ─── patch a single listing in state ─── */
  const patchListing = (id, updates) =>
    setListings((prev) =>
      prev.map((l) => (l._id === id ? { ...l, ...updates } : l)),
    );

  /* ─── confirm helper ─── */
  const requestConfirm = (variant, title, message, fn) => {
    setPendingAction({ variant, title, message, fn });
  };

  const executeConfirmed = async () => {
    if (!pendingAction) return;
    setActionLoading(true);
    try {
      await pendingAction.fn();
    } finally {
      setActionLoading(false);
      setPendingAction(null);
    }
  };

  /* ─── approve ─── */
  const handleApprove = (listing) => {
    requestConfirm(
      "approve",
      "Approve Listing",
      <>
        Are you sure you want to approve <strong>{listing.name}</strong>? It
        will become visible to all users.
      </>,
      async () => {
        const res = await api.patch(`/admin/listings/${listing._id}/approve`);
        patchListing(listing._id, { isApproved: true, isRejected: false });
        toast.success("Listing approved");
      },
    );
  };

  /* ─── reject ─── */
  const handleReject = (listing) => {
    requestConfirm(
      "reject",
      "Reject Listing",
      <>
        Are you sure you want to reject <strong>{listing.name}</strong>? The
        owner will be notified.
      </>,
      async () => {
        await api.patch(`/admin/listings/${listing._id}/reject`);
        patchListing(listing._id, { isApproved: false, isRejected: true });
        toast.success("Listing rejected");
      },
    );
  };

  /* ─── toggle status (active ↔ paused) ─── */
  const handleToggleStatus = (listing) => {
    const isPausing = listing.status === "active";
    requestConfirm(
      isPausing ? "pause" : "unpause",
      isPausing ? "Pause Listing" : "Activate Listing",
      isPausing ? (
        <>
          Pause <strong>{listing.name}</strong>? It will no longer appear in
          search results.
        </>
      ) : (
        <>
          Activate <strong>{listing.name}</strong>? It will appear in search
          results again.
        </>
      ),
      async () => {
        const res = await api.patch(`/admin/listings/${listing._id}/status`);
        patchListing(listing._id, { status: res.data.status });
        toast.success(res.data.message);
      },
    );
  };

  /* ─── toggle featured ─── */
  const handleToggleFeatured = (listing) => {
    const featuring = !listing.isFeatured;
    requestConfirm(
      featuring ? "feature" : "unfeature",
      featuring ? "Feature Listing" : "Unfeature Listing",
      featuring ? (
        <>
          Mark <strong>{listing.name}</strong> as featured? It will be
          highlighted on the home page.
        </>
      ) : (
        <>
          Remove <strong>{listing.name}</strong> from featured listings?
        </>
      ),
      async () => {
        const res = await api.patch(`/admin/listings/${listing._id}/feature`);
        patchListing(listing._id, { isFeatured: res.data.isFeatured });
        toast.success(res.data.message);
      },
    );
  };

  /* ─── delete ─── */
  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/admin/listings/${deleteTarget._id}`);
      setListings((prev) => prev.filter((l) => l._id !== deleteTarget._id));
      toast.success("Listing deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Vehicle Listings
          </h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage, approve and moderate all vehicle listings
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 text-sm text-slate-600">
          <Car size={16} className="text-rose-500" />
          <span className="font-semibold">{listings.length}</span> listings
          shown
        </div>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">
        {/* Search */}
        <div className="p-4 border-b border-slate-100">
          <div className="relative max-w-md">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />
            <input
              type="text"
              placeholder="Search by name, location, brand, or owner…"
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

        {/* Filters */}
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
        ) : listings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Car size={40} className="mb-3 opacity-40" />
            <p className="text-sm font-medium">No listings found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                  <th className="px-4 py-3 font-medium">Listing</th>
                  <th className="px-4 py-3 font-medium">Type</th>
                  <th className="px-4 py-3 font-medium">Approval</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Owner</th>
                  <th className="px-4 py-3 font-medium">Listed</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {listings.map((listing) => (
                  <tr
                    key={listing._id}
                    className="hover:bg-slate-50/60 transition"
                  >
                    {/* Listing */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <ListingThumb photos={listing.photos} />
                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-slate-900 truncate max-w-[160px]">
                              {listing.name}
                            </p>
                            {listing.isFeatured && (
                              <Star
                                size={12}
                                className="text-amber-500 shrink-0 fill-amber-400"
                              />
                            )}
                          </div>
                          <p className="text-xs text-slate-400 truncate">
                            {listing.brand} {listing.model} · {listing.year}
                          </p>
                          {(listing.location || listing.departure) && (
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <MapPin size={10} />
                              {listing.location ||
                                `${listing.departure} → ${listing.destination}`}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <TypeBadge type={listing.listingType} />
                    </td>
                    <td className="px-4 py-3">
                      <ApprovalBadge listing={listing} />
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={listing.status} />
                    </td>

                    {/* Price */}
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {fmtPrice(listing.pricePerDay || listing.pricePerSeat)}
                      <span className="text-xs text-slate-400 font-normal">
                        {listing.pricePerDay ? "/day" : "/seat"}
                      </span>
                    </td>

                    {/* Owner */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <OwnerAvatar owner={listing.owner} />
                        <div className="min-w-0">
                          <p className="text-xs font-semibold text-slate-700 truncate max-w-[100px]">
                            {listing.owner?.name}
                          </p>
                          <p className="text-xs text-slate-400 truncate max-w-[100px]">
                            {listing.owner?.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-500">
                      {fmtDate(listing.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-0.5 flex-wrap">
                        {/* View */}
                        <ActionBtn
                          title="View details"
                          onClick={() => setDetailId(listing._id)}
                          className="hover:bg-blue-50 hover:text-blue-600"
                        >
                          <Eye size={15} />
                        </ActionBtn>

                        {/* Edit */}
                        <ActionBtn
                          title="Edit listing"
                          onClick={() => setEditTarget(listing)}
                          className="hover:bg-violet-50 hover:text-violet-600"
                        >
                          <Pencil size={15} />
                        </ActionBtn>

                        {/* Approve */}
                        {!listing.isApproved && !listing.isRejected && (
                          <ActionBtn
                            title="Approve"
                            onClick={() => handleApprove(listing)}
                            className="hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <CheckCircle size={15} />
                          </ActionBtn>
                        )}

                        {/* Reject */}
                        {!listing.isRejected && (
                          <ActionBtn
                            title="Reject"
                            onClick={() => handleReject(listing)}
                            className="hover:bg-red-50 hover:text-red-600"
                          >
                            <XCircle size={15} />
                          </ActionBtn>
                        )}

                        {/* Re-approve rejected */}
                        {listing.isRejected && (
                          <ActionBtn
                            title="Re-approve"
                            onClick={() => handleApprove(listing)}
                            className="hover:bg-emerald-50 hover:text-emerald-600"
                          >
                            <CheckCircle size={15} />
                          </ActionBtn>
                        )}

                        {/* Toggle status */}
                        <ActionBtn
                          title={
                            listing.status === "active"
                              ? "Pause listing"
                              : "Activate listing"
                          }
                          onClick={() => handleToggleStatus(listing)}
                          className={
                            listing.status === "active"
                              ? "hover:bg-amber-50 hover:text-amber-600"
                              : "hover:bg-blue-50 hover:text-blue-600"
                          }
                        >
                          {listing.status === "active" ? (
                            <PauseCircle size={15} />
                          ) : (
                            <PlayCircle size={15} />
                          )}
                        </ActionBtn>

                        {/* Feature */}
                        <ActionBtn
                          title={
                            listing.isFeatured ? "Unfeature" : "Feature listing"
                          }
                          onClick={() => handleToggleFeatured(listing)}
                          className={
                            listing.isFeatured
                              ? "hover:bg-amber-50 text-amber-500 hover:text-amber-600"
                              : "hover:bg-amber-50 hover:text-amber-500"
                          }
                        >
                          <Star
                            size={15}
                            className={
                              listing.isFeatured ? "fill-amber-400" : ""
                            }
                          />
                        </ActionBtn>

                        {/* Delete */}
                        <ActionBtn
                          title="Delete listing"
                          onClick={() => setDeleteTarget(listing)}
                          className="hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </ActionBtn>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      {detailId && (
        <ListingDetailModal
          listingId={detailId}
          onClose={() => setDetailId(null)}
          onUpdate={(l) => patchListing(l._id, l)}
        />
      )}
      {editTarget && (
        <EditModal
          listing={editTarget}
          onClose={() => setEditTarget(null)}
          onSaved={(l) => patchListing(l._id, l)}
        />
      )}
      {deleteTarget && (
        <ConfirmDeleteDialog
          listing={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {/* Generic action confirm dialog */}
      {pendingAction && (
        <ConfirmDialog
          variant={pendingAction.variant}
          title={pendingAction.title}
          message={pendingAction.message}
          loading={actionLoading}
          onConfirm={executeConfirmed}
          onCancel={() => setPendingAction(null)}
        />
      )}
    </div>
  );
}
