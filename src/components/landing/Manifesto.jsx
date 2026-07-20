import { FiCode, FiBookOpen, FiZap, FiX, FiCheck } from "react-icons/fi";

const pillars = [
  {
    icon: FiCode,
    title: "Build",
    text: "Ship something real every day, no matter how small.",
  },
  {
    icon: FiBookOpen,
    title: "Learn",
    text: "Turn daily obstacles and bugs into permanent knowledge.",
  },
  {
    icon: FiZap,
    title: "Repeat",
    text: "Compound tiny daily wins into extraordinary results.",
  },
];

export default function Manifesto() {
  return (
    <section className="py-28 px-6 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-orange-400 uppercase tracking-[0.3em] text-sm font-semibold">
            Our Philosophy
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight text-white">
            Great developers aren't born.
            <br />
            <span className="text-orange-400">They're built.</span>
          </h2>
        </div>

        {/* Comparison Block: What it's NOT vs What it IS */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left: The Trap */}
          <div className="bg-gray-900 border border-red-500/20 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-2 text-red-400 font-semibold text-sm tracking-wider uppercase mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 animate-pulse" />
              The Passive Trap
            </div>

            <ul className="space-y-4">
              {[
                "Endless video tutorial hell",
                "Collecting certificate badges",
                "Waiting for motivation to strike",
                "Obsessing over perfect streaks",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-400 text-base">
                  <div className="w-6 h-6 rounded-full bg-red-500/10 text-red-400 flex items-center justify-center shrink-0">
                    <FiX size={14} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Right: The DevStreak Way */}
          <div className="bg-gradient-to-br from-orange-500/10 via-gray-900 to-gray-900 border border-orange-500/30 rounded-3xl p-8 relative overflow-hidden">
            <div className="flex items-center gap-2 text-orange-400 font-semibold text-sm tracking-wider uppercase mb-6">
              <span className="w-2.5 h-2.5 rounded-full bg-orange-400" />
              The DevStreak Way
            </div>

            <ul className="space-y-4">
              {[
                "1 Bug fixed, 1 feature shipped daily",
                "Proof of work over passive watching",
                "Building consistency as a habit",
                "Progress through showing up anyway",
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-gray-200 text-base font-medium">
                  <div className="w-6 h-6 rounded-full bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <FiCheck size={14} />
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mt-8 grid md:grid-cols-3 gap-8">
          {pillars.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="group bg-gray-900 border border-gray-800 hover:border-orange-500/40 rounded-3xl p-8 transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-6">
                    <IconComponent size={28} />
                  </div>

                  <h3 className="font-bold text-2xl mb-3 text-white">
                    {item.title}
                  </h3>

                  <p className="text-gray-400 text-base leading-relaxed">
                    {item.text}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}