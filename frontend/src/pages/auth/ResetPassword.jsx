// frontend/src/pages/auth/ResetPassword.jsx
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPassword() {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;
  const resetToken = location.state?.resetToken;

  useEffect(() => {
    if (!email || !resetToken) navigate("/forgot-password");
  }, [email, resetToken, navigate]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    if (!password || !confirmPassword)
      return setError("Please fill both fields");
    if (password !== confirmPassword) return setError("Passwords do not match");

    setLoading(true);
    try {
      await api.post("/auth/reset-password", {
        email,
        newPassword: password,
        token: resetToken,
      });
      // success — redirect to login
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Could not reset password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white p-6">
      <div className="bg-white/10 p-8 rounded-xl w-full max-w-md backdrop-blur-xl border border-white/20">
        <h1 className="text-2xl font-bold mb-2 text-center">Change Password</h1>
        <p className="text-gray-300 text-center mb-6">
          Set a new password for <strong>{email}</strong>
        </p>

        {error && <p className="text-red-400 text-center mb-4">{error}</p>}

        <form onSubmit={handleReset} className="space-y-4">
          <Input
            type="password"
            placeholder="New password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-white/20 border-white/30 text-white"
          />

          <Input
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="bg-white/20 border-white/30 text-white"
          />

          <Button
            type="submit"
            className="w-full bg-cyan-500 hover:bg-cyan-600 h-12"
          >
            {loading ? "Saving..." : "Change Password"}
          </Button>
        </form>
      </div>
    </div>
  );
}
