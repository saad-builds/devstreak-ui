import axios from "axios";
import toast from "react-hot-toast";

// 1. Properly pull Vite's environment variable
const API_URL = import.meta.env.VITE_API_URL;
console.log("API_URL =", API_URL);

const api = axios.create({
  baseURL: API_URL, // Uses VITE_API_URL (e.g. https://devstreak-backend.vercel.app/api)
  withCredentials: true, // Crucial for HttpOnly cookies
});

// Attach access token to every request header
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Response Interceptor: Handles Token Refresh, 500s, and Network Errors
api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const original = err.config;
    const isDev = import.meta.env.DEV;

    // 1. Handle Network / Connection Offline Errors
    if (!err.response) {
      toast.error(
        isDev
          ? "Network error: Backend server is offline (check local port)."
          : "Unable to connect to DevStreak. Please check your internet connection."
      );
      return Promise.reject(err);
    }

    // 2. Handle Server Errors (500+)
    if (err.response.status >= 500) {
      toast.error(
        isDev
          ? `Server Error (${err.response.status}): ${err.response.data?.message || "Check server logs."}`
          : "Server error occurred. Please try again later."
      );
      return Promise.reject(err);
    }

    // 3. Skip auto-refresh for explicit auth endpoints
    if (
      original?.url?.includes("/auth/login") ||
      original?.url?.includes("/auth/signup") ||
      original?.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(err);
    }

    // 4. Token Refresh Logic (401) using HttpOnly Cookie
    if (err.response.status === 401 && !original._retry) {
      original._retry = true;

      try {
        // Send post request withCredentials so browser automatically attaches the HttpOnly cookie
        const { data } = await axios.post(
          `${API_URL}/auth/refresh`,
          {},
          { withCredentials: true }
        );

        localStorage.setItem("token", data.token);
        original.headers.Authorization = `Bearer ${data.token}`;

        return api(original);
      } catch (refreshErr) {
        localStorage.removeItem("token");

        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }

        return Promise.reject(refreshErr);
      }
    }

    return Promise.reject(err);
  }
);

export default api;