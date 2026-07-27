import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../../utils/api";
import { useAuth } from "../../context/AuthContext";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const DOMAINS = [
  // Web
  "MERN Stack Developer",
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",

  // Mobile & Desktop
  "Mobile Developer",
  "Desktop Application Developer",

  // Infrastructure
  "DevOps Engineer",
  "Cloud Engineer",
  "Site Reliability Engineer (SRE)",

  // Data & AI
  "Data Engineer",
  "Data Scientist",
  "Machine Learning Engineer",
  "AI Engineer",

  // Security
  "Cybersecurity",

  // Specialized
  "Blockchain Developer",
  "Embedded Systems Engineer",
  "IoT Developer",
  "Game Developer",

  // General
  "Software Engineer",
  "QA / Test Automation",
  "UI/UX Designer",
  "Product Manager",
  "Technical Writer",
  "Student",
  "Other",
];

export default function Signup() {
  const { login, user } = useAuth();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    domain: "",
  });
  const [loading, setLoading] = useState(false);

  // 1. If already logged in, redirect straight away
  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.password || !form.domain) {
      return toast.error("All fields are required");
    }

    setLoading(true);
    try {
      const { data } = await api.post("/auth/signup", form);
      login(data.user, data.token);
      toast.success(`Welcome, ${data.user.name}! Your streak starts today 🔥`);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-between text-white">
      {/* Full Width Navbar */}
      <div className="w-full">
        <Navbar />
      </div>

      {/* Main Form Content with spacing */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="text-5xl mb-3">🔥</div>
            <h1 className="text-3xl font-bold text-white">Join DevStreak</h1>
            <p className="text-gray-400 mt-2">
              Build your daily dev habit. One day at a time.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-5 shadow-xl"
          >
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Name
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your full name"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

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
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
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
                placeholder="Min 6 characters"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Your Domain / Stack
              </label>
              <select
                name="domain"
                value={form.domain}
                onChange={handleChange}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
              >
                <option value="">Select your domain</option>
                {DOMAINS.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors text-lg"
            >
              {loading ? "Creating account..." : "Start My Streak 🔥"}
            </button>
          </form>

          <p className="text-center text-gray-500 mt-6 text-sm">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-orange-400 hover:text-orange-300 font-medium"
            >
              Log in
            </Link>
          </p>
        </div>
      </main>

      {/* Full Width Footer */}
      <div className="w-full">
        <Footer />
      </div>
    </div>
  );
}
