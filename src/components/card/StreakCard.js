import { forwardRef } from 'react';
import { getLastNDays } from '../../utils/dates';

const StreakCard = forwardRef(({ user, logs = [], recentLog = null }, ref) => {
  const days = getLastNDays(30);
  const loggedSet = new Set(logs.map((l) => l.dateUTC));
  const streak = user?.currentStreak || 0;

  const getTrophyLabel = (n) => {
    if (n >= 365) return { label: 'LEGENDARY', color: '#a855f7' };
    if (n >= 100) return { label: 'ELITE', color: '#f59e0b' };
    if (n >= 30)  return { label: 'CONSISTENT', color: '#fb923c' };
    if (n >= 7)   return { label: 'RISING', color: '#60a5fa' };
    return { label: 'STARTED', color: '#4ade80' };
  };

  const trophy = getTrophyLabel(streak);

  return (
    <div
      ref={ref}
      style={{
        width: '100%',
        maxWidth: 480,
        fontFamily: "'Inter', system-ui, sans-serif",
        background: 'linear-gradient(145deg, #0a0a0f 0%, #111827 50%, #0f0a00 100%)',
        borderRadius: 20,
        overflow: 'hidden',
        position: 'relative',
        boxShadow: '0 25px 60px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
      }}
    >
      {/* Top gold border accent */}
      <div style={{
        height: 3,
        background: `linear-gradient(90deg, transparent, ${trophy.color}, #f97316, ${trophy.color}, transparent)`,
      }} />

      {/* Background glow orb */}
      <div style={{
        position: 'absolute',
        top: -60,
        right: -60,
        width: 220,
        height: 220,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(249,115,22,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ padding: '28px 28px 24px' }}>

        {/* Header row */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            {/* Trophy rank badge */}
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: `${trophy.color}18`,
              border: `1px solid ${trophy.color}40`,
              borderRadius: 6,
              padding: '3px 8px',
              marginBottom: 8,
            }}>
              <div style={{ width: 5, height: 5, borderRadius: '50%', background: trophy.color }} />
              <span style={{ color: trophy.color, fontSize: 10, fontWeight: 700, letterSpacing: '0.1em' }}>
                {trophy.label}
              </span>
            </div>
            <div style={{ color: '#ffffff', fontSize: 18, fontWeight: 800, lineHeight: 1.2 }}>
              {user?.name}
            </div>
            <div style={{ color: '#6b7280', fontSize: 12, marginTop: 3 }}>
              {user?.domain}
            </div>
          </div>

          {/* DevStreak logo */}
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22 }}>🔥</div>
            <div style={{ color: '#374151', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em', marginTop: 2 }}>
              DEVSTREAK
            </div>
          </div>
        </div>

        {/* Main streak hero */}
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          gap: 16,
          marginBottom: 24,
          padding: '20px 24px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: 14,
          border: '1px solid rgba(255,255,255,0.05)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Subtle grid pattern */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(rgba(249,115,22,0.06) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }} />

          <div style={{ position: 'relative' }}>
            <div style={{
              fontSize: 72,
              fontWeight: 900,
              lineHeight: 1,
              fontFamily: "'Space Grotesk', 'Inter', sans-serif",
              background: 'linear-gradient(135deg, #f97316 0%, #fbbf24 50%, #f97316 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              {streak}
            </div>
            <div style={{ color: '#9ca3af', fontSize: 13, fontWeight: 600, marginTop: 2 }}>
              DAY STREAK
            </div>
          </div>

          <div style={{ position: 'relative', paddingBottom: 6 }}>
            <div style={{ color: '#374151', fontSize: 11, marginBottom: 4 }}>BEST STREAK</div>
            <div style={{ color: '#6b7280', fontSize: 22, fontWeight: 800 }}>
              {user?.longestStreak || 0}
              <span style={{ color: '#374151', fontSize: 11, fontWeight: 400, marginLeft: 3 }}>days</span>
            </div>
          </div>
        </div>

        {/* What they learned */}
        {recentLog?.learned && (
          <div style={{
            background: 'rgba(249,115,22,0.05)',
            border: '1px solid rgba(249,115,22,0.15)',
            borderRadius: 10,
            padding: '12px 14px',
            marginBottom: 20,
          }}>
            <div style={{ color: '#f97316', fontSize: 9, fontWeight: 700, letterSpacing: '0.1em', marginBottom: 5 }}>
              TODAY I LEARNED
            </div>
            <div style={{
              color: '#d1d5db',
              fontSize: 12,
              lineHeight: 1.5,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}>
              {recentLog.learned}
            </div>
          </div>
        )}

        {/* Heatmap */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ color: '#374151', fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', marginBottom: 8 }}>
            LAST 30 DAYS
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
            {days.map((day) => (
              <div
                key={day}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 2,
                  background: loggedSet.has(day)
                    ? 'linear-gradient(135deg, #f97316, #fbbf24)'
                    : 'rgba(255,255,255,0.05)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 16,
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}>
          <div style={{ color: '#374151', fontSize: 10 }}>
            devstreak.app
          </div>
          <div style={{
            color: '#374151',
            fontSize: 10,
            fontStyle: 'italic',
          }}>
            Build. Learn. Repeat.
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        height: 2,
        background: `linear-gradient(90deg, transparent, ${trophy.color}60, transparent)`,
      }} />
    </div>
  );
});

StreakCard.displayName = 'StreakCard';
export default StreakCard;