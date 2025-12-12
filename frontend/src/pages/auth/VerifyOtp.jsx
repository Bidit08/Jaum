// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { toast } from "react-toastify";

// const VerifyOtp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const email = location.state?.email;
//   const [otp, setOtp] = useState("");

//   const handleVerify = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/v1/user/verify-otp",
//         { email, otp }
//       );

//       toast.success("Login successful!");
//       navigate("/");
//     } catch (err) {
//       toast.error(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
//       <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl">
//         <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
//         <p className="text-gray-300 mb-4">OTP has been sent to: {email}</p>

//         <input
//           type="text"
//           placeholder="Enter 6-digit OTP"
//           className="w-full p-3 rounded bg-white/20 text-white outline-none"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />

//         <button
//           onClick={handleVerify}
//           className="mt-4 w-full py-3 rounded bg-cyan-500 hover:bg-cyan-600 text-white font-semibold"
//         >
//           Verify OTP
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;

// import React, { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// const VerifyOtp = () => {
//   const location = useLocation();
//   const navigate = useNavigate();

//   const { name, email, password } = location.state;
//   const [otp, setOtp] = useState("");

//   const handleVerify = async () => {
//     try {
//       const res = await axios.post(
//         "http://localhost:5000/api/auth/verify-otp",
//         {
//           name,
//           email,
//           password,
//           otp,
//         }
//       );

//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err) {
//       alert(err.response?.data?.message || "Invalid OTP");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
//       <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl">
//         <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>

//         <p className="text-gray-300 mb-4">OTP sent to: {email}</p>

//         <input
//           type="text"
//           placeholder="Enter OTP"
//           className="w-full p-3 rounded bg-white/20 text-white"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//         />

//         <button
//           onClick={handleVerify}
//           className="mt-4 w-full py-3 rounded bg-cyan-500 hover:bg-cyan-600 text-white"
//         >
//           Verify OTP
//         </button>
//       </div>
//     </div>
//   );
// };

// export default VerifyOtp;

import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { Button } from "@/components/ui/button";

export default function VerifyOtp() {
  const navigate = useNavigate();
  const location = useLocation();

  const { name, email, password } = location.state || {};

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);

  const [error, setError] = useState("");
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    const stored = localStorage.getItem("resendCooldown");
    if (stored) {
      const remaining = Number(stored) - Date.now();
      if (remaining > 0) setCooldown(Math.ceil(remaining / 1000));
    }
  }, []);

  // Cooldown Timer
  useEffect(() => {
    if (cooldown <= 0) return;

    const timer = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          localStorage.removeItem("resendCooldown");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [cooldown]);

  // Focus helper
  const focusInput = (i) => inputsRef.current[i]?.focus();

  // Handle digit input
  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/g, "");

    if (!value) {
      setDigits((prev) => {
        const next = [...prev];
        next[index] = "";
        return next;
      });
      return;
    }

    setDigits((prev) => {
      const next = [...prev];
      next[index] = value.slice(-1);
      return next;
    });

    if (index < 5) focusInput(index + 1);
  };

  // Handle backspace navigation
  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      focusInput(index - 1);
    }
  };

  // Handle paste entire OTP
  const handlePaste = (e) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;

    const newDigits = pasted.split("");
    while (newDigits.length < 6) newDigits.push("");

    setDigits(newDigits);
    focusInput(newDigits.findIndex((d) => d === "") || 5);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");

    const otp = digits.join("");

    try {
      const res = await api.post("/auth/verify-otp", {
        name,
        email,
        password,
        otp,
      });

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
    }
  };

  const handleResend = async () => {
    try {
      await api.post("/auth/resend-otp", { email });

      setCooldown(60);
      localStorage.setItem("resendCooldown", Date.now() + 60000);
      setDigits(["", "", "", "", "", ""]);
      focusInput(0);
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-white/10 p-8 rounded-xl w-full max-w-md backdrop-blur-xl border border-white/20">
        <h1 className="text-3xl font-bold mb-2 text-center">
          Verify Your Email
        </h1>
        <p className="text-gray-300 text-center mb-6">
          Enter the OTP sent to <strong>{email}</strong>
        </p>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleVerify} className="space-y-4">
          {/* 6 OTP Boxes */}
          <div className="flex justify-between gap-2" onPaste={handlePaste}>
            {digits.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputsRef.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className="w-12 h-12 md:w-14 md:h-14 text-center rounded-lg bg-white/5 
                           border border-white/30 text-xl tracking-widest
                           focus:border-cyan-400 outline-none"
              />
            ))}
          </div>

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 h-12 text-lg"
          >
            Verify OTP
          </Button>
        </form>

        <div className="text-center mt-4">
          <button
            onClick={handleResend}
            disabled={cooldown > 0}
            className={`underline ${
              cooldown > 0
                ? "text-gray-500"
                : "text-cyan-400 hover:text-cyan-300"
            }`}
          >
            {cooldown > 0 ? `Resend OTP in ${cooldown}s` : "Resend OTP"}
          </button>
        </div>
      </div>
    </div>
  );
}
