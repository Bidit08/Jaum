import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Navbar from "../../components/Navbar";
import ReceiptCard from "../../components/bookings/ReceiptCard";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState("verifying"); // verifying, success, error
  const [booking, setBooking] = useState(null);

  const pidx = searchParams.get("pidx");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!pidx) {
        setStatus("error");
        setLoading(false);
        return;
      }

      try {
        const res = await api.post("/payments/khalti/verify", { pidx });
        if (res.data) {
          setBooking(res.data.booking);
          setStatus("success");
          toast.success("Payment successful!");
        }
      } catch (err) {
        console.error("Verification Error:", err);
        setStatus("error");
        toast.error(
          err.response?.data?.message || "Payment verification failed",
        );
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [pidx]);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center text-slate-900">
          {loading ? (
            <div className="space-y-4">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin mx-auto" />
              <h2 className="text-2xl font-black">Verifying Payment...</h2>
              <p className="text-slate-500">
                Please wait while we confirm your transaction with Khalti.
              </p>
            </div>
          ) : status === "success" ? (
            <ReceiptCard booking={booking} />
          ) : (
            <div className="space-y-6">
              <XCircle className="w-20 h-20 text-red-500 mx-auto" />
              <h2 className="text-3xl font-black">Payment Failed</h2>
              <p className="text-slate-600">
                Something went wrong with your payment verification. Please
                contact support if the amount was deducted.
              </p>
              <button
                onClick={() => navigate("/dashboard/profile?tab=bookings")}
                className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
              >
                Return to Bookings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
