/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT (Lesson 360 - Task 3 Solution)
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
