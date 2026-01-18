/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Updated in Lesson 389)
 * ============================================================================
 *
 * This component provides the main navigation header for the application.
 * It uses NavLink for route-aware navigation with active state styling.
 *
 * ============================================================================
 * ADDING AUTHENTICATION LINK (Lesson 389)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Of course, it would also be nice to have an entry here in the main
 * navigation, and therefore I'll go to my MainNavigation component here
 * and in there I'll simply copy that newsletter list item here and add
 * a new nav link to /auth which also should get this Active class if it
 * is active."
 *
 * INSTRUCTOR QUOTE:
 * "And with that, of course we do have this new entry here and we can go
 * to this page through our navigation. That's of course, nothing new but
 * that is how we get started with adding authentication."
 *
 * ============================================================================
 * FUTURE ENHANCEMENTS (This Section)
 * ============================================================================
 *
 * Later in this section, we'll update this navigation to:
 * - Show "Logout" button when user IS authenticated
 * - Hide "Authentication" link when user IS authenticated
 * - Conditionally show/hide certain links based on auth state
 *
 * INSTRUCTOR QUOTE (Lesson 388):
 * "We might want to update the UI too, for example, show a logout button
 * if we are logged in."
 *
 * ============================================================================
 */

import { NavLink } from 'react-router-dom';

import classes from './MainNavigation.module.css';
import NewsletterSignup from './NewsletterSignup';

function MainNavigation() {
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
           * AUTHENTICATION LINK (Lesson 389)
           * ================================================================
           *
           * This link takes users to the /auth page where they can:
           * - Log in with existing credentials
           * - Sign up for a new account
           *
           * INSTRUCTOR QUOTE:
           * "Give this a caption of 'Authentication'. And with that, of course
           * we do have this new entry here and we can go to this page through
           * our navigation."
           *
           * TODO: Later we'll conditionally show/hide this based on auth state
           * - If logged in: Hide this link, show "Logout" button instead
           * - If not logged in: Show this link
           */}
          <li>
            <NavLink
              to="/auth"
              className={({ isActive }) =>
                isActive ? classes.active : undefined
              }
            >
              Authentication
            </NavLink>
          </li>
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
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
