/**
 * ============================================================================
 * src/App.jsx - LESSONS 540 & 541
 * ============================================================================
 *
 * LESSON 541: PROJECT SETUP
 *
 * This is the starting project for Section 27: Patterns & Practices.
 *
 * This section revisits key React best practices already encountered
 * throughout the course, while introducing several advanced patterns
 * that are commonly used in real-world React projects:
 *
 *   - COMPOUND COMPONENTS: A pattern where a parent component and its
 *     child components work together as a unit, sharing implicit state.
 *     The parent manages the state, and children access it without the
 *     consumer needing to wire props manually between them.
 *
 *   - RENDER PROPS: A pattern where a component receives a function as
 *     a prop (or as children) and calls that function to determine what
 *     to render. This gives the consumer full control over the rendered
 *     output while the component handles the logic.
 *
 *   - Additional related concepts and patterns will be explored as the
 *     section progresses.
 *
 * All patterns will be applied to a demo project built incrementally
 * across the upcoming lessons, starting from this minimal scaffold.
 *
 * The initial folder structure is intentionally bare — just the standard
 * Vite entry point (main.jsx), global styles (index.css), an empty
 * components directory, and this App component. The files will be
 * populated with logic as the section progresses.
 *
 * ============================================================================
 */

function App() {
  return <h1>React Patterns & Practices</h1>;
}

export default App;
