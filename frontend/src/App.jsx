import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
import Dashboard from "./pages/user/dashboard";
import VerifyOtp from "./pages/user/VerifyOtp";
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
      </Routes>
    </Router>
  );
}

export default App;
