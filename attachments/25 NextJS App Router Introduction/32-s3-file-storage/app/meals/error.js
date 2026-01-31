/**
 * ============================================================================
 * MEALS ERROR PAGE - LESSON 476 Section Summary Reference
 * ============================================================================
 *
 * This file demonstrates the error.js special file, one of the key
 * Next.js App Router conventions covered in this section.
 *
 * ============================================================================
 * SPECIAL FILE: error.js
 * ============================================================================
 *
 * From the instructor (Lesson 476):
 * "You also learned about other special files like error.js for handling
 * errors, or not-found.js for handling not found errors."
 *
 * error.js creates an ERROR BOUNDARY that catches runtime errors in the
 * route segment and its children.
 *
 * ============================================================================
 * 'use client' REQUIREMENT
 * ============================================================================
 *
 * Error components MUST be Client Components!
 *
 * Why? Because:
 * 1. Error boundaries use React's error boundary mechanism
 * 2. Error boundaries need to intercept errors during rendering
 * 3. This requires client-side React features
 *
 * ============================================================================
 * HOW error.js WORKS
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │                                                                          │
 * │   NORMAL FLOW:                                                          │
 * │   /meals → Renders MealsPage                                            │
 * │                                                                          │
 * │   ERROR FLOW:                                                           │
 * │   /meals → MealsPage throws error                                       │
 * │         → error.js catches it                                           │
 * │         → Shows this Error component instead                            │
 * │                                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * ERROR BOUNDARY HIERARCHY
 * ============================================================================
 *
 * Error boundaries are nested like layouts:
 *
 *   app/error.js               ← Catches errors from all routes
 *   app/meals/error.js         ← Catches errors from /meals/* (THIS FILE)
 *   app/meals/share/error.js   ← Catches errors from /meals/share/*
 *
 * Next.js finds the CLOSEST error boundary to the error source.
 *
 * ============================================================================
 * OPTIONAL: RECEIVING ERROR DETAILS
 * ============================================================================
 *
 * The Error component can receive props for more advanced handling:
 *
 *   export default function Error({ error, reset }) {
 *     // error - The actual Error object
 *     // reset - Function to retry rendering
 *
 *     return (
 *       <div>
 *         <h1>Something went wrong!</h1>
 *         <p>{error.message}</p>
 *         <button onClick={reset}>Try again</button>
 *       </div>
 *     );
 *   }
 *
 * ============================================================================
 * DIFFERENCE: error.js vs not-found.js
 * ============================================================================
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  error.js       │  Runtime errors (exceptions, failed fetches)         │
 * │  not-found.js   │  404 errors (notFound() called, route doesn't exist) │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */

'use client';

export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to fetch meal data. Please try again later.</p>
    </main>
  );
}
