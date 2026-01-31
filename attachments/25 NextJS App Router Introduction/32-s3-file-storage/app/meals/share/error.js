/**
 * ============================================================================
 * SHARE MEAL ERROR PAGE - LESSON 476 Section Summary Reference
 * ============================================================================
 *
 * This is a ROUTE-SPECIFIC error boundary for the /meals/share route.
 *
 * ============================================================================
 * NESTED ERROR BOUNDARIES
 * ============================================================================
 *
 * Error boundaries can be nested to provide context-specific error messages:
 *
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  ERROR LOCATION           │  ERROR BOUNDARY USED                       │
 * │───────────────────────────┼────────────────────────────────────────────│
 * │  app/page.js              │  app/error.js (root, if exists)            │
 * │  app/meals/page.js        │  app/meals/error.js                        │
 * │  app/meals/share/page.js  │  app/meals/share/error.js (THIS FILE) ✓   │
 * │  app/meals/[mealSlug]     │  app/meals/error.js (bubbles up)          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY A SPECIFIC ERROR PAGE FOR SHARE?
 * ============================================================================
 *
 * The share page has different error scenarios:
 * - Image upload failures (to S3)
 * - Database write failures
 * - Server action failures
 *
 * A specific error message "Failed to create meal" is more helpful than
 * a generic "Failed to fetch meal data" message.
 *
 * ============================================================================
 * WHEN THIS ERROR PAGE IS SHOWN
 * ============================================================================
 *
 * This page appears when:
 * 1. The Server Action (shareMeal) throws an unhandled error
 * 2. S3 upload fails
 * 3. Database insertion fails
 * 4. Any runtime error in /meals/share route
 *
 * Note: Validation errors (invalid input) are handled gracefully via
 * useFormState and don't trigger this error boundary.
 *
 * ============================================================================
 */

'use client';

export default function Error() {
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      <p>Failed to create meal.</p>
    </main>
  );
}
