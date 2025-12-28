// =============================================================================
// APPLICATION ENTRY POINT
// =============================================================================
// This is the entry point of the React application. It's where React is
// initialized and the root component (App) is rendered into the DOM.
//
// IMPORTANT: This project uses React 19.0.0, which is REQUIRED for the
// form actions feature that you'll learn about in this section.
//
// If you're using an older version of React, form actions will not be
// available, and you'll need to use the manual form handling approaches
// from the previous section instead.
// =============================================================================

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App.jsx';
import './index.css';

// =============================================================================
// RENDERING THE APPLICATION
// =============================================================================
// ReactDOM.createRoot() creates a root for the React application.
// This is the modern way to render React apps (introduced in React 18).
//
// React.StrictMode is a development tool that helps identify potential
// problems in your application. It:
//   - Detects components with unsafe lifecycles
//   - Warns about legacy string ref API usage
//   - Warns about deprecated findDOMNode usage
//   - Detects unexpected side effects
//   - Detects legacy context API
//
// In production builds, StrictMode has no effect - it's purely a development
// tool to help you write better React code.
// =============================================================================

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
