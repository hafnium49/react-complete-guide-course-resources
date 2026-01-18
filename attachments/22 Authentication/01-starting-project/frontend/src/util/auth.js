/**
 * ============================================================================
 * AUTHENTICATION UTILITY FUNCTIONS (Created in Lesson 394)
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
