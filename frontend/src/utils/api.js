import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = (data) => API.post("/auth/login", data);
export const signup = (data) => API.post("/auth/signup", data);
export const logout = () => {
  localStorage.removeItem("token");
  return Promise.resolve();
}

export const savePassword = (data) => API.post("/passwords", data);
export const getPasswords = () => API.get("/passwords");
export const deletePassword = (id) => API.delete(`/passwords/${id}`);
export const updatePassword = (id, data) => API.put(`/passwords/${id}`, data);
