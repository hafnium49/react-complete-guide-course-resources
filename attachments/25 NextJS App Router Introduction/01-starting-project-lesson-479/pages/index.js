/**
 * ============================================================================
 * HOME PAGE - LESSONS 480-481: File-Based Routing Summary
 * ============================================================================
 *
 * This file serves the root route: /
 *
 * ============================================================================
 * 🎓 LESSON 481: COMPLETE ROUTE STRUCTURE
 * ============================================================================
 *
 * From the instructor:
 * "So now we know about this concept of using files in the pages folder for
 * creating routes, which then load these different components that live in
 * these files and we also see that this server-side pre-rendering works out
 * of the box."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  CURRENT PROJECT ROUTES (Updated for Lesson 482)                        │
 * │                                                                          │
 * │  FILE                              │  URL                               │
 * │────────────────────────────────────┼────────────────────────────────────│
 * │  pages/index.js (THIS FILE)        │  /                                 │
 * │  pages/news/index.js               │  /news                             │
 * │  pages/news/[newsId].js            │  /news/:newsId (DYNAMIC!)         │
 * │  pages/news/something-important.js │  /news/something-important (static)│
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * 🎓 LESSON 482 NOTE: The [newsId].js file uses square bracket syntax to
 * create a DYNAMIC route that handles any value after /news/
 *
 * ============================================================================
 * KEY CONCEPTS LEARNED (Lessons 480-481)
 * ============================================================================
 *
 * 1. FILE-BASED ROUTING
 *    • Files in /pages become routes automatically
 *    • No router configuration needed
 *
 * 2. SPECIAL index.js
 *    • index.js serves the folder's root path
 *    • pages/index.js → /
 *    • pages/news/index.js → /news
 *
 * 3. FILE NAME = PATH SEGMENT
 *    • news.js → /news
 *    • about.js → /about
 *
 * 4. FOLDERS AS PATH SEGMENTS
 *    • Folders create nested paths
 *    • news/ folder enables /news/something routes
 *
 * 5. TWO EQUIVALENT APPROACHES
 *    • pages/news.js = pages/news/index.js
 *    • Same route, different organization
 *
 * 6. SERVER-SIDE PRE-RENDERING
 *    • Works automatically, no extra setup
 *    • Content visible in "View Page Source"
 *    • SEO-friendly out of the box
 *
 * ============================================================================
 * TESTING THE ROUTES (Updated for Lesson 482)
 * ============================================================================
 *
 * 1. Run: npm run dev
 * 2. Visit these URLs to see each page:
 *
 *    http://localhost:3000                    → "The Home Page"
 *    http://localhost:3000/news               → "The News Page"
 *    http://localhost:3000/news/something-important → "The Detail Page" (static)
 *
 * 🎓 LESSON 482 - Test Dynamic Routes (all show "The Detail Page"):
 *
 *    http://localhost:3000/news/thiscourseisgreat
 *    http://localhost:3000/news/breaking-news
 *    http://localhost:3000/news/any-value-works
 *
 * From the instructor:
 * "If I load this page for /news/thiscourseisgreat, I see the detail page,
 * but I also see for something else or anything else we enter after slash news."
 *
 * ============================================================================
 */

// pages/index.js is served for: yourdomain.com/ (root)

/**
 * HomePage Component
 *
 * The default landing page of the application.
 * This is pre-rendered on the server for instant load + SEO.
 */
function HomePage() {
  return <h1>The Home Page</h1>;
}

export default HomePage;
