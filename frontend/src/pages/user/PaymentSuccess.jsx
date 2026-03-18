import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { toast } from "react-toastify";
import { XCircle, Loader2, ShieldCheck, Sparkles } from "lucide-react";
// import Navbar from "../../components/Navbar";
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
    // <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">

    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
      {/* <Navbar /> */}

      {/* Background accents */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
      </div>

      <div className="relative flex items-center justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 min-h-[calc(100vh-72px)]">
        <div className="w-full max-w-6xl">
          <div className="backdrop-blur-xl bg-white/8 border border-white/10 rounded-[28px] shadow-2xl overflow-hidden">
            {/* Top bar */}
            <div className="border-b border-white/10 px-5 sm:px-6 py-3 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shadow-inner shrink-0">
                  <ShieldCheck className="h-5 w-5 text-cyan-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/50 font-semibold truncate">
                    Jaum Payments
                  </p>
                  <h1 className="text-base sm:text-lg font-bold text-white truncate">
                    Secure Payment Status
                  </h1>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 shrink-0">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Premium experience
              </div>
            </div>

            <div className="p-5 sm:p-6 md:p-8">
              {loading ? (
                <div className="flex flex-col items-center text-center py-10">
                  <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
                    <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
                    <Loader2 className="relative h-10 w-10 text-cyan-300 animate-spin" />
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200 mb-4">
                    Processing
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Verifying Your Payment
                  </h2>

                  <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed max-w-lg">
                    Please wait while we securely confirm your Khalti
                    transaction. This usually only takes a few seconds.
                  </p>
                </div>
              ) : status === "success" ? (
                <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 lg:gap-8 items-start">
                  {/* LEFT SIDE */}
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 sm:p-7 h-full">
                    <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200 mb-4">
                      <ShieldCheck className="h-4 w-4" />
                      Payment Verified
                    </div>

                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
                      Booking
                      <br className="hidden sm:block" /> Confirmed
                    </h2>

                    <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed max-w-md">
                      Your payment has been verified successfully. Your booking
                      receipt and payment summary are displayed on the right.
                    </p>

                    <div className="mt-6 space-y-3">
                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">
                          Status
                        </p>
                        <p className="text-sm text-white/85 font-medium">
                          Paid and verified successfully
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                        <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">
                          Next Step
                        </p>
                        <p className="text-sm text-white/85 font-medium">
                          Review your receipt or manage booking from dashboard
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        navigate("/dashboard/profile?tab=bookings")
                      }
                      className="mt-6 w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold shadow-lg shadow-white/10 hover:scale-[1.02] hover:bg-slate-100 transition-all duration-300"
                    >
                      Go to My Bookings
                    </button>
                  </div>

                  {/* RIGHT SIDE */}
                  <div className="rounded-[24px] border border-white/10 bg-white/5 p-3 sm:p-4">
                    <ReceiptCard booking={booking} />
                  </div>
                </div>
              ) : (
                <div className="max-w-xl mx-auto text-center py-8">
                  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10">
                    <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl" />
                    <XCircle className="relative h-10 w-10 text-red-400" />
                  </div>

                  <div className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200 mb-4">
                    Verification Failed
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                    Payment Could Not Be Confirmed
                  </h2>

                  <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed">
                    Something went wrong while verifying your payment. If the
                    amount was deducted, please contact support with your
                    transaction details for assistance.
                  </p>

                  <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
                    <p className="text-sm font-semibold text-white mb-2">
                      What you can do next
                    </p>
                    <ul className="space-y-2 text-sm text-white/65">
                      <li>• Check your booking history for any updates</li>
                      <li>• Verify the payment status in your Khalti app</li>
                      <li>• Contact support if the amount was deducted</li>
                    </ul>
                  </div>

                  <button
                    onClick={() => navigate("/dashboard/profile?tab=bookings")}
                    className="mt-6 w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold shadow-lg shadow-white/10 hover:scale-[1.02] hover:bg-slate-100 transition-all duration-300"
                  >
                    Return to Bookings
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
