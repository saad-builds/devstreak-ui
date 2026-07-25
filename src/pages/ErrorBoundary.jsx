import React from 'react';
import { FiServer, FiRefreshCw } from 'react-icons/fi';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled UI Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col items-center justify-center p-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gray-900 border border-gray-800 text-red-500 flex items-center justify-center mb-4 shadow-xl">
            <FiServer size={32} />
          </div>

          <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-red-400 bg-red-500/10 border border-red-500/20 mb-2">
            500 Error
          </span>

          <h1 className="text-3xl font-extrabold text-white mb-2">
            Something Went Wrong
          </h1>

          <p className="text-gray-400 text-sm max-w-md mb-6">
            Our servers encountered an unexpected issue while processing your request. Please try refreshing the page.
          </p>

          <button
            onClick={() => window.location.reload()}
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl text-sm transition-colors shadow-lg shadow-orange-500/20"
          >
            <FiRefreshCw size={18} />
            <span>Reload Page</span>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}