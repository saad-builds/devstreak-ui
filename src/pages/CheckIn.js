import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

function SuccessExplosion({ streak, onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 3000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className="fixed inset-0 bg-gray-950 z-50 flex flex-col items-center justify-center">
      {/* Particle ring */}
      <div className="relative flex items-center justify-center mb-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-orange-400"
            style={{
              transform: `rotate(${i * 30}deg) translateY(-80px)`,
              animation: `particleBurst 0.8s ${i * 0.04}s cubic-bezier(0.34,1.56,0.64,1) both`,
            }}
          />
        ))}
        <span style={{ fontSize: 90, lineHeight: 1, animation: 'flamePop 0.6s cubic-bezier(0.34,1.56,0.64,1) both' }}>
          🔥
        </span>
      </div>

      <div
        className="text-8xl font-black text-orange-400 mb-2 tabular-nums"
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          animation: 'numberPop 0.7s 0.2s cubic-bezier(0.34,1.56,0.64,1) both',
          background: 'linear-gradient(90deg,#f97316,#fbbf24,#f97316)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        {streak}
      </div>
      <p className="text-white text-2xl font-bold mb-2" style={{ animation: 'slideUp 0.5s 0.4s ease both' }}>
        {streak === 1 ? 'Day 1. The journey starts.' : `Day ${streak}. You showed up.`}
      </p>
      <p className="text-gray-500 text-sm" style={{ animation: 'slideUp 0.5s 0.6s ease both' }}>
        Returning to dashboard...
      </p>

      <style>{`
        @keyframes particleBurst {
          from { opacity: 0; transform: rotate(var(--r, 0deg)) translateY(0); }
          to   { opacity: 1; transform: rotate(var(--r, 0deg)) translateY(-80px); }
        }
        @keyframes flamePop {
          from { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          60%  { transform: scale(1.2) rotate(5deg); }
          to   { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes numberPop {
          from { opacity: 0; transform: scale(0.5) translateY(20px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

const FIELD_MIN = 15;

function CharBar({ value, min }) {
  const len = value.trim().length;
  const pct = Math.min(100, (len / min) * 100);
  const done = len >= min;
  return (
    <div className="mt-1.5 flex items-center gap-2">
      <div className="flex-1 h-1 bg-gray-800 rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ${done ? 'bg-green-500' : 'bg-orange-500'}`}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={`text-xs tabular-nums ${done ? 'text-green-500' : 'text-gray-600'}`}>
        {done ? '✓' : `${len}/${min}`}
      </span>
    </div>
  );
}

export default function CheckIn() {
  const { updateUser } = useAuth();
  const navigate = useNavigate();
  const [todayData, setTodayData] = useState(null);
  const [form, setForm] = useState({
    promptResponse: '',
    workedOn: '',
    learned: '',
    sessionRating: 0,
  });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showExplosion, setShowExplosion] = useState(false);
  const [newStreak, setNewStreak] = useState(0);

  useEffect(() => {
    api.get('/logs/today')
      .then(res => {
        setTodayData(res.data);
        if (res.data.alreadyLogged && res.data.log) {
          setForm({
            promptResponse: res.data.log.promptResponse,
            workedOn: res.data.log.workedOn,
            learned: res.data.log.learned,
            sessionRating: res.data.log.sessionRating || 0,
          });
        }
      })
      .catch(() => toast.error('Failed to load prompt'))
      .finally(() => setLoading(false));
  }, []);

  const allFilled =
    form.promptResponse.trim().length >= FIELD_MIN &&
    form.workedOn.trim().length >= FIELD_MIN &&
    form.learned.trim().length >= FIELD_MIN;

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!allFilled) return;
    setSubmitting(true);
    try {
      const { data } = await api.post('/logs', {
        promptIndex: todayData?.prompt?.index ?? 0,
        promptResponse: form.promptResponse,
        workedOn: form.workedOn,
        learned: form.learned,
        sessionRating: form.sessionRating || null,
      });
      updateUser(data.user);
      if (data.streakUpdated) {
        setNewStreak(data.user.currentStreak);
        setShowExplosion(true);
      } else {
        toast.success('Entry updated!');
        navigate('/dashboard');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to submit');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <span className="flame-emoji text-6xl">🔥</span>
      </div>
    );
  }

  if (showExplosion) {
    return <SuccessExplosion streak={newStreak} onDone={() => navigate('/dashboard')} />;
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="mb-8 slide-up">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-orange-400 text-xs font-bold uppercase tracking-widest">
              {todayData?.alreadyLogged ? 'Edit Entry' : "Today's Mission"}
            </span>
            {!todayData?.alreadyLogged && (
              <span className="text-gray-700 text-xs">— complete all 3 to keep your streak</span>
            )}
          </div>
          <h1 className="text-2xl font-bold text-white">
            {todayData?.alreadyLogged ? 'Update your log' : 'What did you do today?'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Daily prompt */}
          <div className="mission-card-glow bg-gray-900 border border-orange-800/40 rounded-2xl p-6 slide-up">
            <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mb-2">
              Daily Prompt
            </p>
            <p className="text-white font-semibold text-base leading-relaxed mb-4">
              {todayData?.prompt?.text}
            </p>
            <textarea
              name="promptResponse"
              value={form.promptResponse}
              onChange={handleChange}
              placeholder="Your answer..."
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors resize-none text-sm"
            />
            <CharBar value={form.promptResponse} min={FIELD_MIN} />
          </div>

          {/* Worked on */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 slide-up-delay-1">
            <label className="block text-white font-semibold mb-1">
              What did you work on? <span className="text-red-400">*</span>
            </label>
            <p className="text-gray-600 text-xs mb-3">
              A feature, a bug fix, a course, a concept — anything counts.
            </p>
            <textarea
              name="workedOn"
              value={form.workedOn}
              onChange={handleChange}
              placeholder="e.g. Built the JWT refresh token flow, fixed a CORS bug, watched a React hooks deep dive..."
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors resize-none text-sm"
            />
            <CharBar value={form.workedOn} min={FIELD_MIN} />
          </div>

          {/* Learned */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 slide-up-delay-2">
            <label className="block text-white font-semibold mb-1">
              What did you learn? <span className="text-red-400">*</span>
            </label>
            <p className="text-gray-600 text-xs mb-3">
              A concept, a pattern, a mistake — what stuck with you today.
            </p>
            <textarea
              name="learned"
              value={form.learned}
              onChange={handleChange}
              placeholder="e.g. Learned that refresh tokens should live in httpOnly cookies, not localStorage..."
              rows={3}
              className="w-full bg-gray-800 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-orange-500 transition-colors resize-none text-sm"
            />
            <CharBar value={form.learned} min={FIELD_MIN} />
          </div>

          {/* Session rating */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 slide-up-delay-3">
            <label className="block text-white font-semibold mb-3">
              How was today?
              <span className="text-gray-600 font-normal text-sm ml-2">(optional)</span>
            </label>
            <div className="flex gap-3">
              {[
                { n: 1, emoji: '😞' },
                { n: 2, emoji: '😐' },
                { n: 3, emoji: '🙂' },
                { n: 4, emoji: '😊' },
                { n: 5, emoji: '🔥' },
              ].map(({ n, emoji }) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, sessionRating: n })}
                  className={`flex-1 py-3 rounded-xl text-xl transition-all ${
                    form.sessionRating === n
                      ? 'bg-orange-500 scale-110 shadow-lg shadow-orange-500/30'
                      : 'bg-gray-800 hover:bg-gray-700 opacity-60 hover:opacity-100'
                  }`}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || !allFilled}
            className={`w-full font-bold py-4 rounded-xl text-lg transition-all ${
              allFilled
                ? 'bg-orange-500 hover:bg-orange-400 text-white hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-orange-500/25'
                : 'bg-gray-800 text-gray-600 cursor-not-allowed'
            }`}
          >
            {submitting
              ? 'Saving...'
              : todayData?.alreadyLogged
              ? 'Update Entry'
              : allFilled
              ? '🔥 Keep My Streak'
              : 'Fill all fields to continue'}
          </button>

        </form>
      </div>
    </div>
  );
}