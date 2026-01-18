/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT (Updated in Lesson 400)
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
 * ============================================================================
 * LESSON 400 - FIXING THE TIMER FLAW
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now which flaw does this solution have? Well, at the moment, we always
 * expired a token after 1 hour. The problem is that we of course, might have
 * logged in. Then we were away for 10 minutes. Then we reloaded this
 * application. And then therefore, this effect was triggered again."
 *
 * INSTRUCTOR QUOTE:
 * "We found a token in the local storage, because we did log in 10 minutes
 * ago, but now we reset that timer to 1 hour. That's not realistic, because
 * the token is already 10 minutes old, so it will actually expire in 50
 * minutes, and the backend won't accept it anymore thereafter."
 *
 * THE FIX:
 * - Store the actual expiration time when logging in (in Authentication.js)
 * - Calculate the REMAINING duration using getTokenDuration()
 * - Set timer to remaining duration, NOT always 1 hour
 * - Handle 'EXPIRED' token by triggering immediate logout
 *
 * INSTRUCTOR QUOTE:
 * "Therefore, it's not enough to always set this to 1 hour. Instead we need
 * to manage and register, the actual token expiration."
 *
 * ============================================================================
 */

import { useEffect } from 'react';
import { Outlet, useLoaderData, useSubmit } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
/**
 * ============================================================================
 * IMPORTING getTokenDuration (Lesson 400)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "But now I nonetheless want to set a duration here, that takes the remaining
 * lifetime of the token into account. So here, I will get the token duration,
 * by calling getTokenDuration, so that helper function we just added in the
 * util/auth file."
 *
 * We import this utility function to calculate the remaining time until
 * the token expires, instead of always using a fixed 1-hour timer.
 */
import { getTokenDuration } from '../util/auth';

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
     * SCENARIOS WHERE token IS FALSY:
     * - User just logged out
     * - User hasn't logged in yet
     * - Token was cleared for some reason
     */
    if (!token) {
      return;
    }

    /**
     * ========================================================================
     * CHECK IF TOKEN IS EXPIRED (Lesson 400)
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "For example, if I now go back to the Root layout. Here, I'm checking if
     * I don't have a token. Well, I actually also want to check, if token is
     * equal to expired. So to this special string I'm returning here, if the
     * token did expire."
     *
     * INSTRUCTOR QUOTE:
     * "In which case, I also want to trigger this logout action. And thereafter
     * we can return, because we don't need to set any timer thereafter."
     *
     * WHY CHECK FOR 'EXPIRED'?
     * - getAuthToken() now returns 'EXPIRED' string if token has expired
     * - This happens when user returns to the app after being away
     * - We should immediately log them out instead of waiting for a timer
     * - No point setting a timer for an already-expired token
     */
    if (token === 'EXPIRED') {
      submit(null, { action: '/logout', method: 'post' });
      return;
    }

    /**
     * ========================================================================
     * GET REMAINING TOKEN DURATION (Lesson 400)
     * ========================================================================
     *
     * INSTRUCTOR QUOTE:
     * "If we make it past this check, we know that we have a valid token. But
     * now I nonetheless want to set a duration here, that takes the remaining
     * lifetime of the token into account."
     *
     * INSTRUCTOR QUOTE:
     * "So here, I will get the token duration, by calling getTokenDuration, so
     * that helper function we just added in the util/auth file."
     *
     * This calculates the ACTUAL remaining time until the token expires,
     * not just a fixed 1 hour. If user logged in 10 minutes ago and refreshes,
     * this will return ~50 minutes (3,000,000 ms), not 1 hour.
     */
    const tokenDuration = getTokenDuration();

    /**
     * DEBUG: LOG TOKEN DURATION
     *
     * INSTRUCTOR QUOTE:
     * "And I'll also console.log it here, so that we can see if everything
     * looks good while it's developing this."
     *
     * INSTRUCTOR QUOTE:
     * "And you now see that here, that is the token expiration. If I reload
     * this page, this is already a smaller amount."
     *
     * This helps verify the timer is working correctly during development.
     * You can remove this in production if desired.
     */
    console.log(tokenDuration);

    /**
     * SET LOGOUT TIMER WITH REMAINING DURATION (Updated Lesson 400)
     *
     * INSTRUCTOR QUOTE:
     * "But I'll then replace this timeout time here, with that token duration.
     * That's now the updated useEffect code."
     *
     * BEFORE (Lesson 399): Always 1 * 60 * 60 * 1000 (1 hour fixed)
     * AFTER (Lesson 400): Uses tokenDuration (actual remaining time)
     *
     * HOW THE TIMER NOW WORKS:
     * 1. User logs in → expiration stored as 1 hour from now
     * 2. User refreshes after 10 min → tokenDuration = ~50 min remaining
     * 3. setTimeout uses 50 min, NOT 1 hour
     * 4. Timer fires at correct expiration time
     * 5. User is logged out when token ACTUALLY expires
     *
     * INSTRUCTOR QUOTE:
     * "Now as I navigate around it's not being locked, because the root layout
     * isn't re-rendered, and the effect isn't running again. But eventually
     * this is ticking down, and will lead to us being locked out after some
     * time."
     */
    setTimeout(() => {
      submit(null, { action: '/logout', method: 'post' });
    }, tokenDuration);

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
