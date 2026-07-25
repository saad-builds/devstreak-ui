import { Link, useNavigate } from "react-router-dom";
import { FiAlertCircle, FiHome, FiLayout, FiArrowLeft } from "react-icons/fi";
import { useAuth } from "../context/AuthContext"; // Adjust import path if needed

export default function NotFound() {
  const { user } = useAuth() || {};
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Decorative Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative text-center max-w-lg mx-auto space-y-6">
        {/* Subtle Icon Badge */}
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 text-orange-500 shadow-xl mb-2">
          <FiAlertCircle size={32} />
        </div>

        {/* Heading & Subtitle */}
        <div className="space-y-2">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-orange-400 bg-orange-500/10 border border-orange-500/20">
            404 Error
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Page Not Found
          </h1>
        </div>

        {/* Clear, Helpful Description */}
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed max-w-md mx-auto">
          The page you're trying to reach doesn't exist. It might have been moved, deleted, or the URL may contain a typo.
        </p>

        {/* Adaptive Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          {user ? (
            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors duration-200 shadow-lg shadow-orange-500/20"
            >
              <FiLayout size={18} />
              <span>Go to Dashboard</span>
            </Link>
          ) : (
            <Link
              to="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors duration-200 shadow-lg shadow-orange-500/20"
            >
              <FiHome size={18} />
              <span>Back to Home</span>
            </Link>
          )}

          <button
            onClick={() => navigate(-1)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gray-900 border border-gray-800 hover:bg-gray-800/80 text-gray-300 font-semibold px-6 py-3 rounded-xl text-sm transition-colors duration-200"
          >
            <FiArrowLeft size={18} />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
}