import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

// Attach token to every request if it exists
API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;

