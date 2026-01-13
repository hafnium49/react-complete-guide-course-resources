/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT (Lessons 360, 363, 366 - Layout + Loader Scope + Navigation State)
 * ============================================================================
 *
 * TASK 3 SOLUTION (Lesson 360):
 * =============================
 * INSTRUCTOR QUOTE:
 * "Now the next step is to add a root layout that adds the MainNavigation
 * component, which I provided to you, which is already part of this
 * component's folder, around all pages in the end."
 *
 * INSTRUCTOR QUOTE:
 * "And that can be done by adding a special new route, which will be a parent
 * route for all other routes."
 *
 * CREATING THE LAYOUT (Lesson 360):
 * =================================
 * INSTRUCTOR QUOTE:
 * "For that I give it a path of slash nothing. And then here, I want to render
 * an element, which is a route I have yet to add, a page I have yet to add,
 * and I'll name it Root.js again."
 *
 * INSTRUCTOR QUOTE:
 * "And this is again my RootLayout, or however you wanna name it, which of
 * course is exported like this."
 *
 * JSX FRAGMENT USAGE (Lesson 360):
 * ================================
 * INSTRUCTOR QUOTE:
 * "And then here in this RootLayout component, I will have my JSX fragments
 * here. We could, of course, also use React.Fragment here as an alternative,
 * but I'll use these empty tags here, which is a bit shorter."
 *
 * ============================================================================
 * OUTLET COMPONENT - KEY CONCEPT (Lesson 360)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "And then here, I have my MainNavigation, which must be imported. And below
 * that, I'll actually wrap it in the main element, but that's optional."
 *
 * INSTRUCTOR QUOTE:
 * "But what's not optional is that below that or inside of the main element,
 * I will render my Outlet which must be imported from react-router-dom."
 *
 * INSTRUCTOR QUOTE:
 * "And as you learned, this defines where the content of the child routes
 * should be rendered."
 *
 * ============================================================================
 * LAYOUT STRUCTURE
 * ============================================================================
 *
 * Visual representation of what RootLayout renders:
 *
 * ┌─────────────────────────────────────┐
 * │ <Fragment>                          │
 * │ ┌─────────────────────────────────┐ │
 * │ │ <MainNavigation />              │ │
 * │ │ [Home]  [Events]                │ │
 * │ └─────────────────────────────────┘ │
 * │ ┌─────────────────────────────────┐ │
 * │ │ <main>                          │ │
 * │ │ ┌─────────────────────────────┐ │ │
 * │ │ │ <Outlet />                  │ │ │
 * │ │ │ (Child route content here)  │ │ │
 * │ │ │ - HomePage                  │ │ │
 * │ │ │ - EventsPage                │ │ │
 * │ │ │ - etc.                      │ │ │
 * │ │ └─────────────────────────────┘ │ │
 * │ └─────────────────────────────────┘ │
 * └─────────────────────────────────────┘
 *
 * ============================================================================
 * ROUTE CONFIGURATION
 * ============================================================================
 *
 * This layout wraps ALL routes in the application:
 *
 * {
 *   path: '/',
 *   element: <RootLayout />,  // ← This component
 *   children: [
 *     { index: true, element: <HomePage /> },
 *     {
 *       path: 'events',
 *       element: <EventsRootLayout />,
 *       children: [...]
 *     }
 *   ]
 * }
 *
 * ============================================================================
 * LESSON 363: WHY useLoaderData DOESN'T WORK HERE
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "Now, one place where we can't get those events is in a higher level route.
 * So for example, if you would go to the RootLayout here, which is part of
 * my root route."
 *
 * WHAT HAPPENS IF WE TRY (Lesson 363):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "If I go to this RootLayout and I useLoaderData here, by first of all
 * importing useLoaderData, and then calling that hook here, you will see
 * that if I try to get my events here, and I console log my events, this
 * will not work as expected. Instead, it logs undefined."
 *
 * Example (THIS WOULD NOT WORK):
 * ==============================
 * import { useLoaderData } from 'react-router-dom';
 *
 * function RootLayout() {
 *   const events = useLoaderData();  // ⚠️ Returns undefined!
 *   console.log(events);  // logs: undefined
 *   ...
 * }
 *
 * WHY IT DOESN'T WORK (Lesson 363):
 * =================================
 * INSTRUCTOR QUOTE:
 * "The reason for that is that I'm trying to get data from a route that's
 * actually defined on a lower level. I'm trying to get data that's loaded
 * from this route, in this root route, which is on a much higher level.
 * After all, this is a deeply nested route, and that's not possible."
 *
 * THE RULE (Lesson 363):
 * ======================
 * INSTRUCTOR QUOTE:
 * "Instead, you can access loaded data with help of useLoaderData in any
 * component on the same level or lower level than the component where you
 * added the loader, so the route on which you added the loader."
 *
 * ROUTE HIERARCHY:
 * ================
 * RootLayout (path: '/')           ← CANNOT access events loader data
 *   └── EventsRootLayout (path: 'events')   ← CANNOT access (parent of loader)
 *         └── EventsPage (index: true, HAS LOADER)  ← CAN access
 *               └── EventsList (child component)    ← CAN access
 *
 * SUMMARY:
 * ========
 * - ✅ Same level (EventsPage) - CAN use useLoaderData
 * - ✅ Lower level (EventsList) - CAN use useLoaderData
 * - ❌ Higher level (RootLayout, EventsRootLayout) - CANNOT use useLoaderData
 *
 * INSTRUCTOR QUOTE:
 * "So that is simply how that works and what you should keep in mind."
 *
 * INSTRUCTOR QUOTE:
 * "You just have to be careful that you're not accidentally using
 * useLoaderData on a higher level than you're fetching the data."
 *
 * ============================================================================
 * LESSON 366: useNavigation HOOK - SHOWING LOADING STATE
 * ============================================================================
 *
 * THE PROBLEM (Lesson 366):
 * =========================
 * When using loaders, the page waits for data before transitioning.
 * The user sees nothing happening, which is poor UX.
 *
 * INSTRUCTOR QUOTE:
 * "So, how could we give the user some feedback that something's going on
 * here after clicking on Events?"
 *
 * THE SOLUTION - useNavigation HOOK (Lesson 366):
 * ===============================================
 * INSTRUCTOR QUOTE:
 * "Well, React Router gives us a special hook, which we can use to check the
 * current route transitions state. So, to find out if a transition has been
 * initiated and we're currently still waiting for data to arrive, or if we're
 * done."
 *
 * WHERE TO USE IT (Lesson 366):
 * =============================
 * INSTRUCTOR QUOTE:
 * "Now, we could go to the Root Layout component and there we can use the
 * useNavigation hook; which is a hook provided by React Router that lets us
 * find out whether we're currently in an active transition, if we're loading
 * data, or if we have no active transition going on."
 *
 * THE navigation OBJECT (Lesson 366):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "We get a Navigation object when we call useNavigation and that Navigation
 * object has a couple of properties; but for us, the state property is the
 * most important one."
 *
 * THE state PROPERTY VALUES (Lesson 366):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "This is simply a string which is either idle, loading, or submitting;
 * depending on whether we don't have any active route transition, if we're
 * having an active transition and we're loading data, or if we're submitting
 * data; which is something we'll take a look at later."
 *
 * | State       | Meaning                                      |
 * |-------------|----------------------------------------------|
 * | 'idle'      | No active transition - page is stable        |
 * | 'loading'   | Route transition in progress, loading data   |
 * | 'submitting'| Form submission in progress (covered later)  |
 *
 * CONDITIONAL RENDERING (Lesson 366):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "With that, we could add a Loading text here, in our main section, for
 * example, which is only shown if navigation.state is equal to loading."
 *
 * Example:
 * {navigation.state === 'loading' && <p>Loading...</p>}
 *
 * TESTING THE LOADING STATE (Lesson 366):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "With that added, if we go to Home and back to Events, you see that Loading
 * text here which signals to the user that we are loading data. So, which
 * gives the user some feedback that something is happening."
 *
 * KEY INSIGHT - WHERE LOADING INDICATOR APPEARS (Lesson 366):
 * ===========================================================
 * INSTRUCTOR QUOTE:
 * "It's just important to recognize that the loading indicator won't be added
 * on the page which you're transitioning to, but instead on some page, or a
 * component, which is already visible on the screen when the transition is
 * started. That's different compared to what we had before with useEffect
 * and a separate loading state."
 *
 * COMPARISON:
 * ===========
 * | Approach         | Where loading indicator shows        |
 * |------------------|--------------------------------------|
 * | useEffect        | ON the target page (after navigate)  |
 * | useNavigation    | ON the current page (before navigate)|
 *
 * ALTERNATIVE SOLUTIONS (Lesson 366):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "Now, I'm going to get rid of it here because we'll actually learn about a
 * different solution later in this section, but this is one way of finding
 * out whether you are currently waiting for data or not, and how you could
 * bring back such a loading indicator."
 *
 * Coming later: Deferred data loading, Suspense integration, etc.
 *
 * ============================================================================
 */
import { Outlet, useNavigation } from 'react-router-dom';
import MainNavigation from '../components/MainNavigation';

/**
 * ROOT LAYOUT COMPONENT:
 * ======================
 * The top-level layout that wraps all pages.
 *
 * Provides:
 * - Consistent MainNavigation header across all pages
 * - Semantic <main> wrapper for page content
 * - Outlet for rendering child route content
 * - Navigation state awareness (Lesson 366)
 *
 * This pattern is called a "Layout Route" in React Router.
 */
function RootLayout() {
  /**
   * ============================================================================
   * useNavigation HOOK (Lesson 366)
   * ============================================================================
   *
   * INSTRUCTOR QUOTE:
   * "We get a Navigation object when we call useNavigation and that Navigation
   * object has a couple of properties; but for us, the state property is the
   * most important one."
   *
   * The navigation object contains:
   * - state: 'idle' | 'loading' | 'submitting'
   * - location: the location being navigated to (when loading/submitting)
   * - formMethod: the method of the form being submitted
   * - formAction: the action of the form being submitted
   * - formData: the FormData being submitted
   * - formEncType: the encType of the form being submitted
   *
   * We primarily use navigation.state to show loading indicators.
   */
  const navigation = useNavigation();

  return (
    /**
     * JSX FRAGMENT (Lesson 360):
     * ==========================
     * Using <></> (short syntax) instead of <React.Fragment>
     * to group multiple elements without adding extra DOM nodes.
     */
    <>
      {/**
       * MAIN NAVIGATION:
       * ================
       * The site-wide navigation header.
       * Always visible on all pages within this layout.
       */}
      <MainNavigation />
      {/**
       * MAIN CONTENT AREA:
       * ==================
       * Semantic HTML5 <main> element wrapping the page content.
       * This is optional but good for accessibility and SEO.
       */}
      <main>
        {/**
         * ================================================================
         * LOADING INDICATOR (Lesson 366)
         * ================================================================
         *
         * INSTRUCTOR QUOTE:
         * "With that, we could add a Loading text here, in our main section,
         * for example, which is only shown if navigation.state is equal to
         * loading, like this."
         *
         * INSTRUCTOR QUOTE:
         * "With that added, if we go to Home and back to Events, you see
         * that Loading text here which signals to the user that we are
         * loading data."
         *
         * NOTE: The instructor removes this at the end of the lesson:
         * INSTRUCTOR QUOTE:
         * "Now, I'm going to get rid of it here because we'll actually
         * learn about a different solution later in this section."
         *
         * The code below is commented out to match the final state,
         * but uncomment it to see the loading indicator in action!
         *
         * IMPORTANT INSIGHT (Lesson 366):
         * ===============================
         * INSTRUCTOR QUOTE:
         * "It's just important to recognize that the loading indicator
         * won't be added on the page which you're transitioning to, but
         * instead on some page, or a component, which is already visible
         * on the screen when the transition is started."
         */}
        {/**
         * LOADING INDICATOR IMPLEMENTATION (Lesson 366):
         * ==============================================
         * Shows "Loading..." when a route transition is in progress.
         *
         * NOTE: The instructor removes this at the end of the lesson
         * in favor of a different solution covered later. We keep it
         * here for educational purposes - you can comment it out if desired.
         *
         * To test: Add a setTimeout delay to the backend (see backend/routes/events.js)
         */}
        {navigation.state === 'loading' && <p>Loading...</p>}
        {/**
         * OUTLET COMPONENT (Lesson 360):
         * ==============================
         * INSTRUCTOR QUOTE:
         * "This defines where the content of the child routes should be rendered."
         *
         * The Outlet acts as a placeholder that gets replaced with
         * the matched child route's element.
         *
         * When URL is:
         * - / → Outlet renders <HomePage />
         * - /events → Outlet renders <EventsRootLayout />
         * - /events/e1 → Outlet renders <EventsRootLayout /> → <EventDetailPage />
         */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
