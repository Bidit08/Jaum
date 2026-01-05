import { Navigate, Outlet } from "react-router-dom";

const AuthRoute = () => {
  const token = localStorage.getItem("token");

  // ✅ If already logged in → go to dashboard
  if (token) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default AuthRoute;
