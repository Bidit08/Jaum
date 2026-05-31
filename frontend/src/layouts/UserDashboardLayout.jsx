// import SidebarNavigation from "@/components/SidebarNavigation";
// import { Outlet } from "react-router-dom";

// export default function UserDashboardLayout() {
//   return (
//     <div className="flex bg-slate-900 min-h-screen text-white">
//       <SidebarNavigation />

//       <main className="flex-1 ml-64 p-8">
//         <Outlet />
//       </main>
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import { Outlet, useLocation } from "react-router-dom";
// import { Menu, Bell, Search } from "lucide-react";
// import SidebarNavigation from "../components/SidebarNavigation";

// const UserDashboardLayout = () => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const location = useLocation();

//   const getPageTitle = () => {
//     const path = location.pathname.split("/").pop() || "Dashboard";
//     return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
//   };

//   useEffect(() => {
//     setIsMobileMenuOpen(false);
//   }, [location.pathname]);

//   return (
//     <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
//       {/* Desktop Sidebar */}
//       <div className="hidden md:block h-full shrink-0">
//         <SidebarNavigation
//           isCollapsed={isCollapsed}
//           setIsCollapsed={setIsCollapsed}
//         />
//       </div>

//       {/* Mobile Overlay */}
//       {isMobileMenuOpen && (
//         <div
//           className="fixed inset-0 z-[60] bg-slate-900/20 backdrop-blur-sm md:hidden"
//           onClick={() => setIsMobileMenuOpen(false)}
//         />
//       )}

//       {/* Mobile Sidebar */}
//       <div
//         className={`
//           fixed inset-y-0 left-0 z-[70] transition-transform duration-300 transform md:hidden
//           ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}
//         `}
//       >
//         <SidebarNavigation
//           isCollapsed={false}
//           setIsCollapsed={() => {}}
//           isMobile
//           onClose={() => setIsMobileMenuOpen(false)}
//         />
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
//         {/* Top Navbar */}
//         <header className="h-20 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 shrink-0 z-40">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setIsMobileMenuOpen(true)}
//               className="md:hidden p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
//             >
//               <Menu size={24} />
//             </button>

//             <h1 className="text-xl font-bold text-slate-900 md:text-2xl tracking-tight">
//               {getPageTitle()}
//             </h1>
//           </div>

//           <div className="flex items-center gap-3 md:gap-6">
//             {/* Search */}
//             <div className="hidden sm:flex items-center relative group">
//               <Search
//                 size={18}
//                 className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors"
//               />
//               <input
//                 type="text"
//                 placeholder="Search rentals..."
//                 className="bg-slate-100 border-transparent border focus:bg-white focus:border-slate-200
//                            rounded-xl py-2 pl-10 pr-4 w-40 md:w-64 text-sm
//                            focus:outline-none focus:ring-2 focus:ring-blue-500/10
//                            transition-all text-slate-700 placeholder:text-slate-400"
//               />
//             </div>

//             {/* Notifications */}
//             <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
//               <Bell size={20} />
//               <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
//             </button>

//             <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

//             {/* User */}
//             <div className="flex items-center gap-3 group cursor-pointer">
//               <div className="hidden md:flex flex-col items-end">
//                 <span className="text-sm font-semibold text-slate-900">
//                   Alex Johnson
//                 </span>
//                 <span className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">
//                   Premium
//                 </span>
//               </div>
//               <img
//                 src="https://picsum.photos/seed/user/100/100"
//                 alt="Profile"
//                 className="w-9 h-9 rounded-xl border border-slate-200
//                            group-hover:border-blue-500 transition-colors shadow-sm"
//               />
//             </div>
//           </div>
//         </header>

//         {/* Page Content */}
//         <main className="flex-1 overflow-y-auto p-4 md:p-8">
//           <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
//             <Outlet />
//           </div>
//         </main>
//       </div>
//     </div>
//   );
// };

// export default UserDashboardLayout;

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell, Search } from "lucide-react";
import SidebarNavigation from "../components/SidebarNavigation";
import NotificationPanel from "../components/NotificationPanel";
import api from "../utils/api";

const BACKEND = "https://jaum-t3no.onrender.com";

const useAuthUser = () => {
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("user")) || {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    const sync = () => {
      try {
        setUser(JSON.parse(localStorage.getItem("user")) || {});
      } catch {
        setUser({});
      }
    };
    window.addEventListener("authChanged", sync);
    return () => window.removeEventListener("authChanged", sync);
  }, []);
  return user;
};

const UserDashboardLayout = () => {
  const authUser = useAuthUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const location = useLocation();

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get("/notifications");
      setUnreadCount(res.data.filter((n) => !n.isRead).length);
    } catch (err) {
      console.error("Failed to fetch notification count", err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 60000); // Poll every 60s
    return () => clearInterval(interval);
  }, []);

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop() || "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-[#f5f7fb] text-slate-900 overflow-hidden font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full shrink-0 z-50">
        <SidebarNavigation
          isCollapsed={isCollapsed}
          setIsCollapsed={setIsCollapsed}
        />
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`
          fixed inset-y-0 left-0 z-[70] transition-transform duration-300 transform lg:hidden
          ${isMobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full"}
        `}
      >
        <SidebarNavigation
          isCollapsed={false}
          setIsCollapsed={() => {}}
          isMobile
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 h-full overflow-hidden relative">
        {/* Top Navbar */}
        <header className="h-24 border-b border-slate-200/60 bg-white/95 backdrop-blur-2xl flex items-center justify-between px-8 shrink-0 z-40 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)]">
          <div className="flex items-center gap-5">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <Menu size={22} />
            </button>

            <h1 className="text-2xl font-black text-slate-900 tracking-tight drop-shadow-sm">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-6">
            {/* Glass Search Bar */}
            {/* <div className="hidden sm:flex items-center relative group">
              <Search
                size={16}
                className="absolute left-4 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10"
              />
              <input
                type="text"
                placeholder="Search rentals, payments..."
                className="bg-slate-50/80 border border-slate-100 hover:border-slate-300 shadow-inner focus:bg-white focus:border-blue-500/40 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.05)]
                           rounded-full py-2.5 pl-11 pr-5 w-48 lg:w-72 text-sm font-medium text-slate-700 placeholder:text-slate-400
                           focus:outline-none transition-all duration-300 relative"
              />
            </div> */}

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2.5 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <Bell size={20} className="group-hover:animate-swing" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2.5 min-w-4 h-4 bg-rose-500 text-white text-[9px] font-bold rounded-full border border-white flex items-center justify-center px-1 shadow-sm shadow-rose-500/40">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>
              <NotificationPanel
                isOpen={isNotificationsOpen}
                onClose={() => setIsNotificationsOpen(false)}
                onUpdate={fetchUnreadCount}
                theme="light"
              />
            </div>

            <div className="h-8 w-px bg-slate-200 hidden sm:block"></div>

            {/* User Profile */}
            <div className="flex items-center gap-3 group cursor-pointer hover:bg-slate-50 p-1.5 rounded-2xl transition-colors">
              <div className="hidden sm:flex flex-col items-end pr-1">
                <span className="text-sm font-bold text-slate-900 tracking-tight">
                  {authUser.name || "User"}
                </span>
                <span className="text-[10px] text-blue-600 font-extrabold tracking-widest uppercase">
                  {authUser.role || "Member"}
                </span>
              </div>
              <div className="relative">
                {authUser.profilePicture ? (
                  <img
                    src={
                      authUser.profilePicture.startsWith("http")
                        ? authUser.profilePicture
                        : `${BACKEND}${authUser.profilePicture}`
                    }
                    alt={authUser.name}
                    className="w-10 h-10 rounded-xl object-cover border border-slate-200 shadow-sm group-hover:border-blue-500 group-hover:shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] transition-all duration-300 shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:shadow-[0_8px_20px_-6px_rgba(37,99,235,0.4)] transition-all duration-300 shrink-0">
                    {(authUser.name || "U").charAt(0).toUpperCase()}
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 hide-scrollbar">
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-700 ease-out">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default UserDashboardLayout;
