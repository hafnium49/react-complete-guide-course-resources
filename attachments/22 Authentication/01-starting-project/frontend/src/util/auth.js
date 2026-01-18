/**
 * ============================================================================
 * AUTHENTICATION UTILITY FUNCTIONS (Updated in Lesson 400)
 * ============================================================================
 *
 * This file contains helper functions for managing authentication tokens.
 * These utilities are used across the application to access stored tokens
 * and attach them to protected API requests.
 *
 * ============================================================================
 * WHY A SEPARATE UTILITY FILE?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "I'll create a new subfolder here in that source folder, which I'll name
 * util, for utility, for helper functions, for example. And in there I'll add
 * a new file, which I'll name auth.js."
 *
 * Benefits of a utility file:
 * - Centralized token management logic
 * - DRY (Don't Repeat Yourself) - write once, use everywhere
 * - Easy to modify if token storage mechanism changes
 * - Separation of concerns - keeps action functions clean
 *
 * ============================================================================
 * LESSON 396 - ADDING tokenLoader FOR REACTIVE TOKEN ACCESS
 * ============================================================================
 *
 * WHY NOT JUST CALL getAuthToken DIRECTLY IN COMPONENTS?
 *
 * INSTRUCTOR QUOTE:
 * "I don't just wanna call getAuthToken, my helper function here in main
 * navigation, for example to get the token because that function is only
 * called when this component is reevaluated, but it will not lead to the
 * component being reevaluated if the token is deleted in the future."
 *
 * INSTRUCTOR QUOTE:
 * "So I want a more reactive solution."
 *
 * THE SOLUTION: Use a route loader on the root route. This gives us:
 * - Automatic re-evaluation when navigation occurs (e.g., logout)
 * - Token data available to ALL routes via useRouteLoaderData
 * - UI automatically updates when auth state changes
 *
 * ============================================================================
 * LESSON 397 - IMPORTANT: LOADERS MUST RETURN A VALUE
 * ============================================================================
 *
 * CRITICAL RULE FOR REACT ROUTER LOADERS:
 * Route loaders MUST always return a value - either:
 * - A Response object (including redirect())
 * - null
 * - Any other value (data, objects, arrays, etc.)
 *
 * COMMON MISTAKE (causes errors):
 * ```javascript
 * export function someLoader() {
 *   if (condition) {
 *     return redirect('/somewhere');
 *   }
 *   // PROBLEM: Nothing returned here! This causes errors.
 * }
 * ```
 *
 * CORRECT APPROACH:
 * ```javascript
 * export function someLoader() {
 *   if (condition) {
 *     return redirect('/somewhere');
 *   }
 *   return null;  // Always return something!
 * }
 * ```
 *
 * This is especially important for the checkAuthLoader function below,
 * which redirects if no token exists but must return null otherwise.
 *
 * ============================================================================
 */

import { redirect } from 'react-router-dom';

/**
 * ============================================================================
 * getTokenDuration - Calculate Remaining Token Lifetime (Lesson 400)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "For that, I'll actually add a new function here, which I'll name
 * getTokenDuration. And here I want to get back the remaining lifetime of the
 * token, in milliseconds."
 *
 * PURPOSE:
 * This function calculates how much time remains before the token expires.
 * It returns the duration in milliseconds, which can be:
 * - POSITIVE: Token is still valid, this is the remaining time
 * - NEGATIVE: Token has expired, the absolute value is how long ago
 *
 * INSTRUCTOR QUOTE:
 * "If the expiration is still in the future. So if the token is still valid,
 * therefore, then this will be a positive value. If now is later than the
 * token expiration, so if the token did expire, this will be a negative value."
 *
 * @returns {number} Duration in milliseconds (positive if valid, negative if expired)
 */
export function getTokenDuration() {
  /**
   * STEP 1: GET STORED EXPIRATION DATE
   *
   * INSTRUCTOR QUOTE:
   * "And I'll get that information, by getting my expiration date. By accessing
   * localStorage.getItem expiration, so by using that key we just used for
   * storing the expiration date."
   */
  const storedExpirationDate = localStorage.getItem('expiration');

  /**
   * STEP 2: CONVERT STRING TO DATE OBJECT
   *
   * INSTRUCTOR QUOTE:
   * "And actually that's my storedExpirationDate. Which I now must transform to
   * a date object, by simply passing that storedExpirationDate, which is a
   * string, to the date constructor."
   *
   * Remember: localStorage stores everything as strings. When we stored the
   * expiration, we used toISOString(). Now we parse it back to a Date object.
   */
  const expirationDate = new Date(storedExpirationDate);

  /**
   * STEP 3: GET CURRENT DATE/TIME
   *
   * INSTRUCTOR QUOTE:
   * "And then I also need to get the current date. So the current timestamp,
   * so to say."
   */
  const now = new Date();

  /**
   * STEP 4: CALCULATE THE DIFFERENCE
   *
   * INSTRUCTOR QUOTE:
   * "And the difference between the two dates of course, is the remaining
   * duration. So the duration in milliseconds, can now be calculated by using
   * that expiration date, and calling getTime on it, which gives me the time
   * value in milliseconds. And deducting. Now.getTime from it."
   *
   * INSTRUCTOR QUOTE:
   * "So I deduct the current timestamp, from the expiration timestamp."
   *
   * getTime() converts a Date to milliseconds since January 1, 1970 (Unix epoch)
   *
   * CALCULATION:
   * duration = expirationTime - currentTime
   *
   * EXAMPLE:
   * - expiration = 3:00 PM → getTime() = 1705330800000
   * - now = 2:30 PM → getTime() = 1705329000000
   * - duration = 1705330800000 - 1705329000000 = 1,800,000 ms (30 minutes)
   *
   * IF EXPIRED:
   * - expiration = 2:00 PM → getTime() = 1705327200000
   * - now = 2:30 PM → getTime() = 1705329000000
   * - duration = 1705327200000 - 1705329000000 = -1,800,000 ms (expired 30 min ago)
   */
  const duration = expirationDate.getTime() - now.getTime();

  /**
   * INSTRUCTOR QUOTE:
   * "And here, I simply return the duration."
   */
  return duration;
}

/**
 * ============================================================================
 * getAuthToken - Retrieves the stored JWT token from localStorage (Updated Lesson 400)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In this file, I'll simply export a function which I'll call getAuthToken.
 * And this function should give me the currently stored token. So I'll return
 * the result of calling localStorage.getItem, and then getting the token."
 *
 * ============================================================================
 * LESSON 400 UPDATE - CHECK TOKEN EXPIRATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now we can update this getAuthToken utility function, to also take a look
 * at that expiration date, and find out if the token did maybe expire."
 *
 * INSTRUCTOR QUOTE:
 * "But I can now use that duration, from getTokenDuration, here in getAuthToken.
 * By calling getTokenDuration here. To check if tokenDuration is smaller than
 * zero. Which means the token expired."
 *
 * RETURN VALUE (Updated):
 * - string 'EXPIRED': If token exists but has expired
 * - string (JWT): The valid JWT token if user is logged in and token is valid
 * - null: If no token exists (user not logged in)
 *
 * @returns {string|null} 'EXPIRED' if expired, JWT token string if valid, null if no token
 */
export function getAuthToken() {
  const token = localStorage.getItem('token');

  /**
   * CHECK IF TOKEN EXISTS FIRST
   *
   * INSTRUCTOR QUOTE:
   * "With those changes made, I just also must make sure that in getAuthToken,
   * I not always return expired, but I also check if we have a token at all.
   * If we don't even find a token, then I want to just return. So I return
   * undefined in the end. I don't even need to check the duration."
   *
   * INSTRUCTOR QUOTE:
   * "If I don't do that, the UI would not be updated correctly, because I would
   * basically always return expired."
   *
   * INSTRUCTOR QUOTE:
   * "But now with that, I'm not returning anything if we have no token. But if
   * we do have a token, I'm also checking the expiration."
   *
   * WHY THIS CHECK IS IMPORTANT:
   * - If no token exists, we shouldn't even check expiration
   * - Without this check, we'd always get an expiration duration (possibly NaN)
   * - Returning early (undefined/null) lets the UI correctly show "not logged in"
   */
  if (!token) {
    return null;
  }

  /**
   * CHECK IF TOKEN HAS EXPIRED
   *
   * INSTRUCTOR QUOTE:
   * "But I can now use that duration, from getTokenDuration, here in getAuthToken.
   * By calling getTokenDuration here."
   */
  const tokenDuration = getTokenDuration();

  /**
   * INSTRUCTOR QUOTE:
   * "To check if tokenDuration is smaller than zero. Which means the token
   * expired. Because we have no remaining time, it already expired."
   *
   * INSTRUCTOR QUOTE:
   * "In that case, I will actually return a string expired here. So this special
   * string. Which I can then use in other parts of my application, to trigger
   * this logout action."
   *
   * WHY RETURN 'EXPIRED' STRING INSTEAD OF null?
   * - null means "no token at all" (never logged in, or logged out)
   * - 'EXPIRED' means "had a token, but it's no longer valid"
   * - This distinction lets us handle the expired case specially (trigger logout)
   * - The UI can respond to 'EXPIRED' by automatically logging the user out
   */
  if (tokenDuration < 0) {
    return 'EXPIRED';
  }

  return token;
}

/**
 * ============================================================================
 * tokenLoader - Route Loader for Reactive Token Access (Lesson 396)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So here we can add our loader function and I will put that in a separate
 * file in my auth utility file, actually. Here I'll add my tokenLoader."
 *
 * INSTRUCTOR QUOTE:
 * "And in that function here, I will simply call getAuthToken and return the
 * result of calling that. So that is quite straightforward. I will just use
 * that helper function here."
 *
 * WHY USE A LOADER INSTEAD OF CALLING getAuthToken DIRECTLY?
 *
 * INSTRUCTOR QUOTE:
 * "We could use React context for managing that token across the entire
 * application. That would be a perfectly fine way of doing that. But since
 * we're using React-router, we can also again leverage that tool, that
 * package for doing that."
 *
 * INSTRUCTOR QUOTE:
 * "And we could, for example, go to our root route which in the end wraps
 * all other routes as you can see. And there we could add a loader, which
 * simply takes a look at local storage and extracts the token from local
 * storage."
 *
 * HOW THE LOADER PROVIDES REACTIVITY:
 *
 * INSTRUCTOR QUOTE:
 * "The best thing about that is that React router will automatically
 * reevaluate that if we for example, log out, if we submit that logout form.
 * So it will then re fetch that token and for example determine that the
 * token doesn't exist and then update all the pages that use that loader
 * data from that root route."
 *
 * INSTRUCTOR QUOTE:
 * "So now this will be called whenever a new navigation action occurs, for
 * example, because we triggered a logout and therefore we will check the
 * current status of the token whenever the user does anything on the page
 * whenever the user submits a form or navigates around."
 *
 * USAGE:
 * - Register this loader on the root route in App.js
 * - Give the root route an id (e.g., 'root')
 * - Access the token in any component with useRouteLoaderData('root')
 *
 * @returns {string|null} The token from getAuthToken()
 */
export function tokenLoader() {
  return getAuthToken();
}

/**
 * ============================================================================
 * checkAuthLoader - Route Protection Loader (Lesson 397 / Prepared for 398)
 * ============================================================================
 *
 * This loader function is used to PROTECT routes that require authentication.
 * It checks if a token exists and redirects to the auth page if not.
 *
 * ============================================================================
 * PURPOSE: ROUTE PROTECTION
 * ============================================================================
 *
 * Some routes should only be accessible to logged-in users:
 * - /events/new (creating events)
 * - /events/:id/edit (editing events)
 *
 * If a user manually types these URLs without being logged in, we should
 * redirect them to the authentication page instead of showing an error.
 *
 * ============================================================================
 * HOW IT WORKS
 * ============================================================================
 *
 * 1. Get the current token from localStorage
 * 2. If NO token exists (!token is true):
 *    - User is NOT logged in
 *    - Redirect them to /auth to log in
 * 3. If token EXISTS:
 *    - User IS logged in
 *    - Return null to allow access to the route
 *
 * ============================================================================
 * CRITICAL: MUST RETURN A VALUE (Lesson 397)
 * ============================================================================
 *
 * IMPORTANT: This function demonstrates the rule from Lesson 397:
 * Loaders MUST always return a value!
 *
 * The `return null` at the end is ESSENTIAL. Without it, the loader would
 * return `undefined` when the token exists, which causes React Router errors.
 *
 * WRONG (causes errors):
 * ```javascript
 * export function checkAuthLoader() {
 *   const token = getAuthToken();
 *   if (!token) {
 *     return redirect('/auth');
 *   }
 *   // Missing return! This causes "loader returned undefined" errors
 * }
 * ```
 *
 * CORRECT (what we do):
 * ```javascript
 * export function checkAuthLoader() {
 *   const token = getAuthToken();
 *   if (!token) {
 *     return redirect('/auth');
 *   }
 *   return null;  // MUST return something when token exists!
 * }
 * ```
 *
 * ============================================================================
 * USAGE (in App.js route configuration)
 * ============================================================================
 *
 * This loader will be registered on protected routes:
 * ```javascript
 * {
 *   path: 'new',
 *   element: <NewEventPage />,
 *   action: manipulateEventAction,
 *   loader: checkAuthLoader,  // Protects this route
 * }
 * ```
 *
 * @returns {Response|null} Redirect response if not authenticated, null if authenticated
 */
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    /**
     * User is NOT logged in - redirect to auth page
     * The redirect() function returns a Response object that React Router
     * uses to navigate the user to the specified path.
     */
    return redirect('/auth');
  }

  /**
   * CRITICAL: Return null when token exists!
   *
   * This line is MISSING in the Lesson 398 video but MUST be added.
   * Without this return statement, the function returns undefined,
   * which causes React Router to throw an error.
   *
   * "return null" tells React Router:
   * "The loader ran successfully, no redirect needed, proceed with the route"
   */
  return null;
}
