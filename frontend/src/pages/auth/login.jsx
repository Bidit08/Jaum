// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Eye, EyeOff, Mail, Lock, Car, ArrowRight } from "lucide-react";
// import api from "../../utils/api";

// const Login = () => {
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
//       const res = await api.post("/auth/login", { email, password });
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
//         {/* Left Side - Login Form */}
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

//             {/* Login Card */}
//             <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 sm:p-8">
//               {/* Header */}
//               <div className="text-center mb-8">
//                 <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
//                   Welcome Back
//                 </h2>
//                 <p className="text-gray-300 text-sm sm:text-base">
//                   Sign in to your account to continue
//                 </p>
//               </div>

//               {/* Error Message */}
//               {error && (
//                 <div className="bg-red-500/20 border border-red-500/30 text-red-200 px-4 py-3 rounded-lg mb-6 text-sm">
//                   {error}
//                 </div>
//               )}

//               {/* Login Form */}
//               <form onSubmit={handleSubmit} className="space-y-6">
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
//                   <div className="flex items-center justify-between mb-2">
//                     <label className="flex items-center text-sm font-medium text-white">
//                       <Lock className="w-4 h-4 mr-2" />
//                       Password
//                     </label>
//                     <button
//                       type="button"
//                       onClick={() => navigate("/forgot-password")}
//                       className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors"
//                     >
//                       Forgot password?
//                     </button>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type={showPassword ? "text" : "password"}
//                       placeholder="••••••••"
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
//                       Signing in...
//                     </span>
//                   ) : (
//                     <span className="flex items-center">
//                       Sign In
//                       <ArrowRight className="ml-2 h-4 w-4" />
//                     </span>
//                   )}
//                 </button>
//               </form>

//               {/* Sign Up Link */}
//               <div className="text-center mt-6 pt-6 border-t border-white/10">
//                 <span className="text-sm text-gray-300">
//                   Don't have an account?{" "}
//                   <button
//                     onClick={() => navigate("/signup")}
//                     className="font-semibold text-cyan-400 hover:text-cyan-300 transition-colors"
//                   >
//                     Sign up
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

//         {/* Right Side - Larger Image Holder with Smaller Gap */}
//         <div className="hidden lg:flex flex-1 items-center justify-center p-4">
//           <div className="w-full h-full max-w-full max-h-[80vh] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex items-center justify-center">
//             <div className="text-center p-8">
//               <div className="w-96 h-96 mx-auto bg-white/20 rounded-2xl border-2 border-dashed border-white/30 flex items-center justify-center mb-6">
//                 <div className="text-center">
//                   <Car className="w-20 h-20 text-white/50 mx-auto mb-4" />
//                   <span className="text-white/50 text-xl block">
//                     Premium Car Image
//                   </span>
//                   <span className="text-white/30 text-sm block mt-2">
//                     Luxury Vehicle Showcase
//                   </span>
//                 </div>
//               </div>
//               <p className="text-white/60 text-sm max-w-md">
//                 Experience the finest collection of premium vehicles for your
//                 next journey
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import api from "../../utils/api";
// import { useNavigate } from "react-router-dom";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/"); // redirect to home
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-100">
//       <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
//         {error && <p className="text-red-500 mb-4">{error}</p>}
//         <form onSubmit={handleSubmit} className="space-y-4">
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
//             Login
//           </button>
//         </form>
//         <p className="text-sm text-gray-500 mt-4 text-center">
//           Don't have an account?{" "}
//           <span
//             className="text-blue-500 cursor-pointer"
//             onClick={() => navigate("/signup")}
//           >
//             Sign Up
//           </span>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Mail, Lock } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
//       {/* LEFT FORM */}
//       <div className="flex items-center justify-center px-6 lg:px-16 py-10 relative">
//         <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 w-full max-w-xl"
//         >
//           {/* Toggle */}
//           <div className="flex justify-center mb-8">
//             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 flex gap-2">
//               <Button className="bg-black/80 hover:bg-black text-white shadow">
//                 Login
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="text-white hover:bg-white/10"
//                 onClick={() => navigate("/signup")}
//               >
//                 Register
//               </Button>
//             </div>
//           </div>

//           {/* FORM CARD */}
//           <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl py-6 rounded-2xl">
//             <CardContent className="space-y-6">
//               <div className="text-center mb-4">
//                 <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
//                 <p className="text-gray-300">Login to continue</p>
//               </div>

//               {error && (
//                 <p className="text-red-400 text-center -mt-3">{error}</p>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
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
//                   className="w-full  bg-black/80 hover:bg-gray-800 text-white shadow h-12 text-lg rounded-xl"
//                 >
//                   Login
//                 </Button>
//               </form>

//               {/* Forget password */}
//               <div className="text-sm mt-3 text-center">
//                 <button
//                   onClick={() => navigate("/forgot-password")}
//                   className="text-cyan-400 hover:text-cyan-300 underline"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* RIGHT IMAGE */}
//       <div className="hidden lg:flex items-center justify-center relative">
//         <div className="h-[95vh] w-[90%] rounded-3xl overflow-hidden relative shadow-2xl">
//           <img
//             src="https://images.unsplash.com/photo-1603881359318-e2bc03deaaee?q=80&w=1400&auto=format&fit=crop"
//             alt="Car Rental"
//             className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
//           />
//           <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/30" />

//           <div className="absolute left-10 bottom-30 text-white z-20">
//             <h3 className="text-5xl font-semibold">Find the perfect ride</h3>
//             <br></br>
//             <p className="text-slate-200 mt-1 max-w-xs">
//               Rent fast, drive safe — curated picks for every journey.
//             </p>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Mail, Lock } from "lucide-react";
// import { motion } from "framer-motion";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");
//     setLoading(true);

//     try {
//       const res = await api.post("/auth/login", { email, password });

//       // Save token + user to localStorage and notify other components (Navbar)
//       localStorage.setItem("token", res.data.token);

//       // res.data expected: { _id, name, email, token }
//       const userObj = {
//         _id: res.data._id,
//         name: res.data.name,
//         email: res.data.email,
//       };
//       localStorage.setItem("user", JSON.stringify(userObj));

//       // Notify same-tab listeners to update UI
//       window.dispatchEvent(new Event("authChanged"));

//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
//       {/* LEFT FORM */}
//       <div className="flex items-center justify-center px-6 lg:px-16 py-10 relative">
//         <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="relative z-10 w-full max-w-xl"
//         >
//           {/* Toggle */}
//           <div className="flex justify-center mb-8">
//             <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 flex gap-2">
//               <Button className="bg-black/80 hover:bg-black text-white shadow">
//                 Login
//               </Button>
//               <Button
//                 variant="ghost"
//                 className="text-white hover:bg-white/10"
//                 onClick={() => navigate("/signup")}
//               >
//                 Register
//               </Button>
//             </div>
//           </div>

//           {/* FORM CARD */}
//           <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl py-6 rounded-2xl">
//             <CardContent className="space-y-6">
//               <div className="text-center mb-4">
//                 <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
//                 <p className="text-gray-300">Login to continue</p>
//               </div>

//               {error && (
//                 <p className="text-red-400 text-center -mt-3">{error}</p>
//               )}

//               <form onSubmit={handleSubmit} className="space-y-6">
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
//                   className="w-full  bg-black/80 hover:bg-gray-800 text-white shadow h-12 text-lg rounded-xl"
//                   disabled={loading}
//                 >
//                   {loading ? "Logging in..." : "Login"}
//                 </Button>
//               </form>

//               {/* Forget password */}
//               <div className="text-sm mt-3 text-center">
//                 <button
//                   onClick={() => navigate("/forgot-password")}
//                   className="text-cyan-400 hover:text-cyan-300 underline"
//                 >
//                   Forgot password?
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>

//       {/* RIGHT IMAGE */}
//       <div className="hidden lg:flex items-center justify-center relative">
//         <div className="h-[95vh] w-[90%] rounded-3xl overflow-hidden relative shadow-2xl">
//           <img
//             src="https://images.unsplash.com/photo-1603881359318-e2bc03deaaee?q=80&w=1400&auto=format&fit=crop"
//             alt="Car Rental"
//             className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
//           />
//           <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/30" />

//           <div className="absolute left-10 bottom-30 text-white z-20">
//             <h3 className="text-5xl font-semibold">Find the perfect ride</h3>
//             <br></br>
//             <p className="text-slate-200 mt-1 max-w-xs">
//               Rent fast, drive safe — curated picks for every journey.
//             </p>
//           </div>
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
import { Mail, Lock } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { email, password });

      // Save token + user to localStorage and notify other components (Navbar)
      localStorage.setItem("token", res.data.token);

      // res.data expected: { _id, name, email, token }
      const userObj = {
        _id: res.data._id,
        name: res.data.name,
        email: res.data.email,
      };
      localStorage.setItem("user", JSON.stringify(userObj));

      // Notify same-tab listeners to update UI
      window.dispatchEvent(new Event("authChanged"));

      toast.success("Logged in successfully");
      navigate("/");
    } catch (err) {
      const msg = err.response?.data?.message || "Something went wrong";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* LEFT FORM */}
      <div className="flex items-center justify-center px-6 lg:px-16 py-10 relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 w-full max-w-xl"
        >
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 flex gap-2">
              <Button className="bg-black/80 hover:bg-black text-white shadow">
                Login
              </Button>
              <Button
                variant="ghost"
                className="text-white hover:bg-white/10"
                onClick={() => navigate("/signup")}
              >
                Register
              </Button>
            </div>
          </div>

          {/* FORM CARD */}
          <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl py-6 rounded-2xl">
            <CardContent className="space-y-6">
              <div className="text-center mb-4">
                <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                <p className="text-gray-300">Login to continue</p>
              </div>

              {error && (
                <p className="text-red-400 text-center -mt-3">{error}</p>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="text-white text-sm mb-1 flex items-center gap-2">
                    <Mail size={18} /> Email Address
                  </label>
                  <Input
                    // type="email"
                    // name="email"
                    // autoComplete="email"
                    placeholder="you@example.com"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                {/* Password */}
                <div>
                  <label className="text-white text-sm mb-1 flex items-center gap-2">
                    <Lock size={18} /> Password
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    className="bg-white/20 border-white/30 text-white placeholder:text-gray-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full  bg-black/80 hover:bg-gray-800 text-white shadow h-12 text-lg rounded-xl"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </Button>
              </form>

              {/* Forget password */}
              <div className="text-sm mt-3 text-center">
                <button
                  onClick={() => navigate("/forgot-password")}
                  className="text-cyan-400 hover:text-cyan-300 underline"
                >
                  Forgot password?
                </button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="hidden lg:flex items-center justify-center relative">
        <div className="h-[95vh] w-[90%] rounded-3xl overflow-hidden relative shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1603881359318-e2bc03deaaee?q=80&w=1400&auto=format&fit=crop"
            alt="Car Rental"
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/30" />

          <div className="absolute left-10 bottom-30 text-white z-20">
            <h3 className="text-5xl font-semibold">Find the perfect ride</h3>
            <br />
            <p className="text-slate-200 mt-1 max-w-xs">
              Rent fast, drive safe — curated picks for every journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../utils/api";

// import { Card, CardContent } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { Mail, Lock } from "lucide-react";

// export default function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError("");

//     try {
//       const res = await api.post("/auth/login", { email, password });
//       localStorage.setItem("token", res.data.token);
//       navigate("/");
//     } catch (err) {
//       setError(err.response?.data?.message || "Something went wrong");
//     }
//   };

//   return (
//     <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl py-6 rounded-2xl">
//       <CardContent className="space-y-6">
//         <div className="text-center mb-4">
//           <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
//           <p className="text-gray-300">Login to continue</p>
//         </div>

//         {error && <p className="text-red-400 text-center -mt-3">{error}</p>}

//         <form onSubmit={handleSubmit} className="space-y-6">
//           <div>
//             <label className="text-white text-sm mb-1 flex items-center gap-2">
//               <Mail size={18} /> Email Address
//             </label>
//             <Input
//               className="bg-white/20 border-white/30 text-white"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>

//           <div>
//             <label className="text-white text-sm mb-1 flex items-center gap-2">
//               <Lock size={18} /> Password
//             </label>
//             <Input
//               type="password"
//               className="bg-white/20 border-white/30 text-white"
//               placeholder="••••••••"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//           </div>

//           <Button
//             type="submit"
//             className="w-full bg-cyan-500 text-white h-12 text-lg rounded-xl"
//           >
//             Login
//           </Button>
//         </form>

//         <p className="text-sm text-gray-300 text-center mt-2 hover:text-white transition cursor-pointer">
//           Forgot your password?
//         </p>
//       </CardContent>
//     </Card>
//   );
// }
