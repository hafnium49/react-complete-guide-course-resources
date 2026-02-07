/**
 * ============================================================================
 * components/RSCDemo.js - LESSON 510: REACT SERVER COMPONENTS
 * ============================================================================
 *
 * This component demonstrates a React Server Component (RSC). At first
 * glance it looks like any ordinary React component -- and that's the point.
 * There is nothing syntactically special about a server component. What
 * makes it a server component is the PROJECT SETUP, not anything in this file.
 *
 * ============================================================================
 * HOW A COMPONENT BECOMES A SERVER COMPONENT
 * ============================================================================
 *
 * In a NextJS App Router project, every component is treated as a server
 * component BY DEFAULT. You do not need to add any directive or special
 * annotation. If a component file does NOT contain a 'use client' directive
 * at the top, NextJS treats it as a server component automatically.
 *
 * This is the opposite of vanilla React projects (e.g., Vite), where every
 * component is a client component by default -- because there is no server
 * to run them on.
 *
 * ============================================================================
 * WHAT "SERVER COMPONENT" MEANS IN PRACTICE
 * ============================================================================
 *
 * A server component:
 *   - Executes ONLY on the server (or during the build process for
 *     pre-rendered/static pages)
 *   - Its JavaScript code is NEVER shipped to the browser
 *   - The browser only receives the rendered HTML output
 *   - Cannot use client-side React features (useState, useEffect,
 *     event handlers like onClick, browser APIs, etc.)
 *   - CAN access server-only resources (databases, file system,
 *     environment variables, etc.)
 *   - Can be an async function (as shown here), which is not allowed
 *     for client components
 *
 * ============================================================================
 * PROVING IT RUNS ON THE SERVER: console.log()
 * ============================================================================
 *
 * The console.log() call below is a simple proof that this component
 * executes on the server. When you run this project:
 *
 *   - Open your browser's DevTools console → you will NOT see the message
 *   - Check the terminal where you ran `npm run dev` → the message appears
 *     THERE, because that terminal is the server process
 *
 * This confirms that the component function runs on the server, and its
 * code never reaches the browser at all.
 *
 * ============================================================================
 */

export default async function RSCDemo() {
  console.log('RSCDemo rendered');
  return (
    <div className='rsc'>
      <h2>A React Server Component</h2>
      <p>
        Will <strong>ONLY</strong> be rendered on the server or at build time.
      </p>
      <p>
        <strong>NEVER</strong> on the client-side!
      </p>
    </div>
  );
}
