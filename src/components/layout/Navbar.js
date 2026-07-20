import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiZap, FiUser, FiLogOut, FiLayout } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isOnDashboard = location.pathname === "/dashboard";

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 text-xl font-black tracking-tight text-white group">
          <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
            <FiZap size={20} />
          </div>
          <span>
            Dev<span className="text-orange-400">Streak</span>
          </span>
        </Link>

        {/* Action Links */}
        {user ? (
          <div className="flex items-center gap-3 sm:gap-4">
            {!isOnDashboard && (
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 text-sm bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2 rounded-xl transition-all duration-300 shadow-md shadow-orange-500/20"
              >
                <FiLayout size={16} />
                <span>Dashboard</span>
              </Link>
            )}

            <Link
              to="/profile"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 px-3.5 py-2 rounded-xl transition-all"
            >
              <FiUser className="text-orange-400" size={16} />
              <span>{user.name}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-400 hover:text-red-400 px-3 py-2 rounded-xl transition-colors"
              title="Logout"
            >
              <FiLogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-3 sm:gap-4">
            <Link
              to="/login"
              className="text-gray-300 hover:text-white font-medium text-sm px-3 py-2 transition-colors"
            >
              Log in
            </Link>

            <Link
              to="/signup"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-md shadow-orange-500/20"
            >
              <span>Get started free</span>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}