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

import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Menu, Bell, Search } from "lucide-react";
import SidebarNavigation from "../components/SidebarNavigation";

const UserDashboardLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split("/").pop() || "Dashboard";
    return path.charAt(0).toUpperCase() + path.slice(1).replace("-", " ");
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden">
      {/* Desktop Sidebar */}
      <div className="hidden md:block h-full shrink-0">
        <SidebarNavigation
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
            {/* Search */}
            <div className="hidden sm:flex items-center relative group">
              <Search
                size={18}
                className="absolute left-3 text-slate-400 group-focus-within:text-blue-500 transition-colors"
              />
              <input
                type="text"
                placeholder="Search rentals..."
                className="bg-slate-100 border-transparent border focus:bg-white focus:border-slate-200
                           rounded-xl py-2 pl-10 pr-4 w-40 md:w-64 text-sm
                           focus:outline-none focus:ring-2 focus:ring-blue-500/10
                           transition-all text-slate-700 placeholder:text-slate-400"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-all">
              <Bell size={20} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-blue-600 rounded-full border-2 border-white"></span>
            </button>

            <div className="h-8 w-px bg-slate-200 hidden md:block"></div>

            {/* User */}
            <div className="flex items-center gap-3 group cursor-pointer">
              <div className="hidden md:flex flex-col items-end">
                <span className="text-sm font-semibold text-slate-900">
                  Alex Johnson
                </span>
                <span className="text-[10px] text-blue-600 font-bold tracking-widest uppercase">
                  Premium
                </span>
              </div>
              <img
                src="https://picsum.photos/seed/user/100/100"
                alt="Profile"
                className="w-9 h-9 rounded-xl border border-slate-200
                           group-hover:border-blue-500 transition-colors shadow-sm"
              />
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

export default UserDashboardLayout;
