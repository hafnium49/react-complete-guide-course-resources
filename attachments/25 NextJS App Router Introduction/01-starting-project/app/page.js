/**
 * ============================================================================
 * PAGE COMPONENT - LESSONS 429-436: Introduction to Next.js
 * ============================================================================
 *
 * LESSON 429 - WHAT IS NEXT.JS?
 *
 * Next.js is a REACT FRAMEWORK - a framework that builds on top of React.
 * It allows you to build FULLSTACK applications with React.
 *
 * INSTRUCTOR QUOTE:
 * "This section here is about working with NextJS, a React framework, so a
 * framework that builds up on React, that allows you to build fullstack
 * applications with React."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  STANDARD REACT APP (Client-Side Only):                                 │
 * │    - Front-end only (runs in browser)                                   │
 * │    - Needs separate backend (Node.js, Django, etc.)                     │
 * │    - Data fetching via useEffect + fetch/axios                          │
 * │                                                                          │
 * │  NEXT.JS APP (Fullstack):                                               │
 * │    - Front-end AND back-end in ONE project                              │
 * │    - Server Components (render on server)                               │
 * │    - API Routes (build backend endpoints)                               │
 * │    - Server Actions (handle form submissions)                           │
 * │    - Seamless data fetching                                             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 433 - THE <Link> COMPONENT: STAYING IN THE SPA
 * ============================================================================
 *
 * THE PROBLEM WITH REGULAR <a> TAGS:
 *
 * INSTRUCTOR QUOTE:
 * "This approach now has a flaw. It's not ideal, and you can see that there
 * is a flaw if you take a look at this refresh icon up here, as I click
 * About Us, you will see that it briefly turns to a cross, which always is
 * a sign that a brand new page was downloaded from the backend."
 *
 * INSTRUCTOR QUOTE:
 * "The disadvantage with that is that we now no longer have a single-page
 * application as we normally do when working with React."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <a href="/about">                                                      │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  ✗ Full page reload (browser refreshes entirely)                       │
 * │  ✗ Loses JavaScript state                                              │
 * │  ✗ Slower navigation (downloads new HTML, CSS, JS)                     │
 * │  ✗ Not a Single-Page Application (SPA)                                 │
 * │  ✗ Browser refresh icon turns to X during navigation                   │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * THE SOLUTION: <Link> COMPONENT FROM next/link
 *
 * INSTRUCTOR QUOTE:
 * "In order to stay in there, we have to use a special component called Link,
 * which we can import from next/link. This is a component provided by the
 * NextJS framework, which you should use instead of the anchor element if
 * you have some internal link."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  <Link href="/about">                                                   │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  ✓ Client-side navigation (no full page reload)                        │
 * │  ✓ Preserves JavaScript state                                          │
 * │  ✓ Faster navigation (only fetches new content)                        │
 * │  ✓ Stays in Single-Page Application (SPA)                              │
 * │  ✓ Refresh icon does NOT change during navigation                      │
 * │  ✓ Content still pre-rendered on server, then updated on client        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * THE BEST OF BOTH WORLDS:
 *
 * INSTRUCTOR QUOTE:
 * "Actually the great thing about NextJS is that we get both. When we visit
 * a page for the first time by, for example, manually entering the URL, then
 * indeed it's rendered on the server, we get the finished page, and we're
 * here. But if we are on a page and we then navigate around by clicking
 * links, NextJS allows us to actually stay in a single-page application."
 *
 * INSTRUCTOR QUOTE:
 * "Therefore you can get the best of both worlds, a highly interactive,
 * reactive client-side application once it's active, but a finished page
 * being served if you are visiting the page for the first time."
 *
 * ============================================================================
 * LESSONS 431 & 436 - THE APP FOLDER & RESERVED FILENAMES
 * ============================================================================
 *
 * LESSON 436 - IMPORTANT: RESERVED FILENAMES ONLY WORK INSIDE app/ FOLDER!
 *
 * From the course document:
 * "These filenames are only reserved when creating them inside of the app/
 * folder (or any subfolder). Outside of the app/ folder, these filenames
 * are not treated in any special way."
 *
 * This means:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  app/page.js              → SPECIAL: Creates the "/" route              │
 * │  app/about/page.js        → SPECIAL: Creates the "/about" route         │
 * │  components/page.js       → NOT SPECIAL: Just a regular JS file!        │
 * │  lib/layout.js            → NOT SPECIAL: Just a regular JS file!        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * RESERVED FILENAMES IN THE app/ FOLDER (Lesson 436):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Filename        │  Purpose (from Lesson 436 document)                  │
 * │  ────────────────│──────────────────────────────────────────────────────│
 * │  page.js         │  Create a new page (e.g., app/about/page.js creates  │
 * │                  │  a <your-domain>/about page) - THIS FILE             │
 * │                  │                                                      │
 * │  layout.js       │  Create a new layout that wraps sibling and nested   │
 * │                  │  pages                                               │
 * │                  │                                                      │
 * │  not-found.js    │  Fallback page for "Not Found" errors (thrown by     │
 * │                  │  sibling or nested pages or layouts)                 │
 * │                  │                                                      │
 * │  error.js        │  Fallback page for other errors (thrown by sibling   │
 * │                  │  pages or nested pages or layouts)                   │
 * │                  │                                                      │
 * │  loading.js      │  Fallback page shown whilst sibling or nested pages  │
 * │                  │  (or layouts) are fetching data                      │
 * │                  │                                                      │
 * │  route.js        │  Allows you to create an API route (a page which     │
 * │                  │  does NOT return JSX but instead data, e.g., JSON)   │
 * │                  │                                                      │
 * │  template.js     │  Like layout but creates new instance on navigation  │
 * │                  │                                                      │
 * │  default.js      │  Fallback for parallel routes                        │
 * │                  │                                                      │
 * │  icon.png        │  Favicon (Lesson 435)                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * OFFICIAL DOCUMENTATION:
 * https://nextjs.org/docs/app/api-reference/file-conventions
 *
 * ============================================================================
 * THIS FILE: app/page.js - THE HOME PAGE
 * ============================================================================
 *
 * FILE-BASED ROUTING IN NEXT.JS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  File Path                    │  URL Route                              │
 * │  ─────────────────────────────│─────────────────────────────────────────│
 * │  app/page.js                  │  /  (home page - THIS FILE)             │
 * │  app/about/page.js            │  /about                                 │
 * │  app/meals/page.js            │  /meals                                 │
 * │  app/meals/[slug]/page.js     │  /meals/:slug (dynamic route)           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * LESSON 433: IMPORTING THE <Link> COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We have to use a special component called Link, which we can import from
 * next/link."
 *
 * The Link component:
 * - Comes from the 'next/link' package (built into Next.js)
 * - Replaces <a> for INTERNAL links (links within your app)
 * - Still use <a> for EXTERNAL links (links to other websites)
 *
 * USAGE:
 *   import Link from 'next/link';
 *   <Link href="/about">About Us</Link>
 *
 * PROPS:
 * - href (required): The path to navigate to
 * - className: CSS class for styling
 * - prefetch: Pre-fetch the page in background (default: true)
 * - replace: Replace current history entry instead of push
 * - scroll: Scroll to top after navigation (default: true)
 */
import Link from 'next/link';

/**
 * ============================================================================
 * LESSON 435: IMPORTING CUSTOM COMPONENTS WITH @ ALIAS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now with that components folder moved out of header.js, you, of course, also
 * again must update your import here and here you can take advantage of another
 * feature that's typically unlocked in NextJS projects, where you can use an at
 * symbol in your import paths to refer to the root project."
 *
 * THE @ ALIAS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  @/ = Root of the project (same level as app/ folder)                   │
 * │                                                                          │
 * │  Instead of: import Header from '../components/header'                  │
 * │  You write:  import Header from '@/components/header'                   │
 * │                                                                          │
 * │  This is configured in jsconfig.json:                                   │
 * │  { "compilerOptions": { "paths": { "@/*": ["./*"] } } }                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "It's this jsconfig file that configures this alias, and that's simply a
 * little convenience feature, which can simplify your import paths because
 * now I can simply refer to the root project folder with at, and then dive
 * into the components folder, and target the header.js file."
 *
 * BENEFITS OF @ ALIAS:
 * - No need for complex relative paths (../../components)
 * - Always know where the import is coming from (root)
 * - Easier refactoring when moving files around
 */
import Header from '@/components/header';

/**
 * HOME PAGE COMPONENT - A SERVER COMPONENT
 *
 * Notice: No 'use client' directive = This is a SERVER COMPONENT
 */
export default function Home() {
  /**
   * LESSON 431: PROVING SERVER-SIDE EXECUTION
   * This log appears in your TERMINAL, not browser console.
   */
  console.log('Executing'); // Check your TERMINAL, not browser console!

  return (
    <main>
      {/**
       * ====================================================================
       * LESSON 435: USING CUSTOM COMPONENTS
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "We can of course import it now. We can import it here into page.js
       * like this, and then here we can output it just as you learned it
       * with Vanilla React because we are still working with React here,
       * we are still working with components, and JSX just enhanced with
       * some extra features."
       *
       * The Header component contains the logo image and h1 heading.
       * It's a regular React component stored in /components/header.js
       * (outside the app/ folder, following the instructor's preference).
       *
       * INSTRUCTOR QUOTE:
       * "With that if you save that and you reload, you see the same content
       * as before, but now with that custom component being used."
       */}
      <Header />
      <p>🔥 Let&apos;s get started! 🔥</p>

      {/**
       * ====================================================================
       * LESSON 433: USING <Link> INSTEAD OF <a>
       * ====================================================================
       *
       * INSTRUCTOR QUOTE:
       * "It then still takes the href prop and you could still also add
       * other props like className and so on. But now it is a component
       * that will actually ensure that we stay in that single-page
       * application."
       *
       * BEFORE (Lesson 432 - causes full page reload):
       *   <a href="/about">Learn more about us</a>
       *
       * AFTER (Lesson 433 - stays in SPA):
       *   <Link href="/about">Learn more about us</Link>
       *
       * HOW TO TEST THIS:
       * 1. Watch the browser's refresh icon as you click the link
       * 2. With <a>: Icon briefly turns to X (full reload)
       * 3. With <Link>: Icon stays the same (SPA navigation)
       *
       * INSTRUCTOR QUOTE:
       * "With that link component being used here, if you now take a look
       * at that refresh icon, as I click this link, you see it never
       * changes to a cross. It always stays the same, which proves that
       * we're not leaving the page, we're not loading a brand new page."
       */}
      <p>
        <Link href="/about">Learn more about us</Link>
      </p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSONS 431-436 SUMMARY
 * ============================================================================
 *
 * KEY TAKEAWAYS:
 *
 * LESSON 431 - SERVER COMPONENTS:
 * 1. Components in app/ are SERVER COMPONENTS by default
 * 2. console.log appears in terminal, not browser
 *
 * LESSON 432 - FILE-BASED ROUTING:
 * 3. Add routes by creating folders with page.js files
 *
 * LESSON 433 - THE <Link> COMPONENT:
 * 4. Use <Link> from 'next/link' instead of <a> for internal links
 * 5. <Link> keeps you in the Single-Page Application (SPA)
 * 6. <a> causes full page reloads (bad for user experience)
 *
 * LESSON 435 - CUSTOM COMPONENTS & PROJECT STRUCTURE:
 * 7. Not every file is "special" - only reserved names have special meaning
 * 8. icon.png in app/ is used as favicon automatically
 * 9. globals.css is imported in layout.js for app-wide styles
 * 10. Custom components can be stored anywhere (app/ or outside)
 * 11. Folders without page.js are NOT routes (/components = 404)
 * 12. Use @/ alias to import from project root (configured in jsconfig.json)
 *
 * LESSON 436 - RESERVED FILENAMES REFERENCE:
 * 13. Reserved filenames ONLY work inside app/ folder (or subfolders)
 * 14. Outside app/, these are just regular files with no special meaning
 * 15. page.js → Creates a page/route
 * 16. layout.js → Wraps sibling AND nested pages
 * 17. loading.js → Shows while sibling/nested pages fetch data
 * 18. error.js → Catches errors from sibling/nested pages
 * 19. not-found.js → 404 fallback for sibling/nested pages
 * 20. route.js → API endpoint (returns data like JSON, not JSX)
 *
 * WHEN TO USE WHAT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Use <Link>:                                                            │
 * │    - Internal navigation (within your Next.js app)                     │
 * │    - /about, /meals, /contact, etc.                                    │
 * │                                                                          │
 * │  Use <a>:                                                               │
 * │    - External links (to other websites)                                 │
 * │    - https://google.com, https://github.com, etc.                      │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * VISUAL: How <Link> Navigation Works
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  1. User clicks <Link href="/about">                                    │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  2. Next.js intercepts the click (prevents default navigation)         │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  3. Server renders the /about page content                              │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  4. Content sent to client via JavaScript                               │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  5. Client-side JavaScript updates the DOM (no full reload!)           │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  6. Browser URL updates to /about                                       │
 * │     (But page never fully reloads - SPA behavior)                       │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Behind the scenes, the content of the next page will still be rendered
 * on the server, but it'll then be sent to the client, and there it'll be
 * handled by client-side JavaScript code to update what we see on the screen."
 *
 * ============================================================================
 */
