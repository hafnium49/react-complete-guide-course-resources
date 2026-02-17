/**
 * ============================================================================
 * Todos.tsx — LESSON 592
 * ============================================================================
 *
 * A BASIC REACT COMPONENT IN TYPESCRIPT
 *
 * This component demonstrates that building React components with
 * TypeScript follows exactly the same patterns used throughout the
 * course with plain JavaScript:
 *
 *   - A functional component is still just a function
 *   - It returns JSX markup
 *   - It is exported so other files can import and use it
 *   - No special TypeScript syntax is required for a simple component
 *
 * FILE EXTENSION — .tsx:
 *
 * This file uses .tsx (not .ts) because it contains JSX markup.
 * Any TypeScript file that includes JSX — angle-bracket HTML-like
 * syntax — must use the .tsx extension so the compiler knows how
 * to parse it.
 *
 * HARDCODED TODOS (for now):
 *
 * The todo items are currently hardcoded directly in the JSX. In
 * upcoming lessons, these will become dynamic — received through
 * props so that the component can display whatever todos are passed
 * to it. That is where TypeScript's prop typing will come into play.
 *
 * ============================================================================
 */

// A standard functional component — identical in structure to the
// components built throughout the course with plain JavaScript.
// No type annotations are needed here because the component has no
// props and the return type (JSX.Element) is inferred automatically.
function Todos() {
  return (
    <ol>
      <li>Learn React</li>
      <li>Learn TypeScript</li>
    </ol>
  );
}

export default Todos;
