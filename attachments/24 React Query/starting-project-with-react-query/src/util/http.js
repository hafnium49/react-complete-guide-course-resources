/**
 * ============================================================================
 * HTTP UTILITY FUNCTIONS - Lesson 412: Installing & Using Tanstack Query
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I'll start by selecting this code here, this async fetch events function
 * and I'll cut it here, and add it in a new file in my source folder
 * in a sub folder named util for utility."
 *
 * ============================================================================
 * WHY OUTSOURCE FETCH FUNCTIONS TO A SEPARATE FILE?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And the idea here simply is to have all that code that controls how to
 * fetch the data. So how to send that HTTP request with the fetch function
 * and how to extract the response data, that all that code, all these
 * functions that take care of that, live in that separate file."
 *
 * Benefits of this pattern:
 * ┌─────────────────────────────────────────────────────────────────────────┐
 * │  1. SEPARATION OF CONCERNS                                              │
 * │     - HTTP logic is separate from component logic                       │
 * │     - Components focus on UI, this file focuses on data fetching       │
 * │                                                                          │
 * │  2. REUSABILITY                                                          │
 * │     - Same fetch function can be used by multiple components            │
 * │     - Can be imported by Tanstack Query's useQuery or useMutation       │
 * │                                                                          │
 * │  3. TESTABILITY                                                          │
 * │     - HTTP functions can be unit tested independently                   │
 * │     - Easier to mock in component tests                                 │
 * │                                                                          │
 * │  4. FLEXIBILITY                                                          │
 * │     - Can switch from fetch to axios without changing components        │
 * │     - API endpoint changes only affect this file                        │
 * └─────────────────────────────────────────────────────────────────────────┘
 *
 * ============================================================================
 * IMPORTANT: TANSTACK QUERY DOESN'T SEND REQUESTS
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Tanstack Query does not come with some built-in logic to send HTTP requests.
 * Instead it comes with logic for managing those requests, for keeping track
 * of the data and the possible errors that are yielded by these requests
 * and so on. The code for sending the requests must come from your side."
 *
 * INSTRUCTOR QUOTE:
 * "You define that code and you can define the code however you want.
 * Here I'm using the builtin fetch function to send a request.
 * I could also be using axios, another third party library here.
 * I can do whatever I want."
 *
 * INSTRUCTOR QUOTE:
 * "Technically, I don't even have to send a request here because all
 * useQuery wants is a function that returns a promise.
 * That is its requirement here."
 *
 * ============================================================================
 */

/**
 * Fetches all events from the backend API.
 *
 * INSTRUCTOR QUOTE:
 * "And I'll export these functions here. So this fetchEvents function
 * for example, so that we can use it outside of that file because we
 * will soon use it with Tanstack Query as you'll see."
 *
 * This function will be passed to useQuery's queryFn option.
 * Requirements for a queryFn:
 * - Must return a Promise
 * - Must throw an error if the request fails (so useQuery can catch it)
 *
 * @returns {Promise<Array>} Array of event objects
 * @throws {Error} If the response is not ok (4xx or 5xx status)
 */
export async function fetchEvents() {
  const response = await fetch('http://localhost:3000/events');

  /**
   * ERROR HANDLING IS CRITICAL FOR TANSTACK QUERY
   *
   * INSTRUCTOR QUOTE:
   * "Now to make sure that isError is true, in such a case your code
   * that sends the request also must make sure that an error is thrown
   * if you got an invalid response."
   *
   * INSTRUCTOR QUOTE:
   * "This code checks if we got a 400 or 500-ish response code,
   * in which case it generates and throws an error and that would
   * then lead to isError being true."
   *
   * Why we must throw errors manually:
   * - fetch() only rejects on network errors, NOT on 4xx/5xx responses
   * - We must check response.ok and throw our own error
   * - This error will be caught by Tanstack Query and stored in the
   *   'error' property returned by useQuery
   */
  if (!response.ok) {
    const error = new Error('An error occurred while fetching the events');
    error.code = response.status;
    /**
     * INSTRUCTOR QUOTE:
     * "And in that case, we also get back an error property which contains
     * information about that error that occurred. For example, the error message."
     *
     * We attach the response JSON to error.info so we can display
     * server-provided error messages in the UI.
     */
    error.info = await response.json();
    throw error;
  }

  const { events } = await response.json();

  return events;
}
