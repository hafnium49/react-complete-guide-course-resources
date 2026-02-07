/**
 * ============================================================================
 * components/ErrorBoundary.js - LESSON 517
 * ============================================================================
 *
 * LESSON 517: This component catches JavaScript errors thrown by its child
 *             component tree and displays a fallback UI instead of crashing
 *             the entire page.
 *
 * ============================================================================
 * 🎓 LESSON 517: ERROR HANDLING WITH ErrorBoundary
 * ============================================================================
 *
 * WHAT IS AN ERROR BOUNDARY?
 *
 * An error boundary is a React component that catches errors thrown during
 * rendering in any component below it in the tree. Without one, an error in
 * a child component would crash the entire React application.
 *
 * Error boundaries are NOT new to this section -- they work in ANY React
 * project (Vite, CRA, NextJS, etc.). They are standard React functionality.
 *
 * WHY A CLASS COMPONENT?
 *
 * Error boundaries MUST be class components. React provides two special
 * lifecycle methods for error handling -- getDerivedStateFromError and
 * componentDidCatch -- and these are ONLY available on class components.
 * There is no function component equivalent (no hook for catching render
 * errors). This is one of the few remaining cases where class components
 * are still required.
 *
 * ============================================================================
 * HOW IT WORKS WITH SUSPENSE AND use()
 * ============================================================================
 *
 * In our setup, the component tree for the data-fetching area looks like:
 *
 *   <ErrorBoundary>           ← catches errors (this component)
 *     <Suspense>              ← shows loading fallback while pending
 *       <UsePromiseDemo />    ← uses use() to unwrap the promise
 *     </Suspense>
 *   </ErrorBoundary>
 *
 * The flow when the promise REJECTS:
 *
 *   1. page.js creates a promise that will reject (instead of resolve)
 *   2. UsePromiseDemo calls use(usersPromise) to unwrap it
 *   3. While the promise is pending, Suspense shows "Loading users..."
 *   4. When the promise rejects, the rejection becomes a thrown error
 *   5. The error bubbles up past Suspense to ErrorBoundary
 *   6. ErrorBoundary catches it via getDerivedStateFromError
 *   7. ErrorBoundary re-renders with hasError: true, showing the error UI
 *
 * This is the complete pattern for async data in client components:
 *   - Suspense handles the LOADING state (promise pending)
 *   - ErrorBoundary handles the ERROR state (promise rejected)
 *   - The component itself handles the SUCCESS state (promise resolved)
 *
 * ============================================================================
 * WHY 'use client'?
 * ============================================================================
 *
 * ErrorBoundary needs the 'use client' directive because it relies on
 * client-side React lifecycle methods (getDerivedStateFromError) and manages
 * state that updates the UI interactively. Class component lifecycle methods
 * are a client-side concern.
 *
 * ============================================================================
 */

'use client';

import { Component } from 'react';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    // Initial state: no error has occurred yet.
    this.state = { hasError: false };
  }

  // getDerivedStateFromError is a STATIC lifecycle method. React calls it
  // automatically when a child component throws an error during rendering.
  // Whatever object you return becomes the new state. Here, we set hasError
  // to true and store the error message so we can display it.
  static getDerivedStateFromError(error) {
    return { hasError: true, message: error.message };
  }

  render() {
    // If an error was caught, show the error UI instead of the children.
    if (this.state.hasError) {
      return (
        <div className="error">
          <h2>An error occurred!</h2>
          {/* Display the error message from the rejected promise */}
          <p>{this.state.message}</p>
          {/* Display the fallback prop passed from the parent (page.js).
              This allows each ErrorBoundary instance to show a different
              message depending on context. */}
          <p>{this.props.fallback}</p>
        </div>
      );
    }

    // No error: render the children normally. This is the default path.
    // The children here would be the <Suspense> + <UsePromiseDemo> tree.
    return this.props.children;
  }
}
