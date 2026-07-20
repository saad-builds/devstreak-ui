import { FiCode, FiEdit3, FiTrendingUp } from "react-icons/fi";

const steps = [
  {
    number: "01",
    Icon: FiCode,
    title: "Build Something",
    description:
      "Ship a feature, fix a bug, solve a challenge, or explore a new technology.",
    preview: ["Feature completed", "Bug fixed", "New concept"],
  },
  {
    number: "02",
    Icon: FiEdit3,
    title: "Reflect & Document",
    description:
      "Capture what you built, what you learned, and what challenged you today.",
    preview: ["Built authentication", "Learned JWT", "Solved API issue"],
  },
  {
    number: "03",
    Icon: FiTrendingUp,
    title: "Grow Your Streak",
    description:
      "Every check-in strengthens your consistency and builds your developer history.",
    preview: ["🔥 Day 28", "Next: Day 30", "2 days left"],
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 bg-gray-950 text-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-orange-400 uppercase tracking-[0.3em] text-sm font-semibold">
            How It Works
          </span>

          <h2 className="mt-5 text-4xl md:text-5xl font-black leading-tight text-white">
            A simple daily ritual
            <br />
            for consistent developers.
          </h2>

          <p className="mt-6 text-lg text-gray-400 leading-8 max-w-2xl mx-auto">
            Spend a few minutes reflecting on your day. Track what you built,
            what you learned, and watch your developer journey grow one check-in
            at a time.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid md:grid-cols-3 gap-5">
          {steps.map((step) => {
            const IconComponent = step.Icon;
            return (
              <div
                key={step.number}
                className="group bg-gray-900 border border-gray-800 rounded-3xl p-8 hover:border-orange-500/40 hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between h-full"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400">
                      <IconComponent size={28} />
                    </div>

                    <span className="text-5xl font-black text-gray-800 group-hover:text-orange-500/20 transition">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold mt-8">{step.title}</h3>

                  <p className="text-gray-400 leading-7 mt-3">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 rounded-2xl bg-black/30 border border-gray-800 p-5">
                  {step.preview.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 py-2 border-b border-gray-800 last:border-0"
                    >
                      <div className="w-2 h-2 rounded-full bg-orange-500" />
                      <span className="text-sm text-gray-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout Banner */}
        <div className="mt-24 text-center">
          <p className="text-3xl md:text-4xl font-black leading-tight max-w-4xl mx-auto">
            Small improvements,
            <span className="text-orange-400"> every single day.</span>
          </p>

          <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto leading-8">
            Great developers aren't created by one big breakthrough. They're
            built by consistently showing up, learning something new, and doing
            the work.
          </p>
        </div>
      </div>
    </section>
  );
}