// import { useEffect, useState } from "react";
// import api from "@/utils/api";
// import { toast } from "react-toastify";

// const IncomingVisits = () => {
//   const [visits, setVisits] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const fetchVisits = async () => {
//     const res = await api.get("/visits/incoming");
//     setVisits(res.data);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchVisits();
//   }, []);

//   const updateStatus = async (id, status) => {
//     try {
//       await api.patch(`/visits/${id}/status`, { status });
//       toast.success("Visit updated");
//       fetchVisits();
//     } catch {
//       toast.error("Failed to update visit");
//     }
//   };

//   if (loading) return <p>Loading incoming visits...</p>;
//   if (!visits.length)
//     return <p className="text-slate-500">No incoming visit requests.</p>;

//   return (
//     <div className="space-y-6">
//       <h1 className="text-2xl font-bold">Incoming Visit Requests</h1>

//       {visits.map((v) => (
//         <div
//           key={v._id}
//           className="bg-white rounded-2xl border p-5 shadow flex justify-between"
//         >
//           <div>
//             <p className="font-bold">{v.vehicleId?.name}</p>
//             <p className="text-sm text-slate-500">
//               From: {v.userId?.name} ({v.userId?.email})
//             </p>
//             <p className="text-sm">{new Date(v.visitDate).toLocaleString()}</p>
//             <p className="text-xs text-slate-400">{v.note}</p>
//           </div>

//           <div className="flex gap-2">
//             <button
//               onClick={() => updateStatus(v._id, "APPROVED")}
//               className="px-4 py-2 bg-emerald-600 text-white rounded-lg"
//             >
//               Approve
//             </button>
//             <button
//               onClick={() => updateStatus(v._id, "REJECTED")}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg"
//             >
//               Reject
//             </button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default IncomingVisits;

import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  User,
  MessageSquare,
  Check,
  X,
  RefreshCw,
  CheckCircle,
  Info,
  Send,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const IncomingVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [rescheduleData, setRescheduleData] = useState({
    id: null,
    dateTime: null,
    note: "",
  });

  const fetchIncomingVisits = async () => {
    try {
      const res = await api.get("/visits/incoming");
      setVisits(res.data);
    } catch (err) {
      toast.error("Failed to fetch incoming visits");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncomingVisits();
  }, []);

  const handleUpdateStatus = async (
    id,
    status,
    ownerNote = "",
    visitDate = null,
  ) => {
    setUpdatingId(id);
    try {
      const payload = { status, ownerNote };
      if (visitDate) payload.visitDate = visitDate;

      await api.patch(`/visits/${id}/status`, payload);
      toast.success(`Visit ${status.toLowerCase()} successfully`);
      fetchIncomingVisits();
      setRescheduleData({ id: null, dateTime: null, note: "" });
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to update visit status",
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "REQUESTED":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "APPROVED":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "REJECTED":
        return "bg-rose-100 text-rose-700 border-rose-200";
      case "RESCHEDULED":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "COMPLETED":
        return "bg-slate-100 text-slate-700 border-slate-200";
      case "CANCELLED":
        return "bg-slate-100 text-slate-500 border-slate-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-3xl font-bold text-slate-900">
          Incoming Visit Requests
        </h1>
        <p className="text-slate-500 mt-2">
          Manage appointments from potential renters wanting to inspect your
          vehicles.
        </p>
      </div>

      {visits.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Calendar size={32} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">
            No incoming requests
          </h3>
          <p className="text-slate-500 mt-2">
            Requests for your vehicle inspections will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {visits.map((visit) => (
            <div
              key={visit._id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-visible"
            >
              <div className="flex flex-col md:flex-row">
                {/* Vehicle Thumbnail */}
                <div className="md:w-40 h-40 md:h-auto shrink-0">
                  <img
                    src={
                      visit.vehicleId?.photos?.[0]
                        ? `https://jaum-t3no.onrender.com${visit.vehicleId.photos[0]}`
                        : "/placeholder-car.jpg"
                    }
                    alt={visit.vehicleId?.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-50 rounded-xl">
                        <User className="text-blue-600" size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {visit.userId?.name}
                        </h3>
                        <p className="text-xs text-slate-500">
                          wants to visit{" "}
                          <span className="text-blue-600 font-semibold">
                            {visit.vehicleId?.name}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(visit.status)}`}
                    >
                      {visit.status}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-6 text-sm">
                    <div className="flex items-center gap-2 text-slate-600">
                      <Calendar size={16} className="text-blue-500" />
                      <span className="font-semibold">
                        {new Date(visit.visitDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-600">
                      <Clock size={16} className="text-blue-500" />
                      <span className="font-semibold">
                        {new Date(visit.visitDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-4 flex gap-3 text-sm">
                    <MessageSquare
                      size={18}
                      className="text-slate-400 shrink-0 mt-0.5"
                    />
                    <p className="text-slate-600">
                      "{visit.note || "No message from user."}"
                    </p>
                  </div>

                  {/* Actions */}
                  {visit.status === "REQUESTED" &&
                    rescheduleData.id !== visit._id && (
                      <div className="flex flex-wrap gap-3 pt-2">
                        <button
                          onClick={() =>
                            handleUpdateStatus(visit._id, "APPROVED")
                          }
                          className="flex-1 min-w-[120px] py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <Check size={18} /> Approve
                        </button>
                        <button
                          onClick={() =>
                            setRescheduleData({
                              id: visit._id,
                              dateTime: new Date(visit.visitDate),
                              note: "",
                            })
                          }
                          className="flex-1 min-w-[120px] py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <RefreshCw size={18} /> Reschedule
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStatus(visit._id, "REJECTED")
                          }
                          className="flex-1 min-w-[120px] py-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all"
                        >
                          <X size={18} /> Reject
                        </button>
                      </div>
                    )}

                  {/* Reschedule UI */}
                  {rescheduleData.id === visit._id && (
                    <div className="pt-4 border-t border-slate-100 mt-2 space-y-4 animate-in slide-in-from-top-2 duration-300">
                      <h4 className="font-bold text-slate-900 flex items-center gap-2">
                        <RefreshCw size={18} className="text-amber-500" />{" "}
                        Reschedule Visit
                      </h4>
                      <div className="relative">
                        <DatePicker
                          selected={rescheduleData.dateTime}
                          onChange={(date) =>
                            setRescheduleData({
                              ...rescheduleData,
                              dateTime: date,
                            })
                          }
                          showTimeSelect
                          dateFormat="MMMM d, yyyy h:mm aa"
                          minDate={new Date()}
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500"
                          placeholderText="Select new date and time"
                        />
                      </div>
                      <textarea
                        placeholder="Add a reason for rescheduling..."
                        value={rescheduleData.note}
                        onChange={(e) =>
                          setRescheduleData({
                            ...rescheduleData,
                            note: e.target.value,
                          })
                        }
                        className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 h-20 resize-none"
                      />
                      <div className="flex gap-3">
                        <button
                          onClick={() => {
                            if (
                              !rescheduleData.dateTime ||
                              !rescheduleData.note
                            ) {
                              toast.warn(
                                "Please provide a new date/time and a reason",
                              );
                              return;
                            }
                            handleUpdateStatus(
                              visit._id,
                              "RESCHEDULED",
                              rescheduleData.note,
                              rescheduleData.dateTime,
                            );
                          }}
                          className="flex-1 py-3 bg-amber-600 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                        >
                          <Send size={16} /> Update & Reschedule
                        </button>
                        <button
                          onClick={() =>
                            setRescheduleData({
                              id: null,
                              dateTime: null,
                              note: "",
                            })
                          }
                          className="px-6 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {visit.status === "APPROVED" && (
                    <button
                      onClick={() => handleUpdateStatus(visit._id, "COMPLETED")}
                      className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-md"
                    >
                      <CheckCircle size={18} /> Mark as Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default IncomingVisits;
