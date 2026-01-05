// import { Link, useLocation } from "react-router-dom";
// import { LayoutDashboard, User, CarFront } from "lucide-react";
// import { Lock as LockIcon } from "lucide-react";
// import { cn } from "@/lib/utils";

// const SidebarNavigation = () => {
//   const location = useLocation();

//   const menu = [
//     {
//       label: "Dashboard",
//       path: "/dashboard",
//       icon: <LayoutDashboard size={20} />,
//     },
//     { label: "Profile", path: "/dashboard/profile", icon: <User size={20} /> },
//     {
//       label: "My Vehicles",
//       path: "/dashboard/vehicles",
//       icon: <CarFront size={20} />,
//     },
//     {
//       label: "Add Vehicle",
//       path: "/dashboard/add-vehicle",
//       icon: <CarFront size={20} />,
//     },
//     {
//       label: "Security",
//       path: "/dashboard/security",
//       icon: <LockIcon size={20} />,
//     },
//   ];

//   return (
//     <div className="h-screen w-64 bg-slate-900/70 backdrop-blur-xl border-r border-white/10 flex flex-col py-6 fixed left-0 top-0">
//       <div className="px-6 mb-8">
//         <h1 className="text-2xl font-bold text-white tracking-wide">Jaum</h1>
//       </div>

//       <nav className="space-y-1 px-4">
//         {menu.map((item) => {
//           const isActive = location.pathname.startsWith(item.path);

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={cn(
//                 "flex items-center gap-3 px-4 py-3 text-gray-300 rounded-lg transition",
//                 "hover:bg-white/10 hover:text-white",
//                 isActive &&
//                   "bg-blue-600/20 text-white border border-blue-500/40"
//               )}
//             >
//               {item.icon}
//               <span className="text-sm font-medium">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default SidebarNavigation;

// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   User,
//   CarFront,
//   Lock,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const SidebarNavigation = () => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);

//   const menu = [
//     {
//       label: "Dashboard",
//       path: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     { label: "Profile", path: "/dashboard/profile", icon: User },
//     {
//       label: "My Vehicles",
//       path: "/dashboard/vehicles",
//       icon: CarFront,
//     },
//     {
//       label: "Add Vehicle",
//       path: "/dashboard/add-vehicle",
//       icon: CarFront,
//     },
//     {
//       label: "Security",
//       path: "/dashboard/security",
//       icon: Lock,
//     },
//   ];

//   return (
//     <div
//       className={cn(
//         "h-screen bg-slate-900/70 backdrop-blur-xl border-r border-white/10 flex flex-col py-6 fixed left-0 top-0 transition-all duration-300",
//         collapsed ? "w-20" : "w-64"
//       )}
//     >
//       {/* Collapse Toggle Button */}
//       <button
//         className="absolute -right-3 top-10 w-6 h-6 bg-slate-800 border border-white/10 text-white rounded-full flex items-center justify-center"
//         onClick={() => setCollapsed(!collapsed)}
//       >
//         {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
//       </button>

//       {/* Brand */}
//       {/* {!collapsed && (
//         <div className="px-6 mb-8 pt-10">
//           <h1 className="text-2xl font-bold text-white tracking-wide">Jaum</h1>
//         </div>
//       )} */}

//       {/* Navigation */}
//       <nav className="space-y-1 px-3 pt-18">
//         {menu.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname.startsWith(item.path);

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={cn(
//                 "group flex items-center gap-3 px-3 py-3 text-gray-300 rounded-lg transition relative",
//                 "hover:bg-white/10 hover:text-white",
//                 isActive &&
//                   "bg-blue-600/20 text-white border border-blue-500/40",
//                 collapsed && "justify-center"
//               )}
//             >
//               <Icon size={20} />

//               {/* Label Only When Not Collapsed */}
//               {!collapsed && (
//                 <span className="text-sm font-medium truncate">
//                   {item.label}
//                 </span>
//               )}

//               {/* Tooltip on hover when collapsed */}
//               {collapsed && (
//                 <span className="absolute left-16 bg-slate-800 text-white px-2 py-1 text-xs rounded-md opacity-0 translate-x-2 transition-all pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 shadow-md">
//                   {item.label}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default SidebarNavigation;

// import { Link, useLocation } from "react-router-dom";
// import { useState } from "react";
// import {
//   LayoutDashboard,
//   User,
//   CarFront,
//   Lock,
//   Menu, // 👈 Only hamburger icon
// } from "lucide-react";
// import { cn } from "@/lib/utils";

// const SidebarNavigation = () => {
//   const location = useLocation();
//   const [collapsed, setCollapsed] = useState(false);

//   const menu = [
//     { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//     { label: "Profile", path: "/dashboard/profile", icon: User },
//     { label: "My Vehicles", path: "/dashboard/vehicles", icon: CarFront },
//     { label: "Add Vehicle", path: "/dashboard/add-vehicle", icon: CarFront },
//     { label: "Security", path: "/dashboard/security", icon: Lock },
//   ];

//   return (
//     <div
//       className={cn(
//         "h-screen bg-slate-900/70 backdrop-blur-xl border-r border-white/10 flex flex-col py-6 fixed left-0 top-0 transition-all duration-300",
//         collapsed ? "w-20" : "w-64"
//       )}
//     >
//       {/* Hamburger toggle button — moved left */}
//       <button
//         className="ml-3 mb-8 p-2 rounded-lg   transition text-white"
//         onClick={() => setCollapsed(!collapsed)}
//       >
//         <Menu size={20} />
//       </button>

//       <nav className="space-y-1 px-3">
//         {menu.map((item) => {
//           const Icon = item.icon;
//           const isActive = location.pathname.startsWith(item.path);

//           return (
//             <Link
//               key={item.path}
//               to={item.path}
//               className={cn(
//                 "group flex items-center gap-3 px-3 py-3 text-gray-300 rounded-lg transition relative",
//                 "hover:bg-white/10 hover:text-white",
//                 isActive &&
//                   "bg-blue-600/20 text-white border border-blue-500/40",
//                 collapsed && "justify-center"
//               )}
//             >
//               <Icon size={20} />

//               {/* show label only when expanded */}
//               {!collapsed && (
//                 <span className="text-sm font-medium truncate">
//                   {item.label}
//                 </span>
//               )}

//               {/* tooltip in collapsed mode */}
//               {collapsed && (
//                 <span className="absolute left-16 bg-slate-800 text-white px-2 py-1 text-xs rounded-md opacity-0 translate-x-2 transition-all pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 shadow-md">
//                   {item.label}
//                 </span>
//               )}
//             </Link>
//           );
//         })}
//       </nav>
//     </div>
//   );
// };

// export default SidebarNavigation;

// // SidebarNavigation.jsx
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   CarFront,
//   Settings,
//   Heart,
//   User,
//   PlusCircle,
//   FileText,
//   History,
//   ChevronDown,
// } from "lucide-react";
// import { useState } from "react";

// export default function SidebarNavigation() {
//   const [openProperties, setOpenProperties] = useState(false);

//   const menu = [
//     {
//       label: "Dashboard",
//       path: "/dashboard",
//       icon: <LayoutDashboard size={18} />,
//     },
//     {
//       label: "Properties",
//       icon: <CarFront size={18} />,
//       children: [
//         {
//           label: "Add Property",
//           path: "/dashboard/add-property",
//           icon: <PlusCircle size={16} />,
//         },
//         {
//           label: "My Properties",
//           path: "/dashboard/my-properties",
//           icon: <FileText size={16} />,
//         },
//       ],
//     },
//     {
//       label: "Billings",
//       path: "/dashboard/billings",
//       icon: <Settings size={18} />,
//     },
//     {
//       label: "Visit Log",
//       path: "/dashboard/visit-log",
//       icon: <History size={18} />,
//     },
//     {
//       label: "Favorites",
//       path: "/dashboard/favorites",
//       icon: <Heart size={18} />,
//     },
//     {
//       label: "Profile",
//       path: "/dashboard/profile",
//       icon: <User size={18} />,
//     },
//   ];

//   return (
//     <aside className="w-64 min-h-screen bg-white border-r shadow-sm p-5">
//       <h2 className="text-gray-700 text-sm font-semibold mb-6 px-2 uppercase tracking-wide">
//         Navigation
//       </h2>

//       <nav className="space-y-1">
//         {menu.map((item, i) => (
//           <div key={i}>
//             {!item.children ? (
//               <NavLink
//                 to={item.path}
//                 className={({ isActive }) =>
//                   `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
//                   transition ${
//                     isActive
//                       ? "bg-gray-200 text-gray-900"
//                       : "text-gray-600 hover:bg-gray-100"
//                   }`
//                 }
//               >
//                 {item.icon} {item.label}
//               </NavLink>
//             ) : (
//               <>
//                 <button
//                   onClick={() => setOpenProperties(!openProperties)}
//                   className="flex items-center justify-between w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-100 transition"
//                 >
//                   <span className="flex items-center gap-3">
//                     {item.icon} {item.label}
//                   </span>
//                   <ChevronDown
//                     className={`w-4 h-4 transition-transform ${
//                       openProperties ? "rotate-180" : ""
//                     }`}
//                   />
//                 </button>

//                 {openProperties && (
//                   <div className="ml-8 mt-1 space-y-1">
//                     {item.children.map((child, idx) => (
//                       <NavLink
//                         key={idx}
//                         to={child.path}
//                         className={({ isActive }) =>
//                           `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition ${
//                             isActive
//                               ? "bg-gray-200 text-gray-900"
//                               : "text-gray-500 hover:bg-gray-100"
//                           }`
//                         }
//                       >
//                         {child.icon} {child.label}
//                       </NavLink>
//                     ))}
//                   </div>
//                 )}
//               </>
//             )}
//           </div>
//         ))}
//       </nav>
//     </aside>
//   );
// }

// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   CarFront,
//   Settings,
//   Heart,
//   User,
//   PlusCircle,
//   FileText,
//   History,
//   ChevronDown,
//   ArrowLeftCircle,
//   ArrowRightCircle,
// } from "lucide-react";
// import { useState } from "react";

// export default function SidebarNavigation() {
//   const [openProperties, setOpenProperties] = useState(false);
//   const [collapsed, setCollapsed] = useState(false);

//   const menu = [
//     { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//     {
//       label: "Properties",
//       icon: CarFront,
//       children: [
//         {
//           label: "Add Property",
//           path: "/dashboard/add-property",
//           icon: PlusCircle,
//         },
//         {
//           label: "My Properties",
//           path: "/dashboard/my-properties",
//           icon: FileText,
//         },
//       ],
//     },
//     { label: "Billings", path: "/dashboard/billings", icon: Settings },
//     { label: "Visit Log", path: "/dashboard/visit-log", icon: History },
//     { label: "Favorites", path: "/dashboard/favorites", icon: Heart },
//     { label: "Profile", path: "/dashboard/profile", icon: User },
//   ];

//   return (
//     <aside
//       className={`bg-white border-r shadow-sm h-screen transition-all duration-300
//       ${collapsed ? "w-20" : "w-64"} relative`}
//     >
//       {/* Toggle Collapse Button */}
//       <button
//         onClick={() => setCollapsed(!collapsed)}
//         className="absolute -right-3 top-5 w-6 h-6 bg-white rounded-full shadow border flex items-center justify-center"
//       >
//         {collapsed ? (
//           <ArrowRightCircle size={18} />
//         ) : (
//           <ArrowLeftCircle size={18} />
//         )}
//       </button>

//       {!collapsed && (
//         <h2 className="text-gray-700 text-sm font-semibold mt-6 px-5 uppercase tracking-wide">
//           Navigation
//         </h2>
//       )}

//       <nav className="mt-6 space-y-1">
//         {menu.map((item, index) => {
//           const Icon = item.icon;

//           return (
//             <div key={index}>
//               {!item.children ? (
//                 <NavLink
//                   to={item.path}
//                   className={({ isActive }) =>
//                     `flex items-center gap-3 px-4 py-3 rounded-lg mx-2 text-sm transition
//                     ${
//                       isActive
//                         ? "bg-gray-200 text-gray-900"
//                         : "text-gray-600 hover:bg-gray-100"
//                     }
//                     ${collapsed ? "justify-center" : ""}`
//                   }
//                 >
//                   <Icon size={20} />
//                   {!collapsed && item.label}
//                 </NavLink>
//               ) : (
//                 <>
//                   <button
//                     onClick={() =>
//                       !collapsed && setOpenProperties(!openProperties)
//                     }
//                     className={`w-full flex items-center justify-between px-4 py-3 rounded-lg text-sm mx-2
//                       text-gray-600 hover:bg-gray-100 transition
//                       ${collapsed ? "justify-center" : ""}`}
//                   >
//                     <div className="flex items-center gap-3">
//                       <Icon size={20} />
//                       {!collapsed && item.label}
//                     </div>
//                     {!collapsed && (
//                       <ChevronDown
//                         size={18}
//                         className={`transition ${
//                           openProperties ? "rotate-180" : ""
//                         }`}
//                       />
//                     )}
//                   </button>

//                   {/* Submenu */}
//                   {openProperties && !collapsed && (
//                     <div className="ml-10 space-y-1">
//                       {item.children.map((child, childIdx) => {
//                         const SubIcon = child.icon;
//                         return (
//                           <NavLink
//                             key={childIdx}
//                             to={child.path}
//                             className={({ isActive }) =>
//                               `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition
//                                 ${
//                                   isActive
//                                     ? "bg-gray-200 text-gray-900"
//                                     : "text-gray-500 hover:bg-gray-100"
//                                 }`
//                             }
//                           >
//                             <SubIcon size={16} />
//                             {child.label}
//                           </NavLink>
//                         );
//                       })}
//                     </div>
//                   )}
//                 </>
//               )}
//             </div>
//           );
//         })}
//       </nav>
//     </aside>
//   );
// }

// import React from "react";
// import { NavLink } from "react-router-dom";
// import {
//   LayoutDashboard,
//   User,
//   Car,
//   PlusCircle,
//   ShieldCheck,
//   ChevronLeft,
//   ChevronRight,
//   LogOut,
//   CarFront,
// } from "lucide-react";

// const navItems = [
//   { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
//   { name: "Profile", path: "/dashboard/profile", icon: User },
//   { name: "My Vehicles", path: "/dashboard/vehicles", icon: Car },
//   { name: "Add Vehicle", path: "/dashboard/add-vehicle", icon: PlusCircle },
//   { name: "Security", path: "/dashboard/security", icon: ShieldCheck },
// ];

// const SidebarNavigation = ({
//   isCollapsed,
//   setIsCollapsed,
//   isMobile = false,
//   onClose,
// }) => {
//   return (
//     <aside
//       className={`
//         relative h-full flex flex-col bg-white border-r border-slate-200 shadow-sm
//         transition-all duration-300 ease-in-out
//         ${isMobile ? "w-64" : isCollapsed ? "w-20" : "w-64"}
//       `}
//     >
//       {/* Header */}
//       <div className="flex items-center justify-between h-20 px-4 border-b border-slate-100">
//         <div className="flex items-center gap-3 overflow-hidden">
//           <div className="flex items-center justify-center p-2 rounded-xl bg-blue-600 shadow-lg shadow-blue-500/20 shrink-0">
//             <CarFront size={24} className="text-white" />
//           </div>

//           {(!isCollapsed || isMobile) && (
//             <span className="text-xl font-bold text-slate-900 tracking-tight whitespace-nowrap">
//               Jaum<span className="text-blue-500">Rental</span>
//             </span>
//           )}
//         </div>

//         {/* Collapse Toggle (Desktop only) */}
//         {!isMobile && (
//           <button
//             onClick={() => setIsCollapsed(!isCollapsed)}
//             className="absolute -right-3 top-24 p-1 rounded-full bg-white border border-slate-200
//                        text-slate-400 hover:text-slate-600 hover:bg-slate-50
//                        transition-all shadow-md z-50"
//           >
//             {isCollapsed ? (
//               <ChevronRight size={16} />
//             ) : (
//               <ChevronLeft size={16} />
//             )}
//           </button>
//         )}
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto">
//         {navItems.map((item) => (
//           <NavLink
//             key={item.path}
//             to={item.path}
//             onClick={() => isMobile && onClose?.()}
//             className={({ isActive }) => `
//               flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
//               ${
//                 isActive
//                   ? "bg-blue-50 text-blue-600 font-semibold"
//                   : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
//               }
//             `}
//           >
//             {({ isActive }) => (
//               <>
//                 <item.icon
//                   size={22}
//                   className={`shrink-0 transition-colors ${
//                     isActive ? "text-blue-600" : "group-hover:text-slate-700"
//                   }`}
//                 />

//                 {!isCollapsed || isMobile ? (
//                   <span className="whitespace-nowrap transition-opacity duration-300">
//                     {item.name}
//                   </span>
//                 ) : (
//                   <div
//                     className="absolute left-full ml-4 px-2 py-1 bg-slate-900 text-white text-xs rounded
//                                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
//                                   transition-all whitespace-nowrap z-[100]"
//                   >
//                     {item.name}
//                   </div>
//                 )}

//                 {isActive && (
//                   <div className="absolute left-0 w-1 h-6 bg-blue-600 rounded-full" />
//                 )}
//               </>
//             )}
//           </NavLink>
//         ))}
//       </nav>

//       {/* Footer */}
//       <div className="p-4 border-t border-slate-100 mt-auto">
//         <button
//           className={`
//             w-full flex items-center gap-3 px-3 py-3 rounded-xl
//             text-slate-500 hover:bg-red-50 hover:text-red-600
//             transition-all duration-200
//             ${isCollapsed && !isMobile ? "justify-center" : ""}
//           `}
//         >
//           <LogOut size={20} className="shrink-0" />
//           {(!isCollapsed || isMobile) && (
//             <span className="font-medium">Logout</span>
//           )}
//         </button>

//         <div
//           className={`mt-4 flex items-center gap-3 ${
//             isCollapsed && !isMobile ? "justify-center" : "px-3"
//           }`}
//         >
//           <div className="w-10 h-10 rounded-full border-2 border-blue-100 overflow-hidden shrink-0">
//             <img
//               src="https://picsum.photos/seed/user/100/100"
//               alt="User"
//               className="w-full h-full object-cover"
//             />
//           </div>

//           {(!isCollapsed || isMobile) && (
//             <div className="flex flex-col min-w-0">
//               <span className="text-sm font-semibold text-slate-900 truncate">
//                 Alex Johnson
//               </span>
//               <span className="text-xs text-slate-500 truncate">
//                 Pro Member
//               </span>
//             </div>
//           )}
//         </div>
//       </div>
//     </aside>
//   );
// };

// export default SidebarNavigation;

import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  User,
  Car,
  PlusCircle,
  ShieldCheck,
  LogOut,
  Menu,
} from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "Profile", path: "/dashboard/profile", icon: User },
  { name: "My Listings", path: "/dashboard/vehicles", icon: Car },
  { name: "Add Vehicle", path: "/dashboard/add-vehicle", icon: PlusCircle },
  { name: "Security", path: "/dashboard/security", icon: ShieldCheck },
];

const SidebarNavigation = ({
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
        isMobile ? "w-64" : isCollapsed ? "w-20" : "w-64"
      )}
    >
      {/* Header */}
      <div className="h-20 flex items-center justify-between px-4 border-b border-slate-100">
        <NavLink
          to="/"
          className="flex items-center gap-3 overflow-hidden group"
        >
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold shadow group-hover:scale-105 transition">
            J
          </div>

          {!isCollapsed && (
            <span className="text-lg font-bold text-slate-900 whitespace-nowrap group-hover:text-blue-600 transition">
              Jaum
              {/* <span className="text-blue-600">Rental</span> */}
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
        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={() => isMobile && onClose?.()}
              className={({ isActive }) =>
                cn(
                  "group relative flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                  isActive
                    ? "bg-blue-50 text-blue-600 font-semibold"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900",
                  isCollapsed && "justify-center"
                )
              }
            >
              <Icon size={22} className="shrink-0" />

              {!isCollapsed && <span className="truncate">{item.name}</span>}

              {/* Tooltip when collapsed */}
              {isCollapsed && !isMobile && (
                <span className="absolute left-full ml-3 px-2 py-1 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition whitespace-nowrap z-50">
                  {item.name}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="border-t border-slate-100 p-4 space-y-4">
        <button
          onClick={logout}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition",
            isCollapsed && !isMobile && "justify-center"
          )}
        >
          <LogOut size={20} />
          {!isCollapsed && <span className="font-medium">Logout</span>}
        </button>

        <div
          className={cn(
            "flex items-center gap-3",
            isCollapsed && !isMobile ? "justify-center" : ""
          )}
        >
          <img
            src="https://picsum.photos/seed/user/100/100"
            alt="User"
            className="w-9 h-9 rounded-full border border-slate-200"
          />

          {!isCollapsed && (
            <div className="min-w-0">
              <p className="text-sm font-semibold truncate">Alex Johnson</p>
              <p className="text-xs text-slate-500 truncate">Premium</p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default SidebarNavigation;
