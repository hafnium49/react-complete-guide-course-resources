/**
 * ============================================================================
 * NOT FOUND PAGE - LESSON 456: The not-found.js Reserved File
 * ============================================================================
 *
 * LESSON 456 - HANDLING 404 NOT FOUND ERRORS
 *
 * INSTRUCTOR QUOTE:
 * "Now, since we're already talking about errors, there's another kind of
 * error that could occur. What happens if a user enters an invalid URL?
 * Something like my-meals, which is a path we're not supporting here."
 *
 * THE PROBLEM:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  User visits: /my-meals (or any invalid path)                          │
 * │                                                                          │
 * │  WITHOUT not-found.js:                                                  │
 * │  ┌────────────────────────────────┐                                     │
 * │  │         404                    │                                     │
 * │  │  This page could not be found  │  ← Default Next.js 404 page        │
 * │  └────────────────────────────────┘                                     │
 * │                                                                          │
 * │  WITH not-found.js:                                                     │
 * │  ┌────────────────────────────────┐                                     │
 * │  │       NOT FOUND                │                                     │
 * │  │  Custom message with           │  ← Your branded 404 page           │
 * │  │  consistent site styling       │                                     │
 * │  └────────────────────────────────┘                                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "In that case, we get this default 404 page with which you might be happy,
 * of course, no need to change it. But if you want to, you can change it."
 *
 * ============================================================================
 * NOT-FOUND.JS SCOPE AND PLACEMENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And to do that, you can add a not-found.js file, like this. And again,
 * you can add that anywhere in your app folder and it'll automatically cover
 * any sibling and nested pages."
 *
 * PLACEMENT OPTIONS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LOCATION OF not-found.js │  CATCHES 404s FROM                          │
 * │  ─────────────────────────│─────────────────────────────────────────────│
 * │  app/not-found.js         │  Any invalid route in the app ← THIS FILE   │
 * │  app/meals/not-found.js   │  Only /meals/* invalid routes               │
 * │  app/admin/not-found.js   │  Only /admin/* invalid routes               │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "So if I add it here on the root level, we can simply catch all not-found
 * errors that might be generated from anywhere in this application. If you
 * would want to be more granular and maybe show more granular error messages,
 * you could nest it into some other folder."
 *
 * WHY ROOT LEVEL?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ Catches all 404 errors application-wide                              │
 * │  ✓ Provides consistent user experience                                  │
 * │  ✓ Single place to maintain 404 messaging                               │
 * │  ✓ Can be overridden by more specific not-found.js files                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * RESERVED FILES COMPARISON: error.js vs not-found.js
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE           │  TRIGGERS WHEN                                        │
 * │  ────────────── │ ──────────────────────────────────────────────────────│
 * │  error.js       │  Runtime errors occur (database fails, code throws)   │
 * │  not-found.js   │  Route doesn't exist (404 status code)                │
 * │                                                                          │
 * │  error.js       │  MUST be 'use client' (catches client + server)       │
 * │  not-found.js   │  Can be Server Component (static content usually)     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

/**
 * ============================================================================
 * NOT FOUND PAGE COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And then, again export a function here, which I'll name NotFound."
 *
 * NOTE: Unlike error.js, not-found.js does NOT need to be a Client Component.
 * It can be a regular Server Component since it typically displays static
 * content without needing client-side interactivity or error boundaries.
 *
 * @returns {JSX.Element} Custom 404 Not Found page
 */
export default function NotFound() {
  /**
   * NOT FOUND UI
   *
   * INSTRUCTOR QUOTE:
   * "And then here, I'll simply return a main element with a class name of
   * not-found, which is another CSS class I prepared in that globals.css
   * file."
   *
   * NOTE: Like error.js, we're using a class from globals.css directly
   * (not a CSS Module) because globals.css is imported globally in the
   * root layout.
   *
   * STYLING FROM globals.css:
   * ┌─────────────────────────────────────────────────────────────────────┐
   * │  .not-found {                                                       │
   * │    margin-top: 5rem;                                                │
   * │    text-align: center;                                              │
   * │  }                                                                  │
   * │                                                                      │
   * │  .not-found h1 {                                                    │
   * │    font-size: 5rem;                                                 │
   * │    font-weight: 900;                                                │
   * │    text-transform: uppercase;                                       │
   * │    background: linear-gradient(90deg, #f9572a, #ffc905);            │
   * │    -webkit-background-clip: text;                                   │
   * │    -webkit-text-fill-color: transparent;                            │
   * │  }                                                                  │
   * │                                                                      │
   * │  .not-found p {                                                     │
   * │    font-size: 1.5rem;                                               │
   * │    font-weight: 500;                                                │
   * │    color: #ddd8d8;                                                  │
   * │  }                                                                  │
   * └─────────────────────────────────────────────────────────────────────┘
   */
  return (
    <main className="not-found">
      {/**
       * PAGE TITLE
       *
       * INSTRUCTOR QUOTE:
       * "And I'll then add a title of Not found."
       *
       * The h1 gets the gradient text effect from globals.css,
       * matching the overall site branding.
       */}
      <h1>Not found</h1>

      {/**
       * USER-FRIENDLY MESSAGE
       *
       * INSTRUCTOR QUOTE:
       * "And I'll, below that, output a text, where I'll say,
       * 'Unfortunately, we could not find the requested page or resource.'"
       *
       * This message is intentionally generic and helpful:
       * - Confirms the page doesn't exist
       * - Uses friendly language
       * - Doesn't expose technical details
       */}
      <p>Unfortunately, we could not find the requested page or resource.</p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 456 - NOT FOUND PAGE SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. not-found.js IS ANOTHER RESERVED FILE NAME
 *
 *    INSTRUCTOR QUOTE:
 *    "And to do that, you can add a not-found.js file, like this. And again,
 *    you can add that anywhere in your app folder and it'll automatically
 *    cover any sibling and nested pages."
 *
 * 2. PLACEMENT DETERMINES SCOPE
 *    - Root level: catches all 404s app-wide
 *    - Nested: catches 404s for specific route segments
 *    - More specific files override less specific ones
 *
 * 3. DOES NOT REQUIRE 'use client'
 *    - Can be a Server Component
 *    - Typically displays static content
 *    - No error boundary functionality needed
 *
 * 4. USES GLOBAL CSS CLASSES
 *    - Styles from globals.css applied directly
 *    - No CSS Module import needed
 *    - Consistent with error.js approach
 *
 * RESERVED FILES IN NEXT.JS APP ROUTER (COMPLETE LIST):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  FILE NAME        │  PURPOSE                          │  REQUIRES       │
 * │  ─────────────────│───────────────────────────────────│─────────────────│
 * │  page.js          │  Main page component              │  -              │
 * │  layout.js        │  Shared wrapper UI                │  -              │
 * │  loading.js       │  Loading state UI                 │  -              │
 * │  error.js         │  Runtime error UI                 │  'use client'   │
 * │  not-found.js     │  404 Not Found UI ← THIS FILE     │  -              │
 * │  template.js      │  Re-mounting wrapper              │  -              │
 * │  route.js         │  API Route Handler                │  -              │
 * │  default.js       │  Parallel route fallback          │  -              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And with that edit, you'll see that now, for invalid pages, we see our
 * custom Not Found page here."
 *
 * TO TEST:
 * 1. Navigate to any invalid URL (e.g., /my-meals, /random-path)
 * 2. You should see the custom "Not found" page
 * 3. The page uses the site's branding (gradient text, colors, etc.)
 *
 * CURRENT PROJECT STATE:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ✓ page.js        - Main page components                                │
 * │  ✓ layout.js      - Root layout with header                             │
 * │  ✓ loading-out.js - Loading state (renamed, using Suspense instead)     │
 * │  ✓ error.js       - Runtime error handling (app/meals/)                 │
 * │  ✓ not-found.js   - 404 handling (app/) ← THIS FILE                     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
