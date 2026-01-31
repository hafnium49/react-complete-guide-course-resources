/**
 * ============================================================================
 * HOME PAGE - LESSON 480: File-Based Routing in Action
 * ============================================================================
 *
 * This file demonstrates the core of NextJS file-based routing.
 *
 * ============================================================================
 * 🎓 LESSON 480: THE INDEX.JS SPECIAL FILE
 * ============================================================================
 *
 * From the instructor:
 * "The index.js file will be our route page. So if a request reaches our
 * domain slash nothing, just index.js will be loaded. That is in line with
 * standard websites, if I may call it like this, where we also have
 * index.html files which are typically served as route pages, if a request
 * just targets slash nothing after the domain."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE-BASED ROUTING RULES                                               │
 * │                                                                          │
 * │  pages/index.js     →  yourdomain.com/          (root route)            │
 * │  pages/news.js      →  yourdomain.com/news      (file name = path)      │
 * │  pages/about.js     →  yourdomain.com/about     (file name = path)      │
 * │  pages/blog/index.js→  yourdomain.com/blog      (nested index)          │
 * │                                                                          │
 * │  "index" is SPECIAL - it maps to the folder's root path                 │
 * │  Other file names become the URL path segment                           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "And here it's index.js, which will be served if a request reaches just
 * our domain slash nothing."
 *
 * ============================================================================
 * WHAT GOES IN PAGE FILES?
 * ============================================================================
 *
 * From the instructor:
 * "And now what goes in those page files, I mentioned it before, our standard
 * React component, the React components that should be loaded for that
 * specific page."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  PAGE FILE REQUIREMENTS                                                  │
 * │                                                                          │
 * │  1. Export a React component as the DEFAULT export                       │
 * │  2. Component name can be anything (HomePage, Home, etc.)               │
 * │  3. Return JSX code just like regular React                             │
 * │  4. No need to import React (NextJS handles it)                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * From the instructor:
 * "Now you must export this component so that NextJS is able to find it,
 * so to say."
 *
 * ============================================================================
 * NO REACT IMPORT NEEDED
 * ============================================================================
 *
 * From the instructor:
 * "As a side note, if you're wondering why we don't have any import statement
 * like this at the top, where we import React from react. NextJS projects
 * support this modern React setup where you can omit this import and it's
 * added behind the scenes, so to say."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  // Old way (still works but not required):                             │
 * │  import React from 'react';                                              │
 * │                                                                          │
 * │  // Modern NextJS way (React 17+):                                       │
 * │  // No import needed! JSX transformation is automatic.                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * SERVER-SIDE PRE-RENDERING
 * ============================================================================
 *
 * From the instructor:
 * "And now what's interesting is that the content is just some dummy content,
 * but if we view the page source here off the loaded page, then we see that
 * in there we don't just have an empty skeleton, but if we look up at closer,
 * we find the actual page content in here."
 *
 * From the instructor:
 * "And that's an important difference to a standard React app where the page
 * is not pre-rendered on the server. This HTML code which we see here is the
 * HTML code sent back by the server. And since it contains that content here
 * that means that the entire page was pre-rendered."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STANDARD REACT APP (CRA)           │  NEXT.JS                          │
 * │─────────────────────────────────────┼────────────────────────────────────│
 * │  View Page Source: Empty <div>      │  View Page Source: Full content   │
 * │  JS downloads, then renders         │  HTML arrives with content        │
 * │  Page flickers during load          │  No flickering                    │
 * │  Search engines see empty page      │  Search engines see content       │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * BENEFITS OF PRE-RENDERING:
 *
 * From the instructor:
 * "And that's why the content ends up in here and the advantage's that we
 * don't have any flickering on the page whilst we're waiting for it. And in
 * addition, search engines would also see that content here. They see what
 * our users see and that of course can be a great advantage."
 *
 * ============================================================================
 * HOW TO TEST PRE-RENDERING
 * ============================================================================
 *
 * 1. Run: npm run dev
 * 2. Visit: http://localhost:3000
 * 3. Right-click → "View Page Source" (not Inspect!)
 * 4. Search for your content (e.g., "The Home Page")
 * 5. You'll find it in the HTML - proving it was pre-rendered!
 *
 * ============================================================================
 */

// index.js is served for requests to: yourdomain.com/ (root)

/**
 * HomePage Component
 *
 * From the instructor:
 * "So here in index.js we can create a component just as we know it,
 * typically as a function and we could name it as HomePage. The component
 * name is up to you."
 *
 * This component is pre-rendered on the server, then hydrated on the client.
 */
function HomePage() {
  return <h1>The Home Page</h1>;
}

/**
 * Default export is REQUIRED for NextJS to recognize this as a page.
 * Without this export, NextJS won't serve this component.
 */
export default HomePage;
