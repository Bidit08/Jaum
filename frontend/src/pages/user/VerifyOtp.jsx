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

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

const VerifyOtp = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { name, email, password } = location.state;
  const [otp, setOtp] = useState("");

  const handleVerify = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/verify-otp",
        {
          name,
          email,
          password,
          otp,
        }
      );

      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Invalid OTP");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
      <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-xl">
        <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>

        <p className="text-gray-300 mb-4">OTP sent to: {email}</p>

        <input
          type="text"
          placeholder="Enter OTP"
          className="w-full p-3 rounded bg-white/20 text-white"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />

        <button
          onClick={handleVerify}
          className="mt-4 w-full py-3 rounded bg-cyan-500 hover:bg-cyan-600 text-white"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default VerifyOtp;
