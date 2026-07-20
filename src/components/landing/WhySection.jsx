import { FiTrendingDown, FiTrendingUp, FiZap } from "react-icons/fi";

const reasons = [
  {
    title: "Motivation fades.",
    text: "Courses, tutorials and roadmaps are exciting for a week. Consistency is what actually makes you improve.",
    Icon: FiTrendingDown,
  },
  {
    title: "Small progress compounds.",
    text: "One bug fixed. One concept learned. One project improved. Tiny wins every day become massive growth over time.",
    Icon: FiTrendingUp,
  },
  {
    title: "Developers need proof.",
    text: "Track your journey, celebrate milestones, and build a history of your progress you can actually look back on.",
    Icon: FiZap,
  },
];

export default function WhySection() {
  return (
    <section className="py-28 px-6 bg-gray-950 text-white">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-orange-400 uppercase tracking-[0.25em] text-sm font-semibold">
            Why DevStreak?
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight text-white">
            Becoming a better developer
            <br />
            isn't about motivation.
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8">
            It's about showing up every day, even when you don't feel like it.
            DevStreak keeps you accountable by turning daily coding into a habit.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-8 mt-20">
          {reasons.map((item) => {
            const IconComponent = item.Icon;
            return (
              <div
                key={item.title}
                className="group relative bg-gray-900 border border-gray-800 rounded-3xl p-8 overflow-hidden hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-orange-500/10 to-transparent pointer-events-none" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                    <IconComponent size={28} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4 text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 leading-7">{item.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Highlight */}
        <div className="mt-24 bg-gradient-to-r from-orange-500/10 via-orange-500/5 to-transparent border border-orange-500/20 rounded-3xl p-10">
          <div className="max-w-4xl">
            <p className="text-orange-400 font-semibold uppercase tracking-[0.2em] text-sm mb-4">
              The Philosophy
            </p>

            <h3 className="text-3xl md:text-4xl font-black leading-tight text-white">
              Great developers aren't built
              <span className="text-orange-400"> overnight.</span>
            </h3>

            <p className="mt-6 text-gray-400 text-lg leading-8">
              They become great by solving one bug, learning one concept, writing
              one commit, and showing up one more day than everyone else.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}