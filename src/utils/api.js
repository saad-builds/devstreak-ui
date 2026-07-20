import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// Auto-refresh expired access token (NOT for auth endpoints)
api.interceptors.response.use(
  (response) => response,
  async (err) => {
    const original = err.config;

    // Never try to refresh for authentication endpoints.
    // Let Login.js / Signup.js handle these errors themselves.
    if (
      original?.url?.includes("/auth/login") ||
      original?.url?.includes("/auth/signup") ||
      original?.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(err);
    }

    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        const { data } = await axios.post(
          `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/auth/refresh`,
          { refreshToken }
        );

        localStorage.setItem("token", data.token);

        original.headers.Authorization = `Bearer ${data.token}`;

        return api(original);
      } catch {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");

        // Only redirect if we're not already on the login page
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    }

    return Promise.reject(err);
  }
);

export default api;