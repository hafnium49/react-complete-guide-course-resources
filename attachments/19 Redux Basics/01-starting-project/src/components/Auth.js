/**
 * ============================================================================
 * AUTH COMPONENT (Lesson 324)
 * ============================================================================
 *
 * LOGIN FORM WITH REDUX DISPATCH (Lesson 324):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "Well, here I would like to make this login form work. Not really, we won't
 * really add authentication here... but I wanna make sure that when we click
 * Login, we do switch into some login mode."
 *
 * This is a simplified authentication example:
 * - No real email/password validation
 * - No actual backend authentication
 * - Just demonstrates how to dispatch actions from a form submission
 *
 * USING useDispatch IN AUTH (Lesson 324):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Here in the Auth component... we can use the useDispatch hook to dispatch
 * actions."
 *
 * LOGIN HANDLER (Lesson 324):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "We need a loginHandler and in there we can dispatch authActions.login."
 *
 * INSTRUCTOR QUOTE:
 * "And then we can bind this loginHandler to the form. On the form we can add
 * the onSubmit prop and point at the loginHandler."
 *
 * PREVENTING DEFAULT FORM SUBMISSION (Lesson 324):
 * ================================================
 * INSTRUCTOR QUOTE:
 * "And in that loginHandler function, we of course should call event.preventDefault
 * to prevent the browser default of submitting the form and reloading the page."
 *
 * WHY event.preventDefault() IS IMPORTANT:
 * ========================================
 * By default, when a form is submitted:
 * 1. The browser sends an HTTP request to the server
 * 2. The page reloads (or navigates to the form's action URL)
 *
 * In a React SPA (Single Page Application):
 * - We don't want the page to reload
 * - We handle everything client-side with JavaScript
 * - We use preventDefault() to stop the default browser behavior
 * - Then we handle the submission ourselves (dispatch Redux action)
 */
import { useDispatch } from 'react-redux';

/**
 * ============================================================================
 * IMPORTING authActions (Lessons 324 & 325)
 * ============================================================================
 *
 * authActions contains the auto-generated action creators from authSlice:
 * - authActions.login() - sets isAuthenticated to true
 * - authActions.logout() - sets isAuthenticated to false
 *
 * UPDATED IMPORT PATH (Lesson 325):
 * =================================
 * INSTRUCTOR QUOTE:
 * "In auth JS, we need to import auth the actions from the auth file in the
 * store folder."
 *
 * OLD IMPORT (before Lesson 325):
 *   import { authActions } from '../store/index';
 *
 * NEW IMPORT (after Lesson 325):
 *   import { authActions } from '../store/auth';
 *
 * Each slice file now exports its own actions:
 * - counter.js exports counterActions
 * - auth.js exports authActions
 */
import { authActions } from '../store/auth';

import classes from './Auth.module.css';

const Auth = () => {
  /**
   * GETTING THE DISPATCH FUNCTION (Lesson 324):
   * ===========================================
   * useDispatch returns the dispatch function from the Redux store.
   * We use this to send actions to update the state.
   */
  const dispatch = useDispatch();

  /**
   * LOGIN HANDLER (Lesson 324):
   * ===========================
   * INSTRUCTOR QUOTE:
   * "We need a loginHandler and in there we can dispatch authActions.login."
   *
   * INSTRUCTOR QUOTE:
   * "And in that loginHandler function, we of course should call event.preventDefault
   * to prevent the browser default of submitting the form and reloading the page."
   *
   * Flow when user clicks Login:
   * 1. Form submission triggers onSubmit
   * 2. loginHandler receives the event object
   * 3. event.preventDefault() stops page reload
   * 4. dispatch(authActions.login()) sends action to Redux
   * 5. authSlice reducer sets isAuthenticated to true
   * 6. Components re-render based on new state:
   *    - App shows UserProfile instead of Auth
   *    - Header shows navigation items
   *
   * NOTE: In a real app, you would:
   * - Validate the email and password inputs
   * - Send credentials to a backend server
   * - Only dispatch login on successful authentication
   * - Store auth tokens securely
   */
  const loginHandler = (event) => {
    event.preventDefault();
    dispatch(authActions.login());
  };

  return (
    <main className={classes.auth}>
      <section>
        {/**
         * FORM WITH onSubmit HANDLER (Lesson 324):
         * ========================================
         * INSTRUCTOR QUOTE:
         * "And then we can bind this loginHandler to the form. On the form we can
         * add the onSubmit prop and point at the loginHandler."
         *
         * onSubmit is triggered when:
         * - User clicks a submit button inside the form
         * - User presses Enter in a form input
         *
         * Using onSubmit on the form (rather than onClick on the button) is
         * best practice because it handles both click and keyboard submission.
         */}
        <form onSubmit={loginHandler}>
          <div className={classes.control}>
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
          </div>
          <div className={classes.control}>
            <label htmlFor='password'>Password</label>
            <input type='password' id='password' />
          </div>
          {/**
           * LOGIN BUTTON (Lesson 324):
           * ==========================
           * This button is inside a <form>, so clicking it triggers
           * the form's onSubmit event (which calls loginHandler).
           *
           * The default button type inside a form is "submit",
           * which is why clicking it submits the form.
           */}
          <button>Login</button>
        </form>
      </section>
    </main>
  );
};

export default Auth;
