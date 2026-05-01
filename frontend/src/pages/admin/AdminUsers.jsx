import React, { useState, useEffect, useCallback } from "react";
import {
  Search,
  Users,
  ShieldBan,
  CheckCircle,
  Trash2,
  Eye,
  ChevronDown,
  X,
  Car,
  CalendarDays,
  UserCheck,
  UserX,
  Mail,
  Phone,
  Calendar,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

/* ─── helpers ─────────────────────────────────────────────────── */
const fmtDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "—";

const GET_IMAGE_URL = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `http://localhost:5000/${cleanPath}`;
};

const Avatar = ({ user, size = "sm" }) => {
  const wh = size === "lg" ? "w-16 h-16 text-xl" : "w-9 h-9 text-sm";
  if (user.profilePicture)
    return (
      <img
        src={GET_IMAGE_URL(user.profilePicture)}
        alt={user.name}
        className={`${wh} rounded-full object-cover border-2 border-slate-200`}
      />
    );
  const initials = user.name
    ?.split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <div
      className={`${wh} rounded-full bg-rose-100 text-rose-600 font-bold flex items-center justify-center border-2 border-rose-200`}
    >
      {initials}
    </div>
  );
};

const StatusBadge = ({ suspended }) =>
  suspended ? (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-red-100 text-red-600">
      <UserX size={11} /> Suspended
    </span>
  ) : (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-600">
      <UserCheck size={11} /> Active
    </span>
  );

const RoleBadge = ({ role }) =>
  role === "admin" ? (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-rose-50 text-rose-600 border border-rose-200">
      Admin
    </span>
  ) : (
    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-500">
      User
    </span>
  );

const FILTERS = [
  { key: "all", label: "All Users" },
  { key: "renters", label: "Renters" },
  { key: "owners", label: "Owners" },
  { key: "active", label: "Active" },
  { key: "suspended", label: "Suspended" },
];

/* ─── User Detail Modal ───────────────────────────────────────── */
function UserDetailModal({ userId, onClose, onSuspendToggle }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("bookings");
  const [suspending, setSuspending] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await api.get(`/admin/users/${userId}`);
        setData(res.data);
      } catch {
        toast.error("Failed to load user details");
        onClose();
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [userId]);

  const handleSuspend = async () => {
    setSuspending(true);
    try {
      const res = await api.patch(`/admin/users/${userId}/suspend`);
      setData((prev) => ({
        ...prev,
        user: { ...prev.user, isSuspended: res.data.isSuspended },
      }));
      toast.success(res.data.message);
      onSuspendToggle(userId, res.data.isSuspended);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update status");
    } finally {
      setSuspending(false);
    }
  };

  const bookingStatusColor = (s) => {
    const map = {
      pending: "bg-yellow-100 text-yellow-700",
      confirmed: "bg-blue-100 text-blue-700",
      "approved-awaiting-payment": "bg-indigo-100 text-indigo-700",
      completed: "bg-emerald-100 text-emerald-700",
      rejected: "bg-red-100 text-red-700",
      cancelled: "bg-slate-100 text-slate-500",
    };
    return map[s] || "bg-slate-100 text-slate-500";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">User Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition"
          >
            <X size={20} />
          </button>
        </div>

        {loading ? (
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="w-8 h-8 border-4 border-rose-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto">
            {/* Profile Section */}
            <div className="px-6 py-5 bg-slate-50 border-b border-slate-100 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Avatar user={data.user} size="lg" />
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <h3 className="text-xl font-bold text-slate-900">
                    {data.user.name}
                  </h3>
                  <RoleBadge role={data.user.role} />
                  <StatusBadge suspended={data.user.isSuspended} />
                </div>
                {data.user.username && (
                  <p className="text-slate-400 text-sm">
                    @{data.user.username}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <Mail size={13} />
                    {data.user.email}
                  </span>
                  {data.user.phoneNumber && (
                    <span className="flex items-center gap-1.5">
                      <Phone size={13} />
                      {data.user.phoneNumber}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    Joined {fmtDate(data.user.createdAt)}
                  </span>
                </div>
              </div>
              {data.user.role !== "admin" && (
                <button
                  onClick={handleSuspend}
                  disabled={suspending}
                  className={`shrink-0 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold transition ${
                    data.user.isSuspended
                      ? "bg-emerald-500 hover:bg-emerald-600 text-white"
                      : "bg-red-500 hover:bg-red-600 text-white"
                  }`}
                >
                  {data.user.isSuspended ? (
                    <>
                      <CheckCircle size={15} /> Activate
                    </>
                  ) : (
                    <>
                      <ShieldBan size={15} /> Suspend
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Stats Row */}
            <div className="px-6 py-4 grid grid-cols-2 gap-3 border-b border-slate-100">
              <div className="bg-blue-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-blue-600">
                  {data.bookings.length}
                </p>
                <p className="text-xs text-blue-500 mt-0.5">Total Bookings</p>
              </div>
              <div className="bg-rose-50 rounded-xl p-3 text-center">
                <p className="text-2xl font-bold text-rose-600">
                  {data.listings.length}
                </p>
                <p className="text-xs text-rose-500 mt-0.5">Vehicle Listings</p>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-slate-100 px-6">
              {["bookings", "listings"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-4 text-sm font-medium border-b-2 -mb-px capitalize transition ${
                    activeTab === tab
                      ? "border-rose-500 text-rose-600"
                      : "border-transparent text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {tab === "bookings" ? "Booking History" : "Vehicle Listings"}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="px-6 py-4 space-y-3">
              {activeTab === "bookings" &&
                (data.bookings.length === 0 ? (
                  <EmptyState icon={CalendarDays} label="No bookings yet" />
                ) : (
                  data.bookings.map((b) => (
                    <div
                      key={b._id}
                      className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition"
                    >
                      {b.listing?.photos?.[0] ? (
                        <img
                          src={GET_IMAGE_URL(b.listing.photos[0])}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Car size={20} className="text-slate-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {b.listing?.name ||
                            b.listing?.brand + " " + b.listing?.model ||
                            "Unknown Vehicle"}
                        </p>
                        <p className="text-xs text-slate-400">
                          {fmtDate(b.createdAt)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-slate-900">
                          Rs {b.totalPrice?.toLocaleString()}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${bookingStatusColor(b.status)}`}
                        >
                          {b.status}
                        </span>
                      </div>
                    </div>
                  ))
                ))}

              {activeTab === "listings" &&
                (data.listings.length === 0 ? (
                  <EmptyState icon={Car} label="No listings yet" />
                ) : (
                  data.listings.map((l) => (
                    <div
                      key={l._id}
                      className="flex items-center gap-4 p-3 rounded-xl border border-slate-100 hover:border-slate-200 transition"
                    >
                      {l.photos?.[0] ? (
                        <img
                          src={GET_IMAGE_URL(l.photos[0])}
                          alt=""
                          className="w-14 h-14 rounded-lg object-cover shrink-0"
                        />
                      ) : (
                        <div className="w-14 h-14 rounded-lg bg-slate-100 flex items-center justify-center shrink-0">
                          <Car size={20} className="text-slate-400" />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-slate-900 truncate">
                          {l.name}
                        </p>
                        <p className="text-xs text-slate-400">
                          {l.brand} {l.model} · Listed {fmtDate(l.createdAt)}
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <p className="font-semibold text-slate-900">
                          Rs{" "}
                          {(l.pricePerDay || l.pricePerSeat)?.toLocaleString()}
                          {l.pricePerDay ? "/day" : "/seat"}
                        </p>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full font-medium capitalize ${
                            l.isApproved
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {l.isApproved ? "Approved" : "Pending"}
                        </span>
                      </div>
                    </div>
                  ))
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ icon: Icon, label }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-slate-400">
      <Icon size={36} className="mb-2 opacity-40" />
      <p className="text-sm">{label}</p>
    </div>
  );
}

/* ─── Confirm Delete Dialog ──────────────────────────────────── */
function ConfirmDeleteDialog({ user, onConfirm, onCancel, loading }) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm animate-in fade-in zoom-in-95 duration-200">
        <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Trash2 size={22} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 text-center mb-1">
          Delete User
        </h3>
        <p className="text-slate-500 text-sm text-center mb-6">
          Are you sure you want to permanently delete{" "}
          <strong>{user?.name}</strong>? This action cannot be undone.
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

/* ─── Main Page ───────────────────────────────────────────────── */
export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get("/admin/users", {
        params: { search, filter },
      });
      setUsers(res.data);
    } catch {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  }, [search, filter]);

  useEffect(() => {
    const t = setTimeout(fetchUsers, 300);
    return () => clearTimeout(t);
  }, [fetchUsers]);

  const handleSuspendToggle = (userId, isSuspended) => {
    setUsers((prev) =>
      prev.map((u) => (u._id === userId ? { ...u, isSuspended } : u)),
    );
  };

  const executeSuspend = async (user) => {
    const res = await api.patch(`/admin/users/${user._id}/suspend`);
    handleSuspendToggle(user._id, res.data.isSuspended);
    toast.success(res.data.message);
  };

  const handleSuspendInline = (user) => {
    const isSuspending = !user.isSuspended;
    setPendingAction({
      variant: isSuspending ? "suspend" : "activate",
      title: isSuspending ? "Suspend User" : "Activate User",
      message: isSuspending ? (
        <span>
          Suspend <strong>{user.name}</strong>? They will lose access to the
          platform.
        </span>
      ) : (
        <span>
          Activate <strong>{user.name}</strong>? They will regain full platform
          access.
        </span>
      ),
      fn: () => executeSuspend(user),
    });
  };

  const executeConfirmed = async () => {
    if (!pendingAction) return;
    setActionLoading(true);
    try {
      await pendingAction.fn();
    } catch (err) {
      toast.error(err.response?.data?.message || "Action failed");
    } finally {
      setActionLoading(false);
      setPendingAction(null);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/admin/users/${deleteTarget._id}`);
      setUsers((prev) => prev.filter((u) => u._id !== deleteTarget._id));
      toast.success("User deleted");
      setDeleteTarget(null);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to delete user");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">User Management</h1>
          <p className="text-slate-500 text-sm mt-0.5">
            Manage, search and monitor all platform users
          </p>
        </div>
        <div className="flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-1.5 text-sm text-slate-600">
          <Users size={16} className="text-rose-500" />
          <span className="font-semibold">{users.length}</span> users shown
        </div>
      </div>

      {/* Search + Filter */}
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
              placeholder="Search by name, email or username…"
              className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        {/* Filter Tabs */}
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
        ) : users.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <Users size={40} className="mb-3 opacity-40" />
            <p className="text-sm font-medium">No users found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-xs text-slate-400 uppercase tracking-wide border-b border-slate-100">
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium text-center">
                    Bookings
                  </th>
                  <th className="px-4 py-3 font-medium text-center">
                    Listings
                  </th>
                  <th className="px-4 py-3 font-medium">Joined</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {users.map((user) => (
                  <tr
                    key={user._id}
                    className="hover:bg-slate-50/60 transition group"
                  >
                    {/* User info */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar user={user} />
                        <div className="min-w-0">
                          <p className="font-semibold text-slate-900 truncate max-w-[160px]">
                            {user.name}
                          </p>
                          <p className="text-xs text-slate-400 truncate max-w-[160px]">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">
                      <RoleBadge role={user.role} />
                    </td>

                    <td className="px-4 py-3">
                      <StatusBadge suspended={user.isSuspended} />
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-50 text-blue-600 font-bold text-xs">
                        {user.bookingCount}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-rose-50 text-rose-600 font-bold text-xs">
                        {user.listingCount}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-slate-500 text-xs">
                      {fmtDate(user.createdAt)}
                    </td>

                    {/* Actions */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        {/* View Detail */}
                        <button
                          title="View details"
                          onClick={() => setSelectedUserId(user._id)}
                          className="p-1.5 rounded-lg hover:bg-blue-50 text-slate-400 hover:text-blue-600 transition"
                        >
                          <Eye size={16} />
                        </button>

                        {/* Suspend/Activate */}
                        {user.role !== "admin" && (
                          <button
                            title={
                              user.isSuspended
                                ? "Activate user"
                                : "Suspend user"
                            }
                            onClick={() => handleSuspendInline(user)}
                            className={`p-1.5 rounded-lg transition ${
                              user.isSuspended
                                ? "hover:bg-emerald-50 text-slate-400 hover:text-emerald-600"
                                : "hover:bg-amber-50 text-slate-400 hover:text-amber-600"
                            }`}
                          >
                            {user.isSuspended ? (
                              <CheckCircle size={16} />
                            ) : (
                              <ShieldBan size={16} />
                            )}
                          </button>
                        )}

                        {/* Delete */}
                        {user.role !== "admin" && (
                          <button
                            title="Delete user"
                            onClick={() => setDeleteTarget(user)}
                            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-600 transition"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* User Detail Modal */}
      {selectedUserId && (
        <UserDetailModal
          userId={selectedUserId}
          onClose={() => setSelectedUserId(null)}
          onSuspendToggle={handleSuspendToggle}
        />
      )}

      {/* Delete Confirm */}
      {deleteTarget && (
        <ConfirmDeleteDialog
          user={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          loading={deleting}
        />
      )}

      {/* Generic action confirm */}
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
