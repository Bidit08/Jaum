// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { XCircle, Loader2, ShieldCheck, Sparkles } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// import ReceiptCard from "../../components/bookings/ReceiptCard";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState("verifying"); // verifying, success, error
//   const [booking, setBooking] = useState(null);

//   const pidx = searchParams.get("pidx");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (!pidx) {
//         setStatus("error");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.post("/payments/khalti/verify", { pidx });
//         if (res.data) {
//           setBooking(res.data.booking);
//           setStatus("success");
//           toast.success("Payment successful!");
//         }
//       } catch (err) {
//         console.error("Verification Error:", err);
//         setStatus("error");
//         toast.error(
//           err.response?.data?.message || "Payment verification failed",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [pidx]);

//   return (
//     // <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white relative overflow-hidden">

//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white relative overflow-hidden">
//       {/* <Navbar /> */}

//       {/* Background accents */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-blue-500/20 blur-3xl" />
//         <div className="absolute top-1/3 -right-16 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
//         <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.06),transparent_35%)]" />
//       </div>

//       <div className="relative flex items-center justify-center px-4 py-4 sm:px-6 sm:py-6 lg:px-8 lg:py-8 min-h-[calc(100vh-72px)]">
//         <div className="w-full max-w-6xl">
//           <div className="backdrop-blur-xl bg-white/8 border border-white/10 rounded-[28px] shadow-2xl overflow-hidden">
//             {/* Top bar */}
//             <div className="border-b border-white/10 px-5 sm:px-6 py-3 flex items-center justify-between shrink-0">
//               <div className="flex items-center gap-3 min-w-0">
//                 <div className="h-10 w-10 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center shadow-inner shrink-0">
//                   <ShieldCheck className="h-5 w-5 text-cyan-300" />
//                 </div>
//                 <div className="min-w-0">
//                   <p className="text-[10px] sm:text-xs uppercase tracking-[0.22em] text-white/50 font-semibold truncate">
//                     Jaum Payments
//                   </p>
//                   <h1 className="text-base sm:text-lg font-bold text-white truncate">
//                     Secure Payment Status
//                   </h1>
//                 </div>
//               </div>

//               <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 shrink-0">
//                 <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
//                 Premium experience
//               </div>
//             </div>

//             <div className="p-5 sm:p-6 md:p-8">
//               {loading ? (
//                 <div className="flex flex-col items-center text-center py-10">
//                   <div className="relative mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-white/5">
//                     <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />
//                     <Loader2 className="relative h-10 w-10 text-cyan-300 animate-spin" />
//                   </div>

//                   <div className="inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200 mb-4">
//                     Processing
//                   </div>

//                   <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
//                     Verifying Your Payment
//                   </h2>

//                   <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed max-w-lg">
//                     Please wait while we securely confirm your Khalti
//                     transaction. This usually only takes a few seconds.
//                   </p>
//                 </div>
//               ) : status === "success" ? (
//                 <div className="grid lg:grid-cols-[0.95fr_1.25fr] gap-6 lg:gap-8 items-start">
//                   {/* LEFT SIDE */}
//                   <div className="rounded-[24px] border border-white/10 bg-white/5 p-6 sm:p-7 h-full">
//                     <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-200 mb-4">
//                       <ShieldCheck className="h-4 w-4" />
//                       Payment Verified
//                     </div>

//                     <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white leading-tight">
//                       Booking
//                       <br className="hidden sm:block" /> Confirmed
//                     </h2>

//                     <p className="mt-4 text-sm sm:text-base text-white/65 leading-relaxed max-w-md">
//                       Your payment has been verified successfully. Your booking
//                       receipt and payment summary are displayed on the right.
//                     </p>

//                     <div className="mt-6 space-y-3">
//                       <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
//                         <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">
//                           Status
//                         </p>
//                         <p className="text-sm text-white/85 font-medium">
//                           Paid and verified successfully
//                         </p>
//                       </div>

//                       <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
//                         <p className="text-xs uppercase tracking-[0.15em] text-white/40 mb-1">
//                           Next Step
//                         </p>
//                         <p className="text-sm text-white/85 font-medium">
//                           Review your receipt or manage booking from dashboard
//                         </p>
//                       </div>
//                     </div>

//                     <button
//                       onClick={() =>
//                         navigate("/dashboard/profile?tab=bookings")
//                       }
//                       className="mt-6 w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold shadow-lg shadow-white/10 hover:scale-[1.02] hover:bg-slate-100 transition-all duration-300"
//                     >
//                       Go to My Bookings
//                     </button>
//                   </div>

//                   {/* RIGHT SIDE */}
//                   <div className="rounded-[24px] border border-white/10 bg-white/5 p-3 sm:p-4">
//                     <ReceiptCard booking={booking} />
//                   </div>
//                 </div>
//               ) : (
//                 <div className="max-w-xl mx-auto text-center py-8">
//                   <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-red-400/20 bg-red-500/10">
//                     <div className="absolute inset-0 rounded-full bg-red-500/10 blur-xl" />
//                     <XCircle className="relative h-10 w-10 text-red-400" />
//                   </div>

//                   <div className="inline-flex items-center gap-2 rounded-full border border-red-400/20 bg-red-500/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-red-200 mb-4">
//                     Verification Failed
//                   </div>

//                   <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
//                     Payment Could Not Be Confirmed
//                   </h2>

//                   <p className="mt-3 text-sm sm:text-base text-white/65 leading-relaxed">
//                     Something went wrong while verifying your payment. If the
//                     amount was deducted, please contact support with your
//                     transaction details for assistance.
//                   </p>

//                   <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-left">
//                     <p className="text-sm font-semibold text-white mb-2">
//                       What you can do next
//                     </p>
//                     <ul className="space-y-2 text-sm text-white/65">
//                       <li>• Check your booking history for any updates</li>
//                       <li>• Verify the payment status in your Khalti app</li>
//                       <li>• Contact support if the amount was deducted</li>
//                     </ul>
//                   </div>

//                   <button
//                     onClick={() => navigate("/dashboard/profile?tab=bookings")}
//                     className="mt-6 w-full sm:w-auto px-8 py-4 rounded-2xl bg-white text-slate-900 font-bold shadow-lg shadow-white/10 hover:scale-[1.02] hover:bg-slate-100 transition-all duration-300"
//                   >
//                     Return to Bookings
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

// import React, { useEffect, useState } from "react";
// import { useSearchParams, useNavigate } from "react-router-dom";
// import api from "../../utils/api";
// import { toast } from "react-toastify";
// import { XCircle, Loader2, ShieldCheck, Sparkles } from "lucide-react";
// // import Navbar from "../../components/Navbar";
// import ReceiptCard from "../../components/bookings/ReceiptCard";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(true);
//   const [status, setStatus] = useState("verifying"); // verifying, success, error
//   const [booking, setBooking] = useState(null);

//   const pidx = searchParams.get("pidx");

//   useEffect(() => {
//     const verifyPayment = async () => {
//       if (!pidx) {
//         setStatus("error");
//         setLoading(false);
//         return;
//       }

//       try {
//         const res = await api.post("/payments/khalti/verify", { pidx });
//         if (res.data) {
//           setBooking(res.data.booking);
//           setStatus("success");
//           toast.success("Payment successful!");
//         }
//       } catch (err) {
//         console.error("Verification Error:", err);
//         setStatus("error");
//         toast.error(
//           err.response?.data?.message || "Payment verification failed",
//         );
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [pidx]);

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 font-sans relative overflow-hidden animate-in fade-in duration-1000">
//       {/* Soft Ambient Glow Elements */}
//       <div className="pointer-events-none absolute inset-0 overflow-hidden">
//         <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-[120px]" />
//         <div className="absolute top-1/2 -right-48 h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-[150px]" />
//       </div>

//       <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
//         <div className="w-full max-w-5xl">
//           {loading ? (
//             <div className="flex flex-col items-center text-center">
//               <div className="relative mb-10 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl border border-slate-100 p-8">
//                 <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
//               </div>
//               <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
//                 Verifying Payment
//               </h2>
//               <p className="text-slate-500 font-medium max-w-md text-lg">
//                 We're confirming your transaction with the payment gateway. Hang
//                 tight, this won't take long.
//               </p>
//             </div>
//           ) : status === "success" ? (
//             <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
//               {/* LEFT SIDE: Success Content */}
//               {/* <div className="space-y-10 animate-in slide-in-from-left-8 duration-700"> */}
//               <div className="space-y-10">
//                 <div className="space-y-6">
//                   <div className="w-20 h-20 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center text-white">
//                     <ShieldCheck size={44} strokeWidth={2.5} />
//                   </div>
//                   <div className="space-y-2">
//                     <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
//                       Booking Confirmed{" "}
//                       <span className="animate-pulse">🎉</span>
//                     </h1>
//                     <p className="text-xl text-slate-500 font-medium leading-relaxed">
//                       Everything is set! Your ride is ready for pick-up. A
//                       confirmation has been sent to your dashboard.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Status Highlight Card */}
//                 <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-6 flex lg:items-center gap-5 shadow-sm">
//                   <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
//                     <ShieldCheck size={24} />
//                   </div>
//                   <div>
//                     <p className="font-bold text-emerald-900 text-lg">
//                       Fully Verified & Paid
//                     </p>
//                     <p className="text-emerald-700/80 font-medium text-sm">
//                       Your transaction with Khalti was successful and the
//                       booking is now active.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Main Actions */}
//                 <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                   <button
//                     onClick={() => navigate("/dashboard/profile?tab=bookings")}
//                     className="px-10 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.03] transition-all duration-300 active:scale-95"
//                   >
//                     Manage Bookings
//                   </button>
//                   <button
//                     onClick={() => navigate("/listings")}
//                     className="px-10 py-4.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
//                   >
//                     Rent More
//                   </button>
//                 </div>
//               </div>

//               {/* RIGHT SIDE: Receipt Card */}
//               <div className="animate-in slide-in-from-right-8 duration-700 delay-200">
//                 <ReceiptCard booking={booking} />
//               </div>
//             </div>
//           ) : (
//             <div className="max-w-xl mx-auto text-center space-y-10 animate-in zoom-in-95 duration-500">
//               <div className="w-24 h-24 bg-rose-500 rounded-[2rem] shadow-2xl shadow-rose-500/30 flex items-center justify-center text-white mx-auto">
//                 <XCircle size={48} strokeWidth={2.5} />
//               </div>

//               <div className="space-y-4">
//                 <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
//                   Oops! Payment Failed.
//                 </h1>
//                 <p className="text-slate-500 text-lg font-medium leading-relaxed">
//                   We couldn't confirm your transaction. This might be due to a
//                   timeout or a service interruption with the gateway.
//                 </p>
//               </div>

//               <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-left shadow-sm space-y-4">
//                 <p className="font-black uppercase tracking-widest text-slate-400 text-[10px]">
//                   Recommended Steps
//                 </p>
//                 <ul className="space-y-3">
//                   <li className="flex items-center gap-3 text-slate-700 font-bold">
//                     <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center text-xs">
//                       1
//                     </div>
//                     Check your bank / Khalti app for deductions
//                   </li>
//                   <li className="flex items-center gap-3 text-slate-700 font-bold">
//                     <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center text-xs">
//                       2
//                     </div>
//                     Wait 5-10 minutes for sync
//                   </li>
//                   <li className="flex items-center gap-3 text-slate-700 font-bold">
//                     <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center text-xs">
//                       3
//                     </div>
//                     Contact Jaum support if money was deducted
//                   </li>
//                 </ul>
//               </div>

//               <button
//                 onClick={() => navigate("/listings")}
//                 className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:scale-105 transition-all duration-300"
//               >
//                 Back to Marketplace
//               </button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

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
  const esewaData = searchParams.get("data");

  useEffect(() => {
    const verifyPayment = async () => {
      if (!pidx && !esewaData) {
        setStatus("error");
        setLoading(false);
        return;
      }

      try {
        let res;
        if (pidx) {
          res = await api.post("/payments/khalti/verify", { pidx });
        } else if (esewaData) {
          res = await api.post("/payments/esewa/verify", { data: esewaData });
        }

        if (res?.data) {
          setBooking(res.data.booking);
          setStatus("success");
          toast.success(
            pidx
              ? "Payment successful via Khalti!"
              : "Payment successful via eSewa!",
          );
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
  }, [pidx, esewaData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 text-slate-900 font-sans relative overflow-hidden animate-in fade-in duration-1000">
      {/* Soft Ambient Glow Elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-blue-400/10 blur-[120px]" />
        <div className="absolute top-1/2 -right-48 h-[500px] w-[500px] rounded-full bg-indigo-400/10 blur-[150px]" />
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
        <div className="w-full max-w-5xl">
          {loading ? (
            <div className="flex flex-col items-center text-center">
              <div className="relative mb-10 flex h-32 w-32 items-center justify-center rounded-full bg-white shadow-2xl border border-slate-100 p-8">
                <Loader2 className="h-16 w-16 text-blue-600 animate-spin" />
              </div>
              <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Verifying Payment
              </h2>
              <p className="text-slate-500 font-medium max-w-md text-lg">
                We're confirming your transaction with the payment gateway. Hang
                tight, this won't take long.
              </p>
            </div>
          ) : status === "success" ? (
            <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
              {/* LEFT SIDE: Success Content */}
              {/* <div className="space-y-10 animate-in slide-in-from-left-8 duration-700"> */}
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="w-20 h-20 bg-emerald-500 rounded-2xl shadow-xl shadow-emerald-500/30 flex items-center justify-center text-white">
                    <ShieldCheck size={44} strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <h1 className="text-5xl font-black text-slate-900 tracking-tighter">
                      Booking Confirmed{" "}
                      <span className="animate-pulse">🎉</span>
                    </h1>
                    <p className="text-xl text-slate-500 font-medium leading-relaxed">
                      Everything is set! Your ride is ready for pick-up. A
                      confirmation has been sent to your dashboard.
                    </p>
                  </div>
                </div>

                {/* Status Highlight Card */}
                <div className="bg-emerald-50 border border-emerald-100 rounded-[2.5rem] p-6 flex lg:items-center gap-5 shadow-sm">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-emerald-600 shadow-sm">
                    <ShieldCheck size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-emerald-900 text-lg">
                      Fully Verified & Paid
                    </p>
                    <p className="text-emerald-700/80 font-medium text-sm">
                      Your transaction with {pidx ? "Khalti" : "eSewa"} was
                      successful and the booking is now active.
                    </p>
                  </div>
                </div>

                {/* Main Actions */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={() => navigate("/dashboard/profile?tab=bookings")}
                    className="px-10 py-4.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-2xl shadow-xl shadow-blue-500/20 hover:scale-[1.03] transition-all duration-300 active:scale-95"
                  >
                    Manage Bookings
                  </button>
                  <button
                    onClick={() => navigate("/listings")}
                    className="px-10 py-4.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all active:scale-95 shadow-sm"
                  >
                    Rent More
                  </button>
                </div>
              </div>

              {/* RIGHT SIDE: Receipt Card */}
              <div className="animate-in slide-in-from-right-8 duration-700 delay-200">
                <ReceiptCard booking={booking} />
              </div>
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center space-y-10 animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-rose-500 rounded-[2rem] shadow-2xl shadow-rose-500/30 flex items-center justify-center text-white mx-auto">
                <XCircle size={48} strokeWidth={2.5} />
              </div>

              <div className="space-y-4">
                <h1 className="text-4xl font-black text-slate-900 tracking-tight italic">
                  Oops! Payment Failed.
                </h1>
                <p className="text-slate-500 text-lg font-medium leading-relaxed">
                  We couldn't confirm your transaction. This might be due to a
                  timeout or a service interruption with the gateway.
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 text-left shadow-sm space-y-4">
                <p className="font-black uppercase tracking-widest text-slate-400 text-[10px]">
                  Recommended Steps
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center text-xs">
                      1
                    </div>
                    Check your bank / Khalti app for deductions
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center text-xs">
                      2
                    </div>
                    Wait 5-10 minutes for sync
                  </li>
                  <li className="flex items-center gap-3 text-slate-700 font-bold">
                    <div className="w-6 h-6 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center text-xs">
                      3
                    </div>
                    Contact Jaum support if money was deducted
                  </li>
                </ul>
              </div>

              <button
                onClick={() => navigate("/listings")}
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-bold shadow-xl shadow-slate-900/20 hover:scale-105 transition-all duration-300"
              >
                Back to Marketplace
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
