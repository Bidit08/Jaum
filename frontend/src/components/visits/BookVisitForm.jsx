import { useState } from "react";
import { Calendar, Send } from "lucide-react";
import api from "@/utils/api";
import { toast } from "react-toastify";

const BookVisitForm = ({ listing }) => {
  const [visitDate, setVisitDate] = useState("");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!visitDate) {
      toast.error("Please select a date & time");
      return;
    }

    const selected = new Date(visitDate);
    if (selected <= new Date()) {
      toast.error("Visit date must be in the future");
      return;
    }

    try {
      setLoading(true);
      await api.post("/visits", {
        vehicleId: listing._id,
        visitDate,
        note,
      });

      toast.success("Visit request sent 🚗");
      setVisitDate("");
      setNote("");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send visit request",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-4">
      <h3 className="text-xl font-bold text-slate-900">
        Book a Visit / Test Drive
      </h3>

      <div>
        <label className="text-sm font-semibold text-slate-600">
          Select Date & Time
        </label>
        <div className="relative mt-1">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="datetime-local"
            value={visitDate}
            onChange={(e) => setVisitDate(e.target.value)}
            className="w-full pl-10 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-slate-600">
          Note (optional)
        </label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
          placeholder="Any special request or message to owner..."
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <Send size={18} />
        {loading ? "Sending..." : "Send Visit Request"}
      </button>
    </div>
  );
};

export default BookVisitForm;
