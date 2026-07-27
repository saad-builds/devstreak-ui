import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from './pages/ErrorBoundary';
import './index.css';

console.log({
  MODE: import.meta.env.MODE,
  DEV: import.meta.env.DEV,
  PROD: import.meta.env.PROD,
  API_URL: import.meta.env.VITE_API_URL,
});

ReactDOM.createRoot(document.getElementById('root')).render(

    <ErrorBoundary>
      <App />
    </ErrorBoundary>
);