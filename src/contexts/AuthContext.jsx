import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Check if admin is logged in on app load
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("adminToken");
      if (token) {
        try {
          console.log(
            "Checking auth with token:",
            token.substring(0, 20) + "..."
          );
          const response = await axios.get("/api/auth/me");
          console.log("Auth check response:", response.data);
          setAdmin(response.data.admin);
        } catch (error) {
          console.error("Auth check error:", error);
          localStorage.removeItem("adminToken");
          delete axios.defaults.headers.common["Authorization"];
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      console.log("Attempting login with:", { email, password: "***" });
      console.log("Axios base URL:", axios.defaults.baseURL);

      const response = await axios.post("/api/auth/login", { email, password });
      console.log("Login response:", response.data);

      const { token, admin: adminData } = response.data;

      localStorage.setItem("adminToken", token);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      setAdmin(adminData);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      console.error("Error response:", error.response);
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    delete axios.defaults.headers.common["Authorization"];
    setAdmin(null);
  };

  const value = {
    admin,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
