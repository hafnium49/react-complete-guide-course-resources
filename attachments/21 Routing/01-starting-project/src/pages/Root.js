/**
 * ============================================================================
 * ROOT LAYOUT COMPONENT (Lessons 350-351)
 * ============================================================================
 *
 * WHAT IS A LAYOUT? (Lesson 350):
 * ===============================
 * A layout component wraps multiple pages and provides shared UI elements
 * like navigation, headers, footers, and consistent styling.
 *
 * THE PROBLEM WITH ADDING NAVIGATION TO EACH PAGE (Lesson 350):
 * =============================================================
 * INSTRUCTOR QUOTE:
 * "This main navigation should, now, be visible on all our pages. So therefore,
 * one thing we can do, is we can go to home JS and import the main navigation
 * there... But of course, the more pages we're going to add the more we must
 * repeat that step."
 *
 * WHY NOT WRAP RouterProvider? (Lesson 350):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "Now, you could try to render the navigation above this router provider
 * component, for example, or wrap this router provider component with another
 * component, but this would not work if you plan to add links to your layout,
 * because those links only work if they're rendered inside of the router
 * provider, so to say, not above or next to it or as a wrapper of it."
 *
 * THE SOLUTION - NESTED ROUTES (Lesson 350):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "What you wanna do instead, and which can be quite difficult to understand
 * at first, but which is how you approach this problem with react-router-dom,
 * is you add an extra route to your route definitions and you use a path of
 * slash nothing. And then here, you add an element that actually loads the
 * layout wrapper that should be wrapped around the other routes."
 *
 * HOW IT WORKS:
 * =============
 * In App.js:
 * const router = createBrowserRouter([
 *   {
 *     path: '/',
 *     element: <RootLayout />,    // <-- This layout wraps all children
 *     children: [                 // <-- Child routes rendered via <Outlet />
 *       { path: '/', element: <HomePage /> },
 *       { path: '/products', element: <ProductsPage /> },
 *     ],
 *   },
 * ]);
 *
 * ============================================================================
 * THE OUTLET COMPONENT (Lesson 350)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "In this parent route element, so in this root layout here, we also have to
 * define where these child route components and elements, so the homepage and
 * the products page, should be rendered. We do that by going to this root
 * layout and importing another special thing, another special component from
 * react-router-dom. And that's the outlet component."
 *
 * INSTRUCTOR QUOTE:
 * "This component marks the place where the child route elements should be
 * rendered to."
 *
 * VISUALIZATION:
 * ==============
 * ┌─────────────────────────────────────┐
 * │         RootLayout Component        │
 * │  ┌───────────────────────────────┐  │
 * │  │      MainNavigation           │  │
 * │  │  [Home]  [Products]           │  │
 * │  └───────────────────────────────┘  │
 * │  ┌───────────────────────────────┐  │
 * │  │  <Outlet />                   │  │
 * │  │  ┌─────────────────────────┐  │  │
 * │  │  │ HomePage or ProductsPage│  │  │
 * │  │  │ (depends on URL)        │  │  │
 * │  │  └─────────────────────────┘  │  │
 * │  └───────────────────────────────┘  │
 * └─────────────────────────────────────┘
 *
 * ============================================================================
 * ADVANTAGES OF THIS APPROACH (Lesson 350)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "The advantage of this approach is that this root layout now, indeed, does
 * act as a wrapper for these page components."
 *
 * INSTRUCTOR QUOTE:
 * "And having such a root route, that acts as a layout, is totally standard
 * and totally normal when using React router. You implement layouts like this
 * by adding wrapping routes like this."
 *
 * PATH-DEPENDENT LAYOUTS (Lesson 350):
 * ====================================
 * INSTRUCTOR QUOTE:
 * "And, of course, for more complex pages, you could have multiple root routes,
 * for example, one for slash admin, which then has a totally different set of
 * children, which might have a different layout that's wrapped around them.
 * So, that's the advantage of this approach. You can have path dependent
 * layout wrappers, just as we're doing it here."
 *
 * Example of multiple layouts:
 * const router = createBrowserRouter([
 *   {
 *     path: '/',
 *     element: <MainLayout />,
 *     children: [...public pages...]
 *   },
 *   {
 *     path: '/admin',
 *     element: <AdminLayout />,
 *     children: [...admin pages with different layout...]
 *   }
 * ]);
 */

import { Outlet } from 'react-router-dom';

/**
 * MAIN NAVIGATION IMPORT (Lesson 350):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "So therefore, here, instead of displaying this dummy root layout text,
 * we can include the main navigation component, by importing it from our
 * components folder and rendering it above the outlet."
 */
import MainNavigation from '../components/MainNavigation';

/**
 * CSS MODULE REMOVED (Lesson 351):
 * =================================
 * INSTRUCTOR QUOTE (Lesson 351):
 * "And remove this import and remove this class name, so that we now have the
 * same styling, not just for our default layout, which is used if things go
 * right, but also on this error page, which is used when things go wrong."
 *
 * BEFORE (Lesson 350):
 * ====================
 * import classes from './Root.module.css';
 * <main className={classes.content}>
 *
 * AFTER (Lesson 351):
 * ===================
 * No import needed - styling is now in index.css applied to all <main> elements.
 * <main>
 *
 * WHY THIS CHANGE? (Lesson 351):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "Now to ensure that we also have the appropriate styling for this main
 * element, we could grab this definition from the root.module file, and
 * actually copy that into index css, add it down there, and apply that to
 * all main elements we find, and remove the root module css file."
 *
 * Moving styles to index.css ensures:
 * 1. RootLayout's <main> gets the styling (normal pages)
 * 2. ErrorPage's <main> gets the SAME styling (error pages)
 */

/**
 * ROOT LAYOUT COMPONENT:
 * ======================
 * INSTRUCTOR QUOTE (Lesson 350):
 * "For a first step, I'll add our root dot JS file here in pages and name
 * this root layout, for example, and export this here."
 *
 * This component:
 * 1. Renders the MainNavigation (visible on all pages)
 * 2. Renders the <Outlet /> where child routes will appear
 * 3. Provides consistent styling via the <main> wrapper
 */
function RootLayout() {
  return (
    /**
     * FRAGMENT FOR MULTIPLE ROOT ELEMENTS (Lesson 350):
     * =================================================
     * INSTRUCTOR QUOTE:
     * "And here we could, for example, add a fragment, like this."
     *
     * We use Fragment (<>) because we have multiple root elements:
     * - MainNavigation
     * - main (containing Outlet)
     */
    <>
      {/**
       * MAIN NAVIGATION (Lesson 350):
       * =============================
       * INSTRUCTOR QUOTE:
       * "If we do that, we see the navigation, here, above our pages and now
       * we got this navigation on all the pages and all the pages we might
       * add here to this children array, in the future."
       */}
      <MainNavigation />

      {/**
       * CONTENT AREA (Lessons 350-351):
       * ================================
       * INSTRUCTOR QUOTE (Lesson 350):
       * "And then wrap our outlet, here, with the default main element."
       *
       * UPDATED (Lesson 351):
       * =====================
       * INSTRUCTOR QUOTE:
       * "Remove this class name, so that we now have the same styling, not
       * just for our default layout, which is used if things go right, but
       * also on this error page, which is used when things go wrong."
       *
       * The className was removed because styling is now global in index.css.
       */}
      <main>
        {/**
         * OUTLET - WHERE CHILD ROUTES RENDER (Lesson 350):
         * =================================================
         * INSTRUCTOR QUOTE:
         * "This component marks the place where the child route elements
         * should be rendered to. So in our case, that would be the homepage
         * and the products page components, in the end."
         *
         * How <Outlet /> works:
         * 1. React Router looks at the current URL
         * 2. Finds the matching child route
         * 3. Renders that child route's element here
         *
         * URL: /          -> <Outlet /> renders <HomePage />
         * URL: /products  -> <Outlet /> renders <ProductsPage />
         */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
