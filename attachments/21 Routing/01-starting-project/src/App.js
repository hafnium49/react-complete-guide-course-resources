/**
 * ============================================================================
 * APP COMPONENT - Router Configuration (Lessons 346-347)
 * ============================================================================
 *
 * SECTION 21: REACT ROUTER
 * ========================
 * This file now contains the router configuration using createBrowserRouter.
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
 * ROUTER DEFINITION (Lessons 346-347):
 * =====================================
 * INSTRUCTOR QUOTE:
 * "Let's call this function and store the created router in a constant which
 * could also be named router."
 *
 * INSTRUCTOR QUOTE:
 * "Every object represents one route and such an object should have a path
 * property which defines the path for which this route should be active."
 *
 * INSTRUCTOR QUOTE:
 * "We can set it to a custom component. For example, we could set this to
 * the home page component once we create that."
 *
 * Route structure (Lesson 347):
 * | Path      | Element      | Description                    |
 * |-----------|--------------|--------------------------------|
 * | /         | HomePage     | Root path, main landing page   |
 * | /products | ProductsPage | Products listing page          |
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
   * HOME ROUTE (Lesson 346):
   * ========================
   * INSTRUCTOR QUOTE:
   * "For example for the starting page of a website, that typically is just
   * a slash because that's the path we have if we just visit a domain."
   *
   * When user visits: example.com/ or localhost:3000/
   * This route matches and HomePage component is rendered.
   */
  { path: '/', element: <HomePage /> },

  /**
   * PRODUCTS ROUTE (Lesson 347):
   * ============================
   * INSTRUCTOR QUOTE (Lesson 347):
   * "We do that by adding a second element here to this array of route
   * definitions. And now the path could be 'slash products.'"
   *
   * INSTRUCTOR QUOTE:
   * "'Slash products' might be a path that makes a lot of sense if we're
   * loading a page that might display some product items."
   *
   * INSTRUCTOR QUOTE:
   * "And, as an element, I want to load the products page."
   *
   * When user visits: example.com/products or localhost:3000/products
   * This route matches and ProductsPage component is rendered.
   *
   * TESTING THE ROUTE (Lesson 347):
   * ===============================
   * INSTRUCTOR QUOTE:
   * "With that we're supporting this second page, for 'slash products,' and
   * therefore if we save everything, and we go back and we enter 'slash
   * products,' after a local host 3000, and hit enter, we load the products page."
   *
   * INSTRUCTOR QUOTE:
   * "And, of course, hopefully, unsurprisingly, if we delete 'slash products,'
   * we load the homepage."
   */
  { path: '/products', element: <ProductsPage /> },
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
