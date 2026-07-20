import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import Navbar from '../components/layout/Navbar';
import { formatDate } from '../utils/dates';

const RATINGS = ['', '😞', '😐', '🙂', '😊', '🔥'];

export default function History() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    api.get('/logs?limit=90')
      .then(res => setLogs(res.data.logs))
      .catch(() => toast.error('Failed to load history'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-4xl animate-pulse">🔥</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-2xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-2">Your Log History</h1>
        <p className="text-gray-400 text-sm mb-8">{logs.length} entries total</p>

        {logs.length === 0 && (
          <div className="text-center py-16 text-gray-600">
            <p className="text-4xl mb-3">📓</p>
            <p>No logs yet. Start logging today!</p>
          </div>
        )}

        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log._id}
              className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpanded(expanded === log._id ? null : log._id)}
                className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-gray-800/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-500" />
                  <span className="text-white font-medium">{formatDate(log.dateUTC)}</span>
                </div>
                <div className="flex items-center gap-3">
                  {log.sessionRating && (
                    <span className="text-lg">{RATINGS[log.sessionRating]}</span>
                  )}
                  <span className="text-gray-500 text-sm">
                    {expanded === log._id ? '▲' : '▼'}
                  </span>
                </div>
              </button>

              {expanded === log._id && (
                <div className="px-5 pb-5 space-y-4 border-t border-gray-800 pt-4">
                  <div>
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-1">Worked On</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{log.workedOn}</p>
                  </div>
                  <div>
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-1">Learned</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{log.learned}</p>
                  </div>
                  <div>
                    <p className="text-orange-400 text-xs font-semibold uppercase tracking-widest mb-1">Prompt Response</p>
                    <p className="text-gray-300 text-sm leading-relaxed">{log.promptResponse}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
