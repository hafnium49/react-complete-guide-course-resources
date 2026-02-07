/**
 * ============================================================================
 * app/page.js - LESSONS 508, 509, 510, 512, 513, 514, 515, 516, 517 & 518
 * ============================================================================
 *
 * LESSON 508: Overview of the "RSC, Suspense & Server Actions" section
 * LESSON 509: Why these features require special project setups
 * LESSON 510: React Server Components vs Client Components in practice
 * LESSON 512: Composition rules for mixing server and client components
 * LESSON 513: Data fetching in server components with async/await
 * LESSON 514: Server actions -- form actions that execute on the server
 * LESSON 515: Suspense with async server components for loading fallbacks
 * LESSON 516: The use() hook for unwrapping promises in client components
 * LESSON 517: Error handling with ErrorBoundary around Suspense
 * LESSON 518: Section summary and wrap-up
 *
 * ============================================================================
 * WHAT THIS SECTION COVERS
 * ============================================================================
 *
 * This section revisits and summarizes several key React features that were
 * introduced during the NextJS course section. These features are part of
 * React itself, but they are NOT available in every React project. This
 * section explains why that limitation exists and dives deeper into each one.
 *
 * The three main topics covered in this section are:
 *
 * 1. REACT SERVER COMPONENTS (RSC) & CLIENT COMPONENTS
 *
 *    Server components run exclusively on the server and never ship their
 *    JavaScript to the browser. Client components are the traditional React
 *    components that run in the browser. Understanding when and why to use
 *    each type is essential for modern React development with frameworks
 *    like NextJS.
 *
 * 2. SERVER ACTIONS (vs. FORM ACTIONS)
 *
 *    Server actions are functions that execute on the server but can be
 *    triggered from client-side code (e.g., form submissions). This section
 *    compares server actions with form actions, which were covered in an
 *    earlier section of the course. While form actions run in the browser,
 *    server actions run on the server, giving them access to databases,
 *    file systems, and other server-only resources.
 *
 * 3. SUSPENSE & THE use() HOOK
 *
 *    React's Suspense component allows you to show fallback UI while
 *    waiting for asynchronous operations to complete. The use() hook,
 *    added in React 19, was previously introduced in the context section
 *    as a way to consume React context. Here we learn its second purpose:
 *    unwrapping promises to access asynchronously resolved data, which
 *    works in combination with Suspense in certain project setups.
 *
 * ============================================================================
 * 🎓 LESSON 509: WHY THESE FEATURES REQUIRE SPECIAL PROJECT SETUPS
 * ============================================================================
 *
 * React server components, server actions, and the use() hook with promises
 * are all part of React itself, yet they cannot be used in a standard
 * "vanilla" React project (like one scaffolded with Vite). This sounds
 * paradoxical, but the reason is architectural:
 *
 * THE CORE PROBLEM: SERVER-SIDE CODE EXECUTION
 *
 * These features involve code that must run on a server, not in the
 * browser. A standard React project only targets the browser -- there is
 * no server environment for React code to execute in. So features that
 * depend on server-side execution simply have nowhere to run.
 *
 * THE SOLUTION: AUTOMATIC CODE SPLITTING
 *
 * A framework like NextJS solves this by automatically splitting your
 * code into two separate bundles:
 *
 * ┌─────────────────────────────────────────────────────────────────┐
 * │                                                                  │
 * │  YOUR NEXTJS PROJECT CODE                                        │
 * │    │                                                             │
 * │    ├── SERVER BUNDLE                                             │
 * │    │     Code that runs ONLY on the server.                     │
 * │    │     Never sent to the browser.                             │
 * │    │     Includes: server components, server actions,           │
 * │    │     database queries, file system access, etc.             │
 * │    │                                                             │
 * │    └── CLIENT BUNDLE                                             │
 * │          Code that runs in the browser.                         │
 * │          Includes: client components (marked with               │
 * │          'use client'), event handlers, browser APIs, etc.      │
 * │                                                                  │
 * │  The framework decides which code goes where based on           │
 * │  directives like 'use client' and 'use server'.                 │
 * │                                                                  │
 * └─────────────────────────────────────────────────────────────────┘
 *
 * In addition to splitting the code, the framework must also provide
 * an actual server environment where the server bundle can execute.
 * NextJS does this automatically -- its development server and its
 * production server both handle server-side React execution.
 *
 * WHY VANILLA REACT (VITE) PROJECTS CAN'T DO THIS
 *
 * A Vite-based React project produces a single client-side bundle.
 * There is no code splitting between server and browser, no server
 * runtime provided, and no mechanism to mark code as server-only or
 * client-only. Since most React projects in the wild are still
 * vanilla client-side apps, this means most React projects cannot
 * use these features -- even though they are technically part of React.
 *
 * WHY NEXTJS WORKS
 *
 * NextJS is a full-stack React framework. It builds on top of React
 * and provides:
 *   - Automatic code splitting between server and client
 *   - A server environment for executing server components and actions
 *   - File-based routing via page.js files in the app/ directory
 *   - Built-in support for streaming and Suspense boundaries
 *
 * That is why this section uses a NextJS project. Understanding the
 * NextJS App Router structure (from the previous section) is helpful
 * but not strictly required, since we only work with a single page
 * throughout this section.
 *
 * GETTING STARTED
 *
 * After downloading the attached project:
 *   1. Run `npm install` to install all dependencies
 *   2. Run `npm run dev` to start the NextJS development server
 *   3. Open the URL shown in the terminal (usually http://localhost:3000)
 *
 * ============================================================================
 * THIS STARTING PROJECT
 * ============================================================================
 *
 * This is a minimal NextJS 15 app with React 19, using the App Router.
 * It contains just a root layout, this home page, and some global CSS.
 * Throughout this section, we will build on this foundation to demonstrate
 * each of the features described above.
 *
 * Project stack:
 *   - Next.js 15 (App Router)
 *   - React 19
 *   - No additional dependencies (just next, react, react-dom)
 *
 * ============================================================================
 * PREREQUISITE NOTE
 * ============================================================================
 *
 * The previous NextJS section (Section 25) is recommended before starting
 * this section, as it introduces many of these concepts in practice. However,
 * it is not a hard requirement -- this section can serve as a standalone
 * summary of these advanced React features.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 510: USING RSCDemo AND ClientDemo IN THIS PAGE
 * ============================================================================
 *
 * IMPORTING COMPONENTS WITH THE @ ALIAS
 *
 * The @ symbol in the import paths below is a special path alias configured
 * by NextJS. It resolves to the root project directory, so
 * '@/components/RSCDemo' means "the RSCDemo file inside the components
 * folder at the project root." This avoids fragile relative paths like
 * '../components/RSCDemo'.
 *
 * FILE STRUCTURE AFTER THIS LESSON:
 *
 *   01-starting-project/
 *   ├── app/
 *   │   ├── page.js          ← this file (the home page component)
 *   │   ├── layout.js        ← root layout wrapping all pages
 *   │   └── globals.css      ← global styles
 *   └── components/
 *       ├── RSCDemo.js       ← server component demo (added in this lesson)
 *       └── ClientDemo.js    ← will become a client component (next lesson)
 *
 * WHY BOTH COMPONENTS ARE CURRENTLY SERVER COMPONENTS
 *
 * Even though one file is named "RSCDemo" and the other "ClientDemo",
 * BOTH are server components right now. The file name has no effect on
 * component type. In NextJS, the default is server component. Only adding
 * a 'use client' directive at the top of a file switches it to a client
 * component.
 *
 * HOW THIS page.js FILE WORKS IN NEXTJS
 *
 * In the NextJS App Router, any file named page.js inside the app/
 * directory automatically becomes a routable page. This page.js in app/
 * maps to the root URL ("/"). The component it exports is rendered inside
 * the RootLayout defined in layout.js.
 *
 * This page component is itself a server component (no 'use client'
 * directive), so it executes on the server. It can freely import and
 * render other server components like RSCDemo and ClientDemo.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 512: THE {children} COMPOSITION PATTERN IN ACTION
 * ============================================================================
 *
 * Below, RSCDemo (a server component) is placed BETWEEN the opening and
 * closing tags of ClientDemo (a client component). This is the {children}
 * pattern -- the correct way to nest a server component inside a client
 * component.
 *
 * WHY THIS WORKS:
 *
 * This Home component is itself a server component (no 'use client'
 * directive). When it renders, it executes RSCDemo on the server and
 * produces its HTML output. That pre-rendered output is then passed as
 * the {children} prop to ClientDemo. ClientDemo never imports or knows
 * about RSCDemo -- it just receives already-rendered content.
 *
 * This means RSCDemo remains a true server component:
 *   - Its console.log appears ONLY in the terminal (not in the browser)
 *   - Its JavaScript is never sent to the client
 *   - It can safely use async/await and server-only resources
 *
 * WHAT WOULD NOT WORK:
 *
 * If ClientDemo tried to import RSCDemo directly and render <RSCDemo />
 * in its own JSX, NextJS would attempt to auto-convert RSCDemo to a
 * client component. Since RSCDemo is an async function (which is only
 * valid for server components), this conversion would fail with an error.
 *
 * VISUAL SUMMARY OF THE COMPONENT TREE:
 *
 *   Home (SERVER) ──────────────────────────────────
 *   │                                                │
 *   └── ClientDemo (CLIENT) ── via {children} ──┐   │
 *       │                                        │   │
 *       └── RSCDemo (SERVER) ◄── rendered here ──┘   │
 *           by Home, NOT by ClientDemo                │
 *   ──────────────────────────────────────────────────
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 513: REPLACING THE DEMO COMPONENTS WITH DataFetchingDemo
 * ============================================================================
 *
 * In this lesson, the RSCDemo and ClientDemo components are removed from
 * this page. They served their purpose in demonstrating server vs. client
 * components and the {children} composition pattern.
 *
 * Now we render DataFetchingDemo instead, which showcases the real power
 * of server components: fetching data directly inside a component using
 * Node.js APIs (like fs.readFile) and async/await, without needing a
 * separate backend API or useEffect.
 *
 * The entire data fetching and rendering happens on the server. The
 * browser receives finished HTML that already contains the loaded data.
 * No loading spinner, no extra network request, no useEffect needed.
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 514: ADDING ServerActionsDemo
 * ============================================================================
 *
 * ServerActionsDemo demonstrates the counterpart to data fetching: data
 * SUBMISSION via server actions. While DataFetchingDemo reads from
 * dummy-db.json, ServerActionsDemo writes to it through a form submission
 * that triggers a server action.
 *
 * ServerActionsDemo is a CLIENT component ('use client') that imports
 * a server action from actions/users.js. When the form is submitted,
 * React sends the FormData to the server, where saveUserAction writes
 * the new user to dummy-db.json.
 *
 * FILE STRUCTURE AFTER THIS LESSON:
 *
 *   01-starting-project/
 *   ├── app/
 *   │   ├── page.js                ← this file
 *   │   ├── layout.js
 *   │   └── globals.css
 *   ├── actions/
 *   │   └── users.js               ← NEW: server action file ('use server')
 *   ├── components/
 *   │   ├── RSCDemo.js             ← lessons 510/512
 *   │   ├── ClientDemo.js          ← lessons 511/512
 *   │   ├── DataFetchingDemo.js    ← lesson 513 (server-side data reading)
 *   │   └── ServerActionsDemo.js   ← NEW: client component using server action
 *   └── dummy-db.json              ← read by DataFetchingDemo, written by
 *                                     saveUserAction
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 515: USING <Suspense> WITH ASYNC SERVER COMPONENTS
 * ============================================================================
 *
 * THE PROBLEM: BLOCKING DATA FETCHES
 *
 * In Lesson 513, data was fetched in a server component using async/await.
 * This works great, but if the data fetch is slow (e.g., a slow database),
 * the entire page is blocked -- the user sees nothing until the data
 * arrives. This is a poor user experience.
 *
 * The problem gets worse when data is fetched in page.js itself, because
 * page.js is the root of the page. If page.js awaits data, NOTHING on
 * the page can render until the await resolves.
 *
 * THE SOLUTION: ISOLATE + SUSPENSE
 *
 * Step 1: Move the data fetching INTO the child component (UsePromiseDemo)
 *   so it's no longer blocking page.js. The child component becomes an
 *   async server component that fetches its own data.
 *
 * Step 2: Wrap that child component with React's <Suspense>. Suspense
 *   tells React: "If this child is still loading, show the fallback
 *   instead of blocking the entire page."
 *
 * THE RESULT:
 *
 *   - The page loads INSTANTLY (the rest of the UI renders immediately)
 *   - The Suspense fallback ("Loading users...") appears in place of
 *     the slow component
 *   - When the data resolves (after 2 seconds in our simulation), React
 *     streams the finished component to the browser, replacing the fallback
 *
 * WHERE SUSPENSE CAN BE USED:
 *
 *   ✓ Async server components (like UsePromiseDemo)
 *   ✓ Lazy-loaded components (React.lazy -- covered earlier in the course)
 *   ✓ Components using Suspense-aware libraries
 *   ✗ Regular useEffect + fetch() in client components (NOT Suspense-aware)
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 516: THE use() HOOK -- PROMISE CREATION IN SERVER COMPONENT
 * ============================================================================
 *
 * WHY THE DATA FETCHING MOVED BACK TO page.js
 *
 * In Lesson 515, data fetching lived inside UsePromiseDemo (an async
 * server component). That worked perfectly with Suspense. But what if
 * UsePromiseDemo needs to be a CLIENT component -- for example, to use
 * useState for an interactive counter?
 *
 * Client components cannot be async and cannot use Node.js APIs, so the
 * data fetching MUST live in a server component. But if we fetch the
 * data and await it here in page.js (as in Lesson 515 iteration 1),
 * the entire page blocks again, defeating the purpose of Suspense.
 *
 * THE SOLUTION: CREATE A PROMISE, DON'T AWAIT IT
 *
 * Instead of awaiting the data, we create a Promise (fetchUsersPromise)
 * and pass it as a prop to UsePromiseDemo WITHOUT awaiting it. This
 * means page.js renders immediately -- it just hands off a not-yet-
 * resolved promise to the child component.
 *
 * The child component then uses the use() hook to unwrap that promise.
 * While the promise is pending, React suspends the child and shows the
 * <Suspense> fallback. When the promise resolves, React re-renders the
 * child with the resolved data. The page loads instantly, just like
 * with the async server component approach.
 *
 * KEY INSIGHT: PASSING PROMISES AS PROPS
 *
 * Yes, you can pass a promise as a prop from a server component to a
 * client component. The framework handles the serialization. This is
 * what makes the use() hook pattern possible -- the promise is created
 * on the server (where Node.js APIs are available) but consumed on
 * the client (where useState and onClick are available).
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 517: WRAPPING SUSPENSE WITH ErrorBoundary
 * ============================================================================
 *
 * THE MISSING PIECE: ERROR HANDLING
 *
 * So far we have two states covered for async data:
 *   - LOADING: handled by <Suspense> (shows fallback while promise is pending)
 *   - SUCCESS: handled by the component itself (renders the resolved data)
 *
 * But what if the promise REJECTS? What if the data fetch fails? Without
 * error handling, the whole page would crash. We need a third piece:
 *   - ERROR: handled by <ErrorBoundary> (catches the rejection and shows
 *     an error message)
 *
 * THE ErrorBoundary COMPONENT
 *
 * ErrorBoundary is a class component (the only React pattern that can catch
 * render errors) that wraps around <Suspense>. If anything inside its tree
 * throws an error -- including a rejected promise unwrapped by use() -- it
 * catches that error and renders a fallback UI instead.
 *
 * THE WRAPPING ORDER MATTERS:
 *
 *   <ErrorBoundary>      ← outermost: catches errors
 *     <Suspense>          ← middle: shows loading state
 *       <Component />     ← innermost: fetches and renders data
 *     </Suspense>
 *   </ErrorBoundary>
 *
 * ErrorBoundary must wrap Suspense, not the other way around. If Suspense
 * wrapped ErrorBoundary, the error would bubble past Suspense (which does
 * not catch errors) and crash the page.
 *
 * TESTING ERROR HANDLING
 *
 * To see the ErrorBoundary in action, the promise below is set to REJECT
 * instead of resolve. After the 2-second delay, the promise throws an
 * Error, which use() in UsePromiseDemo re-throws during rendering,
 * which ErrorBoundary catches and displays.
 *
 * To restore normal behavior, uncomment the resolve() call and comment
 * out the reject() call.
 *
 * FILE STRUCTURE AFTER THIS LESSON:
 *
 *   01-starting-project/
 *   ├── app/
 *   │   ├── page.js               ← this file
 *   │   ├── layout.js
 *   │   └── globals.css
 *   ├── actions/
 *   │   └── users.js              ← server action
 *   ├── components/
 *   │   ├── RSCDemo.js            ← lessons 510/512
 *   │   ├── ClientDemo.js         ← lessons 511/512
 *   │   ├── DataFetchingDemo.js   ← lesson 513
 *   │   ├── ServerActionsDemo.js  ← lesson 514
 *   │   ├── UsePromisesDemo.js    ← lessons 515/516
 *   │   └── ErrorBoundary.js      ← NEW: class component for error catching
 *   └── dummy-db.json
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * 🎓 LESSON 518: SECTION SUMMARY
 * ============================================================================
 *
 * This lesson wraps up the "RSC, Suspense & Server Actions" theory section.
 * No new code is introduced. Instead, it recaps the key takeaways:
 *
 * 1. REACT SERVER COMPONENTS, SERVER ACTIONS, AND THE use() HOOK WITH
 *    PROMISES are all part of React itself, but they require a server-side
 *    environment and automatic code splitting between server and client
 *    bundles. That is why they cannot be used in every React project --
 *    only in frameworks like NextJS that provide both a server runtime
 *    and the build infrastructure to split code based on directives like
 *    'use client' and 'use server'.
 *
 * 2. WHAT EACH FEATURE DOES:
 *    - Server components execute only on the server, never shipping JS
 *      to the browser (Lessons 510, 512, 513)
 *    - Client components run on both server (pre-render) and client
 *      (hydration), and support interactivity like useState (Lesson 511)
 *    - Server actions let you execute server-side logic (database writes,
 *      file system operations) triggered from client-side forms or
 *      event handlers (Lesson 514)
 *    - Suspense shows fallback UI while async operations are pending,
 *      preventing the page from blocking on slow data fetches (Lesson 515)
 *    - The use() hook unwraps promises in client components, bridging
 *      server-created data with client-side interactivity (Lesson 516)
 *    - ErrorBoundary catches errors from rejected promises or failed
 *      renders, completing the loading/success/error trifecta (Lesson 517)
 *
 * 3. THESE FEATURES WORK TOGETHER as a cohesive system. In this project,
 *    the final pattern combines all of them:
 *    - page.js (server component) creates a data-fetching promise
 *    - The promise is passed to a client component as a prop
 *    - The client component uses use() to unwrap it
 *    - Suspense handles the loading state
 *    - ErrorBoundary handles the error state
 *    - The component itself handles the success state
 *
 * If you are working in a React project that supports these features
 * (such as a NextJS project), you now have the knowledge to use them
 * effectively together.
 *
 * ============================================================================
 */

import fs from 'node:fs/promises';

import { Suspense } from 'react';

import UsePromiseDemo from '@/components/UsePromisesDemo';
import ErrorBoundary from '@/components/ErrorBoundary';

// This is an async server component. The `async` keyword is needed
// because we use `await` inside the promise's setTimeout callback
// (for fs.readFile), but we do NOT await the promise itself here.
// This means page.js renders immediately without blocking.
export default async function Home() {
  // Create a promise that simulates a slow data fetch (2-second delay).
  // IMPORTANT: We do NOT await this promise here. Instead, we pass it
  // as a prop to UsePromiseDemo, which will unwrap it using use().
  // This is what prevents the page from blocking.
  // LESSON 517: The promise now receives both resolve AND reject callbacks.
  // To test error handling, resolve is commented out and reject is called
  // instead. This simulates a failed data fetch. Swap the comments to
  // restore normal behavior.
  const fetchUsersPromise = new Promise((resolve, reject) =>
    setTimeout(async () => {
      const data = await fs.readFile('dummy-db.json', 'utf-8');
      const users = JSON.parse(data);
      // resolve(users);
      reject(new Error('Error!'));
    }, 2000)
  );

  return (
    <main>
      {/* LESSON 517: ErrorBoundary wraps Suspense. If the promise rejects,
          the error propagates up from use() through Suspense to
          ErrorBoundary, which catches it and renders its error UI plus
          the fallback prop. The fallback prop is JSX passed from here. */}
      <ErrorBoundary fallback={<p>Something went wrong!</p>}>
        <Suspense fallback={<p>Loading users...</p>}>
          <UsePromiseDemo usersPromise={fetchUsersPromise} />
        </Suspense>
      </ErrorBoundary>
    </main>
  );
}
