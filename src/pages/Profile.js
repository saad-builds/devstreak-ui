import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/layout/Navbar';

const DOMAINS = [
  'MERN Stack Developer', 'Frontend Developer', 'Backend Developer',
  'Mobile Developer', 'DevOps Engineer', 'Data / ML Engineer',
  'Cybersecurity', 'Game Developer', 'Other',
];

export default function Profile() {
  const { user, updateUser } = useAuth();
  const [form, setForm] = useState({ name: user?.name || '', domain: user?.domain || '' });
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      const { data } = await api.patch('/user/me', form);
      updateUser(data.user);
      toast.success('Profile updated');
    } catch {
      toast.error('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar />
      <div className="max-w-xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-8">Profile</h1>

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 space-y-5 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Domain / Stack</label>
            <select
              value={form.domain}
              onChange={(e) => setForm({ ...form, domain: e.target.value })}
              className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-orange-500 transition-colors"
            >
              {DOMAINS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
          <button
            onClick={handleSave}
            disabled={saving}
            className="w-full bg-orange-500 hover:bg-orange-400 disabled:opacity-50 text-white font-bold py-3 rounded-lg transition-colors"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>

        {/* Stats summary */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-white font-semibold mb-4">Your Stats</h2>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Current Streak', value: `${user?.currentStreak || 0} days 🔥` },
              { label: 'Longest Streak', value: `${user?.longestStreak || 0} days` },
              { label: 'Member Since', value: user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '—' },
              { label: 'Freeze This Week', value: user?.freezeAvailable ? 'Available 🧊' : 'Used ⚠️' },
            ].map(({ label, value }) => (
              <div key={label} className="bg-gray-800 rounded-xl p-4">
                <p className="text-gray-500 text-xs mb-1">{label}</p>
                <p className="text-white font-semibold text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
