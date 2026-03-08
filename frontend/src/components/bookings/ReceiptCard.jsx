import React from "react";
import {
  CheckCircle,
  FileText,
  Download,
  Calendar,
  Car,
  User,
  CreditCard,
  Banknote,
} from "lucide-react";
import api from "../../utils/api";
import { toast } from "react-toastify";

const ReceiptCard = ({ booking }) => {
  if (!booking) return null;

  const handleDownloadInvoice = async () => {
    try {
      const response = await api.get(`/payments/${booking._id}/invoice`, {
        responseType: "blob",
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `invoice-${booking._id}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      toast.success("Invoice downloaded successfully!");
    } catch (err) {
      console.error("Invoice Download Error:", err);
      toast.error("Failed to download invoice");
    }
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden max-w-2xl w-full mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Success Header */}
      <div className="bg-emerald-500 p-8 text-center text-white">
        <CheckCircle className="w-16 h-16 mx-auto mb-4 animate-bounce" />
        <h2 className="text-3xl font-black">Booking Confirmed!</h2>
        <p className="opacity-90 mt-1 font-medium">
          Your ride is ready for the road.
        </p>
      </div>

      <div className="p-8 space-y-8">
        {/* Basic Info */}
        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Receipt Number
            </p>
            <p className="text-sm font-bold text-slate-900">
              {booking.receiptNumber || "Generating..."}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
              Date
            </p>
            <p className="text-sm font-bold text-slate-900">
              {new Date().toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Details Grid */}
        <div className="bg-slate-50 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Car size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Vehicle
              </p>
              <p className="text-sm font-bold text-slate-900">
                {booking.listing?.name}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              <Calendar size={20} className="text-blue-600" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Period / Details
              </p>
              <p className="text-sm font-bold text-slate-900">
                {booking.bookingType === "full"
                  ? `${booking.totalDays} Days`
                  : `${booking.seatsBooked} Seats`}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-2 bg-white rounded-xl shadow-sm">
              {booking.paymentMethod === "khalti" ? (
                <CreditCard size={20} className="text-purple-600" />
              ) : (
                <Banknote size={20} className="text-emerald-600" />
              )}
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Payment Method
              </p>
              <p className="text-sm font-bold text-slate-900 uppercase">
                {booking.paymentMethod} •{" "}
                <span
                  className={
                    booking.paymentStatus === "paid"
                      ? "text-emerald-600"
                      : "text-amber-600"
                  }
                >
                  {booking.paymentStatus}
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Price Breakdown */}
        <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-slate-900">Total Amount</p>
            <p className="text-xs text-slate-500 font-medium">
              Including all taxes
            </p>
          </div>
          <p className="text-3xl font-black text-slate-900">
            NPR {booking.totalPrice.toLocaleString()}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <button
            onClick={handleDownloadInvoice}
            className="flex-1 bg-slate-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 active:scale-95"
          >
            <FileText size={20} />
            Download Invoice
          </button>
          <button
            onClick={() => window.print()}
            className="px-8 bg-slate-100 text-slate-600 font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-slate-200 transition-all active:scale-95"
          >
            Print
          </button>
        </div>
      </div>

      <div className="bg-slate-50 p-4 text-center">
        <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
          Thank you for traveling with us!
        </p>
      </div>
    </div>
  );
};

export default ReceiptCard;
