/**
 * ============================================================================
 * APP COMPONENT - Router Configuration (Lessons 346-350)
 * ============================================================================
 *
 * SECTION 21: REACT ROUTER
 * ========================
 * This file now contains the router configuration using createBrowserRouter.
 *
 * ============================================================================
 * NESTED ROUTES & LAYOUTS (Lesson 350)
 * ============================================================================
 *
 * THE PROBLEM - REPEATING NAVIGATION (Lesson 350):
 * ================================================
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
 * component... but this would not work if you plan to add links to your layout,
 * because those links only work if they're rendered inside of the router
 * provider, so to say, not above or next to it or as a wrapper of it."
 *
 * THE SOLUTION - NESTED ROUTES (Lesson 350):
 * ==========================================
 * INSTRUCTOR QUOTE:
 * "What you wanna do instead... is you add an extra route to your route
 * definitions and you use a path of slash nothing. And then here, you add an
 * element that actually loads the layout wrapper that should be wrapped around
 * the other routes."
 *
 * THE children PROPERTY (Lesson 350):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "Now, to actually wrap these two routes and their components with this layout,
 * we must add another property to this special route here... The children
 * property. That takes an array, and it is actually an array of more route
 * definitions and we can move these two route definitions into this array."
 *
 * INSTRUCTOR QUOTE:
 * "With that, we make these two route definitions, here, child route definitions
 * of this route. So, this route acts as a parent route to these routes and it
 * acts as a wrapper to these routes."
 *
 * ROUTE STRUCTURE (Lesson 350):
 * =============================
 * {
 *   path: '/',
 *   element: <RootLayout />,    // Parent layout (with <Outlet />)
 *   children: [                 // Child routes rendered at <Outlet />
 *     { path: '/', element: <HomePage /> },
 *     { path: '/products', element: <ProductsPage /> },
 *   ]
 * }
 *
 * MULTIPLE LAYOUTS (Lesson 350):
 * ==============================
 * INSTRUCTOR QUOTE:
 * "And, of course, for more complex pages, you could have multiple root routes,
 * for example, one for slash admin, which then has a totally different set of
 * children, which might have a different layout that's wrapped around them."
 *
 * ============================================================================
 * TWO WAYS TO DEFINE ROUTES (Lesson 348)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 348):
 * "So we now added our first two route definitions. There is of course way
 * more we can and we should do when building a page that, or a website that
 * supports routing. But before we do that, I wanna show you an alternative
 * way of defining your routes here."
 *
 * APPROACH 1: OBJECT-BASED (Current - Recommended):
 * =================================================
 * INSTRUCTOR QUOTE (Lesson 348):
 * "You can define them like this with an array of route definition objects.
 * And in my opinion, this is quite an intuitive approach."
 *
 * const router = createBrowserRouter([
 *   { path: '/', element: <HomePage /> },
 *   { path: '/products', element: <ProductsPage /> },
 * ]);
 *
 * APPROACH 2: JSX-BASED (Alternative):
 * ====================================
 * INSTRUCTOR QUOTE (Lesson 348):
 * "But especially if you worked with older versions of react-router-dom, it
 * might also be a bit of a strange approach because in older versions you
 * actually defined all your routes with help of components and JSX code
 * instead of JavaScript Objects in array."
 *
 * INSTRUCTOR QUOTE:
 * "And you can still do this in this version here in this latest version."
 *
 * Using createRoutesFromElements and Route component:
 * const routeDefinitions = createRoutesFromElements(
 *   <Route>
 *     <Route path="/" element={<HomePage />} />
 *     <Route path="/products" element={<ProductsPage />} />
 *   </Route>
 * );
 * const router = createBrowserRouter(routeDefinitions);
 *
 * WHY TWO APPROACHES EXIST (Lesson 348):
 * ======================================
 * - Object-based: Newer, more programmatic, easier to work with data
 * - JSX-based: Familiar for those from older react-router versions
 * - Both produce the same result!
 *
 * INSTRUCTOR'S PREFERENCE (Lesson 348):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Ultimately, it is up to you what you prefer. I'll switch back to this
 * object-based solution, but you could also define your routes with JSX
 * code instead, if you preferred that."
 *
 * ============================================================================
 * ADDING MORE ROUTES (Lesson 347)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 347):
 * "So let's add more pages."
 *
 * To add more routes:
 * 1. Create a page component in /pages folder
 * 2. Import the component in App.js
 * 3. Add a route object to the router array with path and element
 *
 * CHOOSING PATHS (Lesson 347):
 * ============================
 * INSTRUCTOR QUOTE:
 * "It is of course up to you which paths you wanna support. But 'slash products'
 * might be a path that makes a lot of sense if we're loading a page that might
 * display some product items."
 *
 * Path naming should be:
 * - Descriptive of the content (e.g., /products for product listings)
 * - SEO-friendly and user-readable
 * - Consistent with your application's structure
 *
 * ============================================================================
 * STEP 1: DEFINE ROUTES (Lesson 346)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 346):
 * "The first step, is that we must define the routes we wanna support, so we
 * must define which URLs, which paths we wanna support, and which components
 * should be loaded for different paths."
 *
 * IMPORTING createBrowserRouter (Lesson 346):
 * ============================================
 * INSTRUCTOR QUOTE:
 * "We want to import something from that react-router-dom package... the
 * create browser router function."
 *
 * INSTRUCTOR QUOTE:
 * "This is a function we can call to create a new router. And in that function,
 * we then define our routes."
 *
 * WHY "BROWSER" ROUTER? (Lesson 346):
 * ===================================
 * INSTRUCTOR QUOTE:
 * "The reason why it's called create browser router is because this will then
 * create a router which supports these browser-built-in mechanisms for dealing
 * with URLs and for changing the URL."
 *
 * Browser mechanisms used:
 * - History API (pushState, replaceState)
 * - URL changes without full page reload
 * - Back/forward button support
 *
 * ROUTE DEFINITIONS (Lesson 346):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "This function takes an array of route definition objects. These are simply
 * JavaScript objects where every object represents one route."
 *
 * Route object structure:
 * {
 *   path: '/some-path',    // URL path to match
 *   element: <Component /> // Component to render when path matches
 * }
 *
 * THE PATH PROPERTY (Lesson 346):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "The path for which this route should be active. And that's the path part
 * of the URL after the domain."
 *
 * Examples:
 * - path: '/'       -> example.com/
 * - path: '/about'  -> example.com/about
 * - path: '/users'  -> example.com/users
 *
 * INSTRUCTOR QUOTE:
 * "For example for the starting page of a website, that typically is just a
 * slash because that's the path we have if we just visit a domain."
 *
 * THE ELEMENT PROPERTY (Lesson 346):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "The element property... Now you set this to the JSX code that should be
 * rendered when that route becomes active, so when that path becomes active."
 *
 * INSTRUCTOR QUOTE:
 * "You can set this to any JSX code you want. And of course, that also means
 * that you can set it to a custom component."
 *
 * ============================================================================
 * STEP 2: ACTIVATE THE ROUTER (Lesson 346)
 * ============================================================================
 *
 * IMPORTING RouterProvider (Lesson 346):
 * ======================================
 * INSTRUCTOR QUOTE:
 * "To tell React that this router should be used, we need to import another
 * thing from react-router-dom and that's the router provider component."
 *
 * USING RouterProvider (Lesson 346):
 * ==================================
 * INSTRUCTOR QUOTE:
 * "Now the idea is that we render this router provider component in our app
 * and we add the router prop to this component and we set this to the router
 * we created."
 *
 * INSTRUCTOR QUOTE:
 * "And with that, we're activating this router and we're telling React router
 * that this router should be used to render the appropriate page, the
 * appropriate element for the currently active path."
 *
 * ============================================================================
 * MODERN vs CLASSIC APPROACH (Lesson 346)
 * ============================================================================
 *
 * INSTRUCTOR QUOTE:
 * "This way of defining the router of defining the routes and then providing
 * this router is the most modern and also the recommended approach when using
 * react-router-dom version 6.4 or higher."
 *
 * INSTRUCTOR QUOTE:
 * "Older tutorials might also use the browser router component from that same
 * package where you would wrap your app component with it and define these
 * route definitions as JSX code. That's another approach, but it's not the
 * approach that's recommended anymore when using version 6.4 or newer."
 *
 * Modern approach (recommended - v6.4+):
 * - createBrowserRouter for route definitions
 * - RouterProvider to activate the router
 * - Data loading/actions supported
 *
 * Classic approach (older):
 * - BrowserRouter wrapper component
 * - Routes and Route components as JSX
 * - Some features not available
 */

import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**
 * ============================================================================
 * ALTERNATIVE JSX-BASED IMPORTS (Lesson 348) - Commented Out
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 348):
 * "You can import another function from react-router-dom, and that's the
 * create routes from elements function."
 *
 * INSTRUCTOR QUOTE:
 * "To be precise, you import a route component from react-router-dom."
 *
 * These imports are needed for the JSX-based approach:
 * - createRoutesFromElements: Converts JSX route definitions to route objects
 * - Route: Component used to define individual routes in JSX
 */
// import {
//   createBrowserRouter,
//   RouterProvider,
//   createRoutesFromElements,
//   Route,
// } from 'react-router-dom';

/**
 * PAGE COMPONENTS:
 * ================
 * INSTRUCTOR QUOTE (Lesson 346):
 * "I'll add a folder named pages here to this project to hold the components
 * that will be loaded as pages by the router."
 *
 * Pages are imported and used in route definitions.
 */
import HomePage from './pages/Home';
/**
 * PRODUCTS PAGE IMPORT (Lesson 347):
 * ===================================
 * INSTRUCTOR QUOTE (Lesson 347):
 * "Therefore, we're importing the products page, and we're using it in our
 * JSX code for this element property."
 */
import ProductsPage from './pages/Products';
/**
 * ROOT LAYOUT IMPORT (Lesson 350):
 * =================================
 * INSTRUCTOR QUOTE (Lesson 350):
 * "For a first step, I'll add our root dot JS file here in pages and name this
 * root layout, for example... Now, this root layout component will be loaded as
 * the element for this route here."
 *
 * RootLayout provides:
 * - MainNavigation component (visible on all pages)
 * - <Outlet /> where child routes render
 * - Consistent styling wrapper
 */
import RootLayout from './pages/Root';

/**
 * ============================================================================
 * ALTERNATIVE: JSX-BASED ROUTE DEFINITIONS (Lesson 348) - Commented Out
 * ============================================================================
 *
 * INSTRUCTOR QUOTE (Lesson 348):
 * "And you can create a new constant call route definitions, for example,
 * and call create routes from elements and to dysfunction, you pass a bunch
 * of JSX code."
 *
 * HOW IT WORKS:
 * =============
 * INSTRUCTOR QUOTE:
 * "With one wrapper route, you could then add your nested routes here where
 * every route receives a path prop like slash nothing, and an element prop
 * which could, for example, load the homepage JSX code."
 *
 * INSTRUCTOR QUOTE:
 * "So of course you might see that this line is the same as this route
 * definition down there. Just with JSX code and components."
 *
 * COMPARISON:
 * ===========
 * | Object-based                              | JSX-based                        |
 * |-------------------------------------------|----------------------------------|
 * | { path: '/', element: <HomePage /> }      | <Route path="/" element={...} /> |
 * | Array of plain JavaScript objects         | Uses Route components            |
 * | More programmatic                         | More familiar to old users       |
 *
 * USING THE JSX DEFINITIONS (Lesson 348):
 * =======================================
 * INSTRUCTOR QUOTE:
 * "You can then take those route definitions created with create routes from
 * elements and use that to create your browser router."
 *
 * INSTRUCTOR QUOTE:
 * "We could also create our router now by calling create browser router, but
 * instead of passing this array of route definition objects to it, we pass
 * the route definitions that were created with create routes from elements
 * to this router."
 *
 * RESULT (Lesson 348):
 * ====================
 * INSTRUCTOR QUOTE:
 * "With that, if we save that, we still get our homepage and we can still
 * visit slash products, but now we're using this different approach of
 * defining our routes."
 */
// const routeDefinitions = createRoutesFromElements(
//   <Route>
//     <Route path="/" element={<HomePage />} />
//     <Route path="/products" element={<ProductsPage />} />
//   </Route>
// );

/**
 * CREATING ROUTER WITH JSX DEFINITIONS (Lesson 348) - Commented Out:
 * ===================================================================
 * If using the JSX-based approach, you would create the router like this:
 */
// const router = createBrowserRouter(routeDefinitions);

/**
 * ROUTER DEFINITION (Lessons 346-350) - WITH NESTED ROUTES:
 * ==========================================================
 * INSTRUCTOR QUOTE:
 * "Let's call this function and store the created router in a constant which
 * could also be named router."
 *
 * Updated route structure (Lesson 350):
 * | Path      | Element      | Parent    | Description                    |
 * |-----------|--------------|-----------|--------------------------------|
 * | /         | RootLayout   | -         | Layout wrapper with navigation |
 * |   /       | HomePage     | RootLayout| Root path, main landing page   |
 * |   /products| ProductsPage| RootLayout| Products listing page          |
 *
 * UNSUPPORTED PATHS (Lesson 347):
 * ===============================
 * INSTRUCTOR QUOTE:
 * "If we enter something totally different, we get an error, though, because
 * we try to visit a URL, a path, that's not supported yet."
 *
 * Visiting a path not defined in this array will show React Router's
 * default error page. Error handling will be covered in later lessons.
 */
const router = createBrowserRouter([
  /**
   * =========================================================================
   * ROOT LAYOUT ROUTE - PARENT ROUTE (Lesson 350)
   * =========================================================================
   *
   * INSTRUCTOR QUOTE (Lesson 350):
   * "What you wanna do instead... is you add an extra route to your route
   * definitions and you use a path of slash nothing. And then here, you add
   * an element that actually loads the layout wrapper that should be wrapped
   * around the other routes."
   *
   * HOW IT WORKS:
   * =============
   * 1. This route matches the base path "/"
   * 2. RootLayout is rendered (contains MainNavigation + <Outlet />)
   * 3. Child routes are rendered where <Outlet /> is placed
   *
   * INSTRUCTOR QUOTE:
   * "And having such a root route, that acts as a layout, is totally standard
   * and totally normal when using React router. You implement layouts like
   * this by adding wrapping routes like this."
   */
  {
    path: '/',
    element: <RootLayout />,
    /**
     * CHILDREN PROPERTY (Lesson 350):
     * ================================
     * INSTRUCTOR QUOTE:
     * "The children property. That takes an array, and it is actually an array
     * of more route definitions and we can move these two route definitions
     * into this array."
     *
     * INSTRUCTOR QUOTE:
     * "With that, we make these two route definitions, here, child route
     * definitions of this route. So, this route acts as a parent route to
     * these routes and it acts as a wrapper to these routes."
     *
     * Child routes are rendered at the <Outlet /> component in RootLayout.
     */
    children: [
      /**
       * HOME ROUTE - CHILD (Lessons 346, 350):
       * ======================================
       * INSTRUCTOR QUOTE (Lesson 346):
       * "For example for the starting page of a website, that typically is
       * just a slash because that's the path we have if we just visit a domain."
       *
       * When user visits: localhost:3000/
       * - RootLayout renders (MainNavigation visible)
       * - HomePage renders at <Outlet />
       */
      { path: '/', element: <HomePage /> },

      /**
       * PRODUCTS ROUTE - CHILD (Lessons 347, 350):
       * ==========================================
       * INSTRUCTOR QUOTE (Lesson 347):
       * "We do that by adding a second element here to this array of route
       * definitions. And now the path could be 'slash products.'"
       *
       * When user visits: localhost:3000/products
       * - RootLayout renders (MainNavigation visible)
       * - ProductsPage renders at <Outlet />
       *
       * THE RESULT (Lesson 350):
       * ========================
       * INSTRUCTOR QUOTE:
       * "If we do that, we see the navigation, here, above our pages and now
       * we got this navigation on all the pages and all the pages we might
       * add here to this children array, in the future."
       */
      { path: '/products', element: <ProductsPage /> },
    ],
  },
]);

/**
 * APP COMPONENT (Lesson 346):
 * ===========================
 * INSTRUCTOR QUOTE:
 * "Now the idea is that we render this router provider component in our app."
 *
 * INSTRUCTOR QUOTE:
 * "We add the router prop to this component and we set this to the router
 * we created."
 *
 * The App component now:
 * 1. Renders RouterProvider as its root element
 * 2. Passes the router configuration via the `router` prop
 * 3. React Router takes over rendering based on the current URL
 *
 * HOW IT WORKS:
 * =============
 * 1. RouterProvider receives the router configuration
 * 2. React Router watches the browser URL
 * 3. When URL matches a path, corresponding element is rendered
 * 4. No full page reload - just component swap (client-side routing)
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
