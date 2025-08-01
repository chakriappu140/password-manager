import axios from "axios";
import {jwtDecode} from "jwt-decode";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

// Request interceptor to attach token and check expiration
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();
        if (isExpired) {
          localStorage.removeItem("token");
          window.location.href = "/login"; // force redirect
          throw new axios.Cancel("Token expired");
        }
        config.headers.Authorization = `Bearer ${token}`;
      } catch (err) {
        console.error("Invalid token", err);
        localStorage.removeItem("token");
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Authentication
export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
export const logout = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
};

// Password CRUD
export const savePassword = (data) => API.post("/passwords", data);
export const getPasswords = () => API.get("/passwords");
export const deletePassword = (id) => API.delete(`/passwords/${id}`);
export const updatePassword = (id, data) => API.put(`/passwords/${id}`, data);

export default API;
