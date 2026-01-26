/**
 * ============================================================================
 * LOADING STATE - LESSON 453: Adding a Loading Indicator
 * ============================================================================
 *
 * LESSON 453 - THE PROBLEM: NO FEEDBACK DURING DATA FETCHING
 *
 * INSTRUCTOR QUOTE:
 * "So now that we're able to load those meals, there's one thing you might
 * notice. When we reload this slash meals page, it takes a couple of seconds
 * until we see something on the screen, and that hopefully makes sense because
 * we added this delay here in that function, where we fetch the meals from
 * the database."
 *
 * THE USER EXPERIENCE PROBLEM:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WITHOUT loading.js:                                                    │
 * │                                                                          │
 * │  1. User clicks "Browse Meals"                                          │
 * │  2. Nothing happens for 2-5 seconds (data is loading)                   │
 * │  3. User thinks: "Did my click work? Is the site broken?"               │
 * │  4. Page suddenly appears                                               │
 * │                                                                          │
 * │  WITH loading.js:                                                       │
 * │                                                                          │
 * │  1. User clicks "Browse Meals"                                          │
 * │  2. "Fetching meals..." appears immediately                             │
 * │  3. User knows: "The site is working, just loading data"                │
 * │  4. Page appears when data is ready                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "If I'm on the starting page, for example, and I reload that page and I then
 * go to Browse Meals, and it's therefore not in the cache, I'm sitting there
 * and I'm not sure if my navigation request worked or not because only after
 * five seconds am I redirected to that page. And that's not a great user
 * experience."
 *
 * ============================================================================
 * THE loading.js RESERVED FILE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This experience can be improved by adding another special file to our
 * folder though. You can go to that page, which is loading data, which might
 * take a bit longer, and next to it you can add a loading.js file, which just
 * like layout and page is a reserved file name."
 *
 * RESERVED FILES IN NEXT.JS APP ROUTER:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE NAME        │  PURPOSE                                            │
 * │  ─────────────────│─────────────────────────────────────────────────────│
 * │  page.js          │  The main page component for a route                │
 * │  layout.js        │  Shared UI that wraps pages and nested layouts      │
 * │  loading.js       │  Loading UI shown while page/data is loading        │
 * │  error.js         │  Error UI shown when an error occurs                │
 * │  not-found.js     │  UI shown for 404 errors                            │
 * │  template.js      │  Like layout, but re-mounts on navigation           │
 * │  route.js         │  API endpoint (Route Handler)                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHEN DOES loading.js ACTIVATE?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And this file will become active if the page next to it or any nested page
 * or layout is loading data. And in that case, that loading.js content is
 * shown as a fallback until the data is there."
 *
 * loading.js TRIGGERS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ When the page component is an async function fetching data           │
 * │  ✓ When navigating to the page for the first time                       │
 * │  ✓ When hard-refreshing the page (not in cache)                         │
 * │  ✓ For any nested pages within the same folder                          │
 * │                                                                          │
 * │  ✗ NOT shown when page is in cache (instant navigation)                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * NEXT.JS CACHING BEHAVIOR
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "However, you then might notice that if you then go to another page and you
 * come back, the meals page is there instantly, pretty much, we don't have to
 * wait those five seconds then, and that's the case because NextJS performs
 * some pretty aggressive caching under the hood."
 *
 * INSTRUCTOR QUOTE:
 * "To be precise, it caches any page you visited, including the data of that
 * page, and if you then go to another page and come back, it loads that
 * existing page from the cache, so that it can show it to you as quickly
 * as possible."
 *
 * CACHING FLOW:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FIRST VISIT:                                                           │
 * │  User navigates → loading.js shows → Data fetches → page.js renders     │
 * │  Page is cached                                                         │
 * │                                                                          │
 * │  SUBSEQUENT VISITS (from another page):                                 │
 * │  User navigates → Cached page shows instantly (no loading.js)           │
 * │                                                                          │
 * │  HARD REFRESH:                                                          │
 * │  Cache is cleared → loading.js shows again → Fresh data fetches         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * CSS Module import for loading styles.
 *
 * INSTRUCTOR QUOTE:
 * "And I also wanna have some styling for that, and therefore I prepared a
 * loading.module.css file, which you find attached, which sets up some basic
 * styling for this loading.js file."
 */
import classes from './loading.module.css';

/**
 * MEALS LOADING PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "So here we can then therefore export a component function in that loading.js
 * file and name it MealsLoadingPage or anything like that. And then in there,
 * I want to return a paragraph, where I say Fetching meals..."
 *
 * This component is automatically displayed by Next.js while:
 * - The MealsPage async component is fetching data
 * - Any nested page within /meals is loading
 *
 * @returns {JSX.Element} A loading indicator with animated text
 */
export default function MealsLoadingPage() {
  /**
   * LOADING INDICATOR UI
   *
   * INSTRUCTOR QUOTE:
   * "In order to use it, we then just have to import classes from
   * loading.module.css and then add a class of the name loading like this
   * to this paragraph."
   *
   * The .loading class applies:
   * - Centered text alignment
   * - Pulsing color animation (light gray ↔ warm brown)
   * - Continuous looping animation
   */
  return <p className={classes.loading}>Fetching meals...</p>;
}

/**
 * ============================================================================
 * LESSON 453 - LOADING STATE SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. loading.js IS A RESERVED FILE NAME
 *    - Automatically used by Next.js
 *    - Shows while page/data is loading
 *    - Works with async Server Components
 *
 * 2. IMPROVES USER EXPERIENCE
 *
 *    INSTRUCTOR QUOTE:
 *    "And if we were to go to the starting page and we then navigate to browse
 *    meals, we also see this immediately now, hence knowing that our navigation
 *    worked and what's going on. And that's now of course, a better user
 *    experience than what we had before."
 *
 * 3. WORKS WITH NEXT.JS CACHING
 *    - Shows on first visit
 *    - Not shown when page is cached
 *    - Shows again on hard refresh
 *
 * FILE STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/meals/                                                             │
 * │  ├── page.js          ← Main page with async data fetching              │
 * │  ├── page.module.css  ← Styles for the page                             │
 * │  ├── loading.js       ← THIS FILE - Loading indicator                   │
 * │  └── loading.module.css ← Styles for loading state                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * HOW IT WORKS UNDER THE HOOD:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Next.js automatically wraps your page in React Suspense:               │
 * │                                                                          │
 * │  <Suspense fallback={<MealsLoadingPage />}>                             │
 * │    <MealsPage />                                                        │
 * │  </Suspense>                                                            │
 * │                                                                          │
 * │  While MealsPage awaits data, the fallback (loading.js) is shown.       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
