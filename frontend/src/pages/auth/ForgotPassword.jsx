// frontend/src/pages/auth/ForgotPassword.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSend = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await api.post("/auth/send-reset-otp", { email });
      // pass email to the verification page via state (no persistence)
      navigate("/verify-reset", { state: { email } });
    } catch (err) {
      setError(err.response?.data?.message || "Could not send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="bg-white/10 p-8 rounded-xl w-full max-w-md backdrop-blur-xl border border-white/20">
        <h1 className="text-2xl font-bold mb-2 text-center">Forgot Password</h1>
        <p className="text-gray-300 text-center mb-6">
          Enter your email to receive a reset OTP.
        </p>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleSend} className="space-y-4">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email"
            required
            className="bg-white/20 border-white/30 text-white"
          />
          {/* <Link to="/reset-password"> */}
          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 h-12"
          >
            {loading ? "Sending..." : "Send OTP"}
          </Button>
          {/* </Link> */}
        </form>
      </div>
    </div>
  );
}
