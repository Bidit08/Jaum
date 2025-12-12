import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/user/dashboard";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyReset from "./pages/auth/VerifyReset";
import ResetPassword from "./pages/auth/ResetPassword";
// import "./App.css";
// import "./globals.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />

        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/verify-reset" element={<VerifyReset />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
