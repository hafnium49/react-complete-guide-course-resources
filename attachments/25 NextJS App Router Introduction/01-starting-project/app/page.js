/**
 * ============================================================================
 * PAGE COMPONENT - LESSONS 429-433: Introduction to Next.js
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
 * LESSON 431 - THE APP FOLDER & RESERVED FILENAMES
 * ============================================================================
 *
 * RESERVED FILENAMES IN THE app/ FOLDER:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Filename        │  Purpose                                             │
 * │  ────────────────│──────────────────────────────────────────────────────│
 * │  page.js         │  Defines a page/route (THIS FILE)                    │
 * │  layout.js       │  Wraps pages with shared UI (header, footer, etc.)   │
 * │  loading.js      │  Loading UI (shown while page loads)                 │
 * │  error.js        │  Error UI (shown when page has an error)             │
 * │  not-found.js    │  404 page                                            │
 * │  route.js        │  API endpoint (backend route handler)                │
 * │  template.js     │  Like layout but re-renders on navigation            │
 * │  default.js      │  Fallback for parallel routes                        │
 * └─────────────────────────────────────────────────────────────────────────┘
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
       * STATIC ASSETS IN NEXT.JS
       * Images in the `public/` folder are served at the root URL.
       */}
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
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
 * LESSONS 431-433 SUMMARY
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
