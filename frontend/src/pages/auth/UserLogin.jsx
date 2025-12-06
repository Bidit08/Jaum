import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const UserLogin = () => {
  const { setIsAuthenticated, setUser } = useAuth();
  const navigateTo = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  // Load remembered credentials
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedPass = localStorage.getItem("rememberedPassword");

    if (savedEmail) setValue("email", savedEmail);
    if (savedPass) setValue("password", savedPass);

    if (savedEmail || savedPass) setRememberMe(true);
  }, []);

  const handleLogin = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/login",
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setIsAuthenticated(true);
      setUser(res.data.user);
      navigateTo("/");

      // Remember Me
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", data.email);
        localStorage.setItem("rememberedPassword", data.password);
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberedPassword");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleLogin)}>
      <h2 className="text-2xl font-bold text-center">Welcome Back</h2>

      {/* Email */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          required
          className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-primary"
          placeholder="you@example.com"
        />
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium">Password</label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            {...register("password")}
            required
            className="w-full px-4 py-3 mt-1 rounded-lg border pr-12 focus:ring-primary"
            placeholder="••••••••"
          />
          <span
            className="absolute right-3 top-4 cursor-pointer text-muted-foreground"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff /> : <Eye />}
          </span>
        </div>
      </div>

      {/* Remember + Forget */}
      <div className="flex justify-between">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={() => setRememberMe(!rememberMe)}
          />
          Remember me
        </label>

        <Link to="/password/forgot" className="text-primary text-sm">
          Forgot password?
        </Link>
      </div>

      <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition">
        Sign In
      </button>
    </form>
  );
};

export default UserLogin;
