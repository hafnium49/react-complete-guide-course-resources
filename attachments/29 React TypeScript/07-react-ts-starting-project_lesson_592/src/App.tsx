/**
 * ============================================================================
 * App.tsx — LESSON 592
 * ============================================================================
 *
 * BUILDING A BASIC TODO APP WITH REACT AND TYPESCRIPT
 *
 * This lesson cleans up the CRA boilerplate and starts building a
 * simple todo application to demonstrate core TypeScript features
 * in a React context.
 *
 * CLEANUP PERFORMED:
 *
 *   - Deleted boilerplate files: App.test.tsx, logo.svg,
 *     reportWebVitals.ts, setupTests.ts
 *   - Kept react-app-env.d.ts (links TypeScript into the project)
 *   - Removed the React import (not needed in modern React with the
 *     new JSX transform — this applies to TypeScript projects too)
 *   - Removed the logo import and App.css import (no longer used)
 *   - Replaced the default CRA JSX with the Todos component
 *
 * KEY TAKEAWAY — REACT CODE DOES NOT CHANGE:
 *
 * The code in this file and in index.tsx is exactly the same React
 * code used throughout the rest of this course. There are no special
 * type annotations here because TypeScript's built-in type inference
 * handles everything automatically. Components are still functions
 * that return JSX — nothing about that pattern changes with TypeScript.
 *
 * The upcoming lessons will show WHERE TypeScript adds value: typing
 * props, state, events, refs, and more. But the underlying React
 * patterns remain identical.
 *
 * ============================================================================
 */

import Todos from './components/Todos';

// The root App component renders the Todos component. This is a
// standard React component — no TypeScript-specific syntax is needed
// here. The component is imported from the components folder using
// the same pattern used throughout the course.
function App() {
  return (
    <div>
      <Todos />
    </div>
  );
}

export default App;
