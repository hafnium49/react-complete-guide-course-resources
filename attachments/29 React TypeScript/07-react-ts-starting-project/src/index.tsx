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
 * detail: the "!" non-null assertion operator on line 33.
 *
 * NON-NULL ASSERTION — the "!" operator:
 *
 * document.getElementById('root') returns the type HTMLElement | null.
 * TypeScript adds "| null" because it cannot guarantee at compile time
 * that an element with that ID actually exists in the DOM — the HTML
 * file might not have a <div id="root">. But ReactDOM.createRoot
 * requires a definite HTMLElement (not null).
 *
 * The "!" at the end of the expression is TypeScript's NON-NULL
 * ASSERTION OPERATOR. It tells TypeScript: "I know this value is not
 * null — trust me." It removes null from the type, turning
 * HTMLElement | null into just HTMLElement.
 *
 * This is safe here because we control the public/index.html file
 * and know it contains <div id="root"></div>. In general, use "!"
 * sparingly — only when you are absolutely certain the value exists.
 *
 * AUTOMATIC TYPESCRIPT COMPILATION:
 *
 * The dev server (npm start) and the build command (npm run build)
 * both compile .ts and .tsx files to JavaScript automatically. Unlike
 * the ts-basics lessons where we ran "npx tsc" by hand, here the
 * compilation happens transparently behind the scenes as part of the
 * CRA build pipeline. The browser never sees TypeScript — it only
 * receives the compiled JavaScript output.
 *
 * ============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Create the root React node by selecting the DOM element with id="root"
// from public/index.html. The "!" at the end is the non-null assertion
// operator — it tells TypeScript that getElementById will definitely
// return an HTMLElement here, not null.
const root = ReactDOM.createRoot(document.getElementById('root')!);

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
