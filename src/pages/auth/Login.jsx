import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function Login() {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Redirect logged-in users to dashboard if they manually visit /login
  useEffect(() => {
    if (user && !sessionStorage.getItem("justLoggedIn")) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setError("Email and password are required");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/auth/login", {
        email: form.email,
        password: form.password,
      });

      // 1. Set one-time session key BEFORE logging in / navigating
      sessionStorage.setItem("justLoggedIn", "true");

      login(response.data.user, response.data.token);

      // 2. Navigate to /welcome
      navigate("/welcome", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-between text-white">
      <div className="w-full">
        <Navbar />
      </div>

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🔥</div>
            <h1 className="text-3xl font-bold text-white">Welcome back</h1>
            <p className="text-gray-400 mt-2">Keep your streak alive.</p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5 shadow-xl"
          >
            {error && (
              <div className="bg-red-900/40 border border-red-800 text-red-300 text-sm px-4 py-3 rounded-lg font-medium flex items-center gap-2">
                <span>⚠️</span>
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@email.com"
                autoComplete="email"
                className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  error
                    ? "border-red-700"
                    : "border-gray-700 focus:border-orange-500"
                }`}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="Your password"
                autoComplete="current-password"
                className={`w-full bg-gray-800 border rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none transition-colors ${
                  error
                    ? "border-red-700"
                    : "border-gray-700 focus:border-orange-500"
                }`}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors text-lg"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>
          <div className="mt-6 flex justify-between items-center text-sm text-gray-400">
            <Link
              to="/forgot-password"
              className="hover:text-white transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <p className="text-center text-gray-500 mt-6 text-sm">
            No account?{" "}
            <Link
              to="/signup"
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              Sign up free
            </Link>
          </p>
        </div>
      </main>

      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
