/**
 * ============================================================================
 * NEWS PAGE - LESSON 480: File Name = URL Path
 * ============================================================================
 *
 * This file demonstrates how file names become URL paths in NextJS.
 *
 * ============================================================================
 * 🎓 LESSON 480: FILE NAME ROUTING
 * ============================================================================
 *
 * From the instructor:
 * "Then we might also have a news.js file for requests that reach our domain
 * slash news. And that's important with the exception of the index name
 * which is a special name, which is served whenever we have a request to
 * just slash nothing, the file name will be used as a path name."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  THE ROUTING RULE                                                        │
 * │                                                                          │
 * │  File name (without .js) = URL path segment                              │
 * │                                                                          │
 * │  news.js       →  /news       (NOT /news.js)                            │
 * │  about.js      →  /about                                                 │
 * │  contact.js    →  /contact                                               │
 * │  products.js   →  /products                                              │
 * │                                                                          │
 * │  EXCEPTION: index.js → / (root of that folder)                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "So news.js the content in here, the React component in here, would be
 * served for requests to our domain slash news, for example. So not news.js,
 * but just news. Then the news.js file would be served."
 *
 * ============================================================================
 * BUILDING A MULTI-PAGE APPLICATION
 * ============================================================================
 *
 * From the instructor:
 * "And now let's say to get started with NextJS we wanna build a simple
 * website with three kinds of pages, a starting page let's say, then a
 * news page with a list of news and then a page for the news details."
 *
 * PLANNED PAGE STRUCTURE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PAGE                 │  FILE              │  URL                       │
 * │───────────────────────┼────────────────────┼────────────────────────────│
 * │  Starting Page        │  pages/index.js    │  /                         │
 * │  News List            │  pages/news.js     │  /news                     │
 * │  News Details         │  (coming later)    │  /news/[id]                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FILE-BASED ROUTING vs REACT ROUTER
 * ============================================================================
 *
 * In standard React (with React Router):
 *   <Route path="/news" element={<NewsPage />} />
 *
 * In NextJS (file-based routing):
 *   Just create pages/news.js - that's it!
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REACT ROUTER                      │  NEXT.JS FILE-BASED                │
 * │────────────────────────────────────┼─────────────────────────────────────│
 * │  Define routes in code             │  Create files in /pages            │
 * │  Configure in App.js or router     │  Automatic from file structure     │
 * │  Need to install react-router-dom  │  Built-in, zero config             │
 * │  Import and wrap with <Router>     │  Just works                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * SERVER-SIDE RENDERING WORKS AUTOMATICALLY
 * ============================================================================
 *
 * From the instructor:
 * "And as you see, by looking at the page source, in addition to that file
 * based routing, we also already use that built-in server-side rendering
 * feature without any extra setup because it works out of the box."
 *
 * When you visit /news:
 * 1. Server receives the request
 * 2. NextJS finds pages/news.js
 * 3. Server renders the component to HTML
 * 4. HTML is sent to the browser (with content!)
 * 5. React "hydrates" the page for interactivity
 *
 * ============================================================================
 * TESTING THIS PAGE
 * ============================================================================
 *
 * From the instructor:
 * "And therefore if I now visit localhost:3000 I see the homepage. And if
 * we instead would visit localhost:3000/news we see the news page."
 *
 * Steps:
 * 1. Run: npm run dev
 * 2. Visit: http://localhost:3000/news
 * 3. You should see "The News Page"
 * 4. View Page Source to confirm pre-rendering
 *
 * ============================================================================
 */

// news.js is served for requests to: yourdomain.com/news

/**
 * NewsPage Component
 *
 * From the instructor:
 * "And with that here in the news.js file we would have let's say NewsPage
 * component and of course also export the news page, and here we could say
 * 'The News Page.'"
 *
 * Note: No React import needed - NextJS handles it automatically!
 */
function NewsPage() {
  return <h1>The News Page</h1>;
}

export default NewsPage;
