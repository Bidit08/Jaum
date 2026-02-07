// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Home from "./pages/user/home";
// import Login from "./pages/auth/login";
// import Signup from "./pages/auth/signup";
// import Dashboard from "./pages/user/dashboard";
// import VerifyOtp from "./pages/auth/VerifyOtp";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import VerifyReset from "./pages/auth/VerifyReset";
// import ResetPassword from "./pages/auth/ResetPassword";
// import Profile from "./pages/user/Profile";
// import AddVehicle from "./pages/user/AddVehicle";
// // import MyVehicles from "./pages/user/MyVehicles";
// // import SecuritySettings from "./pages/user/SecuritySettings";
// import UserDashboardLayout from "./layouts/UserDashboardLayout";
// // import "./App.css";
// // import "./globals.css";

// function App() {
//   return (
//     <Router>
//       <ToastContainer position="top-right" autoClose={3000} />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/verify-otp" element={<VerifyOtp />} />

//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify-reset" element={<VerifyReset />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* <Route path="/profile" element={<Profile />} />

//         <Route path="/add-vehicle" element={<AddVehicle />} /> */}

//         {/* Protected Dashboard Layout */}
//         {/* <Route path="/dashboard" element={<UserDashboardLayout />}> */}
//         {/* <Route index element={<Dashboard />} /> */}
//         <Route path="profile" element={<Profile />} />
//         <Route path="add-vehicle" element={<AddVehicle />} />
//         {/* <Route path="vehicles" element={<MyVehicles />} />
//           <Route path="security" element={<SecuritySettings />} /> */}
//         {/* </Route> */}

//         <Route
//           path="*"
//           element={<h2 className="text-center mt-20">404 - Page Not Found</h2>}
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import Home from "./pages/user/home";
// import Login from "./pages/auth/login";
// import Signup from "./pages/auth/signup";
// import VerifyOtp from "./pages/auth/VerifyOtp";
// import ForgotPassword from "./pages/auth/ForgotPassword";
// import VerifyReset from "./pages/auth/VerifyReset";
// import ResetPassword from "./pages/auth/ResetPassword";

// import Dashboard from "./pages/user/Dashboard";
// import Profile from "./pages/user/Profile";
// import AddVehicle from "./pages/user/AddVehicle";
// // import MyVehicles from "./pages/user/MyVehicles";
// // import SecuritySettings from "./pages/user/SecuritySettings";

// import UserDashboardLayout from "./layouts/UserDashboardLayout";

// function App() {
//   return (
//     <Router>
//       <ToastContainer position="top-right" autoClose={3000} />

//       <Routes>
//         {/* ---------------- PUBLIC ROUTES ---------------- */}
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/signup" element={<Signup />} />

//         <Route path="/verify-otp" element={<VerifyOtp />} />
//         <Route path="/forgot-password" element={<ForgotPassword />} />
//         <Route path="/verify-reset" element={<VerifyReset />} />
//         <Route path="/reset-password" element={<ResetPassword />} />

//         {/* ---------------- DASHBOARD (PROTECTED) ---------------- */}
//         <Route path="/dashboard" element={<UserDashboardLayout />}>
//           <Route index element={<Dashboard />} />
//           <Route path="profile" element={<Profile />} />
//           <Route path="add-vehicle" element={<AddVehicle />} />
//           {/*
//           <Route path="vehicles" element={<MyVehicles />} />
//           <Route path="security" element={<SecuritySettings />} />
//           */}
//         </Route>

//         {/* ---------------- 404 ---------------- */}
//         <Route
//           path="*"
//           element={
//             <h2 className="text-center mt-20 text-xl font-semibold">
//               404 - Page Not Found
//             </h2>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import AdminDashboard from "./pages/admin/AdminDashboard";
import PendingListings from "./pages/admin/PendingListings";
import Home from "./pages/user/home";
import Login from "./pages/auth/login";
import Signup from "./pages/auth/signup";
import Dashboard from "./pages/user/dashboard/Dashboard";
import VerifyOtp from "./pages/auth/VerifyOtp";
import ForgotPassword from "./pages/auth/ForgotPassword";
import VerifyReset from "./pages/auth/VerifyReset";
import ResetPassword from "./pages/auth/ResetPassword";
import Profile from "./pages/user/dashboard/Profile";
import AddVehicle from "./pages/user/dashboard/AddVehicle";
import MyVehicles from "./pages/user/dashboard/MyListings";
import EditVehicle from "./pages/user/dashboard/editVehicle";
import AllListings from "./pages/user/AllListings";
import ListingDetails from "./pages/user/ListingDetails";
import OwnerBookings from "./components/bookings/OwnerBookings";

import UserDashboardLayout from "./layouts/UserDashboardLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import AuthRoute from "./routes/AuthRoute";

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />

      <Routes>
        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="listings" element={<PendingListings />} />
        </Route>

        {/* 🌍 Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/listings" element={<AllListings />} />
        <Route path="/listings/:id" element={<ListingDetails />} />

        {/* 🔐 Auth-only Routes (login/signup) */}
        <Route element={<AuthRoute />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-reset" element={<VerifyReset />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        {/* 🛡️ Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<UserDashboardLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="vehicles" element={<MyVehicles />} />
            <Route path="add-vehicle" element={<AddVehicle />} />
            <Route path="edit-vehicle/:id" element={<EditVehicle />} />
            {/* <Route path="edit-vehicle/:id" element={<EditVehicle />} /> */}
            {/* future routes */}
            {/* <Route path="vehicles" element={<MyVehicles />} /> */}
            {/* <Route path="security" element={<SecuritySettings />} /> */}
            <Route path="incoming-bookings" element={<OwnerBookings />} />
          </Route>
        </Route>

        {/* ❌ 404 */}
        <Route
          path="*"
          element={<h2 className="text-center mt-20">404 - Page Not Found</h2>}
        />
      </Routes>
    </Router>
  );
}

export default App;
