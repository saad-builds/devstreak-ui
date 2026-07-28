import { Link } from "react-router-dom";
import { FiZap, FiGithub, FiLinkedin, FiTwitter } from "react-icons/fi";
import { SiX } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800/80 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                <FiZap size={22} />
              </div>

              <span className="text-2xl font-black tracking-tight text-white">
                DevStreak
              </span>
            </div>

            <p className="mt-5 text-gray-400 text-base leading-relaxed max-w-md">
              Built for developers who believe consistency beats motivation.
              Show up. Learn something new. Build every day.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-bold text-white text-base mb-5">Product</h3>

            <div className="space-y-3 text-sm">
              <a
                href="#features"
                className="block text-gray-400 hover:text-orange-400 transition-colors"
              >
                Features
              </a>

              <a
                href="#how-it-works"
                className="block text-gray-400 hover:text-orange-400 transition-colors"
              >
                How it Works
              </a>

              <a
                href="#faq"
                className="block text-gray-400 hover:text-orange-400 transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          {/* Account */}
          <div>
            <h3 className="font-bold text-white text-base mb-5">Account</h3>

            <div className="space-y-3 text-sm">
              <Link
                to="/signup"
                className="block text-gray-400 hover:text-orange-400 transition-colors"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="block text-gray-400 hover:text-orange-400 transition-colors"
              >
                Login
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} DevStreak. Built by developers, for
            developers.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/40 transition-all"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/40 transition-all"
              aria-label="LinkedIn"
            >
              <FiLinkedin size={18} />
            </a>

            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-900 border border-gray-800 flex items-center justify-center text-gray-400 hover:text-orange-400 hover:border-orange-500/40 transition-all"
              aria-label="X (Twitter)"
            >
              <SiX size={16} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
} 