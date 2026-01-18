/**
 * ============================================================================
 * AUTHENTICATION UTILITY FUNCTIONS (Updated in Lesson 396)
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
 */

/**
 * getAuthToken - Retrieves the stored JWT token from localStorage
 *
 * INSTRUCTOR QUOTE:
 * "In this file, I'll simply export a function which I'll call getAuthToken.
 * And this function should give me the currently stored token. So I'll return
 * the result of calling localStorage.getItem, and then getting the token."
 *
 * INSTRUCTOR QUOTE:
 * "So retrieving the token that was stored under the token key, that's of
 * course what we stored it under, and that's of course what we should
 * therefore retrieve it with."
 *
 * HOW IT WORKS:
 * - localStorage.getItem('key') returns the value stored under that key
 * - If no value exists, it returns null (not undefined)
 * - The token was stored in Authentication.js action after successful login/signup
 *
 * USAGE:
 * - Import this function in any action that needs to send authenticated requests
 * - Call getAuthToken() to get the current token
 * - Attach the token to the Authorization header
 *
 * RETURN VALUE:
 * - string: The JWT token if user is logged in
 * - null: If no token exists (user not logged in)
 *
 * @returns {string|null} The stored JWT token or null if not found
 */
export function getAuthToken() {
  const token = localStorage.getItem('token');
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
