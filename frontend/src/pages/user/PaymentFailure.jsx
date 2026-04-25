import React from "react";
import { useNavigate } from "react-router-dom";
import { XCircle, ArrowLeft } from "lucide-react";

const PaymentFailure = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircle className="text-red-600 w-12 h-12" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 mb-4">
          Payment Failed
        </h1>
        <p className="text-slate-500 mb-8 leading-relaxed">
          Something went wrong with your transaction. Your payment could not be
          processed at this time. If any amount was deducted, it will be
          refunded automatically within 3-5 business days.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => navigate("/dashboard/profile?tab=bookings")}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
          >
            View My Bookings
          </button>
          <button
            onClick={() => navigate("/listings")}
            className="w-full py-4 bg-white border border-slate-200 text-slate-700 rounded-2xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Marketplace
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentFailure;
