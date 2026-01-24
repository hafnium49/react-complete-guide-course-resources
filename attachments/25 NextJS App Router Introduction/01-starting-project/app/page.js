/**
 * ============================================================================
 * PAGE COMPONENT - LESSONS 429-432: Introduction to Next.js
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
 * INSTRUCTOR QUOTE:
 * "Applications where the front end is still controlled by React, just as
 * you learned it throughout this course, but where this front-end then
 * seamlessly blends with the backend."
 *
 * ============================================================================
 * LESSON 430 - CREATING A NEXT.JS PROJECT
 * ============================================================================
 *
 * To create a new Next.js project, run:
 *   npx create-next-app@latest your-project-name
 *
 * INSTRUCTOR QUOTE:
 * "We need a project that comes with NextJS pre-installed and that has a
 * certain structure and setup that's needed by NextJS."
 *
 * During setup, you'll be asked several questions:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ? Would you like to use TypeScript?              → No (for this course)│
 * │  ? Would you like to use ESLint?                  → Yes                 │
 * │  ? Would you like to use Tailwind CSS?            → No (for simplicity) │
 * │  ? Would you like to use `src/` directory?        → No                  │
 * │  ? Would you like to use App Router? (recommended)→ YES (important!)    │
 * │  ? Customize default import alias?                → No                  │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 431 - THE APP FOLDER & RESERVED FILENAMES
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Let's take a look at that app folder because that is the most important
 * folder in a modern NextJS project. It's this app folder where you set up
 * your different pages that you want to have on your overall website."
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
 * INSTRUCTOR QUOTE:
 * "Page.js is a reserved filename just as Layout.js and a couple of other
 * filenames you'll encounter throughout this section."
 *
 * ============================================================================
 * THIS FILE: app/page.js - THE HOME PAGE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "A file named Page.js simply tells NextJS that it should render a page."
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
 * LESSON 431 - SERVER COMPONENTS: THE KEY CONCEPT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "If you take a look at that file, you see that in there, it's in the end
 * a React component function that's stored in the file, something you of
 * course know as a React developer."
 *
 * INSTRUCTOR QUOTE:
 * "The special thing about this component here just is that it's a so-called
 * server component, a type of component that's not really easily built with
 * just React, but that is embraced and supported by NextJS."
 *
 * WHAT MAKES IT A SERVER COMPONENT?
 *
 * INSTRUCTOR QUOTE:
 * "Now, on the surface, it's a regular component. There's nothing special
 * about it, but NextJS ensures that this component is actually rendered on
 * the server, that this component function is executed on the server."
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SERVER COMPONENT (default in app/ folder):                             │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  ✓ Component function executes on the SERVER                           │
 * │  ✓ console.log appears in TERMINAL (server), not browser               │
 * │  ✓ Can directly access databases, file system, env variables           │
 * │  ✓ Returned JSX is sent to browser as HTML                             │
 * │  ✓ Reduces JavaScript sent to browser (faster page loads)              │
 * │                                                                          │
 * │  ✗ CANNOT use useState, useEffect, useContext                          │
 * │  ✗ CANNOT use browser APIs (window, document, localStorage)            │
 * │  ✗ CANNOT use event handlers (onClick, onChange, etc.)                 │
 * │                                                                          │
 * │  CLIENT COMPONENT (add 'use client' at top of file):                   │
 * │  ─────────────────────────────────────────────────────────────────────  │
 * │  ✓ Works like traditional React (runs in browser)                      │
 * │  ✓ Can use hooks, state, effects, event handlers                       │
 * │  ✓ Can use browser APIs                                                 │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * LESSON 432 - ADDING MORE PAGES (FILE-BASED ROUTING)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In this app directory, you can add new paths, which you wanna handle as
 * routes by adding new folders. So if we want to support a /about route,
 * we have to add an about folder."
 *
 * HOW TO ADD A NEW PAGE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. Create a new folder with the route name: app/about/                 │
 * │  2. Add page.js inside: app/about/page.js                               │
 * │  3. Export a component from that page.js                                │
 * │  4. Visit the route: http://localhost:3000/about                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * See: app/about/page.js for the about page created in Lesson 432
 *
 * ============================================================================
 */

/**
 * HOME PAGE COMPONENT - A SERVER COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "It is treated as a server component and executed on the server, and it's
 * then the returned JSX code that's sent over the wire to the browser to be
 * rendered as HTML, so to say, and that's why we can see what we see here,
 * thanks to this component."
 *
 * Notice: No 'use client' directive = This is a SERVER COMPONENT
 */
export default function Home() {
  /**
   * ============================================================================
   * LESSON 431: PROVING SERVER-SIDE EXECUTION WITH console.log
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Hence, if you, for example, add a console log statement here where you
   * say executing, you will not see that here on the client side."
   *
   * INSTRUCTOR QUOTE:
   * "If you open your developer tools and the JavaScript console, you can
   * refresh as often as you want, you will not see that log statement here."
   *
   * WHERE DOES THIS LOG APPEAR?
   *
   * INSTRUCTOR QUOTE:
   * "Instead, you can see it on the backend. There, if you open the terminal
   * where you started the development server, you see all these executing logs
   * and that proves that it's executing on the server because this process
   * and the terminal is running the server, all the logs here are coming from
   * the server side."
   *
   * TRY IT YOURSELF:
   * 1. Open browser DevTools → Console tab → You will NOT see "Executing"
   * 2. Look at your terminal (where you ran `npm run dev`) → You WILL see it!
   *
   * This PROVES the component runs on the server, not in the browser.
   */
  console.log('Executing'); // Check your TERMINAL, not browser console!

  return (
    <main>
      {/**
       * STATIC ASSETS IN NEXT.JS
       *
       * Images in the `public/` folder are served at the root URL.
       * - File: public/logo.png
       * - URL: /logo.png
       *
       * Next.js also has an optimized <Image> component (covered later).
       */}
      <img src="/logo.png" alt="A server surrounded by magic sparkles." />
      <h1>Welcome to this NextJS Course!</h1>
      <p>🔥 Let&apos;s get started! 🔥</p>
      {/**
       * LESSON 432: LINK TO ANOTHER PAGE
       *
       * This is a basic HTML <a> tag. In a later lesson, we'll learn about
       * Next.js's <Link> component which provides client-side navigation
       * without full page reloads.
       *
       * The /about route works because we created:
       * - app/about/page.js
       */}
      <p>
        <a href="/about">Learn more about us</a>
      </p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSONS 431-432 SUMMARY
 * ============================================================================
 *
 * KEY TAKEAWAYS:
 *
 * LESSON 431 - SERVER COMPONENTS:
 * 1. The `app/` folder is the MOST IMPORTANT folder in Next.js
 * 2. `page.js` is a RESERVED filename
 * 3. Components in app/ are SERVER COMPONENTS by default
 *    - They execute on the server
 *    - console.log appears in terminal, not browser
 *
 * LESSON 432 - FILE-BASED ROUTING:
 * 4. Add new routes by creating FOLDERS with page.js files
 *    - /about route → app/about/page.js
 *    - Folder alone = 404 error (need page.js!)
 *
 * INSTRUCTOR QUOTE:
 * "So that is how we can add a new route by adding a folder with a page.js
 * file inside of it."
 *
 * VISUAL: How Server Components Work
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │  1. Browser requests page (http://localhost:3000)                       │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  2. Server receives request                                             │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  3. Server EXECUTES Home() component function                           │
 * │     - console.log('Executing') runs HERE (in terminal)                  │
 * │     - Returns JSX: <main><h1>Welcome...</h1></main>                     │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  4. Server converts JSX to HTML                                         │
 * │     <main><h1>Welcome to this NextJS Course!</h1></main>                │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  5. HTML is sent to browser (no JavaScript needed for this component!) │
 * │                              │                                          │
 * │                              ▼                                          │
 * │  6. Browser displays the HTML                                           │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
