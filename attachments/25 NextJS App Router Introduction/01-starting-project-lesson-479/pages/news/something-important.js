/**
 * ============================================================================
 * STATIC DETAIL PAGE - LESSON 481-482: From Static to Dynamic Routes
 * ============================================================================
 *
 * This file demonstrates a STATIC (hard-coded) nested route.
 * Route: /news/something-important (ONLY this exact URL)
 *
 * ============================================================================
 * 🎓 LESSON 482: WHY STATIC ROUTES ARE LIMITED
 * ============================================================================
 *
 * From the instructor (Lesson 482):
 * "Creating the detail page like this works, until we realize that we probably
 * would have more than one news item on our news site."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE LIMITATION OF THIS FILE                                            │
 * │                                                                          │
 * │  This file (something-important.js) ONLY handles ONE specific URL:      │
 * │  /news/something-important                                               │
 * │                                                                          │
 * │  For a real news site with hundreds of articles, you would need:        │
 * │  • article-1.js                                                         │
 * │  • article-2.js                                                         │
 * │  • breaking-news.js                                                     │
 * │  • ... hundreds more files!                                             │
 * │                                                                          │
 * │  This is NOT practical. See [newsId].js for the dynamic solution!      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "So hard coding, the identifier, like something dash important like this in
 * the file name is not very realistic."
 *
 * ============================================================================
 * 🎓 LESSON 481: CREATING NESTED PATHS (Original Lesson)
 * ============================================================================
 *
 * From the instructor:
 * "If we wanna have a path that is something like news/something-important
 * where something-important is the identifier of the specific news item you
 * wanna load, then you need to create a file in such a sub-folder because
 * otherwise, you can't create such a nested path."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  NESTED ROUTE STRUCTURE                                                  │
 * │                                                                          │
 * │  pages/                                                                  │
 * │    news/                           ← Folder = /news path segment        │
 * │      index.js                      ← Serves /news                       │
 * │      something-important.js        ← Serves /news/something-important   │
 * │                                       (THIS FILE)                       │
 * │                                                                          │
 * │  URL MAPPING:                                                            │
 * │  /news                    → pages/news/index.js                         │
 * │  /news/something-important→ pages/news/something-important.js           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * TWO PATH SEGMENTS
 * ============================================================================
 *
 * From the instructor:
 * "After all, we have two segments here and if we just create files directly
 * in the pages folder, we're limited to one segment, the file name."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  URL BREAKDOWN                                                           │
 * │                                                                          │
 * │  yourdomain.com/news/something-important                                 │
 * │                 ────  ───────────────────                               │
 * │                  │           │                                           │
 * │                  │           └── Segment 2: file name                    │
 * │                  └────────────── Segment 1: folder name                  │
 * │                                                                          │
 * │  Without folders, you can only have ONE segment (the file name).        │
 * │  Folders enable MULTIPLE segments in the URL path.                       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ALTERNATIVE: NESTED SUBFOLDER
 * ============================================================================
 *
 * From the instructor:
 * "Now, of course, here again we could alternatively also create another
 * nested sub-folder, something-important with the index.js file in there.
 * That would again be the alternative to using such a named file name in
 * the news folder."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  EQUIVALENT STRUCTURES FOR /news/something-important                     │
 * │                                                                          │
 * │  OPTION A (Current):               │  OPTION B (Alternative):           │
 * │  ─────────────────────             │  ──────────────────────            │
 * │  pages/                            │  pages/                            │
 * │    news/                           │    news/                           │
 * │      something-important.js ◄──────│      something-important/          │
 * │                                    │        index.js                    │
 * │                                    │                                    │
 * │  Both serve: /news/something-important                                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * Use the subfolder approach if you need even deeper nesting:
 * /news/something-important/comments → news/something-important/comments.js
 *
 * ============================================================================
 * TESTING NESTED ROUTES
 * ============================================================================
 *
 * From the instructor:
 * "And hence, if we save everything and we visit /news, we see The News page,
 * and if I visit /news/something-important, then we see The Detail Page."
 *
 * Steps to test:
 * 1. Run: npm run dev
 * 2. Visit: http://localhost:3000/news → "The News Page"
 * 3. Visit: http://localhost:3000/news/something-important → "The Detail Page"
 *
 * ============================================================================
 * CURRENT ROUTE MAPPING
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE                              │  URL                               │
 * │────────────────────────────────────┼────────────────────────────────────│
 * │  pages/index.js                    │  /                                 │
 * │  pages/news/index.js               │  /news                             │
 * │  pages/news/something-important.js │  /news/something-important         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

// pages/news/something-important.js serves: /news/something-important

/**
 * DetailPage Component - STATIC VERSION
 *
 * From the instructor (Lesson 481):
 * "I could copy this code from index.js in the news folder and bring it
 * into the something-important page here and then name this DetailPage
 * maybe because that should be the page holding the details for a specific
 * news item."
 *
 * ============================================================================
 * 🎓 LESSON 482: STATIC vs DYNAMIC ROUTE COMPARISON
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STATIC ROUTE (THIS FILE)          │  DYNAMIC ROUTE ([newsId].js)      │
 * │────────────────────────────────────┼────────────────────────────────────│
 * │  something-important.js            │  [newsId].js                       │
 * │  Only: /news/something-important   │  Any: /news/ANYTHING              │
 * │  One URL per file                  │  Infinite URLs, one file          │
 * │  Not scalable                      │  Highly scalable                  │
 * │  Good for: truly unique pages      │  Good for: data-driven content    │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NOTE ON ROUTE PRIORITY:
 * When both this file and [newsId].js exist, NextJS uses static routes first.
 * /news/something-important → loads THIS file (exact match wins)
 * /news/anything-else       → loads [newsId].js (dynamic fallback)
 *
 * From the instructor (Lesson 482):
 * "Instead, we wanna create a so-called dynamic page where the path segment
 * to concrete value in the path can be dynamic."
 *
 * ============================================================================
 * RECOMMENDATION: Use [newsId].js instead of static files like this one
 * for content that follows the same template but with different data.
 * ============================================================================
 */
function DetailPage() {
  return <h1>The Detail Page</h1>;
}

export default DetailPage;
