/**
 * ============================================================================
 * _app.js - LESSON 478: Next.js Pages Router Setup
 * ============================================================================
 *
 * This is a PAGES ROUTER project, the older (but still valid) approach to
 * building Next.js applications.
 *
 * ============================================================================
 * 🎓 LESSON 478: CREATING A PAGES ROUTER PROJECT
 * ============================================================================
 *
 * From the instructor:
 * "Then we get an important question whether we wanna use the App Router,
 * which is recommended. But of course, now the answer is no, because now
 * we wanna learn about this alternative."
 *
 * When creating a new Next.js project with `npx create-next-app`:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  "Would you like to use App Router?"                                    │
 * │                                                                          │
 * │  YES → Creates /app folder (App Router - modern, recommended)           │
 * │  NO  → Creates /pages folder (Pages Router - this project)              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * PAGES ROUTER PROJECT STRUCTURE
 * ============================================================================
 *
 * From the instructor:
 * "You should have a pages folder, public folder, and a styles folder."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PAGES ROUTER (This Project)     │  APP ROUTER (Alternative)           │
 * │──────────────────────────────────┼─────────────────────────────────────│
 * │  /pages                          │  /app                                │
 * │  /pages/_app.js (THIS FILE)      │  /app/layout.js                     │
 * │  /pages/_document.js             │  (built into layout.js)             │
 * │  /pages/index.js                 │  /app/page.js                       │
 * │  /pages/api/*                    │  /app/api/* (Route Handlers)        │
 * │  /public                         │  /public                            │
 * │  /styles                         │  (CSS Modules anywhere)             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * SPECIAL FILE: _app.js
 * ============================================================================
 *
 * _app.js is the ROOT COMPONENT that wraps ALL pages in your application.
 * It's similar to layout.js in the App Router, but with key differences:
 *
 * PURPOSE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Import global CSS (like globals.css)                                │
 * │  2. Persist layout between page changes                                 │
 * │  3. Add global providers (Redux, Context, etc.)                         │
 * │  4. Pass additional props to pages                                      │
 * │  5. Add custom error handling                                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * HOW _app.js WORKS
 * ============================================================================
 *
 * Next.js automatically calls this component on every page load:
 *
 *   User visits /about
 *        ↓
 *   _app.js receives:
 *   - Component = The page component (pages/about.js)
 *   - pageProps = Props from getServerSideProps/getStaticProps
 *        ↓
 *   Renders: <Component {...pageProps} />
 *        ↓
 *   User sees the /about page wrapped by _app.js
 *
 * ============================================================================
 * COMPARISON: _app.js vs layout.js (App Router)
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  _app.js (Pages Router - THIS FILE)                                     │
 * │  ──────────────────────────────────                                     │
 * │  • One global wrapper for all pages                                     │
 * │  • Receives Component and pageProps                                     │
 * │  • Client component by default                                          │
 * │  • Must import global CSS here                                          │
 * │                                                                          │
 * │  layout.js (App Router)                                                 │
 * │  ──────────────────────                                                 │
 * │  • Nested layouts at any level                                          │
 * │  • Receives { children } prop                                           │
 * │  • Server component by default                                          │
 * │  • Can export metadata                                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

import '../styles/globals.css'

/**
 * MyApp - Root Application Component
 *
 * This component wraps every page in the application.
 *
 * @param {Object} props
 * @param {React.ComponentType} props.Component - The active page component
 * @param {Object} props.pageProps - Props fetched by getServerSideProps/getStaticProps
 */
function MyApp({ Component, pageProps }) {
  /**
   * The Component prop changes based on the current route.
   * When you navigate from / to /about:
   *   Component changes from pages/index.js to pages/about.js
   *
   * pageProps contains any props pre-fetched by data fetching methods:
   *   - getServerSideProps (server-side rendering)
   *   - getStaticProps (static generation)
   *   - getInitialProps (legacy, avoid using)
   */
  return <Component {...pageProps} />
}

export default MyApp
