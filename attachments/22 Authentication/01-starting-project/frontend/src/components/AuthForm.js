/**
 * ============================================================================
 * AUTHENTICATION FORM COMPONENT (Lesson 388)
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
 */

import { useState } from 'react';
import { Form } from 'react-router-dom';

import classes from './AuthForm.module.css';

/**
 * AuthForm Component
 *
 * Dual-purpose form that handles both login and signup.
 * Uses React Router's <Form> component for declarative form handling.
 *
 * The form's action function (to be implemented) will:
 * 1. Read form data (email, password)
 * 2. Determine if login or signup based on URL or form data
 * 3. Send request to appropriate backend endpoint
 * 4. Handle the token response
 */
function AuthForm() {
  // State to toggle between login and signup modes
  // true = login mode, false = signup mode
  const [isLogin, setIsLogin] = useState(true);

  /**
   * Toggles between login and signup mode.
   * Uses functional update to safely toggle based on previous state.
   */
  function switchAuthHandler() {
    setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  }

  return (
    <>
      {/*
        React Router's <Form> component with method="post"
        This will trigger the route's action function when submitted
        (action function to be implemented in later lessons)
      */}
      <Form method="post" className={classes.form}>
        {/* Dynamic heading based on current mode */}
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
            Mode toggle button (type="button" prevents form submission)
            Allows user to switch between login and signup
          */}
          <button onClick={switchAuthHandler} type="button">
            {isLogin ? 'Create new user' : 'Login'}
          </button>

          {/* Submit button - triggers form action */}
          <button>Save</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
