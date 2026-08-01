import axios from "axios";

// Base URL of the backend API. Configured via .env (VITE_BACKEND_BASE).
const baseURL = import.meta.env.VITE_BACKEND_BASE ?? "http://localhost:8080";

const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
