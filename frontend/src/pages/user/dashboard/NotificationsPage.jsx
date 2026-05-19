// import { useState, useEffect } from "react";
// import {
//   Bell,
//   Check,
//   Trash2,
//   CheckCircle2,
//   CreditCard,
//   CalendarCheck,
//   Info,
// } from "lucide-react";
// import api from "../../../utils/api";
// import { formatDistanceToNow } from "date-fns";
// import { useNavigate } from "react-router-dom";

// const NotificationsPage = () => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   const fetchNotifications = async () => {
//     try {
//       const res = await api.get("/notifications");
//       setNotifications(res.data);
//     } catch (err) {
//       console.error("Failed to fetch notifications", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, []);

//   const markAsRead = async (id) => {
//     try {
//       await api.patch(`/notifications/${id}/read`);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
//       );
//     } catch (err) {
//       console.error("Failed to mark as read");
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await api.patch("/notifications/read-all");
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//     } catch (err) {
//       console.error("Failed to mark all as read");
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       await api.delete(`/notifications/${id}`);
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//     } catch (err) {
//       console.error("Failed to delete notification");
//     }
//   };

//   const getIcon = (type, isRead) => {
//     const iconClass = isRead ? "text-gray-500" : "text-blue-600";
//     if (type?.includes("payment"))
//       return <CreditCard size={18} className={iconClass} />;
//     if (type?.includes("booking"))
//       return <CalendarCheck size={18} className={iconClass} />;
//     if (type?.includes("system"))
//       return <Info size={18} className={iconClass} />;
//     return <Bell size={18} className={iconClass} />;
//   };

//   return (
//     <div className="p-6 max-w-4xl mx-auto min-h-screen">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
//         <div>
//           <h1 className="text-3xl font-black text-gray-900 uppercase tracking-wider">
//             Notifications
//           </h1>
//           <p className="text-gray-500 mt-1">
//             Stay updated with your latest activity
//           </p>
//         </div>

//         {notifications.length > 0 && (
//           <button
//             onClick={markAllAsRead}
//             className="flex items-center gap-2 bg-white hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-xl transition-all active:scale-95 border border-gray-200 shadow-sm"
//           >
//             <CheckCircle2 size={18} />
//             <span className="text-sm font-semibold">Mark all as read</span>
//           </button>
//         )}
//       </div>

//       <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
//         {loading ? (
//           <div className="p-12 text-center text-gray-500">
//             Loading notifications...
//           </div>
//         ) : notifications.length === 0 ? (
//           <div className="p-20 text-center flex flex-col items-center justify-center text-gray-500">
//             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
//               <Bell size={32} className="text-gray-400" />
//             </div>
//             <h3 className="text-xl font-semibold text-gray-900">
//               You're all caught up!
//             </h3>
//             <p className="text-sm mt-2 max-w-xs mx-auto text-gray-500">
//               When you get notifications for bookings or payments, they'll show
//               up here.
//             </p>
//           </div>
//         ) : (
//           <div className="divide-y divide-gray-100">
//             {notifications.map((n) => (
//               <div
//                 key={n._id}
//                 className={`p-6 flex items-start gap-4 transition-all relative group ${
//                   !n.isRead ? "bg-blue-50/30" : "hover:bg-gray-50"
//                 }`}
//               >
//                 {!n.isRead && (
//                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
//                 )}

//                 <div className="mt-1 flex-shrink-0 relative">
//                   {!n.isRead ? (
//                     <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center border border-blue-200 shadow-[inset_0_0_10px_rgba(59,130,246,0.1)]">
//                       {getIcon(n.type, n.isRead)}
//                     </div>
//                   ) : (
//                     <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
//                       {getIcon(n.type, n.isRead)}
//                     </div>
//                   )}
//                   {!n.isRead && (
//                     <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 border-2 border-white rounded-full"></div>
//                   )}
//                 </div>

//                 <div className="flex-1 min-w-0">
//                   <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
//                     <div>
//                       <h4
//                         className={`text-base font-semibold ${!n.isRead ? "text-gray-900" : "text-gray-700"}`}
//                       >
//                         {n.title}
//                       </h4>
//                       <p
//                         className={`text-sm mt-1 leading-relaxed ${!n.isRead ? "text-gray-600 font-medium" : "text-gray-500"}`}
//                       >
//                         {n.message}
//                       </p>
//                     </div>
//                     <span className="text-xs text-gray-500 whitespace-nowrap font-medium bg-gray-100 px-3 py-1 rounded-full border border-gray-200 self-start">
//                       {formatDistanceToNow(new Date(n.createdAt), {
//                         addSuffix: true,
//                       })}
//                     </span>
//                   </div>

//                   <div className="mt-4 flex flex-wrap items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
//                     {!n.isRead && (
//                       <button
//                         onClick={() => markAsRead(n._id)}
//                         className="text-xs text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
//                       >
//                         <Check size={14} /> Mark as read
//                       </button>
//                     )}
//                     {n.link && (
//                       <button
//                         onClick={() => navigate(n.link)}
//                         className="text-xs text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
//                       >
//                         View Details
//                       </button>
//                     )}
//                     <button
//                       onClick={() => deleteNotification(n._id)}
//                       className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1.5 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors ml-auto border border-red-100"
//                     >
//                       <Trash2 size={14} /> Delete
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default NotificationsPage;

import { useState, useEffect } from "react";
import {
  Bell,
  Check,
  Trash2,
  CheckCircle2,
  CreditCard,
  CalendarCheck,
  Info,
  XCircle,
  RotateCcw,
} from "lucide-react";
import api from "../../../utils/api";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to delete notification");
    }
  };

  const getIconInfo = (type, isRead) => {
    if (type?.includes("payment"))
      return {
        icon: <CreditCard size={18} />,
        color: isRead ? "text-gray-500" : "text-emerald-600",
        bg: "bg-emerald-100",
        border: "border-emerald-200",
      };
    if (type?.includes("refund"))
      return {
        icon: <RotateCcw size={18} />,
        color: isRead ? "text-gray-500" : "text-orange-500",
        bg: "bg-orange-100",
        border: "border-orange-200",
      };
    if (type?.includes("reject") || type?.includes("cancel"))
      return {
        icon: <XCircle size={18} />,
        color: isRead ? "text-gray-500" : "text-red-600",
        bg: "bg-red-100",
        border: "border-red-200",
      };
    if (type?.includes("booking") || type?.includes("approved"))
      return {
        icon: <CalendarCheck size={18} />,
        color: isRead ? "text-gray-500" : "text-blue-600",
        bg: "bg-blue-100",
        border: "border-blue-200",
      };

    return {
      icon: <Bell size={18} />,
      color: isRead ? "text-gray-500" : "text-blue-600",
      bg: "bg-blue-100",
      border: "border-blue-200",
    };
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Notifications
          </h1>
          <p className="text-gray-500 mt-1 text-sm sm:text-base">
            Stay updated with your latest activity
          </p>
        </div>

        {notifications.length > 0 && (
          <button
            onClick={markAllAsRead}
            className="flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl transition-all active:scale-95 shadow-md"
          >
            <CheckCircle2 size={18} />
            <span className="text-sm font-semibold">Mark all as read</span>
          </button>
        )}
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
            <Bell size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Total
            </p>
            <h3 className="text-2xl font-bold text-gray-900">
              {notifications.length}
            </h3>
          </div>
        </div>
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center gap-4 transition-all hover:shadow-md">
          <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <p className="text-xs text-gray-500 font-medium uppercase tracking-wider">
              Unread
            </p>
            <h3 className="text-2xl font-bold text-gray-900">{unreadCount}</h3>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
        {loading ? (
          <div className="p-12 text-center text-gray-500">
            Loading notifications...
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-20 text-center flex flex-col items-center justify-center text-gray-500">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-gray-100">
              <Bell size={32} className="text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900">
              You're all caught up!
            </h3>
            <p className="text-sm mt-2 max-w-xs mx-auto text-gray-500">
              When you get notifications for bookings or payments, they'll show
              up here.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {notifications.map((n) => (
              <div
                key={n._id}
                className={`p-6 flex items-start gap-4 transition-all relative group ${
                  !n.isRead ? "bg-blue-50/30" : "hover:bg-gray-50"
                }`}
              >
                {!n.isRead && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500" />
                )}

                <div className="mt-1 flex-shrink-0 relative">
                  {!n.isRead ? (
                    <div
                      className={`w-10 h-10 rounded-full ${getIconInfo(n.type, n.isRead).bg} flex items-center justify-center border ${getIconInfo(n.type, n.isRead).border} shadow-sm`}
                    >
                      <span className={getIconInfo(n.type, n.isRead).color}>
                        {getIconInfo(n.type, n.isRead).icon}
                      </span>
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center border border-gray-200">
                      <span className={getIconInfo(n.type, n.isRead).color}>
                        {getIconInfo(n.type, n.isRead).icon}
                      </span>
                    </div>
                  )}
                  {!n.isRead && (
                    <div className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-blue-500 border-2 border-white rounded-full"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4">
                    <div>
                      <h4
                        className={`text-base font-semibold ${!n.isRead ? "text-gray-900" : "text-gray-700"}`}
                      >
                        {n.title}
                      </h4>
                      <p
                        className={`text-sm mt-1 leading-relaxed ${!n.isRead ? "text-gray-600 font-medium" : "text-gray-500"}`}
                      >
                        {n.message}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap font-medium bg-gray-100 px-3 py-1 rounded-full border border-gray-200 self-start">
                      {formatDistanceToNow(new Date(n.createdAt), {
                        addSuffix: true,
                      })}
                    </span>
                  </div>

                  <div className="mt-4 flex flex-wrap items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    {!n.isRead && (
                      <button
                        onClick={() => markAsRead(n._id)}
                        className="text-xs text-blue-700 hover:text-blue-800 font-medium flex items-center gap-1.5 bg-blue-50 hover:bg-blue-100 px-3 py-1.5 rounded-lg transition-colors border border-blue-100"
                      >
                        <Check size={14} /> Mark as read
                      </button>
                    )}
                    {/* {n.link && (
                      <button
                        onClick={() => navigate(n.link)}
                        className="text-xs text-gray-700 hover:text-gray-900 font-medium flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors shadow-sm"
                      >
                        View Details
                      </button>
                    )} */}
                    <button
                      onClick={() => deleteNotification(n._id)}
                      className="text-xs text-red-600 hover:text-red-700 font-medium flex items-center gap-1.5 bg-red-50 hover:bg-red-100 px-3 py-1.5 rounded-lg transition-colors ml-auto border border-red-100"
                    >
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationsPage;
