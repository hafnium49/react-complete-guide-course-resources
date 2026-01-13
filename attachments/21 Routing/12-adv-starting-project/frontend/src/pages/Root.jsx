/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT (Lessons 360, 363 - Task 3 Solution + Loader Scope)
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
 */
import { Outlet } from 'react-router-dom';
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
 *
 * This pattern is called a "Layout Route" in React Router.
 */
function RootLayout() {
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
