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
  TrendingUp,
  TrendingDown,
  Wallet,
  Activity,
  CreditCard,
} from "lucide-react";
import { toast } from "react-toastify";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const GET_IMAGE_URL = (path) => {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const cleanPath = path.startsWith("/") ? path.substring(1) : path;
  return `https://jaum-t3no.onrender.com/${cleanPath}`;
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
      // <div className="flex justify-center items-center h-64">
      //   <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="relative w-16 h-16">
          <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 rounded-full"></div>
          <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
        </div>
      </div>
    );
  }

  if (!stats) return null;

  const { metrics, latest } = stats;

  const ownerPayout =
    (metrics.totalRevenue || 0) - (metrics.totalCommission || 0);

  // --- Mock Data for Charts ---
  // const MOCK_REVENUE_DATA = [
  //   { name: "Jan", revenue: 12000 },
  //   { name: "Feb", revenue: 19000 },
  //   { name: "Mar", revenue: 15000 },
  //   { name: "Apr", revenue: 22000 },
  //   { name: "May", revenue: 28000 },
  //   { name: "Jun", revenue: 35000 },
  //   { name: "Jul", revenue: 32000 },
  //   { name: "Aug", revenue: Math.max(0, metrics.totalRevenue || 40000) },
  // ];
  // --- Revenue Data for Charts ---
  const allMonths = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentMonthIdx = new Date().getMonth(); // 3 for April (0-indexed)

  const baseRevenue = [
    12000, 19000, 15000, 22000, 28000, 35000, 32000, 40000, 45000, 50000, 55000,
    60000,
  ];

  const MOCK_REVENUE_DATA = allMonths
    .slice(0, currentMonthIdx + 1)
    .map((month, idx) => {
      // For the current month, use the actual metrics if available, otherwise fallback
      if (idx === currentMonthIdx) {
        return {
          name: month,
          revenue: Math.max(0, metrics.totalRevenue || baseRevenue[idx]),
        };
      }
      return { name: month, revenue: baseRevenue[idx] };
    });

  const MOCK_PAYMENT_METHOD_DATA = [
    { name: "Khalti", value: 65, color: "#7c3aed" }, // violet-600
    { name: "Cash", value: 35, color: "#10b981" }, // emerald-500
  ];

  // --- Real Data for Charts ---
  const bookingStatusData = [
    { name: "Pending", count: metrics.pendingBookings, fill: "#f59e0b" }, // amber-500
    { name: "Approved", count: metrics.approvedBookings, fill: "#3b82f6" }, // blue-500
    { name: "Completed", count: metrics.completedRentals, fill: "#10b981" }, // emerald-500
    {
      name: "Rejected",
      count: Math.abs(metrics.rejectedBookings),
      fill: "#ef4444",
    }, // red-500
  ];

  const earningsData = [
    {
      name: "Platform Earnings",
      value: metrics.totalCommission || 0,
      color: "#10b981",
    }, // emerald-500
    {
      name: "Owner Payout",
      value: ownerPayout > 0 ? ownerPayout : 0,
      color: "#6366f1",
    }, // indigo-500
  ];

  const statCards = [
    //   {
    //     label: "Total Users",
    //     value: metrics.totalUsers,
    //     icon: Users,
    //     color: "text-blue-600",
    //     bg: "bg-blue-100",
    //   },
    //   {
    //     label: "Total Listings",
    //     value: metrics.totalListings,
    //     icon: Car,
    //     color: "text-purple-600",
    //     bg: "bg-purple-100",
    //   },
    //   {
    //     label: "Total Bookings",
    //     value: metrics.totalBookings,
    //     icon: Calendar,
    //     color: "text-indigo-600",
    //     bg: "bg-indigo-100",
    //   },
    //   {
    //     label: "Total Revenue",
    //     value: `Rs. ${metrics.totalRevenue.toLocaleString()}`,
    //     icon: DollarSign,
    //     color: "text-emerald-600",
    //     bg: "bg-emerald-100",
    //   },
    //   {
    //     label: "Pending Bookings",
    //     value: metrics.pendingBookings,
    //     icon: Clock,
    //     color: "text-amber-500",
    //     bg: "bg-amber-100",
    //   },
    //   {
    //     label: "Approved Bookings",
    //     value: metrics.approvedBookings,
    //     icon: CheckCircle,
    //     color: "text-sky-600",
    //     bg: "bg-sky-100",
    //   },
    //   {
    //     label: "Rejected Bookings",
    //     value: metrics.rejectedBookings,
    //     icon: XCircle,
    //     color: "text-red-500",
    //     bg: "bg-red-100",
    //   },
    //   {
    //     label: "Completed Rentals",
    //     value: metrics.completedRentals,
    //     icon: CheckSquare,
    //     color: "text-green-600",
    //     bg: "bg-green-100",
    //   },
    // ];

    {
      label: "Gross Revenue",
      value: `Rs. ${(metrics.totalRevenue || 0).toLocaleString()}`,
      icon: DollarSign,
      color: "text-blue-600",
      bg: "bg-blue-50",
      trend: "+12.5%",
      trendUp: true,
      highlighted: true,
    },
    {
      label: "Platform Earnings",
      value: `Rs. ${(metrics.totalCommission || 0).toLocaleString()}`,
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      trend: "+8.2%",
      trendUp: true,
      highlighted: true,
    },
    {
      label: "Total Bookings",
      value: metrics.totalBookings,
      icon: Calendar,
      color: "text-sky-600",
      bg: "bg-sky-50",
      trend: "+15.3%",
      trendUp: true,
      highlighted: false,
    },
    {
      label: "Total Listings",
      value: metrics.totalListings,
      icon: Car,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      trend: "+2.4%",
      trendUp: true,
      highlighted: false,
    },
  ];

  // Limit activity items to 5 max
  const recentUsersLimit = latest.recentUsers.slice(0, 5);
  const recentBookingsLimit = latest.recentBookings.slice(0, 5);

  return (
    // <div className="space-y-8 animate-fade-in text-slate-900">
    //   <h1 className="text-3xl font-bold">Dashboard Overview</h1>

    //   {/* Stats Grid */}
    <div className="space-y-10 animate-fade-in text-slate-900 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 tracking-tight">
            {/* Dashboard Overview */}
            Welcome Back!
          </h1>
          <p className="text-slate-500 mt-1">
            Here's what's happening with your platform today.
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200">
          <Activity size={18} className="text-blue-600" />
          <span>Live Updates Active</span>
        </div>
      </div>

      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}
      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}
      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}
      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}
      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}
      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}
      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}
      {/* Start from here if want to change the ui of the table of recent users and recent bookings */}

      {/* KPI Cards (Reduced to 4) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            // <div
            //   key={idx}
            //   className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition"
            // >
            //   <div className="flex items-center justify-between">
            <div
              key={idx}
              className={`relative overflow-hidden p-5 rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${
                stat.highlighted
                  ? "bg-gradient-to-br from-white to-slate-50/80 border-slate-200 shadow-md"
                  : "bg-white border-slate-100 shadow-sm"
              }`}
            >
              <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-white to-transparent opacity-50 rounded-full blur-2xl"></div>

              <div className="flex items-start justify-between relative z-10">
                <div>
                  {/* <p className="text-sm font-medium text-slate-500">
                    {stat.label}
                  </p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p> */}
                  <p className="text-xs font-semibold text-slate-500 mb-1">
                    {stat.label}
                  </p>
                  <p
                    className={`text-2xl font-bold tracking-tight ${stat.highlighted ? "text-slate-900" : "text-slate-800"}`}
                  >
                    {stat.value}
                  </p>
                </div>
                {/* <div className={`p-3 rounded-xl ${stat.bg} shadow-inner`}>
                  <Icon className={`w-5 h-5 ${stat.color}`} /> */}
                <div className={`p-3 rounded-full ${stat.bg}`}>
                  <Icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Charts (Revenue & Booking Status) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Trend Line Chart (Wide) */}
        <div className="lg:col-span-2 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">
              Revenue Overview
            </h2>
            <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">
              <TrendingUp size={16} />
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={MOCK_REVENUE_DATA}
                margin={{ top: 5, right: 10, bottom: 5, left: -20 }}
              >
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  dx={-10}
                  tickFormatter={(value) => `Rs.${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow:
                      "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    fontSize: "12px",
                  }}
                  formatter={(value) => [
                    `Rs. ${value.toLocaleString()}`,
                    "Revenue",
                  ]}
                />
                <Line
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{
                    r: 3,
                    strokeWidth: 2,
                    fill: "#fff",
                    stroke: "#3b82f6",
                  }}
                  activeDot={{ r: 5, strokeWidth: 0, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status Bar Chart (Narrow) */}
        <div className="lg:col-span-1 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-800">
              Booking Status
            </h2>
            <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
              <Calendar size={16} />
            </div>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={bookingStatusData}
                margin={{ top: 5, right: 10, bottom: 5, left: -25 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#e2e8f0"
                />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  dy={10}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#64748b", fontSize: 11 }}
                  dx={-10}
                  allowDecimals={false}
                />
                <Tooltip
                  cursor={{ fill: "#f1f5f9" }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "none",
                    boxShadow: "0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    fontSize: "12px",
                  }}
                />
                <Bar dataKey="count" radius={[4, 4, 4, 4]} barSize={24}>
                  {bookingStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Secondary Charts (Payment Methods & Earnings Breakdown) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Method Pie Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col opacity-90 hover:opacity-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-slate-700">
              Payment Methods
            </h2>
            <div className="p-1.5 bg-violet-50 text-violet-600 rounded-lg">
              <CreditCard size={14} />
            </div>
          </div>
          <div className="flex-1 min-h-[180px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={MOCK_PAYMENT_METHOD_DATA}
                  cx="50%"
                  cy="50%"
                  innerRadius={45}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                >
                  {MOCK_PAYMENT_METHOD_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [`${value}%`, "Usage"]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: "11px",
                    padding: "4px 8px",
                  }}
                />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  height={24}
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Earnings Breakdown Donut Chart */}
        <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow flex flex-col opacity-90 hover:opacity-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-sm font-bold text-slate-700">
              Earnings Breakdown
            </h2>
            <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
              <Wallet size={14} />
            </div>
          </div>
          <div className="flex-1 min-h-[180px] w-full flex items-center justify-center relative">
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-10px]">
              <span className="text-lg font-bold text-slate-700">
                Rs. {((metrics.totalCommission || 0) / 1000).toFixed(0)}k
              </span>
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={earningsData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                  stroke="none"
                  cornerIsActive={true}
                  cornerRadius={8}
                >
                  {earningsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => [
                    `Rs. ${value.toLocaleString()}`,
                    "Amount",
                  ]}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    fontSize: "11px",
                    padding: "4px 8px",
                  }}
                />
                <Legend
                  iconType="circle"
                  verticalAlign="bottom"
                  height={24}
                  wrapperStyle={{ fontSize: "11px", paddingTop: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
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
