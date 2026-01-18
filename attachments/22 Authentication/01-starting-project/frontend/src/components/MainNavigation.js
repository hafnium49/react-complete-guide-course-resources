/**
 * ============================================================================
 * MAIN NAVIGATION COMPONENT (Updated in Lesson 395)
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
 * ============================================================================
 * UPDATED TO USE QUERY PARAMETER (Lesson 390)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We can also update our main navigation now if we want to, and for example,
 * link to that auth page with mode being set to log in."
 *
 * ============================================================================
 * LOGOUT BUTTON ADDED (Lesson 395)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Instead, we wanna add a log out route, and that means that in
 * MainNavigation.js in our navigation component we wanna add a new list
 * item to our navigation bar that in the end shows a log out button."
 *
 * WHY UPDATE THE UI BASED ON AUTH STATUS?
 *
 * INSTRUCTOR QUOTE:
 * "If we have a token, for example, we might not want to show this
 * authentication navigation item because it makes no sense to show that
 * if we are logged in already. On the other hand, it makes no sense to
 * show the edit and delete buttons or this new event button if we are
 * not logged in, because allowing users to go there if we're not logged
 * in makes also no sense."
 *
 * UPCOMING (Next Lessons):
 * - Conditionally show/hide Authentication link based on token
 * - Conditionally show/hide Logout button based on token
 * - Hide edit/delete/new buttons when not authenticated
 *
 * ============================================================================
 */

/**
 * IMPORT CHANGES (Lesson 395):
 * - ADDED: Form (for logout button submission)
 *
 * INSTRUCTOR QUOTE:
 * "I'll wrap my button here with this form that's provided by react-router-dom.
 * So I import Form here."
 */
import { Form, NavLink } from 'react-router-dom';

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
           * AUTHENTICATION LINK (Updated in Lesson 390)
           * ================================================================
           *
           * This link takes users to the /auth page where they can:
           * - Log in with existing credentials
           * - Sign up for a new account
           *
           * WHY ?mode=login?
           * - Users clicking "Authentication" likely want to log in
           * - New users can still click "Create new user" to switch to signup
           *
           * TODO (Upcoming Lessons):
           * - Conditionally show this ONLY when NOT logged in
           * - Hide when user has a valid token
           */}
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
           * LOGOUT BUTTON (Added in Lesson 395)
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "This button should then trigger an action or whatever that deletes
           * the token. And there are different ways of handling this."
           *
           * WHY USE A FORM INSTEAD OF onClick?
           *
           * INSTRUCTOR QUOTE:
           * "We could simply add an onClick listener and trigger a function that
           * reaches out to local storage and deletes the token. But here I'll
           * use the more official React Routing Embracing approach."
           *
           * INSTRUCTOR QUOTE:
           * "I'll wrap my button here with this form that's provided by
           * react-router-dom."
           *
           * HOW IT WORKS:
           * 1. Button is wrapped in <Form> component
           * 2. Form has action="/logout" pointing to our action-only route
           * 3. method="post" triggers the route's action function
           * 4. Action removes token from localStorage and redirects
           *
           * INSTRUCTOR QUOTE:
           * "And then I'll add an action of /logout and a method of post though
           * that doesn't matter here."
           *
           * NOTE: The method="post" is conventional for actions that modify
           * state (like logging out), even though GET would technically work.
           *
           * TODO (Upcoming Lessons):
           * - Conditionally show this ONLY when logged in (has token)
           * - Hide when user is not authenticated
           */}
          <li>
            <Form action="/logout" method="post">
              <button>Logout</button>
            </Form>
          </li>
        </ul>
      </nav>
      <NewsletterSignup />
    </header>
  );
}

export default MainNavigation;
