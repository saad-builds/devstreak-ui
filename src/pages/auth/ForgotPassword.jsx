import { useState } from "react";
import { Link } from "react-router-dom";
import { FiZap, FiMail, FiArrowLeft, FiCheckCircle } from "react-icons/fi";
import toast from "react-hot-toast";
import api from "../../utils/api";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return toast.error("Please enter your email address.");

    setLoading(true);
    try {
      const { data } = await api.post("/auth/forgot-password", { email });
      setIsSubmitted(true);
      toast.success(data.message || "Reset link sent!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Failed to send reset email. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        {/* Brand Logo */}
        <Link to="/" className="inline-flex items-center gap-3 text-2xl font-black tracking-tight text-white mb-6 group">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
            <FiZap size={22} />
          </div>
          <span>
            Dev<span className="text-orange-400">Streak</span>
          </span>
        </Link>

        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isSubmitted ? "Check your email" : "Reset your password"}
        </h2>
        <p className="mt-2 text-sm text-gray-400 max-w-sm mx-auto">
          {isSubmitted
            ? `If an account exists for ${email}, we have sent instructions to reset your password.`
            : "Enter the email associated with your account and we'll send you a link to reset your password."}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sm:p-8 shadow-xl">
          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-2">
                  Email Address
                </label>
                <div className="relative rounded-xl shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
                    <FiMail size={18} />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full bg-gray-950 border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all shadow-md shadow-orange-500/20"
              >
                {loading ? "Sending link..." : "Send Reset Link"}
              </button>
            </form>
          ) : (
            <div className="text-center py-4 space-y-4">
              <div className="w-12 h-12 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto">
                <FiCheckCircle size={24} />
              </div>
              <p className="text-sm text-gray-300">
                Didn't receive the email? Check your spam folder or try again.
              </p>
              <button
                onClick={() => setIsSubmitted(false)}
                className="text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
              >
                Try another email
              </button>
            </div>
          )}

          <div className="mt-6 pt-6 border-t border-gray-800 text-center">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              <FiArrowLeft size={16} />
              <span>Back to log in</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}