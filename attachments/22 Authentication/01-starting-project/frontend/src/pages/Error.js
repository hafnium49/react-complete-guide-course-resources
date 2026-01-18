/**
 * ============================================================================
 * ERROR PAGE COMPONENT (Updated in Lesson 393)
 * ============================================================================
 *
 * This component displays error messages when something goes wrong in the app.
 * It's used as the errorElement in our router configuration.
 *
 * ============================================================================
 * LESSON 393 - LOGIN WORKS & ERROR PAGE FIX
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now when it comes to logging in, that actually all already works. Because
 * the action that we created here for this authentication page does send a
 * request based on the mode we selected."
 *
 * KEY POINTS FROM THIS LESSON:
 *
 * 1. LOGIN ALREADY WORKS:
 *    - The action function in Authentication.js handles both signup AND login
 *    - It sends requests to /signup or /login based on the 'mode' query param
 *    - Valid credentials redirect to home page
 *    - Invalid credentials show error messages
 *
 * 2. PROTECTED ROUTES ISSUE:
 *    INSTRUCTOR QUOTE:
 *    "At the moment, you'll notice that if I, for example, try to delete an
 *    event here, the app crashes here due to an error. And it crashes here
 *    because we're not authorized to delete an event yet, because we haven't
 *    added that token to that outgoing request."
 *
 *    - Deleting/editing events fails without the auth token
 *    - We need to store and attach the token to protected requests (next lessons)
 *
 * 3. ERROR PAGE FIX:
 *    INSTRUCTOR QUOTE:
 *    "We do have an error page here in theory, but that's not showing up,
 *    because on my error page, I am including that main navigation, which
 *    uses a feature that can't be used there like that. If I remove that,
 *    we do see that error page again."
 *
 *    WHY MAINNAVIGATION WAS REMOVED:
 *    - MainNavigation uses React Router hooks (like NavLink with isActive)
 *    - When an error occurs, the router context may not be fully available
 *    - This causes the MainNavigation component to fail
 *    - Removing it allows the error page to render properly
 *
 * ============================================================================
 * NEXT STEPS (Upcoming Lessons)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Therefore now as a next step, we can finally focus on that token which we're
 * getting back from the backend, and which we must attach to requests to
 * protected resources."
 *
 * What's coming:
 * - Store the JWT token (localStorage)
 * - Attach token to protected requests (Authorization header)
 * - Update UI based on auth state (show/hide buttons)
 *
 * ============================================================================
 */

import { useRouteError } from 'react-router-dom';

/**
 * NOTE: MainNavigation was REMOVED in Lesson 393
 *
 * Previously: import MainNavigation from '../components/MainNavigation';
 *
 * INSTRUCTOR QUOTE:
 * "On my error page, I am including that main navigation, which uses a feature
 * that can't be used there like that. If I remove that, we do see that error
 * page again."
 *
 * The MainNavigation component uses React Router features (NavLink with
 * isActive callback) that may not work properly in an error boundary context.
 * When errors occur during route handling, the router state may be incomplete,
 * causing MainNavigation to crash and preventing the error page from displaying.
 */

import PageContent from '../components/PageContent';

/**
 * ErrorPage Component
 *
 * Renders appropriate error messages based on the error status code.
 * Uses useRouteError() to access error information from React Router.
 *
 * COMMON ERROR SCENARIOS:
 * - 404: Page/resource not found
 * - 500: Server error or thrown error responses
 * - 401: Not authenticated (will see this when accessing protected routes)
 * - 422: Validation errors (though these are usually returned, not thrown)
 */
function ErrorPage() {
  /**
   * useRouteError() - React Router hook to access thrown errors
   *
   * Returns the error object that was thrown or the Response object
   * if json() was used to throw an error response.
   *
   * Error object shape (when using json() helper):
   * {
   *   status: 500,          // HTTP status code
   *   statusText: "...",    // Status text
   *   data: { message: "..." }  // The data passed to json()
   * }
   */
  const error = useRouteError();

  let title = 'An error occurred!';
  let message = 'Something went wrong!';

  /**
   * Handle 500 errors (server errors, thrown errors from actions/loaders)
   *
   * These occur when:
   * - An action throws json({ message: '...' }, { status: 500 })
   * - A loader fails to fetch data
   * - Unexpected server errors
   */
  if (error.status === 500) {
    message = error.data.message;
  }

  /**
   * Handle 404 errors (not found)
   *
   * These occur when:
   * - User navigates to a route that doesn't exist
   * - A resource (event, user) is not found
   */
  if (error.status === 404) {
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  return (
    <>
      {/*
       * MainNavigation was REMOVED here (Lesson 393)
       *
       * Previously: <MainNavigation />
       *
       * This allows the error page to render properly even when
       * router context is incomplete or unavailable.
       */}
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}

export default ErrorPage;
