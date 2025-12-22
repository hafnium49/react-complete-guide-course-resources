// =============================================================================
// ERROR BOUNDARIES - Catching Errors in React Components
// =============================================================================
// Error Boundaries are a React pattern for gracefully handling JavaScript errors
// in components. They prevent your entire application from crashing when
// something goes wrong in a part of the UI.
//
// CRITICAL: Error Boundaries can ONLY be built with class-based components!
// There is NO functional component equivalent (no useErrorBoundary hook exists).
// This is one of the few cases where you MUST use a class-based component.
// =============================================================================

// =============================================================================
// WHY DO WE NEED ERROR BOUNDARIES?
// =============================================================================
//
// In JavaScript, we use try-catch to handle errors:
//
//   try {
//     someCodeWhichMightFail();
//   } catch (error) {
//     // Handle the error gracefully
//     console.log('Something went wrong:', error);
//   }
//
// But try-catch DOESN'T work with JSX!
//
//   ❌ This does NOT work:
//   try {
//     return <ComponentThatMightThrowError />;
//   } catch (error) {
//     return <FallbackUI />;
//   }
//
// Why? Because JSX is declarative. The error happens when React renders
// the component, not when we write the JSX. By the time the error occurs,
// our try-catch block is long gone from the call stack.
//
// Solution: Error Boundaries - a component-based way to catch errors!
//
// =============================================================================

// =============================================================================
// HOW ERROR BOUNDARIES WORK
// =============================================================================
//
//   ┌─────────────────────────────────────────────────────────────────────────┐
//   │                    ERROR BOUNDARY FLOW                                  │
//   ├─────────────────────────────────────────────────────────────────────────┤
//   │                                                                         │
//   │   <ErrorBoundary>                                                       │
//   │     <ComponentThatMightFail />    ← Error thrown here!                  │
//   │   </ErrorBoundary>                                                      │
//   │                                                                         │
//   │   1. Child component throws an error                                    │
//   │   2. Error bubbles up to ErrorBoundary                                  │
//   │   3. componentDidCatch() lifecycle method is triggered                  │
//   │   4. ErrorBoundary updates its state (hasError: true)                   │
//   │   5. render() shows fallback UI instead of crashed children             │
//   │                                                                         │
//   └─────────────────────────────────────────────────────────────────────────┘
//
// The key insight: ErrorBoundary is just a regular component that:
// 1. Wraps other components (renders this.props.children)
// 2. Has componentDidCatch() to detect errors in children
// 3. Shows fallback UI when an error is caught
//
// =============================================================================

// =============================================================================
// WHEN TO USE ERRORS (Not just for bugs!)
// =============================================================================
//
// Errors aren't always "mistakes" - they're also used to:
//
// 1. Signal that an HTTP request failed (server offline)
// 2. Indicate invalid data from an API
// 3. Transport information that "something went wrong" from one part of
//    the application to another
// 4. Handle edge cases (like empty data that shouldn't be empty)
//
// In our example, we throw an error when there are no users to display.
// This isn't a bug - it's intentionally signaling a condition that the
// parent component should handle gracefully.
//
// =============================================================================

import { Component } from 'react';

// =============================================================================
// THE ERROR BOUNDARY COMPONENT
// =============================================================================
// What makes this an "Error Boundary"?
//
// It's NOT a special type of component. It's just a regular class-based
// component that implements the componentDidCatch() lifecycle method.
//
// Any class-based component with componentDidCatch() is an Error Boundary.
// The name "ErrorBoundary" is just a convention - you can name it anything!
// =============================================================================
class ErrorBoundary extends Component {
  // ===========================================================================
  // CONSTRUCTOR - Initialize Error State
  // ===========================================================================
  constructor() {
    super();
    // -------------------------------------------------------------------------
    // Track whether an error has occurred
    // -------------------------------------------------------------------------
    // This state determines what we render:
    // - hasError: false → render children normally
    // - hasError: true  → render fallback UI
    //
    // You can add more state here if needed:
    // - errorMessage: store the actual error message
    // - errorInfo: store component stack trace
    // -------------------------------------------------------------------------
    this.state = { hasError: false };
  }

  // ===========================================================================
  // componentDidCatch() - THE KEY TO ERROR BOUNDARIES
  // ===========================================================================
  // This is the MAGIC lifecycle method that makes Error Boundaries work!
  //
  // It's called whenever a CHILD component (at any depth) throws an error.
  // The error is "caught" here instead of crashing the entire application.
  //
  // IMPORTANT: componentDidCatch() only exists in class-based components!
  // There is NO hook equivalent (no useComponentDidCatch or similar).
  // This is why Error Boundaries MUST be class-based components.
  //
  // Parameters:
  //   error - The error object that was thrown
  //   errorInfo - Object with componentStack (which component failed)
  //
  // Use cases:
  //   - Log the error to the console
  //   - Send error to a logging service (like Sentry, LogRocket)
  //   - Update state to show fallback UI
  //   - Differentiate handling based on error type
  // ===========================================================================
  componentDidCatch(error) {
    // -------------------------------------------------------------------------
    // Log the error (for debugging)
    // -------------------------------------------------------------------------
    // In production, you might send this to an error tracking service:
    //   sendToErrorTrackingService(error, errorInfo);
    // -------------------------------------------------------------------------
    console.log(error);

    // -------------------------------------------------------------------------
    // Update state to trigger fallback UI
    // -------------------------------------------------------------------------
    // By setting hasError to true, the next render() call will show
    // the fallback UI instead of the broken children.
    // -------------------------------------------------------------------------
    this.setState({ hasError: true });
  }

  // ===========================================================================
  // ALTERNATIVE: static getDerivedStateFromError()
  // ===========================================================================
  // There's another lifecycle method for Error Boundaries:
  //
  //   static getDerivedStateFromError(error) {
  //     return { hasError: true };  // Update state based on error
  //   }
  //
  // Differences:
  // - getDerivedStateFromError: Runs during RENDER phase (synchronous)
  //   → Use for updating state to show fallback UI
  // - componentDidCatch: Runs during COMMIT phase (after render)
  //   → Use for side effects like logging errors
  //
  // You can use both together for best practices:
  //   - getDerivedStateFromError to update state (fast, synchronous)
  //   - componentDidCatch for logging (side effects, can be async)
  // ===========================================================================

  // ===========================================================================
  // RENDER - Show Children or Fallback UI
  // ===========================================================================
  render() {
    // -------------------------------------------------------------------------
    // Conditional Rendering Based on Error State
    // -------------------------------------------------------------------------
    // If an error was caught, show fallback UI
    // Otherwise, render children normally
    // -------------------------------------------------------------------------
    if (this.state.hasError) {
      // -----------------------------------------------------------------------
      // FALLBACK UI
      // -----------------------------------------------------------------------
      // This is what users see instead of a crashed application.
      // You can customize this to:
      // - Show a friendly error message
      // - Provide a "Try Again" button
      // - Display contact information for support
      // - Show a different UI based on error type
      //
      // In production, you'd likely have a styled component here.
      // -----------------------------------------------------------------------
      return <p>Something went wrong!</p>;
    }

    // -------------------------------------------------------------------------
    // NORMAL RENDERING: Show Children
    // -------------------------------------------------------------------------
    // When no error has occurred, render the children normally.
    //
    // this.props.children contains whatever components are wrapped by
    // <ErrorBoundary>...</ErrorBoundary>
    //
    // Example usage:
    //   <ErrorBoundary>
    //     <Users users={filteredUsers} />   ← this.props.children
    //   </ErrorBoundary>
    // -------------------------------------------------------------------------
    return this.props.children;
  }
}

// =============================================================================
// HOW TO USE ERROR BOUNDARIES
// =============================================================================
//
// Wrap components that might throw errors:
//
//   <ErrorBoundary>
//     <ComponentThatMightFail />
//   </ErrorBoundary>
//
// You can wrap multiple components:
//
//   <ErrorBoundary>
//     <Header />
//     <MainContent />
//     <Footer />
//   </ErrorBoundary>
//
// Or use multiple Error Boundaries for granular control:
//
//   <ErrorBoundary>
//     <Header />           ← If this fails, only header shows fallback
//   </ErrorBoundary>
//   <ErrorBoundary>
//     <MainContent />      ← If this fails, main content shows fallback
//   </ErrorBoundary>
//
// =============================================================================

// =============================================================================
// WHAT ERRORS ARE CAUGHT?
// =============================================================================
//
// Error Boundaries catch errors in:
//   ✓ Render methods
//   ✓ Lifecycle methods
//   ✓ Constructors of child components
//
// Error Boundaries do NOT catch errors in:
//   ✗ Event handlers (use regular try-catch)
//   ✗ Asynchronous code (setTimeout, promises, async/await)
//   ✗ Server-side rendering
//   ✗ Errors thrown in the Error Boundary itself
//
// For event handlers, use regular try-catch:
//
//   handleClick = () => {
//     try {
//       doSomethingRisky();
//     } catch (error) {
//       this.setState({ hasError: true });
//     }
//   };
//
// =============================================================================

// =============================================================================
// WHY NO FUNCTIONAL EQUIVALENT?
// =============================================================================
//
// You might wonder: "Why can't I use useEffect or a custom hook for this?"
//
// The answer is technical:
// - Error boundaries need to catch errors during RENDERING
// - Hooks run AFTER rendering, so they can't catch render-time errors
// - componentDidCatch is called synchronously when an error bubbles up
// - There's no hook lifecycle that can intercept errors during render
//
// The React team has discussed adding a useErrorBoundary hook, but as of
// React 18, it doesn't exist. You must use class-based components for this.
//
// This is one of the few remaining use cases where class-based components
// are REQUIRED, not just preferred.
//
// =============================================================================

// =============================================================================
// COMPARISON: TRY-CATCH vs ERROR BOUNDARY
// =============================================================================
//
//   Regular JavaScript (try-catch):
//   ─────────────────────────────────────────────────────────────────────────
//   try {
//     riskyOperation();
//   } catch (error) {
//     handleError(error);
//   }
//   ✓ Works for: Imperative code (functions, loops, etc.)
//   ✗ Doesn't work for: JSX / Component rendering
//
//   React (Error Boundary):
//   ─────────────────────────────────────────────────────────────────────────
//   <ErrorBoundary>
//     <RiskyComponent />
//   </ErrorBoundary>
//   ✓ Works for: Component rendering, lifecycle methods
//   ✗ Doesn't work for: Event handlers, async code
//
// =============================================================================

// =============================================================================
// DEVELOPMENT vs PRODUCTION
// =============================================================================
//
// In DEVELOPMENT mode:
// - React shows an error overlay with the full stack trace
// - You'll see a red error screen that you can dismiss
// - This helps you debug issues quickly
//
// In PRODUCTION mode:
// - The error overlay is NOT shown
// - Only your fallback UI is visible to users
// - Users get a graceful degradation, not a crashed app
//
// To test production behavior during development:
// - Build the app: npm run build
// - Serve the build: npx serve -s build
//
// =============================================================================

export default ErrorBoundary;
