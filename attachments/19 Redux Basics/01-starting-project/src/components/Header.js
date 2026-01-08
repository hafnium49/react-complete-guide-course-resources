/**
 * ============================================================================
 * HEADER COMPONENT (Lesson 324)
 * ============================================================================
 *
 * CONDITIONAL NAVIGATION BASED ON AUTH STATE (Lesson 324):
 * ========================================================
 * INSTRUCTOR QUOTE:
 * "These items and the logout button should only be displayed if we are logged
 * in in Redux."
 *
 * INSTRUCTOR QUOTE:
 * "Let's also go to the Header.js file... and here I want to use useSelector
 * and useDispatch. useSelector to find out whether we are authenticated and
 * useDispatch to dispatch actions."
 *
 * USING useSelector IN HEADER (Lesson 324):
 * =========================================
 * INSTRUCTOR QUOTE:
 * "So here in Header, I'll again add a constant isAuth and use useSelector
 * to get access to state and then to state.auth.isAuthenticated."
 *
 * CONDITIONAL RENDERING OF NAV (Lesson 324):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "And then here the navigation part should only be rendered if isAuth is true,
 * so if we are authenticated."
 *
 * Pattern: {isAuth && <nav>...</nav>}
 * - If isAuth is true, render the nav
 * - If isAuth is false, render nothing (short-circuit evaluation)
 *
 * LOGOUT HANDLER (Lesson 324):
 * ============================
 * INSTRUCTOR QUOTE:
 * "And then we also need our logoutHandler here where we dispatch to log out.
 * So we dispatch authActions.logout."
 *
 * INSTRUCTOR QUOTE:
 * "And therefore of course here we also need to import authActions from our
 * store index.js file."
 *
 * The logout button uses onClick to trigger the logoutHandler.
 */
import { useSelector, useDispatch } from 'react-redux';

/**
 * ============================================================================
 * IMPORTING authActions (Lessons 324 & 325)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 324):
 * "And therefore of course here we also need to import authActions from our
 * store index.js file."
 *
 * authActions contains the auto-generated action creators from authSlice:
 * - authActions.login() - sets isAuthenticated to true
 * - authActions.logout() - sets isAuthenticated to false
 *
 * UPDATED IMPORT PATH (Lesson 325):
 * =================================
 * INSTRUCTOR QUOTE:
 * "In header, we need to import auth actions from the auth file as well."
 *
 * OLD IMPORT (before Lesson 325):
 *   import { authActions } from '../store/index';
 *
 * NEW IMPORT (after Lesson 325):
 *   import { authActions } from '../store/auth';
 *
 * WHY IMPORT FROM SLICE FILES?
 * ============================
 * - Each slice file is responsible for its own state and actions
 * - Better organization: auth-related code in auth.js
 * - Clearer dependencies: you can see exactly which slice a component uses
 * - Smaller bundle potential: tree shaking can work more effectively
 */
import { authActions } from '../store/auth';

import classes from './Header.module.css';

const Header = () => {
  /**
   * DISPATCHING ACTIONS FROM HEADER (Lesson 324):
   * =============================================
   * useDispatch returns the dispatch function which we use to send
   * actions to the Redux store.
   */
  const dispatch = useDispatch();

  /**
   * READING AUTH STATE (Lesson 324):
   * ================================
   * INSTRUCTOR QUOTE:
   * "So here in Header, I'll again add a constant isAuth and use useSelector
   * to get access to state and then to state.auth.isAuthenticated."
   *
   * This determines whether to show the navigation items or not.
   */
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  /**
   * LOGOUT HANDLER (Lesson 324):
   * ============================
   * INSTRUCTOR QUOTE:
   * "And then we also need our logoutHandler here where we dispatch to log out.
   * So we dispatch authActions.logout."
   *
   * When the user clicks the Logout button:
   * 1. logoutHandler is called
   * 2. dispatch(authActions.logout()) sends the logout action
   * 3. authSlice reducer sets isAuthenticated to false
   * 4. Components re-render based on new state:
   *    - Header hides navigation
   *    - App shows Auth instead of UserProfile
   */
  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  return (
    <header className={classes.header}>
      <h1>Redux Auth</h1>
      {/**
       * CONDITIONAL RENDERING OF NAVIGATION (Lesson 324):
       * ==================================================
       * INSTRUCTOR QUOTE:
       * "And then here the navigation part should only be rendered if isAuth
       * is true, so if we are authenticated."
       *
       * Using the && operator for conditional rendering:
       * - If isAuth is true (truthy), the expression evaluates to <nav>...</nav>
       * - If isAuth is false (falsy), the expression evaluates to false (renders nothing)
       *
       * This is called "short-circuit evaluation":
       * - For &&, if the first operand is falsy, JavaScript doesn't evaluate the second
       * - If the first operand is truthy, it returns the second operand
       */}
      {isAuth && (
        <nav>
          <ul>
            <li>
              <a href='/'>My Products</a>
            </li>
            <li>
              <a href='/'>My Sales</a>
            </li>
            <li>
              {/**
               * LOGOUT BUTTON (Lesson 324):
               * ===========================
               * When clicked, calls logoutHandler which dispatches
               * authActions.logout() to set isAuthenticated to false.
               */}
              <button onClick={logoutHandler}>Logout</button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
