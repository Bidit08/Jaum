import React, { useState } from "react";
import Login from "./login"; // imports default export from login.jsx
import Signup from "./signup"; // imports default export from signup.jsx

export default function AuthLayout() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <section className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* LEFT — Form Column */}
      <div className="flex items-center justify-center px-6 lg:px-16 py-10 relative">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:60px_60px]" />

        <div className="relative z-10 w-full max-w-xl">
          {/* Toggle */}
          <div className="flex justify-center mb-8">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-1 flex gap-2">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  isLogin
                    ? "bg-cyan-500 text-white shadow"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Login
              </button>

              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                  !isLogin
                    ? "bg-cyan-500 text-white shadow"
                    : "text-white hover:bg-white/10"
                }`}
              >
                Register
              </button>
            </div>
          </div>

          {/* Render the selected form component (Login or Signup) */}
          {isLogin ? <Login /> : <Signup />}
        </div>
      </div>

      {/* RIGHT — Image / Hero (desktop only) */}
      <div className="hidden lg:flex items-center justify-center relative">
        <div className="h-[95vh] w-[90%] rounded-3xl overflow-hidden relative shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1603881359318-e2bc03deaaee?q=80&w=1400&auto=format&fit=crop"
            alt="Hero"
            className="w-full h-full object-cover transform scale-105 hover:scale-100 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/30 via-transparent to-black/30" />

          <div className="absolute left-10 bottom-30 text-white z-20">
            <h3 className="text-5xl font-semibold">Find the perfect ride</h3>
            <p className="text-slate-200 mt-1 max-w-xs">
              Rent fast, drive safe — curated picks for every journey.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
