/* global chrome */
import { createContext, useContext, useState, useEffect, useCallback } from "react";
import api from "../utils/api";

const EXTENSION_ID = "pblljelmjikhiiafpldhciighgnjaddm";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user session on refresh
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      api
        .get("/auth/me")
        .then((res) => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Handle Login
  const login = useCallback((userData, token) => {
    setUser(userData);

    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);

    // Notify Chrome extension
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(EXTENSION_ID, { type: "SET_TOKEN", token }, () => {
        if (chrome.runtime.lastError) {
          // Extension inactive or not installed — ignore
        }
      });
    }
  }, []);

  // Handle Logout
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);

    // Notify Chrome extension on logout
    if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.sendMessage) {
      chrome.runtime.sendMessage(EXTENSION_ID, { type: "LOGOUT" }, () => {
        if (chrome.runtime.lastError) {
          // Extension inactive or not installed — ignore
        }
      });
    }
  }, []);

  const updateUser = useCallback((userData) => setUser(userData), []);

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);