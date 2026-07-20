import { useState } from "react";

const faqs = [
  {
    question: "Is DevStreak only for developers?",
    answer:
      "Yes. DevStreak is built specifically for software developers, whether you're learning your first language or working professionally.",
  },
  {
    question: "What counts as a daily check-in?",
    answer:
      "Anything that helps you grow as a developer, building projects, fixing bugs, studying documentation, learning a new concept, or practicing coding.",
  },
  {
    question: "Will I lose my streak if I miss a day?",
    answer:
      "Yes, consistency is the goal. However, DevStreak includes a weekly streak freeze so real life doesn't immediately break your progress.",
  },
  {
    question: "Can I share my achievements?",
    answer:
      "Absolutely. Generate beautiful developer cards showing your streak, milestones, and progress to share on LinkedIn, X, GitHub, or anywhere.",
  },
  {
    question: "Is DevStreak free?",
    answer:
      "Yes. The core experience is completely free and designed to help developers build a consistent learning habit.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-28 px-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-16">
          <span className="text-orange-400 uppercase tracking-[0.25em] text-sm font-semibold">
            FAQ
          </span>

          <h2 className="text-4xl md:text-5xl font-black mt-5">
            Questions developers ask.
          </h2>

          <p className="text-gray-400 mt-5 text-lg">
            Everything you need to know before starting your streak.
          </p>
        </div>

        <div className="space-y-4">

          {faqs.map((faq, index) => (
            <div
              key={faq.question}
              className="rounded-2xl border border-gray-800 bg-gray-900 overflow-hidden"
            >
              <button
                onClick={() =>
                  setOpen(open === index ? -1 : index)
                }
                className="w-full flex justify-between items-center p-6 text-left"
              >
                <span className="font-semibold text-lg text-white">
                  {faq.question}
                </span>

                <span className="text-2xl text-orange-400">
                  {open === index ? "−" : "+"}
                </span>
              </button>

              <div
                className={`transition-all duration-300 overflow-hidden ${
                  open === index ? "max-h-40" : "max-h-0"
                }`}
              >
                <div className="px-6 pb-6 text-gray-400 leading-7">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}