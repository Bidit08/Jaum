import { createContext, useContext, useState } from "react";
import api from "../utils/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const register = async (formData) => {
    try {
      const res = await api.post("/auth/register", formData);
      setUser(res.data.user);
      alert("Registration successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const login = async (email, password) => {
    try {
      const res = await api.post("/auth/login", { email, password });
      setUser(res.data.user);
      alert("Login successful!");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <AuthContext.Provider value={{ user, register, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
