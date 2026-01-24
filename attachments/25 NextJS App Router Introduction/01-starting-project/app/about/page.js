/**
 * ============================================================================
 * ABOUT PAGE - LESSON 432: Adding a Second Page (File-Based Routing)
 * ============================================================================
 *
 * LESSON 432 - HOW TO ADD NEW ROUTES IN NEXT.JS
 *
 * INSTRUCTOR QUOTE:
 * "How could we now add a second page to this website? Let's say we also
 * want to be able to reach a page, localhost:3000/about."
 *
 * IN STANDARD REACT (with React Router):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  // You would define routes in code:                                    │
 * │  <Routes>                                                               │
 * │    <Route path="/" element={<Home />} />                                │
 * │    <Route path="/about" element={<About />} />                          │
 * │  </Routes>                                                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * IN NEXT.JS (File-Based Routing):
 *
 * INSTRUCTOR QUOTE:
 * "But in NextJS projects, you don't do that. Instead here, this app
 * directory plays an important role because in this app directory, you can
 * add new paths, which you wanna handle as routes by adding new folders."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  To add /about route:                                                   │
 * │                                                                          │
 * │  1. Create folder: app/about/                                           │
 * │  2. Add page.js inside: app/about/page.js                               │
 * │  3. Done! Visit http://localhost:3000/about                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * IMPORTANT: FOLDERS ALONE ARE NOT ENOUGH!
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "However, on its own, this folder won't do anything. If I just add this
 * folder and I then go to /about, I get this default 404 page, and I'm
 * getting this here because NextJS doesn't know about this about route yet,
 * adding a folder is not enough."
 *
 * INSTRUCTOR QUOTE:
 * "Instead, you always also must add such a page.js file if you want to
 * render a page, which kind of makes sense, I guess."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  COMMON MISTAKE:                                                        │
 * │                                                                          │
 * │  app/                                                                   │
 * │  └── about/              ← Folder only = 404 error!                     │
 * │                                                                          │
 * │  CORRECT:                                                               │
 * │                                                                          │
 * │  app/                                                                   │
 * │  └── about/                                                             │
 * │      └── page.js         ← page.js required = Route works!              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * FILE STRUCTURE → URL MAPPING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So it's now in here where we can export a new component function that
 * could be called about page, though this name does not matter, it can be
 * anything you want."
 *
 * Current project structure:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/                                                                   │
 * │  ├── page.js             → http://localhost:3000/                       │
 * │  ├── layout.js           → Wraps all pages                              │
 * │  ├── globals.css         → Global styles                                │
 * │  └── about/                                                             │
 * │      └── page.js         → http://localhost:3000/about (THIS FILE)      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * MORE EXAMPLES:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  File Path                       │  URL Route                           │
 * │  ────────────────────────────────│────────────────────────────────────  │
 * │  app/page.js                     │  /                                   │
 * │  app/about/page.js               │  /about  (THIS FILE)                 │
 * │  app/contact/page.js             │  /contact                            │
 * │  app/blog/page.js                │  /blog                               │
 * │  app/blog/[slug]/page.js         │  /blog/:slug (dynamic)               │
 * │  app/products/[id]/page.js       │  /products/:id (dynamic)             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * ABOUT PAGE COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "So it's now in here where we can export a new component function that
 * could be called about page, though this name does not matter, it can be
 * anything you want."
 *
 * NOTE: The function name (AboutPage) does NOT affect the route.
 * The FOLDER NAME (about/) determines the URL path (/about).
 *
 * You could name this function:
 * - AboutPage
 * - About
 * - MyAboutComponent
 * - AnythingYouWant
 *
 * It would still be accessible at /about because the folder is named "about".
 *
 * This is also a SERVER COMPONENT (default in app/ folder).
 * Like the home page, it executes on the server.
 */
export default function AboutPage() {
  /**
   * This console.log will appear in your TERMINAL (server-side),
   * NOT in your browser console (just like the home page).
   */
  console.log('About page executing on server');

  return (
    /**
     * STYLING WITH <main> ELEMENT
     *
     * INSTRUCTOR QUOTE:
     * "And here, I'll now just wrap it into a main element for styling
     * purposes like this. This ensures due to the styles I set up that
     * this will be centered."
     *
     * The globals.css file has styles for <main> that center the content.
     * See: app/globals.css
     */
    <main>
      <h1>About Us</h1>
      <p>This is the about page, accessible at /about</p>
      <p>
        Created by adding an <code>about</code> folder with a{' '}
        <code>page.js</code> file inside.
      </p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 432 SUMMARY: FILE-BASED ROUTING
 * ============================================================================
 *
 * KEY TAKEAWAYS:
 *
 * 1. To add a new route, create a FOLDER with that route name
 *    - /about route → create app/about/ folder
 *
 * 2. ALWAYS add a page.js file inside the folder
 *    - Folder alone = 404 error
 *    - Folder + page.js = Working route
 *
 * 3. The component function name does NOT matter
 *    - The folder name determines the URL
 *    - You can name the function anything
 *
 * 4. All pages in app/ are SERVER COMPONENTS by default
 *    - Rendered on the server
 *    - HTML sent to browser
 *
 * INSTRUCTOR QUOTE:
 * "So that is how we can add a new route by adding a folder with a page.js
 * file inside of it."
 *
 * COMPARISON: NEXT.JS vs REACT ROUTER
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  REACT ROUTER:                   NEXT.JS:                               │
 * │  ─────────────────────────────   ─────────────────────────────────────  │
 * │  Routes defined in code          Routes defined by file structure       │
 * │  Import components manually      Components auto-discovered             │
 * │  Need <Routes> and <Route>       Just create folders + page.js          │
 * │  More flexible                   More convention-based                  │
 * │  Manual configuration            Zero configuration                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
