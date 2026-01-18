/**
 * ============================================================================
 * APPLICATION ENTRY POINT (Section 23: Deployment)
 * ============================================================================
 *
 * This is the main entry point of the React application. When the app is
 * built for production, this file becomes the starting point for the
 * entire application bundle.
 *
 * ============================================================================
 * LESSON 406 - WHY THIS CODE NEEDS TRANSFORMATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This is the code which we use during development. It's very readable and it
 * sometimes even uses features which aren't supported like that in the browser.
 * Like this JSX code that's not supported in browsers."
 *
 * EXAMPLE - JSX IS NOT VALID JAVASCRIPT:
 *
 * What we write (JSX - NOT valid in browsers):
 * ```javascript
 * root.render(<App />);
 * ```
 *
 * What the browser actually receives (after transformation):
 * ```javascript
 * root.render(React.createElement(App, null));
 * ```
 *
 * INSTRUCTOR QUOTE:
 * "It must be transformed before we can upload this on a server that serves
 * it to end users."
 *
 * ============================================================================
 * HOW THIS RELATES TO DEPLOYMENT
 * ============================================================================
 *
 * DEVELOPMENT MODE (npm start):
 *
 * INSTRUCTOR QUOTE:
 * "By the way, here during development when we preview this page we also get
 * a transformed version of that code. This development server, which we
 * started with NPM start is transforming the code as we're writing it."
 *
 * - This file is transformed on-the-fly
 * - Hot Module Replacement (HMR) enables live updates
 * - Source maps help with debugging
 * - Code is NOT minified (easier to read in DevTools)
 *
 * PRODUCTION BUILD (npm run build):
 * - This file is bundled with all other JS files
 * - JSX is transformed to React.createElement calls
 * - Code is minified and optimized
 * - Output goes to /build folder
 *
 * ============================================================================
 * THE BUILD OUTPUT STRUCTURE
 * ============================================================================
 *
 * After running `npm run build`, you'll get:
 *
 * /build
 *   ├── index.html          ← Main HTML file (references the bundles)
 *   ├── static/
 *   │   ├── js/
 *   │   │   ├── main.[hash].js      ← Your app code (minified)
 *   │   │   └── [chunk].[hash].js   ← Code-split chunks (if lazy loading)
 *   │   └── css/
 *   │       └── main.[hash].css     ← Your styles (minified)
 *   └── asset-manifest.json  ← Maps original filenames to hashed versions
 *
 * The [hash] in filenames is for CACHE BUSTING:
 * - When code changes, the hash changes
 * - This forces browsers to download the new version
 * - Old versions remain cached (great for unchanged files)
 *
 * ============================================================================
 * LESSON 407 - DEPLOYING TO FIREBASE HOSTING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "What we deploy here is in the end just some static content. It's some HTML
 * files and JavaScript files and CSS files. That's all we need to upload."
 *
 * A React SPA needs only a STATIC SITE HOST because:
 * - No server-side code execution required
 * - All logic runs in the browser (JavaScript)
 * - Backend APIs run on separate servers
 *
 * FIREBASE HOSTING COMMANDS (requires manual installation):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │ npm install -g firebase-tools   ← Install CLI globally (one-time)      │
 * │ firebase login                  ← Authenticate with Google account     │
 * │ firebase init                   ← Configure project (select Hosting)   │
 * │ npm run build                   ← Create production build              │
 * │ firebase deploy                 ← Upload /build folder to Firebase     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * CRITICAL: During `firebase init`, when asked:
 * "Configure as a single-page app (rewrite all URLs to /index.html)?"
 * → Answer: YES
 *
 * INSTRUCTOR QUOTE:
 * "You should enter yes here because as you might recall all the routing
 * and all the logic for displaying different pages is done on the client
 * side, in the browser, by JavaScript."
 *
 * Without this setting, visiting yoursite.com/posts would return 404
 * because there's no /posts/index.html file - it's a React Router path!
 *
 * ============================================================================
 */

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './App';
import './index.css';

/**
 * React 18+ uses createRoot for concurrent rendering features.
 *
 * The 'root' element is defined in public/index.html.
 * All React components will be rendered inside this element.
 *
 * In production, this entire React app becomes a "Single Page Application" (SPA):
 * - Only ONE HTML file (index.html) is served
 * - JavaScript handles all routing and page changes
 * - The server must be configured to always serve index.html for all routes
 */
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
