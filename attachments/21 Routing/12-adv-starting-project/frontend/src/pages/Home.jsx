/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lessons 360, 384 - Task 1 + Section Finale)
 * ============================================================================
 *
 * EVOLUTION OF THIS FILE:
 * =======================
 * Lesson 360: Created with simple placeholder h1 element
 * Lesson 384: Finalized with PageContent component (CURRENT - Section Complete!)
 *
 * ============================================================================
 * LESSON 384: SECTION FINALE - FINALIZING THE HOMEPAGE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now that's it for this course section. To fully conclude it I'll just
 * finalize this homepage component and render my page content component here
 * which is imported from components page content."
 *
 * INSTRUCTOR QUOTE:
 * "And I'll set a title to welcome and add a paragraph where I say browse all
 * our amazing events. Something like this."
 *
 * INSTRUCTOR QUOTE:
 * "But that's just a tiny note, just a tiny change to make this homepage at
 * least a little bit nicer."
 *
 * ============================================================================
 * SECTION 21 SUMMARY - WHAT YOU LEARNED ABOUT ROUTING
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And you did learn a lot about routing."
 *
 * 1. ROUTE CONFIGURATION:
 * =======================
 * INSTRUCTOR QUOTE:
 * "You learned how you can generally configure routes and make sure that
 * different components are loaded for different paths."
 *
 * Key concepts:
 * - createBrowserRouter() for route definitions
 * - RouterProvider to render the router
 * - path and element properties for routes
 * - Dynamic route parameters (:eventId)
 *
 * 2. ERROR HANDLING:
 * ==================
 * INSTRUCTOR QUOTE:
 * "You learned how you can handle errors."
 *
 * Key concepts:
 * - errorElement for displaying error pages
 * - useRouteError hook to access error data
 * - Throwing Response objects for custom errors
 * - Response.json() for structured error data
 *
 * 3. LAYOUTS AND NESTED ROUTES:
 * =============================
 * INSTRUCTOR QUOTE:
 * "And how you can set up layouts that wrap itself around multiple routes.
 * You learned about nested routes, as you can see here."
 *
 * Key concepts:
 * - Layout components with <Outlet />
 * - Children routes array
 * - Index routes (index: true)
 * - Shared navigation across pages
 *
 * 4. DATA FETCHING AND SUBMISSION:
 * ================================
 * INSTRUCTOR QUOTE:
 * "And most importantly, you learned about data fetching and submission.
 * You learned how you can generally set up data fetching and submission
 * with loaders and actions."
 *
 * Key concepts:
 * - loader functions for data fetching
 * - action functions for form submission
 * - useLoaderData and useActionData hooks
 * - useNavigation for pending states
 * - useSubmit for programmatic form submission
 *
 * 5. ADVANCED USE CASES - useFetcher:
 * ===================================
 * INSTRUCTOR QUOTE:
 * "And you learned about advanced use cases where you could use useFetcher
 * to fetch or load data behind the scenes without navigating."
 *
 * Key concepts:
 * - fetcher.Form for non-navigation submissions
 * - fetcher.data and fetcher.state
 * - Triggering actions on other routes without navigation
 *
 * 6. DEFERRED DATA LOADING:
 * =========================
 * INSTRUCTOR QUOTE:
 * "And you learned about deferring data fetching. Which can be helpful if you
 * have some slow requests, some slow backend, and you wanna show a page without
 * waiting for the data to be there."
 *
 * INSTRUCTOR QUOTE:
 * "Or if you have multiple pieces of data and you wanna show some data before
 * all the data is there as we had it here with the single event and the list
 * of events."
 *
 * Key concepts:
 * - defer() in v6, return object with promises in v7
 * - <Await> component for deferred promises
 * - <Suspense> for loading fallbacks
 * - await keyword to control which data blocks navigation
 *
 * ============================================================================
 * WHEN TO USE DEFER (IMPORTANT!)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "You should not always use defer but instead use it when you need this
 * behavior when you need to show something before all the data is there."
 *
 * USE DEFER WHEN:
 * ===============
 * ✅ Backend responses are slow
 * ✅ Multiple data requests with different speeds
 * ✅ Critical data should load before non-critical data
 * ✅ You want to show UI immediately while data loads
 *
 * DON'T USE DEFER WHEN:
 * =====================
 * ❌ Data loads quickly anyway
 * ❌ All data is equally critical
 * ❌ Simple pages with single data requirement
 * ❌ You want data guaranteed before render
 *
 * ============================================================================
 * INSTRUCTOR'S FINAL ADVICE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "We covered tons of features in this course section. It was a long section
 * for sure but I hope it's clear, how you can generally configure routes.
 * What the idea behind routing is and how routing works."
 *
 * INSTRUCTOR QUOTE:
 * "Definitely feel free to go back to individual lectures or to go through
 * this entire section again, even though it was long but maybe at double speed.
 * So that you get all these concepts down and you fully understand how all
 * these features work."
 *
 * INSTRUCTOR QUOTE:
 * "Because once you start building real React apps, more complex React apps.
 * You will almost always need routing. And especially the data fetching and
 * submission capabilities of React router can make that data fetching and
 * submission part a breeze."
 *
 * INSTRUCTOR QUOTE:
 * "You just need to understand how it works and I hope this course section
 * helped you with that."
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * This page is loaded by the index route (home route):
 *
 * {
 *   path: '/',
 *   element: <RootLayout />,
 *   children: [
 *     { index: true, element: <HomePage /> },  // ← This page
 *     ...
 *   ]
 * }
 *
 * URL: http://localhost:3000/
 *
 * ============================================================================
 */
/**
 * LESSON 384: IMPORTING PageContent FOR FINALIZED HOMEPAGE
 * =========================================================
 * INSTRUCTOR QUOTE:
 * "To fully conclude it I'll just finalize this homepage component and render
 * my page content component here which is imported from components page content."
 *
 * PageContent provides:
 * - Consistent styling for page titles
 * - Centered content container
 * - Same styling as other pages (Newsletter, Error, etc.)
 */
import PageContent from '../components/PageContent';

/**
 * ============================================================================
 * HOME PAGE COMPONENT (Lesson 384 - Section Finale)
 * ============================================================================
 *
 * The main landing page of the application, now finalized with proper styling.
 *
 * INSTRUCTOR QUOTE:
 * "But that's just a tiny note, just a tiny change to make this homepage at
 * least a little bit nicer."
 *
 * CHANGE FROM LESSON 360:
 * =======================
 * BEFORE: return <h1>HomePage</h1>;
 * AFTER:  return <PageContent title="Welcome!"><p>...</p></PageContent>;
 *
 * This completes Section 21 on React Router! 🎉
 */
function HomePage() {
  /**
   * INSTRUCTOR QUOTE:
   * "And I'll set a title to welcome and add a paragraph where I say browse
   * all our amazing events. Something like this."
   */
  return (
    <PageContent title="Welcome!">
      <p>Browse all our amazing events!</p>
    </PageContent>
  );
}

export default HomePage;

/**
 * ============================================================================
 * SECTION 21 COMPLETE! - KEY TAKEAWAYS
 * ============================================================================
 *
 * FILES CREATED/MODIFIED IN THIS SECTION:
 * =======================================
 *
 * PAGES:
 * ------
 * - Home.jsx         - Landing page (finalized in Lesson 384)
 * - Events.jsx       - Events list with deferred loading
 * - EventDetail.jsx  - Event details with mixed defer/await
 * - NewEvent.jsx     - Create event form
 * - EditEvent.jsx    - Edit event form
 * - Newsletter.jsx   - Newsletter signup with useFetcher action
 * - Error.jsx        - Error boundary page
 *
 * COMPONENTS:
 * -----------
 * - EventForm.jsx         - Reusable event form with validation
 * - EventItem.jsx         - Event detail display with delete
 * - EventsList.jsx        - Events grid with absolute links
 * - EventsNavigation.jsx  - Events section navigation
 * - MainNavigation.jsx    - Main app navigation with NewsletterSignup
 * - NewsletterSignup.jsx  - useFetcher demo component
 * - PageContent.jsx       - Reusable page wrapper
 *
 * LAYOUTS:
 * --------
 * - Root.jsx        - Main app layout with loading indicator
 * - EventsRoot.jsx  - Events section layout
 *
 * APP:
 * ----
 * - App.jsx - Route configuration with all loaders and actions
 *
 * ============================================================================
 * CONCEPTS COVERED:
 * ============================================================================
 *
 * | Lesson | Topic                                    |
 * |--------|------------------------------------------|
 * | 358    | Project setup and introduction           |
 * | 359-360| Route configuration basics               |
 * | 361-368| Loaders and data fetching                |
 * | 369-371| Error handling                           |
 * | 372-373| Dynamic routes and useRouteLoaderData    |
 * | 374-379| Actions, forms, and data submission      |
 * | 380    | useFetcher for background operations     |
 * | 381-382| Deferred loading with defer/Await        |
 * | 383    | Multiple deferred requests               |
 * | 384    | Section finale                           |
 *
 * ============================================================================
 */
