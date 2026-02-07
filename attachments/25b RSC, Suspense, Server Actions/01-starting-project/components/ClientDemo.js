/**
 * ============================================================================
 * components/ClientDemo.js - LESSONS 510 & 511
 * ============================================================================
 *
 * LESSON 510: Initially this component was a server component (see RSCDemo.js
 *             for the full explanation of server component defaults in NextJS).
 * LESSON 511: Converting a server component into a client component using
 *             the 'use client' directive, and understanding when/why to do so.
 *
 * ============================================================================
 * 🎓 LESSON 511: THE 'use client' DIRECTIVE
 * ============================================================================
 *
 * The 'use client' string at the very top of this file is a DIRECTIVE --
 * a special instruction that tells the framework how to handle this file.
 * It must appear before any imports or other code. It can use single or
 * double quotes, and the trailing semicolon is optional.
 *
 * When the framework encounters 'use client', it knows:
 *   - This component's code MUST be included in the client bundle
 *   - This component will execute in the browser (not just on the server)
 *   - Client-side React features (hooks, event handlers, browser APIs)
 *     are allowed in this component
 *
 * Without this directive, NextJS treats the component as a server component
 * by default, and any attempt to use useState, useEffect, onClick, etc.
 * would cause a build error.
 *
 * ============================================================================
 * CLIENT COMPONENT EXECUTION MODEL
 * ============================================================================
 *
 * A common misconception is that 'use client' means the component runs
 * ONLY in the browser. That's not true. A client component runs in
 * BOTH places:
 *
 *   1. SERVER: The component is pre-rendered on the server to produce
 *      initial HTML. This ensures the user sees content immediately
 *      (good for SEO and perceived performance).
 *
 *   2. CLIENT (BROWSER): The component runs again on the client side
 *      through a process called "hydration." React attaches event
 *      listeners, initializes state, and makes the component interactive.
 *      After hydration, the app behaves like a traditional single-page
 *      application (SPA).
 *
 * You can verify this dual execution with the console.log() below:
 *   - Terminal (server) → log message appears (server pre-rendering)
 *   - Browser DevTools console → log message ALSO appears (client hydration)
 *   - In development with React Strict Mode, the browser log may appear
 *     TWICE because Strict Mode intentionally double-renders to help
 *     detect side effects
 *
 * Compare this to RSCDemo.js, where the log ONLY appears in the terminal.
 *
 * ============================================================================
 * WHY CONVERT TO A CLIENT COMPONENT?
 * ============================================================================
 *
 * Server components are preferable when possible because:
 *   - Less JavaScript is shipped to the browser (better performance)
 *   - Data can be fetched directly on the server (no extra round trips)
 *   - The client receives finished HTML immediately
 *
 * However, you MUST convert to a client component when you need:
 *   - React state management (useState, useReducer)
 *   - Side effects (useEffect, useLayoutEffect)
 *   - Event handlers (onClick, onChange, onSubmit, etc.)
 *   - Browser-only APIs (window, document, localStorage, etc.)
 *   - React context consumption (useContext / use(Context))
 *   - Most other React hooks
 *
 * In this component, we import useState to demonstrate why 'use client'
 * is necessary. The useState hook manages client-side state, which only
 * makes sense in a component that actually runs in the browser. A server
 * component has no persistent runtime in the browser, so stateful logic
 * would have nowhere to live.
 *
 * ============================================================================
 * SUMMARY: SERVER vs. CLIENT COMPONENTS
 * ============================================================================
 *
 *   SERVER COMPONENTS (default in NextJS):
 *   - Execute only on the server (or at build time)
 *   - Code never ships to the browser
 *   - Can be async functions
 *   - Can access server-only resources (DB, filesystem, secrets)
 *   - Cannot use hooks or event handlers
 *   - Need a framework that supports them (e.g., NextJS)
 *
 *   CLIENT COMPONENTS ('use client' directive required in RSC-enabled projects):
 *   - Execute on both server (pre-render) AND client (hydration)
 *   - Code is included in the browser bundle
 *   - Can use useState, useEffect, event handlers, browser APIs
 *   - This is the component type you have always used in traditional
 *     React projects (Vite, Create React App, etc.) -- it's just that
 *     in those projects, every component is implicitly a client component,
 *     so no directive is needed
 *
 * ============================================================================
 */

'use client';

import { useState } from 'react';

export default function ClientDemo({ children }) {
  // This useState call is why this component MUST be a client component.
  // State is a client-side concept -- it persists across re-renders in
  // the browser. A server component has no browser-side lifecycle, so
  // useState would be meaningless (and would cause a build error) there.
  const [count, setCount] = useState(0);

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
