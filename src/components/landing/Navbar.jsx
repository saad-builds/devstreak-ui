import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiZap, FiUser, FiLogOut, FiLayout, FiMenu, FiX, FiDownload } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import ExtensionSetupModal from "../landing/ExtensionSetupModal";

export function DashboardBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-white">Automate your streak tracking</h3>
          <p className="text-sm text-gray-400">Install our Chrome extension to log activity without leaving your tab.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2.5 rounded-xl text-sm transition-all whitespace-nowrap shadow-md shadow-orange-500/20"
        >
          Get Extension
        </button>
      </div>

      <ExtensionSetupModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isExtensionModalOpen, setIsExtensionModalOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/login");
  };

  const isOnDashboard = location.pathname === "/dashboard";

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-gray-800/80 bg-gray-950/80 backdrop-blur-md px-4 sm:px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Brand Logo */}
          <Link 
            to="/" 
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-3 text-xl font-black tracking-tight text-white group"
          >
            <div className="w-9 h-9 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300">
              <FiZap size={20} />
            </div>
            <span>
              Dev<span className="text-orange-400">Streak</span>
            </span>
          </Link>

          {/* Desktop Action Links */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            {/* Extension Download Trigger Button */}
            <button
              onClick={() => setIsExtensionModalOpen(true)}
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-gray-900 border border-gray-800 hover:border-gray-700 px-3.5 py-2 rounded-xl transition-all"
            >
              <FiDownload className="text-orange-400" size={16} />
              <span>Download Extension</span>
            </button>

            {user ? (
              <>
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
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-400 hover:text-white rounded-xl bg-gray-900 border border-gray-800 focus:outline-none"
            aria-label="Toggle menu"
          >
            {isOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <div className="md:hidden mt-4 pt-4 border-t border-gray-800/80 flex flex-col gap-3">
            {/* Mobile Extension Trigger Button */}
            <button
              onClick={() => {
                setIsOpen(false);
                setIsExtensionModalOpen(true);
              }}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-gray-900 border border-gray-800 px-3.5 py-2.5 rounded-xl transition-all w-full"
            >
              <FiDownload className="text-orange-400" size={16} />
              <span>Download Extension</span>
            </button>

            {user ? (
              <>
                {!isOnDashboard && (
                  <Link
                    to="/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center justify-center gap-2 text-sm bg-orange-500 hover:bg-orange-400 text-white font-bold px-4 py-2.5 rounded-xl transition-all shadow-md shadow-orange-500/20 w-full"
                  >
                    <FiLayout size={16} />
                    <span>Dashboard</span>
                  </Link>
                )}

                <Link
                  to="/profile"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-gray-300 hover:text-white bg-gray-900 border border-gray-800 px-3.5 py-2.5 rounded-xl transition-all w-full"
                >
                  <FiUser className="text-orange-400" size={16} />
                  <span>{user.name}</span>
                </Link>

                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center gap-1.5 text-sm font-medium text-red-400 hover:text-red-300 bg-red-500/10 border border-red-500/20 px-3 py-2.5 rounded-xl transition-colors w-full"
                >
                  <FiLogOut size={16} />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="text-center text-gray-300 hover:text-white font-medium text-sm py-2 bg-gray-900 border border-gray-800 rounded-xl transition-colors w-full"
                >
                  Log in
                </Link>

                <Link
                  to="/signup"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-400 text-white font-bold px-5 py-2.5 rounded-xl text-sm transition-all duration-300 shadow-md shadow-orange-500/20 w-full"
                >
                  <span>Get started free</span>
                </Link>
              </>
            )}
          </div>
        )}
      </nav>

      {/* Extension Modal mounted at root level of Navbar */}
      <ExtensionSetupModal
        isOpen={isExtensionModalOpen}
        onClose={() => setIsExtensionModalOpen(false)}
      />
    </>
  );
}