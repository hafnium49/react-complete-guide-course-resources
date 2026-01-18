/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT (Updated in Lesson 399)
 * ============================================================================
 *
 * This is the root layout component that wraps ALL routes in the application.
 * It renders the main navigation and provides the outlet for child routes.
 *
 * ============================================================================
 * LESSON 399 - AUTOMATIC LOGOUT AFTER TOKEN EXPIRATION
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "At the moment we always stay logged in if we got that token once. So as
 * soon as we got the token, we save it, and from that point on, we stay
 * logged in. Now, that's nice but unrealistic."
 *
 * THE PROBLEM:
 * - Backend creates tokens that expire after 1 hour (for security)
 * - But our frontend keeps using the token even after it expires
 * - This leads to failed API requests with invalid tokens
 *
 * THE SOLUTION:
 * - Set a timer when user logs in
 * - After 1 hour, automatically trigger logout
 * - Clear the token and update UI
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, I also wanna log the user out after one hour because the token
 * is invalid thereafter. And I don't just wanna log the user out, I also
 * wanna clear the token and I wanna remove it from local storage."
 *
 * WHY USE ROOT LAYOUT FOR THIS?
 *
 * INSTRUCTOR QUOTE:
 * "One option would be to go to the root layout. So to this Root.js file.
 * And in that file we could use the good old useEffect hook."
 *
 * INSTRUCTOR QUOTE:
 * "This is the one root component which definitely includes all other route
 * components."
 *
 * NOTE: This approach works because ALL routes are children of this layout.
 * If you had multiple sibling root layouts, this wouldn't work.
 *
 * ============================================================================
 * IMPORTANT: THIS SOLUTION HAS A FLAW (Will be fixed in Lesson 400)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But this solution still isn't perfect yet. It still has a flaw."
 *
 * The flaw is that if the user refreshes the page 30 minutes after logging in,
 * the timer restarts from 1 hour instead of using the remaining time.
 * This will be addressed in the next lesson.
 *
 * ============================================================================
 */

import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';

function RootLayout() {
  /**
   * ============================================================================
   * GETTING TOKEN WITH useLoaderData (Lesson 399)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And since I'm in the root layout, and I'm getting the token here with help
   * of the token loader, I can simply use useLoaderData here. I don't even need
   * to use useRouteLoaderData and use the id of the route, because here I
   * already am in that very component that's rendered for the root route."
   *
   * WHY useLoaderData WORKS HERE:
   * - This component IS the element for the root route
   * - useLoaderData returns data from the CURRENT route's loader
   * - The root route has tokenLoader, which returns getAuthToken()
   * - So 'token' is either: string (logged in) or null (not logged in)
   *
   * COMPARE:
   * - useLoaderData() - Gets data from current route's loader
   * - useRouteLoaderData('id') - Gets data from any route by ID
   *
   * Since we're IN the root route's component, useLoaderData is simpler.
   */
  const token = useLoaderData();

  /**
   * ============================================================================
   * useSubmit HOOK FOR PROGRAMMATIC LOGOUT (Lesson 399)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "For that, we can use a hook provided by React Router. That's the useSubmit
   * hook which gives us a submit function."
   *
   * INSTRUCTOR QUOTE:
   * "We learned about this hook in the routing section, of course, which we
   * can use to programmatically submit a form."
   *
   * WHAT IT DOES:
   * - Returns a submit function
   * - Allows programmatically submitting forms
   * - We'll use it to trigger the logout action when timer expires
   *
   * INSTRUCTOR QUOTE:
   * "Here I wanna basically submit that logout form which I have in my main
   * navigation file. I wanna send that logout request."
   */
  const submit = useSubmit();

  /**
   * ============================================================================
   * AUTO-LOGOUT TIMER WITH useEffect (Lesson 399)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And then here, this useEffect hook could be used to set a timer whenever
   * the root layout is rendered which happens when the application starts
   * because that is the very first component we definitely load for all our
   * routes."
   *
   * DEPENDENCIES EXPLAINED:
   * - token: Effect runs when token changes (login/logout)
   * - submit: Technically won't change, but good practice to include
   *
   * INSTRUCTOR QUOTE:
   * "And that token can now be set as a dependency for a useEffect so that
   * this effect function runs whenever the token changes."
   */
  useEffect(() => {
    /**
     * EARLY RETURN IF NO TOKEN
     *
     * INSTRUCTOR QUOTE:
     * "And here I simply wanna check if we maybe don't have a token. If that's
     * the case, I just wanna return because there's nothing to do then."
     *
     * INSTRUCTOR QUOTE:
     * "If we don't have a token anymore, if this effect function was executed
     * because the token was removed, for example, then we don't have anything
     * to do."
     *
     * SCENARIOS WHERE token IS FALSY:
     * - User just logged out
     * - User hasn't logged in yet
     * - Token was cleared for some reason
     */
    if (!token) {
      return;
    }

    /**
     * SET LOGOUT TIMER FOR 1 HOUR
     *
     * INSTRUCTOR QUOTE:
     * "But if we do have a token, I wanna set a timer. I wanna set a timer
     * that expires after one hour and that then triggers that logout action."
     *
     * INSTRUCTOR QUOTE:
     * "Once that timer expired, I will call submit. I won't pass any data
     * because there is no data to submit. But I will target this /logout
     * action, this logout route, the action that belongs to that route,
     * set the method to post."
     *
     * HOW THE TIMER WORKS:
     * 1. setTimeout schedules a function to run after 1 hour
     * 2. When timer fires, submit() is called
     * 3. submit() sends POST request to /logout route
     * 4. Logout action clears token and redirects to home
     * 5. UI updates to show logged-out state
     *
     * CALCULATING 1 HOUR IN MILLISECONDS:
     *
     * INSTRUCTOR QUOTE:
     * "Here I will set the timeout to one hour by multiplying one with 60,
     * so 60 minutes, then 60 seconds and then 1000 milliseconds because
     * setTimeout expects to get the duration in milliseconds here."
     *
     * 1 * 60 * 60 * 1000 = 3,600,000 milliseconds = 1 hour
     *   ^    ^    ^    ^
     *   |    |    |    └── ms per second
     *   |    |    └─────── seconds per minute
     *   |    └──────────── minutes per hour
     *   └───────────────── 1 hour
     */
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, 1 * 60 * 60 * 1000);

  }, [token, submit]);

  return (
    <>
      <MainNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
