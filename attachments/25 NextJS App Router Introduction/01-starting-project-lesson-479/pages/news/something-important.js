/**
 * ============================================================================
 * DETAIL PAGE - LESSON 481: Nested Routes with Subfolders
 * ============================================================================
 *
 * This file demonstrates NESTED ROUTING in NextJS.
 * Route: /news/something-important
 *
 * ============================================================================
 * 🎓 LESSON 481: CREATING NESTED PATHS
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
 * DetailPage Component
 *
 * From the instructor:
 * "I could copy this code from index.js in the news folder and bring it
 * into the something-important page here and then name this DetailPage
 * maybe because that should be the page holding the details for a specific
 * news item."
 *
 * Note: This is a STATIC route. In the next lesson, we'll learn about
 * DYNAMIC routes using [brackets] for variable path segments.
 */
function DetailPage() {
  return <h1>The Detail Page</h1>;
}

export default DetailPage;
