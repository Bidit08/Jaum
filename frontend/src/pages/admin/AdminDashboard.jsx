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

import { NavLink, Outlet } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          <NavLink
            to="/admin/listings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg font-medium ${
                isActive
                  ? "bg-blue-100 text-blue-700"
                  : "text-slate-600 hover:bg-slate-100"
              }`
            }
          >
            Pending Listings
          </NavLink>
        </nav>
      </aside>

      {/* Content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminDashboard;
