import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/user/home";
import Login from "./pages/user/login";
import Signup from "./pages/user/signup";
// import "./App.css";
// import "./globals.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
