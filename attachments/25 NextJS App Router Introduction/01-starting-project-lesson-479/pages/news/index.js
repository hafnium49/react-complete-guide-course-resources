/**
 * ============================================================================
 * NEWS PAGE - LESSON 481: Folder-Based Route Organization
 * ============================================================================
 *
 * This file was MOVED from pages/news.js to pages/news/index.js
 * Both approaches result in the SAME route: /news
 *
 * ============================================================================
 * 🎓 LESSON 481: TWO WAYS TO CREATE THE SAME ROUTE
 * ============================================================================
 *
 * From the instructor:
 * "We always have an alternative to using such a named file name. So a file
 * named differently than index.js. We could also create a news sub-folder
 * in the pages folder, move news.js in there and then rename it to index.js
 * using that special index.js file name again."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  TWO EQUIVALENT STRUCTURES FOR /news ROUTE                              │
 * │                                                                          │
 * │  OPTION A: Named File              │  OPTION B: Folder + index.js       │
 * │  ─────────────────────             │  ─────────────────────────────     │
 * │  pages/                            │  pages/                            │
 * │    news.js  ──────────────────────►│    news/                           │
 * │                                    │      index.js  ◄── THIS FILE       │
 * │                                    │                                    │
 * │  Both serve: yourdomain.com/news   │  Both serve: yourdomain.com/news   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Now, this page would still be loaded by visiting our-domain.com/news
 * because we're in the news folder. And that's important. Folders, which
 * you create in your pages folder also act as path segments."
 *
 * ============================================================================
 * WHY USE FOLDER STRUCTURE?
 * ============================================================================
 *
 * From the instructor:
 * "Now, it does matter though as soon as you start creating nested paths...
 * If we wanna have a path that is something like news/something-important
 * where something-important is the identifier of the specific news item you
 * wanna load, then you need to create a file in such a sub-folder because
 * otherwise, you can't create such a nested path."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WHEN TO USE WHICH APPROACH                                             │
 * │                                                                          │
 * │  pages/news.js                     │  pages/news/index.js               │
 * │  ─────────────────                 │  ──────────────────────            │
 * │  ✓ Simple, single page             │  ✓ When you need nested routes    │
 * │  ✓ No nested routes needed         │  ✓ /news + /news/[slug]           │
 * │  ✗ Can't add /news/something       │  ✓ Better organization            │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FOLDERS AS PATH SEGMENTS
 * ============================================================================
 *
 * From the instructor:
 * "After all, we have two segments here and if we just create files directly
 * in the pages folder, we're limited to one segment, the file name. So
 * therefore, if we want to have such a nested path, so more than one segment,
 * we need to create a sub-folder."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PATH SEGMENTS VISUALIZATION                                            │
 * │                                                                          │
 * │  URL: yourdomain.com / news / something-important                       │
 * │                        ────   ───────────────────                       │
 * │                       segment 1    segment 2                            │
 * │                        (folder)     (file)                              │
 * │                                                                          │
 * │  FILE STRUCTURE:                                                         │
 * │  pages/                                                                  │
 * │    news/                    ← becomes /news                              │
 * │      index.js               ← /news (this file)                         │
 * │      something-important.js ← /news/something-important                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * CURRENT FOLDER STRUCTURE
 * ============================================================================
 *
 * pages/
 *   news/
 *     index.js               ← THIS FILE: /news
 *     something-important.js ← /news/something-important
 *
 * ============================================================================
 */

// pages/news/index.js is served for: yourdomain.com/news

/**
 * NewsPage Component
 *
 * This is the root page for the /news route.
 * Sibling files in this folder create nested routes under /news.
 */
function NewsPage() {
  return <h1>The News Page</h1>;
}

export default NewsPage;
