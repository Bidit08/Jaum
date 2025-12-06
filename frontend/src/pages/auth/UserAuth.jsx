import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { Navigate } from "react-router-dom";
import UserLogin from "./UserLogin";
import UserSignup from "./UserSignup";

const UserAuth = () => {
  const { isAuthenticated } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-5xl flex rounded-xl shadow-xl overflow-hidden">
        {/* Left Image */}
        <div
          className="hidden md:block w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1693948458360-c05c436177a8?q=80&w=2574&auto=format&fit=crop')",
          }}
        ></div>

        {/* Auth Box */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center bg-card">
          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex bg-muted p-1 rounded-lg">
              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition ${
                  isLogin
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => setIsLogin(true)}
              >
                Login
              </button>

              <button
                className={`px-6 py-2 rounded-md text-sm font-medium transition ${
                  !isLogin
                    ? "bg-primary text-primary-foreground shadow"
                    : "text-foreground hover:bg-accent"
                }`}
                onClick={() => setIsLogin(false)}
              >
                Register
              </button>
            </div>
          </div>

          {/* Dynamic Form */}
          {isLogin ? <UserLogin /> : <UserSignup />}
        </div>
      </div>
    </div>
  );
};

export default UserAuth;
