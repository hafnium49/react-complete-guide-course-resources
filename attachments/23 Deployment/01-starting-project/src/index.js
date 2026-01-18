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
 * HOW THIS RELATES TO DEPLOYMENT
 * ============================================================================
 *
 * DEVELOPMENT MODE (npm start):
 * - This file is loaded directly
 * - Hot Module Replacement (HMR) enables live updates
 * - Source maps help with debugging
 * - Code is NOT minified (easier to read in DevTools)
 *
 * PRODUCTION BUILD (npm run build):
 * - This file is bundled with all other JS files
 * - Code is minified and optimized
 * - Source maps may be separate or omitted
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
