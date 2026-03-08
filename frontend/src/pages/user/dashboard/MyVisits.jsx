import React, { useEffect, useState } from "react";
import {
  Calendar,
  Clock,
  MapPin,
  Tag,
  MessageSquare,
  User,
  Info,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import api from "../../../utils/api";

const MyVisits = () => {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchVisits = async () => {
    try {
      const res = await api.get("/visits/my");
      setVisits(res.data);
    } catch (err) {
      toast.error("Failed to fetch visit requests");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVisits();
  }, []);

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
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">My Visit Requests</h1>
        <p className="text-slate-500 mt-2">
          Track the status of your vehicle inspection and test drive
          appointments.
        </p>
      </div>

      {visits.length === 0 ? (
        <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-12 text-center">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-400">
            <Calendar size={32} />
          </div>
          <h3 className="text-xl font-semibold text-slate-900">
            No visit requests yet
          </h3>
          <p className="text-slate-500 mt-2">
            When you request a visit for a vehicle, it will appear here.
          </p>
        </div>
      ) : (
        <div className="grid gap-6">
          {visits.map((visit) => (
            <div
              key={visit._id}
              className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col md:flex-row">
                {/* Vehicle Image */}
                <div className="md:w-48 h-48 md:h-auto shrink-0 relative">
                  <img
                    src={
                      visit.vehicleId?.photos?.[0]
                        ? `http://localhost:5000${visit.vehicleId.photos[0]}`
                        : "/placeholder-car.jpg"
                    }
                    alt={visit.vehicleId?.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold border backdrop-blur-md ${getStatusColor(visit.status)}`}
                  >
                    {visit.status}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 p-6 space-y-4">
                  <div className="flex flex-wrap items-start justify-between gap-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900">
                        {visit.vehicleId?.name}
                      </h3>
                      <p className="text-slate-500 text-sm flex items-center gap-1 mt-1">
                        <MapPin size={14} /> {visit.vehicleId?.location}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">
                        Requested For
                      </p>
                      <p className="text-lg font-bold text-blue-600 flex items-center gap-2 justify-end">
                        <Calendar size={18} />{" "}
                        {new Date(visit.visitDate).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-slate-600 flex items-center gap-2 justify-end">
                        <Clock size={16} />{" "}
                        {new Date(visit.visitDate).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                        <User size={14} /> Owner Details
                      </p>
                      <p className="text-sm font-medium text-slate-700">
                        {visit.ownerId?.name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {visit.ownerId?.email}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-xs font-bold text-slate-400 uppercase flex items-center gap-1">
                        <MessageSquare size={14} /> Your Note
                      </p>
                      <p className="text-sm text-slate-600 italic">
                        "{visit.note || "No note added"}"
                      </p>
                    </div>
                  </div>

                  {visit.ownerNote && (
                    <div className="bg-amber-50 border border-amber-100 rounded-2xl p-4 flex gap-3">
                      <AlertCircle
                        className="text-amber-500 shrink-0"
                        size={18}
                      />
                      <div className="text-sm">
                        <p className="font-bold text-amber-800">
                          Owner's response:
                        </p>
                        <p className="text-amber-700 mt-0.5">
                          {visit.ownerNote}
                        </p>
                      </div>
                    </div>
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

export default MyVisits;
