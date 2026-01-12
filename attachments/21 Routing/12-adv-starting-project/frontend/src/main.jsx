/**
 * ============================================================================
 * MAIN ENTRY POINT - ADVANCED ROUTING PROJECT (Lesson 358)
 * ============================================================================
 *
 * This is the entry point for the React Events application.
 * The App component (in App.jsx) will be configured with React Router
 * to handle client-side routing.
 *
 * PROJECT CONTEXT (Lesson 358):
 * =============================
 * INSTRUCTOR QUOTE:
 * "Now, very important, in the react-frontend folder, you then find the React
 * app on which we'll work throughout this course section."
 *
 * This file renders the App component into the DOM.
 * The actual routing configuration will be added in App.jsx.
 *
 * SETUP REMINDER:
 * ===============
 * Make sure both servers are running:
 * - Backend: cd backend && npm start
 * - Frontend: cd frontend && npm run dev
 */
import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';

/**
 * React 18+ Root API:
 * ===================
 * Uses createRoot for concurrent features support.
 * StrictMode helps identify potential problems in development.
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
