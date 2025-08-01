import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { signup, login as apiLogin } from "../utils/api"; // rename login to apiLogin

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  let logoutTimer = null;

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    if (logoutTimer) clearTimeout(logoutTimer);
  };

  const setLogoutTimer = (exp) => {
    const now = Date.now();
    const timeUntilExpiry = exp * 1000 - now;
    if (timeUntilExpiry > 0) {
      logoutTimer = setTimeout(() => {
        logout();
        window.location.href = "/login";
      }, timeUntilExpiry);
    } else {
      logout();
    }
  };

  const login = (token) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    setLogoutTimer(decoded.exp);
  };

  const handleSignup = async (formData) => {
    const res = await signup(formData);
    login(res.data.token);
  };

  // ✅ Add this function
  const handleLogin = async (formData) => {
    const res = await apiLogin(formData);
    login(res.data.token);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
          logout();
        } else {
          setUser(decoded);
          setLogoutTimer(decoded.exp);
        }
      } catch (err) {
        console.error("Token decode error", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => localStorage.removeItem("token");
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, login, logout, loading, handleSignup, handleLogin }} // ✅ include handleLogin
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
