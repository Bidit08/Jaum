// import { useState, useEffect } from "react";
// import { Bell, Check, Trash2, X, Circle } from "lucide-react";
// import api from "../utils/api";
// import { formatDistanceToNow } from "date-fns";
// import { useNavigate } from "react-router-dom";

// const NotificationPanel = ({ isOpen, onClose, onUpdate }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchNotifications = async () => {
//     if (!isOpen) return;
//     setLoading(true);
//     try {
//       const res = await api.get("/notifications");
//       setNotifications(res.data);
//     } catch (err) {
//       console.error("Failed to fetch notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, [isOpen]);

//   const markAsRead = async (id) => {
//     try {
//       await api.patch(`/notifications/${id}/read`);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
//       );
//       if (onUpdate) onUpdate();
//     } catch (err) {
//       console.error("Failed to mark as read");
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await api.patch("/notifications/read-all");
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//       if (onUpdate) onUpdate();
//     } catch (err) {
//       console.error("Failed to mark all as read");
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       await api.delete(`/notifications/${id}`);
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//       if (onUpdate) onUpdate();
//     } catch (err) {
//       console.error("Failed to delete notification");
//     }
//   };

//   const handleNotificationClick = (n) => {
//     if (!n.isRead) markAsRead(n._id);
//     if (n.link) {
//       navigate(n.link);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
//       {/* Header */}
//       <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
//         <div className="flex items-center gap-2">
//           <Bell size={18} className="text-cyan-400" />
//           <h3 className="font-bold text-white text-sm uppercase tracking-wider">
//             Notifications
//           </h3>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={markAllAsRead}
//             title="Mark all as read"
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <Check size={16} />
//           </button>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       </div>

//       {/* List */}
//       <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
//         {loading ? (
//           <div className="p-8 text-center text-gray-500 text-sm">
//             Loading...
//           </div>
//         ) : notifications.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             <Bell size={40} className="mx-auto mb-3 opacity-20" />
//             <p className="text-sm">No notifications yet</p>
//           </div>
//         ) : (
//           <div className="divide-y divide-white/5">
//             {notifications.map((n) => (
//               <div
//                 key={n._id}
//                 className={`p-4 flex gap-3 group hover:bg-white/5 transition-colors cursor-pointer ${
//                   !n.isRead ? "bg-cyan-500/5" : ""
//                 }`}
//                 onClick={() => handleNotificationClick(n)}
//               >
//                 <div className="mt-1">
//                   {!n.isRead ? (
//                     <Circle size={8} className="fill-cyan-400 text-cyan-400" />
//                   ) : (
//                     <div className="w-2 h-2" />
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start gap-2">
//                     <p
//                       className={`text-sm font-semibold truncate ${!n.isRead ? "text-white" : "text-gray-400"}`}
//                     >
//                       {n.title}
//                     </p>
//                     <span className="text-[10px] text-gray-500 whitespace-nowrap mt-1">
//                       {formatDistanceToNow(new Date(n.createdAt), {
//                         addSuffix: true,
//                       })}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-400 line-clamp-2 mt-0.5 leading-relaxed">
//                     {n.message}
//                   </p>
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteNotification(n._id);
//                   }}
//                   className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-all active:scale-90"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       {notifications.length > 0 && (
//         <div className="p-3 bg-white/5 border-t border-white/10 text-center">
//           <button
//             onClick={() => {
//               navigate("/dashboard/notifications");
//               onClose();
//             }}
//             className="text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-cyan-300 transition-colors"
//           >
//             View All Notifications
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationPanel;

// import { useState, useEffect } from "react";
// import { Bell, Check, Trash2, X, Circle } from "lucide-react";
// import api from "../utils/api";
// import { formatDistanceToNow } from "date-fns";
// import { useNavigate } from "react-router-dom";

// const NotificationPanel = ({ isOpen, onClose, onUpdate }) => {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const fetchNotifications = async () => {
//     if (!isOpen) return;
//     setLoading(true);
//     try {
//       const res = await api.get("/notifications");
//       setNotifications(res.data);
//     } catch (err) {
//       console.error("Failed to fetch notifications");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchNotifications();
//   }, [isOpen]);

//   const markAsRead = async (id) => {
//     try {
//       await api.patch(`/notifications/${id}/read`);
//       setNotifications((prev) =>
//         prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
//       );
//       if (onUpdate) onUpdate();
//     } catch (err) {
//       console.error("Failed to mark as read");
//     }
//   };

//   const markAllAsRead = async () => {
//     try {
//       await api.patch("/notifications/read-all");
//       setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
//       if (onUpdate) onUpdate();
//     } catch (err) {
//       console.error("Failed to mark all as read");
//     }
//   };

//   const deleteNotification = async (id) => {
//     try {
//       await api.delete(`/notifications/${id}`);
//       setNotifications((prev) => prev.filter((n) => n._id !== id));
//       if (onUpdate) onUpdate();
//     } catch (err) {
//       console.error("Failed to delete notification");
//     }
//   };

//   const handleNotificationClick = (n) => {
//     if (!n.isRead) markAsRead(n._id);
//     if (n.link) {
//       navigate(n.link);
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-slate-900/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-5 duration-200">
//       {/* Header */}
//       <div className="p-4 border-b border-white/10 flex justify-between items-center bg-white/5">
//         <div className="flex items-center gap-2">
//           <Bell size={18} className="text-cyan-400" />
//           <h3 className="font-bold text-white text-sm uppercase tracking-wider">
//             Notifications
//           </h3>
//         </div>
//         <div className="flex items-center gap-3">
//           <button
//             onClick={markAllAsRead}
//             title="Mark all as read"
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <Check size={16} />
//           </button>
//           <button
//             onClick={onClose}
//             className="text-gray-400 hover:text-white transition-colors"
//           >
//             <X size={18} />
//           </button>
//         </div>
//       </div>

//       {/* List */}
//       <div className="max-h-[400px] overflow-y-auto scrollbar-hide">
//         {loading ? (
//           <div className="p-8 text-center text-gray-500 text-sm">
//             Loading...
//           </div>
//         ) : notifications.length === 0 ? (
//           <div className="p-12 text-center text-gray-500">
//             <Bell size={40} className="mx-auto mb-3 opacity-20" />
//             <p className="text-sm">No notifications yet</p>
//           </div>
//         ) : (
//           <div className="flex flex-col">
//             {notifications.map((n) => (
//               <div
//                 key={n._id}
//                 className={`relative p-3 flex gap-3 group hover:bg-white/5 hover:translate-x-1 transition-all duration-300 cursor-pointer border-b border-white/5 last:border-0 ${
//                   !n.isRead
//                     ? "bg-gradient-to-r from-cyan-500/10 to-transparent"
//                     : ""
//                 }`}
//                 onClick={() => handleNotificationClick(n)}
//               >
//                 {!n.isRead && (
//                   <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan-400" />
//                 )}
//                 <div className="mt-1">
//                   {!n.isRead ? (
//                     <Circle size={8} className="fill-cyan-400 text-cyan-400" />
//                   ) : (
//                     <div className="w-2 h-2" />
//                   )}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex justify-between items-start gap-2">
//                     <p
//                       className={`text-[13px] font-medium truncate ${!n.isRead ? "text-white" : "text-gray-400"}`}
//                     >
//                       {n.title}
//                     </p>
//                     <span className="text-[10px] text-gray-500 whitespace-nowrap mt-0.5">
//                       {formatDistanceToNow(new Date(n.createdAt), {
//                         addSuffix: true,
//                       })}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-400 line-clamp-2 mt-0.5 leading-relaxed">
//                     {n.message}
//                   </p>
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     deleteNotification(n._id);
//                   }}
//                   className="opacity-0 group-hover:opacity-100 p-1 text-gray-500 hover:text-red-400 transition-all active:scale-90"
//                 >
//                   <Trash2 size={14} />
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}
//       </div>

//       {/* Footer */}
//       {notifications.length > 0 && (
//         <div className="p-2.5 border-t border-white/5 text-center bg-white/[0.02]">
//           <button
//             onClick={() => {
//               navigate("/dashboard/notifications");
//               onClose();
//             }}
//             className="text-xs text-gray-400 hover:text-white transition-colors"
//           >
//             View all notifications
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default NotificationPanel;

import { useState, useEffect } from "react";
import { Bell, Check, Trash2, X, Circle } from "lucide-react";
import api from "../utils/api";
import { formatDistanceToNow } from "date-fns";
import { useNavigate } from "react-router-dom";

const NotificationPanel = ({ isOpen, onClose, onUpdate }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchNotifications = async () => {
    if (!isOpen) return;
    setLoading(true);
    try {
      const res = await api.get("/notifications");
      setNotifications(res.data);
    } catch (err) {
      console.error("Failed to fetch notifications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [isOpen]);

  const markAsRead = async (id) => {
    try {
      await api.patch(`/notifications/${id}/read`);
      setNotifications((prev) =>
        prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Failed to mark as read");
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.patch("/notifications/read-all");
      setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Failed to mark all as read");
    }
  };

  const deleteNotification = async (id) => {
    try {
      await api.delete(`/notifications/${id}`);
      setNotifications((prev) => prev.filter((n) => n._id !== id));
      if (onUpdate) onUpdate();
    } catch (err) {
      console.error("Failed to delete notification");
    }
  };

  const handleNotificationClick = (n) => {
    if (!n.isRead) markAsRead(n._id);
    // if (n.link) {
    //   navigate(n.link);
    //   onClose();
    // }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute right-0 mt-3 w-[340px] sm:w-[380px] bg-slate-950/80 backdrop-blur-2xl border border-white/10 rounded-[1.35rem] shadow-[0_24px_80px_rgba(0,0,0,0.45)] z-50 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
      {/* Header */}
      <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/[0.04]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center">
            <Bell size={16} className="text-cyan-300" />
          </div>
          <div>
            <h3 className="font-semibold text-white text-[13px] uppercase tracking-[0.14em]">
              Notifications
            </h3>
            <p className="text-[10px] text-slate-400 mt-0.5">
              Recent activity on Jaum
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={markAllAsRead}
            title="Mark all as read"
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <Check size={16} />
          </button>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200"
          >
            <X size={17} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="relative">
        <div className="max-h-[315px] overflow-y-auto overflow-x-hidden scrollbar-hide">
          {loading ? (
            <div className="px-5 py-10 text-center text-slate-400 text-sm">
              <div className="mx-auto mb-3 h-8 w-8 rounded-full border-2 border-cyan-400/30 border-t-cyan-300 animate-spin" />
              Loading notifications...
            </div>
          ) : notifications.length === 0 ? (
            <div className="px-6 py-12 text-center text-slate-400">
              <div className="mx-auto mb-4 w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 flex items-center justify-center">
                <Bell size={26} className="opacity-50" />
              </div>
              <p className="text-sm font-medium text-slate-300">
                No notifications yet
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Booking and payment updates will appear here.
              </p>
            </div>
          ) : (
            <div className="flex flex-col">
              {notifications.map((n) => (
                <div
                  key={n._id}
                  className={`relative px-4 py-3 flex gap-3 group cursor-pointer border-b border-white/[0.06] last:border-0 transition-all duration-300 hover:bg-white/[0.055] hover:translate-x-0.5 ${
                    !n.isRead
                      ? "bg-gradient-to-r from-cyan-400/[0.13] via-cyan-400/[0.055] to-transparent"
                      : ""
                  }`}
                  onClick={() => handleNotificationClick(n)}
                >
                  {!n.isRead && (
                    <div className="absolute left-0 top-3 bottom-3 w-[2px] rounded-full bg-cyan-300 shadow-[0_0_14px_rgba(34,211,238,0.65)]" />
                  )}

                  <div className="pt-1.5 shrink-0">
                    {!n.isRead ? (
                      <Circle
                        size={8}
                        className="fill-cyan-300 text-cyan-300"
                      />
                    ) : (
                      <div className="w-2 h-2 rounded-full bg-white/10" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0 pr-1">
                    <div className="flex justify-between items-start gap-3">
                      <p
                        className={`text-[13px] leading-5 font-semibold truncate ${
                          !n.isRead ? "text-white" : "text-slate-400"
                        }`}
                      >
                        {n.title}
                      </p>
                      <span className="text-[10px] text-slate-500 whitespace-nowrap mt-0.5">
                        {formatDistanceToNow(new Date(n.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <p className="text-[12px] text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                      {n.message}
                    </p>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteNotification(n._id);
                    }}
                    title="Delete notification"
                    className="opacity-0 group-hover:opacity-100 shrink-0 mt-1 w-7 h-7 rounded-full flex items-center justify-center text-slate-500 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 active:scale-95"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {notifications.length > 3 && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950/90 to-transparent" />
        )}
      </div>

      {/* Footer */}
      {notifications.length > 0 && (
        <div className="px-4 py-3 border-t border-white/[0.07] text-center bg-white/[0.025]">
          <button
            onClick={() => {
              navigate("/dashboard/notifications");
              onClose();
            }}
            className="text-[12px] font-medium text-slate-400 hover:text-cyan-300 transition-colors"
          >
            View all notifications
          </button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;
