export default function DashboardPreview() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="text-center max-w-3xl mx-auto">

          <span className="text-orange-400 uppercase tracking-[0.25em] text-sm font-semibold">
            Dashboard Preview
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black">
            Everything you need,
            <br />
            right where you need it.
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            DevStreak brings together your daily reflections, coding streak,
            milestones, and progress into one beautiful developer dashboard.
          </p>

        </div>

        {/* Dashboard */}

        <div className="mt-20 rounded-[32px] border border-gray-800 bg-gray-900 overflow-hidden shadow-2xl">

          {/* Top Bar */}

          <div className="flex items-center justify-between border-b border-gray-800 px-8 py-5">

            <div>

              <p className="text-sm text-gray-500">
                Welcome back 👋
              </p>

              <h3 className="text-2xl font-bold mt-1">
                Muhammad
              </h3>

            </div>

            <button className="bg-orange-500 px-5 py-3 rounded-xl font-semibold hover:bg-orange-400 transition">
              Log Today 🔥
            </button>

          </div>

          {/* Content */}

          <div className="grid lg:grid-cols-3">

            {/* Left */}

            <div className="lg:col-span-2 border-r border-gray-800 p-8">

              <div className="bg-gray-950 rounded-2xl p-6 border border-gray-800">

                <p className="text-orange-400 text-sm uppercase tracking-widest">
                  Today's Reflection
                </p>

                <div className="mt-6 space-y-6">

                  <div>

                    <h4 className="font-semibold text-lg">
                      💻 What did you build?
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Built JWT Authentication with refresh tokens and protected routes.
                    </p>

                  </div>

                  <div>

                    <h4 className="font-semibold text-lg">
                      📚 What did you learn?
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Learned how Axios interceptors automatically refresh expired tokens.
                    </p>

                  </div>

                  <div>

                    <h4 className="font-semibold text-lg">
                      🐛 Biggest challenge
                    </h4>

                    <p className="text-gray-400 mt-2">
                      Fixed an infinite authentication refresh loop.
                    </p>

                  </div>

                </div>

              </div>

              {/* Heatmap */}

              <div className="mt-8 bg-gray-950 rounded-2xl border border-gray-800 p-6">

                <div className="flex justify-between mb-6">

                  <h4 className="font-semibold">
                    Coding Activity
                  </h4>

                  <span className="text-gray-500 text-sm">
                    Last 30 Days
                  </span>

                </div>

                <div className="grid grid-cols-10 gap-2">

                  {[...Array(50)].map((_, i) => (
                    <div
                      key={i}
                      className={`aspect-square rounded-sm ${
                        i % 4 === 0
                          ? "bg-orange-500"
                          : i % 3 === 0
                          ? "bg-orange-400/70"
                          : "bg-gray-800"
                      }`}
                    />
                  ))}

                </div>

              </div>

            </div>

            {/* Right */}

            <div className="p-8 space-y-6">

              <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6">

                <p className="text-gray-500 text-sm">
                  Current Streak
                </p>

                <h3 className="text-6xl font-black text-orange-400 mt-3">
                  28
                </h3>

                <p className="text-gray-500 mt-2">
                  consecutive days
                </p>

              </div>

              <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6">

                <p className="text-gray-500 text-sm">
                  Weekly Goal
                </p>

                <div className="mt-5 flex gap-2">

                  {["✔","✔","✔","✔","✖","○","○"].map((d) => (
                    <div
                      key={d}
                      className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        d === "✔"
                          ? "bg-orange-500 text-white"
                          : "bg-gray-800 text-gray-500"
                      }`}
                    >
                      {d}
                    </div>
                  ))}

                </div>

              </div>

              <div className="bg-gray-950 rounded-2xl border border-gray-800 p-6">

                <p className="text-gray-500 text-sm">
                  Next Milestone
                </p>

                <h4 className="text-2xl font-bold mt-3">
                  🔥 Day 30
                </h4>

                <div className="mt-5 h-2 bg-gray-800 rounded-full overflow-hidden">

                  <div className="w-[93%] bg-orange-500 h-full rounded-full" />

                </div>

                <p className="text-sm text-gray-500 mt-3">
                  Only 2 days left.
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}