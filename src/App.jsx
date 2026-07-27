import { useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

import Welcome from "./pages/Welcome";
import Landing from "./pages/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/Dashboard";
import CheckIn from "./pages/CheckIn";
import History from "./pages/History";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

// Helper component to update document title dynamically based on current route
function TitleUpdater() {
  const location = useLocation();

  useEffect(() => {
    const titles = {
      "/": "DevStreak | Track Daily Developer Streaks",
      "/login": "Log In | DevStreak",
      "/signup": "Sign Up | DevStreak",
      "/dashboard": "Dashboard | DevStreak",
      "/checkin": "Daily Check-In | DevStreak",
      "/history": "Streak History | DevStreak",
      "/profile": "Your Profile | DevStreak",
      "/welcome": "Welcome | DevStreak",
    };

    document.title =
      titles[location.pathname] || "DevStreak | Developer Habit Tracker";
  }, [location]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <TitleUpdater />
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#1f2937",
              color: "#f9fafb",
              border: "1px solid #374151",
            },
            success: { iconTheme: { primary: "#f97316", secondary: "#fff" } },
          }}
        />
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route
              path="/forgot-password"
              element={
                  <ForgotPassword />
              }
            />
            <Route
              path="/reset-password/:resetToken"
              element={
                  <ResetPassword />
              }
            />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/checkin"
            element={
              <ProtectedRoute>
                <CheckIn />
              </ProtectedRoute>
            }
          />
          <Route
            path="/history"
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <Welcome />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
