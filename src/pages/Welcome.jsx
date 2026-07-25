import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const QUOTES = [
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Small daily improvements are the key to staggering long-term results.",
    author: "Robin Sharma",
  },
  {
    text: "Every expert was once a beginner who refused to quit.",
    author: "Unknown",
  },
  {
    text: "Code is like humor. When you have to explain it, it's bad.",
    author: "Cory House",
  },
  {
    text: "The best time to start was yesterday. The next best time is now.",
    author: "Unknown",
  },
  {
    text: "It's not about being the best. It's about being better than you were yesterday.",
    author: "Unknown",
  },
  {
    text: "Consistency is what transforms average into excellence.",
    author: "Unknown",
  },
];

function getRandomQuote() {
  const randomIndex = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[randomIndex];
}

function playWelcomeSound() {
  try {
    const ctx = new (window.AudioContext ||
      window.webkitAudioContext)();

    const play = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(
        freq,
        ctx.currentTime + start
      );

      gain.gain.setValueAtTime(
        0,
        ctx.currentTime + start
      );

      gain.gain.linearRampToValueAtTime(
        0.18,
        ctx.currentTime + start + 0.01
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + start + duration
      );

      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    play(523, 0, 0.4);
    play(659, 0.15, 0.4);
    play(784, 0.3, 0.4);
    play(1046, 0.45, 0.6);

  } catch {}
}

function playGoSound() {
  try {
    const ctx = new (window.AudioContext ||
      window.webkitAudioContext)();

    const play = (freq, start, duration) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";

      osc.frequency.setValueAtTime(
        freq,
        ctx.currentTime + start
      );

      gain.gain.setValueAtTime(
        0.15,
        ctx.currentTime + start
      );

      gain.gain.exponentialRampToValueAtTime(
        0.001,
        ctx.currentTime + start + duration
      );

      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + duration);
    };

    play(784, 0, 0.15);
    play(1046, 0.12, 0.25);

  } catch {}
}

export default function Welcome() {
  const { user } = useAuth();
  const navigate = useNavigate();

  // UPDATED: quote is now random state
  const [quote, setQuote] = useState(null);

  const [visible, setVisible] = useState(false);
  const [quoteVisible, setQuoteVisible] = useState(false);
  const [btnVisible, setBtnVisible] = useState(false);

  const soundPlayed = useRef(false);


  useEffect(() => {
    const justLoggedIn =
      sessionStorage.getItem("justLoggedIn");

    console.log(
      "justLoggedIn:",
      justLoggedIn
    );

    if (!justLoggedIn) {
      navigate("/dashboard", { replace: true });
      return;
    }

    sessionStorage.removeItem("justLoggedIn");


    // UPDATED: create a new random quote every login
    setQuote(getRandomQuote());


    const t1 = setTimeout(() => {
      setVisible(true);
    }, 150);


    const t2 = setTimeout(() => {
      setQuoteVisible(true);
    }, 600);


    const t3 = setTimeout(() => {
      setBtnVisible(true);
    }, 1100);


    const t4 = setTimeout(() => {
      if (!soundPlayed.current) {
        soundPlayed.current = true;
        playWelcomeSound();
      }
    }, 200);


    return () => {
      [t1, t2, t3, t4].forEach(clearTimeout);
    };

  }, [navigate]);


  const handleGo = () => {
    playGoSound();

    setTimeout(() => {
      navigate("/checkin");
    }, 150);
  };


  const handleSkip = () => {
    navigate("/dashboard");
  };


  return (
    <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center px-4 relative overflow-hidden">

      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(249,115,22,0.08) 0%, transparent 70%)",
            opacity: visible ? 1 : 0,
            transition: "opacity 1s ease",
          }}
        />
      </div>


      <div className="relative z-10 text-center max-w-md w-full">

        <div
          style={{
            opacity: visible ? 1 : 0,
            transform: visible
              ? "translateY(0) scale(1)"
              : "translateY(20px) scale(0.9)",
            transition:
              "all 0.7s cubic-bezier(0.34,1.56,0.64,1)",
          }}
        >

          <span className="flame-emoji text-7xl block mb-5">
            🔥
          </span>


          <h1 className="text-3xl font-black text-white mb-1">
            Welcome back,{" "}
            <span className="shimmer-text">
              {user?.name?.split(" ")[0]}
            </span>
          </h1>


          <p className="text-gray-500 text-sm">
            {user?.currentStreak > 0
              ? `You're on a ${user.currentStreak} day streak. Don't stop now.`
              : "Day 1 starts today. Let's go."}
          </p>

        </div>


        <div
          className="my-10 px-6 py-5 bg-gray-900 border border-gray-800 rounded-2xl"
          style={{
            opacity: quoteVisible ? 1 : 0,
            transform: quoteVisible
              ? "translateY(0)"
              : "translateY(16px)",
            transition: "all 0.6s ease",
          }}
        >

          {quote && (
            <>
              <p className="text-white text-lg font-medium leading-relaxed mb-3">
                "{quote.text}"
              </p>

              <p className="text-gray-600 text-sm">
                - {quote.author}
              </p>
            </>
          )}

        </div>


        <div
          className="space-y-3"
          style={{
            opacity: btnVisible ? 1 : 0,
            transform: btnVisible
              ? "translateY(0)"
              : "translateY(16px)",
            transition: "all 0.5s ease",
          }}
        >

          <button
            onClick={handleGo}
            className="w-full bg-orange-500 hover:bg-orange-400 active:scale-95 text-white font-bold py-4 rounded-xl text-lg transition-all hover:scale-[1.02] shadow-lg shadow-orange-500/25"
          >
            🔥 Start Today's Mission
          </button>


          <button
            onClick={handleSkip}
            className="w-full bg-transparent hover:bg-gray-900 text-gray-600 hover:text-gray-400 font-medium py-3 rounded-xl text-sm transition-colors border border-transparent hover:border-gray-800"
          >
            Go to dashboard
          </button>

        </div>


        {user?.currentStreak > 0 && (
          <div
            className="mt-8 inline-flex items-center gap-2 text-xs text-gray-700"
            style={{
              opacity: btnVisible ? 1 : 0,
              transition: "opacity 0.5s 0.3s ease",
            }}
          >

            <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />

            {user.currentStreak} day streak active

          </div>
        )}

      </div>

    </div>
  );
}