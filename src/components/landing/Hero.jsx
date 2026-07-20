import { Link } from "react-router-dom";
import { FiZap, FiArrowRight, FiCheckCircle, FiCode, FiBookOpen, FiTerminal } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";

export default function Hero() {
  const { user } = useAuth();

  return (
    <section className="relative bg-gray-950 text-white min-h-[90vh] lg:min-h-screen flex flex-col justify-center pb-28 pt-12">
      {/* Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute left-1/2 top-32 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-orange-500/10 blur-[140px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          
          {/* Left Column */}
          <div>
            {/* Top Pill Badge */}
            <div className="inline-flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-full px-4 py-2 text-xs font-semibold text-orange-400 mb-8">
              <FiZap size={14} />
              <span>Built exclusively for developers</span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl lg:text-7xl font-black leading-[1.08] tracking-tight">
              Build.
              <br />
              Learn.
              <br />
              <span className="text-orange-400">Repeat.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-400 text-lg leading-8 mt-8 max-w-xl">
              DevStreak helps developers build consistency by logging what they
              build, what they learn, and keeping their coding streak alive every
              single day.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mt-10">
              <Link
                to={user ? "/dashboard" : "/signup"}
                className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:scale-105 shadow-lg shadow-orange-500/20"
              >
                <span>{user ? "Open Dashboard" : "Start Your Streak"}</span>
                <FiArrowRight size={18} />
              </Link>

              {!user && (
                <Link
                  to="/login"
                  className="inline-flex items-center border border-gray-800 bg-gray-900/60 hover:border-orange-500/40 hover:bg-gray-800 text-gray-300 hover:text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>

          {/* Right Column (Mock Dashboard Card) */}
          <div className="relative">
            {/* Floating Badge Left */}
            <div className="absolute -left-4 -top-4 z-10 flex items-center gap-2 bg-orange-500 text-white px-4 py-2.5 rounded-2xl font-bold shadow-xl shadow-orange-500/20 -rotate-3 border border-orange-400">
              <FiZap size={16} />
              <span>Day 28 Streak</span>
            </div>

            {/* Floating Badge Right */}
            <div className="absolute -right-4 -bottom-4 z-10 flex items-center gap-2 bg-emerald-500 text-white px-4 py-2.5 rounded-2xl font-bold shadow-xl shadow-emerald-500/20 rotate-3 border border-emerald-400">
              <FiCheckCircle size={16} />
              <span>Logged Today</span>
            </div>

            {/* Dashboard Card Preview */}
            <div className="bg-gray-900/90 border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
              <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-800">
                <div>
                  <p className="text-gray-500 text-xs uppercase tracking-wider font-semibold">
                    Today's Mission
                  </p>
                  <h2 className="text-2xl font-bold text-white mt-1">
                    Build something real.
                  </h2>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                  <FiTerminal size={22} />
                </div>
              </div>

              {/* Activity Logs */}
              <div className="space-y-4">
                <div className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
                    <FiCode size={14} />
                    <span>Built Today</span>
                  </div>
                  <p className="text-gray-200 font-medium">
                    JWT Authentication with Refresh Tokens
                  </p>
                </div>

                <div className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5">
                  <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
                    <FiBookOpen size={14} />
                    <span>Learned</span>
                  </div>
                  <p className="text-gray-200 font-medium">
                    Axios Response Interceptors & Error Handling
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-8 pt-4">
                <div className="flex justify-between text-xs text-gray-400 font-medium mb-2.5">
                  <span>Monthly Goal</span>
                  <span className="text-orange-400 font-bold">28 / 30 Days</span>
                </div>

                <div className="w-full h-3 rounded-full bg-gray-950 overflow-hidden border border-gray-800">
                  <div className="w-[93%] h-full bg-gradient-to-r from-orange-600 to-orange-400 rounded-full" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Half-Visible Fold Bar */}
      <div className="absolute bottom-0 left-0 right-0 transform translate-y-1/2 z-20 px-6">
        <div className="max-w-5xl mx-auto bg-gray-900/95 border border-gray-800/90 rounded-3xl p-6 lg:p-8 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-3 gap-6 text-center divide-x divide-gray-800">
            <div>
              <h3 className="text-3xl lg:text-4xl font-black text-white">2 min</h3>
              <p className="text-gray-400 text-xs lg:text-sm mt-1 font-medium">
                Daily reflection
              </p>
            </div>

            <div>
              <h3 className="text-3xl lg:text-4xl font-black text-white">30+</h3>
              <p className="text-gray-400 text-xs lg:text-sm mt-1 font-medium">
                Day heatmap
              </p>
            </div>

            <div>
              <h3 className="text-3xl lg:text-4xl font-black text-white">100%</h3>
              <p className="text-gray-400 text-xs lg:text-sm mt-1 font-medium">
                Developer focused
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}