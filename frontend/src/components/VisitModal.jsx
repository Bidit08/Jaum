// import React, { useState } from "react";
// import { X, Calendar as CalendarIcon, Clock, Send, Info } from "lucide-react";
// import { toast } from "react-toastify";
// import api from "../utils/api";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const VisitModal = ({ listing, onClose }) => {
//   const [visitDateTime, setVisitDateTime] = useState(
//     new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
//   ); // Default to tomorrow
//   const [note, setNote] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!visitDateTime) {
//       toast.error("Please select a date and time");
//       return;
//     }

//     if (visitDateTime <= new Date()) {
//       toast.error("Visit date and time must be in the future");
//       return;
//     }

//     setLoading(true);
//     try {
//       await api.post("/visits", {
//         vehicleId: listing._id,
//         visitDate: visitDateTime,
//         note,
//       });
//       toast.success("Visit request sent successfully!");
//       onClose();
//     } catch (error) {
//       toast.error(
//         error.response?.data?.message || "Failed to send visit request",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
//       <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-visible animate-in zoom-in-95 duration-300">
//         {/* Header */}
//         <div className="relative p-6 border-b border-slate-100 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
//           <button
//             onClick={onClose}
//             className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
//           >
//             <X size={20} />
//           </button>
//           <h2 className="text-2xl font-bold flex items-center gap-2">
//             <CalendarIcon size={24} /> Book a Visit
//           </h2>
//           <p className="text-blue-50 mt-1 opacity-90">
//             {listing.name} • {listing.brand} {listing.model}
//           </p>
//         </div>

//         {/* Content */}
//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex gap-3 text-sm text-blue-700">
//             <Info size={18} className="shrink-0 mt-0.5" />
//             <p>
//               Schedule a time to inspect or test-drive this vehicle. The owner
//               will review and confirm your request.
//             </p>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700 ml-1">
//               Preferred Date & Time
//             </label>
//             <div className="relative">
//               <DatePicker
//                 selected={visitDateTime}
//                 onChange={(date) => setVisitDateTime(date)}
//                 showTimeSelect
//                 dateFormat="MMMM d, yyyy h:mm aa"
//                 minDate={new Date()}
//                 className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
//                 placeholderText="Select date and time"
//               />
//               <Clock
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                 size={18}
//               />
//             </div>
//           </div>

//           <div className="space-y-2">
//             <label className="text-sm font-semibold text-slate-700 ml-1">
//               Note (Optional)
//             </label>
//             <textarea
//               placeholder="E.g. I want to check the engine and take a short test drive."
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               rows={3}
//               className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
//             />
//           </div>

//           <div className="pt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className={`w-full py-4 rounded-xl text-lg font-bold shadow-lg flex items-center justify-center gap-2 transition-all
//                 ${
//                   loading
//                     ? "bg-slate-300 text-slate-600 cursor-not-allowed"
//                     : "bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white hover:shadow-xl active:scale-[0.98]"
//                 }`}
//             >
//               {loading ? (
//                 <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin"></div>
//               ) : (
//                 <>
//                   <Send size={20} /> Send Visit Request
//                 </>
//               )}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default VisitModal;

import React, { useState } from "react";
import { X, Calendar as CalendarIcon, Clock, Send, Info } from "lucide-react";
import { toast } from "react-toastify";
import api from "../utils/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const VisitModal = ({ listing, onClose }) => {
  const [visitDateTime, setVisitDateTime] = useState(
    new Date(new Date().getTime() + 24 * 60 * 60 * 1000),
  ); // Default to tomorrow
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!visitDateTime) {
      toast.error("Please select a date and time");
      return;
    }

    if (visitDateTime <= new Date()) {
      toast.error("Visit date and time must be in the future");
      return;
    }

    setLoading(true);
    try {
      await api.post("/visits", {
        vehicleId: listing._id,
        visitDate: visitDateTime,
        note,
      });
      toast.success("Visit request sent successfully!");
      onClose();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to send visit request",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500">
      <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_-20px_rgba(0,0,0,0.15)] w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-500 border border-slate-100">
        {/* Header */}
        <div className="relative p-10 pb-6 text-center">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
          >
            <X size={20} />
          </button>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 mb-4 animate-in slide-in-from-top-4 duration-500">
            <CalendarIcon size={14} className="animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.1em]">
              Scheduling Visit
            </span>
          </div>

          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            Book a Visit
          </h2>
          <p className="text-slate-500 font-medium mt-2 flex items-center justify-center gap-2">
            {listing.brand} {listing.model}{" "}
            <span className="w-1 h-1 rounded-full bg-slate-300" />{" "}
            <span className="text-blue-600">{listing.name}</span>
          </p>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-10 pt-0 space-y-8">
          <div className="bg-slate-50/80 border border-slate-100 rounded-3xl p-6 flex gap-4 text-sm text-slate-600 shadow-inner">
            <div className="shrink-0 w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-600 shadow-sm border border-slate-100">
              <Info size={20} />
            </div>
            <p className="leading-relaxed font-medium">
              Pick a date and time to inspect this vehicle. We'll alert the
              owner to confirm your visit request.
            </p>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Preferred Date & Time
            </label>
            <div className="relative group">
              <Clock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors z-10"
                size={20}
              />
              <DatePicker
                selected={visitDateTime}
                onChange={(date) => setVisitDateTime(date)}
                showTimeSelect
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date()}
                className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 rounded-[1.25rem] focus:border-blue-600 focus:bg-white outline-none transition-all font-bold text-slate-900 shadow-sm"
                placeholderText="Select date and time"
              />
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
              Note to Owner (Optional)
            </label>
            <textarea
              placeholder="E.g. I want to check the engine and take a short test drive."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full p-5 bg-white border-2 border-slate-100 rounded-[1.25rem] focus:border-blue-600 focus:bg-white outline-none transition-all resize-none font-medium text-slate-700 shadow-sm"
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-5 rounded-2xl text-xs uppercase tracking-[0.2em] font-black shadow-xl flex items-center justify-center gap-3 transition-all
                ${
                  loading
                    ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                    : "bg-slate-900 text-white hover:bg-black hover:scale-[1.02] active:scale-[0.98] shadow-slate-900/20"
                }`}
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin"></div>
              ) : (
                <>
                  <Send size={16} /> Send Request
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VisitModal;
