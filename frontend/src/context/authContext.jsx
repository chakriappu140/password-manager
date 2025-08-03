import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { signup as apiSignup, login as apiLogin } from "../utils/api";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        setUser(decoded);
        const timeout = decoded.exp * 1000 - Date.now();
        setTimeout(() => logout(), timeout);
      } else {
        logout();
      }
    }
    setTimeout(() => setLoading(false), 500);
  }, []);

  const signup = async data => {
    const res = await apiSignup(data);             // ✅ signup API call
    loginWithToken(res.data.token);                // ✅ Use token directly
  };

  const login = async data => {
    const res = await apiLogin(data);              // ✅ login expects { email, password }
    loginWithToken(res.data.token);
  };

  const loginWithToken = token => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode(token);
    setUser(decoded);
    const timeout = decoded.exp * 1000 - Date.now();
    setTimeout(() => logout(), timeout);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
