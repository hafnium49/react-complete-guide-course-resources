/**
 * ============================================================================
 * MEAL NOT FOUND PAGE - LESSON 458: Granular Not Found Handling
 * ============================================================================
 *
 * LESSON 458 - MEAL-SPECIFIC NOT FOUND PAGE
 *
 * INSTRUCTOR QUOTE:
 * "But we can work around that by also adding a not-found.js file here
 * instead of the meals folder. And then we can also set up some
 * meal-specific not-found message."
 *
 * WHY A MEAL-SPECIFIC NOT-FOUND PAGE?
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  GENERIC (app/not-found.js):                                           │
 * │  "Unfortunately, we could not find the requested page or resource."    │
 * │                                                                          │
 * │  MEAL-SPECIFIC (this file):                                             │
 * │  "Unfortunately, we could not find the requested page or meal data."   │
 * │                                                                          │
 * │  The meal-specific message is more helpful because:                     │
 * │  - User knows they're looking for a meal that doesn't exist            │
 * │  - More contextual than a generic 404 message                          │
 * │  - Better user experience with relevant feedback                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * NOT-FOUND PAGE HIERARCHY:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  LOCATION                        │  TRIGGERED BY                        │
 * │  ────────────────────────────────│────────────────────────────────────  │
 * │  app/meals/[mealSlug]/not-found.js │  notFound() in meal details page  │
 * │  app/not-found.js                │  Invalid routes like /random-path   │
 * │                                                                          │
 * │  The CLOSEST not-found.js to where notFound() is called wins!          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "Calling this function will stop this component from executing and will
 * show the closest not-found or error page. So if we have an error page
 * that's closer, as it's the case here, than the closest not-found page,
 * it will still show that."
 *
 * ============================================================================
 */

/**
 * MEAL NOT FOUND COMPONENT
 *
 * INSTRUCTOR QUOTE:
 * "And then we can also set up some meal-specific not-found message.
 * Like Meal not found."
 *
 * NOTE: Like the root not-found.js, this does NOT need 'use client'.
 * It can be a Server Component since it displays static content.
 *
 * @returns {JSX.Element} Meal-specific 404 page
 */
export default function NotFound() {
  /**
   * MEAL-SPECIFIC NOT FOUND UI
   *
   * Uses the same .not-found class from globals.css as the root not-found.js
   * but with a meal-specific message.
   *
   * INSTRUCTOR QUOTE:
   * "Maybe we could not find the requested page or meal data."
   */
  return (
    <main className="not-found">
      <h1>Meal not found</h1>
      <p>Unfortunately, we could not find the requested page or meal data.</p>
    </main>
  );
}

/**
 * ============================================================================
 * LESSON 458 - GRANULAR NOT FOUND HANDLING SUMMARY
 * ============================================================================
 *
 * WHAT WE LEARNED:
 *
 * 1. notFound() FUNCTION FROM next/navigation
 *
 *    INSTRUCTOR QUOTE:
 *    "And that can indeed be triggered by calling a special function that's
 *    provided by NextJS, the notFound function, which is imported from
 *    next/navigation."
 *
 *    - Stops component execution immediately
 *    - Shows the closest not-found.js page
 *    - Returns 404 HTTP status code
 *
 * 2. CHECK FOR MISSING DATA BEFORE USING IT
 *
 *    INSTRUCTOR QUOTE:
 *    "So a better way of handling this would be to go here and check if not
 *    meal. So if meal is undefined, if we didn't find a meal."
 *
 *    - Prevents "Cannot read property of undefined" errors
 *    - Shows appropriate 404 page instead of error page
 *    - Better user experience
 *
 * 3. GRANULAR NOT-FOUND PAGES
 *
 *    INSTRUCTOR QUOTE:
 *    "But we can work around that by also adding a not-found.js file here
 *    instead of the meals folder."
 *
 *    - More specific not-found.js files override parent ones
 *    - Allows contextual error messages per section
 *    - Users get relevant feedback based on what they were looking for
 *
 * NOT-FOUND vs ERROR - WHEN TO USE WHICH:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  USE not-found.js WHEN:               USE error.js WHEN:                │
 * │  ────────────────────────────         ──────────────────────────        │
 * │  • Data doesn't exist (404)           • Runtime errors occur            │
 * │  • Invalid slug/ID in URL             • Database connection fails       │
 * │  • Resource was deleted               • Code throws an exception        │
 * │  • User typed wrong URL               • External API fails              │
 * │                                                                          │
 * │  "It's not really an error that       "Something actually went wrong    │
 * │   occurred from a technical           in the code or system."           │
 * │   perspective."                                                          │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * INSTRUCTOR QUOTE:
 * "And with that, if you now reload, you see that we get this not found page
 * content here, this meal-specific not-found page content. And that's, of
 * course, arguably a better user experience."
 *
 * ============================================================================
 */
