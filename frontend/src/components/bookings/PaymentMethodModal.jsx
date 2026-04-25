// import React, { useState } from "react";
// import { X, CreditCard, Banknote, Loader2, ChevronRight } from "lucide-react";
// import { toast } from "react-toastify";
// import api from "../../utils/api";

// const PaymentMethodModal = ({
//   isOpen,
//   onClose,
//   bookingId,
//   totalPrice,
//   onComplete,
// }) => {
//   const [loading, setLoading] = useState(false);
//   const [selectedMethod, setSelectedMethod] = useState(null);

//   if (!isOpen) return null;

//   const handlePayment = async (method) => {
//     setSelectedMethod(method);
//     setLoading(true);
//     try {
//       const res = await api.post("/payments/method", { bookingId, method });

//       if (method === "khalti" && res.data.payment_url) {
//         window.location.href = res.data.payment_url;
//       } else if (method === "cash") {
//         toast.success("Booking confirmed with Cash payment!");
//         onComplete(res.data.booking);
//         onClose();
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error(err.response?.data?.message || "Failed to process payment");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
//       <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
//         <div className="p-6 border-b border-slate-100 flex justify-between items-center">
//           <h2 className="text-xl font-black text-slate-900">
//             Select Payment Method
//           </h2>
//           <button
//             onClick={onClose}
//             className="p-2 hover:bg-slate-100 rounded-full transition-colors"
//           >
//             <X size={20} />
//           </button>
//         </div>

//         <div className="p-6 space-y-4">
//           <div className="bg-blue-50 p-4 rounded-2xl mb-6">
//             <p className="text-slate-500 text-sm font-medium">Total Amount</p>
//             <p className="text-3xl font-black text-blue-600">
//               NPR {totalPrice.toLocaleString()}
//             </p>
//           </div>

//           {/* Khalti Method */}
//           <button
//             onClick={() => handlePayment("khalti")}
//             disabled={loading}
//             className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group
//               ${selectedMethod === "khalti" ? "border-purple-600 bg-purple-50" : "border-slate-100 hover:border-purple-200 hover:bg-slate-50"}`}
//           >
//             <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//               <img
//                 src="https://khalti.com/static/img/logo1.png"
//                 className="h-4"
//                 alt="Khalti"
//               />
//             </div>
//             <div className="flex-1 text-left">
//               <p className="font-bold text-slate-900">Khalti e-Wallet</p>
//               <p className="text-xs text-slate-500">Pay securely online</p>
//             </div>
//             {loading && selectedMethod === "khalti" ? (
//               <Loader2 className="animate-spin text-purple-600" size={20} />
//             ) : (
//               <ChevronRight
//                 className="text-slate-300 group-hover:text-purple-600 transition-colors"
//                 size={20}
//               />
//             )}
//           </button>

//           {/* Cash Method */}
//           <button
//             onClick={() => handlePayment("cash")}
//             disabled={loading}
//             className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group
//               ${selectedMethod === "cash" ? "border-emerald-600 bg-emerald-50" : "border-slate-100 hover:border-emerald-200 hover:bg-slate-50"}`}
//           >
//             <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
//               <Banknote className="text-emerald-600" size={24} />
//             </div>
//             <div className="flex-1 text-left">
//               <p className="font-bold text-slate-900">Cash Payment</p>
//               <p className="text-xs text-slate-500">Pay at the counter</p>
//             </div>
//             {loading && selectedMethod === "cash" ? (
//               <Loader2 className="animate-spin text-emerald-600" size={20} />
//             ) : (
//               <ChevronRight
//                 className="text-slate-300 group-hover:text-emerald-600 transition-colors"
//                 size={20}
//               />
//             )}
//           </button>
//         </div>

//         <div className="p-6 bg-slate-50 text-center">
//           <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
//             Secure Payment Powered by Jaum
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PaymentMethodModal;

import React, { useState } from "react";
import { X, CreditCard, Banknote, Loader2, ChevronRight } from "lucide-react";
import { toast } from "react-toastify";
import api from "../../utils/api";

const PaymentMethodModal = ({
  isOpen,
  onClose,
  bookingId,
  totalPrice,
  onComplete,
}) => {
  const [loading, setLoading] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState(null);

  if (!isOpen) return null;

  const handlePayment = async (method) => {
    setSelectedMethod(method);
    setLoading(true);
    try {
      const res = await api.post("/payments/method", { bookingId, method });

      if (method === "khalti" && res.data.payment_url) {
        window.location.href = res.data.payment_url;
      } else if (method === "esewa" && res.data.payment_url) {
        const form = document.createElement("form");
        form.setAttribute("method", "POST");
        form.setAttribute("action", res.data.payment_url);
        for (const key in res.data.esewaParams) {
          const hiddenField = document.createElement("input");
          hiddenField.setAttribute("type", "hidden");
          hiddenField.setAttribute("name", key);
          hiddenField.setAttribute("value", res.data.esewaParams[key]);
          form.appendChild(hiddenField);
        }
        document.body.appendChild(form);
        form.submit();
      } else if (method === "cash") {
        toast.success("Booking confirmed with Cash payment!");
        onComplete(res.data.booking);
        onClose();
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to process payment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-xl font-black text-slate-900">
            Select Payment Method
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div className="bg-blue-50 p-4 rounded-2xl mb-6">
            <p className="text-slate-500 text-sm font-medium">Total Amount</p>
            <p className="text-3xl font-black text-blue-600">
              NPR {totalPrice.toLocaleString()}
            </p>
          </div>

          {/* Khalti Method */}
          <button
            onClick={() => handlePayment("khalti")}
            disabled={loading}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group
              ${selectedMethod === "khalti" ? "border-purple-600 bg-purple-50" : "border-slate-100 hover:border-purple-200 hover:bg-slate-50"}`}
          >
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <img
                src="https://khalti.com/static/img/logo1.png"
                className="h-4"
                alt="Khalti"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-slate-900">Khalti e-Wallet</p>
              <p className="text-xs text-slate-500">Pay securely online</p>
            </div>
            {loading && selectedMethod === "khalti" ? (
              <Loader2 className="animate-spin text-purple-600" size={20} />
            ) : (
              <ChevronRight
                className="text-slate-300 group-hover:text-purple-600 transition-colors"
                size={20}
              />
            )}
          </button>

          {/* eSewa Method */}
          <button
            onClick={() => handlePayment("esewa")}
            disabled={loading}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group
              ${selectedMethod === "esewa" ? "border-green-600 bg-green-50" : "border-slate-100 hover:border-green-200 hover:bg-slate-50"}`}
          >
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <img
                src="https://esewa.com.np/common/images/esewa-logo.png"
                className="h-6"
                alt="eSewa"
              />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-slate-900">eSewa e-Wallet</p>
              <p className="text-xs text-slate-500">
                Pay securely online via eSewa
              </p>
            </div>
            {loading && selectedMethod === "esewa" ? (
              <Loader2 className="animate-spin text-green-600" size={20} />
            ) : (
              <ChevronRight
                className="text-slate-300 group-hover:text-green-600 transition-colors"
                size={20}
              />
            )}
          </button>

          {/* Cash Method */}
          <button
            onClick={() => handlePayment("cash")}
            disabled={loading}
            className={`w-full p-5 rounded-2xl border-2 transition-all flex items-center gap-4 group
              ${selectedMethod === "cash" ? "border-emerald-600 bg-emerald-50" : "border-slate-100 hover:border-emerald-200 hover:bg-slate-50"}`}
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
              <Banknote className="text-emerald-600" size={24} />
            </div>
            <div className="flex-1 text-left">
              <p className="font-bold text-slate-900">Cash Payment</p>
              <p className="text-xs text-slate-500">Pay at the counter</p>
            </div>
            {loading && selectedMethod === "cash" ? (
              <Loader2 className="animate-spin text-emerald-600" size={20} />
            ) : (
              <ChevronRight
                className="text-slate-300 group-hover:text-emerald-600 transition-colors"
                size={20}
              />
            )}
          </button>
        </div>

        <div className="p-6 bg-slate-50 text-center">
          <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
            Secure Payment Powered by Jaum
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodModal;
