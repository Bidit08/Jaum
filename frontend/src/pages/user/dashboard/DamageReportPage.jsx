import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ChevronLeft,
  AlertCircle,
  CheckCircle,
  Info,
  Camera,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  BarChart3,
  Clock,
} from "lucide-react";
import api from "../../../utils/api";
import { toast } from "react-toastify";
import DamageReportUpload from "../../../components/DamageReportUpload";

const DamageReportPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);
  const [damageStatus, setDamageStatus] = useState("none");
  const [ownerNotes, setOwnerNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get(`/damage/${bookingId}`);
      setData(res.data);
      if (res.data.report) {
        setDamageStatus(res.data.report.damageStatus || "none");
        setOwnerNotes(res.data.report.ownerNotes || "");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      toast.error("Failed to load damage report");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [bookingId]);

  const handleSubmitReview = async () => {
    setSubmitting(true);
    try {
      const res = await api.patch(`/damage/${bookingId}/review`, {
        damageStatus,
        ownerNotes,
      });
      toast.success(res.data.message);
      fetchData(); // Refresh data
    } catch (err) {
      console.error("Review error:", err);
      toast.error(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const GET_IMAGE_URL = (path) => {
    if (!path) return "/placeholder-car.jpg";
    if (path.startsWith("http")) return path;
    const normalizedPath = path.replace(/\\/g, "/");
    return `https://jaum-t3no.onrender.com${normalizedPath.startsWith("/") ? "" : "/"}${normalizedPath}`;
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!data)
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <AlertCircle size={48} className="text-slate-300" />
        <p className="text-slate-500 font-medium">
          Damage report not found or booking is invalid.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="px-6 py-2 bg-slate-100 rounded-xl font-bold text-slate-700"
        >
          Go Back
        </button>
      </div>
    );

  const { report, booking, isOwner, isRenter, isAdmin } = data;
  const isResolved = report?.reportStatus === "resolved";

  return (
    <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-500 hover:text-slate-900 shadow-sm transition"
          >
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">
              Damage Assessment
            </h1>
            <p className="text-slate-500 text-sm">
              Booking ID: <span className="font-mono text-xs">{bookingId}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            {isAdmin && (
              <span className="px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 shadow-sm">
                Administrator View
              </span>
            )}
            <div
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border shadow-sm ${
                report?.reportStatus === "resolved"
                  ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                  : report?.reportStatus
                    ? "bg-blue-50 text-blue-700 border-blue-200"
                    : "bg-slate-50 text-slate-400 border-slate-200"
              }`}
            >
              {report?.reportStatus?.replace(/-/g, " ") || "Pending Upload"}
            </div>
          </div>
        </div>
      </div>

      {/* Info Banner */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
          <img
            src={GET_IMAGE_URL(booking.listing?.photos?.[0])}
            alt=""
            className="w-32 h-24 rounded-2xl object-cover ring-4 ring-white/10 shadow-lg"
          />
          <div className="flex-1">
            <h2 className="text-xl font-bold">{booking.listing?.name}</h2>
            <p className="text-slate-400 text-sm">
              {booking.listing?.brand} • {booking.listing?.model}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-white/10 rounded-lg text-xs font-semibold backdrop-blur-sm">
                Status: {booking.status}
              </span>
              {report?.damageStatus && (
                <span
                  className={`px-3 py-1 rounded-lg text-xs font-bold uppercase ${
                    report.damageStatus === "none"
                      ? "bg-emerald-500/20 text-emerald-300"
                      : report.damageStatus === "minor"
                        ? "bg-amber-500/20 text-amber-300"
                        : "bg-rose-500/20 text-rose-300"
                  }`}
                >
                  Verdict: {report.damageStatus}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Comparison/Upload Area */}
        <div className="lg:col-span-2 space-y-8">
          {/* Pickup Step */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm">
                  1
                </span>
                Pickup Inspection (Before)
              </h3>
              {report?.beforeLockedAt && (
                <span className="text-xs text-slate-500 italic">
                  Uploaded on{" "}
                  {new Date(report.beforeLockedAt).toLocaleDateString()}
                </span>
              )}
            </div>

            <DamageReportUpload
              bookingId={bookingId}
              type="before"
              onUploadSuccess={fetchData}
              existingImages={report?.beforeImages || []}
              locked={!!report?.beforeLockedAt || !isOwner}
            />
          </div>

          {/* Return Step */}
          {report?.beforeLockedAt && (
            <div className="space-y-4 animate-in fade-in duration-700">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-sm">
                    2
                  </span>
                  Return Inspection (After)
                </h3>
                {report?.afterImages?.length > 0 && (
                  <span className="text-xs text-slate-500 italic">
                    Uploaded by Renter
                  </span>
                )}
              </div>

              <DamageReportUpload
                bookingId={bookingId}
                type="after"
                onUploadSuccess={fetchData}
                existingImages={report?.afterImages || []}
                locked={report?.afterImages?.length > 0 || !isRenter}
              />
            </div>
          )}

          {/* Side by Side View (Summary) */}
          {report?.beforeImages?.length > 0 &&
            report?.afterImages?.length > 0 && (
              <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm space-y-6">
                <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                  <BarChart3 className="text-indigo-500" size={20} />
                  Visual Comparison
                </h3>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                      At Pickup
                    </p>
                    <div className="aspect-video rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative">
                      <img
                        src={GET_IMAGE_URL(report.beforeImages[0])}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded-full">
                        + {report.beforeImages.length - 1} more
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest text-center">
                      At Return
                    </p>
                    <div className="aspect-video rounded-2xl bg-slate-50 border border-slate-100 overflow-hidden relative">
                      <img
                        src={GET_IMAGE_URL(report.afterImages[0])}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur-md text-[10px] text-white px-2 py-0.5 rounded-full">
                        + {report.afterImages.length - 1} more
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-xs text-slate-400">
                  Owner should review all full-resolution images above for the
                  final assessment.
                </p>
              </div>
            )}
        </div>

        {/* Sidebar: Verdict & Info */}
        <div className="space-y-8">
          {/* Owner Review Card */}
          {isOwner && report?.afterImages?.length > 0 && (
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden sticky top-8">
              <div className="bg-slate-900 p-5 text-white">
                <h3 className="font-bold flex items-center gap-2">
                  <ShieldCheck size={18} className="text-emerald-400" />
                  Assessment Verdict
                </h3>
              </div>
              <div className="p-6 space-y-6">
                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700">
                    Condition Summary
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      {
                        id: "none",
                        label: "No Damage Found",
                        color: "text-emerald-600",
                        bg: "bg-emerald-50",
                        border: "border-emerald-200",
                      },
                      {
                        id: "minor",
                        label: "Minor Issues (Dents/Scratches)",
                        color: "text-amber-600",
                        bg: "bg-amber-50",
                        border: "border-amber-200",
                      },
                      {
                        id: "major",
                        label: "Major Damages",
                        color: "text-rose-600",
                        bg: "bg-rose-50",
                        border: "border-rose-200",
                      },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        disabled={isResolved || submitting}
                        onClick={() => setDamageStatus(opt.id)}
                        className={`w-full p-3 rounded-xl border text-sm font-bold transition flex items-center justify-between ${
                          damageStatus === opt.id
                            ? `${opt.bg} ${opt.color} ${opt.border} ring-2 ring-offset-1`
                            : "bg-white border-slate-100 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        {opt.label}
                        {damageStatus === opt.id && <CheckCircle size={16} />}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MessageSquare size={16} className="text-slate-400" />
                    Owner Notes
                  </label>
                  <textarea
                    readOnly={isResolved}
                    value={ownerNotes}
                    onChange={(e) => setOwnerNotes(e.target.value)}
                    placeholder="Describe any issues or condition notes here..."
                    className="w-full h-32 p-4 rounded-xl border border-slate-200 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 resize-none"
                  />
                </div>

                {!isResolved && (
                  <button
                    onClick={handleSubmitReview}
                    disabled={submitting}
                    className="w-full py-4 rounded-2xl bg-slate-900 text-white font-black hover:bg-slate-800 transition shadow-lg shadow-slate-200 flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-5 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      "Submit Review"
                    )}
                  </button>
                )}

                {isResolved && (
                  <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-100 flex gap-3 text-emerald-800">
                    <CheckCircle className="shrink-0" size={20} />
                    <p className="text-xs font-medium leading-relaxed">
                      This damage report has been finalized and resolved. No
                      further changes can be made.
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Renter View Card */}
          {isRenter && isResolved && (
            <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Info size={18} className="text-blue-500" />
                Assessment Result
              </h3>
              <div
                className={`p-4 rounded-2xl border flex flex-col items-center gap-2 text-center ${
                  report.damageStatus === "none"
                    ? "bg-emerald-50 border-emerald-100 text-emerald-700"
                    : report.damageStatus === "minor"
                      ? "bg-amber-50 border-amber-100 text-amber-700"
                      : "bg-rose-50 border-rose-100 text-rose-700"
                }`}
              >
                <p className="text-xs font-bold uppercase tracking-widest">
                  Condition Verdict
                </p>
                <p className="text-xl font-black capitalize">
                  {report.damageStatus}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-400 uppercase">
                  Owner's Notes
                </p>
                <div className="bg-slate-50 p-4 rounded-xl text-sm text-slate-700 italic border border-slate-100">
                  "{report.ownerNotes || "No notes provided."}"
                </div>
              </div>
            </div>
          )}

          {/* Quick Stats Card */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100 space-y-4">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Booking Info
            </h4>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Pick-up Photos</span>
                <span className="font-bold text-slate-700">
                  {report?.beforeImages?.length || 0} Images
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Return Photos</span>
                <span className="font-bold text-slate-700">
                  {report?.afterImages?.length || 0} Images
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-500">Inspection Status</span>
                <span className="font-bold text-blue-600 capitalize">
                  {report?.reportStatus?.replace(/-/g, " ") || "Pending"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamageReportPage;
