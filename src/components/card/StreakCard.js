import { forwardRef, useRef, useEffect, useImperativeHandle } from 'react';

// Square 1:1 Social Media Dimensions (1080x1080)
const BASE_W = 1080;
const BASE_H = 1080;

function getLast28Days() {
  const days = [];
  const today = new Date();
  for (let i = 27; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    days.push(d.toISOString().split('T')[0]);
  }
  return days;
}

function getRank(n) {
  if (n >= 365) return { label: 'LEGENDARY', color: '#a855f7', bg: 'rgba(168,85,247,0.18)' };
  if (n >= 100) return { label: 'ELITE', color: '#f59e0b', bg: 'rgba(245,158,11,0.18)' };
  if (n >= 30) return { label: 'CONSISTENT', color: '#f97316', bg: 'rgba(249,115,22,0.18)' };
  if (n >= 7) return { label: 'RISING', color: '#38bdf8', bg: 'rgba(56,189,248,0.18)' };
  return { label: 'STARTED', color: '#10b981', bg: 'rgba(16,185,129,0.18)' };
}

function drawRoundedRect(ctx, x, y, w, h, r) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
}

function drawFlame(ctx, x, y, size = 28) {
  ctx.save();
  ctx.translate(x, y);
  const scale = size / 24;
  ctx.scale(scale, scale);

  ctx.fillStyle = '#f97316';
  ctx.beginPath();
  ctx.moveTo(12, 2);
  ctx.bezierCurveTo(10.2, 4.8, 9.5, 7.5, 10.5, 10);
  ctx.bezierCurveTo(8.5, 9, 7.5, 7.2, 7.5, 5);
  ctx.bezierCurveTo(5, 8.2, 3.5, 11.8, 3.5, 15.2);
  ctx.bezierCurveTo(3.5, 19.8, 7.3, 23.5, 12, 23.5);
  ctx.bezierCurveTo(16.7, 23.5, 20.5, 19.8, 20.5, 15.2);
  ctx.bezierCurveTo(20.5, 10.5, 16.2, 6.2, 12, 2);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = '#fcd34d';
  ctx.beginPath();
  ctx.moveTo(12, 10.5);
  ctx.bezierCurveTo(11, 12.2, 10.5, 13.8, 11, 15.2);
  ctx.bezierCurveTo(10, 14.8, 9.5, 13.8, 9.5, 12.8);
  ctx.bezierCurveTo(8, 14.8, 7.5, 16.5, 8, 18.2);
  ctx.bezierCurveTo(8.6, 20.2, 10.1, 21.2, 12, 21.2);
  ctx.bezierCurveTo(13.9, 21.2, 15.4, 20.2, 16, 18.2);
  ctx.bezierCurveTo(16.8, 15.5, 14.5, 12.8, 12, 10.5);
  ctx.closePath();
  ctx.fill();
  ctx.restore();
}

function drawCardToCanvas(canvas, user, logs, recentLog, scaleMultiplier = 1) {
  // Output width and height set to high-definition canvas specs
  canvas.width = BASE_W * scaleMultiplier;
  canvas.height = BASE_H * scaleMultiplier;

  const ctx = canvas.getContext('2d');
  ctx.scale(scaleMultiplier, scaleMultiplier);

  const days = getLast28Days();
  const loggedSet = new Set(logs.map((l) => l.dateUTC));
  const streak = user?.currentStreak || 0;
  const rank = getRank(streak);

  // 1. Dark Card Background
  const bgGrad = ctx.createLinearGradient(0, 0, 0, BASE_H);
  bgGrad.addColorStop(0, '#0d111a');
  bgGrad.addColorStop(1, '#05070c');
  ctx.fillStyle = bgGrad;
  drawRoundedRect(ctx, 0, 0, BASE_W, BASE_H, 44);
  ctx.fill();

  // Outer Border
  ctx.strokeStyle = 'rgba(249, 115, 22, 0.35)';
  ctx.lineWidth = 3;
  drawRoundedRect(ctx, 2, 2, BASE_W - 4, BASE_H - 4, 44);
  ctx.stroke();

  // Radial Background Glow
  const glow = ctx.createRadialGradient(250, 100, 20, 250, 100, 500);
  glow.addColorStop(0, 'rgba(249, 115, 22, 0.22)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, BASE_W, BASE_H);

  // 2. Header: Logo & Rank Badge
  const padX = 70;
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 32px system-ui, -apple-system, sans-serif';
  ctx.fillText('DEVSTREAK', padX, 90);
  drawFlame(ctx, padX + 200, 58, 38);

  ctx.font = '700 18px system-ui, -apple-system, sans-serif';
  const rankTextWidth = ctx.measureText(rank.label).width;
  const badgeW = rankTextWidth + 60;
  const badgeX = BASE_W - padX - badgeW;
  const badgeY = 56;

  ctx.fillStyle = rank.bg;
  drawRoundedRect(ctx, badgeX, badgeY, badgeW, 46, 23);
  ctx.fill();

  ctx.strokeStyle = rank.color;
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, badgeX, badgeY, badgeW, 46, 23);
  ctx.stroke();

  ctx.fillStyle = rank.color;
  ctx.beginPath();
  ctx.arc(badgeX + 22, badgeY + 23, 7, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = '#ffffff';
  ctx.fillText(rank.label, badgeX + 38, badgeY + 29);

  // 3. User Info Section
  const name = user?.name || 'Developer';
  const initial = name.charAt(0).toUpperCase();
  const avatarY = 190;

  ctx.fillStyle = '#1e293b';
  ctx.beginPath();
  ctx.arc(padX + 36, avatarY, 36, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#334155';
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = '#f97316';
  ctx.font = '800 30px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(initial, padX + 36, avatarY + 10);
  ctx.textAlign = 'left';

  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 36px system-ui, -apple-system, sans-serif';
  ctx.fillText(name, padX + 92, avatarY - 2);

  ctx.fillStyle = '#64748b';
  ctx.font = '500 22px system-ui, -apple-system, sans-serif';
  ctx.fillText(user?.domain || 'Software Engineer', padX + 92, avatarY + 32);

  // 4. Hero Metric Boxes (Stacked vertically for 1080x1080 square format)
  // Main Active Streak Box
  const box1X = padX, box1Y = 270, box1W = BASE_W - (padX * 2), box1H = 220;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundedRect(ctx, box1X, box1Y, box1W, box1H, 28);
  ctx.fill();
  ctx.strokeStyle = 'rgba(249, 115, 22, 0.45)';
  ctx.lineWidth = 2;
  drawRoundedRect(ctx, box1X, box1Y, box1W, box1H, 28);
  ctx.stroke();

  drawFlame(ctx, box1X + 40, box1Y + 45, 130);

  const streakNumStr = String(streak);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 110px system-ui, -apple-system, sans-serif';
  ctx.fillText(streakNumStr, box1X + 180, box1Y + 145);

  const numWidth = ctx.measureText(streakNumStr).width;
  const labelX = box1X + 180 + numWidth + 24;
  const streakLabel = streak === 1 ? 'DAY STREAK' : 'DAYS STREAK';

  ctx.fillStyle = '#f97316';
  ctx.font = '800 24px system-ui, -apple-system, sans-serif';
  ctx.fillText(streakLabel, labelX, box1Y + 95);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '500 20px system-ui, -apple-system, sans-serif';
  ctx.fillText('Consistency in progress', labelX, box1Y + 130);

  // Secondary Stat Box: Best Streak
  const box2X = padX, box2Y = 515, box2W = BASE_W - (padX * 2), box2H = 120;
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  drawRoundedRect(ctx, box2X, box2Y, box2W, box2H, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, box2X, box2Y, box2W, box2H, 24);
  ctx.stroke();

  ctx.fillStyle = '#64748b';
  ctx.font = '700 18px system-ui, -apple-system, sans-serif';
  ctx.fillText('BEST ALL-TIME STREAK', box2X + 40, box2Y + 70);

  ctx.fillStyle = '#f8fafc';
  ctx.font = '800 52px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText(`${user?.longestStreak || streak} days`, box2X + box2W - 40, box2Y + 78);
  ctx.textAlign = 'left';

  // 5. Recent Activity Box
  const highlight = recentLog?.learned || recentLog?.workedOn;
  const hlY = 660;
  const hlW = BASE_W - (padX * 2);
  const hlH = 100;

  ctx.fillStyle = 'rgba(16, 185, 129, 0.08)';
  drawRoundedRect(ctx, padX, hlY, hlW, hlH, 24);
  ctx.fill();
  ctx.strokeStyle = 'rgba(16, 185, 129, 0.3)';
  ctx.lineWidth = 1.5;
  drawRoundedRect(ctx, padX, hlY, hlW, hlH, 24);
  ctx.stroke();

  ctx.fillStyle = '#10b981';
  ctx.font = '800 18px system-ui, -apple-system, sans-serif';
  ctx.fillText('LATEST WIN:', padX + 30, hlY + 58);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '500 20px system-ui, -apple-system, sans-serif';

  let msg = highlight || 'Logged activity for today!';
  const maxW = hlW - 220;
  while (ctx.measureText(msg).width > maxW && msg.length > 0) {
    msg = msg.slice(0, -1);
  }
  if (highlight && msg !== highlight) msg += '...';
  ctx.fillText(msg, padX + 175, hlY + 58);

  // 6. Heatmap Grid
  const hmY = 820;
  const cellSize = 26;
  const cellGap = 7.5;

  ctx.fillStyle = '#64748b';
  ctx.font = '700 18px system-ui, -apple-system, sans-serif';
  ctx.fillText('LAST 28 DAYS ACTIVITY', padX, hmY - 20);

  days.forEach((day, i) => {
    const cx = padX + i * (cellSize + cellGap);
    const cy = hmY;

    if (loggedSet.has(day)) {
      ctx.fillStyle = '#f97316';
      drawRoundedRect(ctx, cx, cy, cellSize, cellSize, 6);
      ctx.fill();
    } else {
      ctx.fillStyle = '#1e293b';
      drawRoundedRect(ctx, cx, cy, cellSize, cellSize, 6);
      ctx.fill();
    }
  });

  // Footer Branding
  ctx.fillStyle = '#64748b';
  ctx.font = '700 22px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'right';
  ctx.fillText('thedevstreak.com', BASE_W - padX, hmY + cellSize + 65);
  ctx.textAlign = 'left';
}

const StreakCard = forwardRef(({ user, logs = [], recentLog = null }, ref) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (canvasRef.current) {
      // 1x scale for responsive DOM preview rendering
      drawCardToCanvas(canvasRef.current, user, logs, recentLog, 1);
    }
  }, [user, logs, recentLog]);

  useImperativeHandle(ref, () => ({
    download: (filename) => {
      if (!canvasRef.current) return;
      
      // Export at full native resolution (1080x1080) for download
      const exportCanvas = document.createElement('canvas');
      drawCardToCanvas(exportCanvas, user, logs, recentLog, 1);

      const link = document.createElement('a');
      link.download = filename || `devstreak-day-${user?.currentStreak || 0}.png`;
      link.href = exportCanvas.toDataURL('image/png');
      link.click();
    },
  }));

  return (
    /* Preview container enlarged to max-w-[600px] with aspect-square */
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: '28px',
          display: 'block',
          boxShadow: '0 25px 30px -5px rgba(0, 0, 0, 0.5), 0 10px 12px -6px rgba(0, 0, 0, 0.3)',
        }}
      />
    </div>
  );
});

StreakCard.displayName = 'StreakCard';
export default StreakCard;