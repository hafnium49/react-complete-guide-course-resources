/**
 * ============================================================================
 * AUTHENTICATION FORM COMPONENT (Updated in Lesson 390)
 * ============================================================================
 *
 * This component provides the UI for user login and signup.
 * It toggles between login and signup modes with a single form.
 *
 * ============================================================================
 * USER CREDENTIALS (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "It all starts with sending a request with user credentials. So with an
 * email and a password, for example, to that backend server."
 *
 * This form collects:
 * - Email (user identifier)
 * - Password (secret credential)
 *
 * ============================================================================
 * LOGIN VS SIGNUP MODE
 * ============================================================================
 *
 * The form handles BOTH login and signup with the same fields:
 *
 * LOGIN MODE (isLogin = true):
 * - Sends credentials to POST /login
 * - Backend finds user and validates password
 * - Returns JWT token if valid
 *
 * SIGNUP MODE (isLogin = false):
 * - Sends credentials to POST /signup
 * - Backend creates new user (hashes password)
 * - Returns JWT token (auto-login after signup)
 *
 * ============================================================================
 * WHAT HAPPENS AFTER FORM SUBMISSION (Lesson 388)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "If the credentials are valid, if we did provide a valid email password
 * combination, then the server will send us back a response that basically
 * gives us permission to access certain protected resources."
 *
 * The response contains a JWT token that we'll:
 * 1. Store in the browser (localStorage)
 * 2. Attach to future requests (Authorization header)
 * 3. Use to update UI (show logout, hide login link)
 *
 * ============================================================================
 * USING URL QUERY PARAMETERS FOR MODE (Lesson 390)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Wouldn't it be nice if we could switch between the two modes, log in and
 * sign up, with help of the URL? So that we could, for example, use some
 * query parameters to indicate whether we are in sign up or log in mode."
 *
 * INSTRUCTOR QUOTE:
 * "With query parameters you could share the current state of a page with
 * other people or bookmark it because that state would then be encoded in
 * the URL."
 *
 * WHY USE URL PARAMETERS INSTEAD OF STATE?
 * - Shareable URLs: /auth?mode=signup can be bookmarked or shared
 * - Browser history: Back/forward buttons work naturally
 * - Deep linking: External links can go directly to signup mode
 * - No state management needed for this toggle
 *
 * ============================================================================
 * useSearchParams HOOK (Lesson 390)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We can use a special hook provided by React Router to read currently
 * active query parameters. The hook is called useSearchParams."
 *
 * useSearchParams returns an array with:
 * [0] - searchParams: Object with methods like get('key') to read params
 * [1] - setSearchParams: Function to update params (we don't use this)
 *
 * Example URL: /auth?mode=login
 * - searchParams.get('mode') returns 'login'
 *
 * ============================================================================
 */

/**
 * IMPORT CHANGES (Lesson 390):
 * - REMOVED: useState (no longer needed - mode comes from URL)
 * - ADDED: Link (for mode switching navigation)
 * - ADDED: useSearchParams (to read query parameters)
 *
 * INSTRUCTOR QUOTE:
 * "I will get rid of this switch off handler function and the useState call
 * here, and we can get rid of the useState import."
 */
import { Form, Link, useSearchParams } from 'react-router-dom';

import classes from './AuthForm.module.css';

/**
 * AuthForm Component (Updated in Lesson 390)
 *
 * Dual-purpose form that handles both login and signup.
 * Uses React Router's <Form> component for declarative form handling.
 *
 * LESSON 390 CHANGES:
 * - Removed useState for mode switching
 * - Now uses useSearchParams to read mode from URL
 * - Mode toggle is now a Link instead of a button
 *
 * The form's action function (to be implemented) will:
 * 1. Read form data (email, password)
 * 2. Determine if login or signup based on URL query parameter
 * 3. Send request to appropriate backend endpoint
 * 4. Handle the token response
 */
function AuthForm() {
  /**
   * ============================================================================
   * READING QUERY PARAMETERS WITH useSearchParams (Lesson 390)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "I wanna use that useSearchParams hook from React Router, and it gives me
   * an array with two elements. The first element, search params will be an
   * object that gives me access to the currently set query parameters."
   *
   * We only destructure the first element (searchParams) because we don't
   * need to programmatically set params - we use Link for navigation instead.
   */
  const [searchParams] = useSearchParams();

  /**
   * ============================================================================
   * DETERMINING LOGIN VS SIGNUP MODE (Lesson 390)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "I can use the searchParams object here and call the get method on it
   * to get access to a specific query parameter with a specific key, for
   * example, mode, and I'll check if this is equal to login."
   *
   * URL Examples:
   * - /auth?mode=login  → isLogin = true  (show login form)
   * - /auth?mode=signup → isLogin = false (show signup form)
   * - /auth             → isLogin = false (no mode param, defaults to signup)
   *
   * NOTE: If mode param is missing or anything other than 'login',
   * isLogin will be false (signup mode). This is intentional - new users
   * are more likely to need signup than existing users to login.
   */
  const isLogin = searchParams.get('mode') === 'login';

  return (
    <>
      {/*
        React Router's <Form> component with method="post"
        This will trigger the route's action function when submitted
        (action function to be implemented in later lessons)
      */}
      <Form method="post" className={classes.form}>
        {/* Dynamic heading based on current mode (from URL) */}
        <h1>{isLogin ? 'Log in' : 'Create a new user'}</h1>

        {/* Email input - used for both login and signup */}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>

        {/* Password input - used for both login and signup */}
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>

        <div className={classes.actions}>
          {/*
           * ================================================================
           * MODE TOGGLE LINK (Lesson 390)
           * ================================================================
           *
           * INSTRUCTOR QUOTE:
           * "I want to replace my button down there which I use for toggling
           * with a link, because we're gonna use a link to switch between modes."
           *
           * WHY LINK INSTEAD OF BUTTON?
           * - Links change the URL, which triggers re-render with new params
           * - Browser history works correctly (back/forward)
           * - No need for onClick handler or state management
           * - URL becomes the "source of truth" for the mode
           *
           * INSTRUCTOR QUOTE:
           * "Of course that link should point at the current page still, but with
           * a different query parameter. So if we are in login mode, we should
           * switch to sign up mode and vice versa."
           *
           * DYNAMIC TO PROP:
           * - If isLogin (currently on login), link to ?mode=signup
           * - If !isLogin (currently on signup), link to ?mode=login
           *
           * NOTE: Using just "?mode=..." is a relative URL that keeps the
           * current path (/auth) and only changes the query string.
           */}
          <Link to={`?mode=${isLogin ? 'signup' : 'login'}`}>
            {isLogin ? 'Create new user' : 'Login'}
          </Link>

          {/* Submit button - triggers form action */}
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
