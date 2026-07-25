import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { FiZap } from 'react-icons/fi';

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="w-16 h-16 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 animate-bounce">
          <FiZap size={32} />
        </div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}