// import { Link } from "react-router-dom";
// import { Car, CheckCircle, Clock } from "lucide-react";

// const AdminDashboard = () => {
//   return (
//     <div className="space-y-8">
//       <h1 className="text-3xl font-bold text-slate-900">Admin Dashboard</h1>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         <div className="bg-white p-6 rounded-2xl border shadow">
//           <div className="flex items-center gap-3">
//             <Car className="text-blue-600" />
//             <p className="font-semibold">Total Listings</p>
//           </div>
//           <p className="text-3xl font-bold mt-2">—</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border shadow">
//           <div className="flex items-center gap-3">
//             <Clock className="text-amber-600" />
//             <p className="font-semibold">Pending Approval</p>
//           </div>
//           <p className="text-3xl font-bold mt-2">—</p>
//         </div>

//         <div className="bg-white p-6 rounded-2xl border shadow">
//           <div className="flex items-center gap-3">
//             <CheckCircle className="text-emerald-600" />
//             <p className="font-semibold">Approved</p>
//           </div>
//           <p className="text-3xl font-bold mt-2">—</p>
//         </div>
//       </div>

//       {/* Navigation */}
//       <div className="bg-white p-6 rounded-2xl border shadow">
//         <Link
//           to="/admin/listings/pending"
//           className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
//         >
//           Review Pending Listings →
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default AdminDashboard;

// import { NavLink, Outlet } from "react-router-dom";

// const AdminDashboard = () => {
//   return (
//     <div className="flex min-h-screen bg-slate-50">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-6">
//         <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

//         <nav className="space-y-2">
//           <NavLink
//             to="/admin/listings"
//             className={({ isActive }) =>
//               `block px-4 py-2 rounded-lg font-medium ${
//                 isActive
//                   ? "bg-blue-100 text-blue-700"
//                   : "text-slate-600 hover:bg-slate-100"
//               }`
//             }
//           >
//             Pending Listings
//           </NavLink>
//         </nav>
//       </aside>

//       {/* Content */}
//       <main className="flex-1 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// };

// export default AdminDashboard;

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell } from "lucide-react";
import AdminSidebar from "../../components/admin/AdminSidebar";

const AdminDashboard = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/admin":
        return "Dashboard Overview";
      case "/admin/listings":
        return "Vehicle Listings";
      case "/admin/bookings":
        return "Booking Management";
      case "/admin/payments":
        return "Payment Management";
      case "/admin/refunds":
        return "Refund Management";
      case "/admin/users":
        return "User Management";
      case "/admin/reviews":
        return "Review Management";
      default:
        return "Admin Panel";
    }
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full shrink-0">
        <AdminSidebar
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-[70] transition-transform duration-300 transform md:hidden
          ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        <AdminSidebar
          isCollapsed={false}
          setIsCollapsed={() => {}}
          isMobile
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-40">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Menu size={24} />
            </button>

            <h1 className="text-xl font-bold text-slate-900 md:text-2xl tracking-tight">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

            {/* Admin User Profile */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-900">
                  Site Admin
                </span>
                <span className="text-[10px] text-rose-600 font-bold tracking-widest uppercase">
                  Admin Panel
                </span>
              </div>
              <div className="w-9 h-9 rounded-xl bg-rose-100 text-rose-600 font-bold flex items-center justify-center border border-rose-200 group-hover:border-rose-400 transition-colors shadow-sm">
                A
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
