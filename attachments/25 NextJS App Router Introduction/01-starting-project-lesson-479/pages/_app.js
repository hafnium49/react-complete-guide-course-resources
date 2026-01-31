/**
 * ============================================================================
 * _app.js - LESSON 480: The App Wrapper (Ignore for Now)
 * ============================================================================
 *
 * From the instructor:
 * "And in this pages folder, we can ignore this _app.js file for the moment."
 *
 * ============================================================================
 * 🎓 LESSON 480: PROJECT CLEANUP
 * ============================================================================
 *
 * The instructor performed these cleanup steps:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  DELETED FILES/FOLDERS                                                   │
 * │                                                                          │
 * │  ✗ pages/api/           (deleted - not needed for this lesson)          │
 * │  ✗ styles/Home.module.css (deleted - using simple pages)                │
 * │  ✗ pages/index.js       (deleted original, created new simple one)      │
 * │                                                                          │
 * │  KEPT FILES                                                              │
 * │                                                                          │
 * │  ✓ pages/_app.js        (THIS FILE - ignore for now)                    │
 * │  ✓ styles/globals.css   (keep for global styles)                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "We can delete the api folder in there. And in the styles folder we can
 * also delete the Home.module.css file. We can keep the globals.css file
 * if we want though."
 *
 * ============================================================================
 * WHAT _app.js DOES (Brief Overview)
 * ============================================================================
 *
 * _app.js is the root component that wraps ALL pages.
 * We'll learn more about it in later lessons, but for now:
 *
 * • It imports global CSS (globals.css)
 * • It receives the current page as "Component"
 * • It renders that page with any passed props
 *
 * ============================================================================
 * STARTING THE DEVELOPMENT SERVER
 * ============================================================================
 *
 * From the instructor:
 * "Then in the terminal, in this integrated terminal here which has already
 * navigated into this project folder we can start the development server
 * with npm run dev. And that development server is given to us by that
 * NextJS project setup."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  npm run dev                                                             │
 * │                                                                          │
 * │  This starts the development server at http://localhost:3000            │
 * │  • Hot reload enabled (changes appear instantly)                         │
 * │  • Error overlay for debugging                                           │
 * │  • Server-side rendering active                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
