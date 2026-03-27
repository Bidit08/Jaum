import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Menu,
  ShieldAlert,
  Users,
  Car,
  Calendar,
  CreditCard,
  DollarSign,
} from "lucide-react";
import { cn } from "../../lib/utils";

const adminNavItems = [
  { name: "Overview", path: "/admin", icon: LayoutDashboard },
  { name: "Listings", path: "/admin/listings", icon: Car },
  { name: "Bookings", path: "/admin/bookings", icon: Calendar },
  { name: "Payments", path: "/admin/payments", icon: CreditCard },
  { name: "Payouts", path: "/admin/payouts", icon: DollarSign },
  { name: "Users", path: "/admin/users", icon: Users },
];

const AdminSidebar = ({
  isCollapsed,
  setIsCollapsed,
  isMobile = false,
  onClose,
}) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <aside
      className={cn(
        "h-full flex flex-col bg-white border-r border-slate-200 shadow-sm transition-all duration-300",
        isMobile ? "w-64" : isCollapsed ? "w-20" : "w-64",
      )}
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-slate-100">
        <NavLink
          to="/admin"
          className="flex items-center gap-3 overflow-hidden group"
        >
          <div className="w-10 h-10 bg-rose-600 rounded-xl flex items-center justify-center text-white font-bold shadow group-hover:scale-105 transition">
            <ShieldAlert size={20} />
          </div>

          {!isCollapsed && (
            <span className="text-lg font-bold text-slate-900 whitespace-nowrap group-hover:text-rose-600 transition">
              Admin Panel
            </span>
          )}
        </NavLink>

        {/* Collapse button (desktop only) */}
        {!isMobile && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-slate-100 text-slate-500"
          >
            <Menu size={18} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
        {adminNavItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              onClick={() => isMobile && onClose?.()}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-rose-50 text-rose-600 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  isCollapsed && "justify-center",
                )
              }
            >
              <Icon
                size={22}
                className={cn(
                  "shrink-0 transition-colors",
                  "group-hover:text-rose-600",
                )}
              />
              {!isCollapsed && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-100 mt-auto">
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl",
            "text-slate-500 hover:bg-red-50 hover:text-red-600",
            "transition-all duration-200",
            isCollapsed && !isMobile && "justify-center",
          )}
        >
          <LogOut size={20} className="shrink-0" />
          {(!isCollapsed || isMobile) && (
            <span className="font-medium">Logout</span>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
