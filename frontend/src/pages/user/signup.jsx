// import React, { useState } from "react";
// import api from "../../utils/api";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Car } from "lucide-react";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       const res = await api.post("/auth/register", { name, email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/"); // redirect to home
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
//       {/* Background Elements */}
//       <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
//       <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"></div>
//       <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

//       <div className="relative z-10 min-h-screen flex">
//         {/* Left Side - Signup Form */}
//         <div className="flex-1 flex items-center justify-center p-4 lg:p-6">
//           <div className="w-full max-w-md">
//             {/* Logo */}
//             <div className="flex justify-center mb-8">
//               <div className="flex items-center space-x-3">
//                 <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
//                   <Car className="w-6 h-6 text-white" />
//                 </div>
//                 <div className="flex flex-col">
//                   <span className="text-2xl font-bold text-white">Jaum</span>
//                   <span className="text-cyan-200 text-sm">Premium Rentals</span>
//                 </div>
//               </div>
//             </div>

//             {/* Signup Card */}
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">
//               {/* Header */}
//               <div className="text-center mb-8">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                   Create Account
//                 </h2>
//                 <p className="text-gray-300 text-sm sm:text-base">
//                   Join thousands of satisfied customers
//                 </p>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
//                   {error}
//                 </div>
//               )}

//               {/* Signup Form */}
//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name Field */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-medium text-white mb-2">
//                     <User className="w-4 h-4 mr-2" />
//                     Full Name
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="text"
//                       placeholder="Enter your full name"
//                       className="w-full px-4 py-3 pl-11 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                       value={name}
//                       onChange={(e) => setName(e.target.value)}
//                       required
//                     />
//                     <User className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                   </div>
//                 </div>

//                 {/* Email Field */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-medium text-white mb-2">
//                     <Mail className="w-4 h-4 mr-2" />
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       placeholder="you@example.com"
//                       className="w-full px-4 py-3 pl-11 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                       value={email}
//                       onChange={(e) => setEmail(e.target.value)}
//                       required
//                     />
//                     <Mail className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                   </div>
//                 </div>

//                 {/* Password Field */}
//                 <div className="space-y-2">
//                   <label className="flex items-center text-sm font-medium text-white mb-2">
//                     <Lock className="w-4 h-4 mr-2" />
//                     Password
//                   </label>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="Create a strong password"
//                       className="w-full px-4 py-3 pl-11 pr-11 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm"
//                       value={password}
//                       onChange={(e) => setPassword(e.target.value)}
//                       required
//                     />
//                     <Lock className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
//                     <button
//                       type="button"
//                       onClick={() => setShowPassword(!showPassword)}
//                       className="absolute right-3 top-3.5 text-gray-400 hover:text-white transition-colors"
//                     >
//                       {showPassword ? (
//                         <EyeOff className="h-4 w-4" />
//                       ) : (
//                         <Eye className="h-4 w-4" />
//                       )}
//                     </button>
//                   </div>
//                   <p className="text-xs text-gray-400 mt-1">
//                     Use 8+ characters with a mix of letters, numbers & symbols
//                   </p>
//                 </div>

//                 {/* Terms Agreement */}
//                 <div className="flex items-start space-x-3">
//                   <div className="relative mt-1">
//                     <input
//                       type="checkbox"
//                       id="terms"
//                       className="sr-only"
//                       required
//                     />
//                     <div className="w-4 h-4 rounded border-2 border-white/30 bg-white/10 hover:border-white/50 transition-all duration-200 cursor-pointer flex items-center justify-center">
//                       <svg
//                         className="w-3 h-3 text-cyan-500 hidden"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                         stroke="currentColor"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={3}
//                           d="M5 13l4 4L19 7"
//                         />
//                       </svg>
//                     </div>
//                   </div>
//                   <label
//                     htmlFor="terms"
//                     className="text-sm text-gray-300 cursor-pointer select-none"
//                   >
//                     I agree to the{" "}
//                     <button
//                       type="button"
//                       className="text-cyan-400 hover:text-cyan-300 transition-colors"
//                     >
//                       Terms of Service
//                     </button>{" "}
//                     and{" "}
//                     <button
//                       type="button"
//                       className="text-cyan-400 hover:text-cyan-300 transition-colors"
//                     >
//                       Privacy Policy
//                     </button>
//                   </label>
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   disabled={isLoading}
//                   className={`w-full flex items-center justify-center py-3.5 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900 transition-all duration-200 shadow-lg shadow-cyan-500/25 ${
//                     isLoading
//                       ? "opacity-80 cursor-not-allowed"
//                       : "hover:shadow-cyan-500/40"
//                   }`}
//                 >
//                   {isLoading ? (
//                     <span className="flex items-center">
//                       <svg
//                         className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 24 24"
//                       >
//                         <circle
//                           className="opacity-25"
//                           cx="12"
//                           cy="12"
//                           r="10"
//                           stroke="currentColor"
//                           strokeWidth="4"
//                         ></circle>
//                         <path
//                           className="opacity-75"
//                           fill="currentColor"
//                           d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
//                         ></path>
//                       </svg>
//                       Creating Account...
//                     </span>
//                   ) : (
//                     <span className="flex items-center">
//                       Create Account
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </span>
//                   )}
//                 </button>
//               </form>

//               {/* Login Link */}
//               <div className="text-center mt-6 pt-6 border-t border-white/10">
//                 <span className="text-sm text-gray-300">
//                   Already have an account?{" "}
//                   <button
//                     onClick={() => navigate("/login")}
//                     className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
//                   >
//                     Sign in
//                   </button>
//                 </span>
//               </div>
//             </div>

//             {/* Security Badge */}
//             <div className="mt-6 text-center">
//               <div className="inline-flex items-center space-x-2 text-xs text-gray-400 bg-white/5 rounded-full px-4 py-2 border border-white/10">
//                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                 <span>Secure & Encrypted Connection</span>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Right Side - Image Holder */}
//         <div className="hidden lg:flex flex-1 items-center justify-center p-4">
//           <div className="w-full h-full max-w-full max-h-[80vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center">
//             <div className="text-center p-8">
//               <div className="w-96 h-96 mx-auto bg-white/20 rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center mb-6">
//                 <div className="text-center">
//                   <Car className="w-20 h-20 text-white/50 mx-auto mb-4" />
//                   <span className="text-white/50 text-xl block">
//                     Join Our Community
//                   </span>
//                   <span className="text-white/30 text-sm block mt-2">
//                     Premium Vehicle Access
//                   </span>
//                 </div>
//               </div>
//               <p className="text-white/60 text-sm max-w-md">
//                 Start your journey with access to our premium fleet of luxury
//                 and economy vehicles
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import React, { useState } from "react";
// import api from "../../utils/api";
// import { useNavigate } from "react-router-dom";

// const Signup = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/auth/register", { name, email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/"); // redirect to home
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="text"
//             placeholder="Name"
//             className="w-full border p-3 rounded-md"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             required
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             className="w-full border p-3 rounded-md"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <input
//             type="password"
//             placeholder="Password"
//             className="w-full border p-3 rounded-md"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//           <button className="w-full bg-slate-900 text-white py-3 rounded-md hover:bg-slate-800 transition">
//             Sign Up
//           </button>
//         </form>
//         <p className="text-sm text-gray-500 mt-4 text-center">
//           Already have an account?{" "}
//           <span
//             className="text-blue-500 cursor-pointer"
//             onClick={() => navigate("/login")}
//           >
//             Login
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Mail, Lock, User } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Signup() {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/auth/register", { name, email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
//       {/* LEFT FORM SECTION */}
//       <div className="flex items-center justify-center px-6 lg:px-16 py-10 relative">
//         {/* Background pattern */}
//         <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 w-full max-w-xl"
//         >
//           {/* Toggle */}
//           <div className="flex justify-center mb-8">
//             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 flex gap-2">
//               <Button
//                 variant="ghost"
//                 className="text-white hover:bg-white/10"
//                 onClick={() => navigate("/login")}
//               >
//                 Login
//               </Button>
//               <Button className="bg-cyan-500 hover:bg-cyan-600 text-white shadow">
//                 Register
//               </Button>
//             </div>
//           </div>

//           {/* FORM */}
//           <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl py-6 rounded-2xl">
//             <CardContent className="space-y-6">
//               <div className="text-center mb-4">
//                 <h1 className="text-3xl font-bold text-white">
//                   Create an account
//                 </h1>
//                 <p className="text-gray-300">
//                   Get started with just a few details
//                 </p>
//               </div>

//               {error && (
//                 <p className="text-red-400 text-center -mt-3">{error}</p>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Name */}
//                 <div>
//                   <label className="text-white text-sm mb-1 flex items-center gap-2">
//                     <User size={18} /> Full Name
//                   </label>
//                   <Input
//                     placeholder="John Doe"
//                     className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label className="text-white text-sm mb-1 flex items-center gap-2">
//                     <Mail size={18} /> Email Address
//                   </label>
//                   <Input
//                     placeholder="you@example.com"
//                     className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>

//                 {/* Password */}
//                 <div>
//                   <label className="text-white text-sm mb-1 flex items-center gap-2">
//                     <Lock size={18} /> Password
//                   </label>
//                   <Input
//                     type="password"
//                     placeholder="••••••••"
//                     className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <Button
//                   type="submit"
//                   className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-12 text-lg rounded-xl"
//                 >
//                   Create Account
//                 </Button>
//               </form>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* RIGHT SECTION IMAGE */}
//       <div className="hidden lg:flex items-center justify-center relative">
//         <div className="h-[95vh] w-[90%] shadow-2xl rounded-3xl overflow-hidden relative">
//           <img
//             src="https://images.unsplash.com/photo-1603881359318-e2bc03deaaee?q=80&w=765&auto=format&fit=crop"
//             alt="Car Rental"
//             className="w-full h-full object-cover"
//           />
//           <div className="absolute inset-0 bg-black/20" />
//         </div>
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/api";

import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, Lock, User, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function Signup() {
  const [step, setStep] = useState("register");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // STEP 1 — Send OTP
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await api.post("/auth/send-otp", { name, email, password });
      setStep("otp");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  // STEP 2 — Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();
    setError("");

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

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      <div className="flex items-center justify-center px-6 lg:px-16 py-10 relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-xl"
        >
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 flex gap-2">
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
              <Button className="bg-cyan-500 hover:bg-cyan-600 text-white shadow">
                Register
              </Button>
            </div>
          </div>

          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl py-6 rounded-2xl">
            <CardContent className="space-y-6">
              <div className="text-center mb-4">
                <h1 className="text-3xl font-bold text-white">
                  {step === "register"
                    ? "Create an account"
                    : "Verify Your Email"}
                </h1>
                <p className="text-gray-300">
                  {step === "register"
                    ? "Get started with just a few details"
                    : `Enter the OTP sent to ${email}`}
                </p>
              </div>

              {error && (
                <p className="text-red-400 text-center -mt-3">{error}</p>
              )}

              {/* REGISTER FORM */}
              {step === "register" && (
                <form onSubmit={handleRegister} className="space-y-6">
                  <div>
                    <label className="text-white text-sm mb-1 flex items-center gap-2">
                      <User size={18} /> Full Name
                    </label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm mb-1 flex items-center gap-2">
                      <Mail size={18} /> Email Address
                    </label>
                    <Input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>

                  <div>
                    <label className="text-white text-sm mb-1 flex items-center gap-2">
                      <Lock size={18} /> Password
                    </label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-white/20 border-white/30 text-white"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-12 text-lg rounded-xl"
                  >
                    Send OTP
                  </Button>
                </form>
              )}

              {/* OTP FORM */}
              {step === "otp" && (
                <form onSubmit={verifyOtp} className="space-y-6">
                  <div>
                    <label className="text-white text-sm mb-1 flex items-center gap-2">
                      <ShieldCheck size={18} /> OTP Code
                    </label>
                    <Input
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      maxLength={6}
                      required
                      className="bg-white/20 border-white/30 text-white text-center tracking-widest"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-cyan-500 hover:bg-cyan-600 text-white h-12 text-lg rounded-xl"
                  >
                    Verify OTP
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <div className="hidden lg:flex items-center justify-center relative">
        <div className="h-[95vh] w-[90%] shadow-2xl rounded-3xl overflow-hidden relative">
          <img
            src="https://images.unsplash.com/photo-1603881359318-e2bc03deaaee?q=80&w=765&auto=format&fit=crop"
            alt="Car Rental"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
      </div>
    </section>
  );
}
