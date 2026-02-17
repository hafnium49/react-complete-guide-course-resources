/**
 * ============================================================================
 * index.tsx — LESSON 591
 * ============================================================================
 *
 * ENTRY POINT FOR THE REACT TYPESCRIPT APPLICATION
 *
 * This file bootstraps the React application by rendering the root
 * component (<App />) into the DOM. It is functionally identical to
 * the index.js file in a standard JavaScript CRA project — the only
 * differences are the .tsx file extension and one TypeScript-specific
 * detail: the "as HTMLElement" type assertion on line 14.
 *
 * TYPE ASSERTION — "as HTMLElement":
 *
 * document.getElementById('root') returns HTMLElement | null because
 * TypeScript cannot guarantee at compile time that an element with
 * that ID actually exists in the DOM. But ReactDOM.createRoot expects
 * a non-null HTMLElement. The "as HTMLElement" assertion tells
 * TypeScript: "trust me, this element exists — treat it as an
 * HTMLElement, not as possibly null." This is a common pattern when
 * bridging the gap between DOM queries (which may return null) and
 * React's API (which requires a definite element).
 *
 * ============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root React node by selecting the DOM element with id="root"
// from public/index.html. The "as HTMLElement" type assertion is needed
// because getElementById can return null, but createRoot requires a
// definite HTMLElement reference.
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

// Render the App component wrapped in StrictMode, which enables extra
// development warnings — the same pattern used in non-TypeScript React.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
