/**
 * ============================================================================
 * components/ClientDemo.js - LESSON 510: NOT YET A CLIENT COMPONENT
 * ============================================================================
 *
 * IMPORTANT: Despite this file being called "ClientDemo", at this stage
 * (Lesson 510) it is still a SERVER component. The file name does not
 * determine whether a component is a server or client component.
 *
 * In NextJS, ALL components default to being server components. To make
 * a component into a client component, you must explicitly add a
 * 'use client' directive at the top of the file. Since that directive
 * is not present here yet, this component is still rendered on the server.
 *
 * ============================================================================
 * HOW TO VERIFY THIS IS STILL A SERVER COMPONENT
 * ============================================================================
 *
 * The console.log() below proves it:
 *   - Browser DevTools console → NO log message appears
 *   - Terminal (where `npm run dev` is running) → the message shows up
 *
 * This is exactly the same behavior as RSCDemo.js. Both components are
 * currently server components because neither has a 'use client' directive.
 *
 * ============================================================================
 * SERVER vs. CLIENT COMPONENTS: KEY DISTINCTION
 * ============================================================================
 *
 * Server component (default in NextJS):
 *   - Runs only on the server; code never sent to the browser
 *   - Cannot use useState, useEffect, onClick, or other client-side APIs
 *
 * Client component (must opt in with 'use client'):
 *   - Runs on BOTH server AND client
 *   - Pre-rendered on the server first (for initial HTML), then "hydrated"
 *     on the client so React can attach event listeners, manage state, etc.
 *   - After hydration, the app behaves like a single-page application (SPA)
 *     where users can interact with client-side React features
 *
 * The next lesson will convert this component into a true client component
 * by adding 'use client' at the top.
 *
 * ============================================================================
 * NOTE: {children} PROP
 * ============================================================================
 *
 * This component accepts a {children} prop, which allows other components
 * to be nested inside it. This will become significant in later lessons
 * when we explore the relationship between server and client components
 * in a component tree.
 *
 * ============================================================================
 */

export default function ClientDemo({ children }) {
  console.log('ClientDemo rendered');
  return (
    <div className='client-cmp'>
      <h2>A React Client Component</h2>
      <p>
        Will be rendered on the client <strong>AND</strong> the server.
      </p>
      {children}
    </div>
  );
}
