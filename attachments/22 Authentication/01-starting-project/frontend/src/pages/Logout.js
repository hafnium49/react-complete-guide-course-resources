/**
 * ============================================================================
 * LOGOUT ACTION (Created in Lesson 395)
 * ============================================================================
 *
 * This file is UNUSUAL - it contains NO component, only an action function.
 * The logout "page" doesn't render anything; it just clears authentication
 * and redirects the user.
 *
 * INSTRUCTOR QUOTE:
 * "I'll add a new file in my pages folder called Logout.js. And the special
 * thing about this file is that it actually won't contain any component
 * because there is no log out page."
 *
 * ============================================================================
 * WHY USE A ROUTE ACTION INSTEAD OF onClick?
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We could simply add an onClick listener and trigger a function that reaches
 * out to local storage and deletes the token. But here I'll use the more
 * official React Routing Embracing approach, and I'll add a new route."
 *
 * BENEFITS OF USING A ROUTE ACTION:
 * - Follows React Router's declarative pattern
 * - Keeps authentication logic in route actions (consistent with login)
 * - Can be easily extended (e.g., notify backend of logout)
 * - Form submission provides built-in CSRF protection
 * - Navigation state (useNavigation) works automatically
 *
 * ============================================================================
 * ALTERNATIVE APPROACH (Not used here)
 * ============================================================================
 *
 * You COULD use a simple onClick handler:
 *
 * function handleLogout() {
 *   localStorage.removeItem('token');
 *   navigate('/');
 * }
 *
 * But the action-based approach is more aligned with React Router patterns.
 *
 * ============================================================================
 */

import { redirect } from 'react-router-dom';

/**
 * Logout Action Function
 *
 * INSTRUCTOR QUOTE:
 * "Instead, I'll just export a function, an action to be precise, which will
 * clear my local storage, which will get rid of the token."
 *
 * WHAT THIS ACTION DOES:
 * 1. Removes the 'token' from localStorage
 * 2. Redirects user to the home page
 *
 * INSTRUCTOR QUOTE:
 * "So all I wanna do in this action is I wanna reach out to my local storage
 * and remove my token with the removeItem method."
 *
 * localStorage.removeItem() vs localStorage.clear():
 * - removeItem('token') - Removes only the 'token' key (what we use)
 * - clear() - Removes ALL localStorage data (too aggressive)
 *
 * NOTE: This action doesn't need the { request } parameter since we don't
 * need any data from the form submission.
 */
export function action() {
  /**
   * INSTRUCTOR QUOTE:
   * "So all I wanna do in this action is I wanna reach out to my local storage
   * and remove my token with the removeItem method."
   *
   * This effectively "logs out" the user by:
   * - Removing their authentication token
   * - Future requests won't have a token to attach
   * - UI will update to show logged-out state (in upcoming lessons)
   */
  localStorage.removeItem('token');

  /**
   * INSTRUCTOR QUOTE:
   * "And then I want to return redirect with that redirect function from
   * react-router-dom, and redirect the user to the starting page; let's say
   * if a user logs out."
   *
   * After clearing the token, send user back to home page.
   * They can then choose to log in again if needed.
   */
  return redirect('/');
}
