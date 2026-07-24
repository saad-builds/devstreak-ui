import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import html2canvas from "html2canvas";
import toast from "react-hot-toast";
import {
  FiZap,
  FiCheckCircle,
  FiClock,
  FiDownload,
  FiCode,
  FiBookOpen,
  FiEdit3,
  FiList,
  FiSettings,
  FiAward,
  FiArrowRight,
  FiSmile,
} from "react-icons/fi";
import api from "../utils/api";
import { useAuth } from "../context/AuthContext";
import Heatmap from "../components/dashboard/Heatmap";
import StreakCard from "../components/card/StreakCard";
import Navbar from "../components/landing/Navbar";

function getHoursLeftPKT() {
  const now = new Date();

  // Convert current system time to Pakistan Standard Time
  const pktString = now.toLocaleString("en-US", { timeZone: "Asia/Karachi" });
  const pktDate = new Date(pktString);

  // Set target to Midnight PKT tonight
  const pktMidnight = new Date(pktDate);
  pktMidnight.setHours(24, 0, 0, 0);

  const diffMs = pktMidnight - pktDate;

  if (diffMs <= 0) return "0h 0m left today";

  const hours = Math.floor(diffMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m left today`;
}

// Updated HoursCountdown Component
function HoursCountdown() {
  const [time, setTime] = useState(getHoursLeftPKT());

  useEffect(() => {
    setTime(getHoursLeftPKT());
    const t = setInterval(() => setTime(getHoursLeftPKT()), 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 text-gray-400 text-xs font-medium bg-gray-950 border border-gray-800 px-3 py-1 rounded-full">
      <FiClock className="text-orange-400" size={13} />
      <span>{time}</span>
    </span>
  );
}

function LiveCounter({ count }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!count) return;
    let n = 0;
    const step = Math.ceil(count / 40);
    const t = setInterval(() => {
      n += step;
      if (n >= count) {
        setDisplay(count);
        clearInterval(t);
      } else setDisplay(n);
    }, 30);
    return () => clearInterval(t);
  }, [count]);
  return <span>{display}</span>;
}

export default function Dashboard() {
  const { user, updateUser } = useAuth();
  const [logs, setLogs] = useState([]);
  const [todayStatus, setTodayStatus] = useState(null);
  const [loggedToday, setLoggedToday] = useState(false);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [totalToday, setTotalToday] = useState(0);
  const cardRef = useRef(null);

  const fetchData = useCallback(async () => {
    try {
      const [logsRes, todayRes, userRes] = await Promise.all([
        api.get("/logs?limit=90"),
        api.get("/logs/today"),
        api.get("/user/me"),
      ]);
      setLogs(logsRes.data.logs);
      setTodayStatus(todayRes.data);
      setLoggedToday(todayRes.data.alreadyLogged);
      updateUser(userRes.data.user);
    } catch {
      toast.error("Failed to load data");
    } finally {
      setLoading(false);
    }
    try {
      const countRes = await api.get("/logs/today-count");
      setTotalToday(countRes.data.count || 0);
    } catch {
      setTotalToday(0);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const recentLog = logs[0] || null;
  const streak = user?.currentStreak || 0;

  // Calculate monthly & weekly log stats dynamically
  const now = new Date();
  const logsThisMonth = logs.filter((log) => {
    const logDate = new Date(log.createdAt || log.date);
    return (
      logDate.getMonth() === now.getMonth() &&
      logDate.getFullYear() === now.getFullYear()
    );
  }).length;

  const logsThisWeek = logs.filter((log) => {
    const logDate = new Date(log.createdAt || log.date);
    const diffDays = (now - logDate) / (1000 * 60 * 60 * 24);
    return diffDays >= 0 && diffDays <= 7;
  }).length;

  const handleDownloadCard = () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      cardRef.current.download(`devstreak-day-${streak}.png`);
      toast.success("Card downloaded — share it and inspire someone 🔥");
    } catch {
      toast.error("Export failed");
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 animate-bounce">
          <FiZap size={32} />
        </div>
      </div>
    );
  }

  const getRankLabel = (n) => {
    if (n >= 365) return "LEGENDARY";
    if (n >= 100) return "ELITE";
    if (n >= 30) return "CONSISTENT";
    if (n >= 7) return "RISING";
    return "STARTED";
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative overflow-hidden border-b border-orange-500/15 bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900/60 py-8 sm:py-12 lg:py-16">
        {/* Ambient fire aura glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div
            className={`absolute top-1/2 left-1/2 lg:left-1/3 -translate-y-1/2 -translate-x-1/2 w-[300px] sm:w-[500px] lg:w-[600px] h-[250px] sm:h-[350px] rounded-full blur-3xl transition-all duration-700 ${
              loggedToday ? "bg-emerald-500/15" : "bg-orange-500/20"
            }`}
          />
        </div>

        {/* Outer Container - Enforced items-center vertically for all breakpoints */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left: Flame badge & streak number (Vertically Centered) */}
          <div className="flex flex-row items-center text-left gap-4 xs:gap-5 sm:gap-8 w-full lg:w-auto justify-center lg:justify-start">
            {/* Flame Icon Badge */}
            <div className="relative shrink-0">
              <div className="absolute -inset-1.5 rounded-2xl sm:rounded-3xl bg-gradient-to-t from-orange-600 via-amber-500 to-amber-300 opacity-30 blur-lg animate-pulse" />
              <div className="relative w-16 h-16 xs:w-20 xs:h-20 sm:w-28 sm:h-28 rounded-2xl sm:rounded-3xl bg-gray-900/90 border border-orange-500/30 flex items-center justify-center shadow-2xl backdrop-blur-md">
                <div className="relative w-10 h-10 xs:w-12 xs:h-12 sm:w-16 sm:h-16 flex items-center justify-center">
                  <svg
                    className="absolute inset-0 w-full h-full text-orange-500 drop-shadow-[0_0_18px_rgba(249,115,22,0.85)] animate-pulse"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2C10.2 4.8 9.5 7.5 10.5 10C8.5 9 7.5 7.2 7.5 5C5 8.2 3.5 11.8 3.5 15.2C3.5 19.8 7.3 23.5 12 23.5C16.7 23.5 20.5 19.8 20.5 15.2C20.5 10.5 16.2 6.2 12 2Z" />
                  </svg>
                  <svg
                    className="relative w-6 h-6 xs:w-7 xs:h-7 sm:w-10 sm:h-10 text-amber-300 drop-shadow-[0_0_8px_rgba(252,211,77,0.9)]"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 10.5C11 12.2 10.5 13.8 11 15.2C10 14.8 9.5 13.8 9.5 12.8C8 14.8 7.5 16.5 8 18.2C8.6 20.2 10.1 21.2 12 21.2C13.9 21.2 15.4 20.2 16 18.2C16.8 15.5 14.5 12.8 12 10.5Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Streak Details */}
            <div className="flex flex-col justify-center items-start min-w-0">
              <div className="flex items-baseline gap-1.5 xs:gap-2 sm:gap-3">
                <span className="font-extrabold text-6xl xs:text-7xl sm:text-7xl lg:text-8xl leading-none tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-orange-50 to-orange-400 drop-shadow-[0_6px_24px_rgba(249,115,22,0.35)]">
                  {streak}
                </span>
                <span className="text-orange-400 font-extrabold text-lg xs:text-2xl sm:text-3xl tracking-widest uppercase">
                  {streak === 1 ? "DAY" : "DAYS"}
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-1">
                <span className="text-gray-200 text-sm xs:text-base sm:text-xl font-bold tracking-wide">
                  {streak === 0
                    ? "Ignite your streak today"
                    : streak === 1
                      ? "Day 1 on fire! Keep burning."
                      : `Day ${streak}. Unstoppable energy.`}
                </span>
                <span className="text-[10px] xs:text-[11px] sm:text-xs font-bold text-amber-300 bg-orange-500/20 border border-orange-500/40 px-2.5 py-0.5 xs:px-3 xs:py-1 sm:px-3.5 sm:py-1.5 rounded-full uppercase tracking-wider shadow-[0_0_12px_rgba(249,115,22,0.25)] whitespace-nowrap">
                  🔥 {getRankLabel(streak)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Action + Mini Stats (Vertically Centered) */}
          <div className="flex flex-col justify-center items-center lg:items-end gap-4 sm:gap-5 w-full lg:w-auto">
            {loggedToday ? (
              <div className="w-full sm:w-auto flex items-center justify-center gap-2.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold px-6 py-3.5 rounded-2xl text-sm shadow-sm">
                <FiCheckCircle size={18} />
                <span>Streak safe today</span>
              </div>
            ) : (
              <Link
                to="/checkin"
                className="relative group w-full sm:w-auto text-center"
              >
                <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-400 opacity-60 blur-md group-hover:opacity-100 transition duration-300" />
                <div className="relative inline-flex items-center justify-center gap-3 w-full bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:brightness-110 text-white font-extrabold px-6 sm:px-9 py-3.5 sm:py-4 rounded-2xl text-base transition-all duration-300 group-hover:scale-[1.02] active:scale-95 shadow-xl capitalize tracking-wider">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2C10.2 4.8 9.5 7.5 10.5 10C8.5 9 7.5 7.2 7.5 5C5 8.2 3.5 11.8 3.5 15.2C3.5 19.8 7.3 23.5 12 23.5C16.7 23.5 20.5 19.8 20.5 15.2C20.5 10.5 16.2 6.2 12 2Z" />
                  </svg>
                  <span>Accept Today's Challenge</span>
                </div>
              </Link>
            )}

            {/* Mini Stats Card */}
            <div className="w-full sm:w-auto flex items-center justify-between sm:justify-around gap-2 sm:gap-6 text-sm bg-gray-900/80 border border-gray-800 px-4 sm:px-6 py-3 sm:py-3.5 rounded-2xl shadow-xl backdrop-blur-md">
              <div className="text-center px-1">
                <p className="text-white font-extrabold text-lg sm:text-xl tabular-nums">
                  {user?.longestStreak || 0}
                </p>
                <p className="text-gray-400 text-[10px] sm:text-xs font-semibold  tracking-wider">
                  Best Streak
                </p>
              </div>

              <div className="w-px h-7 sm:h-8 bg-gray-800 shrink-0" />

              {/* Next Goal — Styled to match adjacent items */}
              <div className="text-center px-1">
                <p className="text-orange-400 font-extrabold text-lg sm:text-xl tabular-nums">
                  {streak >= 30
                    ? "100 Days"
                    : streak >= 7
                      ? "30 Days"
                      : "7 Days"}
                </p>
                <p className="text-gray-400 text-[10px] sm:text-xs font-semibold  tracking-wider">
                  Next goal
                </p>
              </div>

              <div className="w-px h-7 sm:h-8 bg-gray-800 shrink-0" />

              <div className="text-center px-1">
                <p className="text-lg sm:text-xl">
                  {user?.freezeAvailable ? "🧊" : "🔒"}
                </p>
                <p className="text-gray-400 text-[10px] sm:text-xs font-semibold capitalize tracking-wider">
                  {user?.freezeAvailable ? "freeze ready" : "freeze locked"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* LEFT COLUMN — 3/5 */}
          <div className="lg:col-span-3 space-y-6">
            {/* Mission card */}
            {!loggedToday && todayStatus?.prompt && (
              <div className="rounded-3xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 via-gray-900 to-gray-900 p-7 relative overflow-hidden shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-400 animate-pulse" />
                    <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
                      Today's Mission
                    </span>
                  </div>
                  <HoursCountdown />
                </div>
                <p className="text-white text-xl font-bold leading-relaxed mb-6">
                  {todayStatus.prompt.text}
                </p>
                <Link
                  to="/checkin"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all duration-300 hover:scale-105 active:scale-95 shadow-md shadow-orange-500/20"
                >
                  <span>Start writing</span>
                  <FiArrowRight size={16} />
                </Link>
              </div>
            )}

            {/* Today's entry */}
            {loggedToday && recentLog && (
              <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-7 shadow-xl">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-800">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                    <span className="text-emerald-400 text-xs font-bold capitalize tracking-widest">
                      Today's Entry
                    </span>
                  </div>
                  <Link
                    to="/checkin"
                    className="inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-medium transition-colors"
                  >
                    <FiEdit3 size={13} />
                    <span>Edit</span>
                  </Link>
                </div>
                <div className="space-y-5">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 capitalize tracking-wider mb-2">
                      <FiCode size={14} />
                      <span>Worked on</span>
                    </div>
                    <p className="text-gray-200 text-base leading-relaxed font-medium">
                      {recentLog.workedOn}
                    </p>
                  </div>
                  <div className="border-t border-gray-800/80 pt-5">
                    <div className="flex items-center gap-2 text-xs font-semibold text-orange-400 uppercase tracking-wider mb-2">
                      <FiBookOpen size={14} />
                      <span>Learned</span>
                    </div>
                    <p className="text-gray-200 text-base leading-relaxed font-medium">
                      {recentLog.learned}
                    </p>
                  </div>
                  {recentLog.sessionRating && (
                    <div className="border-t border-gray-800/80 pt-4 flex items-center gap-2">
                      <FiSmile className="text-gray-500" size={16} />
                      <span className="text-gray-400 text-xs font-medium">
                        Session Mood:{" "}
                      </span>
                      <span className="text-xl">
                        {
                          ["", "😞", "😐", "🙂", "😊", "🔥"][
                            recentLog.sessionRating
                          ]
                        }
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity heatmap */}
            <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-7 shadow-xl">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-lg">
                  Activity Heatmap
                </h2>
                <Link
                  to="/history"
                  className="inline-flex items-center gap-1 text-orange-400 text-xs font-semibold hover:text-orange-300 transition-colors"
                >
                  <span>View history</span>
                  <FiArrowRight size={14} />
                </Link>
              </div>
              <Heatmap logs={logs} />
            </div>

            {/* Consistency Stats (Refreshed and non-redundant) */}
            <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-7 shadow-xl">
              <h2 className="text-white font-bold text-lg mb-5">
                Your Consistency Stats
              </h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: "Total Logs", value: logs.length },
                  { label: "This Week", value: logsThisWeek },
                  { label: "This Month", value: logsThisMonth },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="bg-gray-950/80 border border-gray-800/80 rounded-2xl p-5 text-center"
                  >
                    <p className="text-white font-black text-3xl tabular-nums">
                      {value}
                    </p>
                    <p className="text-gray-400 text-xs mt-1 font-medium">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — 2/5 */}
          <div className="lg:col-span-2 space-y-6">
            {/* Achievement card */}

            <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-5 sm:p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-white font-bold text-lg flex items-center gap-2">
                    <FiAward className="text-orange-400" size={19} />
                    <span>Achievement Card</span>
                  </h2>
                  <p className="text-gray-400 text-xs mt-0.5">
                    Share your daily win on socials
                  </p>
                </div>
              </div>

              {/* Compact Card Container — Removed extra inner padding */}
              <div className="w-full flex justify-center items-center bg-gray-950/60 border border-gray-800/60 rounded-2xl p-2 sm:p-3">
                <div className="w-full max-w-[280px] sm:max-w-[310px] rounded-[22px] overflow-hidden shadow-2xl ring-1 ring-orange-500/20">
                  <StreakCard
                    ref={cardRef}
                    user={user}
                    logs={logs}
                    recentLog={recentLog}
                  />
                </div>
              </div>

              <button
                onClick={handleDownloadCard}
                disabled={exporting}
                className="w-full mt-4 inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-bold py-3.5 rounded-2xl transition-all duration-300 text-sm shadow-md shadow-orange-500/20 active:scale-[0.98]"
              >
                <FiDownload size={17} />
                <span>
                  {exporting ? "Generating..." : "Download Share Card"}
                </span>
              </button>
            </div>

            {/* Quick actions */}
            <div className="rounded-3xl border border-gray-800 bg-gray-900/80 p-6 shadow-xl">
              <h2 className="text-white font-bold text-lg mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                {[
                  {
                    to: "/checkin",
                    label: loggedToday
                      ? "Edit today's log"
                      : "Log today's entry",
                    icon: loggedToday ? FiEdit3 : FiZap,
                    highlight: !loggedToday,
                  },
                  {
                    to: "/history",
                    label: "View all logs",
                    icon: FiList,
                    highlight: false,
                  },
                  {
                    to: "/profile",
                    label: "Edit profile",
                    icon: FiSettings,
                    highlight: false,
                  },
                ].map(({ to, label, icon: IconComponent, highlight }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center justify-between px-5 py-3.5 rounded-2xl text-sm font-semibold transition-all duration-300 ${
                      highlight
                        ? "bg-orange-500/10 border border-orange-500/30 text-orange-400 hover:bg-orange-500/20"
                        : "bg-gray-950/80 border border-gray-800/80 text-gray-300 hover:border-gray-700 hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent
                        size={16}
                        className={
                          highlight ? "text-orange-400" : "text-gray-400"
                        }
                      />
                      <span>{label}</span>
                    </div>
                    <FiArrowRight size={14} className="opacity-50" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
