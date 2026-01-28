/**
 * ============================================================================
 * SHARE MEAL ERROR PAGE - LESSON 468: Route-Specific Error Handling
 * ============================================================================
 *
 * LESSON 468 - CREATING A SPECIFIC ERROR PAGE FOR /meals/share
 *
 * INSTRUCTOR QUOTE:
 * "Now, the error message here is a bit misleading, because it's that main
 * error page which we set up earlier. We should probably set up a specific
 * error page for sharing a meal. So, I will copy that here, paste it here,
 * and say, 'Failed to create meal.' That sounds better."
 *
 * WHY A SPECIFIC ERROR PAGE FOR THIS ROUTE?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  WITHOUT THIS FILE:                                                     │
 * │  • Error bubbles up to app/meals/error.js                              │
 * │  • Shows "Failed to fetch meal data" (generic meals error)             │
 * │  • Message doesn't match the actual error (form validation failed)     │
 * │                                                                          │
 * │  WITH THIS FILE:                                                        │
 * │  • Error is caught at /meals/share level                               │
 * │  • Shows "Failed to create meal" (specific to share page)              │
 * │  • More accurate error message for users                                │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ERROR BOUNDARY HIERARCHY (Most Specific to Least Specific):
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. app/meals/share/error.js  ← THIS FILE (most specific)              │
 * │     └── Catches errors from /meals/share only                          │
 * │                                                                          │
 * │  2. app/meals/error.js (parent folder)                                 │
 * │     └── Catches errors from /meals and /meals/[slug]                   │
 * │                                                                          │
 * │  3. app/error.js (root - if it existed)                                │
 * │     └── Would catch errors from anywhere in the app                    │
 * │                                                                          │
 * │  Next.js uses the NEAREST error.js file to the error source.           │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * WHEN THIS ERROR PAGE SHOWS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  SCENARIO 1 - Validation Error (Lesson 468):                           │
 * │  1. User bypasses client-side validation (removes required attr)       │
 * │  2. Submits form with invalid/missing data                             │
 * │  3. Server Action throws new Error('Invalid input')                    │
 * │  4. THIS error page is rendered                                        │
 * │                                                                          │
 * │  SCENARIO 2 - Database/File System Error:                              │
 * │  1. User submits valid form data                                       │
 * │  2. saveMeal() fails (disk full, DB locked, etc.)                      │
 * │  3. Error is thrown                                                     │
 * │  4. THIS error page is rendered                                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * WHY ERROR.JS MUST BE A CLIENT COMPONENT
 * ============================================================================
 *
 * Same as app/meals/error.js - Next.js requires error boundaries to be
 * Client Components to catch both server-side and client-side errors.
 *
 * ============================================================================
 */
'use client';

/**
 * ============================================================================
 * SHARE MEAL ERROR PAGE COMPONENT
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So, I will copy that here, paste it here, and say, 'Failed to create meal.'
 * That sounds better."
 *
 * This component is nearly identical to app/meals/error.js, but with a
 * message specific to meal creation failures.
 *
 * PROPS PROVIDED BY NEXT.JS:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  { error, reset }                                                       │
 * │                                                                          │
 * │  error: Error object (message hidden in production)                    │
 * │  reset: Function to retry rendering (could add "Try Again" button)     │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NOTE ON THE CURRENT APPROACH (Throwing Errors):
 *
 * INSTRUCTOR QUOTE:
 * "Throwing an error as we do it here works, but it also means that we
 * destroy the entire input of the user. So, we throw away everything they
 * entered. And that's not necessarily a great user experience."
 *
 * INSTRUCTOR QUOTE:
 * "It would be better if we would stay on this page and just output some
 * error message somewhere on this page, above the form or below the form,
 * for example. And that's therefore what we'll implement next."
 *
 * CURRENT BEHAVIOR:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. User fills out form                                                 │
 * │  2. Validation fails                                                    │
 * │  3. User sees THIS error page                                          │
 * │  4. User loses ALL their form input!                                    │
 * │  5. User must start over from scratch                                  │
 * │                                                                          │
 * │  This is functional but not ideal UX.                                  │
 * │  Next lesson will improve this with inline error messages.             │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * @param {Object} props - Props provided by Next.js
 * @param {Error} props.error - The error object (message hidden in production)
 * @returns {JSX.Element} Error UI component
 */
export default function Error({ error }) {
  /**
   * ERROR UI RENDERING
   *
   * Uses the global 'error' class from app/globals.css for consistent
   * styling with other error pages in the application.
   *
   * MESSAGE: "Failed to create meal."
   * - More specific than the parent error.js message
   * - Tells user their meal creation didn't succeed
   * - Doesn't expose internal error details (security)
   */
  return (
    <main className="error">
      <h1>An error occurred!</h1>
      {/**
       * SPECIFIC ERROR MESSAGE FOR MEAL CREATION
       *
       * INSTRUCTOR QUOTE:
       * "So, I will copy that here, paste it here, and say, 'Failed to create
       * meal.' That sounds better."
       *
       * This message is appropriate for:
       * - Validation errors (invalid input)
       * - Database errors (insertion failed)
       * - File system errors (image save failed)
       */}
      <p>Failed to create meal.</p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 468 - VALIDATION AND ERROR HANDLING SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. CLIENT-SIDE VALIDATION ISN'T ENOUGH
 *
 *    INSTRUCTOR QUOTE:
 *    "I can disable that by going through the DevTools and removing that.
 *    Now of course, many users won't know about that, but some do, and in
 *    that case, those users could submit invalid values to my backend."
 *
 *    WAYS TO BYPASS CLIENT VALIDATION:
 *    • Browser DevTools (remove 'required' attribute)
 *    • Disable JavaScript
 *    • Direct HTTP requests (curl, Postman, etc.)
 *
 * 2. SERVER-SIDE VALIDATION IS ESSENTIAL
 *
 *    INSTRUCTOR QUOTE:
 *    "And that's why client-side validation isn't enough. Instead, you
 *    should also validate on the server side."
 *
 *    Server-side validation in lib/actions.js:
 *    • isInvalidText() helper function
 *    • Check all text fields
 *    • Verify email contains @
 *    • Verify image exists with size > 0
 *
 * 3. ROUTE-SPECIFIC ERROR PAGES
 *
 *    INSTRUCTOR QUOTE:
 *    "We should probably set up a specific error page for sharing a meal.
 *    So, I will copy that here, paste it here, and say, 'Failed to create
 *    meal.' That sounds better."
 *
 *    • Place error.js in specific route folders
 *    • Message can match the context of the page
 *    • More helpful for users
 *
 * 4. TRADE-OFF: THROWING ERRORS LOSES USER INPUT
 *
 *    INSTRUCTOR QUOTE:
 *    "Throwing an error as we do it here works, but it also means that we
 *    destroy the entire input of the user. So, we throw away everything
 *    they entered."
 *
 *    → Next lesson will show a better approach!
 *
 * VALIDATION FLOW DIAGRAM:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  User submits form                                                      │
 * │         │                                                               │
 * │         ▼                                                               │
 * │  ┌─────────────────┐                                                    │
 * │  │ Server Action   │                                                    │
 * │  │ validates data  │                                                    │
 * │  └────────┬────────┘                                                    │
 * │           │                                                              │
 * │    ┌──────┴──────┐                                                      │
 * │    │             │                                                       │
 * │  INVALID       VALID                                                    │
 * │    │             │                                                       │
 * │    ▼             ▼                                                       │
 * │  throw Error   saveMeal()                                               │
 * │    │             │                                                       │
 * │    ▼             ▼                                                       │
 * │  error.js      redirect                                                 │
 * │  (this file)   ('/meals')                                               │
 * │    │             │                                                       │
 * │    ▼             ▼                                                       │
 * │  User sees     User sees                                                │
 * │  error page    their meal!                                              │
 * │  (loses input)                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * COMING NEXT:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  Better error handling that:                                            │
 * │  • Keeps user on the same page                                          │
 * │  • Preserves their form input                                           │
 * │  • Shows inline error messages                                          │
 * │  • Uses useFormState (or similar) pattern                              │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 */
