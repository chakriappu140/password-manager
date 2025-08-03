import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  header: {
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

// API methods
export const login = (credentials) => API.post("/auth/login", credentials);

export const signup = (credentials) => API.post("/auth/signup", credentials);

export const getPasswords = async () => {
  const { data } = await API.get("/passwords");
  return data;
};

// Smart save: POST if new, PUT if updating
export const savePassword = async (form) => {
  if (form._id) {
    const { _id, ...rest } = form;
    const { data } = await API.put(`/passwords/${_id}`, rest);
    return data;
  } else {
    const { data } = await API.post("/passwords", form);
    return data;
  }
};

export const deletePassword = async (id) => {
  await API.delete(`/passwords/${id}`);
};
