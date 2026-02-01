/**
 * ============================================================================
 * Layout.js - LESSON 485: LAYOUT WRAPPER COMPONENT
 * ============================================================================
 *
 * This is a standard React layout component - nothing NextJS-specific here!
 *
 * From the instructor:
 * "These are mostly just React components and standard React code.
 * There's nothing NextJS specific about those files."
 *
 * ============================================================================
 * 🎓 WHAT IS A LAYOUT COMPONENT?
 * ============================================================================
 *
 * A layout component is a wrapper that provides consistent UI elements
 * across multiple pages. Common elements include:
 *
 * • Navigation header (rendered by MainNavigation)
 * • Footer
 * • Sidebars
 * • Container styling
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  HOW LAYOUT WORKS                                                        │
 * │                                                                          │
 * │  ┌─────────────────────────────────────────────────────────────────┐   │
 * │  │  <Layout>                                                        │   │
 * │  │    ┌───────────────────────────────────────────────────────┐    │   │
 * │  │    │  <MainNavigation />  (always shown)                   │    │   │
 * │  │    └───────────────────────────────────────────────────────┘    │   │
 * │  │    ┌───────────────────────────────────────────────────────┐    │   │
 * │  │    │  <main>                                                │    │   │
 * │  │    │    {props.children}  (page content changes)           │    │   │
 * │  │    │  </main>                                               │    │   │
 * │  │    └───────────────────────────────────────────────────────┘    │   │
 * │  └─────────────────────────────────────────────────────────────────┘   │
 * │  </Layout>                                                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ⚛️ REACT PATTERNS USED
 * ============================================================================
 *
 * 1. CHILDREN PROP (COMPOSITION)
 *    The `props.children` pattern allows any content to be wrapped:
 *
 *    <Layout>
 *      <HomePage />   ← This becomes props.children
 *    </Layout>
 *
 *    <Layout>
 *      <MeetupDetailPage />   ← Or this becomes props.children
 *    </Layout>
 *
 * 2. CSS MODULES
 *    Styles are imported from Layout.module.css
 *    Classes are accessed via: classes.main, classes.container, etc.
 *
 * ============================================================================
 * 📝 HOW THIS WILL BE USED IN NEXTJS
 * ============================================================================
 *
 * In upcoming lessons, you'll wrap page components with this Layout:
 *
 * Example in pages/index.js:
 * ```javascript
 * import Layout from '../components/layout/Layout';
 * import MeetupList from '../components/meetups/MeetupList';
 *
 * function HomePage(props) {
 *   return (
 *     <Layout>
 *       <MeetupList meetups={props.meetups} />
 *     </Layout>
 *   );
 * }
 * ```
 *
 * Or you could wrap it in _app.js to apply to ALL pages:
 * ```javascript
 * function MyApp({ Component, pageProps }) {
 *   return (
 *     <Layout>
 *       <Component {...pageProps} />
 *     </Layout>
 *   );
 * }
 * ```
 *
 * ============================================================================
 * 🏗️ COMPONENT HIERARCHY IN THIS PROJECT
 * ============================================================================
 *
 * From the instructor:
 * "We get components for showing meetups as a list, for showing details
 * about a meetup, for showing a form, for having a layout with a navigation,
 * and some UI components."
 *
 *   Layout.js (this file)
 *   └── MainNavigation.js (imported and rendered here)
 *       └── Header with logo + navigation links
 *
 * ============================================================================
 */

import MainNavigation from './MainNavigation';
import classes from './Layout.module.css';

/**
 * Layout Component - Consistent Page Wrapper
 *
 * Provides a consistent structure for all pages:
 * - Navigation at the top (via MainNavigation)
 * - Main content area for page-specific content
 *
 * @param {Object} props
 * @param {React.ReactNode} props.children - The page content to wrap
 *
 * USAGE:
 * <Layout>
 *   <YourPageContent />
 * </Layout>
 */
function Layout(props) {
  return (
    <div>
      {/*
       * MainNavigation - Always rendered at the top
       * Contains the "React Meetups" logo and navigation links
       */}
      <MainNavigation />

      {/*
       * Main Content Area
       * - Uses CSS Module class for styling (centering, padding, etc.)
       * - props.children contains whatever is wrapped by <Layout>
       *
       * The semantic <main> element tells browsers and screen readers
       * that this is the primary content area of the page.
       */}
      <main className={classes.main}>{props.children}</main>
    </div>
  );
}

export default Layout;
