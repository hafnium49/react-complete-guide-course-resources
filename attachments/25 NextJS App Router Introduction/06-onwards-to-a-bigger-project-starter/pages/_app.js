/**
 * ============================================================================
 * _app.js - LESSON 485, 489: THE ROOT APPLICATION COMPONENT
 * ============================================================================
 *
 * LESSON 485: Introduction to _app.js and project structure
 * LESSON 489: Using _app.js to wrap all pages with Layout component
 *
 * ============================================================================
 * 🎓 LESSON 489: THE POWER OF _app.js
 * ============================================================================
 *
 * From the instructor:
 * "This is a special file which exists in this Pages folder out of the box
 * which you could create on your own as well if it doesn't exist and which
 * should contain content like this. This is kind of your root component."
 *
 * From the instructor:
 * "This MyApp component, which is defined in there, and that is just a regular
 * react component in the end. This special component acts as the root component
 * NextJS will render."
 *
 * ============================================================================
 * 🔑 WHY USE _app.js FOR LAYOUT?
 * ============================================================================
 *
 * From the instructor:
 * "But you will probably see that this becomes cumbersome, the more pages our
 * application has. If we have an application with dozens or maybe hundreds of
 * pages, wrapping our general layout around all the page contents, so going
 * into all the page components to then wrap layout around the content - that
 * becomes cumbersome."
 *
 * THE PROBLEM:
 * If you wrap Layout in each page file individually:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ❌ CUMBERSOME APPROACH (wrapping in each page)                         │
 * │                                                                          │
 * │  // pages/index.js                                                      │
 * │  import Layout from '../components/layout/Layout';                      │
 * │  function HomePage() {                                                  │
 * │    return <Layout><MeetupList /></Layout>;                              │
 * │  }                                                                       │
 * │                                                                          │
 * │  // pages/new-meetup/index.js                                           │
 * │  import Layout from '../../components/layout/Layout';                   │
 * │  function NewMeetupPage() {                                             │
 * │    return <Layout><NewMeetupForm /></Layout>;                           │
 * │  }                                                                       │
 * │                                                                          │
 * │  // pages/[meetupId]/index.js                                           │
 * │  import Layout from '../../components/layout/Layout';                   │
 * │  function MeetupDetails() {                                             │
 * │    return <Layout><MeetupDetail /></Layout>;                            │
 * │  }                                                                       │
 * │                                                                          │
 * │  → Must import and wrap Layout in EVERY page file!                      │
 * │  → With 100 pages, you'd need to edit 100 files!                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * THE SOLUTION:
 * Wrap Layout in _app.js ONCE, and it applies to ALL pages:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✅ BETTER APPROACH (wrapping in _app.js)                               │
 * │                                                                          │
 * │  // pages/_app.js                                                       │
 * │  import Layout from '../components/layout/Layout';                      │
 * │                                                                          │
 * │  function MyApp({ Component, pageProps }) {                             │
 * │    return (                                                             │
 * │      <Layout>                                                           │
 * │        <Component {...pageProps} />                                     │
 * │      </Layout>                                                          │
 * │    );                                                                    │
 * │  }                                                                       │
 * │                                                                          │
 * │  → Import and wrap Layout ONCE!                                         │
 * │  → All pages automatically get the Layout!                              │
 * │  → Much more maintainable!                                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "And hence, if we now save all files with all those changes, now on the new
 * meetup page, we also got this layout applied. We got the navigation bar,
 * we got the extra styling, which ensures that the page content does not take
 * the entire width."
 *
 * ============================================================================
 * 📋 UNDERSTANDING THE PROPS
 * ============================================================================
 *
 * From the instructor:
 * "It receives props and uses object de-structuring here to pull information
 * out of the props and the information it pulls out there is a Component prop
 * and a pageProps prop."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PROPS EXPLAINED                                                         │
 * │                                                                          │
 * │  Component:                                                              │
 * │  • The actual page component to be rendered                             │
 * │  • Changes when user navigates from page A to page B                    │
 * │  • Could be: HomePage, NewMeetupPage, MeetupDetails, etc.               │
 * │                                                                          │
 * │  pageProps:                                                              │
 * │  • Props that the page component should receive                         │
 * │  • Typically from getStaticProps or getServerSideProps                  │
 * │  • Empty object {} if no data fetching methods are used                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "These props are passed into this MyApp component automatically by NextJS,
 * since NextJS is the thing using that specific component. And Component is
 * a prop that holds the actual page contents that should be rendered. So it
 * will be different whenever we switch a page."
 *
 * ============================================================================
 * 🎯 USE CASES FOR _app.js
 * ============================================================================
 *
 * From the instructor:
 * "So whenever you have some component or some setting that affects all your
 * pages you can utilize this _app.js file to easily add that without diving
 * into dozens of files individually."
 *
 * Common uses for _app.js:
 *
 * 1. LAYOUT WRAPPERS (like we're doing here)
 *    - Navigation bar, footer, sidebar
 *
 * 2. GLOBAL CSS
 *    - Import global stylesheets (already done here)
 *
 * 3. CONTEXT PROVIDERS
 *    - Auth context, theme context, etc.
 *    - Wrap Component with providers
 *
 * 4. PERSISTENT STATE
 *    - Keep state between page navigations
 *
 * 5. ERROR BOUNDARIES
 *    - Catch errors in child components
 *
 * ============================================================================
 * 📂 PROJECT STRUCTURE RECAP
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  /pages/                                                                 │
 * │  ├── _app.js              ← THIS FILE (root wrapper)                    │
 * │  ├── index.js             (home page → /)                               │
 * │  ├── /new-meetup/                                                       │
 * │  │   └── index.js         (add meetup → /new-meetup)                    │
 * │  └── /[meetupId]/                                                       │
 * │      └── index.js         (meetup details → /:meetupId)                 │
 * │                                                                          │
 * │  ALL pages above will be wrapped with Layout!                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * Import global CSS
 *
 * This makes the styles in globals.css available to ALL pages.
 * Global CSS can ONLY be imported here in _app.js, not in individual pages.
 */
import '../styles/globals.css';

/**
 * Import the Layout component
 *
 * From the instructor:
 * "Instead go to _app.js, and then here, we import layout from going up one
 * level, diving into components, layout, and then pointing at the layout file."
 *
 * The Layout component provides:
 * - MainNavigation header at the top of every page
 * - Wrapper styling that constrains page width
 * - Consistent look across all pages
 */
import Layout from '../components/layout/Layout';

/**
 * MyApp - The Root Application Component
 *
 * This component wraps EVERY page in your NextJS application.
 * Whatever is returned here is rendered for ALL pages.
 *
 * @param {Object} props - Props provided automatically by NextJS
 * @param {React.Component} props.Component - The active page component
 * @param {Object} props.pageProps - Props passed to the page (from data fetching)
 *
 * From the instructor:
 * "With that, we now know that Component here in this _app.js file will in
 * the end be the actual page content of our different pages. And it will
 * change whenever we navigate from page A to page B."
 */
function MyApp({ Component, pageProps }) {
  /**
   * WRAP COMPONENT WITH LAYOUT
   *
   * From the instructor:
   * "Now, since that's the case, we can utilize this _app.js file and simply
   * wrap this Component here with our Layout or with whichever wrapper you have.
   * And we then don't have to do it inside of our different page files."
   *
   * How it works:
   * 1. Layout renders MainNavigation + <main> wrapper
   * 2. Component (the page) becomes Layout's children (props.children)
   * 3. Every page automatically gets the navigation and styling
   *
   * From the instructor:
   * "And that means that our different page contents will be wrapped with
   * this Layout component."
   */
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

/**
 * From the instructor:
 * "And hence now on all the pages, we got this layout and we don't need to
 * wrap it around the different page contents inside of the different page
 * files. And of course that therefore is the way more maintainable and
 * convenient approach of applying general components to our application."
 */
export default MyApp;
