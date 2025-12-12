// frontend/src/pages/auth/VerifyReset.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { Button } from "@/components/ui/button";

export default function VerifyReset() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // if no email in state, go back to forgot page
  useEffect(() => {
    if (!email) navigate("/forgot-password");
  }, [email, navigate]);

  const [digits, setDigits] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);

  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  const focusInput = (i) => inputsRef.current[i]?.focus();

  const onChange = (e, idx) => {
    const val = e.target.value.replace(/\D/g, "");
    if (!val) {
      setDigits((p) => {
        const n = [...p];
        n[idx] = "";
        return n;
      });
      return;
    }
    // support paste of multiple digits here too
    if (val.length > 1) {
      const arr = val.split("").slice(0, 6);
      setDigits((p) => {
        const next = [...p];
        arr.forEach((ch, i) => (next[i] = ch));
        return next;
      });
      return;
    }
    setDigits((p) => {
      const n = [...p];
      n[idx] = val;
      return n;
    });
    if (idx < 5) focusInput(idx + 1);
  };

  const onKeyDown = (e, idx) => {
    if (e.key === "Backspace" && !digits[idx] && idx > 0) focusInput(idx - 1);
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    setError("");
    const otp = digits.join("");
    if (otp.length !== 6) {
      setError("Please enter 6-digit OTP");
      return;
    }
    setLoading(true);
    try {
      const res = await api.post("/auth/verify-reset-otp", { email, otp });
      const resetToken = res.data.resetToken;
      // navigate to reset page with token (no persistence)
      navigate("/reset-password", { state: { email, resetToken } });
    } catch (err) {
      setError(err.response?.data?.message || "OTP verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setError("");
    try {
      await api.post("/auth/send-reset-otp", { email });
      setCooldown(60);
      setDigits(["", "", "", "", "", ""]);
      focusInput(0);
    } catch (err) {
      setError(err.response?.data?.message || "Could not resend OTP");
    }
  };

  useEffect(() => {
    if (!cooldown) return;
    const t = setInterval(() => {
      setCooldown((c) => (c <= 1 ? 0 : c - 1));
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="w-full max-w-md bg-white/6 p-6 rounded-2xl border border-white/10">
        <h2 className="text-2xl font-semibold text-center mb-2">
          Verify Reset OTP
        </h2>
        <p className="text-sm text-center text-gray-300 mb-4">
          Enter the 6-digit code sent to <strong>{email}</strong>
        </p>

        {error && <div className="text-red-400 text-center mb-3">{error}</div>}

        <form onSubmit={handleVerify} className="space-y-4">
          <div
            className="flex justify-between gap-2"
            onPaste={(e) => {
              e.preventDefault();
              const txt = e.clipboardData
                .getData("text")
                .replace(/\D/g, "")
                .slice(0, 6);
              const arr = txt.split("");
              setDigits((p) => {
                const next = [...p];
                arr.forEach((ch, i) => (next[i] = ch));
                return next;
              });
            }}
          >
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => (inputsRef.current[i] = el)}
                type="text"
                inputMode="numeric"
                pattern="\d*"
                maxLength={1}
                value={d}
                onChange={(e) => onChange(e, i)}
                onKeyDown={(e) => onKeyDown(e, i)}
                className="w-12 h-12 md:w-14 md:h-14 text-center rounded-lg bg-white/5 border border-white/10 focus:border-cyan-400 outline-none text-lg"
                aria-label={`Digit ${i + 1}`}
                autoComplete="one-time-code"
              />
            ))}
          </div>

          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-cyan-500 hover:bg-cyan-600"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </Button>
            <button
              type="button"
              onClick={handleResend}
              disabled={cooldown > 0}
              className={`px-4 py-3 rounded-lg border border-white/10 text-sm ${
                cooldown > 0
                  ? "text-gray-400"
                  : "text-cyan-400 hover:text-white"
              }`}
            >
              {cooldown > 0 ? `Resend (${cooldown}s)` : "Resend"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
