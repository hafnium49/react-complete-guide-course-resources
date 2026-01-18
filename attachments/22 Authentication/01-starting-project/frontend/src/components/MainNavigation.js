/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Updated in Lesson 396)
 * ============================================================================
 *
 * This component provides the main navigation header for the application.
 * It uses NavLink for route-aware navigation with active state styling.
 *
 * ============================================================================
 * CONDITIONAL RENDERING BASED ON AUTH STATE (Lesson 396)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So now to update the UI based on the existence of the token, I wanna make
 * the token easily available in my entire application on all my routes
 * basically, and I also wanna make sure that the information, whether the
 * token exists or not, is automatically updated so that if the token would
 * be removed because we log out, the UI automatically updates."
 *
 * WHY NOT JUST CALL getAuthToken DIRECTLY?
 *
 * INSTRUCTOR QUOTE:
 * "I don't just wanna call getAuthToken, my helper function here in main
 * navigation, for example to get the token because that function is only
 * called when this component is reevaluated, but it will not lead to the
 * component being reevaluated if the token is deleted in the future."
 *
 * THE SOLUTION: useRouteLoaderData
 *
 * INSTRUCTOR QUOTE:
 * "And now in MainNavigation.js we can use this useRouteLoaderData hook about
 * which we learned in the routing section already to get our token here by
 * targeting the root route."
 *
 * WHAT WE CONDITIONALLY SHOW/HIDE:
 * - Authentication link: Show ONLY when NOT logged in (!token)
 * - Logout button: Show ONLY when logged in (token)
 *
 * ============================================================================
 */

/**
 * IMPORT CHANGES:
 * - Lesson 395: ADDED Form (for logout button submission)
 * - Lesson 396: ADDED useRouteLoaderData (for reactive token access)
 *
 * INSTRUCTOR QUOTE (Lesson 396):
 * "And now in MainNavigation.js we can use this useRouteLoaderData hook."
 */
import { Form, NavLink, useRouteLoaderData } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
  /**
   * ============================================================================
   * GETTING TOKEN FROM ROOT ROUTE LOADER (Lesson 396)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And now in MainNavigation.js we can use this useRouteLoaderData hook about
   * which we learned in the routing section already to get our token here by
   * targeting the root route."
   *
   * INSTRUCTOR QUOTE:
   * "And we know that what will get here is the token because that is what the
   * that root routes loader does return. The tokenLoader here does return the
   * token."
   *
   * HOW IT WORKS:
   * - useRouteLoaderData('root') gets data from the root route's loader
   * - The root route's loader (tokenLoader) returns getAuthToken()
   * - So 'token' is either: string (logged in) or null (not logged in)
   *
   * INSTRUCTOR QUOTE:
   * "So therefore, in MainNavigation, we now get hold of that token and we now
   * know that if that token exists we're logged in, and if it does not exist,
   * if this is undefined, we're not logged in."
   */
  const token = useRouteLoaderData('root');

  return (
    <header className={classes.header}>
      <nav>
        <ul className={classes.list}>
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
              end
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/events"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Events
            </NavLink>
          </li>
          {/*
           * ================================================================
           * AUTHENTICATION LINK - CONDITIONAL (Updated in Lesson 396)
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "Therefore we can conditionally show that authentication link here
           * by checking if token exists and only rendering this list item if
           * it does exist. Though that would show it if we are logged in and
           * we want the opposite, hence I'll add an exclamation mark here."
           *
           * INSTRUCTOR QUOTE:
           * "Now that authentication link is only shown if we're not logged in,
           * if we don't have a token."
           *
           * LOGIC: !token means "show when NOT logged in"
           * - token exists (truthy) → !token = false → DON'T show
           * - token is null (falsy) → !token = true → DO show
           */}
          {!token && (
            <li>
              <NavLink
                to="/auth?mode=login"
                className={({ isActive }) =>
                  isActive ? classes.active : undefined
                }
              >
                Authentication
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              to="/newsletter"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Newsletter
            </NavLink>
          </li>
          {/*
           * ================================================================
           * LOGOUT BUTTON - CONDITIONAL (Updated in Lesson 396)
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "On the other hand, that logout button should only be shown if we
           * are logged in. So here I'll have the opposite logic. I'll check
           * if we have a token, and then I'll render this list item."
           *
           * LOGIC: token means "show when logged in"
           * - token exists (truthy) → DO show
           * - token is null (falsy) → DON'T show
           *
           * HOW IT WORKS:
           * 1. Button is wrapped in <Form> component
           * 2. Form has action="/logout" pointing to our action-only route
           * 3. method="post" triggers the route's action function
           * 4. Action removes token from localStorage and redirects
           * 5. After redirect, tokenLoader re-runs and returns null
           * 6. This component re-renders, token is now null
           * 7. Logout button disappears, Authentication link appears
           */}
          {token && (
            <li>
              <Form action="/logout" method="post">
                <button>Logout</button>
              </Form>
            </li>
          )}
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
