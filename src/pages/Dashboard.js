import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import html2canvas from 'html2canvas';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Heatmap from '../components/dashboard/Heatmap';
import StreakCard from '../components/card/StreakCard';
import Navbar from '../components/layout/Navbar';

function getHoursLeft() {
  const now = new Date();
  const end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  const diff = end - now;
  return {
    h: Math.floor(diff / 3600000),
    m: Math.floor((diff % 3600000) / 60000),
  };
}

function HoursCountdown() {
  const [time, setTime] = useState(getHoursLeft());
  useEffect(() => {
    const t = setInterval(() => setTime(getHoursLeft()), 60000);
    return () => clearInterval(t);
  }, []);
  return <span>{time.h}h {time.m}m left today</span>;
}

function LiveCounter({ count }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!count) return;
    let n = 0;
    const step = Math.ceil(count / 40);
    const t = setInterval(() => {
      n += step;
      if (n >= count) { setDisplay(count); clearInterval(t); }
      else setDisplay(n);
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
        api.get('/logs?limit=90'),
        api.get('/logs/today'),
        api.get('/user/me'),
      ]);
      setLogs(logsRes.data.logs);
      setTodayStatus(todayRes.data);
      setLoggedToday(todayRes.data.alreadyLogged);
      updateUser(userRes.data.user);
    } catch {
      toast.error('Failed to load data');
    } finally {
      setLoading(false);
    }
    try {
      const countRes = await api.get('/logs/today-count');
      setTotalToday(countRes.data.count || 0);
    } catch {
      setTotalToday(0);
    }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const recentLog = logs[0] || null;
  const streak = user?.currentStreak || 0;

  const handleDownloadCard = async () => {
    if (!cardRef.current) return;
    setExporting(true);
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: '#0d1117',
        scale: 2,
        useCORS: true,
        allowTaint: false,
        foreignObjectRendering: false,
      });
      const link = document.createElement('a');
      link.download = `devstreak-day-${streak}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      toast.success('Card downloaded — share it and inspire someone 🔥');
    } catch {
      toast.error('Export failed');
    } finally {
      setExporting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <span className="flame-emoji text-6xl">🔥</span>
      </div>
    );
  }

  const getRankLabel = (n) => {
    if (n >= 365) return 'LEGENDARY';
    if (n >= 100) return 'ELITE';
    if (n >= 30) return 'CONSISTENT';
    if (n >= 7) return 'RISING';
    return 'STARTED';
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />

      {/* ── HERO ── */}
      <div className="relative overflow-hidden border-b border-gray-900">
        <div className="absolute inset-0 pointer-events-none">
          <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full blur-3xl opacity-20 ${
            loggedToday ? 'bg-green-500' : 'bg-orange-500'
          }`} />
        </div>

        <div className="relative max-w-6xl mx-auto px-8 py-14 flex flex-col lg:flex-row items-center lg:items-end justify-between gap-8">

          {/* Left: streak number */}
          <div className="flex items-end gap-6">
            <span className="flame-emoji leading-none" style={{ fontSize: 80 }}>🔥</span>
            <div>
              <div
                className="font-black leading-none shimmer-text"
                style={{ fontSize: 160, fontFamily: 'Inter, sans-serif', lineHeight: 0.9 }}
              >
                {streak}
              </div>
              <div className="flex items-center gap-3 mt-3">
                <span className="text-gray-400 text-xl font-medium">
                  {streak === 0
                    ? 'Start today'
                    : streak === 1
                    ? 'Day 1. The journey begins.'
                    : `Day ${streak}. Keep going.`}
                </span>
                <span className="text-xs font-bold text-orange-400 bg-orange-400/10 border border-orange-400/20 px-2.5 py-1 rounded-full">
                  {getRankLabel(streak)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: action + mini stats */}
          <div className="flex flex-col items-center lg:items-end gap-4 pb-2">
            {loggedToday ? (
              <div className="flex items-center gap-2 bg-green-900/30 border border-green-800/50 text-green-400 font-semibold px-5 py-3 rounded-xl text-sm">
                ✅ Streak safe — you showed up today
              </div>
            ) : (
              <Link
                to="/checkin"
                className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-8 py-4 rounded-xl text-lg transition-all hover:scale-105 active:scale-95 shadow-xl shadow-orange-500/30"
              >
                🔥 Accept Today's Challenge
              </Link>
            )}

            <div className="flex items-center gap-6 text-sm">
              <div className="text-center">
                <p className="text-white font-bold text-lg tabular-nums">{user?.longestStreak || 0}</p>
                <p className="text-gray-600 text-xs">best streak</p>
              </div>
              <div className="w-px h-8 bg-gray-800" />
              <div className="text-center">
                <p className="text-orange-400 font-bold text-lg tabular-nums">
                  <LiveCounter count={totalToday} />
                </p>
                <p className="text-gray-600 text-xs">logged today</p>
              </div>
              <div className="w-px h-8 bg-gray-800" />
              <div className="text-center">
                <p className={`font-bold text-lg ${user?.freezeAvailable ? 'text-blue-400' : 'text-gray-600'}`}>
                  {user?.freezeAvailable ? '🧊' : '—'}
                </p>
                <p className="text-gray-600 text-xs">
                  {user?.freezeAvailable ? 'freeze ready' : 'no freeze'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── BODY ── */}
      <div className="max-w-6xl mx-auto px-8 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* LEFT COLUMN — 3/5 */}
          <div className="lg:col-span-3 space-y-6">

            {/* Mission card */}
            {!loggedToday && todayStatus?.prompt && (
              <div className="rounded-2xl border border-orange-900/40 bg-gray-900 p-6"
                style={{ boxShadow: 'inset 0 1px 0 rgba(249,115,22,0.1)' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                    <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
                      Today's Mission
                    </span>
                  </div>
                  <span className="text-gray-600 text-xs">
                    <HoursCountdown />
                  </span>
                </div>
                <p className="text-white text-lg font-semibold leading-relaxed mb-5">
                  {todayStatus.prompt.text}
                </p>
                <Link
                  to="/checkin"
                  className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all hover:scale-105 active:scale-95"
                >
                  Start writing →
                </Link>
              </div>
            )}

            {/* Today's entry */}
            {loggedToday && recentLog && (
              <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-green-400 text-xs font-bold uppercase tracking-widest">
                      Today's Entry
                    </span>
                  </div>
                  <Link to="/checkin" className="text-gray-600 hover:text-gray-400 text-xs transition-colors">
                    Edit →
                  </Link>
                </div>
                <div className="space-y-5">
                  <div>
                    <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">Worked on</p>
                    <p className="text-gray-200 text-sm leading-relaxed">{recentLog.workedOn}</p>
                  </div>
                  <div className="border-t border-gray-800 pt-5">
                    <p className="text-gray-600 text-xs uppercase tracking-widest mb-2">Learned</p>
                    <p className="text-gray-200 text-sm leading-relaxed">{recentLog.learned}</p>
                  </div>
                  {recentLog.sessionRating && (
                    <div className="border-t border-gray-800 pt-4 flex items-center gap-2">
                      <span className="text-gray-600 text-xs">Session: </span>
                      <span className="text-lg">
                        {['', '😞', '😐', '🙂', '😊', '🔥'][recentLog.sessionRating]}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Activity heatmap */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-white font-bold text-base">Activity</h2>
                <Link to="/history" className="text-orange-400 text-xs hover:text-orange-300 transition-colors">
                  View history →
                </Link>
              </div>
              <Heatmap logs={logs} />
            </div>

            {/* Stats */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-6">
              <h2 className="text-white font-bold text-base mb-4">Your Stats</h2>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Total Logs', value: logs.length },
                  { label: 'Current Streak', value: `${streak}d` },
                  { label: 'Best Streak', value: `${user?.longestStreak || 0}d` },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-gray-800/60 rounded-xl p-4 text-center">
                    <p className="text-white font-black text-2xl tabular-nums">{value}</p>
                    <p className="text-gray-500 text-xs mt-1">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN — 2/5 */}
          <div className="lg:col-span-2 space-y-6">

            {/* Achievement card */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
              <div className="mb-4">
                <h2 className="text-white font-bold text-base">Achievement Card</h2>
                <p className="text-gray-600 text-xs mt-0.5">Share on LinkedIn or WhatsApp</p>
              </div>
              <div className="mb-4">
                <StreakCard ref={cardRef} user={user} logs={logs} recentLog={recentLog} />
              </div>
              <button
                onClick={handleDownloadCard}
                disabled={exporting}
                className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-40 text-white font-bold py-3 rounded-xl transition-all text-sm"
              >
                {exporting ? 'Generating...' : '🏆 Download Card'}
              </button>
            </div>

            {/* Quick actions */}
            <div className="rounded-2xl border border-gray-800 bg-gray-900 p-5">
              <h2 className="text-white font-bold text-base mb-4">Quick Actions</h2>
              <div className="space-y-2">
                {[
                  { to: '/checkin', label: loggedToday ? '✏️ Edit today\'s log' : '🔥 Log today', highlight: !loggedToday },
                  { to: '/history', label: '📓 View all logs', highlight: false },
                  { to: '/profile', label: '⚙️ Edit profile', highlight: false },
                ].map(({ to, label, highlight }) => (
                  <Link
                    key={to}
                    to={to}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      highlight
                        ? 'bg-orange-500/10 border border-orange-500/20 text-orange-400 hover:bg-orange-500/20'
                        : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
                    }`}
                  >
                    {label}
                    <span className="text-xs opacity-50">→</span>
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