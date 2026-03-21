import { useState, useEffect } from "react";
import api from "../../utils/api";
import {
  Users,
  Car,
  Calendar,
  DollarSign,
  Clock,
  CheckCircle,
  XCircle,
  CheckSquare,
} from "lucide-react";
import { toast } from "react-toastify";

const GET_IMAGE_URL = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `http://localhost:5000/${cleanPath}`;
};

const AdminOverview = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/admin/dashboard");
      setStats(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load dashboard statistics");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!stats) return null;

  const { metrics, latest } = stats;

  const statCards = [
    {
      label: "Total Users",
      value: metrics.totalUsers,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      label: "Total Listings",
      value: metrics.totalListings,
      icon: Car,
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      label: "Total Bookings",
      value: metrics.totalBookings,
      icon: Calendar,
      color: "text-indigo-600",
      bg: "bg-indigo-100",
    },
    {
      label: "Total Revenue",
      value: `Rs. ${metrics.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
      bg: "bg-emerald-100",
    },
    {
      label: "Pending Bookings",
      value: metrics.pendingBookings,
      icon: Clock,
      color: "text-amber-500",
      bg: "bg-amber-100",
    },
    {
      label: "Approved Bookings",
      value: metrics.approvedBookings,
      icon: CheckCircle,
      color: "text-sky-600",
      bg: "bg-sky-100",
    },
    {
      label: "Rejected Bookings",
      value: metrics.rejectedBookings,
      icon: XCircle,
      color: "text-red-500",
      bg: "bg-red-100",
    },
    {
      label: "Completed Rentals",
      value: metrics.completedRentals,
      icon: CheckSquare,
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  return (
    <div className="space-y-8 animate-fade-in text-slate-900">
      <h1 className="text-3xl font-bold">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Users */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
          <h2 className="text-xl font-bold mb-4">Recent Users</h2>
          <div className="space-y-4">
            {latest.recentUsers.length > 0 ? (
              latest.recentUsers.map((u) => (
                <div
                  key={u._id}
                  className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl"
                >
                  {u.profilePicture ? (
                    // <img
                    //   src={u.profilePicture}
                    //   alt={u.name}
                    //   className="w-10 h-10 rounded-full object-cover"
                    // />
                    <img
                      src={GET_IMAGE_URL(u.profilePicture)}
                      alt={u.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold">
                      {u.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-sm">{u.name}</h3>
                    <p className="text-xs text-slate-500">{u.email}</p>
                  </div>
                  <div className="ml-auto text-xs text-slate-400">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No recent users.</p>
            )}
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 overflow-hidden">
          <h2 className="text-xl font-bold mb-4">Recent Bookings</h2>
          <div className="space-y-4">
            {latest.recentBookings.length > 0 ? (
              latest.recentBookings.map((b) => (
                <div
                  key={b._id}
                  className="flex items-center justify-between p-3 bg-slate-50 rounded-xl hover:bg-slate-100 transition"
                >
                  <div>
                    <h3 className="font-semibold text-sm line-clamp-1">
                      {b.listing?.name || "Vehicle"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      By {b.user?.name || "Unknown"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-slate-700">
                      Rs. {b.totalPrice}
                    </p>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full inline-block mt-1 capitalize border ${
                        b.status === "completed"
                          ? "bg-green-50 text-green-700 border-green-200"
                          : b.status === "pending"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : b.status.includes("rejected") ||
                                b.status === "cancelled"
                              ? "bg-red-50 text-red-700 border-red-200"
                              : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {b.status.replace("-", " ")}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-slate-500 text-sm">No recent bookings.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
