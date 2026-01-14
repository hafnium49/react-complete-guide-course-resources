/**
 * ============================================================================
 * ERROR PAGE COMPONENT (Lessons 369-371 - Error Handling with useRouteError)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 369: Basic error page with simple "An error occurred!" message
 * Lesson 370: Enhanced with useRouteError hook, PageContent styling, and
 *             differentiated error handling (404 vs 500 vs other errors)
 * Lesson 371: Simplified data access thanks to json() helper (no JSON.parse needed)
 *
 * ============================================================================
 * LESSON 370: IMPROVING THE ERROR PAGE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now of course this error page here isn't too beautiful and too helpful.
 * And they offer to improve it a little bit."
 *
 * IMPROVEMENTS IN THIS LESSON:
 * ============================
 * 1. Added PageContent component for better styling
 * 2. Added useRouteError hook to access error details
 * 3. Differentiate between 404 errors and other errors (500, etc.)
 * 4. Display custom error messages from thrown Response objects
 *
 * ============================================================================
 * THE useRouteError HOOK (Lesson 370)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And for that React-Router-Dom gives you another special hook which we
 * import from react-router-dom. And that's the use route error hook."
 *
 * WHAT IT RETURNS (Lesson 370):
 * =============================
 * INSTRUCTOR QUOTE:
 * "This gives us an error object if you want to call it like this. And the
 * shape of that object now depends on whether you threw a response or any
 * other kind of object or data."
 *
 * ERROR OBJECT SHAPE - DEPENDS ON WHAT WAS THROWN:
 * ================================================
 *
 * 1. If you threw a Response (recommended):
 *    INSTRUCTOR QUOTE:
 *    "If you threw a response as I'm doing it here now, this error object
 *    will include a status field which actually reflects the status of the
 *    response you threw."
 *
 *    error = {
 *      status: 500,           // The HTTP status code you set
 *      statusText: "...",     // Status text
 *      data: "...",           // The JSON string you passed to Response
 *      ...other properties
 *    }
 *
 * 2. If you threw a regular object/Error:
 *    INSTRUCTOR QUOTE:
 *    "If you threw any other kind of object, like a regular JavaScript object,
 *    then this error object would already be that thrown object. So then there
 *    would not be this special status property."
 *
 *    error = { whatever you threw }
 *
 * WHY THROW RESPONSES? (Lesson 370):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "But that's why you might wanna throw responses instead of regular objects
 * because it does allow you to include this extra status property, this extra
 * status field, which helps with building a generic error handling component."
 *
 * ============================================================================
 * ERROR STATUS CODES (Lesson 370)
 * ============================================================================
 *
 * | Status | Meaning                    | When It Occurs                    |
 * |--------|----------------------------|-----------------------------------|
 * | 404    | Not Found                  | User visits invalid/unknown path  |
 * | 500    | Server Error               | Loader throws error (e.g., fetch) |
 * | Other  | Various errors             | Other thrown errors               |
 *
 * INSTRUCTOR QUOTE:
 * "For example, we might want to differentiate between 404 errors and other
 * errors like the one we have here from our loader, where we actually have
 * an error message that we might wanna display instead of the default error
 * message I defined here."
 *
 * ============================================================================
 * ACCESSING ERROR DATA (Lessons 370-371)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now error.data gives us access to the data that's included in this error
 * response that was thrown. So, to this object here, in my case."
 *
 * JSON PARSING - BEFORE AND AFTER json() (Lessons 370-371):
 * =========================================================
 *
 * LESSON 370 (with new Response + JSON.stringify):
 * ------------------------------------------------
 * INSTRUCTOR QUOTE:
 * "This data object here, actually, first of all must be converted back to
 * an object because otherwise it's still JSON, in JSON format. So we must
 * use JSON Parse here, and then access message on the parse data."
 *
 * Old approach (manual parsing required):
 * const errorData = JSON.parse(error.data);
 * const message = errorData.message;
 *
 * LESSON 371 (with json() helper):
 * --------------------------------
 * INSTRUCTOR QUOTE:
 * "Now with this json function, you don't just have to type less code here,
 * but in the place where you use that response data you also don't have to
 * parse the json format manually. Instead, you can simplify the code to this
 * because the parsing will now be done by React router for you."
 *
 * New approach (automatic parsing):
 * const message = error.data.message;  // No JSON.parse needed!
 *
 * ============================================================================
 * ADDING MAIN NAVIGATION (Lesson 370)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Of course, we could now improve this error page even more by maybe also
 * adding our main navigation here. With that added, we now have a way of
 * going somewhere else after we triggered an error. So that might be a better
 * user experience than having this full screen error page."
 *
 * ============================================================================
 */
import { useRouteError } from 'react-router-dom';

import MainNavigation from '../components/MainNavigation';
import PageContent from '../components/PageContent';

/**
 * ERROR PAGE COMPONENT (Lessons 369-370):
 * =======================================
 * A generic error handling page that displays different messages based on
 * the type of error that occurred.
 *
 * This component is registered as the errorElement on the root route in App.jsx:
 *
 * {
 *   path: '/',
 *   element: <RootLayout />,
 *   errorElement: <ErrorPage />,  // ← This component
 *   children: [...]
 * }
 *
 * INSTRUCTOR QUOTE:
 * "And that's why we might want to throw responses in the places where things
 * go wrong and add such a generic error handling page which is rendered with
 * help of an error element added to the root route."
 */
function ErrorPage() {
  /**
   * ============================================================================
   * useRouteError HOOK (Lesson 370)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "And for that React-Router-Dom gives you another special hook which we
   * import from react-router-dom. And that's the use route error hook."
   *
   * INSTRUCTOR QUOTE:
   * "This gives us an error object if you want to call it like this."
   *
   * The error object contains information about what went wrong:
   * - If a Response was thrown: has status, statusText, data properties
   * - If an Error/object was thrown: contains the thrown value directly
   */
  const error = useRouteError();

  /**
   * ============================================================================
   * DEFAULT VALUES (Lesson 370)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "Because now an error JS in this error page, we can create our title and
   * our message and set these two default values, but override them with more
   * fitting values based on which error we have."
   *
   * These are the fallback values shown if the error doesn't match any
   * specific status code we handle.
   */
  let title = 'An error occurred!';
  let message = 'Something went wrong.';

  /**
   * ============================================================================
   * CONDITIONAL ERROR HANDLING (Lesson 370)
   * ============================================================================
   *
   * Check the error status to provide appropriate messages:
   *
   * INSTRUCTOR QUOTE:
   * "So we could, for example, have these default values here, but then we can
   * check if error dot status is maybe 500, in which case we might want to keep
   * the title. But set the message to error.data.message."
   */

  /**
   * HANDLE 500 ERRORS - Server/Backend Errors (Lesson 370):
   * =======================================================
   * INSTRUCTOR QUOTE:
   * "So we could, for example, have these default values here, but then we can
   * check if error dot status is maybe 500, in which case we might want to keep
   * the title."
   *
   * 500 errors typically occur when:
   * - A loader throws an error (e.g., fetch fails)
   * - Backend returns an error response
   * - Something goes wrong during data fetching
   */
  if (error.status === 500) {
    /**
     * ============================================================================
     * ACCESSING ERROR DATA (Lessons 370-371)
     * ============================================================================
     *
     * LESSON 370 (manual parsing - BEFORE json() helper):
     * ====================================================
     * INSTRUCTOR QUOTE:
     * "This data object here, actually, first of all must be converted back
     * to an object because otherwise it's still JSON, in JSON format. So we
     * must use JSON Parse here, and then access message on the parse data."
     *
     * Old code (with new Response + JSON.stringify):
     * message = JSON.parse(error.data).message;
     *
     * LESSON 371 (automatic parsing - WITH json() helper):
     * =====================================================
     * INSTRUCTOR QUOTE:
     * "Now with this json function, you don't just have to type less code here,
     * but in the place where you use that response data you also don't have to
     * parse the json format manually. Instead, you can simplify the code to this
     * because the parsing will now be done by React router for you."
     *
     * INSTRUCTOR QUOTE:
     * "And that of course is a great simplification and hence it is quite common
     * to use this json function for building responses with less effort."
     *
     * New code (with json() helper - parsing done automatically):
     * message = error.data.message;
     *
     * INSTRUCTOR QUOTE:
     * "And that object has a message and we can assume that most objects that
     * are included in error responses will have message properties."
     *
     * WHY THIS WORKS:
     * ===============
     * When we use json() in the loader instead of new Response(JSON.stringify(...)):
     * - json() automatically stringifies on the throwing side
     * - React Router automatically parses on the receiving side
     * - error.data is already a parsed JavaScript object, not a JSON string
     */
    message = error.data.message;
  }

  /**
   * HANDLE 404 ERRORS - Not Found (Lesson 370):
   * ===========================================
   * INSTRUCTOR QUOTE:
   * "But we could, for example, also check if the error status is maybe 404,
   * which is the default status set by React router if you enter a path that's
   * not supported."
   *
   * 404 errors occur when:
   * - User navigates to a path that doesn't exist
   * - No route matches the current URL
   * - React Router automatically throws a 404 Response
   */
  if (error.status === 404) {
    /**
     * CUSTOM 404 MESSAGE (Lesson 370):
     * ================================
     * INSTRUCTOR QUOTE:
     * "And in that case, we could set the title to not found, and the message
     * to could not find resource or page."
     */
    title = 'Not found!';
    message = 'Could not find resource or page.';
  }

  /**
   * RENDER THE ERROR PAGE (Lesson 370):
   * ===================================
   * INSTRUCTOR QUOTE:
   * "And now we can use these values down here and set the title to our title,
   * which we set conditionally and also output our message here, which is set
   * to different values based on different status codes."
   */
  return (
    <>
      {/**
       * MAIN NAVIGATION (Lesson 370):
       * =============================
       * INSTRUCTOR QUOTE:
       * "Of course, we could now improve this error page even more by maybe
       * also adding our main navigation here."
       *
       * INSTRUCTOR QUOTE:
       * "With that added, we now have a way of going somewhere else after we
       * triggered an error. So that might be a better user experience than
       * having this full screen error page."
       *
       * NOTE: We include MainNavigation here because when an error occurs,
       * the RootLayout is NOT rendered (errorElement replaces the entire route).
       * So we need to add navigation manually if we want it on the error page.
       */}
      <MainNavigation />
      {/**
       * PAGE CONTENT WITH STYLING (Lesson 370):
       * =======================================
       * INSTRUCTOR QUOTE:
       * "For that we must import page content from and then components page
       * content. And here we can set a title property and set it to an error
       * occurred."
       *
       * INSTRUCTOR QUOTE:
       * "And we can then also pass some content between the opening and closing
       * tags of page content. And for example, add a paragraph where we say
       * something went wrong."
       *
       * INSTRUCTOR QUOTE:
       * "Now this looks a bit nicer."
       */}
      <main>
        <PageContent title={title}>
          <p>{message}</p>
        </PageContent>
      </main>
    </>
  );
}

export default ErrorPage;

/**
 * ============================================================================
 * TESTING THE ERROR PAGE (Lesson 370)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that done, you see I got this error output in case of my error due to
 * me visiting events. And if I enter invalid URL instead, I get this not found
 * page. It's always the same component, but now with this generic error
 * handling code."
 *
 * TO TEST:
 * ========
 * 1. Break the backend URL in Events.jsx loader → Shows 500 error with custom message
 * 2. Visit /some-invalid-path → Shows 404 "Not found!" message
 * 3. Visit / or /events/new → Works normally (no error)
 *
 * SUMMARY (Lesson 370):
 * =====================
 * INSTRUCTOR QUOTE:
 * "And that's why we might want to throw responses in the places where things
 * go wrong and add such a generic error handling page which is rendered with
 * help of an error element added to the root route. That's one way of handling
 * errors and embracing those features that are built into React router."
 *
 * ============================================================================
 * FINAL NOTE (Lesson 370)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that though, I'll go back to events JS, and fix this path so that we
 * can fetch events successfully again."
 *
 * After testing error handling, remember to fix the backend URL in the loader!
 *
 * ============================================================================
 */
