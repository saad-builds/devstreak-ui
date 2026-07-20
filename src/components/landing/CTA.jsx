import { Link } from "react-router-dom";
import { FiZap, FiArrowRight, FiCheckCircle } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function CTA() {
  const { user } = useAuth();

  return (
    <section className="py-28 px-6 bg-gray-950 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-[36px] border border-orange-500/20 bg-gradient-to-br from-orange-500/10 via-gray-900 to-gray-950 p-10 md:p-16">
          {/* Background glow */}
          <div className="absolute -top-32 -right-32 h-80 w-80 rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 h-80 w-80 rounded-full bg-orange-500/5 blur-3xl pointer-events-none" />

          <div className="relative text-center">
            {/* Icon Badge */}
            <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mx-auto mb-8">
              <FiZap size={32} />
            </div>

            <h2 className="text-4xl md:text-5xl font-black leading-tight text-white">
              Your future self
              <br />
              <span className="text-orange-400">will thank you.</span>
            </h2>

            <p className="mt-6 text-lg text-gray-400 leading-8 max-w-2xl mx-auto">
              Every expert started with Day 1. Every impressive GitHub profile
              began with a single commit. Your streak starts today.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-orange-500 px-8 py-4 text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:bg-orange-400"
              >
                <span>{user ? "Go to Dashboard" : "Start Your Streak"}</span>
                <FiArrowRight size={18} />
              </Link>

              {!user && (
                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center rounded-2xl border border-gray-800 bg-gray-900 px-8 py-4 text-base font-semibold text-gray-300 transition-all duration-300 hover:border-orange-500/40 hover:bg-gray-800 hover:text-white"
                >
                  I already have an account
                </Link>
              )}
            </div>

            {/* Feature Checklist */}
            <div className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-orange-400" size={16} />
                <span>Free to start</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-orange-400" size={16} />
                <span>Built for developers</span>
              </div>

              <div className="flex items-center gap-2">
                <FiCheckCircle className="text-orange-400" size={16} />
                <span>Track progress daily</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}