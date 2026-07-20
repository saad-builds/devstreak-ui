import {
  FiBookOpen,
  FiActivity,
  FiAward,
  FiTrendingUp,
  FiShare2,
  FiCode,
} from "react-icons/fi";

const features = [
  {
    icon: <FiBookOpen size={22} />,
    title: "Daily Developer Journal",
    subtitle: "Build • Learn • Reflect",
  },
  {
    icon: <FiActivity size={22} />,
    title: "GitHub-style Activity",
    subtitle: "Visualize your consistency",
  },
  {
    icon: <FiAward size={22} />,
    title: "Developer Milestones",
    subtitle: "Unlock achievements",
  },
  {
    icon: <FiTrendingUp size={22} />,
    title: "Monthly Insights",
    subtitle: "Understand your progress",
  },
  {
    icon: <FiShare2 size={22} />,
    title: "Share Your Progress",
    subtitle: "Beautiful achievement cards",
  },
  {
    icon: <FiCode size={22} />,
    title: "Built Only for Developers",
    subtitle: "Nothing generic. Just code.",
  },
];

export default function Features() {
  return (
    <section className="py-28 px-6 bg-gray-950">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <span className="text-orange-400 uppercase tracking-[0.3em] text-sm font-semibold">
            Features
          </span>

          <h2 className="text-4xl md:text-5xl font-black text-white mt-5 leading-tight">
            Everything you need to become
            <br />
            a more consistent developer.
          </h2>

          <p className="text-gray-400 text-lg leading-8 mt-6">
            Built around the daily workflow of developers, not generic habit
            tracking.
          </p>
        </div>

        {/* Features Grid Container */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
              {features[0].icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {features[0].title}
            </h3>

            <p className="text-gray-500 mt-2">{features[0].subtitle}</p>

            <div className="mt-7 rounded-2xl bg-black/30 border border-gray-800 p-5 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400 text-sm">Today's Journal</span>
                <span className="text-green-400 text-xs">Saved</span>
              </div>

              <div className="space-y-3 text-sm text-gray-300">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  Built JWT authentication
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500" />
                  Learned refresh tokens
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Fixed Axios interceptor
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
              {features[1].icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {features[1].title}
            </h3>

            <p className="text-gray-500 mt-2">{features[1].subtitle}</p>

            <div className="grid grid-cols-7 gap-1 mt-8">
              {[...Array(49)].map((_, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-sm ${
                    i % 5 === 0
                      ? "bg-orange-500"
                      : i % 3 === 0
                      ? "bg-orange-400/60"
                      : "bg-gray-800"
                  }`}
                />
              ))}
            </div>

            <p className="text-xs text-gray-500 mt-4">Last 7 weeks</p>
          </div>

          {/* Card 3 */}
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
              {features[2].icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {features[2].title}
            </h3>

            <p className="text-gray-500 mt-2">{features[2].subtitle}</p>

            <div className="mt-8 space-y-3">
              {["Day 7", "Day 30", "Day 100", "Day 365"].map((item, index) => (
                <div
                  key={item}
                  className={`flex justify-between rounded-xl px-4 py-3 ${
                    index === 0
                      ? "bg-orange-500 text-white"
                      : "bg-black/30 text-gray-400"
                  }`}
                >
                  <span>{item}</span>
                  <span>{index === 0 ? "Unlocked" : "Locked"}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Card 4 */}
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
              {features[3].icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {features[3].title}
            </h3>

            <p className="text-gray-500 mt-2">{features[3].subtitle}</p>

            <div className="mt-8 space-y-5">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Coding Days</span>
                  <span className="text-white">24</span>
                </div>

                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div className="w-4/5 h-full bg-orange-500 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Concepts Learned</span>
                  <span className="text-white">17</span>
                </div>

                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div className="w-3/5 h-full bg-orange-400 rounded-full" />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-400">Projects</span>
                  <span className="text-white">8</span>
                </div>

                <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                  <div className="w-2/5 h-full bg-white rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Card 5 */}
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
              {features[4].icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {features[4].title}
            </h3>

            <p className="text-gray-500 mt-2">{features[4].subtitle}</p>

            <div className="mt-8 rounded-2xl bg-black/30 border border-gray-800 p-5">
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-orange-400 text-sm font-semibold">
                    DEVSTREAK
                  </div>

                  <div className="text-4xl font-black mt-2 text-white">
                    Day 28
                  </div>

                  <div className="text-gray-500 text-sm mt-2">
                    Consistency beats motivation.
                  </div>
                </div>

                <div className="text-5xl">🔥</div>
              </div>
            </div>
          </div>

          {/* Card 6 */}
          <div className="rounded-3xl border border-gray-800 bg-gray-900 p-7 hover:border-orange-500/40 transition">
            <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-400 mb-5">
              {features[5].icon}
            </div>

            <h3 className="text-2xl font-bold text-white">
              {features[5].title}
            </h3>

            <p className="text-gray-500 mt-2">{features[5].subtitle}</p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                "Projects",
                "Bugs Fixed",
                "Concepts",
                "Commits",
                "Learning",
                "Progress",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-gray-800 bg-black/30 py-3 text-center text-sm text-gray-300"
                >
                  {item}
                </div>
              ))}
            </div>

            <p className="mt-6 text-sm text-gray-500 leading-7">
              No water tracking. No workouts. No generic habits. Just software
              development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}