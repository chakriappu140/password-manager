import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: { // Corrected 'header' to 'headers' - minor but important
    "Content-Type": "application/json"
  }
});

// Add JWT to all requests
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle global errors
API.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message || "An error occurred. Please try again.";
    throw new Error(message);
  }
);

// API methods - ADDING '/api' PREFIX HERE
export const login = (credentials) => API.post("/api/auth/login", credentials); // <-- Change!

export const signup = (credentials) => API.post("/api/auth/signup", credentials); // <-- Change!

export const getPasswords = async () => {
  const { data } = await API.get("/api/passwords"); // <-- Change!
  return data;
};

// Smart save: POST if new, PUT if updating
export const savePassword = async (form) => {
  if (form._id) {
    const { _id, ...rest } = form;
    const { data } = await API.put(`/api/passwords/${_id}`, rest); // <-- Change!
    return data;
  } else {
    const { data } = await API.post("/api/passwords", form); // <-- Change!
    return data;
  }
};

export const deletePassword = async (id) => {
  await API.delete(`/api/passwords/${id}`); // <-- Change!
};