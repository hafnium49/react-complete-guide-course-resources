/**
 * ============================================================================
 * ERROR PAGE COMPONENT (Lesson 369 - Error Handling with Loaders)
 * ============================================================================
 *
 * PURPOSE (Lesson 369):
 * =====================
 * This page is displayed when an error occurs anywhere in our route-related code,
 * including loaders. It serves as a fallback error page for the entire application.
 *
 * INSTRUCTOR QUOTE:
 * "Therefore what we can do is we can add an error page again here with pages
 * and create our error page component in there and export this. And then here
 * we can of course output a message like 'an error occurred' for a start."
 *
 * ============================================================================
 * WHY errorElement EXISTS (Lesson 369)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And you might remember we covered error elements earlier in this section
 * when we added an error element to the Root Route to have a fallback page
 * that would be displayed in case of 404 errors. So if we navigated to paths
 * that aren't supported."
 *
 * TWO USE CASES FOR errorElement (Lesson 369):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "Well, turns out that error element is not just there to show a fallback
 * page in case of invalid route paths. That is one use case but not the only
 * one. Instead, the error element will be shown to the screen whenever an
 * error is generated in any route related code, including loaders."
 *
 * | Use Case                    | When It's Triggered                     |
 * |-----------------------------|-----------------------------------------|
 * | 404 Not Found               | User navigates to invalid/unsupported path |
 * | Loader Error                | Loader throws an error (e.g., fetch fails) |
 * | Action Error (future)       | Action throws an error during form submit |
 * | Component Error             | Error thrown during render of route element |
 *
 * ============================================================================
 * ERROR BUBBLING (Lesson 369)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "With that, this page, this error page, will be displayed whenever we
 * basically have any kind of error anywhere in our routes because even
 * though I'm throwing an error here in the loader of the events page. So
 * in this route here, which is a deeply nested route, errors will bubble up."
 *
 * HOW ERROR BUBBLING WORKS:
 * =========================
 * 1. Error is thrown in a deeply nested route (e.g., /events loader)
 * 2. React Router looks for errorElement on that route
 * 3. If not found, it bubbles up to parent route
 * 4. Continues until it finds an errorElement or reaches root
 * 5. Root errorElement catches all unhandled errors
 *
 * Route hierarchy example:
 * ========================
 * / (Root - HAS errorElement)        ← Catches all bubbled errors
 *   └── /events (EventsRootLayout)
 *         └── /events (index - EventsPage)  ← Loader throws error here
 *
 * INSTRUCTOR QUOTE:
 * "We could add error element to this route as well. And in that case, this
 * error element would be rendered if this loader threw an error. But we can
 * also just have this Root level error element and the error would bubble up
 * until it reaches that route."
 *
 * ============================================================================
 * TESTING THE ERROR PAGE (Lesson 369)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "So with that, if we save this, you see that we get 'an error occurred'
 * once we visit slash events and we get the same page if we try to visit
 * an invalid route, by the way. Of course the other routes still work but
 * trying to visit events gives us this error."
 *
 * To test this page:
 * 1. Visit /events with a broken backend URL → Shows error page
 * 2. Visit /some-invalid-path → Shows error page (404)
 * 3. Visit / or /events/new → Works normally (no error)
 *
 * ============================================================================
 */
import MainNavigation from '../components/MainNavigation';

/**
 * ERROR PAGE COMPONENT (Lesson 369):
 * ==================================
 * A simple error page that displays when something goes wrong.
 *
 * INSTRUCTOR QUOTE:
 * "And then here we can of course output a message like 'an error occurred'
 * for a start."
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
 * NOTE: We include MainNavigation here because when an error occurs,
 * the RootLayout is NOT rendered (errorElement replaces the entire route).
 * So we need to add navigation manually if we want it on the error page.
 */
function ErrorPage() {
  /**
   * BASIC ERROR MESSAGE (Lesson 369):
   * =================================
   * For now, we display a simple message.
   * In later lessons, we may enhance this to show more details about the error
   * using the useRouteError hook.
   */
  return (
    <>
      {/**
       * Include navigation so users can still navigate away from the error page.
       * Without this, users would be stuck on the error page.
       */}
      <MainNavigation />
      <main>
        {/**
         * ERROR MESSAGE (Lesson 369):
         * ===========================
         * INSTRUCTOR QUOTE:
         * "And then here we can of course output a message like 'an error
         * occurred' for a start."
         *
         * This simple message is shown for:
         * - Loader errors (e.g., failed fetch)
         * - 404 errors (invalid routes)
         * - Any other route-related errors
         */}
        <h1>An error occurred!</h1>
        <p>Could not find this page.</p>
      </main>
    </>
  );
}

export default ErrorPage;

/**
 * ============================================================================
 * FUTURE ENHANCEMENTS (Preview)
 * ============================================================================
 *
 * In upcoming lessons, we may enhance this error page with:
 *
 * 1. useRouteError hook - To access the actual error object:
 *    const error = useRouteError();
 *    console.log(error.message);
 *
 * 2. isRouteErrorResponse - To check if it's a Response error:
 *    if (isRouteErrorResponse(error)) {
 *      // Handle HTTP error responses
 *    }
 *
 * 3. Dynamic messages - Show different messages based on error type:
 *    - 404: "Page not found"
 *    - 500: "Server error"
 *    - Custom loader errors: Show the error message
 *
 * ============================================================================
 */
