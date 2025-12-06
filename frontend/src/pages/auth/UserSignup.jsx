import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const UserSignup = () => {
  const { setUser } = useAuth();
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    data.phone = `+977${data.phone}`;

    try {
      const res = await axios.post(
        "http://localhost:5000/api/v1/user/register",
        data,
        { withCredentials: true }
      );

      toast.success(res.data.message);
      setUser(res.data.user);

      navigateTo(`/verification-prompt/${data.email}/${data.phone}`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit(handleRegister)}>
      <h2 className="text-2xl font-bold text-center">Create an Account</h2>

      {/* Name */}
      <div>
        <label className="text-sm font-medium">Full Name</label>
        <input
          {...register("name")}
          required
          className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-primary"
          placeholder="John Doe"
        />
      </div>

      {/* Email */}
      <div>
        <label className="text-sm font-medium">Email</label>
        <input
          {...register("email")}
          type="email"
          required
          className="w-full px-4 py-3 mt-1 rounded-lg border focus:ring-primary"
          placeholder="you@example.com"
        />
      </div>

      {/* Phone */}
      <div>
        <label className="text-sm font-medium">Phone Number</label>
        <div className="flex">
          <span className="px-4 py-3 bg-muted rounded-l-lg border">+977</span>
          <input
            {...register("phone")}
            required
            className="w-full px-4 py-3 rounded-r-lg border focus:ring-primary"
            placeholder="98XXXXXXXX"
          />
        </div>
      </div>

      {/* Password */}
      <div>
        <label className="text-sm font-medium">Password</label>
        <div className="relative">
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
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

      {/* Verification Method */}
      <div>
        <p className="font-medium mb-1">Verification Method</p>
        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="email"
              {...register("verificationMethod")}
            />
            Email
          </label>

          <label className="flex items-center gap-2">
            <input
              type="radio"
              value="phone"
              {...register("verificationMethod")}
            />
            Phone
          </label>
        </div>
      </div>

      <button className="w-full py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition">
        Create Account
      </button>
    </form>
  );
};

export default UserSignup;
