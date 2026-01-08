/**
 * ============================================================================
 * APP COMPONENT (Lesson 323 & 324)
 * ============================================================================
 *
 * ADDING MORE COMPONENTS TO THE APP (Lesson 323):
 * ===============================================
 * INSTRUCTOR QUOTE:
 * "Now, in this starting project, which I provided to you, we got a couple of
 * other components as well, not just a counter. We get a couple of other
 * components as well because there's more I wanna practice and teach you when
 * it comes to Redux."
 *
 * INSTRUCTOR QUOTE:
 * "And therefore, it's now time to use some of these other components. In the
 * App.js file, in this App component, let's now return more than just the counter."
 *
 * USING FRAGMENT FOR MULTIPLE ELEMENTS (Lesson 323):
 * ==================================================
 * INSTRUCTOR QUOTE:
 * "Let's add a fragment imported from React. This built-in Fragment component
 * so that we can have a couple of adjacent JSX elements."
 *
 * Fragment allows returning multiple adjacent elements without adding
 * an extra DOM node (like a <div> wrapper).
 *
 * COMPONENTS IN THIS APP:
 * =======================
 * - Header: Navigation bar (shows different items based on auth state)
 * - Auth: Login form (will dispatch login action)
 * - UserProfile: Shown when user is authenticated
 * - Counter: The counter we've been building (still works independently)
 *
 * WHAT WE'RE GOING TO BUILD (Lesson 323):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "Well, here I would like to make this login form work. Not really, we won't
 * really add authentication here... but I wanna make sure that when we click
 * Login, we do switch into some login mode and for example, what we see here
 * in the navigation bar changes."
 *
 * INSTRUCTOR QUOTE:
 * "These items and the logout button should only be displayed if we are logged
 * in in Redux and I also wanna swap this login field here, this login form for
 * another component, the UserProfile component which has some dummy output."
 *
 * WHY AUTH STATE IS PERFECT FOR REDUX (Lesson 323):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "So we have a brand new state to manage. And unlike the counter state, which
 * was just a basic example, the authentication state and the answer to the
 * question whether the user is logged in or not is indeed not just local state,
 * which matters to one specific component but it is application-wide state,
 * which matters to a lot of components in the application."
 *
 * INSTRUCTOR QUOTE:
 * "It matters to the Header, it matters to the Auth component, it matters to
 * the UserProfile component in the end. So therefore, this is the user
 * authenticated state is a perfect example for a state that we could manage
 * with React context or since this section is about Redux, with Redux."
 *
 * COMPONENTS AND THEIR AUTH NEEDS:
 * ================================
 * | Component    | Auth Usage                                    |
 * |--------------|-----------------------------------------------|
 * | Header       | Show/hide nav items, show logout button       |
 * | Auth         | Show login form (only when NOT authenticated) |
 * | UserProfile  | Show user info (only when authenticated)      |
 * | App          | Conditionally render Auth OR UserProfile      |
 *
 * ============================================================================
 * USING AUTH STATE IN APP COMPONENT (Lesson 324)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So now we added this authSlice. Let's now use it in our different components
 * and of course, definitely feel free to try this on your own first, tap into
 * the store and use the auth state to conditionally show the Auth component or
 * the UserProfile component in App and in the Header to conditionally show
 * these items or not show them."
 *
 * READING AUTH STATE WITH useSelector (Lesson 324):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "Here in App.js... we should also import the useSelector hook and use that
 * to tap into our Redux store and to get access to our authentication state."
 *
 * INSTRUCTOR QUOTE:
 * "And then we can add a new constant isAuth for example or isAuthenticated and
 * use useSelector here and get access to the state and then get the auth part
 * of the state, so state.auth and then the isAuthenticated value."
 *
 * Why state.auth.isAuthenticated?
 * - We're using a reducer map in configureStore:
 *   { counter: counterSlice.reducer, auth: authSlice.reducer }
 * - So auth state is accessed via state.auth
 * - The isAuthenticated property comes from initialAuthState
 *
 * CONDITIONAL RENDERING BASED ON AUTH (Lesson 324):
 * =================================================
 * INSTRUCTOR QUOTE:
 * "And now we can use isAuth down there in our JSX code where we render the
 * Auth component to render the Auth component if we're not authenticated yet
 * or render the UserProfile component if we are authenticated."
 *
 * INSTRUCTOR QUOTE:
 * "So here we could check if not isAuth, so we're not authenticated, then
 * render Auth, else render the UserProfile. And therefore, in here I want
 * to import from UserProfile, I want to import the UserProfile component."
 *
 * Pattern: {!isAuth ? <Auth /> : <UserProfile />}
 * - If NOT authenticated: show login form (Auth)
 * - If authenticated: show user profile (UserProfile)
 */
import { Fragment } from 'react';

/**
 * IMPORTING useSelector FOR AUTH STATE (Lesson 324):
 * ==================================================
 * useSelector allows us to read from the Redux store.
 * Here we use it to check if the user is authenticated.
 */
import { useSelector } from 'react-redux';

/**
 * IMPORTING ADDITIONAL COMPONENTS (Lesson 323 & 324):
 * ===================================================
 * INSTRUCTOR QUOTE:
 * "Let's also add our Header component here. And for this, we need to import
 * Header from ./components/Header. And let's also add the Auth component here.
 * And for this import Auth from ./components/Auth."
 *
 * INSTRUCTOR QUOTE (Lesson 324):
 * "And therefore, in here I want to import from UserProfile, I want to import
 * the UserProfile component."
 */
import Header from './components/Header';
import Auth from './components/Auth';
import UserProfile from './components/UserProfile';
import Counter from './components/Counter';

function App() {
  /**
   * ACCESSING AUTH STATE (Lesson 324):
   * ==================================
   * INSTRUCTOR QUOTE:
   * "And then we can add a new constant isAuth for example or isAuthenticated
   * and use useSelector here and get access to the state and then get the auth
   * part of the state, so state.auth and then the isAuthenticated value."
   *
   * STATE STRUCTURE:
   * ================
   * state = {
   *   counter: { counter: 0, showCounter: true },  // from counterSlice
   *   auth: { isAuthenticated: false }              // from authSlice
   * }
   *
   * We access state.auth.isAuthenticated to check login status.
   */
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    /**
     * USING FRAGMENT TO WRAP MULTIPLE ELEMENTS (Lesson 323):
     * ======================================================
     * Fragment (<Fragment> or shorthand <>) allows returning multiple
     * adjacent JSX elements without adding an extra wrapper div to the DOM.
     *
     * Components rendered:
     * - Header: Navigation bar at the top
     * - Auth OR UserProfile: Conditionally rendered based on auth state
     * - Counter: Our Redux counter demo (still works with the new slice structure)
     */
    <Fragment>
      <Header />
      {/**
       * CONDITIONAL RENDERING (Lesson 324):
       * ===================================
       * INSTRUCTOR QUOTE:
       * "So here we could check if not isAuth, so we're not authenticated,
       * then render Auth, else render the UserProfile."
       *
       * - !isAuth (not authenticated) -> Show Auth (login form)
       * - isAuth (authenticated) -> Show UserProfile
       *
       * This is a ternary expression used for conditional rendering:
       * condition ? valueIfTrue : valueIfFalse
       */}
      {!isAuth ? <Auth /> : <UserProfile />}
      <Counter />
    </Fragment>
  );
}

export default App;
