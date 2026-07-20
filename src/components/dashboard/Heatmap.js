import { getLastNDays, formatDate } from '../../utils/dates';

export default function Heatmap({ logs = [] }) {
  const days = getLastNDays(30);
  const loggedSet = new Set(logs.map((l) => l.dateUTC));

  return (
    <div>
      <p className="text-xs text-gray-500 mb-2">Last 30 days</p>
      <div className="flex flex-wrap gap-1.5">
        {days.map((day) => {
          const logged = loggedSet.has(day);
          return (
            <div
              key={day}
              title={formatDate(day)}
              className={`w-6 h-6 rounded-sm transition-colors ${
                logged
                  ? 'bg-orange-500 hover:bg-orange-400'
                  : 'bg-gray-800 hover:bg-gray-700'
              }`}
            />
          );
        })}
      </div>
      <div className="flex items-center gap-2 mt-2">
        <div className="w-3 h-3 rounded-sm bg-gray-800" />
        <span className="text-xs text-gray-600">Missed</span>
        <div className="w-3 h-3 rounded-sm bg-orange-500 ml-2" />
        <span className="text-xs text-gray-600">Logged</span>
      </div>
    </div>
  );
}
