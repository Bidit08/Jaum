// // components/Dashboard.jsx
// import React, { useState } from "react";
// import {
//   Car,
//   Users,
//   Calendar,
//   DollarSign,
//   TrendingUp,
//   MapPin,
//   Settings,
//   Bell,
//   Search,
//   Menu,
//   X,
//   Star,
//   Shield,
//   Zap,
//   Clock,
// } from "lucide-react";

// const Dashboard = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeTab, setActiveTab] = useState("overview");

//   // Mock data
//   const stats = [
//     {
//       title: "Total Revenue",
//       value: "$24,580",
//       change: "+12.5%",
//       icon: DollarSign,
//       color: "text-green-500",
//       bgColor: "bg-green-500/10",
//     },
//     {
//       title: "Active Rentals",
//       value: "18",
//       change: "+3.2%",
//       icon: Car,
//       color: "text-blue-500",
//       bgColor: "bg-blue-500/10",
//     },
//     {
//       title: "New Customers",
//       value: "42",
//       change: "+8.1%",
//       icon: Users,
//       color: "text-purple-500",
//       bgColor: "bg-purple-500/10",
//     },
//     {
//       title: "Bookings",
//       value: "156",
//       change: "+5.7%",
//       icon: Calendar,
//       color: "text-orange-500",
//       bgColor: "bg-orange-500/10",
//     },
//   ];

//   const recentBookings = [
//     {
//       id: 1,
//       customer: "John Smith",
//       car: "Tesla Model 3",
//       date: "2024-01-15",
//       status: "Active",
//       amount: "$89",
//     },
//     {
//       id: 2,
//       customer: "Sarah Johnson",
//       car: "BMW X5",
//       date: "2024-01-14",
//       status: "Completed",
//       amount: "$129",
//     },
//     {
//       id: 3,
//       customer: "Mike Davis",
//       car: "Mercedes C-Class",
//       date: "2024-01-14",
//       status: "Upcoming",
//       amount: "$99",
//     },
//     {
//       id: 4,
//       customer: "Emily Wilson",
//       car: "Audi Q7",
//       date: "2024-01-13",
//       status: "Active",
//       amount: "$149",
//     },
//   ];

//   const popularCars = [
//     {
//       name: "Tesla Model 3",
//       bookings: 24,
//       revenue: "$2,136",
//       image: "/api/placeholder/80/60",
//     },
//     {
//       name: "BMW X5",
//       bookings: 18,
//       revenue: "$2,322",
//       image: "/api/placeholder/80/60",
//     },
//     {
//       name: "Mercedes C-Class",
//       bookings: 16,
//       revenue: "$1,584",
//       image: "/api/placeholder/80/60",
//     },
//     {
//       name: "Audi Q7",
//       bookings: 12,
//       revenue: "$1,788",
//       image: "/api/placeholder/80/60",
//     },
//   ];

//   const getStatusColor = (status) => {
//     switch (status) {
//       case "Active":
//         return "bg-green-500/20 text-green-500";
//       case "Completed":
//         return "bg-blue-500/20 text-blue-500";
//       case "Upcoming":
//         return "bg-orange-500/20 text-orange-500";
//       default:
//         return "bg-gray-500/20 text-gray-500";
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50/30">
//       {/* Sidebar Overlay */}
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/50 z-40 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       <div className="flex">
//         {/* Sidebar */}
//         <div
//           className={`
//           fixed lg:static inset-y-0 left-0 z-50
//           w-64 bg-white/80 backdrop-blur-xl border-r border-gray-200/60
//           transform transition-transform duration-300 ease-in-out
//           ${
//             sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
//           }
//         `}
//         >
//           {/* Logo */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-200/60">
//             <div className="flex items-center space-x-3">
//               <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//                 <Car className="w-5 h-5 text-white" />
//               </div>
//               <div>
//                 <h1 className="text-xl font-bold text-gray-900">Jaum</h1>
//                 <p className="text-xs text-gray-500">Dashboard</p>
//               </div>
//             </div>
//             <button
//               onClick={() => setSidebarOpen(false)}
//               className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//             >
//               <X className="w-4 h-4 text-gray-600" />
//             </button>
//           </div>

//           {/* Navigation */}
//           <nav className="p-4 space-y-2">
//             {[
//               { name: "Overview", icon: TrendingUp, active: true },
//               { name: "Bookings", icon: Calendar },
//               { name: "Vehicles", icon: Car },
//               { name: "Customers", icon: Users },
//               { name: "Locations", icon: MapPin },
//               { name: "Revenue", icon: DollarSign },
//             ].map((item) => (
//               <button
//                 key={item.name}
//                 className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
//                   item.active
//                     ? "bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25"
//                     : "text-gray-600 hover:text-gray-900 hover:bg-gray-100/50"
//                 }`}
//               >
//                 <item.icon className="w-4 h-4" />
//                 <span>{item.name}</span>
//               </button>
//             ))}
//           </nav>

//           {/* User Section */}
//           <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200/60">
//             <div className="flex items-center space-x-3 p-3 rounded-xl bg-gray-50/50">
//               <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                 <span className="text-xs font-semibold text-white">AD</span>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-medium text-gray-900 truncate">
//                   Admin User
//                 </p>
//                 <p className="text-xs text-gray-500 truncate">admin@jaum.com</p>
//               </div>
//               <button className="p-1 hover:bg-gray-200 rounded-lg transition-colors">
//                 <Settings className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="flex-1 lg:ml-0">
//           {/* Top Bar */}
//           <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200/60 sticky top-0 z-30">
//             <div className="flex items-center justify-between p-4">
//               <div className="flex items-center space-x-4">
//                 <button
//                   onClick={() => setSidebarOpen(true)}
//                   className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
//                 >
//                   <Menu className="w-5 h-5 text-gray-600" />
//                 </button>

//                 {/* Search Bar */}
//                 <div className="relative max-w-md flex-1">
//                   <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
//                   <input
//                     type="text"
//                     placeholder="Search bookings, customers, vehicles..."
//                     className="w-full pl-10 pr-4 py-2 bg-gray-100/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
//                   />
//                 </div>
//               </div>

//               <div className="flex items-center space-x-3">
//                 <button className="relative p-2 hover:bg-gray-100 rounded-xl transition-colors">
//                   <Bell className="w-5 h-5 text-gray-600" />
//                   <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
//                 </button>

//                 <div className="w-8 h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center">
//                   <span className="text-xs font-semibold text-white">AD</span>
//                 </div>
//               </div>
//             </div>
//           </header>

//           {/* Dashboard Content */}
//           <main className="p-6">
//             {/* Welcome Section */}
//             <div className="mb-8">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                 Welcome back, Admin! 👋
//               </h1>
//               <p className="text-gray-600">
//                 Here's what's happening with your rental business today.
//               </p>
//             </div>

//             {/* Stats Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//               {stats.map((stat, index) => (
//                 <div
//                   key={index}
//                   className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300"
//                 >
//                   <div className="flex items-center justify-between mb-4">
//                     <div className={`p-3 rounded-xl ${stat.bgColor}`}>
//                       <stat.icon className={`w-6 h-6 ${stat.color}`} />
//                     </div>
//                     <span className="text-sm font-medium text-green-500 bg-green-500/10 px-2 py-1 rounded-full">
//                       {stat.change}
//                     </span>
//                   </div>
//                   <h3 className="text-2xl font-bold text-gray-900 mb-1">
//                     {stat.value}
//                   </h3>
//                   <p className="text-sm text-gray-600">{stat.title}</p>
//                 </div>
//               ))}
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//               {/* Recent Bookings */}
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
//                 <div className="flex items-center justify-between mb-6">
//                   <h2 className="text-lg font-semibold text-gray-900">
//                     Recent Bookings
//                   </h2>
//                   <button className="text-sm text-cyan-600 hover:text-cyan-700 font-medium">
//                     View All
//                   </button>
//                 </div>

//                 <div className="space-y-4">
//                   {recentBookings.map((booking) => (
//                     <div
//                       key={booking.id}
//                       className="flex items-center justify-between p-4 bg-gray-50/50 rounded-xl border border-gray-200/40 hover:border-cyan-200 transition-all duration-200"
//                     >
//                       <div className="flex items-center space-x-4">
//                         <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
//                           <Car className="w-6 h-6 text-white" />
//                         </div>
//                         <div>
//                           <h3 className="font-medium text-gray-900">
//                             {booking.customer}
//                           </h3>
//                           <p className="text-sm text-gray-600">{booking.car}</p>
//                         </div>
//                       </div>
//                       <div className="text-right">
//                         <span
//                           className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
//                             booking.status
//                           )}`}
//                         >
//                           {booking.status}
//                         </span>
//                         <p className="text-sm font-semibold text-gray-900 mt-1">
//                           {booking.amount}
//                         </p>
//                         <p className="text-xs text-gray-500">{booking.date}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Popular Cars & Quick Stats */}
//               <div className="space-y-8">
//                 {/* Popular Cars */}
//                 <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
//                   <h2 className="text-lg font-semibold text-gray-900 mb-6">
//                     Popular Cars
//                   </h2>
//                   <div className="space-y-4">
//                     {popularCars.map((car, index) => (
//                       <div
//                         key={index}
//                         className="flex items-center justify-between p-3 rounded-xl bg-gray-50/50 border border-gray-200/40 hover:border-cyan-200 transition-all duration-200"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-16 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
//                             <Car className="w-6 h-6 text-gray-400" />
//                           </div>
//                           <div>
//                             <h3 className="font-medium text-gray-900 text-sm">
//                               {car.name}
//                             </h3>
//                             <p className="text-xs text-gray-600">
//                               {car.bookings} bookings
//                             </p>
//                           </div>
//                         </div>
//                         <div className="text-right">
//                           <p className="text-sm font-semibold text-gray-900">
//                             {car.revenue}
//                           </p>
//                           <div className="flex items-center space-x-1">
//                             {[1, 2, 3, 4, 5].map((star) => (
//                               <Star
//                                 key={star}
//                                 className="w-3 h-3 fill-yellow-400 text-yellow-400"
//                               />
//                             ))}
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Quick Stats */}
//                 <div className="grid grid-cols-2 gap-4">
//                   <div className="bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl p-4 text-white">
//                     <Shield className="w-8 h-8 mb-2 opacity-90" />
//                     <h3 className="font-semibold text-sm">Insurance</h3>
//                     <p className="text-2xl font-bold">100%</p>
//                     <p className="text-xs opacity-90">Covered</p>
//                   </div>
//                   <div className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl p-4 text-white">
//                     <Zap className="w-8 h-8 mb-2 opacity-90" />
//                     <h3 className="font-semibold text-sm">Availability</h3>
//                     <p className="text-2xl font-bold">92%</p>
//                     <p className="text-xs opacity-90">Cars Ready</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Bottom Stats */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-orange-500/10 rounded-xl flex items-center justify-center">
//                     <Clock className="w-6 h-6 text-orange-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       Avg. Rental
//                     </h3>
//                     <p className="text-2xl font-bold text-gray-900">3.2 days</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
//                     <Star className="w-6 h-6 text-green-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       Rating
//                     </h3>
//                     <p className="text-2xl font-bold text-gray-900">4.8/5</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/60 shadow-sm">
//                 <div className="flex items-center space-x-3">
//                   <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
//                     <Users className="w-6 h-6 text-blue-500" />
//                   </div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       Support
//                     </h3>
//                     <p className="text-2xl font-bold text-gray-900">24/7</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import React from "react";
import { TrendingUp, Users, Car, CreditCard, ArrowUpRight } from "lucide-react";

const stats = [
  {
    label: "Active Bookings",
    value: "12",
    icon: Car,
    color: "text-blue-600",
    bg: "bg-blue-100/50",
  },
  {
    label: "Profile Views",
    value: "1,284",
    icon: Users,
    color: "text-purple-600",
    bg: "bg-purple-100/50",
  },
  {
    label: "Total Earnings",
    value: "$4,250",
    icon: CreditCard,
    color: "text-emerald-600",
    bg: "bg-emerald-100/50",
  },
  {
    label: "Growth",
    value: "+24%",
    icon: TrendingUp,
    color: "text-orange-600",
    bg: "bg-orange-100/50",
  },
];

const DashboardHome = () => {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white border border-slate-200 rounded-3xl p-6 hover:border-blue-200 transition-all shadow-sm hover:shadow-md group"
          >
            <div className="flex items-start justify-between">
              <div
                className={`p-3 rounded-2xl ${stat.bg} transition-transform group-hover:scale-110`}
              >
                <stat.icon className={stat.color} size={24} />
              </div>
              <button className="text-slate-400 hover:text-slate-900 transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>

            <div className="mt-5">
              <h3 className="text-slate-500 text-sm font-medium">
                {stat.label}
              </h3>
              <p className="text-2xl font-bold text-slate-900 mt-1">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Main Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-900">
              Recent Vehicle Activity
            </h2>
            <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
              View All
            </button>
          </div>

          <div className="divide-y divide-slate-50">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="p-6 flex items-center gap-4 hover:bg-slate-50 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                  <img
                    src={`https://picsum.photos/seed/car${item}/100/100`}
                    alt="Car"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-slate-900 truncate">
                    Tesla Model 3 Performance
                  </h4>
                  <p className="text-xs text-slate-500">
                    Reserved by James Miller • 2 hours ago
                  </p>
                </div>

                <div className="text-right">
                  <span className="inline-block px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-[10px] font-bold uppercase tracking-wider">
                    Confirmed
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-6">
          {/* CTA */}
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 relative overflow-hidden group shadow-xl shadow-blue-500/10">
            <div className="relative z-10">
              <h3 className="text-xl font-bold text-white">List your car</h3>
              <p className="text-blue-100 text-sm mt-2 opacity-90">
                Start earning passive income today by listing your spare
                vehicle.
              </p>
              <button className="mt-8 w-full py-3.5 bg-white text-blue-600 font-bold rounded-2xl hover:bg-blue-50 transition-colors shadow-lg shadow-black/10">
                Add New Vehicle
              </button>
            </div>

            <Car
              size={140}
              className="absolute -bottom-10 -right-10 text-white opacity-10 group-hover:rotate-12 transition-transform duration-700"
            />
          </div>

          {/* Earnings */}
          <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Earnings This Week
            </h3>

            <div className="flex items-end justify-between">
              <div>
                <span className="text-3xl font-extrabold text-slate-900">
                  $1,420.00
                </span>
                <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <TrendingUp size={12} /> +12% from last week
                </p>
              </div>

              <div className="flex gap-1.5 items-end h-20">
                {[4, 7, 5, 8, 6, 9, 7].map((h, i) => (
                  <div
                    key={i}
                    className="w-2.5 bg-blue-100 rounded-full hover:bg-blue-600 transition-all cursor-pointer"
                    style={{ height: `${h * 10}%` }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
